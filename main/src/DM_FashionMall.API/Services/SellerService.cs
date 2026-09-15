using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DM_FashionMall.API.Data;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Models;

namespace DM_FashionMall.API.Services
{
    public class SellerService : ISellerService
    {
        private readonly AppDbContext _context;

        public SellerService(AppDbContext context)
        {
            _context = context;
        }

        // 2. Dashboard
        public async Task<DashboardMetricsDto> GetDashboardMetricsAsync(int shopId)
        {
            var today = DateTime.UtcNow.Date;
            var todayOrders = await _context.Orders
                .Where(o => o.ShopId == shopId && o.CreatedAt >= today && o.Status != "CANCELLED")
                .ToListAsync();

            decimal todayRevenue = todayOrders.Sum(o => o.TotalAmount);
            int pendingOrders = await _context.Orders
                .CountAsync(o => o.ShopId == shopId && o.Status == "PENDING");

            int lowStockCount = await _context.Inventories
                .Include(i => i.Product)
                .CountAsync(i => i.Product != null && i.Product.ShopId == shopId && i.Quantity <= i.LowStockThreshold);

            int newReviews = await _context.ProductReviews
                .Include(r => r.Product)
                .CountAsync(r => r.Product != null && r.Product.ShopId == shopId && r.SellerReply == null);

            var allCompletedOrders = await _context.Orders
                .Where(o => o.ShopId == shopId && o.Status != "CANCELLED")
                .ToListAsync();

            decimal totalRevenue = allCompletedOrders.Sum(o => o.TotalAmount);
            int totalProducts = await _context.Products.CountAsync(p => p.ShopId == shopId && p.Status != "DELETED");
            int totalOrders = allCompletedOrders.Count;

            var reviews = await _context.ProductReviews
                .Include(r => r.Product)
                .Where(r => r.Product != null && r.Product.ShopId == shopId)
                .ToListAsync();

            double avgRating = reviews.Any() ? reviews.Average(r => r.Rating) : 5.0;

            return new DashboardMetricsDto
            {
                TodayRevenue = todayRevenue,
                PendingOrders = pendingOrders,
                LowStockProducts = lowStockCount,
                NewReviews = newReviews,
                TotalRevenue = totalRevenue,
                TotalProducts = totalProducts,
                TotalOrders = totalOrders,
                AverageRating = Math.Round(avgRating, 1)
            };
        }

        public async Task<List<SalesChartItemDto>> GetSalesChartDataAsync(int shopId, int days = 7)
        {
            var startDate = DateTime.UtcNow.Date.AddDays(-days + 1);
            var orders = await _context.Orders
                .Where(o => o.ShopId == shopId && o.CreatedAt >= startDate && o.Status != "CANCELLED")
                .ToListAsync();

            var result = new List<SalesChartItemDto>();
            for (int i = 0; i < days; i++)
            {
                var targetDate = startDate.AddDays(i);
                var dayOrders = orders.Where(o => o.CreatedAt.Date == targetDate.Date).ToList();
                result.Add(new SalesChartItemDto
                {
                    Date = targetDate.ToString("dd/MM"),
                    Revenue = dayOrders.Sum(o => o.TotalAmount),
                    OrderCount = dayOrders.Count
                });
            }

            return result;
        }

        // 3. Shop Profile
        public async Task<ShopProfileDto?> GetShopProfileAsync(int shopId)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(s => s.Id == shopId);
            if (shop == null) return null;

            return new ShopProfileDto
            {
                Id = shop.Id,
                ShopName = shop.ShopName,
                Slug = shop.Slug,
                LogoUrl = shop.LogoUrl,
                BannerUrl = shop.BannerUrl,
                Bio = shop.Bio,
                WarehouseAddress = shop.WarehouseAddress,
                Phone = shop.Phone,
                Email = shop.Email,
                Rating = shop.Rating,
                IsVacationMode = shop.IsVacationMode,
                CreatedAt = shop.CreatedAt
            };
        }

        public async Task<bool> UpdateShopProfileAsync(int shopId, UpdateShopProfileRequest request)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(s => s.Id == shopId);
            if (shop == null) return false;

            shop.ShopName = request.ShopName.Trim();
            shop.LogoUrl = request.LogoUrl;
            shop.BannerUrl = request.BannerUrl;
            shop.Bio = request.Bio;
            shop.WarehouseAddress = request.WarehouseAddress;
            shop.Phone = request.Phone;
            shop.Email = request.Email;
            shop.IsVacationMode = request.IsVacationMode;

            await _context.SaveChangesAsync();
            return true;
        }
        // 4, 5, 6. Products
        public async Task<List<ProductListItemDto>> GetProductsAsync(int shopId, string? search, int? categoryId, string? status)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Include(p => p.Inventory)
                .Where(p => p.ShopId == shopId && p.Status != "DELETED");

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(term) || p.Slug.ToLower().Contains(term));
            }

            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "ALL")
            {
                query = query.Where(p => p.Status == status);
            }

            var products = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();

            return products.Select(p => new ProductListItemDto
            {
                Id = p.Id,
                Name = p.Name,
                Slug = p.Slug,
                CategoryName = p.Category?.Name,
                BrandName = p.Brand?.Name,
                BasePrice = p.BasePrice,
                TotalStock = p.Variants.Sum(v => v.StockQuantity),
                Status = p.Status,
                PrimaryImageUrl = p.Images.FirstOrDefault(i => i.IsPrimary)?.ImageUrl ?? p.Images.FirstOrDefault()?.ImageUrl,
                Rating = p.Rating,
                VariantCount = p.Variants.Count,
                CreatedAt = p.CreatedAt
            }).ToList();
        }

        public async Task<ProductDetailDto?> GetProductDetailAsync(int shopId, int productId)
        {
            var p = await _context.Products
                .Include(x => x.Images.OrderBy(i => i.DisplayOrder))
                .Include(x => x.Variants)
                .Include(x => x.Inventory)
                .FirstOrDefaultAsync(x => x.ShopId == shopId && x.Id == productId && x.Status != "DELETED");

            if (p == null) return null;

            return new ProductDetailDto
            {
                Id = p.Id,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId,
                Name = p.Name,
                Slug = p.Slug,
                Description = p.Description,
                BasePrice = p.BasePrice,
                Status = p.Status,
                IsFeatured = p.IsFeatured,
                ImageUrls = p.Images.Select(i => i.ImageUrl).ToList(),
                Variants = p.Variants.Select(v => new ProductVariantDto
                {
                    Id = v.Id,
                    Sku = v.Sku,
                    Size = v.Size,
                    Color = v.Color,
                    Price = v.Price,
                    StockQuantity = v.StockQuantity,
                    ImageUrl = v.ImageUrl
                }).ToList(),
                TotalStock = p.Variants.Sum(v => v.StockQuantity)
            };
        }

        public async Task<ProductDetailDto> CreateProductAsync(int sellerId, int shopId, SaveProductRequest request)
        {
            string slug = request.Name.Trim().ToLower()
                .Replace(" ", "-")
                .Replace("/", "-") + "-" + Guid.NewGuid().ToString("N")[..6];

            var product = new Product
            {
                SellerId = sellerId,
                ShopId = shopId,
                CategoryId = request.CategoryId,
                BrandId = request.BrandId,
                Name = request.Name.Trim(),
                Slug = slug,
                Description = request.Description,
                BasePrice = request.BasePrice,
                Status = string.IsNullOrWhiteSpace(request.Status) ? "ACTIVE" : request.Status,
                IsFeatured = request.IsFeatured,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            if (request.Images != null && request.Images.Any())
            {
                for (int i = 0; i < request.Images.Count; i++)
                {
                    product.Images.Add(new ProductImage
                    {
                        ImageUrl = request.Images[i],
                        IsPrimary = (i == 0),
                        DisplayOrder = i + 1
                    });
                }
            }

            int totalStock = 0;
            if (request.Variants != null && request.Variants.Any())
            {
                foreach (var v in request.Variants)
                {
                    totalStock += v.StockQuantity;
                    product.Variants.Add(new ProductVariant
                    {
                        Sku = string.IsNullOrWhiteSpace(v.Sku) ? $"SKU-{Guid.NewGuid().ToString("N")[..8].ToUpper()}" : v.Sku,
                        Size = string.IsNullOrWhiteSpace(v.Size) ? "FREE" : v.Size,
                        Color = string.IsNullOrWhiteSpace(v.Color) ? "Default" : v.Color,
                        Price = v.Price > 0 ? v.Price : request.BasePrice,
                        StockQuantity = v.StockQuantity,
                        ImageUrl = v.ImageUrl
                    });
                }
            }
            else
            {
                totalStock = 10;
                product.Variants.Add(new ProductVariant
                {
                    Sku = $"SKU-{Guid.NewGuid().ToString("N")[..8].ToUpper()}",
                    Size = "FREE",
                    Color = "Default",
                    Price = request.BasePrice,
                    StockQuantity = 10
                });
            }

            product.Inventory = new Inventory
            {
                Quantity = totalStock,
                ReservedQuantity = 0,
                LowStockThreshold = 5,
                Status = totalStock <= 5 ? "LOW_STOCK" : "IN_STOCK"
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return await GetProductDetailAsync(shopId, product.Id) ?? throw new Exception("Lỗi tạo sản phẩm");
        }

        public async Task<bool> UpdateProductAsync(int shopId, int productId, SaveProductRequest request)
        {
            var p = await _context.Products
                .Include(x => x.Images)
                .Include(x => x.Variants)
                .Include(x => x.Inventory)
                .FirstOrDefaultAsync(x => x.ShopId == shopId && x.Id == productId);

            if (p == null) return false;

            p.Name = request.Name.Trim();
            p.CategoryId = request.CategoryId;
            p.BrandId = request.BrandId;
            p.Description = request.Description;
            p.BasePrice = request.BasePrice;
            p.Status = request.Status;
            p.IsFeatured = request.IsFeatured;
            p.UpdatedAt = DateTime.UtcNow;

            if (request.Images != null)
            {
                _context.ProductImages.RemoveRange(p.Images);
                p.Images.Clear();
                for (int i = 0; i < request.Images.Count; i++)
                {
                    p.Images.Add(new ProductImage
                    {
                        ImageUrl = request.Images[i],
                        IsPrimary = (i == 0),
                        DisplayOrder = i + 1
                    });
                }
            }

            if (request.Variants != null && request.Variants.Any())
            {
                _context.ProductVariants.RemoveRange(p.Variants);
                p.Variants.Clear();
                int totalStock = 0;
                foreach (var v in request.Variants)
                {
                    totalStock += v.StockQuantity;
                    p.Variants.Add(new ProductVariant
                    {
                        Sku = string.IsNullOrWhiteSpace(v.Sku) ? $"SKU-{Guid.NewGuid().ToString("N")[..8].ToUpper()}" : v.Sku,
                        Size = string.IsNullOrWhiteSpace(v.Size) ? "FREE" : v.Size,
                        Color = string.IsNullOrWhiteSpace(v.Color) ? "Default" : v.Color,
                        Price = v.Price > 0 ? v.Price : request.BasePrice,
                        StockQuantity = v.StockQuantity,
                        ImageUrl = v.ImageUrl
                    });
                }

                if (p.Inventory != null)
                {
                    p.Inventory.Quantity = totalStock;
                    p.Inventory.Status = totalStock <= p.Inventory.LowStockThreshold ? "LOW_STOCK" : "IN_STOCK";
                    p.Inventory.UpdatedAt = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductAsync(int shopId, int productId)
        {
            var p = await _context.Products.FirstOrDefaultAsync(x => x.ShopId == shopId && x.Id == productId);
            if (p == null) return false;

            p.Status = "DELETED";
            p.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleProductStatusAsync(int shopId, int productId)
        {
            var p = await _context.Products.FirstOrDefaultAsync(x => x.ShopId == shopId && x.Id == productId);
            if (p == null) return false;

            p.Status = (p.Status == "ACTIVE") ? "INACTIVE" : "ACTIVE";
            p.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
        // 7. Inventory
        public async Task<List<InventoryItemDto>> GetInventoryAsync(int shopId, bool lowStockOnly = false)
        {
            var query = _context.Products
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Include(p => p.Inventory)
                .Where(p => p.ShopId == shopId && p.Status != "DELETED");

            var products = await query.ToListAsync();

            var list = products.Select(p =>
            {
                int totalStock = p.Variants.Sum(v => v.StockQuantity);
                int reserved = p.Inventory?.ReservedQuantity ?? 0;
                int threshold = p.Inventory?.LowStockThreshold ?? 5;
                string status = totalStock == 0 ? "OUT_OF_STOCK" : (totalStock <= threshold ? "LOW_STOCK" : "IN_STOCK");

                return new InventoryItemDto
                {
                    ProductId = p.Id,
                    ProductName = p.Name,
                    PrimaryImageUrl = p.Images.FirstOrDefault(i => i.IsPrimary)?.ImageUrl ?? p.Images.FirstOrDefault()?.ImageUrl,
                    TotalQuantity = totalStock,
                    ReservedQuantity = reserved,
                    LowStockThreshold = threshold,
                    Status = status,
                    Variants = p.Variants.Select(v => new ProductVariantDto
                    {
                        Id = v.Id,
                        Sku = v.Sku,
                        Size = v.Size,
                        Color = v.Color,
                        Price = v.Price,
                        StockQuantity = v.StockQuantity,
                        ImageUrl = v.ImageUrl
                    }).ToList()
                };
            }).ToList();

            if (lowStockOnly)
            {
                list = list.Where(i => i.Status == "LOW_STOCK" || i.Status == "OUT_OF_STOCK").ToList();
            }

            return list;
        }

        public async Task<bool> QuickUpdateStockAsync(int shopId, QuickUpdateStockRequest request)
        {
            var product = await _context.Products
                .Include(p => p.Variants)
                .Include(p => p.Inventory)
                .FirstOrDefaultAsync(p => p.ShopId == shopId && p.Id == request.ProductId);

            if (product == null) return false;

            if (request.VariantId.HasValue && request.VariantId.Value > 0)
            {
                var variant = product.Variants.FirstOrDefault(v => v.Id == request.VariantId.Value);
                if (variant != null)
                {
                    variant.StockQuantity = request.NewQuantity;
                }
            }
            else if (product.Variants.Any())
            {
                product.Variants.First().StockQuantity = request.NewQuantity;
            }

            int newTotal = product.Variants.Sum(v => v.StockQuantity);
            if (product.Inventory != null)
            {
                product.Inventory.Quantity = newTotal;
                product.Inventory.Status = newTotal <= product.Inventory.LowStockThreshold ? "LOW_STOCK" : "IN_STOCK";
                product.Inventory.UpdatedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        // 8, 9. Orders
        public async Task<List<OrderListItemDto>> GetOrdersAsync(int shopId, string? status = null)
        {
            var query = _context.Orders
                .Include(o => o.Items)
                .Where(o => o.ShopId == shopId);

            if (!string.IsNullOrWhiteSpace(status) && status != "ALL")
            {
                query = query.Where(o => o.Status == status);
            }

            var orders = await query.OrderByDescending(o => o.CreatedAt).ToListAsync();

            return orders.Select(o => new OrderListItemDto
            {
                Id = o.Id,
                OrderCode = o.OrderCode,
                CustomerName = o.CustomerName,
                CustomerPhone = o.CustomerPhone,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                PaymentStatus = o.PaymentStatus,
                ItemCount = o.Items.Sum(i => i.Quantity),
                ShippingTrackingCode = o.ShippingTrackingCode,
                CreatedAt = o.CreatedAt
            }).ToList();
        }

        public async Task<OrderDetailDto?> GetOrderDetailAsync(int shopId, int orderId)
        {
            var o = await _context.Orders
                .Include(x => x.Items)
                .Include(x => x.Payment)
                .FirstOrDefaultAsync(x => x.ShopId == shopId && x.Id == orderId);

            if (o == null) return null;

            return new OrderDetailDto
            {
                Id = o.Id,
                OrderCode = o.OrderCode,
                CustomerName = o.CustomerName,
                CustomerPhone = o.CustomerPhone,
                ShippingAddress = o.ShippingAddress,
                Note = o.Note,
                Subtotal = o.Subtotal,
                Discount = o.Discount,
                ShippingFee = o.ShippingFee,
                TotalAmount = o.TotalAmount,
                Status = o.Status,
                PaymentStatus = o.PaymentStatus,
                PaymentMethod = o.Payment?.PaymentMethod ?? "COD",
                ShippingTrackingCode = o.ShippingTrackingCode,
                ShippingCarrier = o.ShippingCarrier,
                CreatedAt = o.CreatedAt,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    Id = i.Id,
                    VariantId = i.VariantId,
                    ProductName = i.ProductName,
                    Size = i.Size,
                    Color = i.Color,
                    Price = i.Price,
                    Quantity = i.Quantity,
                    Subtotal = i.Subtotal
                }).ToList()
            };
        }

        public async Task<bool> UpdateOrderStatusAsync(int shopId, int orderId, UpdateOrderStatusRequest request)
        {
            var order = await _context.Orders
                .Include(o => o.Shop)
                .FirstOrDefaultAsync(o => o.ShopId == shopId && o.Id == orderId);

            if (order == null) return false;

            order.Status = request.Status;
            if (!string.IsNullOrWhiteSpace(request.ShippingTrackingCode))
            {
                order.ShippingTrackingCode = request.ShippingTrackingCode;
            }
            if (!string.IsNullOrWhiteSpace(request.ShippingCarrier))
            {
                order.ShippingCarrier = request.ShippingCarrier;
            }
            if (request.Status == "COMPLETED")
            {
                order.PaymentStatus = "PAID";
                var wallet = await _context.SellerWallets.FirstOrDefaultAsync(w => w.SellerId == order.Shop!.SellerId);
                if (wallet != null)
                {
                    wallet.AvailableBalance += order.TotalAmount;
                    wallet.UpdatedAt = DateTime.UtcNow;
                    _context.WalletTransactions.Add(new WalletTransaction
                    {
                        WalletId = wallet.Id,
                        Type = "SETTLEMENT",
                        Amount = order.TotalAmount,
                        Note = $"Quyết toán hoàn tất đơn hàng {order.OrderCode}",
                        Status = "COMPLETED",
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            order.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        // 10. Shipping
        public async Task<List<ShippingChannelDto>> GetShippingChannelsAsync()
        {
            var channels = await _context.ShippingChannels.ToListAsync();
            return channels.Select(c => new ShippingChannelDto
            {
                Id = c.Id,
                Name = c.Name,
                Code = c.Code,
                IsEnabled = c.IsEnabled,
                Cost = c.Cost,
                EstimatedDays = c.EstimatedDays
            }).ToList();
        }

        public async Task<bool> ToggleShippingChannelAsync(int channelId)
        {
            var ch = await _context.ShippingChannels.FindAsync(channelId);
            if (ch == null) return false;

            ch.IsEnabled = !ch.IsEnabled;
            await _context.SaveChangesAsync();
            return true;
        }

        // 11. Promotions
        public async Task<List<PromotionDto>> GetPromotionsAsync(int shopId)
        {
            var list = await _context.Promotions
                .Where(p => p.ShopId == shopId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return list.Select(p => new PromotionDto
            {
                Id = p.Id,
                VoucherCode = p.VoucherCode,
                Title = p.Title,
                DiscountType = p.DiscountType,
                DiscountValue = p.DiscountValue,
                MinOrderValue = p.MinOrderValue,
                UsageLimit = p.UsageLimit,
                UsedCount = p.UsedCount,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                IsActive = p.IsActive && p.EndDate >= DateTime.UtcNow
            }).ToList();
        }

        public async Task<PromotionDto> CreatePromotionAsync(int shopId, CreatePromotionRequest request)
        {
            var promo = new Promotion
            {
                ShopId = shopId,
                VoucherCode = request.VoucherCode.Trim().ToUpper(),
                Title = request.Title.Trim(),
                DiscountType = request.DiscountType,
                DiscountValue = request.DiscountValue,
                MinOrderValue = request.MinOrderValue,
                UsageLimit = request.UsageLimit,
                UsedCount = 0,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Promotions.Add(promo);
            await _context.SaveChangesAsync();

            return new PromotionDto
            {
                Id = promo.Id,
                VoucherCode = promo.VoucherCode,
                Title = promo.Title,
                DiscountType = promo.DiscountType,
                DiscountValue = promo.DiscountValue,
                MinOrderValue = promo.MinOrderValue,
                UsageLimit = promo.UsageLimit,
                UsedCount = 0,
                StartDate = promo.StartDate,
                EndDate = promo.EndDate,
                IsActive = true
            };
        }

        public async Task<bool> DeletePromotionAsync(int shopId, int promoId)
        {
            var p = await _context.Promotions.FirstOrDefaultAsync(x => x.ShopId == shopId && x.Id == promoId);
            if (p == null) return false;

            _context.Promotions.Remove(p);
            await _context.SaveChangesAsync();
            return true;
        }
        // 12. Finance
        public async Task<WalletDto?> GetWalletAsync(int sellerId)
        {
            var wallet = await _context.SellerWallets
                .Include(w => w.Transactions.OrderByDescending(t => t.CreatedAt).Take(20))
                .FirstOrDefaultAsync(w => w.SellerId == sellerId);

            if (wallet == null) return null;

            return new WalletDto
            {
                AvailableBalance = wallet.AvailableBalance,
                PendingBalance = wallet.PendingBalance,
                BankName = wallet.BankName,
                BankAccountNumber = wallet.BankAccountNumber,
                BankAccountName = wallet.BankAccountName,
                Transactions = wallet.Transactions.Select(t => new WalletTransactionDto
                {
                    Id = t.Id,
                    Type = t.Type,
                    Amount = t.Amount,
                    Note = t.Note,
                    Status = t.Status,
                    CreatedAt = t.CreatedAt
                }).ToList()
            };
        }

        public async Task<bool> RequestWithdrawAsync(int sellerId, WithdrawRequest request)
        {
            var wallet = await _context.SellerWallets.FirstOrDefaultAsync(w => w.SellerId == sellerId);
            if (wallet == null || wallet.AvailableBalance < request.Amount) return false;

            wallet.AvailableBalance -= request.Amount;
            wallet.BankName = request.BankName;
            wallet.BankAccountNumber = request.BankAccountNumber;
            wallet.BankAccountName = request.BankAccountName;
            wallet.UpdatedAt = DateTime.UtcNow;

            var trans = new WalletTransaction
            {
                WalletId = wallet.Id,
                Type = "WITHDRAW",
                Amount = request.Amount,
                Note = $"Rút tiền về {request.BankName} - {request.BankAccountNumber} ({request.BankAccountName})",
                Status = "COMPLETED",
                CreatedAt = DateTime.UtcNow
            };
            _context.WalletTransactions.Add(trans);

            await _context.SaveChangesAsync();
            return true;
        }

        // 13. Analytics
        public async Task<AnalyticsOverviewDto> GetAnalyticsOverviewAsync(int shopId)
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .Where(o => o.ShopId == shopId && o.Status != "CANCELLED")
                .ToListAsync();

            decimal totalRevenue = orders.Sum(o => o.TotalAmount);
            int totalOrders = orders.Count;
            int totalViews = totalOrders * 32 + 1540;
            double conversionRate = totalViews > 0 ? Math.Round(((double)totalOrders / totalViews) * 100, 2) : 0;

            var dailyRevenue = await GetSalesChartDataAsync(shopId, 7);

            var itemGroups = orders.SelectMany(o => o.Items)
                .GroupBy(i => i.ProductName)
                .Select(g => new
                {
                    ProductName = g.Key,
                    UnitsSold = g.Sum(x => x.Quantity),
                    Revenue = g.Sum(x => x.Subtotal)
                })
                .OrderByDescending(x => x.UnitsSold)
                .Take(5)
                .ToList();

            var topProducts = new List<TopProductDto>();
            foreach (var g in itemGroups)
            {
                var prod = await _context.Products
                    .Include(p => p.Images)
                    .FirstOrDefaultAsync(p => p.Name == g.ProductName);

                topProducts.Add(new TopProductDto
                {
                    ProductId = prod?.Id ?? 0,
                    ProductName = g.ProductName,
                    ImageUrl = prod?.Images.FirstOrDefault()?.ImageUrl,
                    UnitsSold = g.UnitsSold,
                    TotalRevenue = g.Revenue
                });
            }

            return new AnalyticsOverviewDto
            {
                TotalRevenue = totalRevenue,
                TotalOrders = totalOrders,
                TotalViews = totalViews,
                ConversionRate = conversionRate,
                DailyRevenue = dailyRevenue,
                TopProducts = topProducts
            };
        }

        // 14. Reviews
        public async Task<List<ReviewDto>> GetReviewsAsync(int shopId, int? rating = null)
        {
            var query = _context.ProductReviews
                .Include(r => r.Product)
                .Where(r => r.Product != null && r.Product.ShopId == shopId);

            if (rating.HasValue && rating.Value > 0)
            {
                query = query.Where(r => r.Rating == rating.Value);
            }

            var list = await query.OrderByDescending(r => r.CreatedAt).ToListAsync();

            return list.Select(r => new ReviewDto
            {
                Id = r.Id,
                ProductId = r.ProductId,
                ProductName = r.Product?.Name ?? "Sản phẩm",
                CustomerName = r.CustomerName,
                Rating = r.Rating,
                Comment = r.Comment,
                SellerReply = r.SellerReply,
                ReplyAt = r.ReplyAt,
                CreatedAt = r.CreatedAt
            }).ToList();
        }

        public async Task<bool> ReplyReviewAsync(int shopId, int reviewId, ReplyReviewRequest request)
        {
            var rev = await _context.ProductReviews
                .Include(r => r.Product)
                .FirstOrDefaultAsync(r => r.Id == reviewId && r.Product != null && r.Product.ShopId == shopId);

            if (rev == null) return false;

            rev.SellerReply = request.Reply.Trim();
            rev.ReplyAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        // 15. Settings
        public async Task<SettingsDto?> GetSettingsAsync(int shopId)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(s => s.Id == shopId);
            if (shop == null) return null;

            return new SettingsDto
            {
                IsVacationMode = shop.IsVacationMode,
                EmailNotifications = true,
                AutoConfirmOrders = false,
                Hotline = shop.Phone,
                SupportEmail = shop.Email
            };
        }

        public async Task<bool> UpdateSettingsAsync(int shopId, UpdateSettingsRequest request)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(s => s.Id == shopId);
            if (shop == null) return false;

            shop.IsVacationMode = request.IsVacationMode;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordRequest request)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
            {
                return false;
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        // AI Copywriter Generation
        public Task<AiGenerateDescriptionResponse> GenerateProductDescriptionAsync(AiGenerateDescriptionRequest request)
        {
            string name = request.ProductName.Trim();
            string cat = request.Category ?? "Thời trang cao cấp";
            string brand = !string.IsNullOrWhiteSpace(request.Brand) ? $"thương hiệu {request.Brand}" : "bộ sưu tập tuyển chọn";
            string material = !string.IsNullOrWhiteSpace(request.Material) ? request.Material : "chất liệu cao cấp thoáng khí, co giãn 4 chiều";
            string tone = request.Tone ?? "Luxury & Sang trọng";

            var sb = new StringBuilder();
            sb.AppendLine($"🔥 **{name.ToUpper()} — ĐẲNG CẤP PHONG CÁCH THỜI TRANG ĐƯƠNG ĐẠI** 🔥\n");
            sb.AppendLine($"Khẳng định dấu ấn cá nhân cùng siêu phẩm thời trang thuộc {brand}. Sản phẩm được chế tác tỉ mỉ dựa trên tiêu chuẩn khắt khe, mang đến sự hòa quyện hoàn hảo giữa tính thẩm mỹ thời thượng và trải nghiệm êm ái, thoải mái suốt cả ngày dài.\n");
            sb.AppendLine("✨ **ĐIỂM NỔI BẬT KHÔNG THỂ BỎ LỠ:**");
            sb.AppendLine($"• **Chất liệu đỉnh cao:** Sử dụng {material}, chống nhăn, bền màu và nâng niu làn da.");
            sb.AppendLine($"• **Phom dáng chuẩn mực:** Thiết kế tôn dáng thanh lịch, phù hợp phong cách {tone}, dễ dàng biến tấu từ dạo phố đến các sự kiện trang trọng.");
            sb.AppendLine("• **Gia công tinh xảo:** Từng đường may, đường chỉ đều được xử lý công phu, tạo độ bền chắc tối đa theo năm tháng.");
            sb.AppendLine("• **Bản phối màu độc quyền:** Gam màu thời trang đón đầu xu hướng, dễ dàng phối cùng mọi item khác trong tủ đồ.\n");
            sb.AppendLine("📋 **HƯỚNG DẪN BẢO QUẢN & GIẶT:**");
            sb.AppendLine("- Khuyến khích giặt tay hoặc giặt máy ở chế độ nhẹ nhàng.");
            sb.AppendLine("- Không ngâm sản phẩm với chất tẩy mạnh.");
            sb.AppendLine("- Phơi nơi râm mát, tránh ánh nắng trực tiếp gay gắt.\n");
            sb.AppendLine("💯 **CAM KẾT TỪ GIAN HÀNG CHÍNH HÃNG:**");
            sb.AppendLine("- 100% hình ảnh thực tế tự chụp tại studio.");
            sb.AppendLine("- Đổi trả trong 7 ngày nếu lỗi do nhà sản xuất hoặc không vừa size.");
            sb.AppendLine("- Đóng gói hộp quà sang trọng (Double Box) chống móp méo khi vận chuyển.");

            var response = new AiGenerateDescriptionResponse
            {
                GeneratedDescription = sb.ToString(),
                KeyFeatures = new List<string>
                {
                    $"Chất liệu {material}",
                    $"Phong cách thiết kế {tone}",
                    "Đường may hoàn thiện thủ công cao cấp",
                    "Đổi trả linh hoạt trong vòng 7 ngày",
                    "Đóng gói chuẩn hộp quà Double-box sang trọng"
                },
                SeoKeywords = $"{name}, thời trang {cat}, {brand}, thời trang hàng hiệu, mua {name} chính hãng giá tốt"
            };

            return Task.FromResult(response);
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.Where(c => c.Status == "ACTIVE").ToListAsync();
        }

        public async Task<List<Brand>> GetBrandsAsync()
        {
            return await _context.Brands.ToListAsync();
        }
    }
}
