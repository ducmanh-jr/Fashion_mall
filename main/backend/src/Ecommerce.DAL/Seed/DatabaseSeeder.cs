using System.Security.Cryptography;
using System.Text;
using Ecommerce.Common.Entities;
using Ecommerce.Common.Enums;
using Ecommerce.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.DAL.Seed;

public static class DatabaseSeeder
{
    public static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // 1. Seed Users
        if (!await context.Users.AnyAsync())
        {
            var users = new List<User>
            {
                new User
                {
                    FullName = "Nguyễn Đức Mạnh",
                    Email = "ducmanh@gmail.com",
                    PasswordHash = HashPassword("Password123@"),
                    Role = UserRole.Seller,
                    PhoneNumber = "+84 987 654 321",
                    AvatarUrl = "img/sample-nextgen.jpg",
                    IsEmailVerified = true
                },
                new User
                {
                    FullName = "Aethelgard Admin",
                    Email = "admin@gmail.com",
                    PasswordHash = HashPassword("Password123@"),
                    Role = UserRole.Admin,
                    PhoneNumber = "+84 912 345 678",
                    AvatarUrl = "img/sample-velora.jpg",
                    IsEmailVerified = true
                },
                new User
                {
                    FullName = "Esther Howard",
                    Email = "esther.howard@example.com",
                    PasswordHash = HashPassword("Password123@"),
                    Role = UserRole.Customer,
                    PhoneNumber = "+1 555 123 4567",
                    AvatarUrl = null,
                    IsEmailVerified = true
                }
            };
            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }

        // 2. Seed Categories
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "Giày Sneaker & Thể Thao", Slug = "giay-sneaker-the-thao", Description = "Bộ sưu tập giày sneaker hàng hiệu chính hãng" },
                new Category { Id = 2, Name = "Thời Trang Streetwear & Áo Khoác", Slug = "thoi-trang-streetwear-ao-khoac", Description = "Áo khoác, hoodie, jacket phong cách hiện đại" },
                new Category { Id = 3, Name = "Quần & Phụ Kiện Thời Trang", Slug = "quan-phu-kien-thoi-trang", Description = "Kính mắt, thắt lưng, túi xách cao cấp" },
                new Category { Id = 4, Name = "Gia Dụng & Đời Sống", Slug = "gia-dung-doi-song", Description = "Vật phẩm nội thất & phong cách sống tinh tế" }
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }

        // 3. Seed Products (20 Real Products with verified images from sketch/dashboard/app.js)
        if (!await context.Products.AnyAsync())
        {
            var products = new List<Product>
            {
                new Product
                {
                    Id = 101,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Adidas Samba OG Classic White Black",
                    Slug = "giay-adidas-samba-og-classic",
                    Sku = "ADI-SAMBA-01",
                    CollectionName = "Adidas Originals Terrace",
                    Description = "Giày thể thao Adidas Samba OG phiên bản Classic phối màu trắng đen cổ điển, chất liệu da thật cao cấp kết hợp mũi T-toe da lộn.",
                    BasePrice = 2790000m,
                    OriginalPrice = 3200000m,
                    DiscountPercent = 12,
                    ImageUrl = "img/addidas samba.jpg",
                    StockQuantity = 45,
                    StockStatus = StockStatus.InStock,
                    Material = "Full-grain leather with suede overlay",
                    CareInstructions = "Lau sạch nhẹ nhàng bằng khăn mềm ẩm",
                    CountryOfOrigin = "Việt Nam / Germany",
                    Rating = 4.9,
                    ReviewCount = 86
                },
                new Product
                {
                    Id = 102,
                    SellerId = 1,
                    CategoryId = 2,
                    Name = "Áo Khoác Nỉ Adidas Sakura Special Edition",
                    Slug = "ao-khoac-ni-adidas-sakura",
                    Sku = "ADI-SAKURA-02",
                    CollectionName = "Adidas Sakura 2024",
                    Description = "Áo khoác nỉ Adidas phối họa tiết thêu hoa anh đào độc đáo, chất nỉ bông dày dặn giữ ấm tối ưu.",
                    BasePrice = 2190000m,
                    OriginalPrice = 2500000m,
                    DiscountPercent = 12,
                    ImageUrl = "img/Adidas sakura zip up hoodie.jpg",
                    StockQuantity = 30,
                    StockStatus = StockStatus.InStock,
                    Material = "100% Cotton Fleece",
                    CareInstructions = "Giặt máy chế độ nhẹ, không sấy nhiệt cao",
                    CountryOfOrigin = "Việt Nam",
                    Rating = 4.8,
                    ReviewCount = 54
                },
                new Product
                {
                    Id = 103,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Balenciaga Track 4.0 Tan/Beige",
                    Slug = "giay-balenciaga-track-40-tan-beige",
                    Sku = "BAL-TRK-03",
                    CollectionName = "Balenciaga Track Series",
                    Description = "Sneaker Balenciaga Track 4.0 phối màu tan beige phong cách chunky hầm hố, đệm lót êm ái.",
                    BasePrice = 24500000m,
                    OriginalPrice = 26000000m,
                    DiscountPercent = 6,
                    ImageUrl = "img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg",
                    StockQuantity = 12,
                    StockStatus = StockStatus.InStock,
                    Material = "Mesh and Nylon multi-layer",
                    CareInstructions = "Vệ sinh bọt chuyên dụng cho giày thể thao",
                    CountryOfOrigin = "Italy / China",
                    Rating = 5.0,
                    ReviewCount = 42
                },
                new Product
                {
                    Id = 104,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Balenciaga Track Thug Edition Black",
                    Slug = "giay-balenciaga-track-thug-edition-black",
                    Sku = "BAL-TRK-04",
                    CollectionName = "Balenciaga Street Noir",
                    Description = "Phiên bản Balenciaga Track Thug đen cực ngầu phong cách streetwear, chi tiết phản quang độc đáo.",
                    BasePrice = 23900000m,
                    OriginalPrice = 25500000m,
                    DiscountPercent = 6,
                    ImageUrl = "img/#balanciagatrack#thug 🥷🏿.jpg",
                    StockQuantity = 8,
                    StockStatus = StockStatus.LowStock,
                    Material = "High-tech composite & mesh",
                    CareInstructions = "Tránh ngâm nước lâu",
                    CountryOfOrigin = "Italy",
                    Rating = 4.9,
                    ReviewCount = 68
                },
                new Product
                {
                    Id = 105,
                    SellerId = 1,
                    CategoryId = 3,
                    Name = "Quần Nỉ Balenciaga Paris Sweatpants White",
                    Slug = "quan-ni-balenciaga-paris-sweatpants-white",
                    Sku = "BAL-PNT-05",
                    CollectionName = "Balenciaga Paris Wardrobe",
                    Description = "Quần nỉ ống rộng Balenciaga Paris chữ thêu dọc ống quần màu trắng, phong cách oversize thoải mái.",
                    BasePrice = 16500000m,
                    OriginalPrice = 18000000m,
                    DiscountPercent = 8,
                    ImageUrl = "img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg",
                    StockQuantity = 15,
                    StockStatus = StockStatus.InStock,
                    Material = "100% French Terry Organic Cotton",
                    CareInstructions = "Giặt tay nước lạnh, phơi ngang",
                    CountryOfOrigin = "Portugal",
                    Rating = 4.7,
                    ReviewCount = 31
                },
                new Product
                {
                    Id = 106,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Sneaker Gucci Ace Web Leather",
                    Slug = "giay-sneaker-gucci-ace-web-leather",
                    Sku = "GUC-ACE-06",
                    CollectionName = "Gucci Icons",
                    Description = "Sneaker Gucci Ace da bò thật phối sọc xanh đỏ truyền thống của nhà mốt Kering.",
                    BasePrice = 18900000m,
                    OriginalPrice = 21000000m,
                    DiscountPercent = 10,
                    ImageUrl = "img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg",
                    StockQuantity = 20,
                    StockStatus = StockStatus.InStock,
                    Material = "Calfskin Leather, Rubber sole",
                    CareInstructions = "Dùng kem dưỡng da định kỳ",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 5.0,
                    ReviewCount = 112
                },
                new Product
                {
                    Id = 107,
                    SellerId = 1,
                    CategoryId = 3,
                    Name = "Kính Mát Gucci Double G Rectangular Cream Gold",
                    Slug = "kinh-mat-gucci-double-g-rectangular-cream-gold",
                    Sku = "GUC-SUN-07",
                    CollectionName = "Gucci Eyewear",
                    Description = "Kính mát Gucci gọng chữ nhật màu kem đính logo Double G mạ vàng 18K sang trọng.",
                    BasePrice = 11500000m,
                    OriginalPrice = 13000000m,
                    DiscountPercent = 11,
                    ImageUrl = "img/gucci-runway.jpg",
                    StockQuantity = 18,
                    StockStatus = StockStatus.InStock,
                    Material = "Acetate cao cấp, kim loại mạ vàng",
                    CareInstructions = "Lau bằng khăn microfiber kèm trong hộp",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 4.9,
                    ReviewCount = 59
                },
                new Product
                {
                    Id = 108,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Thể Thao Nike Men's Summer Sneaker 2024",
                    Slug = "giay-the-thao-nike-summer-sneaker-2024",
                    Sku = "NIK-SMR-08",
                    CollectionName = "Nike Air Running",
                    Description = "Mẫu giày chạy bộ mùa hè Nike thiết kế thoáng khí, đế Air đàn hồi cao cho trải nghiệm thể thao mượt mà.",
                    BasePrice = 3250000m,
                    OriginalPrice = 3700000m,
                    DiscountPercent = 12,
                    ImageUrl = "img/Nike men's summer sneaker (men shoe collection for 2024).jpg",
                    StockQuantity = 50,
                    StockStatus = StockStatus.InStock,
                    Material = "Flyknit and Air Zoom Sole",
                    CareInstructions = "Vệ sinh bàn chải mềm",
                    CountryOfOrigin = "Việt Nam",
                    Rating = 4.8,
                    ReviewCount = 94
                },
                new Product
                {
                    Id = 109,
                    SellerId = 1,
                    CategoryId = 2,
                    Name = "Áo Khoác Denim Balenciaga Oversized Ripped Jacket",
                    Slug = "ao-khoac-denim-balenciaga-oversized-ripped",
                    Sku = "BAL-JKT-09",
                    CollectionName = "Balenciaga Runway",
                    Description = "Áo khoác bò Balenciaga rách phong cách grunge bụi bặm, form rộng oversize thời thượng.",
                    BasePrice = 28500000m,
                    OriginalPrice = 32000000m,
                    DiscountPercent = 11,
                    ImageUrl = "img/Oversized ripped balenciaga jacket.jpg",
                    StockQuantity = 7,
                    StockStatus = StockStatus.LowStock,
                    Material = "100% Japanese Selvedge Denim",
                    CareInstructions = "Giặt khô chuyên nghiệp",
                    CountryOfOrigin = "Japan / France",
                    Rating = 4.9,
                    ReviewCount = 28
                },
                new Product
                {
                    Id = 110,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Sneaker Puma Fall Footwear Retro Edition",
                    Slug = "giay-sneaker-puma-fall-footwear-retro",
                    Sku = "PUM-RET-10",
                    CollectionName = "Puma Classic",
                    Description = "Giày thể thao Puma phiên bản mùa thu cổ điển da lộn mềm mại, form chuẩn châu Á.",
                    BasePrice = 1850000m,
                    OriginalPrice = 2100000m,
                    DiscountPercent = 12,
                    ImageUrl = "img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg",
                    StockQuantity = 40,
                    StockStatus = StockStatus.InStock,
                    Material = "Suede & Rubber Gum Sole",
                    CareInstructions = "Tránh nước, dùng gôm làm sạch da lộn",
                    CountryOfOrigin = "Indonesia",
                    Rating = 4.6,
                    ReviewCount = 77
                },
                new Product
                {
                    Id = 111,
                    SellerId = 1,
                    CategoryId = 3,
                    Name = "Túi Xách Nữ Gucci Dionysus GG Supreme Mini",
                    Slug = "tui-xach-nu-gucci-dionysus-gg-supreme-mini",
                    Sku = "GUC-DIO-11",
                    CollectionName = "Gucci Dionysus",
                    Description = "Túi đeo chéo Dionysus họa tiết GG Supreme với khóa đầu hổ đặc trưng mạ bạc cổ điển.",
                    BasePrice = 32000000m,
                    OriginalPrice = 35000000m,
                    DiscountPercent = 8,
                    ImageUrl = "img/gucci-sneaker.jpg",
                    StockQuantity = 10,
                    StockStatus = StockStatus.InStock,
                    Material = "GG Supreme Canvas & Da Taupe Suede",
                    CareInstructions = "Bảo quản trong túi dustbag chính hãng",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 5.0,
                    ReviewCount = 49
                },
                new Product
                {
                    Id = 112,
                    SellerId = 1,
                    CategoryId = 2,
                    Name = "Áo Thun Gucci Blade Print Cotton T-Shirt",
                    Slug = "ao-thun-gucci-blade-print-cotton-tshirt",
                    Sku = "GUC-TSH-12",
                    CollectionName = "Gucci Ready-to-Wear",
                    Description = "Áo phông cotton hữu cơ in logo lưỡi dao Gucci Blade phong cách sắc nét, co giãn 4 chiều.",
                    BasePrice = 12500000m,
                    OriginalPrice = 14000000m,
                    DiscountPercent = 10,
                    ImageUrl = "img/Some of favorite Gucci from recent collection 🔥….jpg",
                    StockQuantity = 25,
                    StockStatus = StockStatus.InStock,
                    Material = "100% Organic Heavyweight Cotton",
                    CareInstructions = "Giặt lộn trái, ủi nhiệt độ thấp",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 4.8,
                    ReviewCount = 63
                },
                new Product
                {
                    Id = 113,
                    SellerId = 1,
                    CategoryId = 3,
                    Name = "Mũ Lưỡi Trai Balenciaga Cap Embroidery Black",
                    Slug = "mu-luoi-trai-balenciaga-cap-embroidery-black",
                    Sku = "BAL-CAP-13",
                    CollectionName = "Balenciaga Accessories",
                    Description = "Mũ lưỡi trai Balenciaga thêu chữ nổi mặt trước, quai dán điều chỉnh phía sau tiện lợi.",
                    BasePrice = 8900000m,
                    OriginalPrice = 9800000m,
                    DiscountPercent = 9,
                    ImageUrl = "img/108930884729091904.jpg",
                    StockQuantity = 22,
                    StockStatus = StockStatus.InStock,
                    Material = "100% Cotton Twill",
                    CareInstructions = "Giặt tay nhẹ nhàng",
                    CountryOfOrigin = "Italy",
                    Rating = 4.7,
                    ReviewCount = 38
                },
                new Product
                {
                    Id = 114,
                    SellerId = 1,
                    CategoryId = 3,
                    Name = "Thắt Lưng Da Gucci Double G Buckle Leather Belt",
                    Slug = "that-lung-da-gucci-double-g-buckle",
                    Sku = "GUC-BLT-14",
                    CollectionName = "Gucci Belts",
                    Description = "Thắt lưng da bê trơn mặt khóa kim loại chữ G lồng nhau màu vàng kim cổ điển bản 3cm.",
                    BasePrice = 11900000m,
                    OriginalPrice = 13000000m,
                    DiscountPercent = 8,
                    ImageUrl = "img/12173861489974136.jpg",
                    StockQuantity = 16,
                    StockStatus = StockStatus.InStock,
                    Material = "Calfskin Leather, Antiqued Brass Buckle",
                    CareInstructions = "Tránh tiếp xúc hóa chất tẩy rửa",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 4.9,
                    ReviewCount = 85
                },
                new Product
                {
                    Id = 115,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Sneaker Gucci Rhyton Logo Leather",
                    Slug = "giay-sneaker-gucci-rhyton-logo-leather",
                    Sku = "GUC-RHY-15",
                    CollectionName = "Gucci Rhyton",
                    Description = "Sneaker Gucci Rhyton da ngà đế dày chunky in logo Gucci vintage phong cách thập niên 90.",
                    BasePrice = 22500000m,
                    OriginalPrice = 25000000m,
                    DiscountPercent = 10,
                    ImageUrl = "img/20758848278669764.jpg",
                    StockQuantity = 14,
                    StockStatus = StockStatus.InStock,
                    Material = "Supple Ivory Leather",
                    CareInstructions = "Vệ sinh chuyên dụng đồ da",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 4.9,
                    ReviewCount = 51
                },
                new Product
                {
                    Id = 116,
                    SellerId = 1,
                    CategoryId = 2,
                    Name = "Áo Hoodie Balenciaga Back Logo Print Grey",
                    Slug = "ao-hoodie-balenciaga-back-logo-grey",
                    Sku = "BAL-HOD-16",
                    CollectionName = "Balenciaga Streetwear",
                    Description = "Áo hoodie nỉ xám in logo Balenciaga mặt sau, mũ trùm sâu, form rộng drop-shoulder.",
                    BasePrice = 19500000m,
                    OriginalPrice = 22000000m,
                    DiscountPercent = 11,
                    ImageUrl = "img/267823509086088024.jpg",
                    StockQuantity = 18,
                    StockStatus = StockStatus.InStock,
                    Material = "Cotton Fleece Heavyweight",
                    CareInstructions = "Giặt lộn trái với nước lạnh",
                    CountryOfOrigin = "Portugal",
                    Rating = 4.8,
                    ReviewCount = 44
                },
                new Product
                {
                    Id = 117,
                    SellerId = 1,
                    CategoryId = 3,
                    Name = "Ví Cầm Tay Gucci GG Marmont Leather Wallet",
                    Slug = "vi-cam-tay-gucci-gg-marmont-leather",
                    Sku = "GUC-WLT-17",
                    CollectionName = "Gucci Marmont",
                    Description = "Ví nữ dáng dài chần bông họa tiết chevron da bò tự nhiên kèm logo Double G mạ vàng.",
                    BasePrice = 14800000m,
                    OriginalPrice = 16500000m,
                    DiscountPercent = 10,
                    ImageUrl = "img/298926494039684010.jpg",
                    StockQuantity = 12,
                    StockStatus = StockStatus.InStock,
                    Material = "Matelassé Chevron Leather",
                    CareInstructions = "Lau bằng khăn khô mềm",
                    CountryOfOrigin = "Made in Italy",
                    Rating = 5.0,
                    ReviewCount = 72
                },
                new Product
                {
                    Id = 118,
                    SellerId = 1,
                    CategoryId = 1,
                    Name = "Giày Sneaker Balenciaga Defender Chunky Tyre",
                    Slug = "giay-sneaker-balenciaga-defender-tyre",
                    Sku = "BAL-DEF-18",
                    CollectionName = "Balenciaga Footwear",
                    Description = "Sneaker Balenciaga Defender đế lốp xe siêu hầm hố, thiết kế tương lai đột phá.",
                    BasePrice = 26500000m,
                    OriginalPrice = 29000000m,
                    DiscountPercent = 8,
                    ImageUrl = "img/34551122141164310.jpg",
                    StockQuantity = 6,
                    StockStatus = StockStatus.LowStock,
                    Material = "Technical Fabric & Rubber Sole",
                    CareInstructions = "Vệ sinh bàn chải cước mềm",
                    CountryOfOrigin = "China",
                    Rating = 4.7,
                    ReviewCount = 33
                },
                new Product
                {
                    Id = 119,
                    SellerId = 1,
                    CategoryId = 2,
                    Name = "Áo Khoác Gió Balenciaga Windbreaker Zip Jacket",
                    Slug = "ao-khoac-gio-balenciaga-windbreaker",
                    Sku = "BAL-WND-19",
                    CollectionName = "Balenciaga Outerwear",
                    Description = "Áo khoác dù chống nước Balenciaga khóa kéo 2 chiều, dây rút gấu áo điều chỉnh phong cách thể thao.",
                    BasePrice = 2100000m,
                    OriginalPrice = 2400000m,
                    DiscountPercent = 12,
                    ImageUrl = "img/420734790192673506.jpg",
                    StockQuantity = 15,
                    StockStatus = StockStatus.InStock,
                    Material = "Water-repellent Technical Ripstop",
                    CareInstructions = "Lau sạch vết bẩn bằng khăn ẩm",
                    CountryOfOrigin = "Italy",
                    Rating = 4.8,
                    ReviewCount = 29
                },
                new Product
                {
                    Id = 120,
                    SellerId = 1,
                    CategoryId = 4,
                    Name = "Gối Tựa Sofa Aethelgard Luxury Velvet Cushion",
                    Slug = "goi-tua-sofa-aethelgard-luxury-velvet",
                    Sku = "AET-HOM-20",
                    CollectionName = "Aethelgard Maison",
                    Description = "Gối tựa nhung cao cấp thêu họa tiết gia huy Aethelgard mạ chỉ bạc, ruột lông vũ êm ái.",
                    BasePrice = 1450000m,
                    OriginalPrice = 1800000m,
                    DiscountPercent = 19,
                    ImageUrl = "img/fashion mood board.jpg",
                    StockQuantity = 35,
                    StockStatus = StockStatus.InStock,
                    Material = "Premium Silk Velvet & Feather fill",
                    CareInstructions = "Giặt khô hoặc giặt vỏ ngoài bằng tay",
                    CountryOfOrigin = "Việt Nam",
                    Rating = 4.9,
                    ReviewCount = 57
                }
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();

            // Seed Variants for each product
            var variants = new List<ProductVariant>();
            foreach (var prod in products)
            {
                if (prod.CategoryId == 1)
                {
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "40 EU", Color = "Standard", Sku = $"{prod.Sku}-40", Price = prod.BasePrice, StockQuantity = 10 });
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "41 EU", Color = "Standard", Sku = $"{prod.Sku}-41", Price = prod.BasePrice, StockQuantity = 15 });
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "42 EU", Color = "Standard", Sku = $"{prod.Sku}-42", Price = prod.BasePrice, StockQuantity = 12 });
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "43 EU", Color = "Standard", Sku = $"{prod.Sku}-43", Price = prod.BasePrice, StockQuantity = 8 });
                }
                else if (prod.CategoryId == 2)
                {
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "S", Color = "Original", Sku = $"{prod.Sku}-S", Price = prod.BasePrice, StockQuantity = 8 });
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "M", Color = "Original", Sku = $"{prod.Sku}-M", Price = prod.BasePrice, StockQuantity = 15 });
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "L", Color = "Original", Sku = $"{prod.Sku}-L", Price = prod.BasePrice, StockQuantity = 12 });
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "XL", Color = "Original", Sku = $"{prod.Sku}-XL", Price = prod.BasePrice, StockQuantity = 5 });
                }
                else
                {
                    variants.Add(new ProductVariant { ProductId = prod.Id, Size = "Free Size", Color = "Default", Sku = $"{prod.Sku}-FS", Price = prod.BasePrice, StockQuantity = prod.StockQuantity });
                }
            }
            await context.ProductVariants.AddRangeAsync(variants);
            await context.SaveChangesAsync();
        }

        // 4. Seed Asian Flagship Stores
        if (!await context.Stores.AnyAsync())
        {
            var stores = new List<Store>
            {
                new Store
                {
                    StoreCode = "VN_HN_01",
                    BrandId = "gucci",
                    StoreName = "Gucci Tràng Tiền Plaza",
                    StoreType = "Flagship Boutique",
                    City = "Hà Nội",
                    Country = "Việt Nam",
                    Address = "Tầng 1 & 2, Tràng Tiền Plaza, 24 Hai Bà Trưng, P. Tràng Tiền, Q. Hoàn Kiếm",
                    Phone = "+84 24 3936 9999",
                    Email = "trangtien.boutique@gucci.com",
                    OperatingHours = "T2 - T6: 09:30 - 21:30 | T7 - CN: 09:30 - 22:00",
                    Latitude = 21.0253,
                    Longitude = 105.8544,
                    ServicesJson = "[\"Đặt hẹn chuyên gia riêng (Private Appointment)\", \"Dập chữ cá nhân hóa (Hot Stamping)\", \"Bảo dưỡng đồ da cao cấp\", \"Phòng chờ VIP Lounge\", \"Đỗ xe Valet\", \"Hoàn thuế VAT Refund\"]",
                    CategoriesJson = "[\"Túi xách cao cấp\", \"Sneaker & Giày dép\", \"Trang sức & Đồng hồ\", \"Đồ da nhỏ\", \"Thời trang may sẵn\"]",
                    ImageUrl = "img/gucci-runway.jpg",
                    StoreUrl = "https://www.gucci.com/us/en/store/trang-tien-plaza"
                },
                new Store
                {
                    StoreCode = "VN_SG_01",
                    BrandId = "gucci",
                    StoreName = "Gucci Sheraton Saigon",
                    StoreType = "Luxury Hotel Boutique",
                    City = "TP. Hồ Chí Minh",
                    Country = "Việt Nam",
                    Address = "Khách sạn Sheraton Saigon, 88 Đồng Khởi, P. Bến Nghé, Quận 1",
                    Phone = "+84 28 3827 6688",
                    Email = "sheraton.saigon@gucci.com",
                    OperatingHours = "T2 - CN: 10:00 - 21:00",
                    Latitude = 10.7769,
                    Longitude = 106.7032,
                    ServicesJson = "[\"Mua sắm tại phòng Suite\", \"Stylist tư vấn phong cách riêng\", \"Dập chữ cá nhân hóa\", \"Bảo hành quốc tế\"]",
                    CategoriesJson = "[\"Túi xách biểu tượng Jackie & Marmont\", \"Giày Loafer & Sneaker\", \"Thắt lưng da Double G\"]",
                    ImageUrl = "img/sample-velora.jpg",
                    StoreUrl = "https://www.gucci.com/us/en/store/sheraton-saigon"
                },
                new Store
                {
                    StoreCode = "VN_SG_02",
                    BrandId = "gucci",
                    StoreName = "Gucci Union Square",
                    StoreType = "Mall Flagship",
                    City = "TP. Hồ Chí Minh",
                    Country = "Việt Nam",
                    Address = "Union Square Shopping Center, 171 Đồng Khởi, Quận 1",
                    Phone = "+84 28 3824 5566",
                    Email = "unionsquare.hcm@gucci.com",
                    OperatingHours = "T2 - CN: 09:30 - 22:00",
                    Latitude = 10.7761,
                    Longitude = 106.7018,
                    ServicesJson = "[\"Boutique 2 tầng phong cách Milan\", \"Bảo dưỡng trang sức kim cương\", \"Chăm sóc sản phẩm White Glove\"]",
                    CategoriesJson = "[\"Ready-to-Wear\", \"Fine Jewelry\", \"Gucci Décor\", \"Giày cao cấp\"]",
                    ImageUrl = "img/sample-nextgen.jpg",
                    StoreUrl = "https://www.gucci.com/us/en/store/union-square"
                }
            };
            await context.Stores.AddRangeAsync(stores);
            await context.SaveChangesAsync();
        }

        // 5. Seed Orders (From sketch/dashboard/orders.js)
        if (!await context.Orders.AnyAsync())
        {
            var order1 = new Order
            {
                OrderCode = "AG-2024-7890",
                CustomerName = "Esther Howard",
                CustomerEmail = "esther.howard@example.com",
                CustomerPhone = "+1 (555) 123-4567",
                ShippingAddress = "123 Main Street, New York, NY 10001, United States",
                PaymentMethod = "Thẻ Tín Dụng (Visa ending in 4242)",
                Status = OrderStatus.Shipped,
                PaymentStatus = PaymentStatus.Paid,
                Carrier = "FedEx Logistics",
                TrackingCode = "789012345678",
                EstimatedDelivery = "January 20, 2026",
                LastUpdateLocation = "NEW YORK, NY Hub",
                ProgressStep = 3,
                Subtotal = 30400000m,
                ShippingCharge = 60000m,
                Taxes = 2432000m,
                Discount = 1000000m,
                TotalAmount = 31892000m
            };
            await context.Orders.AddAsync(order1);
            await context.SaveChangesAsync();

            var orderItems = new List<OrderItem>
            {
                new OrderItem
                {
                    OrderId = order1.Id,
                    ProductId = 106,
                    ProductName = "Giày Sneaker Gucci Ace Web Leather",
                    Specs = "Color: White/Green-Red Stripe | Size: 41 EU",
                    ImageUrl = "img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg",
                    Price = 18900000m,
                    Quantity = 1,
                    Subtotal = 18900000m
                },
                new OrderItem
                {
                    OrderId = order1.Id,
                    ProductId = 107,
                    ProductName = "Kính Mát Gucci Double G Rectangular Cream Gold",
                    Specs = "Color: Cream Gold | Category: Accessories",
                    ImageUrl = "img/gucci-runway.jpg",
                    Price = 11500000m,
                    Quantity = 1,
                    Subtotal = 11500000m
                }
            };
            await context.OrderItems.AddRangeAsync(orderItems);

            var order2 = new Order
            {
                OrderCode = "AG-2024-7891",
                CustomerName = "Cameron Williamson",
                CustomerEmail = "cameron.w@example.com",
                CustomerPhone = "+84 901 234 567",
                ShippingAddress = "Tòa nhà Keangnam Landmark 72, Phạm Hùng, Cầu Giấy, Hà Nội",
                PaymentMethod = "Ví MoMo / Chuyển khoản QR",
                Status = OrderStatus.Confirmed,
                PaymentStatus = PaymentStatus.Paid,
                Carrier = "FedEx Logistics",
                TrackingCode = "789123456789",
                EstimatedDelivery = "September 25, 2026",
                LastUpdateLocation = "Trung tâm phân phối Hà Nội",
                ProgressStep = 2,
                Subtotal = 2790000m,
                ShippingCharge = 35000m,
                Taxes = 223200m,
                Discount = 0m,
                TotalAmount = 3048200m
            };
            await context.Orders.AddAsync(order2);
            await context.SaveChangesAsync();

            await context.OrderItems.AddAsync(new OrderItem
            {
                OrderId = order2.Id,
                ProductId = 101,
                ProductName = "Giày Adidas Samba OG Classic White Black",
                Specs = "Color: White/Black | Size: 42 EU",
                ImageUrl = "img/addidas samba.jpg",
                Price = 2790000m,
                Quantity = 1,
                Subtotal = 2790000m
            });
            await context.SaveChangesAsync();
        }

        // 6. Seed Transactions (From sketch/dashboard/income-statistics.js)
        if (!await context.Transactions.AnyAsync())
        {
            var transactions = new List<TransactionRecord>
            {
                new TransactionRecord { TransactionCode = "#04910", CustomerName = "Ryan Korsgaard", ProductName = "Ergo Office Chair", Status = "Success", Quantity = 12, UnitPrice = 3450m, TotalAmount = 41400m },
                new TransactionRecord { TransactionCode = "#04911", CustomerName = "Madelyn Lubin", ProductName = "Sunset Desk 02", Status = "Success", Quantity = 20, UnitPrice = 2980m, TotalAmount = 59200m },
                new TransactionRecord { TransactionCode = "#04912", CustomerName = "Abram Bergson", ProductName = "Eco Bookshelf", Status = "Pending", Quantity = 22, UnitPrice = 1750m, TotalAmount = 75900m },
                new TransactionRecord { TransactionCode = "#04913", CustomerName = "Phillip Mango", ProductName = "Green Leaf Desk", Status = "Refunded", Quantity = 24, UnitPrice = 1950m, TotalAmount = 19500m },
                new TransactionRecord { TransactionCode = "#04914", CustomerName = "Esther Howard", ProductName = "Giày Sneaker Gucci Ace Leather", Status = "Success", Quantity = 2, UnitPrice = 1250m, TotalAmount = 2500m },
                new TransactionRecord { TransactionCode = "#04915", CustomerName = "Darrell Steward", ProductName = "Túi Gucci Dionysus Supreme", Status = "Success", Quantity = 1, UnitPrice = 2850m, TotalAmount = 2850m },
                new TransactionRecord { TransactionCode = "#04916", CustomerName = "Cameron Williamson", ProductName = "Adidas Samba OG Classic", Status = "Success", Quantity = 4, UnitPrice = 180m, TotalAmount = 720m }
            };
            await context.Transactions.AddRangeAsync(transactions);
            await context.SaveChangesAsync();
        }
    }
}
