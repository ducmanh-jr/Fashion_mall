using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;
using DM_FashionMall.API.Data;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Models;
using DM_FashionMall.API.Services;

namespace DM_FashionMall.Tests
{
    public class SellerIntegrationTests : IDisposable
    {
        private readonly SqliteConnection _connection;
        private readonly AppDbContext _context;
        private readonly ISellerService _sellerService;
        private readonly IAuthService _authService;

        public SellerIntegrationTests()
        {
            _connection = new SqliteConnection("Filename=:memory:");
            _connection.Open();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(_connection)
                .Options;

            _context = new AppDbContext(options);
            _context.Database.EnsureCreated();

            // Seed initial data
            DbSeeder.SeedAsync(_context).GetAwaiter().GetResult();

            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    {"Jwt:Key", "TestSecretKey_ForUnitTests_12345678901234567890"},
                    {"Jwt:Issuer", "DMFashionMallTest"},
                    {"Jwt:Audience", "DMFashionMallTestAudience"}
                })
                .Build();

            _authService = new AuthService(_context, config);
            _sellerService = new SellerService(_context);
        }

        public void Dispose()
        {
            _context.Dispose();
            _connection.Dispose();
        }

        [Fact]
        public async Task Test_1_SellerLogin_Success()
        {
            var res = await _authService.LoginSellerAsync(new SellerLoginRequest
            {
                Email = "seller@dmfashionmall.vn",
                Password = "123456"
            });

            Assert.NotNull(res);
            Assert.NotEmpty(res.Token);
            Assert.Equal("SELLER", res.Role);
            Assert.NotNull(res.ShopId);
        }

        [Fact]
        public async Task Test_2_DashboardMetrics_CalculatedCorrectly()
        {
            var metrics = await _sellerService.GetDashboardMetricsAsync(1);

            Assert.NotNull(metrics);
            Assert.True(metrics.TotalProducts >= 5);
            Assert.True(metrics.TotalOrders >= 4);
            Assert.True(metrics.PendingOrders >= 1);
            Assert.True(metrics.LowStockProducts >= 1);
        }

        [Fact]
        public async Task Test_3_CreateProductWithVariants_AndInventoryTracksStock()
        {
            var newProd = new SaveProductRequest
            {
                Name = "Áo Thun Cotton Balenciaga Paris Limited",
                CategoryId = 1,
                BasePrice = 3500000,
                Description = "Áo thun cotton dệt kim thoáng mát phiên bản đặc biệt",
                Variants = new List<ProductVariantDto>
                {
                    new() { Sku = "BLC-TEE-M", Size = "M", Color = "Đen", Price = 3500000, StockQuantity = 15 },
                    new() { Sku = "BLC-TEE-L", Size = "L", Color = "Đen", Price = 3500000, StockQuantity = 20 }
                }
            };

            var created = await _sellerService.CreateProductAsync(1, 1, newProd);

            Assert.NotNull(created);
            Assert.True(created.Id > 0);
            Assert.Equal(35, created.TotalStock);
            Assert.Equal(2, created.Variants.Count);

            // Verify inventory
            var inv = await _sellerService.GetInventoryAsync(1);
            var item = inv.FirstOrDefault(i => i.ProductId == created.Id);
            Assert.NotNull(item);
            Assert.Equal(35, item.TotalQuantity);
        }

        [Fact]
        public async Task Test_4_InventoryQuickUpdate_UpdatesStockAndStatus()
        {
            var products = await _sellerService.GetProductsAsync(1, null, null, "ACTIVE");
            var target = products.First();

            var success = await _sellerService.QuickUpdateStockAsync(1, new QuickUpdateStockRequest
            {
                ProductId = target.Id,
                NewQuantity = 3 // Trigger low stock!
            });

            Assert.True(success);

            var lowStockList = await _sellerService.GetInventoryAsync(1, lowStockOnly: true);
            Assert.Contains(lowStockList, i => i.ProductId == target.Id);
        }

        [Fact]
        public async Task Test_5_OrderFlow_AdvanceStatusAndSettleWallet()
        {
            var orders = await _sellerService.GetOrdersAsync(1, "PENDING");
            Assert.NotEmpty(orders);
            var orderId = orders.First().Id;

            // Advance PENDING -> CONFIRMED
            var confSuccess = await _sellerService.UpdateOrderStatusAsync(1, orderId, new UpdateOrderStatusRequest
            {
                Status = "CONFIRMED",
                ShippingTrackingCode = "GHN-TEST-123"
            });
            Assert.True(confSuccess);

            // Advance CONFIRMED -> COMPLETED
            var compSuccess = await _sellerService.UpdateOrderStatusAsync(1, orderId, new UpdateOrderStatusRequest
            {
                Status = "COMPLETED"
            });
            Assert.True(compSuccess);

            // Verify order status
            var detail = await _sellerService.GetOrderDetailAsync(1, orderId);
            Assert.NotNull(detail);
            Assert.Equal("COMPLETED", detail.Status);
            Assert.Equal("PAID", detail.PaymentStatus);

            // Verify wallet settlement
            var wallet = await _sellerService.GetWalletAsync(1);
            Assert.NotNull(wallet);
            Assert.Contains(wallet.Transactions, t => t.Type == "SETTLEMENT" && t.Note!.Contains(detail.OrderCode));
        }

        [Fact]
        public async Task Test_6_AiDescriptionGenerator_GeneratesPersuasiveVietnameseCopy()
        {
            var req = new AiGenerateDescriptionRequest
            {
                ProductName = "Sneaker Balenciaga Track 4.0",
                Category = "Giày Sneaker",
                Brand = "Balenciaga",
                Material = "Da nubuck và lưới tản nhiệt",
                Tone = "Luxury & Sang Trọng"
            };

            var res = await _sellerService.GenerateProductDescriptionAsync(req);

            Assert.NotNull(res);
            Assert.Contains("BALENCIAGA TRACK 4.0", res.GeneratedDescription);
            Assert.Contains("Luxury & Sang Trọng", res.GeneratedDescription);
            Assert.NotEmpty(res.KeyFeatures);
            Assert.NotEmpty(res.SeoKeywords);
        }
    }
}
