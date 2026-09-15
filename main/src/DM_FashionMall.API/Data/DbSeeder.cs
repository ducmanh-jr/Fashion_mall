using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DM_FashionMall.API.Models;

namespace DM_FashionMall.API.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            await context.Database.EnsureCreatedAsync();

            // 1. Check if Categories exist
            if (!await context.Categories.AnyAsync())
            {
                var categories = new List<Category>
                {
                    new() { Name = "Giày Sneaker", Slug = "giay-sneaker", Description = "Các dòng sneaker thời thượng cao cấp" },
                    new() { Name = "Áo Hoodie & Sweatshirt", Slug = "ao-hoodie-sweatshirt", Description = "Áo nỉ, hoodie phong cách đường phố" },
                    new() { Name = "Áo Phông / T-Shirt", Slug = "ao-phong-tshirt", Description = "Áo thun cotton cao cấp thoáng mát" },
                    new() { Name = "Quần Dài & Quần Jean", Slug = "quan-dai-quan-jean", Description = "Quần jean ống rộng, cargo pants" },
                    new() { Name = "Phụ Kiện Thời Trang", Slug = "phu-kien-thoi-trang", Description = "Túi xách, thắt lưng, kính mắt" }
                };
                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }

            // 2. Check Brands
            if (!await context.Brands.AnyAsync())
            {
                var brands = new List<Brand>
                {
                    new() { Name = "Balenciaga", Slug = "balenciaga", Description = "Thương hiệu thời trang xa xỉ hàng đầu Paris" },
                    new() { Name = "Adidas", Slug = "adidas", Description = "Hãng thể thao iconic toàn cầu" },
                    new() { Name = "Nike", Slug = "nike", Description = "Just Do It - Đột phá phong cách thể thao đương đại" },
                    new() { Name = "Gucci", Slug = "gucci", Description = "Biểu tượng thời trang haute couture Ý" },
                    new() { Name = "Puma", Slug = "puma", Description = "Thời trang thể thao năng động và đường phố" }
                };
                await context.Brands.AddRangeAsync(brands);
                await context.SaveChangesAsync();
            }

            // 3. Check Users (Seller & Customer)
            User? seller = await context.Users.FirstOrDefaultAsync(u => u.Email == "seller@dmfashionmall.vn");
            if (seller == null)
            {
                seller = new User
                {
                    FullName = "Nguyễn Đức Mạnh (Seller VIP)",
                    Email = "seller@dmfashionmall.vn",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                    Phone = "0987654321",
                    Address = "Tòa Discovery Complex, 302 Cầu Giấy, Hà Nội",
                    Role = "SELLER"
                };
                await context.Users.AddAsync(seller);

                var customer = new User
                {
                    FullName = "Hoàng Minh Quân",
                    Email = "customer@dmfashionmall.vn",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                    Phone = "0912345678",
                    Address = "15 Lê Thánh Tông, Hoàn Kiếm, Hà Nội",
                    Role = "CUSTOMER"
                };
                await context.Users.AddAsync(customer);
                await context.SaveChangesAsync();
            }

            // 4. Check Shop
            Shop? shop = await context.Shops.FirstOrDefaultAsync(s => s.SellerId == seller.Id);
            if (shop == null)
            {
                shop = new Shop
                {
                    SellerId = seller.Id,
                    ShopName = "Aethelgard Luxury Store",
                    Slug = "aethelgard-luxury-store",
                    LogoUrl = "img/fashion_mood_board.jpg",
                    BannerUrl = "img/fashion_mood_board.jpg",
                    Bio = "Cung cấp thời trang streetwear, giày sneaker chính hãng và các phụ kiện thời trang xa xỉ tuyển chọn.",
                    WarehouseAddress = "Kho KCN Đài Tư, 386 Nguyễn Văn Linh, Sài Đồng, Long Biên, Hà Nội",
                    Phone = "0987654321",
                    Email = "seller@dmfashionmall.vn",
                    Rating = 4.9,
                    IsVacationMode = false
                };
                await context.Shops.AddAsync(shop);
                await context.SaveChangesAsync();

                // Create Wallet for Seller
                var wallet = new SellerWallet
                {
                    SellerId = seller.Id,
                    AvailableBalance = 48500000,
                    PendingBalance = 8200000,
                    BankName = "Vietcombank",
                    BankAccountNumber = "1018293847",
                    BankAccountName = "NGUYEN DUC MANH"
                };
                await context.SellerWallets.AddAsync(wallet);
                await context.SaveChangesAsync();

                // Add sample wallet transactions
                var trans = new List<WalletTransaction>
                {
                    new() { WalletId = wallet.Id, Type = "SETTLEMENT", Amount = 12500000, Note = "Quyết toán đơn hàng kỳ 1 tháng này", Status = "COMPLETED", CreatedAt = DateTime.UtcNow.AddDays(-5) },
                    new() { WalletId = wallet.Id, Type = "SETTLEMENT", Amount = 8900000, Note = "Quyết toán đơn hàng kỳ 2 tháng này", Status = "COMPLETED", CreatedAt = DateTime.UtcNow.AddDays(-2) },
                    new() { WalletId = wallet.Id, Type = "WITHDRAW", Amount = 15000000, Note = "Rút tiền về tài khoản Vietcombank", Status = "COMPLETED", CreatedAt = DateTime.UtcNow.AddDays(-1) }
                };
                await context.WalletTransactions.AddRangeAsync(trans);
                await context.SaveChangesAsync();
            }

            // 5. Check Products
            if (!await context.Products.AnyAsync(p => p.ShopId == shop.Id))
            {
                var catSneaker = await context.Categories.FirstAsync(c => c.Slug == "giay-sneaker");
                var catHoodie = await context.Categories.FirstAsync(c => c.Slug == "ao-hoodie-sweatshirt");
                var catPants = await context.Categories.FirstAsync(c => c.Slug == "quan-dai-quan-jean");

                var brandBalen = await context.Brands.FirstAsync(b => b.Slug == "balenciaga");
                var brandAdidas = await context.Brands.FirstAsync(b => b.Slug == "adidas");
                var brandNike = await context.Brands.FirstAsync(b => b.Slug == "nike");

                // Product 1: Balenciaga Track 4.0
                var p1 = new Product
                {
                    SellerId = seller.Id,
                    ShopId = shop.Id,
                    CategoryId = catSneaker.Id,
                    BrandId = brandBalen.Id,
                    Name = "Giày Sneaker Balenciaga Track 4.0 Black Camo",
                    Slug = "giay-sneaker-balenciaga-track-4-0-black-camo",
                    Description = "Thiết kế layer độc đáo với cấu trúc 176 chi tiết đan xen tinh xảo. Đế giày giảm chấn khí nén TPU tiên tiến, phù hợp phong cách high-end streetwear năng động.",
                    BasePrice = 18500000,
                    Rating = 5.0,
                    IsFeatured = true,
                    Status = "ACTIVE"
                };
                p1.Images.Add(new ProductImage { ImageUrl = "img/Balenciaga_Track_4_0_570391_W2GN7_2009.jpg", IsPrimary = true, DisplayOrder = 1 });
                p1.Images.Add(new ProductImage { ImageUrl = "img/balanciagatrackthug_.jpg", IsPrimary = false, DisplayOrder = 2 });
                p1.Variants.Add(new ProductVariant { Sku = "BLC-TRK-40-BLK", Size = "40", Color = "Đen Than", Price = 18500000, StockQuantity = 12 });
                p1.Variants.Add(new ProductVariant { Sku = "BLC-TRK-41-BLK", Size = "41", Color = "Đen Than", Price = 18500000, StockQuantity = 18 });
                p1.Variants.Add(new ProductVariant { Sku = "BLC-TRK-42-BLK", Size = "42", Color = "Đen Than", Price = 18500000, StockQuantity = 3 }); // Low stock!
                p1.Inventory = new Inventory { Quantity = 33, ReservedQuantity = 3, LowStockThreshold = 5, Status = "IN_STOCK" };

                // Product 2: Adidas Samba OG
                var p2 = new Product
                {
                    SellerId = seller.Id,
                    ShopId = shop.Id,
                    CategoryId = catSneaker.Id,
                    BrandId = brandAdidas.Id,
                    Name = "Giày Sneaker Adidas Samba OG Cloud White",
                    Slug = "giay-sneaker-adidas-samba-og-cloud-white",
                    Description = "Dòng giày cổ điển huyền thoại của Adidas, chất liệu da cao cấp mềm mại kết hợp mũi da lộn chữ T biểu tượng. Phù hợp mọi outfit từ basic đến casual thanh lịch.",
                    BasePrice = 2800000,
                    Rating = 4.8,
                    IsFeatured = true,
                    Status = "ACTIVE"
                };
                p2.Images.Add(new ProductImage { ImageUrl = "img/addidas_samba.jpg", IsPrimary = true, DisplayOrder = 1 });
                p2.Variants.Add(new ProductVariant { Sku = "ADS-SAM-39-WHT", Size = "39", Color = "Trắng / Đen", Price = 2800000, StockQuantity = 2 }); // Low stock!
                p2.Variants.Add(new ProductVariant { Sku = "ADS-SAM-40-WHT", Size = "40", Color = "Trắng / Đen", Price = 2800000, StockQuantity = 25 });
                p2.Variants.Add(new ProductVariant { Sku = "ADS-SAM-41-WHT", Size = "41", Color = "Trắng / Đen", Price = 2800000, StockQuantity = 15 });
                p2.Inventory = new Inventory { Quantity = 42, ReservedQuantity = 4, LowStockThreshold = 5, Status = "IN_STOCK" };

                // Product 3: Nike Men's Summer Sneaker
                var p3 = new Product
                {
                    SellerId = seller.Id,
                    ShopId = shop.Id,
                    CategoryId = catSneaker.Id,
                    BrandId = brandNike.Id,
                    Name = "Giày Thể Thao Nike Men's Summer Breathable",
                    Slug = "giay-the-thao-nike-mens-summer-breathable",
                    Description = "Phiên bản giày thể thao mùa hè siêu nhẹ thoáng khí, vải lưới dệt đa lớp tản nhiệt, đệm lót êm ái hỗ trợ vận động thể thao hoặc dạo phố cả ngày.",
                    BasePrice = 3450000,
                    Rating = 4.7,
                    IsFeatured = true,
                    Status = "ACTIVE"
                };
                p3.Images.Add(new ProductImage { ImageUrl = "img/nike_summer_sneaker.jpg", IsPrimary = true, DisplayOrder = 1 });
                p3.Variants.Add(new ProductVariant { Sku = "NKE-SMR-40-GRY", Size = "40", Color = "Xám Bạc", Price = 3450000, StockQuantity = 8 });
                p3.Variants.Add(new ProductVariant { Sku = "NKE-SMR-41-GRY", Size = "41", Color = "Xám Bạc", Price = 3450000, StockQuantity = 14 });
                p3.Inventory = new Inventory { Quantity = 22, ReservedQuantity = 2, LowStockThreshold = 5, Status = "IN_STOCK" };

                // Product 4: Adidas Sakura Zip-Up Hoodie
                var p4 = new Product
                {
                    SellerId = seller.Id,
                    ShopId = shop.Id,
                    CategoryId = catHoodie.Id,
                    BrandId = brandAdidas.Id,
                    Name = "Áo Khoác Nỉ Adidas Sakura Zip Up Hoodie Limited",
                    Slug = "ao-khoac-ni-adidas-sakura-zip-up-hoodie-limited",
                    Description = "Bản giới hạn họa tiết hoa anh đào Sakura tinh tế trên nền vải nỉ bông chân cua 420gsm giữ ấm tối ưu. Form dáng relaxed trẻ trung phong cách Harajuku.",
                    BasePrice = 2150000,
                    Rating = 5.0,
                    IsFeatured = false,
                    Status = "ACTIVE"
                };
                p4.Images.Add(new ProductImage { ImageUrl = "img/Adidas_sakura_zip_up_hoodie.jpg", IsPrimary = true, DisplayOrder = 1 });
                p4.Variants.Add(new ProductVariant { Sku = "ADS-SKR-M-PNK", Size = "M", Color = "Hồng Pastel", Price = 2150000, StockQuantity = 4 }); // Low stock!
                p4.Variants.Add(new ProductVariant { Sku = "ADS-SKR-L-PNK", Size = "L", Color = "Hồng Pastel", Price = 2150000, StockQuantity = 10 });
                p4.Inventory = new Inventory { Quantity = 14, ReservedQuantity = 1, LowStockThreshold = 5, Status = "IN_STOCK" };

                // Product 5: Oversized Ripped Balenciaga Pants
                var p5 = new Product
                {
                    SellerId = seller.Id,
                    ShopId = shop.Id,
                    CategoryId = catPants.Id,
                    BrandId = brandBalen.Id,
                    Name = "Quần Jean Rách Oversized Ripped Balenciaga Runway",
                    Slug = "quan-jean-rach-oversized-ripped-balenciaga-runway",
                    Description = "Thiết kế wash màu vintage kinh điển từ sàn diễn thời trang Paris. Kỹ thuật cào rách thủ công tạo điểm nhấn nổi loạn và phong cách grunge bụi bặm.",
                    BasePrice = 14200000,
                    Rating = 4.9,
                    IsFeatured = false,
                    Status = "ACTIVE"
                };
                p5.Images.Add(new ProductImage { ImageUrl = "img/Oversized_ripped_balenciaga_jacket.jpg", IsPrimary = true, DisplayOrder = 1 });
                p5.Variants.Add(new ProductVariant { Sku = "BLC-RIPPED-M-BLU", Size = "M", Color = "Xanh Wash Cổ Điển", Price = 14200000, StockQuantity = 6 });
                p5.Variants.Add(new ProductVariant { Sku = "BLC-RIPPED-L-BLU", Size = "L", Color = "Xanh Wash Cổ Điển", Price = 14200000, StockQuantity = 1 }); // Low stock!
                p5.Inventory = new Inventory { Quantity = 4, ReservedQuantity = 0, LowStockThreshold = 5, Status = "LOW_STOCK" };

                await context.Products.AddRangeAsync(p1, p2, p3, p4, p5);
                await context.SaveChangesAsync();

                // 6. Seed Sample Orders
                var sampleCustomer = await context.Users.FirstAsync(u => u.Role == "CUSTOMER");
                var variantSamba = p2.Variants.First();
                var variantTrack = p1.Variants.First();

                var order1 = new Order
                {
                    OrderCode = "DMF-2026-001",
                    UserId = sampleCustomer.Id,
                    ShopId = shop.Id,
                    CustomerName = "Lê Thị Mai Anh",
                    CustomerPhone = "0945678123",
                    ShippingAddress = "Số 88 Phố Huế, P. Hàng Bài, Hoàn Kiếm, Hà Nội",
                    Note = "Giao giờ hành chính giúp mình nhé",
                    Subtotal = 2800000,
                    Discount = 100000,
                    ShippingFee = 30000,
                    TotalAmount = 2730000,
                    Status = "PENDING",
                    PaymentStatus = "PAID",
                    CreatedAt = DateTime.UtcNow.AddHours(-2)
                };
                order1.Items.Add(new OrderItem
                {
                    VariantId = variantSamba.Id,
                    ProductName = p2.Name,
                    Size = variantSamba.Size,
                    Color = variantSamba.Color,
                    Price = variantSamba.Price,
                    Quantity = 1,
                    Subtotal = 2800000
                });
                order1.Payment = new Payment { PaymentMethod = "BANK_TRANSFER", Amount = 2730000, Status = "PAID", TransactionId = "VNPAY987123" };

                var order2 = new Order
                {
                    OrderCode = "DMF-2026-002",
                    UserId = sampleCustomer.Id,
                    ShopId = shop.Id,
                    CustomerName = "Trần Tuấn Kiệt",
                    CustomerPhone = "0903334455",
                    ShippingAddress = "Landmark 81, Vinhomes Central Park, Bình Thạnh, TP.HCM",
                    Note = "Bọc hàng cẩn thận hộp giúp shop",
                    Subtotal = 18500000,
                    Discount = 500000,
                    ShippingFee = 0,
                    TotalAmount = 18000000,
                    Status = "CONFIRMED",
                    PaymentStatus = "PAID",
                    ShippingTrackingCode = "GHN-HCM-89210",
                    ShippingCarrier = "Giao Hàng Nhanh (GHN)",
                    CreatedAt = DateTime.UtcNow.AddHours(-8)
                };
                order2.Items.Add(new OrderItem
                {
                    VariantId = variantTrack.Id,
                    ProductName = p1.Name,
                    Size = variantTrack.Size,
                    Color = variantTrack.Color,
                    Price = variantTrack.Price,
                    Quantity = 1,
                    Subtotal = 18500000
                });
                order2.Payment = new Payment { PaymentMethod = "ONLINE", Amount = 18000000, Status = "PAID", TransactionId = "CARD_VISA_8819" };

                var order3 = new Order
                {
                    OrderCode = "DMF-2026-003",
                    UserId = sampleCustomer.Id,
                    ShopId = shop.Id,
                    CustomerName = "Nguyễn Bảo Long",
                    CustomerPhone = "0977889900",
                    ShippingAddress = "24 Tràng Thi, Hàng Trống, Hoàn Kiếm, Hà Nội",
                    Subtotal = 2150000,
                    Discount = 0,
                    ShippingFee = 35000,
                    TotalAmount = 2185000,
                    Status = "SHIPPING",
                    PaymentStatus = "UNPAID",
                    ShippingTrackingCode = "GHTK-HN-441029",
                    ShippingCarrier = "Giao Hàng Tiết Kiệm (GHTK)",
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                };
                order3.Items.Add(new OrderItem
                {
                    VariantId = p4.Variants.First().Id,
                    ProductName = p4.Name,
                    Size = p4.Variants.First().Size,
                    Color = p4.Variants.First().Color,
                    Price = p4.Variants.First().Price,
                    Quantity = 1,
                    Subtotal = 2150000
                });
                order3.Payment = new Payment { PaymentMethod = "COD", Amount = 2185000, Status = "PENDING" };

                var order4 = new Order
                {
                    OrderCode = "DMF-2026-004",
                    UserId = sampleCustomer.Id,
                    ShopId = shop.Id,
                    CustomerName = "Đặng Thùy Dương",
                    CustomerPhone = "0918776655",
                    ShippingAddress = "12 Nguyễn Huệ, Quận 1, TP.HCM",
                    Subtotal = 3450000,
                    Discount = 200000,
                    ShippingFee = 0,
                    TotalAmount = 3250000,
                    Status = "COMPLETED",
                    PaymentStatus = "PAID",
                    ShippingTrackingCode = "SPX-9821038",
                    ShippingCarrier = "Shopee Xpress",
                    CreatedAt = DateTime.UtcNow.AddDays(-3)
                };
                order4.Items.Add(new OrderItem
                {
                    VariantId = p3.Variants.First().Id,
                    ProductName = p3.Name,
                    Size = p3.Variants.First().Size,
                    Color = p3.Variants.First().Color,
                    Price = p3.Variants.First().Price,
                    Quantity = 1,
                    Subtotal = 3450000
                });
                order4.Payment = new Payment { PaymentMethod = "ONLINE", Amount = 3250000, Status = "PAID" };

                await context.Orders.AddRangeAsync(order1, order2, order3, order4);
                await context.SaveChangesAsync();

                // 7. Seed Promotions
                var promos = new List<Promotion>
                {
                    new() { ShopId = shop.Id, VoucherCode = "LUXURY10", Title = "Giảm 10% cho đơn hàng đầu tiên", DiscountType = "PERCENT", DiscountValue = 10, MinOrderValue = 1000000, UsageLimit = 200, UsedCount = 45, StartDate = DateTime.UtcNow.AddDays(-10), EndDate = DateTime.UtcNow.AddDays(30), IsActive = true },
                    new() { ShopId = shop.Id, VoucherCode = "FREESHIP50", Title = "Miễn phí vận chuyển 50k", DiscountType = "FIXED", DiscountValue = 50000, MinOrderValue = 500000, UsageLimit = 500, UsedCount = 120, StartDate = DateTime.UtcNow.AddDays(-5), EndDate = DateTime.UtcNow.AddDays(60), IsActive = true },
                    new() { ShopId = shop.Id, VoucherCode = "VIPSPRING", Title = "Tri ân khách VIP giảm 500.000đ", DiscountType = "FIXED", DiscountValue = 500000, MinOrderValue = 5000000, UsageLimit = 50, UsedCount = 18, StartDate = DateTime.UtcNow, EndDate = DateTime.UtcNow.AddDays(15), IsActive = true }
                };
                await context.Promotions.AddRangeAsync(promos);

                // 8. Seed Product Reviews
                var reviews = new List<ProductReview>
                {
                    new() { ProductId = p1.Id, OrderId = 1, UserId = sampleCustomer.Id, CustomerName = "Lê Hoàng Yến", Rating = 5, Comment = "Đôi Balenciaga Track chuẩn auth từng chi tiết, đóng gói hộp double box nguyên seal rất xịn!", SellerReply = "Dạ Aethelgard xin chân thành cảm ơn chị Yến đã ủng hộ shop ạ, chúc chị luôn phong cách và tự tin!", ReplyAt = DateTime.UtcNow.AddDays(-1), CreatedAt = DateTime.UtcNow.AddDays(-2) },
                    new() { ProductId = p2.Id, OrderId = 2, UserId = sampleCustomer.Id, CustomerName = "Trần Đức Trọng", Rating = 5, Comment = "Samba đi êm chân, form ôm chân chuẩn size. Shop tư vấn size rất nhiệt tình!", CreatedAt = DateTime.UtcNow.AddDays(-4) },
                    new() { ProductId = p3.Id, OrderId = 3, UserId = sampleCustomer.Id, CustomerName = "Vũ Hải Đăng", Rating = 4, Comment = "Giày nhẹ thoáng khí tốt cho mùa hè, giao hàng hơi chậm 1 ngày do mưa bão nhưng sản phẩm tuyệt vời.", SellerReply = "Cảm ơn anh Đăng đã thông cảm cho đơn vị vận chuyển do thời tiết bất lợi ạ!", ReplyAt = DateTime.UtcNow.AddHours(-12), CreatedAt = DateTime.UtcNow.AddDays(-1) }
                };
                await context.ProductReviews.AddRangeAsync(reviews);

                // 9. Seed Shipping Channels
                var shippingChannels = new List<ShippingChannel>
                {
                    new() { Name = "Giao Hàng Hỏa Tốc (2h)", Code = "EXPRESS_2H", IsEnabled = true, Cost = 50000, EstimatedDays = "2 giờ" },
                    new() { Name = "Giao Hàng Nhanh (GHN)", Code = "GHN_STANDARD", IsEnabled = true, Cost = 30000, EstimatedDays = "1 - 2 ngày" },
                    new() { Name = "Giao Hàng Tiết Kiệm (GHTK)", Code = "GHTK_ECONOMY", IsEnabled = true, Cost = 25000, EstimatedDays = "2 - 3 ngày" },
                    new() { Name = "Viettel Post Toàn Quốc", Code = "VIETTEL_POST", IsEnabled = true, Cost = 32000, EstimatedDays = "2 - 4 ngày" }
                };
                await context.ShippingChannels.AddRangeAsync(shippingChannels);

                await context.SaveChangesAsync();
            }
        }
    }
}
