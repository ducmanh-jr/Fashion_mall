using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Ecommerce.Common.Entities;
using Ecommerce.Common.Enums;
using Ecommerce.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.DAL.Seed;

public static class DatabaseSeeder
{
    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();

        // ==========================================
        // 1. SEED USERS (23 Users)
        // ==========================================
        if (!await context.Users.AnyAsync())
        {
            var defaultPwdHash = HashPassword("Password123@");
            var users = new List<User>
            {
                new User { FullName = "Nguyễn Đức Mạnh", Email = "ducmanh@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 988 123 456", AvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", IsEmailVerified = true },
                new User { FullName = "Aethelgard Admin", Email = "admin@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Admin, PhoneNumber = "+84 901 000 001", AvatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", IsEmailVerified = true },
                new User { FullName = "Esther Howard", Email = "esther.howard@example.com", PasswordHash = defaultPwdHash, Role = UserRole.Customer, PhoneNumber = "+84 902 345 678", AvatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", IsEmailVerified = true },
                new User { FullName = "Gucci Official", Email = "gucci@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 005 888", AvatarUrl = "/img/brands/gucci/gucci-jackie-1961-mini.jpg", IsEmailVerified = true },
                new User { FullName = "Christian Dior Official", Email = "dior@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 004 888", AvatarUrl = "/img/brands/dior/lady-dior-medium-cannage.jpg", IsEmailVerified = true },
                new User { FullName = "Adidas Official", Email = "adidas@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 006 888", AvatarUrl = "/img/brands/adidas/adidas-samba-og-classic.jpg", IsEmailVerified = true },
                new User { FullName = "Louis Vuitton Official", Email = "louisvuitton@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 012 888", AvatarUrl = "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", IsEmailVerified = true },
                new User { FullName = "Nike Official", Email = "nike@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 004 888", AvatarUrl = "/img/brands/nike/nike-air-force-1-white.jpg", IsEmailVerified = true },
                new User { FullName = "Chanel Official", Email = "chanel@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 006 888", AvatarUrl = "/img/brands/chanel/chanel-classic-flap-bag.jpg", IsEmailVerified = true },
                new User { FullName = "Prada Official", Email = "prada@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 005 888", AvatarUrl = "/img/brands/prada/prada-re-edition-2005-nylon.jpg", IsEmailVerified = true },
                new User { FullName = "Balenciaga Official", Email = "balenciaga@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 010 888", AvatarUrl = "/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg", IsEmailVerified = true },
                new User { FullName = "Hermès Official", Email = "hermes@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 006 888", AvatarUrl = "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", IsEmailVerified = true },
                new User { FullName = "Versace Official", Email = "versace@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 007 888", AvatarUrl = "/img/brands/versace/versace-la-medusa-handbag.jpg", IsEmailVerified = true },
                new User { FullName = "Burberry Official", Email = "burberry@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 008 888", AvatarUrl = "/img/brands/burberry/burberry-kensington-trench-coat.jpg", IsEmailVerified = true },
                new User { FullName = "Saint Laurent Official", Email = "saintlaurent@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 012 888", AvatarUrl = "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", IsEmailVerified = true },
                new User { FullName = "Fendi Official", Email = "fendi@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 005 888", AvatarUrl = "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", IsEmailVerified = true },
                new User { FullName = "Bottega Veneta Official", Email = "bottegaveneta@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 013 888", AvatarUrl = "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", IsEmailVerified = true },
                new User { FullName = "Off-White Official", Email = "offwhite@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 008 888", AvatarUrl = "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", IsEmailVerified = true },
                new User { FullName = "Puma Official", Email = "puma@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 004 888", AvatarUrl = "/img/brands/puma/puma-suede-classic-xxi.jpg", IsEmailVerified = true },
                new User { FullName = "Zara Official", Email = "zara@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 004 888", AvatarUrl = "/img/brands/zara/zara-tailored-double-breasted-blazer.jpg", IsEmailVerified = true },
                new User { FullName = "Uniqlo Official", Email = "uniqlo@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 006 888", AvatarUrl = "/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg", IsEmailVerified = true },
                new User { FullName = "Calvin Klein Official", Email = "calvinklein@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 011 888", AvatarUrl = "/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg", IsEmailVerified = true },
                new User { FullName = "Tommy Hilfiger Official", Email = "tommyhilfiger@gmail.com", PasswordHash = defaultPwdHash, Role = UserRole.Seller, PhoneNumber = "+84 912 013 888", AvatarUrl = "/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg", IsEmailVerified = true },
            };
            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }

        // ==========================================
        // 2. SEED CATEGORIES (4 Categories)
        // ==========================================
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new Category { Name = "Giày Sneaker & Thể Thao", Slug = "giay-sneaker-the-thao", Description = "Bộ sưu tập giày sneaker hàng hiệu chính hãng từ Nike, Adidas, Gucci, Balenciaga" },
                new Category { Name = "Thời Trang Streetwear & Áo Khoác", Slug = "thoi-trang-streetwear-ao-khoac", Description = "Áo khoác, hoodie, jacket phong cách hiện đại và sàn diễn quốc tế" },
                new Category { Name = "Quần & Phụ Kiện Thời Trang", Slug = "quan-phu-kien-thoi-trang", Description = "Túi xách cao cấp, kính mắt, thắt lưng da nguyên tấm và nước hoa" },
                new Category { Name = "Gia Dụng & Đời Sống", Slug = "gia-dung-doi-song", Description = "Vật phẩm nội thất & phong cách sống tinh tế phong cách tối giản" }
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }

        // ==========================================
        // 3. SEED STORES (23 Stores)
        // ==========================================
        if (!await context.Stores.AnyAsync())
        {
            var stores = new List<Store>
            {
                new Store { StoreCode = "VN_HN_01", BrandId = "gucci", StoreName = "Gucci Tràng Tiền Plaza", StoreType = "Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tầng 1, Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm", Phone = "024 3936 9999", Email = "trangtien@gucci.com", OperatingHours = "09:30 - 21:30", Latitude = 21.0256, Longitude = 105.8524, ServicesJson = JsonSerializer.Serialize(new[] { "Chăm sóc khách VIP", "Đặt may đo riêng", "Bảo hành trọn đời" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Túi xách", "Giày dép", "Trang sức" }), ImageUrl = "/img/gucci-runway.jpg", StoreUrl = "https://www.gucci.com" },
                new Store { StoreCode = "VN_SG_01", BrandId = "gucci", StoreName = "Gucci Sheraton Saigon", StoreType = "Luxury Boutique", City = "TP. Hồ Chí Minh", Country = "Việt Nam", Address = "Khách sạn Sheraton, 88 Đồng Khởi, Quận 1", Phone = "028 3827 7777", Email = "sheraton@gucci.com", OperatingHours = "10:00 - 22:00", Latitude = 10.7745, Longitude = 106.7032, ServicesJson = JsonSerializer.Serialize(new[] { "Phòng thử đồ VIP", "Giao hàng hỏa tốc", "Đánh bóng da miễn phí" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời trang nữ", "Giày nam", "Phụ kiện" }), ImageUrl = "/img/gucci-sneaker.jpg", StoreUrl = "https://www.gucci.com" },
                new Store { StoreCode = "VN_SG_02", BrandId = "gucci", StoreName = "Gucci Union Square", StoreType = "Concept Store", City = "TP. Hồ Chí Minh", Country = "Việt Nam", Address = "Union Square, 171 Đồng Khởi, Bến Nghé, Quận 1", Phone = "028 3825 8888", Email = "unionsquare@gucci.com", OperatingHours = "09:30 - 22:00", Latitude = 10.7762, Longitude = 106.7021, ServicesJson = JsonSerializer.Serialize(new[] { "Khắc tên miễn phí", "Tư vấn phối đồ cá nhân" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Bộ sưu tập giới hạn", "Nước hoa" }), ImageUrl = "/img/gucci-collection.jpg", StoreUrl = "https://www.gucci.com" },
                new Store { StoreCode = "VN_GUC_01", BrandId = "gucci", StoreName = "Gucci Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0005", Email = "contact@gucci.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/gucci/gucci-jackie-1961-mini.jpg", StoreUrl = "https://www.gucci.com" },
                new Store { StoreCode = "VN_DIO_01", BrandId = "dior", StoreName = "Christian Dior Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0004", Email = "contact@dior.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/dior/lady-dior-medium-cannage.jpg", StoreUrl = "https://www.dior.com" },
                new Store { StoreCode = "VN_ADI_01", BrandId = "adidas", StoreName = "Adidas Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0006", Email = "contact@adidas.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Giày Sneaker & Thể Thao", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/adidas/adidas-samba-og-classic.jpg", StoreUrl = "https://www.adidas.com" },
                new Store { StoreCode = "VN_LOU_01", BrandId = "louisvuitton", StoreName = "Louis Vuitton Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0012", Email = "contact@louisvuitton.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", StoreUrl = "https://www.louisvuitton.com" },
                new Store { StoreCode = "VN_NIK_01", BrandId = "nike", StoreName = "Nike Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0004", Email = "contact@nike.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Giày Sneaker & Thể Thao", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/nike/nike-air-force-1-white.jpg", StoreUrl = "https://www.nike.com" },
                new Store { StoreCode = "VN_CHA_01", BrandId = "chanel", StoreName = "Chanel Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0006", Email = "contact@chanel.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/chanel/chanel-classic-flap-bag.jpg", StoreUrl = "https://www.chanel.com" },
                new Store { StoreCode = "VN_PRA_01", BrandId = "prada", StoreName = "Prada Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0005", Email = "contact@prada.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/prada/prada-re-edition-2005-nylon.jpg", StoreUrl = "https://www.prada.com" },
                new Store { StoreCode = "VN_BAL_01", BrandId = "balenciaga", StoreName = "Balenciaga Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0010", Email = "contact@balenciaga.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg", StoreUrl = "https://www.balenciaga.com" },
                new Store { StoreCode = "VN_HER_01", BrandId = "hermes", StoreName = "Hermès Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0006", Email = "contact@hermes.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", StoreUrl = "https://www.hermes.com" },
                new Store { StoreCode = "VN_VER_01", BrandId = "versace", StoreName = "Versace Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0007", Email = "contact@versace.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/versace/versace-la-medusa-handbag.jpg", StoreUrl = "https://www.versace.com" },
                new Store { StoreCode = "VN_BUR_01", BrandId = "burberry", StoreName = "Burberry Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0008", Email = "contact@burberry.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/burberry/burberry-kensington-trench-coat.jpg", StoreUrl = "https://www.burberry.com" },
                new Store { StoreCode = "VN_SAI_01", BrandId = "saintlaurent", StoreName = "Saint Laurent Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0012", Email = "contact@saintlaurent.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", StoreUrl = "https://www.saintlaurent.com" },
                new Store { StoreCode = "VN_FEN_01", BrandId = "fendi", StoreName = "Fendi Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0005", Email = "contact@fendi.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", StoreUrl = "https://www.fendi.com" },
                new Store { StoreCode = "VN_BOT_01", BrandId = "bottegaveneta", StoreName = "Bottega Veneta Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0013", Email = "contact@bottegaveneta.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Quần & Phụ Kiện Thời Trang", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", StoreUrl = "https://www.bottegaveneta.com" },
                new Store { StoreCode = "VN_OFF_01", BrandId = "offwhite", StoreName = "Off-White Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0008", Email = "contact@offwhite.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", StoreUrl = "https://www.offwhite.com" },
                new Store { StoreCode = "VN_PUM_01", BrandId = "puma", StoreName = "Puma Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0004", Email = "contact@puma.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Giày Sneaker & Thể Thao", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/puma/puma-suede-classic-xxi.jpg", StoreUrl = "https://www.puma.com" },
                new Store { StoreCode = "VN_ZAR_01", BrandId = "zara", StoreName = "Zara Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0004", Email = "contact@zara.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/zara/zara-tailored-double-breasted-blazer.jpg", StoreUrl = "https://www.zara.com" },
                new Store { StoreCode = "VN_UNI_01", BrandId = "uniqlo", StoreName = "Uniqlo Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0006", Email = "contact@uniqlo.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg", StoreUrl = "https://www.uniqlo.com" },
                new Store { StoreCode = "VN_CAL_01", BrandId = "calvinklein", StoreName = "Calvin Klein Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0011", Email = "contact@calvinklein.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg", StoreUrl = "https://www.calvinklein.com" },
                new Store { StoreCode = "VN_TOM_01", BrandId = "tommyhilfiger", StoreName = "Tommy Hilfiger Heritage Flagship Boutique", StoreType = "Global Flagship Boutique", City = "Hà Nội", Country = "Việt Nam", Address = "Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội", Phone = "+84 24 3888 0013", Email = "contact@tommyhilfiger.vn", OperatingHours = "09:30 - 21:30", Latitude = 21.0315, Longitude = 105.8130, ServicesJson = JsonSerializer.Serialize(new[] { "Bảo hành chính hãng quốc tế", "Kiểm định NFC Chip", "Phòng VIP Private Lounge" }), CategoriesJson = JsonSerializer.Serialize(new[] { "Thời Trang Streetwear & Áo Khoác", "Haute Couture", "Ready-to-Wear" }), ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg", StoreUrl = "https://www.tommyhilfiger.com" },
            };
            await context.Stores.AddRangeAsync(stores);
            await context.SaveChangesAsync();
        }

        // ==========================================
        // 4. SEED PRODUCTS & VARIANTS
        // ==========================================
        if (!await context.Products.AnyAsync())
        {
            var dbCategories = await context.Categories.ToListAsync();
            var catSneaker = dbCategories.FirstOrDefault(c => c.Slug == "giay-sneaker-the-thao") ?? dbCategories[0];
            var catStreetwear = dbCategories.FirstOrDefault(c => c.Slug == "thoi-trang-streetwear-ao-khoac") ?? dbCategories[1];
            var catAccessories = dbCategories.FirstOrDefault(c => c.Slug == "quan-phu-kien-thoi-trang") ?? dbCategories[2];
            var catLiving = dbCategories.FirstOrDefault(c => c.Slug == "gia-dung-doi-song") ?? dbCategories[3];

            var dbUsers = await context.Users.ToListAsync();
            var userManh = dbUsers.First(u => u.Email == "ducmanh@gmail.com");

            var allProducts = new List<Product>();

            // --- A. 20 SẢN PHẨM CỦA SELLER NGUYỄN ĐỨC MẠNH ---
            var p_giay_adidas_samba_og_classic = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Adidas Samba OG Classic White Black",
                Slug = "giay-adidas-samba-og-classic",
                Sku = "ADI-SAMBA-01",
                CollectionName = "Adidas Originals Terrace",
                Description = "Giày thể thao Adidas Samba OG phiên bản Classic phối màu trắng đen cổ điển, chất liệu da thật cao cấp kết hợp mũi T-toe da lộn.",
                BasePrice = 2790000m,
                OriginalPrice = 3200000m,
                DiscountPercent = 12,
                ImageUrl = "/img/adidas-samba.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/adidas-samba.jpg", "/img/adidas-samba.jpg", "/img/adidas-samba.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da thật full-grain",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_giay_adidas_samba_og_classic.Variants.Add(new ProductVariant { Sku = "ADI-SAMBA-01-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2790000m, StockQuantity = 15 });
            p_giay_adidas_samba_og_classic.Variants.Add(new ProductVariant { Sku = "ADI-SAMBA-01-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2790000m, StockQuantity = 20 });
            p_giay_adidas_samba_og_classic.Variants.Add(new ProductVariant { Sku = "ADI-SAMBA-01-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2790000m, StockQuantity = 10 });
            allProducts.Add(p_giay_adidas_samba_og_classic);

            var p_ao_khoac_ni_adidas_sakura_special_edition = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Nỉ Adidas Sakura Special Edition",
                Slug = "ao-khoac-ni-adidas-sakura-special-edition",
                Sku = "ADI-SAKURA-02",
                CollectionName = "Adidas Spring Collection",
                Description = "Áo khoác hoodie nỉ bông phiên bản giới hạn Sakura hoa anh đào, chất nỉ 380gsm dày dặn dệt bo gấu tinh tế.",
                BasePrice = 1890000m,
                OriginalPrice = 2200000m,
                DiscountPercent = 14,
                ImageUrl = "/img/adidas-sakura-hoodie.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/adidas-sakura-hoodie.jpg", "/img/adidas-sakura-hoodie.jpg", "/img/adidas-sakura-hoodie.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Nỉ bông cotton 100%",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Việt Nam",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_ao_khoac_ni_adidas_sakura_special_edition.Variants.Add(new ProductVariant { Sku = "ADI-SAKURA-02-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1890000m, StockQuantity = 18 });
            p_ao_khoac_ni_adidas_sakura_special_edition.Variants.Add(new ProductVariant { Sku = "ADI-SAKURA-02-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1890000m, StockQuantity = 15 });
            p_ao_khoac_ni_adidas_sakura_special_edition.Variants.Add(new ProductVariant { Sku = "ADI-SAKURA-02-XL", Size = "Size XL", Color = "Tiêu chuẩn", Price = 1890000m, StockQuantity = 12 });
            allProducts.Add(p_ao_khoac_ni_adidas_sakura_special_edition);

            var p_giay_balenciaga_track_40_tan_beige = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Balenciaga Track 4.0 Tan/Beige Limited",
                Slug = "giay-balenciaga-track-40-tan-beige",
                Sku = "BAL-TRACK-03",
                CollectionName = "Balenciaga Track Series",
                Description = "Giày thể thao Balenciaga Track 4.0 phối màu Tan/Beige thời thượng, kết cấu layer 128 chi tiết phức tạp chuẩn sàn diễn.",
                BasePrice = 24500000m,
                OriginalPrice = 27000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/balenciaga-track-beige.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/balenciaga-track-beige.jpg", "/img/balenciaga-track-beige.jpg", "/img/balenciaga-track-beige.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da nhân tạo, lưới mesh kỹ thuật",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_giay_balenciaga_track_40_tan_beige.Variants.Add(new ProductVariant { Sku = "BAL-TRACK-03-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 15 });
            p_giay_balenciaga_track_40_tan_beige.Variants.Add(new ProductVariant { Sku = "BAL-TRACK-03-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 20 });
            p_giay_balenciaga_track_40_tan_beige.Variants.Add(new ProductVariant { Sku = "BAL-TRACK-03-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 10 });
            allProducts.Add(p_giay_balenciaga_track_40_tan_beige);

            var p_giay_balenciaga_track_thug_edition_black = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Balenciaga Track Thug Edition Black",
                Slug = "giay-balenciaga-track-thug-edition-black",
                Sku = "BAL-TRACK-04",
                CollectionName = "Balenciaga Street Noir",
                Description = "Thiết kế hầm hố phong cách goth streetwear, đế dày 3 tầng giảm xóc vượt trội cùng logo BB in nổi ở mũi giày.",
                BasePrice = 25900000m,
                OriginalPrice = 28500000m,
                DiscountPercent = 9,
                ImageUrl = "/img/balenciaga-track-black.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/balenciaga-track-black.jpg", "/img/balenciaga-track-black.jpg", "/img/balenciaga-track-black.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Mesh dệt, TPU cao cấp",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_giay_balenciaga_track_thug_edition_black.Variants.Add(new ProductVariant { Sku = "BAL-TRACK-04-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 25900000m, StockQuantity = 15 });
            p_giay_balenciaga_track_thug_edition_black.Variants.Add(new ProductVariant { Sku = "BAL-TRACK-04-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 25900000m, StockQuantity = 20 });
            p_giay_balenciaga_track_thug_edition_black.Variants.Add(new ProductVariant { Sku = "BAL-TRACK-04-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 25900000m, StockQuantity = 10 });
            allProducts.Add(p_giay_balenciaga_track_thug_edition_black);

            var p_quan_ni_balenciaga_paris_sweatpants_white = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Nỉ Balenciaga Paris Sweatpants White",
                Slug = "quan-ni-balenciaga-paris-sweatpants-white",
                Sku = "BAL-SWEAT-05",
                CollectionName = "Balenciaga Winter Capsule",
                Description = "Quần nỉ ống suông phom rộng oversize Paris Edition, logo thêu chỉ kim tuyến tinh xảo ở đùi trái.",
                BasePrice = 16500000m,
                OriginalPrice = 18500000m,
                DiscountPercent = 10,
                ImageUrl = "/img/balenciaga-track-street.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/balenciaga-track-street.jpg", "/img/balenciaga-track-street.jpg", "/img/balenciaga-track-street.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Cotton da cá dệt dày dặn",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Bồ Đào Nha",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_quan_ni_balenciaga_paris_sweatpants_white.Variants.Add(new ProductVariant { Sku = "BAL-SWEAT-05-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 18 });
            p_quan_ni_balenciaga_paris_sweatpants_white.Variants.Add(new ProductVariant { Sku = "BAL-SWEAT-05-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 15 });
            p_quan_ni_balenciaga_paris_sweatpants_white.Variants.Add(new ProductVariant { Sku = "BAL-SWEAT-05-XL", Size = "Size XL", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 12 });
            allProducts.Add(p_quan_ni_balenciaga_paris_sweatpants_white);

            var p_ao_khoac_oversized_ripped_balenciaga = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Oversized Ripped Balenciaga Denim",
                Slug = "ao-khoac-oversized-ripped-balenciaga",
                Sku = "BAL-DENIM-06",
                CollectionName = "Balenciaga Distressed",
                Description = "Áo khoác bò wash bạc xé rách thủ công từng chi tiết, form drop-shoulder đậm chất đường phố avant-garde.",
                BasePrice = 34000000m,
                OriginalPrice = 38000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/balenciaga-ripped-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/balenciaga-ripped-jacket.jpg", "/img/balenciaga-ripped-jacket.jpg", "/img/balenciaga-ripped-jacket.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Denim cotton Nhật Bản 14oz",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_ao_khoac_oversized_ripped_balenciaga.Variants.Add(new ProductVariant { Sku = "BAL-DENIM-06-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 34000000m, StockQuantity = 18 });
            p_ao_khoac_oversized_ripped_balenciaga.Variants.Add(new ProductVariant { Sku = "BAL-DENIM-06-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 34000000m, StockQuantity = 15 });
            p_ao_khoac_oversized_ripped_balenciaga.Variants.Add(new ProductVariant { Sku = "BAL-DENIM-06-XL", Size = "Size XL", Color = "Tiêu chuẩn", Price = 34000000m, StockQuantity = 12 });
            allProducts.Add(p_ao_khoac_oversized_ripped_balenciaga);

            var p_giay_sneaker_gucci_ace_web_leather = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Gucci Ace Web Leather Original",
                Slug = "giay-sneaker-gucci-ace-web-leather",
                Sku = "GUC-ACE-07",
                CollectionName = "Gucci Epilogue",
                Description = "Giày sneaker cổ thấp da bò Nappa trắng tinh khôi, dải ruy băng Web xanh đỏ kinh điển bên thân giày.",
                BasePrice = 18900000m,
                OriginalPrice = 21000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/gucci-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/gucci-sneaker.jpg", "/img/gucci-sneaker.jpg", "/img/gucci-sneaker.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bò Nappa cao cấp Ý",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_giay_sneaker_gucci_ace_web_leather.Variants.Add(new ProductVariant { Sku = "GUC-ACE-07-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 18900000m, StockQuantity = 15 });
            p_giay_sneaker_gucci_ace_web_leather.Variants.Add(new ProductVariant { Sku = "GUC-ACE-07-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 18900000m, StockQuantity = 20 });
            p_giay_sneaker_gucci_ace_web_leather.Variants.Add(new ProductVariant { Sku = "GUC-ACE-07-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 18900000m, StockQuantity = 10 });
            allProducts.Add(p_giay_sneaker_gucci_ace_web_leather);

            var p_kinh_mat_gucci_double_g_rectangular = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Gucci Double G Rectangular Cream Gold",
                Slug = "kinh-mat-gucci-double-g-rectangular",
                Sku = "GUC-GLASS-08",
                CollectionName = "Gucci Eyewear Couture",
                Description = "Kính mát gọng chữ nhật màu kem phối logo GG mạ vàng sáng bóng, tròng chống chói quang học UV400 chuẩn châu Âu.",
                BasePrice = 11500000m,
                OriginalPrice = 13000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/gucci-runway.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/gucci-runway.jpg", "/img/gucci-runway.jpg", "/img/gucci-runway.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Acetate đúc nguyên khối, mắt kính CR-39",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_kinh_mat_gucci_double_g_rectangular.Variants.Add(new ProductVariant { Sku = "GUC-GLASS-08-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 11500000m, StockQuantity = 45 });
            allProducts.Add(p_kinh_mat_gucci_double_g_rectangular);

            var p_giay_the_thao_puma_suede_classic_retro = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Thể Thao Puma Suede Classic Retro",
                Slug = "giay-the-thao-puma-suede-classic-retro",
                Sku = "PUM-SUEDE-09",
                CollectionName = "Puma Heritage Line",
                Description = "Huyền thoại giày da lộn Puma Suede ra đời từ năm 1968, phối màu cổ điển êm ái cho mọi trang phục dạo phố.",
                BasePrice = 2190000m,
                OriginalPrice = 2500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/puma-shoes-fall.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/puma-shoes-fall.jpg", "/img/puma-shoes-fall.jpg", "/img/puma-shoes-fall.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da lộn cao cấp nguyên tấm",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Indonesia",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_giay_the_thao_puma_suede_classic_retro.Variants.Add(new ProductVariant { Sku = "PUM-SUEDE-09-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 15 });
            p_giay_the_thao_puma_suede_classic_retro.Variants.Add(new ProductVariant { Sku = "PUM-SUEDE-09-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 20 });
            p_giay_the_thao_puma_suede_classic_retro.Variants.Add(new ProductVariant { Sku = "PUM-SUEDE-09-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 10 });
            allProducts.Add(p_giay_the_thao_puma_suede_classic_retro);

            var p_giay_nike_air_force_1_low_07_white = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Nike Air Force 1 Low '07 Triple White",
                Slug = "giay-nike-air-force-1-low-07-white",
                Sku = "NIK-AF1-10",
                CollectionName = "Nike Sportswear Icons",
                Description = "Huyền thoại bóng rổ đường phố 1982 với đệm Air-Sole êm ái, đế ngoài cao su rãnh tròn pivot-circle bám dính tốt.",
                BasePrice = 2990000m,
                OriginalPrice = 3400000m,
                DiscountPercent = 12,
                ImageUrl = "/img/nike-summer-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/nike-summer-sneaker.jpg", "/img/nike-summer-sneaker.jpg", "/img/nike-summer-sneaker.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bò trơn phủ bóng",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Việt Nam",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_giay_nike_air_force_1_low_07_white.Variants.Add(new ProductVariant { Sku = "NIK-AF1-10-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 15 });
            p_giay_nike_air_force_1_low_07_white.Variants.Add(new ProductVariant { Sku = "NIK-AF1-10-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 20 });
            p_giay_nike_air_force_1_low_07_white.Variants.Add(new ProductVariant { Sku = "NIK-AF1-10-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 10 });
            allProducts.Add(p_giay_nike_air_force_1_low_07_white);

            var p_tui_xach_lady_dior_medium_cannage = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Lady Dior Medium Cannage Lambskin",
                Slug = "tui-xach-lady-dior-medium-cannage",
                Sku = "DIO-LADY-11",
                CollectionName = "Dior Heritage Icons",
                Description = "Chiếc túi gắn liền với Công nương Diana, da cừu non chần bông motif Cannage cùng bộ phụ kiện charm D.I.O.R mạ vàng.",
                BasePrice = 155000000m,
                OriginalPrice = 170000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/dior/lady-dior-medium-cannage.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/lady-dior-medium-cannage.jpg", "/img/brands/dior/lady-dior-medium-cannage.jpg", "/img/brands/dior/lady-dior-medium-cannage.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu non cao cấp Cannage",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_lady_dior_medium_cannage.Variants.Add(new ProductVariant { Sku = "DIO-LADY-11-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 155000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_lady_dior_medium_cannage);

            var p_tui_xach_jackie_1961_mini_hobo = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Jackie 1961 Mini Hobo Leather",
                Slug = "tui-xach-jackie-1961-mini-hobo",
                Sku = "GUC-JACKIE-12",
                CollectionName = "Gucci 1961 Archival",
                Description = "Biểu tượng thời trang thanh lịch với khóa chốt piston vàng bóng và quai đeo da tháo rời tiện lợi.",
                BasePrice = 62000000m,
                OriginalPrice = 70000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/gucci/gucci-jackie-1961-mini.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-jackie-1961-mini.jpg", "/img/brands/gucci/gucci-jackie-1961-mini.jpg", "/img/brands/gucci/gucci-jackie-1961-mini.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bê bóng thuộc thảo mộc",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_jackie_1961_mini_hobo.Variants.Add(new ProductVariant { Sku = "GUC-JACKIE-12-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 62000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_jackie_1961_mini_hobo);

            var p_tui_xach_louis_vuitton_speedy_25 = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Louis Vuitton Speedy Bandoulière 25",
                Slug = "tui-xach-louis-vuitton-speedy-25",
                Sku = "LV-SPEEDY-13",
                CollectionName = "Louis Vuitton Monogram Heritage",
                Description = "Túi dáng trống kinh điển chế tác từ Canvas Monogram trứ danh, tay cầm bọc da Toron thủ công khâu tay tỉ mỉ.",
                BasePrice = 48500000m,
                OriginalPrice = 55000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Canvas Monogram chống thấm",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_louis_vuitton_speedy_25.Variants.Add(new ProductVariant { Sku = "LV-SPEEDY-13-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 48500000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_louis_vuitton_speedy_25);

            var p_tui_xach_chanel_classic_double_flap = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Chanel Classic Double Flap Lambskin",
                Slug = "tui-xach-chanel-classic-double-flap",
                Sku = "CHA-FLAP-14",
                CollectionName = "Chanel Timeless",
                Description = "Chiếc túi đắt giá nhất mọi thời đại chế tác thủ công bởi các nghệ nhân Paris, khóa xoay Mademoiselle mạ vàng.",
                BasePrice = 260000000m,
                OriginalPrice = 280000000m,
                DiscountPercent = 7,
                ImageUrl = "/img/brands/chanel/chanel-classic-flap-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-classic-flap-bag.jpg", "/img/brands/chanel/chanel-classic-flap-bag.jpg", "/img/brands/chanel/chanel-classic-flap-bag.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu mềm mại chần bông",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_chanel_classic_double_flap.Variants.Add(new ProductVariant { Sku = "CHA-FLAP-14-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 260000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_chanel_classic_double_flap);

            var p_tui_xach_prada_re_edition_2005_nylon = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Prada Re-Edition 2005 Re-Nylon",
                Slug = "tui-xach-prada-re-edition-2005-nylon",
                Sku = "PRA-RE05-15",
                CollectionName = "Prada Re-Nylon Archive",
                Description = "Chiếc túi kẹp nách được săn đón toàn cầu, vải Re-Nylon tái sinh kết hợp viền da Saffiano và móc ví nhỏ.",
                BasePrice = 45000000m,
                OriginalPrice = 50000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/prada/prada-re-edition-2005-nylon.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-re-edition-2005-nylon.jpg", "/img/brands/prada/prada-re-edition-2005-nylon.jpg", "/img/brands/prada/prada-re-edition-2005-nylon.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Re-Nylon kháng nước, da Saffiano",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_prada_re_edition_2005_nylon.Variants.Add(new ProductVariant { Sku = "PRA-RE05-15-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 45000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_prada_re_edition_2005_nylon);

            var p_tui_xach_hermes_birkin_30_togo = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Hermès Birkin 30 Togo Gold Hardware",
                Slug = "tui-xach-hermes-birkin-30-togo",
                Sku = "HER-BIRKIN-16",
                CollectionName = "Hermès Exceptional Pieces",
                Description = "Đỉnh cao túi xách xa xỉ thế giới, từng mũi khâu yên ngựa Saddle Stitch may tay hoàn toàn với 48 giờ chế tác.",
                BasePrice = 380000000m,
                OriginalPrice = 420000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bê Togo sần nguyên tấm",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_hermes_birkin_30_togo.Variants.Add(new ProductVariant { Sku = "HER-BIRKIN-16-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 380000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_hermes_birkin_30_togo);

            var p_tui_xach_saint_laurent_loulou_medium = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Saint Laurent LouLou Medium Quilted",
                Slug = "tui-xach-saint-laurent-loulou-medium",
                Sku = "YSL-LOULOU-17",
                CollectionName = "Saint Laurent Monogram",
                Description = "Chất da bê mềm mịn may chần bông chữ Y đặc trưng, khóa kim loại lồng chữ YSL phủ lớp mạ bạc ánh kim.",
                BasePrice = 78000000m,
                OriginalPrice = 86000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bê bóng may chần cao cấp",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_saint_laurent_loulou_medium.Variants.Add(new ProductVariant { Sku = "YSL-LOULOU-17-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 78000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_saint_laurent_loulou_medium);

            var p_tui_xach_fendi_baguette_medium_nappa = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Fendi Baguette Medium Nappa Monogram",
                Slug = "tui-xach-fendi-baguette-medium-nappa",
                Sku = "FEN-BAGUETTE-18",
                CollectionName = "Fendi Baguette 1997",
                Description = "Chiếc túi làm thay đổi lịch sử phụ kiện với dáng kẹp nách gọn gàng và khóa cài nam châm chữ FF mạ bóng.",
                BasePrice = 85000000m,
                OriginalPrice = 93000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu nappa mềm dập nổi FF",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_fendi_baguette_medium_nappa.Variants.Add(new ProductVariant { Sku = "FEN-BAGUETTE-18-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 85000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_fendi_baguette_medium_nappa);

            var p_tui_xach_bottega_veneta_the_pouch = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Bottega Veneta The Pouch Soft Calf",
                Slug = "tui-xach-bottega-veneta-the-pouch",
                Sku = "BOT-POUCH-19",
                CollectionName = "Bottega Veneta Wardrobe",
                Description = "Thiết kế clutch cầm tay xếp nếp bồng bềnh mềm mại như mây không quai xách làm bùng nổ giới mộ điệu.",
                BasePrice = 78000000m,
                OriginalPrice = 86000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bê non nếp gấp thủ công",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_bottega_veneta_the_pouch.Variants.Add(new ProductVariant { Sku = "BOT-POUCH-19-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 78000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_bottega_veneta_the_pouch);

            var p_tui_xach_off_white_jitney_28_quote = new Product
            {
                SellerId = userManh.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Off-White Jitney 2.8 Quote Top Handle",
                Slug = "tui-xach-off-white-jitney-28-quote",
                Sku = "OFF-JITNEY-20",
                CollectionName = "Off-White Industrial Chic",
                Description = "Phong cách streetwear nổi loạn của cố giám đốc sáng tạo Virgil Abloh, chữ in Typography và khóa mũi tên kim loại.",
                BasePrice = 38000000m,
                OriginalPrice = 43000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg" }),
                StockQuantity = 45,
                StockStatus = StockStatus.InStock,
                Material = "Da bê trơn in chữ cá tính",
                CareInstructions = "Vệ sinh chuyên dụng bằng khăn mềm, tránh nhiệt độ cao và độ ẩm",
                PackagingDetails = "Hộp nguyên seal của hãng, túi vải chống bụi, thẻ bảo hành NFC chính hãng",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 128,
                IsActive = true
            };
            p_tui_xach_off_white_jitney_28_quote.Variants.Add(new ProductVariant { Sku = "OFF-JITNEY-20-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 45 });
            allProducts.Add(p_tui_xach_off_white_jitney_28_quote);

            // --- B. 160 SẢN PHẨM CHUẨN CỦA 20 THƯƠNG HIỆU QUỐC TẾ ---
            var seller_gucci = dbUsers.First(u => u.Email == "gucci@gmail.com");
            var prod_gucci_gucci_jackie_1961_mini = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Jackie 1961 Mini Shoulder Bag",
                Slug = "gucci-gucci-jackie-1961-mini",
                Sku = "GUC-MINI-3",
                CollectionName = "Gucci Icons",
                Description = "Túi Xách Jackie 1961 Mini Shoulder Bag chính hãng từ Gucci. Chế tác từ Da bê bóng / Khóa Piston mạ vàng 18K với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 62000000m,
                OriginalPrice = 70000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/gucci/gucci-jackie-1961-mini.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-jackie-1961-mini.jpg", "/img/brands/gucci/gucci-jackie-1961-mini.jpg", "/img/brands/gucci/gucci-jackie-1961-mini.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê bóng / Khóa Piston mạ vàng 18K",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_jackie_1961_mini.Variants.Add(new ProductVariant { Sku = "GUC-MINI-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 62000000m, StockQuantity = 50 });
            allProducts.Add(prod_gucci_gucci_jackie_1961_mini);
            var prod_gucci_gucci_dionysus_gg_supreme = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Dionysus GG Supreme Mini Chain",
                Slug = "gucci-gucci-dionysus-gg-supreme",
                Sku = "GUC-SUPR-3",
                CollectionName = "Gucci Dionysus",
                Description = "Túi Xách Dionysus GG Supreme Mini Chain chính hãng từ Gucci. Chế tác từ Canvas GG Supreme & Khóa đầu hổ chạm bạc với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 32000000m,
                OriginalPrice = 36000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/gucci/gucci-dionysus-gg-supreme.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-dionysus-gg-supreme.jpg", "/img/brands/gucci/gucci-dionysus-gg-supreme.jpg", "/img/brands/gucci/gucci-dionysus-gg-supreme.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Canvas GG Supreme & Khóa đầu hổ chạm bạc",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_dionysus_gg_supreme.Variants.Add(new ProductVariant { Sku = "GUC-SUPR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 32000000m, StockQuantity = 50 });
            allProducts.Add(prod_gucci_gucci_dionysus_gg_supreme);
            var prod_gucci_gucci_ace_sneaker_web = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Gucci Ace Web Embroidered",
                Slug = "gucci-gucci-ace-sneaker-web",
                Sku = "GUC-WEB-1",
                CollectionName = "Gucci Footwear",
                Description = "Giày Sneaker Gucci Ace Web Embroidered chính hãng từ Gucci. Chế tác từ Da bò Nappa Ý trắng, sọc Web xanh đỏ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 18900000m,
                OriginalPrice = 21000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/gucci/gucci-ace-sneaker-web.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-ace-sneaker-web.jpg", "/img/brands/gucci/gucci-ace-sneaker-web.jpg", "/img/brands/gucci/gucci-ace-sneaker-web.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò Nappa Ý trắng, sọc Web xanh đỏ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_ace_sneaker_web.Variants.Add(new ProductVariant { Sku = "GUC-WEB-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 18900000m, StockQuantity = 15 });
            prod_gucci_gucci_ace_sneaker_web.Variants.Add(new ProductVariant { Sku = "GUC-WEB-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 18900000m, StockQuantity = 20 });
            prod_gucci_gucci_ace_sneaker_web.Variants.Add(new ProductVariant { Sku = "GUC-WEB-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 18900000m, StockQuantity = 15 });
            allProducts.Add(prod_gucci_gucci_ace_sneaker_web);
            var prod_gucci_gucci_jordaan_loafer = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Loafer Jordaan Classic Horsebit",
                Slug = "gucci-gucci-jordaan-loafer",
                Sku = "GUC-LOAF-1",
                CollectionName = "Gucci Jordaan",
                Description = "Giày Loafer Jordaan Classic Horsebit chính hãng từ Gucci. Chế tác từ Da bóng mịn, hàm thiếc mạ vàng thủ công với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 26500000m,
                OriginalPrice = 29000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/gucci/gucci-jordaan-loafer.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-jordaan-loafer.jpg", "/img/brands/gucci/gucci-jordaan-loafer.jpg", "/img/brands/gucci/gucci-jordaan-loafer.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bóng mịn, hàm thiếc mạ vàng thủ công",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_jordaan_loafer.Variants.Add(new ProductVariant { Sku = "GUC-LOAF-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 15 });
            prod_gucci_gucci_jordaan_loafer.Variants.Add(new ProductVariant { Sku = "GUC-LOAF-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 20 });
            prod_gucci_gucci_jordaan_loafer.Variants.Add(new ProductVariant { Sku = "GUC-LOAF-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 15 });
            allProducts.Add(prod_gucci_gucci_jordaan_loafer);
            var prod_gucci_gucci_runway_monogram_jacket = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Heritage Monogram GG Runway Jacket",
                Slug = "gucci-gucci-runway-monogram-jacket",
                Sku = "GUC-JACK-2",
                CollectionName = "Gucci Runway",
                Description = "Áo Khoác Heritage Monogram GG Runway Jacket chính hãng từ Gucci. Chế tác từ Vải dệt Jacquard GG cao cấp với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 48000000m,
                OriginalPrice = 54000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/gucci/gucci-runway-monogram-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-runway-monogram-jacket.jpg", "/img/brands/gucci/gucci-runway-monogram-jacket.jpg", "/img/brands/gucci/gucci-runway-monogram-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt Jacquard GG cao cấp",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_runway_monogram_jacket.Variants.Add(new ProductVariant { Sku = "GUC-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 48000000m, StockQuantity = 15 });
            prod_gucci_gucci_runway_monogram_jacket.Variants.Add(new ProductVariant { Sku = "GUC-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 48000000m, StockQuantity = 20 });
            prod_gucci_gucci_runway_monogram_jacket.Variants.Add(new ProductVariant { Sku = "GUC-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 48000000m, StockQuantity = 15 });
            allProducts.Add(prod_gucci_gucci_runway_monogram_jacket);
            var prod_gucci_gucci_double_g_belt = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da Double G Buckle Reversible",
                Slug = "gucci-gucci-double-g-belt",
                Sku = "GUC-BELT-3",
                CollectionName = "Gucci Leather",
                Description = "Thắt Lưng Da Double G Buckle Reversible chính hãng từ Gucci. Chế tác từ Da bò trơn 2 mặt đen/nâu, khóa GG mạ đồng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 14500000m,
                OriginalPrice = 16000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/gucci/gucci-double-g-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-double-g-belt.jpg", "/img/brands/gucci/gucci-double-g-belt.jpg", "/img/brands/gucci/gucci-double-g-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò trơn 2 mặt đen/nâu, khóa GG mạ đồng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_double_g_belt.Variants.Add(new ProductVariant { Sku = "GUC-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 14500000m, StockQuantity = 50 });
            allProducts.Add(prod_gucci_gucci_double_g_belt);
            var prod_gucci_gucci_double_g_sunglasses = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Chữ Nhật Double G Oversized",
                Slug = "gucci-gucci-double-g-sunglasses",
                Sku = "GUC-SUNG-3",
                CollectionName = "Gucci Eyewear",
                Description = "Kính Mát Chữ Nhật Double G Oversized chính hãng từ Gucci. Chế tác từ Gọng Acetate đen bóng, tròng chống UV400 với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 11500000m,
                OriginalPrice = 13000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/gucci/gucci-double-g-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-double-g-sunglasses.jpg", "/img/brands/gucci/gucci-double-g-sunglasses.jpg", "/img/brands/gucci/gucci-double-g-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng Acetate đen bóng, tròng chống UV400",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_double_g_sunglasses.Variants.Add(new ProductVariant { Sku = "GUC-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 11500000m, StockQuantity = 50 });
            allProducts.Add(prod_gucci_gucci_double_g_sunglasses);
            var prod_gucci_gucci_flora_silk_carre = new Product
            {
                SellerId = seller_gucci.Id,
                CategoryId = catAccessories.Id,
                Name = "Khăn Lụa Tơ Tằm Flora Silk Carré 90x90",
                Slug = "gucci-gucci-flora-silk-carre",
                Sku = "GUC-CARR-3",
                CollectionName = "Gucci Flora",
                Description = "Khăn Lụa Tơ Tằm Flora Silk Carré 90x90 chính hãng từ Gucci. Chế tác từ 100% Silk Twill dệt thủ công tại Como Ý với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 12500000m,
                OriginalPrice = 14000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/gucci/gucci-flora-silk-carre.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/gucci/gucci-flora-silk-carre.jpg", "/img/brands/gucci/gucci-flora-silk-carre.jpg", "/img/brands/gucci/gucci-flora-silk-carre.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Silk Twill dệt thủ công tại Como Ý",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Gucci, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_gucci_gucci_flora_silk_carre.Variants.Add(new ProductVariant { Sku = "GUC-CARR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 12500000m, StockQuantity = 50 });
            allProducts.Add(prod_gucci_gucci_flora_silk_carre);

            var seller_dior = dbUsers.First(u => u.Email == "dior@gmail.com");
            var prod_dior_lady_dior_medium_cannage = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Lady Dior Medium Cannage Lambskin",
                Slug = "dior-lady-dior-medium-cannage",
                Sku = "DIO-CANN-3",
                CollectionName = "Lady Dior Heritage",
                Description = "Túi Xách Lady Dior Medium Cannage Lambskin chính hãng từ Christian Dior. Chế tác từ Da cừu non chần bông Cannage, charm D.I.O.R với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 155000000m,
                OriginalPrice = 170000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/dior/lady-dior-medium-cannage.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/lady-dior-medium-cannage.jpg", "/img/brands/dior/lady-dior-medium-cannage.jpg", "/img/brands/dior/lady-dior-medium-cannage.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu non chần bông Cannage, charm D.I.O.R",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_lady_dior_medium_cannage.Variants.Add(new ProductVariant { Sku = "DIO-CANN-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 155000000m, StockQuantity = 50 });
            allProducts.Add(prod_dior_lady_dior_medium_cannage);
            var prod_dior_dior_saddle_bag_black = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Dior Saddle Bag Black Grained Calfskin",
                Slug = "dior-dior-saddle-bag-black",
                Sku = "DIO-BLAC-3",
                CollectionName = "Dior Saddle Icons",
                Description = "Túi Xách Dior Saddle Bag Black Grained Calfskin chính hãng từ Christian Dior. Chế tác từ Da bê hạt sần, khóa chữ D kim loại mạ vàng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 115000000m,
                OriginalPrice = 125000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/dior/dior-saddle-bag-black.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/dior-saddle-bag-black.jpg", "/img/brands/dior/dior-saddle-bag-black.jpg", "/img/brands/dior/dior-saddle-bag-black.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê hạt sần, khóa chữ D kim loại mạ vàng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_dior_saddle_bag_black.Variants.Add(new ProductVariant { Sku = "DIO-BLAC-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 115000000m, StockQuantity = 50 });
            allProducts.Add(prod_dior_dior_saddle_bag_black);
            var prod_dior_dior_book_tote_oblique = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Tote Dior Book Tote Thêu Oblique Xanh",
                Slug = "dior-dior-book-tote-oblique",
                Sku = "DIO-OBLI-3",
                CollectionName = "Dior Oblique",
                Description = "Túi Tote Dior Book Tote Thêu Oblique Xanh chính hãng từ Christian Dior. Chế tác từ Vải Canvas thêu hàng triệu mũi chỉ Oblique với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 88000000m,
                OriginalPrice = 95000000m,
                DiscountPercent = 7,
                ImageUrl = "/img/brands/dior/dior-book-tote-oblique.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/dior-book-tote-oblique.jpg", "/img/brands/dior/dior-book-tote-oblique.jpg", "/img/brands/dior/dior-book-tote-oblique.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải Canvas thêu hàng triệu mũi chỉ Oblique",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_dior_book_tote_oblique.Variants.Add(new ProductVariant { Sku = "DIO-OBLI-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 88000000m, StockQuantity = 50 });
            allProducts.Add(prod_dior_dior_book_tote_oblique);
            var prod_dior_dior_jadior_slingback_pump = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Cao Gót J'Adior Slingback Technical Fabric",
                Slug = "dior-dior-jadior-slingback-pump",
                Sku = "DIO-PUMP-1",
                CollectionName = "J'Adior Footwear",
                Description = "Giày Cao Gót J'Adior Slingback Technical Fabric chính hãng từ Christian Dior. Chế tác từ Vải dệt kỹ thuật, dải ruy băng thêu J'Adior với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 28500000m,
                OriginalPrice = 32000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/dior/dior-jadior-slingback-pump.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/dior-jadior-slingback-pump.jpg", "/img/brands/dior/dior-jadior-slingback-pump.jpg", "/img/brands/dior/dior-jadior-slingback-pump.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt kỹ thuật, dải ruy băng thêu J'Adior",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_dior_jadior_slingback_pump.Variants.Add(new ProductVariant { Sku = "DIO-PUMP-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 28500000m, StockQuantity = 15 });
            prod_dior_dior_jadior_slingback_pump.Variants.Add(new ProductVariant { Sku = "DIO-PUMP-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 28500000m, StockQuantity = 20 });
            prod_dior_dior_jadior_slingback_pump.Variants.Add(new ProductVariant { Sku = "DIO-PUMP-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 28500000m, StockQuantity = 15 });
            allProducts.Add(prod_dior_dior_jadior_slingback_pump);
            var prod_dior_dior_b27_low_top_sneaker = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Dior B27 Low-Top Galaxy Leather",
                Slug = "dior-dior-b27-low-top-sneaker",
                Sku = "DIO-SNEA-1",
                CollectionName = "Dior Men Sneaker",
                Description = "Giày Sneaker Dior B27 Low-Top Galaxy Leather chính hãng từ Christian Dior. Chế tác từ Da bê mịn trắng xám dập lỗ Oblique Galaxy với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 32500000m,
                OriginalPrice = 36000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/dior/dior-b27-low-top-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/dior-b27-low-top-sneaker.jpg", "/img/brands/dior/dior-b27-low-top-sneaker.jpg", "/img/brands/dior/dior-b27-low-top-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê mịn trắng xám dập lỗ Oblique Galaxy",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_dior_b27_low_top_sneaker.Variants.Add(new ProductVariant { Sku = "DIO-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 32500000m, StockQuantity = 15 });
            prod_dior_dior_b27_low_top_sneaker.Variants.Add(new ProductVariant { Sku = "DIO-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 32500000m, StockQuantity = 20 });
            prod_dior_dior_b27_low_top_sneaker.Variants.Add(new ProductVariant { Sku = "DIO-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 32500000m, StockQuantity = 15 });
            allProducts.Add(prod_dior_dior_b27_low_top_sneaker);
            var prod_dior_dior_bar_jacket_couture = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Bar Jacket Len Dạ Haute Couture",
                Slug = "dior-dior-bar-jacket-couture",
                Sku = "DIO-COUT-2",
                CollectionName = "Dior 30 Montaigne",
                Description = "Áo Khoác Bar Jacket Len Dạ Haute Couture chính hãng từ Christian Dior. Chế tác từ Len dạ dệt thủ công, eo đồng hồ cát biểu tượng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 98000000m,
                OriginalPrice = 110000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/dior/dior-bar-jacket-couture.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/dior-bar-jacket-couture.jpg", "/img/brands/dior/dior-bar-jacket-couture.jpg", "/img/brands/dior/dior-bar-jacket-couture.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Len dạ dệt thủ công, eo đồng hồ cát biểu tượng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_dior_bar_jacket_couture.Variants.Add(new ProductVariant { Sku = "DIO-COUT-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 98000000m, StockQuantity = 15 });
            prod_dior_dior_bar_jacket_couture.Variants.Add(new ProductVariant { Sku = "DIO-COUT-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 98000000m, StockQuantity = 20 });
            prod_dior_dior_bar_jacket_couture.Variants.Add(new ProductVariant { Sku = "DIO-COUT-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 98000000m, StockQuantity = 15 });
            allProducts.Add(prod_dior_dior_bar_jacket_couture);
            var prod_dior_gris_dior_perfume_privee = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Gris Dior La Collection Privée 250ml",
                Slug = "dior-gris-dior-perfume-privee",
                Sku = "DIO-PRIV-3",
                CollectionName = "Dior Parfumerie",
                Description = "Nước Hoa Gris Dior La Collection Privée 250ml chính hãng từ Christian Dior. Chế tác từ Hương chypre hoa cỏ quý hiếm gỗ sồi & hoắc hương với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 12500000m,
                OriginalPrice = 14000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/dior/gris-dior-perfume-privee.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/gris-dior-perfume-privee.jpg", "/img/brands/dior/gris-dior-perfume-privee.jpg", "/img/brands/dior/gris-dior-perfume-privee.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương chypre hoa cỏ quý hiếm gỗ sồi & hoắc hương",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_gris_dior_perfume_privee.Variants.Add(new ProductVariant { Sku = "DIO-PRIV-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 12500000m, StockQuantity = 50 });
            allProducts.Add(prod_dior_gris_dior_perfume_privee);
            var prod_dior_dior_mitzah_silk_scarf = new Product
            {
                SellerId = seller_dior.Id,
                CategoryId = catAccessories.Id,
                Name = "Khăn Quàng Cổ Mitzah Lụa Toile de Jouy",
                Slug = "dior-dior-mitzah-silk-scarf",
                Sku = "DIO-SCAR-3",
                CollectionName = "Dior Cruise Silk",
                Description = "Khăn Quàng Cổ Mitzah Lụa Toile de Jouy chính hãng từ Christian Dior. Chế tác từ 100% Silk Twill in họa tiết Toile de Jouy với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 6800000m,
                OriginalPrice = 7500000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/dior/dior-mitzah-silk-scarf.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/dior/dior-mitzah-silk-scarf.jpg", "/img/brands/dior/dior-mitzah-silk-scarf.jpg", "/img/brands/dior/dior-mitzah-silk-scarf.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Silk Twill in họa tiết Toile de Jouy",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Christian Dior, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_dior_dior_mitzah_silk_scarf.Variants.Add(new ProductVariant { Sku = "DIO-SCAR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 6800000m, StockQuantity = 50 });
            allProducts.Add(prod_dior_dior_mitzah_silk_scarf);

            var seller_adidas = dbUsers.First(u => u.Email == "adidas@gmail.com");
            var prod_adidas_adidas_samba_og_classic = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Adidas Samba OG Classic Cloud White",
                Slug = "adidas-adidas-samba-og-classic",
                Sku = "ADI-CLAS-1",
                CollectionName = "Adidas Originals Terrace",
                Description = "Giày Adidas Samba OG Classic Cloud White chính hãng từ Adidas. Chế tác từ Da thật full-grain, mũi T-toe da lộn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2790000m,
                OriginalPrice = 3200000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/adidas/adidas-samba-og-classic.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-samba-og-classic.jpg", "/img/brands/adidas/adidas-samba-og-classic.jpg", "/img/brands/adidas/adidas-samba-og-classic.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da thật full-grain, mũi T-toe da lộn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_samba_og_classic.Variants.Add(new ProductVariant { Sku = "ADI-CLAS-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2790000m, StockQuantity = 15 });
            prod_adidas_adidas_samba_og_classic.Variants.Add(new ProductVariant { Sku = "ADI-CLAS-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2790000m, StockQuantity = 20 });
            prod_adidas_adidas_samba_og_classic.Variants.Add(new ProductVariant { Sku = "ADI-CLAS-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2790000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_samba_og_classic);
            var prod_adidas_adidas_gazelle_indoor_black = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Adidas Gazelle Indoor Core Black Gum",
                Slug = "adidas-adidas-gazelle-indoor-black",
                Sku = "ADI-BLAC-1",
                CollectionName = "Adidas Originals Indoor",
                Description = "Giày Adidas Gazelle Indoor Core Black Gum chính hãng từ Adidas. Chế tác từ Da lộn mềm cao cấp, đế cao su gum bán trong với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2950000m,
                OriginalPrice = 3400000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/adidas/adidas-gazelle-indoor-black.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-gazelle-indoor-black.jpg", "/img/brands/adidas/adidas-gazelle-indoor-black.jpg", "/img/brands/adidas/adidas-gazelle-indoor-black.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da lộn mềm cao cấp, đế cao su gum bán trong",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_gazelle_indoor_black.Variants.Add(new ProductVariant { Sku = "ADI-BLAC-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 15 });
            prod_adidas_adidas_gazelle_indoor_black.Variants.Add(new ProductVariant { Sku = "ADI-BLAC-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 20 });
            prod_adidas_adidas_gazelle_indoor_black.Variants.Add(new ProductVariant { Sku = "ADI-BLAC-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_gazelle_indoor_black);
            var prod_adidas_adidas_handball_spezial_pink = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Adidas Handball Spezial Clear Pink",
                Slug = "adidas-adidas-handball-spezial-pink",
                Sku = "ADI-PINK-1",
                CollectionName = "Adidas Terrace Special",
                Description = "Giày Adidas Handball Spezial Clear Pink chính hãng từ Adidas. Chế tác từ Da lộn hồng pastel, đế gum cổ điển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2900000m,
                OriginalPrice = 3300000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/adidas/adidas-handball-spezial-pink.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-handball-spezial-pink.jpg", "/img/brands/adidas/adidas-handball-spezial-pink.jpg", "/img/brands/adidas/adidas-handball-spezial-pink.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da lộn hồng pastel, đế gum cổ điển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_handball_spezial_pink.Variants.Add(new ProductVariant { Sku = "ADI-PINK-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2900000m, StockQuantity = 15 });
            prod_adidas_adidas_handball_spezial_pink.Variants.Add(new ProductVariant { Sku = "ADI-PINK-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2900000m, StockQuantity = 20 });
            prod_adidas_adidas_handball_spezial_pink.Variants.Add(new ProductVariant { Sku = "ADI-PINK-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2900000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_handball_spezial_pink);
            var prod_adidas_adidas_ultraboost_light = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Chạy Bộ Adidas Ultraboost Light 2026",
                Slug = "adidas-adidas-ultraboost-light",
                Sku = "ADI-LIGH-1",
                CollectionName = "Adidas Performance",
                Description = "Giày Chạy Bộ Adidas Ultraboost Light 2026 chính hãng từ Adidas. Chế tác từ Sợi dệt Primeknit+, đệm Boost hoàn trả năng lượng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 5200000m,
                OriginalPrice = 5800000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/adidas/adidas-ultraboost-light.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-ultraboost-light.jpg", "/img/brands/adidas/adidas-ultraboost-light.jpg", "/img/brands/adidas/adidas-ultraboost-light.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Sợi dệt Primeknit+, đệm Boost hoàn trả năng lượng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_ultraboost_light.Variants.Add(new ProductVariant { Sku = "ADI-LIGH-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 5200000m, StockQuantity = 15 });
            prod_adidas_adidas_ultraboost_light.Variants.Add(new ProductVariant { Sku = "ADI-LIGH-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 5200000m, StockQuantity = 20 });
            prod_adidas_adidas_ultraboost_light.Variants.Add(new ProductVariant { Sku = "ADI-LIGH-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 5200000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_ultraboost_light);
            var prod_adidas_adidas_beckenbauer_tracktop = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Nỉ Beckenbauer Tracktop Night Indigo",
                Slug = "adidas-adidas-beckenbauer-tracktop",
                Sku = "ADI-TRAC-2",
                CollectionName = "Adidas Heritage",
                Description = "Áo Khoác Nỉ Beckenbauer Tracktop Night Indigo chính hãng từ Adidas. Chế tác từ Vải dệt đôi 52% cotton hữu cơ, 48% poly tái chế với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2200000m,
                OriginalPrice = 2600000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/adidas/adidas-beckenbauer-tracktop.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-beckenbauer-tracktop.jpg", "/img/brands/adidas/adidas-beckenbauer-tracktop.jpg", "/img/brands/adidas/adidas-beckenbauer-tracktop.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt đôi 52% cotton hữu cơ, 48% poly tái chế",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_beckenbauer_tracktop.Variants.Add(new ProductVariant { Sku = "ADI-TRAC-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2200000m, StockQuantity = 15 });
            prod_adidas_adidas_beckenbauer_tracktop.Variants.Add(new ProductVariant { Sku = "ADI-TRAC-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2200000m, StockQuantity = 20 });
            prod_adidas_adidas_beckenbauer_tracktop.Variants.Add(new ProductVariant { Sku = "ADI-TRAC-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2200000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_beckenbauer_tracktop);
            var prod_adidas_adidas_tiro23_training_pants = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Thể Thao Tiro 23 League Training Pants",
                Slug = "adidas-adidas-tiro23-training-pants",
                Sku = "ADI-PANT-2",
                CollectionName = "Adidas Training",
                Description = "Quần Thể Thao Tiro 23 League Training Pants chính hãng từ Adidas. Chế tác từ Vải thun công nghệ AEROREADY thoát ẩm nhanh với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1350000m,
                OriginalPrice = 1600000m,
                DiscountPercent = 16,
                ImageUrl = "/img/brands/adidas/adidas-tiro23-training-pants.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-tiro23-training-pants.jpg", "/img/brands/adidas/adidas-tiro23-training-pants.jpg", "/img/brands/adidas/adidas-tiro23-training-pants.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải thun công nghệ AEROREADY thoát ẩm nhanh",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_tiro23_training_pants.Variants.Add(new ProductVariant { Sku = "ADI-PANT-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1350000m, StockQuantity = 15 });
            prod_adidas_adidas_tiro23_training_pants.Variants.Add(new ProductVariant { Sku = "ADI-PANT-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1350000m, StockQuantity = 20 });
            prod_adidas_adidas_tiro23_training_pants.Variants.Add(new ProductVariant { Sku = "ADI-PANT-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1350000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_tiro23_training_pants);
            var prod_adidas_adidas_trefoil_hoodie = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Hoodie Trefoil Essentials French Terry",
                Slug = "adidas-adidas-trefoil-hoodie",
                Sku = "ADI-HOOD-2",
                CollectionName = "Adidas Originals",
                Description = "Áo Hoodie Trefoil Essentials French Terry chính hãng từ Adidas. Chế tác từ Chất nỉ bông 100% cotton Pháp 380gsm dày dặn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1850000m,
                OriginalPrice = 2200000m,
                DiscountPercent = 16,
                ImageUrl = "/img/brands/adidas/adidas-trefoil-hoodie.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-trefoil-hoodie.jpg", "/img/brands/adidas/adidas-trefoil-hoodie.jpg", "/img/brands/adidas/adidas-trefoil-hoodie.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất nỉ bông 100% cotton Pháp 380gsm dày dặn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_trefoil_hoodie.Variants.Add(new ProductVariant { Sku = "ADI-HOOD-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1850000m, StockQuantity = 15 });
            prod_adidas_adidas_trefoil_hoodie.Variants.Add(new ProductVariant { Sku = "ADI-HOOD-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1850000m, StockQuantity = 20 });
            prod_adidas_adidas_trefoil_hoodie.Variants.Add(new ProductVariant { Sku = "ADI-HOOD-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1850000m, StockQuantity = 15 });
            allProducts.Add(prod_adidas_adidas_trefoil_hoodie);
            var prod_adidas_adidas_adicolor_backpack = new Product
            {
                SellerId = seller_adidas.Id,
                CategoryId = catAccessories.Id,
                Name = "Balo Thời Trang Adicolor Classic Trefoil",
                Slug = "adidas-adidas-adicolor-backpack",
                Sku = "ADI-BACK-3",
                CollectionName = "Adidas Accessories",
                Description = "Balo Thời Trang Adicolor Classic Trefoil chính hãng từ Adidas. Chế tác từ Vải Poly dệt chống nước nhẹ, quai đệm êm với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 890000m,
                OriginalPrice = 1100000m,
                DiscountPercent = 19,
                ImageUrl = "/img/brands/adidas/adidas-adicolor-backpack.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/adidas/adidas-adicolor-backpack.jpg", "/img/brands/adidas/adidas-adicolor-backpack.jpg", "/img/brands/adidas/adidas-adicolor-backpack.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải Poly dệt chống nước nhẹ, quai đệm êm",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Adidas, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_adidas_adidas_adicolor_backpack.Variants.Add(new ProductVariant { Sku = "ADI-BACK-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 890000m, StockQuantity = 50 });
            allProducts.Add(prod_adidas_adidas_adicolor_backpack);

            var seller_louisvuitton = dbUsers.First(u => u.Email == "louisvuitton@gmail.com");
            var prod_louisvuitton_lv_speedy_bandouliere_25 = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Speedy Bandoulière 25 Monogram",
                Slug = "louisvuitton-lv-speedy-bandouliere-25",
                Sku = "LOU-25-3",
                CollectionName = "LV Speedy Heritage",
                Description = "Túi Xách Speedy Bandoulière 25 Monogram chính hãng từ Louis Vuitton. Chế tác từ Canvas Monogram kinh điển, tay cầm da bò tự nhiên với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 48500000m,
                OriginalPrice = 55000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", "/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Canvas Monogram kinh điển, tay cầm da bò tự nhiên",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_speedy_bandouliere_25.Variants.Add(new ProductVariant { Sku = "LOU-25-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 48500000m, StockQuantity = 50 });
            allProducts.Add(prod_louisvuitton_lv_speedy_bandouliere_25);
            var prod_louisvuitton_lv_neverfull_mm_monogram = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Tote Neverfull MM Monogram Canvas",
                Slug = "louisvuitton-lv-neverfull-mm-monogram",
                Sku = "LOU-MONO-3",
                CollectionName = "LV Icons",
                Description = "Túi Tote Neverfull MM Monogram Canvas chính hãng từ Louis Vuitton. Chế tác từ Canvas Monogram lót vải sọc, kèm ví pouch tháo rời với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 52000000m,
                OriginalPrice = 58000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/louisvuitton/lv-neverfull-mm-monogram.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-neverfull-mm-monogram.jpg", "/img/brands/louisvuitton/lv-neverfull-mm-monogram.jpg", "/img/brands/louisvuitton/lv-neverfull-mm-monogram.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Canvas Monogram lót vải sọc, kèm ví pouch tháo rời",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_neverfull_mm_monogram.Variants.Add(new ProductVariant { Sku = "LOU-MONO-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 52000000m, StockQuantity = 50 });
            allProducts.Add(prod_louisvuitton_lv_neverfull_mm_monogram);
            var prod_louisvuitton_lv_capucines_mm_taurillon = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Capucines MM Da Taurillon Đen",
                Slug = "louisvuitton-lv-capucines-mm-taurillon",
                Sku = "LOU-TAUR-3",
                CollectionName = "LV Capucines",
                Description = "Túi Xách Capucines MM Da Taurillon Đen chính hãng từ Louis Vuitton. Chế tác từ Da bò Taurillon cao cấp nguyên tấm, logo LV kim loại với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 185000000m,
                OriginalPrice = 200000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/louisvuitton/lv-capucines-mm-taurillon.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-capucines-mm-taurillon.jpg", "/img/brands/louisvuitton/lv-capucines-mm-taurillon.jpg", "/img/brands/louisvuitton/lv-capucines-mm-taurillon.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò Taurillon cao cấp nguyên tấm, logo LV kim loại",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_capucines_mm_taurillon.Variants.Add(new ProductVariant { Sku = "LOU-TAUR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 185000000m, StockQuantity = 50 });
            allProducts.Add(prod_louisvuitton_lv_capucines_mm_taurillon);
            var prod_louisvuitton_lv_trainer_sneaker_green = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker LV Trainer Green White",
                Slug = "louisvuitton-lv-trainer-sneaker-green",
                Sku = "LOU-GREE-1",
                CollectionName = "LV Trainer by Virgil",
                Description = "Giày Sneaker LV Trainer Green White chính hãng từ Louis Vuitton. Chế tác từ Thiết kế của Virgil Abloh, da bê Ý 7 giờ chế tác với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 34500000m,
                OriginalPrice = 38000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/louisvuitton/lv-trainer-sneaker-green.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-trainer-sneaker-green.jpg", "/img/brands/louisvuitton/lv-trainer-sneaker-green.jpg", "/img/brands/louisvuitton/lv-trainer-sneaker-green.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thiết kế của Virgil Abloh, da bê Ý 7 giờ chế tác",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_trainer_sneaker_green.Variants.Add(new ProductVariant { Sku = "LOU-GREE-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 34500000m, StockQuantity = 15 });
            prod_louisvuitton_lv_trainer_sneaker_green.Variants.Add(new ProductVariant { Sku = "LOU-GREE-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 34500000m, StockQuantity = 20 });
            prod_louisvuitton_lv_trainer_sneaker_green.Variants.Add(new ProductVariant { Sku = "LOU-GREE-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 34500000m, StockQuantity = 15 });
            allProducts.Add(prod_louisvuitton_lv_trainer_sneaker_green);
            var prod_louisvuitton_lv_run_away_sneaker = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Run Away Calf Leather",
                Slug = "louisvuitton-lv-run-away-sneaker",
                Sku = "LOU-SNEA-1",
                CollectionName = "LV Footwear",
                Description = "Giày Sneaker Run Away Calf Leather chính hãng từ Louis Vuitton. Chế tác từ Phối da bê và canvas monogram, đế nâng gót ẩn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 29000000m,
                OriginalPrice = 32500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/louisvuitton/lv-run-away-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-run-away-sneaker.jpg", "/img/brands/louisvuitton/lv-run-away-sneaker.jpg", "/img/brands/louisvuitton/lv-run-away-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Phối da bê và canvas monogram, đế nâng gót ẩn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_run_away_sneaker.Variants.Add(new ProductVariant { Sku = "LOU-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 29000000m, StockQuantity = 15 });
            prod_louisvuitton_lv_run_away_sneaker.Variants.Add(new ProductVariant { Sku = "LOU-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 29000000m, StockQuantity = 20 });
            prod_louisvuitton_lv_run_away_sneaker.Variants.Add(new ProductVariant { Sku = "LOU-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 29000000m, StockQuantity = 15 });
            allProducts.Add(prod_louisvuitton_lv_run_away_sneaker);
            var prod_louisvuitton_lv_monogram_windbreaker = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Gió Reversible Monogram Windbreaker",
                Slug = "louisvuitton-lv-monogram-windbreaker",
                Sku = "LOU-WIND-2",
                CollectionName = "LV Outerwear",
                Description = "Áo Khoác Gió Reversible Monogram Windbreaker chính hãng từ Louis Vuitton. Chế tác từ Vải kỹ thuật chống thấm 2 mặt, họa tiết monogram dệt chìm với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 72000000m,
                OriginalPrice = 80000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/louisvuitton/lv-monogram-windbreaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-monogram-windbreaker.jpg", "/img/brands/louisvuitton/lv-monogram-windbreaker.jpg", "/img/brands/louisvuitton/lv-monogram-windbreaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải kỹ thuật chống thấm 2 mặt, họa tiết monogram dệt chìm",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_monogram_windbreaker.Variants.Add(new ProductVariant { Sku = "LOU-WIND-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 72000000m, StockQuantity = 15 });
            prod_louisvuitton_lv_monogram_windbreaker.Variants.Add(new ProductVariant { Sku = "LOU-WIND-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 72000000m, StockQuantity = 20 });
            prod_louisvuitton_lv_monogram_windbreaker.Variants.Add(new ProductVariant { Sku = "LOU-WIND-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 72000000m, StockQuantity = 15 });
            allProducts.Add(prod_louisvuitton_lv_monogram_windbreaker);
            var prod_louisvuitton_lv_initiales_40mm_belt = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng LV Initiales 40mm Reversible",
                Slug = "louisvuitton-lv-initiales-40mm-belt",
                Sku = "LOU-BELT-3",
                CollectionName = "LV Belts",
                Description = "Thắt Lưng LV Initiales 40mm Reversible chính hãng từ Louis Vuitton. Chế tác từ Mặt ngoài Monogram Canvas, mặt trong da bê đen với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 16500000m,
                OriginalPrice = 18500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/louisvuitton/lv-initiales-40mm-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-initiales-40mm-belt.jpg", "/img/brands/louisvuitton/lv-initiales-40mm-belt.jpg", "/img/brands/louisvuitton/lv-initiales-40mm-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Mặt ngoài Monogram Canvas, mặt trong da bê đen",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_initiales_40mm_belt.Variants.Add(new ProductVariant { Sku = "LOU-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 50 });
            allProducts.Add(prod_louisvuitton_lv_initiales_40mm_belt);
            var prod_louisvuitton_lv_zippy_wallet_empreinte = new Product
            {
                SellerId = seller_louisvuitton.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Dài Zippy Wallet Da Monogram Empreinte",
                Slug = "louisvuitton-lv-zippy-wallet-empreinte",
                Sku = "LOU-EMPR-3",
                CollectionName = "LV Small Leather",
                Description = "Ví Dài Zippy Wallet Da Monogram Empreinte chính hãng từ Louis Vuitton. Chế tác từ Da bò dập nổi họa tiết Monogram, khóa kéo kim loại vàng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 27500000m,
                OriginalPrice = 30500000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/louisvuitton/lv-zippy-wallet-empreinte.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/louisvuitton/lv-zippy-wallet-empreinte.jpg", "/img/brands/louisvuitton/lv-zippy-wallet-empreinte.jpg", "/img/brands/louisvuitton/lv-zippy-wallet-empreinte.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò dập nổi họa tiết Monogram, khóa kéo kim loại vàng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Louis Vuitton, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_louisvuitton_lv_zippy_wallet_empreinte.Variants.Add(new ProductVariant { Sku = "LOU-EMPR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 27500000m, StockQuantity = 50 });
            allProducts.Add(prod_louisvuitton_lv_zippy_wallet_empreinte);

            var seller_nike = dbUsers.First(u => u.Email == "nike@gmail.com");
            var prod_nike_nike_air_force_1_white = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Nike Air Force 1 '07 Triple White",
                Slug = "nike-nike-air-force-1-white",
                Sku = "NIK-WHIT-1",
                CollectionName = "Nike Sportswear Icon",
                Description = "Giày Nike Air Force 1 '07 Triple White chính hãng từ Nike. Chế tác từ Da thật full-grain, đệm khí Nike Air êm ái với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2990000m,
                OriginalPrice = 3400000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/nike/nike-air-force-1-white.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-air-force-1-white.jpg", "/img/brands/nike/nike-air-force-1-white.jpg", "/img/brands/nike/nike-air-force-1-white.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da thật full-grain, đệm khí Nike Air êm ái",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_air_force_1_white.Variants.Add(new ProductVariant { Sku = "NIK-WHIT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 15 });
            prod_nike_nike_air_force_1_white.Variants.Add(new ProductVariant { Sku = "NIK-WHIT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 20 });
            prod_nike_nike_air_force_1_white.Variants.Add(new ProductVariant { Sku = "NIK-WHIT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_air_force_1_white);
            var prod_nike_nike_air_jordan_1_retro_chicago = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Nike Air Jordan 1 Retro High OG Chicago",
                Slug = "nike-nike-air-jordan-1-retro-chicago",
                Sku = "NIK-CHIC-1",
                CollectionName = "Jordan Brand Heritage",
                Description = "Giày Nike Air Jordan 1 Retro High OG Chicago chính hãng từ Nike. Chế tác từ Phiên bản màu Chicago kinh điển da Nappa cao cấp với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 5500000m,
                OriginalPrice = 6200000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/nike/nike-air-jordan-1-retro-chicago.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-air-jordan-1-retro-chicago.jpg", "/img/brands/nike/nike-air-jordan-1-retro-chicago.jpg", "/img/brands/nike/nike-air-jordan-1-retro-chicago.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Phiên bản màu Chicago kinh điển da Nappa cao cấp",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_air_jordan_1_retro_chicago.Variants.Add(new ProductVariant { Sku = "NIK-CHIC-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 5500000m, StockQuantity = 15 });
            prod_nike_nike_air_jordan_1_retro_chicago.Variants.Add(new ProductVariant { Sku = "NIK-CHIC-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 5500000m, StockQuantity = 20 });
            prod_nike_nike_air_jordan_1_retro_chicago.Variants.Add(new ProductVariant { Sku = "NIK-CHIC-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 5500000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_air_jordan_1_retro_chicago);
            var prod_nike_nike_dunk_low_retro_panda = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Nike Dunk Low Retro White Black Panda",
                Slug = "nike-nike-dunk-low-retro-panda",
                Sku = "NIK-PAND-1",
                CollectionName = "Nike Dunk Legacy",
                Description = "Giày Nike Dunk Low Retro White Black Panda chính hãng từ Nike. Chế tác từ Phối màu trắng đen Panda biểu tượng streetwear với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2890000m,
                OriginalPrice = 3300000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/nike/nike-dunk-low-retro-panda.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-dunk-low-retro-panda.jpg", "/img/brands/nike/nike-dunk-low-retro-panda.jpg", "/img/brands/nike/nike-dunk-low-retro-panda.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Phối màu trắng đen Panda biểu tượng streetwear",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_dunk_low_retro_panda.Variants.Add(new ProductVariant { Sku = "NIK-PAND-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2890000m, StockQuantity = 15 });
            prod_nike_nike_dunk_low_retro_panda.Variants.Add(new ProductVariant { Sku = "NIK-PAND-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2890000m, StockQuantity = 20 });
            prod_nike_nike_dunk_low_retro_panda.Variants.Add(new ProductVariant { Sku = "NIK-PAND-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2890000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_dunk_low_retro_panda);
            var prod_nike_nike_air_zoom_alphafly_next = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Chạy Bộ Nike Air Zoom Alphafly NEXT% 3",
                Slug = "nike-nike-air-zoom-alphafly-next",
                Sku = "NIK-NEXT-1",
                CollectionName = "Nike Running Elite",
                Description = "Giày Chạy Bộ Nike Air Zoom Alphafly NEXT% 3 chính hãng từ Nike. Chế tác từ Đế đệm bọt ZoomX & đĩa đệm sợi carbon Flyplate với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 7890000m,
                OriginalPrice = 8500000m,
                DiscountPercent = 7,
                ImageUrl = "/img/brands/nike/nike-air-zoom-alphafly-next.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-air-zoom-alphafly-next.jpg", "/img/brands/nike/nike-air-zoom-alphafly-next.jpg", "/img/brands/nike/nike-air-zoom-alphafly-next.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế đệm bọt ZoomX & đĩa đệm sợi carbon Flyplate",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_air_zoom_alphafly_next.Variants.Add(new ProductVariant { Sku = "NIK-NEXT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 7890000m, StockQuantity = 15 });
            prod_nike_nike_air_zoom_alphafly_next.Variants.Add(new ProductVariant { Sku = "NIK-NEXT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 7890000m, StockQuantity = 20 });
            prod_nike_nike_air_zoom_alphafly_next.Variants.Add(new ProductVariant { Sku = "NIK-NEXT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 7890000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_air_zoom_alphafly_next);
            var prod_nike_nike_tech_fleece_windrunner = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Nỉ Nike Tech Fleece Full-Zip Windrunner",
                Slug = "nike-nike-tech-fleece-windrunner",
                Sku = "NIK-WIND-2",
                CollectionName = "Nike Tech Pack",
                Description = "Áo Khoác Nỉ Nike Tech Fleece Full-Zip Windrunner chính hãng từ Nike. Chế tác từ Chất nỉ cách nhiệt Tech Fleece nhẹ và ấm vượt trội với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2850000m,
                OriginalPrice = 3300000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/nike/nike-tech-fleece-windrunner.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-tech-fleece-windrunner.jpg", "/img/brands/nike/nike-tech-fleece-windrunner.jpg", "/img/brands/nike/nike-tech-fleece-windrunner.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất nỉ cách nhiệt Tech Fleece nhẹ và ấm vượt trội",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_tech_fleece_windrunner.Variants.Add(new ProductVariant { Sku = "NIK-WIND-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2850000m, StockQuantity = 15 });
            prod_nike_nike_tech_fleece_windrunner.Variants.Add(new ProductVariant { Sku = "NIK-WIND-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2850000m, StockQuantity = 20 });
            prod_nike_nike_tech_fleece_windrunner.Variants.Add(new ProductVariant { Sku = "NIK-WIND-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2850000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_tech_fleece_windrunner);
            var prod_nike_nike_club_fleece_cargo_pants = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Nỉ Thể Thao Nike Club Fleece Cargo Pants",
                Slug = "nike-nike-club-fleece-cargo-pants",
                Sku = "NIK-PANT-2",
                CollectionName = "Nike Club Fleece",
                Description = "Quần Nỉ Thể Thao Nike Club Fleece Cargo Pants chính hãng từ Nike. Chế tác từ Vải nỉ bông mềm mại, túi hộp tiện dụng thể thao với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1650000m,
                OriginalPrice = 1950000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/nike/nike-club-fleece-cargo-pants.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-club-fleece-cargo-pants.jpg", "/img/brands/nike/nike-club-fleece-cargo-pants.jpg", "/img/brands/nike/nike-club-fleece-cargo-pants.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải nỉ bông mềm mại, túi hộp tiện dụng thể thao",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_club_fleece_cargo_pants.Variants.Add(new ProductVariant { Sku = "NIK-PANT-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 15 });
            prod_nike_nike_club_fleece_cargo_pants.Variants.Add(new ProductVariant { Sku = "NIK-PANT-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 20 });
            prod_nike_nike_club_fleece_cargo_pants.Variants.Add(new ProductVariant { Sku = "NIK-PANT-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_club_fleece_cargo_pants);
            var prod_nike_nike_windrunner_jacket = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Gió Chạy Bộ Nike Windrunner Repel Jacket",
                Slug = "nike-nike-windrunner-jacket",
                Sku = "NIK-JACK-2",
                CollectionName = "Nike Running Essentials",
                Description = "Áo Gió Chạy Bộ Nike Windrunner Repel Jacket chính hãng từ Nike. Chế tác từ Vải dệt chevron 26 độ chống thấm nước nhẹ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2450000m,
                OriginalPrice = 2900000m,
                DiscountPercent = 16,
                ImageUrl = "/img/brands/nike/nike-windrunner-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-windrunner-jacket.jpg", "/img/brands/nike/nike-windrunner-jacket.jpg", "/img/brands/nike/nike-windrunner-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt chevron 26 độ chống thấm nước nhẹ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_windrunner_jacket.Variants.Add(new ProductVariant { Sku = "NIK-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 15 });
            prod_nike_nike_windrunner_jacket.Variants.Add(new ProductVariant { Sku = "NIK-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 20 });
            prod_nike_nike_windrunner_jacket.Variants.Add(new ProductVariant { Sku = "NIK-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 15 });
            allProducts.Add(prod_nike_nike_windrunner_jacket);
            var prod_nike_nike_heritage_crossbody_bag = new Product
            {
                SellerId = seller_nike.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Đeo Chéo Thể Thao Nike Heritage Crossbody Bag",
                Slug = "nike-nike-heritage-crossbody-bag",
                Sku = "NIK-BAG-3",
                CollectionName = "Nike Accessories",
                Description = "Túi Đeo Chéo Thể Thao Nike Heritage Crossbody Bag chính hãng từ Nike. Chế tác từ Vải poly bền bỉ, dây đeo điều chỉnh linh hoạt với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 750000m,
                OriginalPrice = 950000m,
                DiscountPercent = 21,
                ImageUrl = "/img/brands/nike/nike-heritage-crossbody-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/nike/nike-heritage-crossbody-bag.jpg", "/img/brands/nike/nike-heritage-crossbody-bag.jpg", "/img/brands/nike/nike-heritage-crossbody-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải poly bền bỉ, dây đeo điều chỉnh linh hoạt",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Nike, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_nike_nike_heritage_crossbody_bag.Variants.Add(new ProductVariant { Sku = "NIK-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 750000m, StockQuantity = 50 });
            allProducts.Add(prod_nike_nike_heritage_crossbody_bag);

            var seller_chanel = dbUsers.First(u => u.Email == "chanel@gmail.com");
            var prod_chanel_chanel_classic_flap_bag = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Classic Flap Bag Lambskin Black",
                Slug = "chanel-chanel-classic-flap-bag",
                Sku = "CHA-BAG-3",
                CollectionName = "Chanel Timeless Classic",
                Description = "Túi Xách Classic Flap Bag Lambskin Black chính hãng từ Chanel. Chế tác từ Da cừu non chần quả trám, khóa xoay CC mạ vàng 24K với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 260000000m,
                OriginalPrice = 280000000m,
                DiscountPercent = 7,
                ImageUrl = "/img/brands/chanel/chanel-classic-flap-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-classic-flap-bag.jpg", "/img/brands/chanel/chanel-classic-flap-bag.jpg", "/img/brands/chanel/chanel-classic-flap-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu non chần quả trám, khóa xoay CC mạ vàng 24K",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_classic_flap_bag.Variants.Add(new ProductVariant { Sku = "CHA-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 260000000m, StockQuantity = 50 });
            allProducts.Add(prod_chanel_chanel_classic_flap_bag);
            var prod_chanel_chanel_boy_quilted_bag = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Boy Chanel Quilted Calfskin",
                Slug = "chanel-chanel-boy-quilted-bag",
                Sku = "CHA-BAG-4",
                CollectionName = "Boy Chanel Icons",
                Description = "Túi Xách Boy Chanel Quilted Calfskin chính hãng từ Chanel. Chế tác từ Da bê hạt sần cao cấp, khóa bấm kim loại ruthenium với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 175000000m,
                OriginalPrice = 190000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/chanel/chanel-boy-quilted-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-boy-quilted-bag.jpg", "/img/brands/chanel/chanel-boy-quilted-bag.jpg", "/img/brands/chanel/chanel-boy-quilted-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê hạt sần cao cấp, khóa bấm kim loại ruthenium",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_boy_quilted_bag.Variants.Add(new ProductVariant { Sku = "CHA-BAG-4-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 175000000m, StockQuantity = 50 });
            allProducts.Add(prod_chanel_chanel_boy_quilted_bag);
            var prod_chanel_chanel_tweed_boucle_jacket = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Dạ Tweed Bouclé Haute Couture",
                Slug = "chanel-chanel-tweed-boucle-jacket",
                Sku = "CHA-JACK-2",
                CollectionName = "Chanel Ready-to-Wear",
                Description = "Áo Khoác Dạ Tweed Bouclé Haute Couture chính hãng từ Chanel. Chế tác từ Vải Tweed dệt thủ công Lesage Paris, cúc chạm sư tử với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 145000000m,
                OriginalPrice = 160000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/chanel/chanel-tweed-boucle-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-tweed-boucle-jacket.jpg", "/img/brands/chanel/chanel-tweed-boucle-jacket.jpg", "/img/brands/chanel/chanel-tweed-boucle-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải Tweed dệt thủ công Lesage Paris, cúc chạm sư tử",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_tweed_boucle_jacket.Variants.Add(new ProductVariant { Sku = "CHA-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 145000000m, StockQuantity = 15 });
            prod_chanel_chanel_tweed_boucle_jacket.Variants.Add(new ProductVariant { Sku = "CHA-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 145000000m, StockQuantity = 20 });
            prod_chanel_chanel_tweed_boucle_jacket.Variants.Add(new ProductVariant { Sku = "CHA-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 145000000m, StockQuantity = 15 });
            allProducts.Add(prod_chanel_chanel_tweed_boucle_jacket);
            var prod_chanel_chanel_coco_mademoiselle_perfume = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Chanel Coco Mademoiselle Intense 100ml",
                Slug = "chanel-chanel-coco-mademoiselle-perfume",
                Sku = "CHA-PERF-3",
                CollectionName = "Chanel Fragrance",
                Description = "Nước Hoa Chanel Coco Mademoiselle Intense 100ml chính hãng từ Chanel. Chế tác từ Hương hoắc hương, hoa hồng Thổ Nhĩ Kỳ và cam Bergamot với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 4950000m,
                OriginalPrice = 5500000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/chanel/chanel-coco-mademoiselle-perfume.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-coco-mademoiselle-perfume.jpg", "/img/brands/chanel/chanel-coco-mademoiselle-perfume.jpg", "/img/brands/chanel/chanel-coco-mademoiselle-perfume.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương hoắc hương, hoa hồng Thổ Nhĩ Kỳ và cam Bergamot",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_coco_mademoiselle_perfume.Variants.Add(new ProductVariant { Sku = "CHA-PERF-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 4950000m, StockQuantity = 50 });
            allProducts.Add(prod_chanel_chanel_coco_mademoiselle_perfume);
            var prod_chanel_chanel_two_tone_slingback = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Slingback Two-Tone Beige Black Goat Leather",
                Slug = "chanel-chanel-two-tone-slingback",
                Sku = "CHA-SLIN-1",
                CollectionName = "Chanel Footwear",
                Description = "Giày Slingback Two-Tone Beige Black Goat Leather chính hãng từ Chanel. Chế tác từ Da dê phối mũi lụa đen huyền thoại Gabrielle Chanel 1957 với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 29500000m,
                OriginalPrice = 33000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/chanel/chanel-two-tone-slingback.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-two-tone-slingback.jpg", "/img/brands/chanel/chanel-two-tone-slingback.jpg", "/img/brands/chanel/chanel-two-tone-slingback.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da dê phối mũi lụa đen huyền thoại Gabrielle Chanel 1957",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_two_tone_slingback.Variants.Add(new ProductVariant { Sku = "CHA-SLIN-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 29500000m, StockQuantity = 15 });
            prod_chanel_chanel_two_tone_slingback.Variants.Add(new ProductVariant { Sku = "CHA-SLIN-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 29500000m, StockQuantity = 20 });
            prod_chanel_chanel_two_tone_slingback.Variants.Add(new ProductVariant { Sku = "CHA-SLIN-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 29500000m, StockQuantity = 15 });
            allProducts.Add(prod_chanel_chanel_two_tone_slingback);
            var prod_chanel_chanel_j12_ceramic_watch = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catAccessories.Id,
                Name = "Đồng Hồ J12 Ceramic Diamond Bezel Automatic",
                Slug = "chanel-chanel-j12-ceramic-watch",
                Sku = "CHA-WATC-3",
                CollectionName = "Chanel Horlogerie",
                Description = "Đồng Hồ J12 Ceramic Diamond Bezel Automatic chính hãng từ Chanel. Chế tác từ Ceramic công nghệ cao chống trầy, bộ máy Caliber 12.1 với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 220000000m,
                OriginalPrice = 240000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/chanel/chanel-j12-ceramic-watch.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-j12-ceramic-watch.jpg", "/img/brands/chanel/chanel-j12-ceramic-watch.jpg", "/img/brands/chanel/chanel-j12-ceramic-watch.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Ceramic công nghệ cao chống trầy, bộ máy Caliber 12.1",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_j12_ceramic_watch.Variants.Add(new ProductVariant { Sku = "CHA-WATC-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 220000000m, StockQuantity = 50 });
            allProducts.Add(prod_chanel_chanel_j12_ceramic_watch);
            var prod_chanel_chanel_quilted_leather_wallet = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Gập Cầm Tay Quilted Caviar Flap Wallet",
                Slug = "chanel-chanel-quilted-leather-wallet",
                Sku = "CHA-WALL-3",
                CollectionName = "Chanel Small Leather",
                Description = "Ví Gập Cầm Tay Quilted Caviar Flap Wallet chính hãng từ Chanel. Chế tác từ Da hạt Caviar chống xước, logo CC vàng tinh xảo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 31000000m,
                OriginalPrice = 35000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/chanel/chanel-quilted-leather-wallet.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-quilted-leather-wallet.jpg", "/img/brands/chanel/chanel-quilted-leather-wallet.jpg", "/img/brands/chanel/chanel-quilted-leather-wallet.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da hạt Caviar chống xước, logo CC vàng tinh xảo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_quilted_leather_wallet.Variants.Add(new ProductVariant { Sku = "CHA-WALL-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 31000000m, StockQuantity = 50 });
            allProducts.Add(prod_chanel_chanel_quilted_leather_wallet);
            var prod_chanel_chanel_camellia_silk_scarf = new Product
            {
                SellerId = seller_chanel.Id,
                CategoryId = catAccessories.Id,
                Name = "Khăn Lụa Tơ Tằm Camellia Silk Twill 90x90",
                Slug = "chanel-chanel-camellia-silk-scarf",
                Sku = "CHA-SCAR-3",
                CollectionName = "Chanel Silk Foulards",
                Description = "Khăn Lụa Tơ Tằm Camellia Silk Twill 90x90 chính hãng từ Chanel. Chế tác từ 100% Silk Twill dệt tại Pháp, họa tiết hoa trà Camellia với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 14500000m,
                OriginalPrice = 16500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/chanel/chanel-camellia-silk-scarf.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/chanel/chanel-camellia-silk-scarf.jpg", "/img/brands/chanel/chanel-camellia-silk-scarf.jpg", "/img/brands/chanel/chanel-camellia-silk-scarf.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Silk Twill dệt tại Pháp, họa tiết hoa trà Camellia",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Chanel, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_chanel_chanel_camellia_silk_scarf.Variants.Add(new ProductVariant { Sku = "CHA-SCAR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 14500000m, StockQuantity = 50 });
            allProducts.Add(prod_chanel_chanel_camellia_silk_scarf);

            var seller_prada = dbUsers.First(u => u.Email == "prada@gmail.com");
            var prod_prada_prada_re_edition_2005_nylon = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Re-Edition 2005 Re-Nylon Shoulder Bag",
                Slug = "prada-prada-re-edition-2005-nylon",
                Sku = "PRA-NYLO-3",
                CollectionName = "Prada Re-Edition",
                Description = "Túi Xách Re-Edition 2005 Re-Nylon Shoulder Bag chính hãng từ Prada. Chế tác từ Chất liệu Re-Nylon tái chế đại dương, quai da Saffiano với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 45000000m,
                OriginalPrice = 50000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/prada/prada-re-edition-2005-nylon.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-re-edition-2005-nylon.jpg", "/img/brands/prada/prada-re-edition-2005-nylon.jpg", "/img/brands/prada/prada-re-edition-2005-nylon.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất liệu Re-Nylon tái chế đại dương, quai da Saffiano",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_re_edition_2005_nylon.Variants.Add(new ProductVariant { Sku = "PRA-NYLO-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 45000000m, StockQuantity = 50 });
            allProducts.Add(prod_prada_prada_re_edition_2005_nylon);
            var prod_prada_prada_cleo_brushed_shoulder_bag = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Kẹp Nách Cleo Brushed Leather Shoulder Bag",
                Slug = "prada-prada-cleo-brushed-shoulder-bag",
                Sku = "PRA-BAG-3",
                CollectionName = "Prada Cleo Icons",
                Description = "Túi Kẹp Nách Cleo Brushed Leather Shoulder Bag chính hãng từ Prada. Chế tác từ Da bê bóng Spazzolato uốn cong duyên dáng Milan với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 75000000m,
                OriginalPrice = 82000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/prada/prada-cleo-brushed-shoulder-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-cleo-brushed-shoulder-bag.jpg", "/img/brands/prada/prada-cleo-brushed-shoulder-bag.jpg", "/img/brands/prada/prada-cleo-brushed-shoulder-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê bóng Spazzolato uốn cong duyên dáng Milan",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_cleo_brushed_shoulder_bag.Variants.Add(new ProductVariant { Sku = "PRA-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 75000000m, StockQuantity = 50 });
            allProducts.Add(prod_prada_prada_cleo_brushed_shoulder_bag);
            var prod_prada_prada_monolith_combat_boots = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Combat Boots Monolith Leather & Nylon",
                Slug = "prada-prada-monolith-combat-boots",
                Sku = "PRA-BOOT-1",
                CollectionName = "Prada Monolith Footwear",
                Description = "Giày Combat Boots Monolith Leather & Nylon chính hãng từ Prada. Chế tác từ Đế răng cưa hầm hố kèm ví pouch gắn bắp chân tháo rời với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 38000000m,
                OriginalPrice = 42000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/prada/prada-monolith-combat-boots.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-monolith-combat-boots.jpg", "/img/brands/prada/prada-monolith-combat-boots.jpg", "/img/brands/prada/prada-monolith-combat-boots.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế răng cưa hầm hố kèm ví pouch gắn bắp chân tháo rời",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_monolith_combat_boots.Variants.Add(new ProductVariant { Sku = "PRA-BOOT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 15 });
            prod_prada_prada_monolith_combat_boots.Variants.Add(new ProductVariant { Sku = "PRA-BOOT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 20 });
            prod_prada_prada_monolith_combat_boots.Variants.Add(new ProductVariant { Sku = "PRA-BOOT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 15 });
            allProducts.Add(prod_prada_prada_monolith_combat_boots);
            var prod_prada_prada_chocolate_brushed_loafers = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Loafer Chocolate Brushed Leather With Triangle",
                Slug = "prada-prada-chocolate-brushed-loafers",
                Sku = "PRA-LOAF-1",
                CollectionName = "Prada Footwear",
                Description = "Giày Loafer Chocolate Brushed Leather With Triangle chính hãng từ Prada. Chế tác từ Da bóng mịn đính logo tam giác tráng men Men Milan với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 31500000m,
                OriginalPrice = 35000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/prada/prada-chocolate-brushed-loafers.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-chocolate-brushed-loafers.jpg", "/img/brands/prada/prada-chocolate-brushed-loafers.jpg", "/img/brands/prada/prada-chocolate-brushed-loafers.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bóng mịn đính logo tam giác tráng men Men Milan",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_chocolate_brushed_loafers.Variants.Add(new ProductVariant { Sku = "PRA-LOAF-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 31500000m, StockQuantity = 15 });
            prod_prada_prada_chocolate_brushed_loafers.Variants.Add(new ProductVariant { Sku = "PRA-LOAF-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 31500000m, StockQuantity = 20 });
            prod_prada_prada_chocolate_brushed_loafers.Variants.Add(new ProductVariant { Sku = "PRA-LOAF-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 31500000m, StockQuantity = 15 });
            allProducts.Add(prod_prada_prada_chocolate_brushed_loafers);
            var prod_prada_prada_re_nylon_cropped_jacket = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Phao Re-Nylon Cropped Down Jacket",
                Slug = "prada-prada-re-nylon-cropped-jacket",
                Sku = "PRA-JACK-2",
                CollectionName = "Prada Ready-to-Wear",
                Description = "Áo Khoác Phao Re-Nylon Cropped Down Jacket chính hãng từ Prada. Chế tác từ Vải Re-Nylon chống thấm, lông vũ tơ tằm siêu nhẹ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 65000000m,
                OriginalPrice = 72000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/prada/prada-re-nylon-cropped-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-re-nylon-cropped-jacket.jpg", "/img/brands/prada/prada-re-nylon-cropped-jacket.jpg", "/img/brands/prada/prada-re-nylon-cropped-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải Re-Nylon chống thấm, lông vũ tơ tằm siêu nhẹ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_re_nylon_cropped_jacket.Variants.Add(new ProductVariant { Sku = "PRA-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 65000000m, StockQuantity = 15 });
            prod_prada_prada_re_nylon_cropped_jacket.Variants.Add(new ProductVariant { Sku = "PRA-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 65000000m, StockQuantity = 20 });
            prod_prada_prada_re_nylon_cropped_jacket.Variants.Add(new ProductVariant { Sku = "PRA-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 65000000m, StockQuantity = 15 });
            allProducts.Add(prod_prada_prada_re_nylon_cropped_jacket);
            var prod_prada_prada_triangle_logo_belt = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da Saffiano Reversible Triangle Belt",
                Slug = "prada-prada-triangle-logo-belt",
                Sku = "PRA-BELT-3",
                CollectionName = "Prada Accessories",
                Description = "Thắt Lưng Da Saffiano Reversible Triangle Belt chính hãng từ Prada. Chế tác từ Da Saffiano dập vân chéo chống trầy, khóa tam giác bạc với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 15500000m,
                OriginalPrice = 17500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/prada/prada-triangle-logo-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-triangle-logo-belt.jpg", "/img/brands/prada/prada-triangle-logo-belt.jpg", "/img/brands/prada/prada-triangle-logo-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da Saffiano dập vân chéo chống trầy, khóa tam giác bạc",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_triangle_logo_belt.Variants.Add(new ProductVariant { Sku = "PRA-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 15500000m, StockQuantity = 50 });
            allProducts.Add(prod_prada_prada_triangle_logo_belt);
            var prod_prada_prada_symbole_sunglasses = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Chữ Nhật Prada Symbole Geometric",
                Slug = "prada-prada-symbole-sunglasses",
                Sku = "PRA-SUNG-3",
                CollectionName = "Prada Eyewear",
                Description = "Kính Mát Chữ Nhật Prada Symbole Geometric chính hãng từ Prada. Chế tác từ Gọng Acetate cắt góc geometric, tròng chống lóa 100% với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 12800000m,
                OriginalPrice = 14500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/prada/prada-symbole-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-symbole-sunglasses.jpg", "/img/brands/prada/prada-symbole-sunglasses.jpg", "/img/brands/prada/prada-symbole-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng Acetate cắt góc geometric, tròng chống lóa 100%",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_symbole_sunglasses.Variants.Add(new ProductVariant { Sku = "PRA-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 12800000m, StockQuantity = 50 });
            allProducts.Add(prod_prada_prada_symbole_sunglasses);
            var prod_prada_prada_saffiano_card_holder = new Product
            {
                SellerId = seller_prada.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Đựng Thẻ Saffiano Leather Card Holder",
                Slug = "prada-prada-saffiano-card-holder",
                Sku = "PRA-HOLD-3",
                CollectionName = "Prada Small Leather",
                Description = "Ví Đựng Thẻ Saffiano Leather Card Holder chính hãng từ Prada. Chế tác từ Da Saffiano đen 6 ngăn cắm thẻ, logo men kim loại với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 9500000m,
                OriginalPrice = 11000000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/prada/prada-saffiano-card-holder.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/prada/prada-saffiano-card-holder.jpg", "/img/brands/prada/prada-saffiano-card-holder.jpg", "/img/brands/prada/prada-saffiano-card-holder.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da Saffiano đen 6 ngăn cắm thẻ, logo men kim loại",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Prada, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_prada_prada_saffiano_card_holder.Variants.Add(new ProductVariant { Sku = "PRA-HOLD-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 9500000m, StockQuantity = 50 });
            allProducts.Add(prod_prada_prada_saffiano_card_holder);

            var seller_balenciaga = dbUsers.First(u => u.Email == "balenciaga@gmail.com");
            var prod_balenciaga_balenciaga_le_city_medium_bag = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Le City Medium Arena Leather Bag",
                Slug = "balenciaga-balenciaga-le-city-medium-bag",
                Sku = "BAL-BAG-3",
                CollectionName = "Balenciaga Icons",
                Description = "Túi Xách Le City Medium Arena Leather Bag chính hãng từ Balenciaga. Chế tác từ Da cừu non Arena nhăn tự nhiên, đinh tán kim loại bạc với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 68000000m,
                OriginalPrice = 75000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg", "/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg", "/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu non Arena nhăn tự nhiên, đinh tán kim loại bạc",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_le_city_medium_bag.Variants.Add(new ProductVariant { Sku = "BAL-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 68000000m, StockQuantity = 50 });
            allProducts.Add(prod_balenciaga_balenciaga_le_city_medium_bag);
            var prod_balenciaga_balenciaga_triple_s_sneaker = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Triple S Clear Sole White Multi",
                Slug = "balenciaga-balenciaga-triple-s-sneaker",
                Sku = "BAL-SNEA-1",
                CollectionName = "Balenciaga Triple S",
                Description = "Giày Sneaker Triple S Clear Sole White Multi chính hãng từ Balenciaga. Chế tác từ Đế ba lớp công nghệ Clear Sole bán trong suốt với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 26500000m,
                OriginalPrice = 29000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/balenciaga/balenciaga-triple-s-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-triple-s-sneaker.jpg", "/img/brands/balenciaga/balenciaga-triple-s-sneaker.jpg", "/img/brands/balenciaga/balenciaga-triple-s-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế ba lớp công nghệ Clear Sole bán trong suốt",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_triple_s_sneaker.Variants.Add(new ProductVariant { Sku = "BAL-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 15 });
            prod_balenciaga_balenciaga_triple_s_sneaker.Variants.Add(new ProductVariant { Sku = "BAL-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 20 });
            prod_balenciaga_balenciaga_triple_s_sneaker.Variants.Add(new ProductVariant { Sku = "BAL-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 15 });
            allProducts.Add(prod_balenciaga_balenciaga_triple_s_sneaker);
            var prod_balenciaga_balenciaga_track_sneaker_noir = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Track 4.0 LED Light-Up Sneaker",
                Slug = "balenciaga-balenciaga-track-sneaker-noir",
                Sku = "BAL-NOIR-1",
                CollectionName = "Balenciaga Track",
                Description = "Giày Sneaker Track 4.0 LED Light-Up Sneaker chính hãng từ Balenciaga. Chế tác từ Phiên bản đèn LED gót 11 chế độ, dây buộc đa lớp với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 32000000m,
                OriginalPrice = 36000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/balenciaga/balenciaga-track-sneaker-noir.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-track-sneaker-noir.jpg", "/img/brands/balenciaga/balenciaga-track-sneaker-noir.jpg", "/img/brands/balenciaga/balenciaga-track-sneaker-noir.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Phiên bản đèn LED gót 11 chế độ, dây buộc đa lớp",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_track_sneaker_noir.Variants.Add(new ProductVariant { Sku = "BAL-NOIR-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 32000000m, StockQuantity = 15 });
            prod_balenciaga_balenciaga_track_sneaker_noir.Variants.Add(new ProductVariant { Sku = "BAL-NOIR-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 32000000m, StockQuantity = 20 });
            prod_balenciaga_balenciaga_track_sneaker_noir.Variants.Add(new ProductVariant { Sku = "BAL-NOIR-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 32000000m, StockQuantity = 15 });
            allProducts.Add(prod_balenciaga_balenciaga_track_sneaker_noir);
            var prod_balenciaga_balenciaga_oversized_denim_jacket = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Bò Oversized Ripped Denim Jacket",
                Slug = "balenciaga-balenciaga-oversized-denim-jacket",
                Sku = "BAL-JACK-2",
                CollectionName = "Balenciaga Streetwear",
                Description = "Áo Khoác Bò Oversized Ripped Denim Jacket chính hãng từ Balenciaga. Chế tác từ Vải Denim Nhật Bản wash mài rách thủ công phong cách grunge với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 42000000m,
                OriginalPrice = 48000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/balenciaga/balenciaga-oversized-denim-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-oversized-denim-jacket.jpg", "/img/brands/balenciaga/balenciaga-oversized-denim-jacket.jpg", "/img/brands/balenciaga/balenciaga-oversized-denim-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải Denim Nhật Bản wash mài rách thủ công phong cách grunge",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_oversized_denim_jacket.Variants.Add(new ProductVariant { Sku = "BAL-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 42000000m, StockQuantity = 15 });
            prod_balenciaga_balenciaga_oversized_denim_jacket.Variants.Add(new ProductVariant { Sku = "BAL-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 42000000m, StockQuantity = 20 });
            prod_balenciaga_balenciaga_oversized_denim_jacket.Variants.Add(new ProductVariant { Sku = "BAL-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 42000000m, StockQuantity = 15 });
            allProducts.Add(prod_balenciaga_balenciaga_oversized_denim_jacket);
            var prod_balenciaga_balenciaga_strike_combat_boots = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Bốt Strike 20mm Matte Leather Combat Boots",
                Slug = "balenciaga-balenciaga-strike-combat-boots",
                Sku = "BAL-BOOT-1",
                CollectionName = "Balenciaga Strike",
                Description = "Giày Bốt Strike 20mm Matte Leather Combat Boots chính hãng từ Balenciaga. Chế tác từ Da bò đen mờ, đế cao su khâu viền răng cưa chắc chắn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 31000000m,
                OriginalPrice = 35000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/balenciaga/balenciaga-strike-combat-boots.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-strike-combat-boots.jpg", "/img/brands/balenciaga/balenciaga-strike-combat-boots.jpg", "/img/brands/balenciaga/balenciaga-strike-combat-boots.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò đen mờ, đế cao su khâu viền răng cưa chắc chắn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_strike_combat_boots.Variants.Add(new ProductVariant { Sku = "BAL-BOOT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 31000000m, StockQuantity = 15 });
            prod_balenciaga_balenciaga_strike_combat_boots.Variants.Add(new ProductVariant { Sku = "BAL-BOOT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 31000000m, StockQuantity = 20 });
            prod_balenciaga_balenciaga_strike_combat_boots.Variants.Add(new ProductVariant { Sku = "BAL-BOOT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 31000000m, StockQuantity = 15 });
            allProducts.Add(prod_balenciaga_balenciaga_strike_combat_boots);
            var prod_balenciaga_balenciaga_hourglass_xs_bag = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Hourglass XS Top Handle Shiny Calfskin",
                Slug = "balenciaga-balenciaga-hourglass-xs-bag",
                Sku = "BAL-BAG-4",
                CollectionName = "Balenciaga Hourglass",
                Description = "Túi Xách Hourglass XS Top Handle Shiny Calfskin chính hãng từ Balenciaga. Chế tác từ Thiết kế đáy uốn cong parabol độc đáo, khóa chữ B mạ vàng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 58000000m,
                OriginalPrice = 65000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/balenciaga/balenciaga-hourglass-xs-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-hourglass-xs-bag.jpg", "/img/brands/balenciaga/balenciaga-hourglass-xs-bag.jpg", "/img/brands/balenciaga/balenciaga-hourglass-xs-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thiết kế đáy uốn cong parabol độc đáo, khóa chữ B mạ vàng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_hourglass_xs_bag.Variants.Add(new ProductVariant { Sku = "BAL-BAG-4-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 58000000m, StockQuantity = 50 });
            allProducts.Add(prod_balenciaga_balenciaga_hourglass_xs_bag);
            var prod_balenciaga_balenciaga_bb_monogram_belt = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da BB Monogram Antique Brass Belt",
                Slug = "balenciaga-balenciaga-bb-monogram-belt",
                Sku = "BAL-BELT-3",
                CollectionName = "Balenciaga Belts",
                Description = "Thắt Lưng Da BB Monogram Antique Brass Belt chính hãng từ Balenciaga. Chế tác từ Da bò trơn thuộc thảo mộc, mặt khóa BB đồng giả cổ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 12500000m,
                OriginalPrice = 14000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/balenciaga/balenciaga-bb-monogram-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-bb-monogram-belt.jpg", "/img/brands/balenciaga/balenciaga-bb-monogram-belt.jpg", "/img/brands/balenciaga/balenciaga-bb-monogram-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò trơn thuộc thảo mộc, mặt khóa BB đồng giả cổ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_bb_monogram_belt.Variants.Add(new ProductVariant { Sku = "BAL-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 12500000m, StockQuantity = 50 });
            allProducts.Add(prod_balenciaga_balenciaga_bb_monogram_belt);
            var prod_balenciaga_balenciaga_dynasty_sunglasses = new Product
            {
                SellerId = seller_balenciaga.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Chữ Nhật Dynasty Rectangle Sunglasses",
                Slug = "balenciaga-balenciaga-dynasty-sunglasses",
                Sku = "BAL-SUNG-3",
                CollectionName = "Balenciaga Eyewear",
                Description = "Kính Mát Chữ Nhật Dynasty Rectangle Sunglasses chính hãng từ Balenciaga. Chế tác từ Gọng dày đính logo BB kim loại mạ vàng hai bên càng kính với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 13500000m,
                OriginalPrice = 15000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/balenciaga/balenciaga-dynasty-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/balenciaga/balenciaga-dynasty-sunglasses.jpg", "/img/brands/balenciaga/balenciaga-dynasty-sunglasses.jpg", "/img/brands/balenciaga/balenciaga-dynasty-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng dày đính logo BB kim loại mạ vàng hai bên càng kính",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Balenciaga, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha / Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_balenciaga_balenciaga_dynasty_sunglasses.Variants.Add(new ProductVariant { Sku = "BAL-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 13500000m, StockQuantity = 50 });
            allProducts.Add(prod_balenciaga_balenciaga_dynasty_sunglasses);

            var seller_hermes = dbUsers.First(u => u.Email == "hermes@gmail.com");
            var prod_hermes_hermes_birkin_30_togo_gold = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Birkin 30 Togo Leather Gold Hardware",
                Slug = "hermes-hermes-birkin-30-togo-gold",
                Sku = "HER-GOLD-3",
                CollectionName = "Hermès Birkin Heritage",
                Description = "Túi Xách Birkin 30 Togo Leather Gold Hardware chính hãng từ Hermès. Chế tác từ Da bê Togo sần chống xước, khóa kim loại mạ vàng 18K với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 380000000m,
                OriginalPrice = 420000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", "/img/brands/hermes/hermes-birkin-30-togo-gold.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê Togo sần chống xước, khóa kim loại mạ vàng 18K",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_birkin_30_togo_gold.Variants.Add(new ProductVariant { Sku = "HER-GOLD-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 380000000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_birkin_30_togo_gold);
            var prod_hermes_hermes_kelly_28_epsom_leather = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Kelly 28 Sellier Epsom Leather",
                Slug = "hermes-hermes-kelly-28-epsom-leather",
                Sku = "HER-LEAT-3",
                CollectionName = "Hermès Kelly Sellier",
                Description = "Túi Xách Kelly 28 Sellier Epsom Leather chính hãng từ Hermès. Chế tác từ Da Epsom cứng cáp giữ form tuyệt đối, đường may viền Sellier với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 340000000m,
                OriginalPrice = 370000000m,
                DiscountPercent = 8,
                ImageUrl = "/img/brands/hermes/hermes-kelly-28-epsom-leather.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-kelly-28-epsom-leather.jpg", "/img/brands/hermes/hermes-kelly-28-epsom-leather.jpg", "/img/brands/hermes/hermes-kelly-28-epsom-leather.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da Epsom cứng cáp giữ form tuyệt đối, đường may viền Sellier",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_kelly_28_epsom_leather.Variants.Add(new ProductVariant { Sku = "HER-LEAT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 340000000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_kelly_28_epsom_leather);
            var prod_hermes_hermes_oran_flat_sandals = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catSneaker.Id,
                Name = "Dép Quai Ngang Oran Flat Calfskin Sandals Gold",
                Slug = "hermes-hermes-oran-flat-sandals",
                Sku = "HER-SAND-1",
                CollectionName = "Hermès Footwear",
                Description = "Dép Quai Ngang Oran Flat Calfskin Sandals Gold chính hãng từ Hermès. Chế tác từ Da bê Box cao cấp màu nâu bò Gold, quai chữ H kinh điển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 19500000m,
                OriginalPrice = 22000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/hermes/hermes-oran-flat-sandals.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-oran-flat-sandals.jpg", "/img/brands/hermes/hermes-oran-flat-sandals.jpg", "/img/brands/hermes/hermes-oran-flat-sandals.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê Box cao cấp màu nâu bò Gold, quai chữ H kinh điển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_oran_flat_sandals.Variants.Add(new ProductVariant { Sku = "HER-SAND-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 19500000m, StockQuantity = 15 });
            prod_hermes_hermes_oran_flat_sandals.Variants.Add(new ProductVariant { Sku = "HER-SAND-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 19500000m, StockQuantity = 20 });
            prod_hermes_hermes_oran_flat_sandals.Variants.Add(new ProductVariant { Sku = "HER-SAND-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 19500000m, StockQuantity = 15 });
            allProducts.Add(prod_hermes_hermes_oran_flat_sandals);
            var prod_hermes_hermes_constance_h_belt = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da Constance H-Buckle Reversible",
                Slug = "hermes-hermes-constance-h-belt",
                Sku = "HER-BELT-3",
                CollectionName = "Hermès Belts",
                Description = "Thắt Lưng Da Constance H-Buckle Reversible chính hãng từ Hermès. Chế tác từ Da Togo/Swift hai mặt, mặt khóa chữ H mạ palladium sáng bóng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 24500000m,
                OriginalPrice = 27500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/hermes/hermes-constance-h-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-constance-h-belt.jpg", "/img/brands/hermes/hermes-constance-h-belt.jpg", "/img/brands/hermes/hermes-constance-h-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da Togo/Swift hai mặt, mặt khóa chữ H mạ palladium sáng bóng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_constance_h_belt.Variants.Add(new ProductVariant { Sku = "HER-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_constance_h_belt);
            var prod_hermes_hermes_silk_carre_scarf = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Khăn Lụa Tơ Tằm Carré 90x90 Grand Tralala",
                Slug = "hermes-hermes-silk-carre-scarf",
                Sku = "HER-SCAR-3",
                CollectionName = "Hermès Silk",
                Description = "Khăn Lụa Tơ Tằm Carré 90x90 Grand Tralala chính hãng từ Hermès. Chế tác từ Lụa tơ tằm dệt thủ công tại Lyon, viền may tay cuộn tròn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 13500000m,
                OriginalPrice = 15500000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/hermes/hermes-silk-carre-scarf.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-silk-carre-scarf.jpg", "/img/brands/hermes/hermes-silk-carre-scarf.jpg", "/img/brands/hermes/hermes-silk-carre-scarf.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Lụa tơ tằm dệt thủ công tại Lyon, viền may tay cuộn tròn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_silk_carre_scarf.Variants.Add(new ProductVariant { Sku = "HER-SCAR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 13500000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_silk_carre_scarf);
            var prod_hermes_hermes_calvi_card_case = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Đựng Thẻ Calvi Card Case Epsom Leather",
                Slug = "hermes-hermes-calvi-card-case",
                Sku = "HER-CASE-3",
                CollectionName = "Hermès Small Leather",
                Description = "Ví Đựng Thẻ Calvi Card Case Epsom Leather chính hãng từ Hermès. Chế tác từ Thiết kế gập phong bì tối giản da Epsom bền bỉ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 12000000m,
                OriginalPrice = 14000000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/hermes/hermes-calvi-card-case.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-calvi-card-case.jpg", "/img/brands/hermes/hermes-calvi-card-case.jpg", "/img/brands/hermes/hermes-calvi-card-case.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thiết kế gập phong bì tối giản da Epsom bền bỉ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_calvi_card_case.Variants.Add(new ProductVariant { Sku = "HER-CASE-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 12000000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_calvi_card_case);
            var prod_hermes_hermes_chaine_dancre_bracelet = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Vòng Tay Bạc Chaine d'Ancre Silver Bracelet",
                Slug = "hermes-hermes-chaine-dancre-bracelet",
                Sku = "HER-BRAC-3",
                CollectionName = "Hermès Bijouterie",
                Description = "Vòng Tay Bạc Chaine d'Ancre Silver Bracelet chính hãng từ Hermès. Chế tác từ Bạc nguyên khối 925 lấy cảm hứng từ mỏ neo du thuyền với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 42000000m,
                OriginalPrice = 47000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/hermes/hermes-chaine-dancre-bracelet.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-chaine-dancre-bracelet.jpg", "/img/brands/hermes/hermes-chaine-dancre-bracelet.jpg", "/img/brands/hermes/hermes-chaine-dancre-bracelet.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Bạc nguyên khối 925 lấy cảm hứng từ mỏ neo du thuyền",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_chaine_dancre_bracelet.Variants.Add(new ProductVariant { Sku = "HER-BRAC-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 42000000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_chaine_dancre_bracelet);
            var prod_hermes_hermes_terre_d_hermes_parfum = new Product
            {
                SellerId = seller_hermes.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Terre d'Hermès Eau Intense Vétiver 100ml",
                Slug = "hermes-hermes-terre-d-hermes-parfum",
                Sku = "HER-PARF-3",
                CollectionName = "Hermès Parfums",
                Description = "Nước Hoa Terre d'Hermès Eau Intense Vétiver 100ml chính hãng từ Hermès. Chế tác từ Hương gỗ khoáng đạt, cỏ hương bài và cam Bergamot nồng nàn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3850000m,
                OriginalPrice = 4300000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/hermes/hermes-terre-d-hermes-parfum.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/hermes/hermes-terre-d-hermes-parfum.jpg", "/img/brands/hermes/hermes-terre-d-hermes-parfum.jpg", "/img/brands/hermes/hermes-terre-d-hermes-parfum.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương gỗ khoáng đạt, cỏ hương bài và cam Bergamot nồng nàn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Hermès, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_hermes_hermes_terre_d_hermes_parfum.Variants.Add(new ProductVariant { Sku = "HER-PARF-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 50 });
            allProducts.Add(prod_hermes_hermes_terre_d_hermes_parfum);

            var seller_versace = dbUsers.First(u => u.Email == "versace@gmail.com");
            var prod_versace_versace_la_medusa_handbag = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách La Medusa Small Leather Handbag",
                Slug = "versace-versace-la-medusa-handbag",
                Sku = "VER-HAND-3",
                CollectionName = "Versace La Medusa",
                Description = "Túi Xách La Medusa Small Leather Handbag chính hãng từ Versace. Chế tác từ Da bê dẻo mềm mịn, logo đầu nữ thần rắn Medusa mạ vàng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 48000000m,
                OriginalPrice = 54000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/versace/versace-la-medusa-handbag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-la-medusa-handbag.jpg", "/img/brands/versace/versace-la-medusa-handbag.jpg", "/img/brands/versace/versace-la-medusa-handbag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê dẻo mềm mịn, logo đầu nữ thần rắn Medusa mạ vàng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_la_medusa_handbag.Variants.Add(new ProductVariant { Sku = "VER-HAND-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 48000000m, StockQuantity = 50 });
            allProducts.Add(prod_versace_versace_la_medusa_handbag);
            var prod_versace_versace_barocco_silk_shirt = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Sơ Mi Lụa Barocco Silk Button-Up Shirt",
                Slug = "versace-versace-barocco-silk-shirt",
                Sku = "VER-SHIR-2",
                CollectionName = "Versace Silk Icons",
                Description = "Áo Sơ Mi Lụa Barocco Silk Button-Up Shirt chính hãng từ Versace. Chế tác từ 100% Lụa tơ tằm in họa tiết hoa văn vàng hoàng gia Baroque với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 38000000m,
                OriginalPrice = 43000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/versace/versace-barocco-silk-shirt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-barocco-silk-shirt.jpg", "/img/brands/versace/versace-barocco-silk-shirt.jpg", "/img/brands/versace/versace-barocco-silk-shirt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Lụa tơ tằm in họa tiết hoa văn vàng hoàng gia Baroque",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_barocco_silk_shirt.Variants.Add(new ProductVariant { Sku = "VER-SHIR-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 15 });
            prod_versace_versace_barocco_silk_shirt.Variants.Add(new ProductVariant { Sku = "VER-SHIR-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 20 });
            prod_versace_versace_barocco_silk_shirt.Variants.Add(new ProductVariant { Sku = "VER-SHIR-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 15 });
            allProducts.Add(prod_versace_versace_barocco_silk_shirt);
            var prod_versace_versace_chain_reaction_sneaker = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Chain Reaction Chunky Sole",
                Slug = "versace-versace-chain-reaction-sneaker",
                Sku = "VER-SNEA-1",
                CollectionName = "Versace Footwear",
                Description = "Giày Sneaker Chain Reaction Chunky Sole chính hãng từ Versace. Chế tác từ Đế đúc hình mắt xích dây chuyền Versace, họa tiết da báo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 24500000m,
                OriginalPrice = 27500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/versace/versace-chain-reaction-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-chain-reaction-sneaker.jpg", "/img/brands/versace/versace-chain-reaction-sneaker.jpg", "/img/brands/versace/versace-chain-reaction-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế đúc hình mắt xích dây chuyền Versace, họa tiết da báo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_chain_reaction_sneaker.Variants.Add(new ProductVariant { Sku = "VER-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 15 });
            prod_versace_versace_chain_reaction_sneaker.Variants.Add(new ProductVariant { Sku = "VER-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 20 });
            prod_versace_versace_chain_reaction_sneaker.Variants.Add(new ProductVariant { Sku = "VER-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 15 });
            allProducts.Add(prod_versace_versace_chain_reaction_sneaker);
            var prod_versace_versace_medusa_biggie_sunglasses = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Medusa Biggie Geometric Sunglasses",
                Slug = "versace-versace-medusa-biggie-sunglasses",
                Sku = "VER-SUNG-3",
                CollectionName = "Versace Eyewear",
                Description = "Kính Mát Medusa Biggie Geometric Sunglasses chính hãng từ Versace. Chế tác từ Gọng acetate lấy cảm hứng từ rapper Biggie Smalls thập niên 90 với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 9500000m,
                OriginalPrice = 11000000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/versace/versace-medusa-biggie-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-medusa-biggie-sunglasses.jpg", "/img/brands/versace/versace-medusa-biggie-sunglasses.jpg", "/img/brands/versace/versace-medusa-biggie-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng acetate lấy cảm hứng từ rapper Biggie Smalls thập niên 90",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_medusa_biggie_sunglasses.Variants.Add(new ProductVariant { Sku = "VER-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 9500000m, StockQuantity = 50 });
            allProducts.Add(prod_versace_versace_medusa_biggie_sunglasses);
            var prod_versace_versace_palazzo_leather_belt = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da Palazzo Medusa Buckle Belt",
                Slug = "versace-versace-palazzo-leather-belt",
                Sku = "VER-BELT-3",
                CollectionName = "Versace Belts",
                Description = "Thắt Lưng Da Palazzo Medusa Buckle Belt chính hãng từ Versace. Chế tác từ Da bò nappa dập vân nhẹ, mặt khóa đầu rắn Medusa 3D nổi bật với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 14000000m,
                OriginalPrice = 16000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/versace/versace-palazzo-leather-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-palazzo-leather-belt.jpg", "/img/brands/versace/versace-palazzo-leather-belt.jpg", "/img/brands/versace/versace-palazzo-leather-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò nappa dập vân nhẹ, mặt khóa đầu rắn Medusa 3D nổi bật",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_palazzo_leather_belt.Variants.Add(new ProductVariant { Sku = "VER-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 14000000m, StockQuantity = 50 });
            allProducts.Add(prod_versace_versace_palazzo_leather_belt);
            var prod_versace_versace_baroque_bathrobe = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Choàng Tắm Cotton Barocco Bathrobe",
                Slug = "versace-versace-baroque-bathrobe",
                Sku = "VER-BATH-2",
                CollectionName = "Versace Maison",
                Description = "Áo Choàng Tắm Cotton Barocco Bathrobe chính hãng từ Versace. Chế tác từ 100% Cotton Jacquard dệt họa tiết Greca và hoa văn Baroque với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 16500000m,
                OriginalPrice = 18500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/versace/versace-baroque-bathrobe.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-baroque-bathrobe.jpg", "/img/brands/versace/versace-baroque-bathrobe.jpg", "/img/brands/versace/versace-baroque-bathrobe.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Cotton Jacquard dệt họa tiết Greca và hoa văn Baroque",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_baroque_bathrobe.Variants.Add(new ProductVariant { Sku = "VER-BATH-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 15 });
            prod_versace_versace_baroque_bathrobe.Variants.Add(new ProductVariant { Sku = "VER-BATH-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 20 });
            prod_versace_versace_baroque_bathrobe.Variants.Add(new ProductVariant { Sku = "VER-BATH-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 15 });
            allProducts.Add(prod_versace_versace_baroque_bathrobe);
            var prod_versace_versace_dylan_blue_parfum = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Dylan Blue Pour Homme Eau de Toilette 100ml",
                Slug = "versace-versace-dylan-blue-parfum",
                Sku = "VER-PARF-3",
                CollectionName = "Versace Fragrance",
                Description = "Nước Hoa Dylan Blue Pour Homme Eau de Toilette 100ml chính hãng từ Versace. Chế tác từ Hương cam chanh Địa Trung Hải, lá sung và hổ phách xạ hương với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2950000m,
                OriginalPrice = 3400000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/versace/versace-dylan-blue-parfum.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-dylan-blue-parfum.jpg", "/img/brands/versace/versace-dylan-blue-parfum.jpg", "/img/brands/versace/versace-dylan-blue-parfum.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương cam chanh Địa Trung Hải, lá sung và hổ phách xạ hương",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_dylan_blue_parfum.Variants.Add(new ProductVariant { Sku = "VER-PARF-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 50 });
            allProducts.Add(prod_versace_versace_dylan_blue_parfum);
            var prod_versace_versace_greca_track_pants = new Product
            {
                SellerId = seller_versace.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Thể Thao Greca Border Cotton Track Pants",
                Slug = "versace-versace-greca-track-pants",
                Sku = "VER-PANT-2",
                CollectionName = "Versace Activewear",
                Description = "Quần Thể Thao Greca Border Cotton Track Pants chính hãng từ Versace. Chế tác từ Chất nỉ cotton co giãn nhẹ, đai lưng dệt hoa văn Greca Hy Lạp với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 18500000m,
                OriginalPrice = 21000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/versace/versace-greca-track-pants.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/versace/versace-greca-track-pants.jpg", "/img/brands/versace/versace-greca-track-pants.jpg", "/img/brands/versace/versace-greca-track-pants.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất nỉ cotton co giãn nhẹ, đai lưng dệt hoa văn Greca Hy Lạp",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Versace, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_versace_versace_greca_track_pants.Variants.Add(new ProductVariant { Sku = "VER-PANT-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 18500000m, StockQuantity = 15 });
            prod_versace_versace_greca_track_pants.Variants.Add(new ProductVariant { Sku = "VER-PANT-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 18500000m, StockQuantity = 20 });
            prod_versace_versace_greca_track_pants.Variants.Add(new ProductVariant { Sku = "VER-PANT-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 18500000m, StockQuantity = 15 });
            allProducts.Add(prod_versace_versace_greca_track_pants);

            var seller_burberry = dbUsers.First(u => u.Email == "burberry@gmail.com");
            var prod_burberry_burberry_kensington_trench_coat = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Măng Tô The Kensington Heritage Trench Coat",
                Slug = "burberry-burberry-kensington-trench-coat",
                Sku = "BUR-COAT-2",
                CollectionName = "Burberry Heritage Trench",
                Description = "Áo Măng Tô The Kensington Heritage Trench Coat chính hãng từ Burberry. Chế tác từ Vải dệt Gabardine chống thấm nước độc quyền Thomas Burberry với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 68000000m,
                OriginalPrice = 76000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/burberry/burberry-kensington-trench-coat.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-kensington-trench-coat.jpg", "/img/brands/burberry/burberry-kensington-trench-coat.jpg", "/img/brands/burberry/burberry-kensington-trench-coat.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt Gabardine chống thấm nước độc quyền Thomas Burberry",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_kensington_trench_coat.Variants.Add(new ProductVariant { Sku = "BUR-COAT-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 68000000m, StockQuantity = 15 });
            prod_burberry_burberry_kensington_trench_coat.Variants.Add(new ProductVariant { Sku = "BUR-COAT-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 68000000m, StockQuantity = 20 });
            prod_burberry_burberry_kensington_trench_coat.Variants.Add(new ProductVariant { Sku = "BUR-COAT-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 68000000m, StockQuantity = 15 });
            allProducts.Add(prod_burberry_burberry_kensington_trench_coat);
            var prod_burberry_burberry_vintage_check_scarf = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catAccessories.Id,
                Name = "Khăn Choàng Cổ Vintage Check Cashmere Scarf",
                Slug = "burberry-burberry-vintage-check-scarf",
                Sku = "BUR-SCAR-3",
                CollectionName = "Burberry Cashmere",
                Description = "Khăn Choàng Cổ Vintage Check Cashmere Scarf chính hãng từ Burberry. Chế tác từ 100% Lông dê Cashmere chải bằng quả kế dại Scotland với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 15500000m,
                OriginalPrice = 17500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/burberry/burberry-vintage-check-scarf.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-vintage-check-scarf.jpg", "/img/brands/burberry/burberry-vintage-check-scarf.jpg", "/img/brands/burberry/burberry-vintage-check-scarf.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Lông dê Cashmere chải bằng quả kế dại Scotland",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_vintage_check_scarf.Variants.Add(new ProductVariant { Sku = "BUR-SCAR-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 15500000m, StockQuantity = 50 });
            allProducts.Add(prod_burberry_burberry_vintage_check_scarf);
            var prod_burberry_burberry_lola_quilted_bag = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Lola Quilted Leather Shoulder Bag",
                Slug = "burberry-burberry-lola-quilted-bag",
                Sku = "BUR-BAG-3",
                CollectionName = "Burberry Lola",
                Description = "Túi Xách Lola Quilted Leather Shoulder Bag chính hãng từ Burberry. Chế tác từ Da cừu Ý chần bông quả trám, khóa logo TB mạ vàng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 49000000m,
                OriginalPrice = 55000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/burberry/burberry-lola-quilted-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-lola-quilted-bag.jpg", "/img/brands/burberry/burberry-lola-quilted-bag.jpg", "/img/brands/burberry/burberry-lola-quilted-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu Ý chần bông quả trám, khóa logo TB mạ vàng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_lola_quilted_bag.Variants.Add(new ProductVariant { Sku = "BUR-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 49000000m, StockQuantity = 50 });
            allProducts.Add(prod_burberry_burberry_lola_quilted_bag);
            var prod_burberry_burberry_arthur_check_sneaker = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Arthur Vintage Check Low-Top",
                Slug = "burberry-burberry-arthur-check-sneaker",
                Sku = "BUR-SNEA-1",
                CollectionName = "Burberry Footwear",
                Description = "Giày Sneaker Arthur Vintage Check Low-Top chính hãng từ Burberry. Chế tác từ Đế bọc cao su chống mưa lội nước, thân giày vải check với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 23500000m,
                OriginalPrice = 26000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/burberry/burberry-arthur-check-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-arthur-check-sneaker.jpg", "/img/brands/burberry/burberry-arthur-check-sneaker.jpg", "/img/brands/burberry/burberry-arthur-check-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế bọc cao su chống mưa lội nước, thân giày vải check",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_arthur_check_sneaker.Variants.Add(new ProductVariant { Sku = "BUR-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 23500000m, StockQuantity = 15 });
            prod_burberry_burberry_arthur_check_sneaker.Variants.Add(new ProductVariant { Sku = "BUR-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 23500000m, StockQuantity = 20 });
            prod_burberry_burberry_arthur_check_sneaker.Variants.Add(new ProductVariant { Sku = "BUR-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 23500000m, StockQuantity = 15 });
            allProducts.Add(prod_burberry_burberry_arthur_check_sneaker);
            var prod_burberry_burberry_reversible_wool_cape = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Choàng Wool Reversible Check Poncho Cape",
                Slug = "burberry-burberry-reversible-wool-cape",
                Sku = "BUR-CAPE-2",
                CollectionName = "Burberry Ready-to-Wear",
                Description = "Áo Choàng Wool Reversible Check Poncho Cape chính hãng từ Burberry. Chế tác từ Len lông cừu nguyên chất dệt hai mặt, viền tua rua cổ điển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 36000000m,
                OriginalPrice = 41000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/burberry/burberry-reversible-wool-cape.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-reversible-wool-cape.jpg", "/img/brands/burberry/burberry-reversible-wool-cape.jpg", "/img/brands/burberry/burberry-reversible-wool-cape.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Len lông cừu nguyên chất dệt hai mặt, viền tua rua cổ điển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_reversible_wool_cape.Variants.Add(new ProductVariant { Sku = "BUR-CAPE-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 36000000m, StockQuantity = 15 });
            prod_burberry_burberry_reversible_wool_cape.Variants.Add(new ProductVariant { Sku = "BUR-CAPE-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 36000000m, StockQuantity = 20 });
            prod_burberry_burberry_reversible_wool_cape.Variants.Add(new ProductVariant { Sku = "BUR-CAPE-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 36000000m, StockQuantity = 15 });
            allProducts.Add(prod_burberry_burberry_reversible_wool_cape);
            var prod_burberry_burberry_tb_monogram_belt = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da TB Monogram Plaque Leather Belt",
                Slug = "burberry-burberry-tb-monogram-belt",
                Sku = "BUR-BELT-3",
                CollectionName = "Burberry Accessories",
                Description = "Thắt Lưng Da TB Monogram Plaque Leather Belt chính hãng từ Burberry. Chế tác từ Da bê trơn mịn, mặt khóa chữ TB mạ bóng phong cách hiện đại với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 12500000m,
                OriginalPrice = 14000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/burberry/burberry-tb-monogram-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-tb-monogram-belt.jpg", "/img/brands/burberry/burberry-tb-monogram-belt.jpg", "/img/brands/burberry/burberry-tb-monogram-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê trơn mịn, mặt khóa chữ TB mạ bóng phong cách hiện đại",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_tb_monogram_belt.Variants.Add(new ProductVariant { Sku = "BUR-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 12500000m, StockQuantity = 50 });
            allProducts.Add(prod_burberry_burberry_tb_monogram_belt);
            var prod_burberry_burberry_check_cotton_shirt = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Sơ Mi Kẻ Vintage Check Cotton Twill Shirt",
                Slug = "burberry-burberry-check-cotton-shirt",
                Sku = "BUR-SHIR-2",
                CollectionName = "Burberry Shirts",
                Description = "Áo Sơ Mi Kẻ Vintage Check Cotton Twill Shirt chính hãng từ Burberry. Chế tác từ Vải dệt cotton twill thoáng mát in họa tiết kẻ ô Burberry kinh điển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 17500000m,
                OriginalPrice = 19500000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/burberry/burberry-check-cotton-shirt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-check-cotton-shirt.jpg", "/img/brands/burberry/burberry-check-cotton-shirt.jpg", "/img/brands/burberry/burberry-check-cotton-shirt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt cotton twill thoáng mát in họa tiết kẻ ô Burberry kinh điển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_check_cotton_shirt.Variants.Add(new ProductVariant { Sku = "BUR-SHIR-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 17500000m, StockQuantity = 15 });
            prod_burberry_burberry_check_cotton_shirt.Variants.Add(new ProductVariant { Sku = "BUR-SHIR-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 17500000m, StockQuantity = 20 });
            prod_burberry_burberry_check_cotton_shirt.Variants.Add(new ProductVariant { Sku = "BUR-SHIR-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 17500000m, StockQuantity = 15 });
            allProducts.Add(prod_burberry_burberry_check_cotton_shirt);
            var prod_burberry_burberry_hero_eau_de_parfum = new Product
            {
                SellerId = seller_burberry.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Burberry Hero Eau de Parfum 100ml",
                Slug = "burberry-burberry-hero-eau-de-parfum",
                Sku = "BUR-PARF-3",
                CollectionName = "Burberry Fragrance",
                Description = "Nước Hoa Burberry Hero Eau de Parfum 100ml chính hãng từ Burberry. Chế tác từ Hương gỗ tuyết tùng ba vùng núi lửa, tiêu đen và trầm hương với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3650000m,
                OriginalPrice = 4100000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/burberry/burberry-hero-eau-de-parfum.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/burberry/burberry-hero-eau-de-parfum.jpg", "/img/brands/burberry/burberry-hero-eau-de-parfum.jpg", "/img/brands/burberry/burberry-hero-eau-de-parfum.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương gỗ tuyết tùng ba vùng núi lửa, tiêu đen và trầm hương",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Burberry, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Anh Quốc",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_burberry_burberry_hero_eau_de_parfum.Variants.Add(new ProductVariant { Sku = "BUR-PARF-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 3650000m, StockQuantity = 50 });
            allProducts.Add(prod_burberry_burberry_hero_eau_de_parfum);

            var seller_saintlaurent = dbUsers.First(u => u.Email == "saintlaurent@gmail.com");
            var prod_saintlaurent_saintlaurent_loulou_medium_bag = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách LouLou Medium Quilted Leather Bag",
                Slug = "saintlaurent-saintlaurent-loulou-medium-bag",
                Sku = "SAI-BAG-3",
                CollectionName = "YSL LouLou Icons",
                Description = "Túi Xách LouLou Medium Quilted Leather Bag chính hãng từ Saint Laurent. Chế tác từ Da bê thuộc mềm mịn may chần chữ Y, logo YSL kim loại bạc với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 78000000m,
                OriginalPrice = 86000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", "/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê thuộc mềm mịn may chần chữ Y, logo YSL kim loại bạc",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_loulou_medium_bag.Variants.Add(new ProductVariant { Sku = "SAI-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 78000000m, StockQuantity = 50 });
            allProducts.Add(prod_saintlaurent_saintlaurent_loulou_medium_bag);
            var prod_saintlaurent_saintlaurent_kate_chain_wallet = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Xích Cầm Tay Kate Chain Wallet Tassel",
                Slug = "saintlaurent-saintlaurent-kate-chain-wallet",
                Sku = "SAI-WALL-3",
                CollectionName = "YSL Kate",
                Description = "Ví Xích Cầm Tay Kate Chain Wallet Tassel chính hãng từ Saint Laurent. Chế tác từ Da hạt sần Grain de Poudre bền bỉ, tua rua kim loại lắc kê vàng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 48000000m,
                OriginalPrice = 53000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-kate-chain-wallet.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-kate-chain-wallet.jpg", "/img/brands/saintlaurent/saintlaurent-kate-chain-wallet.jpg", "/img/brands/saintlaurent/saintlaurent-kate-chain-wallet.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da hạt sần Grain de Poudre bền bỉ, tua rua kim loại lắc kê vàng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_kate_chain_wallet.Variants.Add(new ProductVariant { Sku = "SAI-WALL-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 48000000m, StockQuantity = 50 });
            allProducts.Add(prod_saintlaurent_saintlaurent_kate_chain_wallet);
            var prod_saintlaurent_saintlaurent_classic_biker_jacket = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Da Classic Biker Motorcycle Jacket",
                Slug = "saintlaurent-saintlaurent-classic-biker-jacket",
                Sku = "SAI-JACK-2",
                CollectionName = "Saint Laurent Permanent",
                Description = "Áo Khoác Da Classic Biker Motorcycle Jacket chính hãng từ Saint Laurent. Chế tác từ Da cừu non Ý bóng nhẹ, phéc-mơ-tuy bất đối xứng phong cách rock với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 125000000m,
                OriginalPrice = 140000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-classic-biker-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-classic-biker-jacket.jpg", "/img/brands/saintlaurent/saintlaurent-classic-biker-jacket.jpg", "/img/brands/saintlaurent/saintlaurent-classic-biker-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu non Ý bóng nhẹ, phéc-mơ-tuy bất đối xứng phong cách rock",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_classic_biker_jacket.Variants.Add(new ProductVariant { Sku = "SAI-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 125000000m, StockQuantity = 15 });
            prod_saintlaurent_saintlaurent_classic_biker_jacket.Variants.Add(new ProductVariant { Sku = "SAI-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 125000000m, StockQuantity = 20 });
            prod_saintlaurent_saintlaurent_classic_biker_jacket.Variants.Add(new ProductVariant { Sku = "SAI-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 125000000m, StockQuantity = 15 });
            allProducts.Add(prod_saintlaurent_saintlaurent_classic_biker_jacket);
            var prod_saintlaurent_saintlaurent_tribute_heeled_sandals = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Cao Gót Tribute 105 Stiletto Platform Sandals",
                Slug = "saintlaurent-saintlaurent-tribute-heeled-sandals",
                Sku = "SAI-SAND-1",
                CollectionName = "YSL Tribute Footwear",
                Description = "Giày Cao Gót Tribute 105 Stiletto Platform Sandals chính hãng từ Saint Laurent. Chế tác từ Dây da đan chéo vắt chân duyên dáng, đế đúp tôn dáng tối đa với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 27500000m,
                OriginalPrice = 31000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-tribute-heeled-sandals.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-tribute-heeled-sandals.jpg", "/img/brands/saintlaurent/saintlaurent-tribute-heeled-sandals.jpg", "/img/brands/saintlaurent/saintlaurent-tribute-heeled-sandals.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Dây da đan chéo vắt chân duyên dáng, đế đúp tôn dáng tối đa",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_tribute_heeled_sandals.Variants.Add(new ProductVariant { Sku = "SAI-SAND-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 27500000m, StockQuantity = 15 });
            prod_saintlaurent_saintlaurent_tribute_heeled_sandals.Variants.Add(new ProductVariant { Sku = "SAI-SAND-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 27500000m, StockQuantity = 20 });
            prod_saintlaurent_saintlaurent_tribute_heeled_sandals.Variants.Add(new ProductVariant { Sku = "SAI-SAND-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 27500000m, StockQuantity = 15 });
            allProducts.Add(prod_saintlaurent_saintlaurent_tribute_heeled_sandals);
            var prod_saintlaurent_saintlaurent_court_classic_sneaker = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Court Classic SL/06 Embroidered",
                Slug = "saintlaurent-saintlaurent-court-classic-sneaker",
                Sku = "SAI-SNEA-1",
                CollectionName = "YSL Court Classic",
                Description = "Giày Sneaker Court Classic SL/06 Embroidered chính hãng từ Saint Laurent. Chế tác từ Da bê trắng Ý thêu chỉ Saint Laurent phong cách vintage lãng tử với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 18500000m,
                OriginalPrice = 21000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-court-classic-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-court-classic-sneaker.jpg", "/img/brands/saintlaurent/saintlaurent-court-classic-sneaker.jpg", "/img/brands/saintlaurent/saintlaurent-court-classic-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê trắng Ý thêu chỉ Saint Laurent phong cách vintage lãng tử",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_court_classic_sneaker.Variants.Add(new ProductVariant { Sku = "SAI-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 18500000m, StockQuantity = 15 });
            prod_saintlaurent_saintlaurent_court_classic_sneaker.Variants.Add(new ProductVariant { Sku = "SAI-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 18500000m, StockQuantity = 20 });
            prod_saintlaurent_saintlaurent_court_classic_sneaker.Variants.Add(new ProductVariant { Sku = "SAI-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 18500000m, StockQuantity = 15 });
            allProducts.Add(prod_saintlaurent_saintlaurent_court_classic_sneaker);
            var prod_saintlaurent_saintlaurent_monogram_narrow_belt = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da Monogram Narrow Square Buckle",
                Slug = "saintlaurent-saintlaurent-monogram-narrow-belt",
                Sku = "SAI-BELT-3",
                CollectionName = "YSL Belts",
                Description = "Thắt Lưng Da Monogram Narrow Square Buckle chính hãng từ Saint Laurent. Chế tác từ Da bò dập vân tự nhiên, vòng khuyên luồn đính logo YSL nhỏ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 11500000m,
                OriginalPrice = 13000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-monogram-narrow-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-monogram-narrow-belt.jpg", "/img/brands/saintlaurent/saintlaurent-monogram-narrow-belt.jpg", "/img/brands/saintlaurent/saintlaurent-monogram-narrow-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò dập vân tự nhiên, vòng khuyên luồn đính logo YSL nhỏ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_monogram_narrow_belt.Variants.Add(new ProductVariant { Sku = "SAI-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 11500000m, StockQuantity = 50 });
            allProducts.Add(prod_saintlaurent_saintlaurent_monogram_narrow_belt);
            var prod_saintlaurent_saintlaurent_sl557_sunglasses = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Dày SL 557 Shade Oversized Sunglasses",
                Slug = "saintlaurent-saintlaurent-sl557-sunglasses",
                Sku = "SAI-SUNG-3",
                CollectionName = "YSL Eyewear",
                Description = "Kính Mát Dày SL 557 Shade Oversized Sunglasses chính hãng từ Saint Laurent. Chế tác từ Gọng đúc vuông đen bóng cá tính, bản lề chạm khắc Saint Laurent với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 10500000m,
                OriginalPrice = 12000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-sl557-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-sl557-sunglasses.jpg", "/img/brands/saintlaurent/saintlaurent-sl557-sunglasses.jpg", "/img/brands/saintlaurent/saintlaurent-sl557-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng đúc vuông đen bóng cá tính, bản lề chạm khắc Saint Laurent",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_sl557_sunglasses.Variants.Add(new ProductVariant { Sku = "SAI-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 10500000m, StockQuantity = 50 });
            allProducts.Add(prod_saintlaurent_saintlaurent_sl557_sunglasses);
            var prod_saintlaurent_saintlaurent_black_opium_parfum = new Product
            {
                SellerId = seller_saintlaurent.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Black Opium Eau de Parfum Extreme 90ml",
                Slug = "saintlaurent-saintlaurent-black-opium-parfum",
                Sku = "SAI-PARF-3",
                CollectionName = "YSL Beaute",
                Description = "Nước Hoa Black Opium Eau de Parfum Extreme 90ml chính hãng từ Saint Laurent. Chế tác từ Hương cà phê đen quyến rũ, vani Bourbon và hoa nhài trắng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3950000m,
                OriginalPrice = 4500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/saintlaurent/saintlaurent-black-opium-parfum.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/saintlaurent/saintlaurent-black-opium-parfum.jpg", "/img/brands/saintlaurent/saintlaurent-black-opium-parfum.jpg", "/img/brands/saintlaurent/saintlaurent-black-opium-parfum.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương cà phê đen quyến rũ, vani Bourbon và hoa nhài trắng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Saint Laurent, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Pháp",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_saintlaurent_saintlaurent_black_opium_parfum.Variants.Add(new ProductVariant { Sku = "SAI-PARF-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 3950000m, StockQuantity = 50 });
            allProducts.Add(prod_saintlaurent_saintlaurent_black_opium_parfum);

            var seller_fendi = dbUsers.First(u => u.Email == "fendi@gmail.com");
            var prod_fendi_fendi_baguette_medium_ff_bag = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Baguette Medium Leather FF Monogram",
                Slug = "fendi-fendi-baguette-medium-ff-bag",
                Sku = "FEN-BAG-3",
                CollectionName = "Fendi Baguette 1997",
                Description = "Túi Xách Baguette Medium Leather FF Monogram chính hãng từ Fendi. Chế tác từ Da cừu nappa mềm dập nổi họa tiết FF, khóa móc gập FF kinh điển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 85000000m,
                OriginalPrice = 93000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", "/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu nappa mềm dập nổi họa tiết FF, khóa móc gập FF kinh điển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_baguette_medium_ff_bag.Variants.Add(new ProductVariant { Sku = "FEN-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 85000000m, StockQuantity = 50 });
            allProducts.Add(prod_fendi_fendi_baguette_medium_ff_bag);
            var prod_fendi_fendi_peekaboo_iseeu_handbag = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Peekaboo ISeeU Medium Calfskin",
                Slug = "fendi-fendi-peekaboo-iseeu-handbag",
                Sku = "FEN-HAND-3",
                CollectionName = "Fendi Peekaboo",
                Description = "Túi Xách Peekaboo ISeeU Medium Calfskin chính hãng từ Fendi. Chế tác từ Da bê Cuoio Romano thủ công hai ngăn riêng biệt, khóa xoay với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 135000000m,
                OriginalPrice = 150000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/fendi/fendi-peekaboo-iseeu-handbag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-peekaboo-iseeu-handbag.jpg", "/img/brands/fendi/fendi-peekaboo-iseeu-handbag.jpg", "/img/brands/fendi/fendi-peekaboo-iseeu-handbag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê Cuoio Romano thủ công hai ngăn riêng biệt, khóa xoay",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_peekaboo_iseeu_handbag.Variants.Add(new ProductVariant { Sku = "FEN-HAND-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 135000000m, StockQuantity = 50 });
            allProducts.Add(prod_fendi_fendi_peekaboo_iseeu_handbag);
            var prod_fendi_fendi_colibri_slingback_pumps = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Slingback Colibrì Lite Mesh & Technical Ribbon",
                Slug = "fendi-fendi-colibri-slingback-pumps",
                Sku = "FEN-PUMP-1",
                CollectionName = "Fendi Colibrì",
                Description = "Giày Slingback Colibrì Lite Mesh & Technical Ribbon chính hãng từ Fendi. Chế tác từ Chất lưới dệt trong suốt in FF monogram, quai hậu đệm thể thao với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 26500000m,
                OriginalPrice = 29500000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/fendi/fendi-colibri-slingback-pumps.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-colibri-slingback-pumps.jpg", "/img/brands/fendi/fendi-colibri-slingback-pumps.jpg", "/img/brands/fendi/fendi-colibri-slingback-pumps.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất lưới dệt trong suốt in FF monogram, quai hậu đệm thể thao",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_colibri_slingback_pumps.Variants.Add(new ProductVariant { Sku = "FEN-PUMP-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 15 });
            prod_fendi_fendi_colibri_slingback_pumps.Variants.Add(new ProductVariant { Sku = "FEN-PUMP-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 20 });
            prod_fendi_fendi_colibri_slingback_pumps.Variants.Add(new ProductVariant { Sku = "FEN-PUMP-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 26500000m, StockQuantity = 15 });
            allProducts.Add(prod_fendi_fendi_colibri_slingback_pumps);
            var prod_fendi_fendi_ff_jacquard_wool_sweater = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Len Dệt Kim FF Jacquard Wool & Cashmere",
                Slug = "fendi-fendi-ff-jacquard-wool-sweater",
                Sku = "FEN-SWEA-2",
                CollectionName = "Fendi Ready-to-Wear",
                Description = "Áo Len Dệt Kim FF Jacquard Wool & Cashmere chính hãng từ Fendi. Chế tác từ Sợi len lông cừu pha cashmere cao cấp dệt hoa văn FF hai tông màu với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 34000000m,
                OriginalPrice = 38000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/fendi/fendi-ff-jacquard-wool-sweater.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-ff-jacquard-wool-sweater.jpg", "/img/brands/fendi/fendi-ff-jacquard-wool-sweater.jpg", "/img/brands/fendi/fendi-ff-jacquard-wool-sweater.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Sợi len lông cừu pha cashmere cao cấp dệt hoa văn FF hai tông màu",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_ff_jacquard_wool_sweater.Variants.Add(new ProductVariant { Sku = "FEN-SWEA-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 34000000m, StockQuantity = 15 });
            prod_fendi_fendi_ff_jacquard_wool_sweater.Variants.Add(new ProductVariant { Sku = "FEN-SWEA-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 34000000m, StockQuantity = 20 });
            prod_fendi_fendi_ff_jacquard_wool_sweater.Variants.Add(new ProductVariant { Sku = "FEN-SWEA-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 34000000m, StockQuantity = 15 });
            allProducts.Add(prod_fendi_fendi_ff_jacquard_wool_sweater);
            var prod_fendi_fendi_ff_buckle_leather_belt = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da FF Buckle Reversible Calf Leather",
                Slug = "fendi-fendi-ff-buckle-leather-belt",
                Sku = "FEN-BELT-3",
                CollectionName = "Fendi Accessories",
                Description = "Thắt Lưng Da FF Buckle Reversible Calf Leather chính hãng từ Fendi. Chế tác từ Da bê đen/nâu hai mặt, mặt khóa chữ FF mạ bóng sang trọng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 14500000m,
                OriginalPrice = 16500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/fendi/fendi-ff-buckle-leather-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-ff-buckle-leather-belt.jpg", "/img/brands/fendi/fendi-ff-buckle-leather-belt.jpg", "/img/brands/fendi/fendi-ff-buckle-leather-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê đen/nâu hai mặt, mặt khóa chữ FF mạ bóng sang trọng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_ff_buckle_leather_belt.Variants.Add(new ProductVariant { Sku = "FEN-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 14500000m, StockQuantity = 50 });
            allProducts.Add(prod_fendi_fendi_ff_buckle_leather_belt);
            var prod_fendi_fendi_match_suede_sneaker = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Fendi Match Suede & Leather Low-Top",
                Slug = "fendi-fendi-match-suede-sneaker",
                Sku = "FEN-SNEA-1",
                CollectionName = "Fendi Footwear",
                Description = "Giày Sneaker Fendi Match Suede & Leather Low-Top chính hãng từ Fendi. Chế tác từ Da lộn phối da trơn phong cách bóng rổ cổ điển, logo FF bọc da với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 24500000m,
                OriginalPrice = 27500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/fendi/fendi-match-suede-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-match-suede-sneaker.jpg", "/img/brands/fendi/fendi-match-suede-sneaker.jpg", "/img/brands/fendi/fendi-match-suede-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da lộn phối da trơn phong cách bóng rổ cổ điển, logo FF bọc da",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_match_suede_sneaker.Variants.Add(new ProductVariant { Sku = "FEN-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 15 });
            prod_fendi_fendi_match_suede_sneaker.Variants.Add(new ProductVariant { Sku = "FEN-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 20 });
            prod_fendi_fendi_match_suede_sneaker.Variants.Add(new ProductVariant { Sku = "FEN-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 24500000m, StockQuantity = 15 });
            allProducts.Add(prod_fendi_fendi_match_suede_sneaker);
            var prod_fendi_fendi_diamonds_square_sunglasses = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Chữ Nhật FF Diamonds Square Frame",
                Slug = "fendi-fendi-diamonds-square-sunglasses",
                Sku = "FEN-SUNG-3",
                CollectionName = "Fendi Eyewear",
                Description = "Kính Mát Chữ Nhật FF Diamonds Square Frame chính hãng từ Fendi. Chế tác từ Gọng kim loại thanh mảnh chạm họa tiết kim cương và logo FF với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 11500000m,
                OriginalPrice = 13000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/fendi/fendi-diamonds-square-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-diamonds-square-sunglasses.jpg", "/img/brands/fendi/fendi-diamonds-square-sunglasses.jpg", "/img/brands/fendi/fendi-diamonds-square-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng kim loại thanh mảnh chạm họa tiết kim cương và logo FF",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_diamonds_square_sunglasses.Variants.Add(new ProductVariant { Sku = "FEN-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 11500000m, StockQuantity = 50 });
            allProducts.Add(prod_fendi_fendi_diamonds_square_sunglasses);
            var prod_fendi_fendi_sunshine_shopper_tote = new Product
            {
                SellerId = seller_fendi.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Tote Sunshine Medium FF Jacquard Canvas",
                Slug = "fendi-fendi-sunshine-shopper-tote",
                Sku = "FEN-TOTE-3",
                CollectionName = "Fendi Sunshine",
                Description = "Túi Tote Sunshine Medium FF Jacquard Canvas chính hãng từ Fendi. Chế tác từ Vải Canvas dệt FF, tay cầm bằng kính Plexiglas đồi mồi sang trọng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 72000000m,
                OriginalPrice = 80000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/fendi/fendi-sunshine-shopper-tote.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/fendi/fendi-sunshine-shopper-tote.jpg", "/img/brands/fendi/fendi-sunshine-shopper-tote.jpg", "/img/brands/fendi/fendi-sunshine-shopper-tote.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải Canvas dệt FF, tay cầm bằng kính Plexiglas đồi mồi sang trọng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Fendi, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_fendi_fendi_sunshine_shopper_tote.Variants.Add(new ProductVariant { Sku = "FEN-TOTE-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 72000000m, StockQuantity = 50 });
            allProducts.Add(prod_fendi_fendi_sunshine_shopper_tote);

            var seller_bottegaveneta = dbUsers.First(u => u.Email == "bottegaveneta@gmail.com");
            var prod_bottegaveneta_bottegaveneta_the_pouch_clutch = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Cầm Tay The Pouch Soft Gathered Calfskin",
                Slug = "bottegaveneta-bottegaveneta-the-pouch-clutch",
                Sku = "BOT-CLUT-3",
                CollectionName = "Bottega The Pouch",
                Description = "Túi Cầm Tay The Pouch Soft Gathered Calfskin chính hãng từ Bottega Veneta. Chế tác từ Da bê non nếp gấp mềm mại như mây, khung nam châm ẩn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 78000000m,
                OriginalPrice = 86000000m,
                DiscountPercent = 9,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", "/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê non nếp gấp mềm mại như mây, khung nam châm ẩn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_the_pouch_clutch.Variants.Add(new ProductVariant { Sku = "BOT-CLUT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 78000000m, StockQuantity = 50 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_the_pouch_clutch);
            var prod_bottegaveneta_bottegaveneta_jodie_mini_hobo = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Jodie Mini Knotted Intrecciato Leather",
                Slug = "bottegaveneta-bottegaveneta-jodie-mini-hobo",
                Sku = "BOT-HOBO-3",
                CollectionName = "Bottega Jodie",
                Description = "Túi Xách Jodie Mini Knotted Intrecciato Leather chính hãng từ Bottega Veneta. Chế tác từ Da cừu nappa đan Intrecciato thủ công, tay cầm thắt nút đặc trưng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 62000000m,
                OriginalPrice = 69000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-jodie-mini-hobo.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-jodie-mini-hobo.jpg", "/img/brands/bottegaveneta/bottegaveneta-jodie-mini-hobo.jpg", "/img/brands/bottegaveneta/bottegaveneta-jodie-mini-hobo.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu nappa đan Intrecciato thủ công, tay cầm thắt nút đặc trưng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_jodie_mini_hobo.Variants.Add(new ProductVariant { Sku = "BOT-HOBO-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 62000000m, StockQuantity = 50 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_jodie_mini_hobo);
            var prod_bottegaveneta_bottegaveneta_cassette_padded_bag = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Đeo Chéo Cassette Padded Crossbody Bag",
                Slug = "bottegaveneta-bottegaveneta-cassette-padded-bag",
                Sku = "BOT-BAG-3",
                CollectionName = "Bottega Cassette",
                Description = "Túi Đeo Chéo Cassette Padded Crossbody Bag chính hãng từ Bottega Veneta. Chế tác từ Kỹ thuật đan da bản lớn dập phồng chần bông hai mặt với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 85000000m,
                OriginalPrice = 95000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-cassette-padded-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-cassette-padded-bag.jpg", "/img/brands/bottegaveneta/bottegaveneta-cassette-padded-bag.jpg", "/img/brands/bottegaveneta/bottegaveneta-cassette-padded-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Kỹ thuật đan da bản lớn dập phồng chần bông hai mặt",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_cassette_padded_bag.Variants.Add(new ProductVariant { Sku = "BOT-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 85000000m, StockQuantity = 50 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_cassette_padded_bag);
            var prod_bottegaveneta_bottegaveneta_tire_chelsea_boots = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Bốt Tire Lug-Sole Chelsea Ankle Boots",
                Slug = "bottegaveneta-bottegaveneta-tire-chelsea-boots",
                Sku = "BOT-BOOT-1",
                CollectionName = "Bottega Tire Footwear",
                Description = "Giày Bốt Tire Lug-Sole Chelsea Ankle Boots chính hãng từ Bottega Veneta. Chế tác từ Da bê sáp dày dặn, đế cao su uốn lượn phong cách viễn tưởng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 35000000m,
                OriginalPrice = 39000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-tire-chelsea-boots.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-tire-chelsea-boots.jpg", "/img/brands/bottegaveneta/bottegaveneta-tire-chelsea-boots.jpg", "/img/brands/bottegaveneta/bottegaveneta-tire-chelsea-boots.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê sáp dày dặn, đế cao su uốn lượn phong cách viễn tưởng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_tire_chelsea_boots.Variants.Add(new ProductVariant { Sku = "BOT-BOOT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 35000000m, StockQuantity = 15 });
            prod_bottegaveneta_bottegaveneta_tire_chelsea_boots.Variants.Add(new ProductVariant { Sku = "BOT-BOOT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 35000000m, StockQuantity = 20 });
            prod_bottegaveneta_bottegaveneta_tire_chelsea_boots.Variants.Add(new ProductVariant { Sku = "BOT-BOOT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 35000000m, StockQuantity = 15 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_tire_chelsea_boots);
            var prod_bottegaveneta_bottegaveneta_intrecciato_wallet = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Gập Dài Intrecciato Weave Leather Wallet",
                Slug = "bottegaveneta-bottegaveneta-intrecciato-wallet",
                Sku = "BOT-WALL-3",
                CollectionName = "Bottega Small Leather",
                Description = "Ví Gập Dài Intrecciato Weave Leather Wallet chính hãng từ Bottega Veneta. Chế tác từ Da cừu đan tay truyền thống vùng Veneto, 12 ngăn thẻ rộng rãi với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 22500000m,
                OriginalPrice = 25500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-intrecciato-wallet.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-intrecciato-wallet.jpg", "/img/brands/bottegaveneta/bottegaveneta-intrecciato-wallet.jpg", "/img/brands/bottegaveneta/bottegaveneta-intrecciato-wallet.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da cừu đan tay truyền thống vùng Veneto, 12 ngăn thẻ rộng rãi",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_intrecciato_wallet.Variants.Add(new ProductVariant { Sku = "BOT-WALL-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 22500000m, StockQuantity = 50 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_intrecciato_wallet);
            var prod_bottegaveneta_bottegaveneta_stretch_heeled_sandals = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catSneaker.Id,
                Name = "Dép Cao Gót Stretch Square-Toe Heeled Sandals",
                Slug = "bottegaveneta-bottegaveneta-stretch-heeled-sandals",
                Sku = "BOT-SAND-1",
                CollectionName = "Bottega Stretch",
                Description = "Dép Cao Gót Stretch Square-Toe Heeled Sandals chính hãng từ Bottega Veneta. Chế tác từ Mũi vuông cá tính quai mảnh, đế cao su đệm chống trượt với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 26000000m,
                OriginalPrice = 29000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-stretch-heeled-sandals.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-stretch-heeled-sandals.jpg", "/img/brands/bottegaveneta/bottegaveneta-stretch-heeled-sandals.jpg", "/img/brands/bottegaveneta/bottegaveneta-stretch-heeled-sandals.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Mũi vuông cá tính quai mảnh, đế cao su đệm chống trượt",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_stretch_heeled_sandals.Variants.Add(new ProductVariant { Sku = "BOT-SAND-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 26000000m, StockQuantity = 15 });
            prod_bottegaveneta_bottegaveneta_stretch_heeled_sandals.Variants.Add(new ProductVariant { Sku = "BOT-SAND-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 26000000m, StockQuantity = 20 });
            prod_bottegaveneta_bottegaveneta_stretch_heeled_sandals.Variants.Add(new ProductVariant { Sku = "BOT-SAND-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 26000000m, StockQuantity = 15 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_stretch_heeled_sandals);
            var prod_bottegaveneta_bottegaveneta_flash_sole_boots = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Bốt Flash Chunky Sole Leather Boots",
                Slug = "bottegaveneta-bottegaveneta-flash-sole-boots",
                Sku = "BOT-BOOT-2",
                CollectionName = "Bottega Flash",
                Description = "Giày Bốt Flash Chunky Sole Leather Boots chính hãng từ Bottega Veneta. Chế tác từ Đế đúc màu dạ quang tương phản nổi bật, da trơn kháng nước với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 38000000m,
                OriginalPrice = 42000000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-flash-sole-boots.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-flash-sole-boots.jpg", "/img/brands/bottegaveneta/bottegaveneta-flash-sole-boots.jpg", "/img/brands/bottegaveneta/bottegaveneta-flash-sole-boots.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế đúc màu dạ quang tương phản nổi bật, da trơn kháng nước",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_flash_sole_boots.Variants.Add(new ProductVariant { Sku = "BOT-BOOT-2-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 15 });
            prod_bottegaveneta_bottegaveneta_flash_sole_boots.Variants.Add(new ProductVariant { Sku = "BOT-BOOT-2-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 20 });
            prod_bottegaveneta_bottegaveneta_flash_sole_boots.Variants.Add(new ProductVariant { Sku = "BOT-BOOT-2-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 15 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_flash_sole_boots);
            var prod_bottegaveneta_bottegaveneta_cat_eye_sunglasses = new Product
            {
                SellerId = seller_bottegaveneta.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Mắt Mèo Cat-Eye Acetate Sunglasses",
                Slug = "bottegaveneta-bottegaveneta-cat-eye-sunglasses",
                Sku = "BOT-SUNG-3",
                CollectionName = "Bottega Eyewear",
                Description = "Kính Mát Mắt Mèo Cat-Eye Acetate Sunglasses chính hãng từ Bottega Veneta. Chế tác từ Gọng kính vuốt nhọn đính chi tiết ruy băng kim loại vàng ở bản lề với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 11500000m,
                OriginalPrice = 13000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/bottegaveneta/bottegaveneta-cat-eye-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/bottegaveneta/bottegaveneta-cat-eye-sunglasses.jpg", "/img/brands/bottegaveneta/bottegaveneta-cat-eye-sunglasses.jpg", "/img/brands/bottegaveneta/bottegaveneta-cat-eye-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng kính vuốt nhọn đính chi tiết ruy băng kim loại vàng ở bản lề",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Bottega Veneta, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_bottegaveneta_bottegaveneta_cat_eye_sunglasses.Variants.Add(new ProductVariant { Sku = "BOT-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 11500000m, StockQuantity = 50 });
            allProducts.Add(prod_bottegaveneta_bottegaveneta_cat_eye_sunglasses);

            var seller_offwhite = dbUsers.First(u => u.Email == "offwhite@gmail.com");
            var prod_offwhite_offwhite_jitney_28_top_handle = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Jitney 2.8 Top Handle Leather Bag",
                Slug = "offwhite-offwhite-jitney-28-top-handle",
                Sku = "OFF-HAND-3",
                CollectionName = "Off-White Jitney",
                Description = "Túi Xách Jitney 2.8 Top Handle Leather Bag chính hãng từ Off-White. Chế tác từ Da bê trơn in chữ typography, khóa kim loại mũi tên xoay với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 38000000m,
                OriginalPrice = 43000000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", "/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê trơn in chữ typography, khóa kim loại mũi tên xoay",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_jitney_28_top_handle.Variants.Add(new ProductVariant { Sku = "OFF-HAND-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 38000000m, StockQuantity = 50 });
            allProducts.Add(prod_offwhite_offwhite_jitney_28_top_handle);
            var prod_offwhite_offwhite_out_of_office_sneaker = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Out Of Office (OOO) Low-Top",
                Slug = "offwhite-offwhite-out-of-office-sneaker",
                Sku = "OFF-SNEA-1",
                CollectionName = "Off-White OOO Footwear",
                Description = "Giày Sneaker Out Of Office (OOO) Low-Top chính hãng từ Off-White. Chế tác từ Da bê Ý phối mảng màu tương phản, tag zip-tie da cá tính với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 16500000m,
                OriginalPrice = 18500000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/offwhite/offwhite-out-of-office-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-out-of-office-sneaker.jpg", "/img/brands/offwhite/offwhite-out-of-office-sneaker.jpg", "/img/brands/offwhite/offwhite-out-of-office-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê Ý phối mảng màu tương phản, tag zip-tie da cá tính",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_out_of_office_sneaker.Variants.Add(new ProductVariant { Sku = "OFF-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 15 });
            prod_offwhite_offwhite_out_of_office_sneaker.Variants.Add(new ProductVariant { Sku = "OFF-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 20 });
            prod_offwhite_offwhite_out_of_office_sneaker.Variants.Add(new ProductVariant { Sku = "OFF-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 16500000m, StockQuantity = 15 });
            allProducts.Add(prod_offwhite_offwhite_out_of_office_sneaker);
            var prod_offwhite_offwhite_industrial_yellow_belt = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Dây Bản Industrial Yellow Logo Belt",
                Slug = "offwhite-offwhite-industrial-yellow-belt",
                Sku = "OFF-BELT-3",
                CollectionName = "Off-White Industrial",
                Description = "Thắt Lưng Dây Bản Industrial Yellow Logo Belt chính hãng từ Off-White. Chế tác từ Dây dệt công nghiệp 200cm màu vàng neon thêu chữ Off-White với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 8500000m,
                OriginalPrice = 9800000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/offwhite/offwhite-industrial-yellow-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-industrial-yellow-belt.jpg", "/img/brands/offwhite/offwhite-industrial-yellow-belt.jpg", "/img/brands/offwhite/offwhite-industrial-yellow-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Dây dệt công nghiệp 200cm màu vàng neon thêu chữ Off-White",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_industrial_yellow_belt.Variants.Add(new ProductVariant { Sku = "OFF-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 8500000m, StockQuantity = 50 });
            allProducts.Add(prod_offwhite_offwhite_industrial_yellow_belt);
            var prod_offwhite_offwhite_caravaggio_arrows_hoodie = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Nỉ Có Mũ Caravaggio Arrows Graphic Hoodie",
                Slug = "offwhite-offwhite-caravaggio-arrows-hoodie",
                Sku = "OFF-HOOD-2",
                CollectionName = "Off-White Caravaggio",
                Description = "Áo Nỉ Có Mũ Caravaggio Arrows Graphic Hoodie chính hãng từ Off-White. Chế tác từ Nỉ bông cotton dày 450gsm, in tranh danh họa Caravaggio và mũi tên với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 17500000m,
                OriginalPrice = 19500000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/offwhite/offwhite-caravaggio-arrows-hoodie.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-caravaggio-arrows-hoodie.jpg", "/img/brands/offwhite/offwhite-caravaggio-arrows-hoodie.jpg", "/img/brands/offwhite/offwhite-caravaggio-arrows-hoodie.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Nỉ bông cotton dày 450gsm, in tranh danh họa Caravaggio và mũi tên",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_caravaggio_arrows_hoodie.Variants.Add(new ProductVariant { Sku = "OFF-HOOD-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 17500000m, StockQuantity = 15 });
            prod_offwhite_offwhite_caravaggio_arrows_hoodie.Variants.Add(new ProductVariant { Sku = "OFF-HOOD-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 17500000m, StockQuantity = 20 });
            prod_offwhite_offwhite_caravaggio_arrows_hoodie.Variants.Add(new ProductVariant { Sku = "OFF-HOOD-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 17500000m, StockQuantity = 15 });
            allProducts.Add(prod_offwhite_offwhite_caravaggio_arrows_hoodie);
            var prod_offwhite_offwhite_vulcanized_canvas_sneaker = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Low Vulcanized Canvas Sneaker",
                Slug = "offwhite-offwhite-vulcanized-canvas-sneaker",
                Sku = "OFF-SNEA-2",
                CollectionName = "Off-White Vulcanized",
                Description = "Giày Sneaker Low Vulcanized Canvas Sneaker chính hãng từ Off-White. Chế tác từ Vải canvas bền chắc, họa tiết kẻ sọc Diag sọc chéo thân giày với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 9500000m,
                OriginalPrice = 11000000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/offwhite/offwhite-vulcanized-canvas-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-vulcanized-canvas-sneaker.jpg", "/img/brands/offwhite/offwhite-vulcanized-canvas-sneaker.jpg", "/img/brands/offwhite/offwhite-vulcanized-canvas-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải canvas bền chắc, họa tiết kẻ sọc Diag sọc chéo thân giày",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_vulcanized_canvas_sneaker.Variants.Add(new ProductVariant { Sku = "OFF-SNEA-2-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 9500000m, StockQuantity = 15 });
            prod_offwhite_offwhite_vulcanized_canvas_sneaker.Variants.Add(new ProductVariant { Sku = "OFF-SNEA-2-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 9500000m, StockQuantity = 20 });
            prod_offwhite_offwhite_vulcanized_canvas_sneaker.Variants.Add(new ProductVariant { Sku = "OFF-SNEA-2-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 9500000m, StockQuantity = 15 });
            allProducts.Add(prod_offwhite_offwhite_vulcanized_canvas_sneaker);
            var prod_offwhite_offwhite_diag_flap_crossbody = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Đeo Chéo Diag Flap Crossbody Leather Bag",
                Slug = "offwhite-offwhite-diag-flap-crossbody",
                Sku = "OFF-CROS-3",
                CollectionName = "Off-White Diag Icons",
                Description = "Túi Đeo Chéo Diag Flap Crossbody Leather Bag chính hãng từ Off-White. Chế tác từ Da bê dập họa tiết sọc chéo phản quang, quai đeo vải công nghiệp với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 28500000m,
                OriginalPrice = 32000000m,
                DiscountPercent = 11,
                ImageUrl = "/img/brands/offwhite/offwhite-diag-flap-crossbody.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-diag-flap-crossbody.jpg", "/img/brands/offwhite/offwhite-diag-flap-crossbody.jpg", "/img/brands/offwhite/offwhite-diag-flap-crossbody.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê dập họa tiết sọc chéo phản quang, quai đeo vải công nghiệp",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_diag_flap_crossbody.Variants.Add(new ProductVariant { Sku = "OFF-CROS-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 28500000m, StockQuantity = 50 });
            allProducts.Add(prod_offwhite_offwhite_diag_flap_crossbody);
            var prod_offwhite_offwhite_typography_leather_wallet = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Da Gập Quote Typography Bifold Leather Wallet",
                Slug = "offwhite-offwhite-typography-leather-wallet",
                Sku = "OFF-WALL-3",
                CollectionName = "Off-White Accessories",
                Description = "Ví Da Gập Quote Typography Bifold Leather Wallet chính hãng từ Off-White. Chế tác từ Da bê đen in chữ 'WALLET' trong dấu ngoặc kép phong cách Virgil với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 8900000m,
                OriginalPrice = 10500000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/offwhite/offwhite-typography-leather-wallet.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-typography-leather-wallet.jpg", "/img/brands/offwhite/offwhite-typography-leather-wallet.jpg", "/img/brands/offwhite/offwhite-typography-leather-wallet.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bê đen in chữ 'WALLET' trong dấu ngoặc kép phong cách Virgil",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_typography_leather_wallet.Variants.Add(new ProductVariant { Sku = "OFF-WALL-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 8900000m, StockQuantity = 50 });
            allProducts.Add(prod_offwhite_offwhite_typography_leather_wallet);
            var prod_offwhite_offwhite_arthur_acetate_sunglasses = new Product
            {
                SellerId = seller_offwhite.Id,
                CategoryId = catAccessories.Id,
                Name = "Kính Mát Khung Vuông Arthur Acetate Sunglasses",
                Slug = "offwhite-offwhite-arthur-acetate-sunglasses",
                Sku = "OFF-SUNG-3",
                CollectionName = "Off-White Eyewear",
                Description = "Kính Mát Khung Vuông Arthur Acetate Sunglasses chính hãng từ Off-White. Chế tác từ Gọng acetate dày đính họa tiết logo kim loại cắt laser chìm với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 9800000m,
                OriginalPrice = 11200000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/offwhite/offwhite-arthur-acetate-sunglasses.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/offwhite/offwhite-arthur-acetate-sunglasses.jpg", "/img/brands/offwhite/offwhite-arthur-acetate-sunglasses.jpg", "/img/brands/offwhite/offwhite-arthur-acetate-sunglasses.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Gọng acetate dày đính họa tiết logo kim loại cắt laser chìm",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Off-White, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Ý / Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_offwhite_offwhite_arthur_acetate_sunglasses.Variants.Add(new ProductVariant { Sku = "OFF-SUNG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 9800000m, StockQuantity = 50 });
            allProducts.Add(prod_offwhite_offwhite_arthur_acetate_sunglasses);

            var seller_puma = dbUsers.First(u => u.Email == "puma@gmail.com");
            var prod_puma_puma_suede_classic_xxi = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Puma Suede Classic XXI Low",
                Slug = "puma-puma-suede-classic-xxi",
                Sku = "PUM-XXI-1",
                CollectionName = "Puma Suede Heritage",
                Description = "Giày Sneaker Puma Suede Classic XXI Low chính hãng từ Puma. Chế tác từ Da lộn cao cấp êm ái, dải Formstrip viền da trắng cổ điển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2190000m,
                OriginalPrice = 2500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/puma/puma-suede-classic-xxi.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-suede-classic-xxi.jpg", "/img/brands/puma/puma-suede-classic-xxi.jpg", "/img/brands/puma/puma-suede-classic-xxi.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da lộn cao cấp êm ái, dải Formstrip viền da trắng cổ điển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_suede_classic_xxi.Variants.Add(new ProductVariant { Sku = "PUM-XXI-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 15 });
            prod_puma_puma_suede_classic_xxi.Variants.Add(new ProductVariant { Sku = "PUM-XXI-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 20 });
            prod_puma_puma_suede_classic_xxi.Variants.Add(new ProductVariant { Sku = "PUM-XXI-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_suede_classic_xxi);
            var prod_puma_puma_speedcat_og_motorsport = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Thể Thao Puma Speedcat OG Motorsport",
                Slug = "puma-puma-speedcat-og-motorsport",
                Sku = "PUM-MOTO-1",
                CollectionName = "Puma Motorsport",
                Description = "Giày Thể Thao Puma Speedcat OG Motorsport chính hãng từ Puma. Chế tác từ Thiết kế giày đua xe F1 da lộn ôm chân siêu nhẹ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2890000m,
                OriginalPrice = 3300000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/puma/puma-speedcat-og-motorsport.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-speedcat-og-motorsport.jpg", "/img/brands/puma/puma-speedcat-og-motorsport.jpg", "/img/brands/puma/puma-speedcat-og-motorsport.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thiết kế giày đua xe F1 da lộn ôm chân siêu nhẹ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_speedcat_og_motorsport.Variants.Add(new ProductVariant { Sku = "PUM-MOTO-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2890000m, StockQuantity = 15 });
            prod_puma_puma_speedcat_og_motorsport.Variants.Add(new ProductVariant { Sku = "PUM-MOTO-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2890000m, StockQuantity = 20 });
            prod_puma_puma_speedcat_og_motorsport.Variants.Add(new ProductVariant { Sku = "PUM-MOTO-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2890000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_speedcat_og_motorsport);
            var prod_puma_puma_palermo_leather_terrace = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Puma Palermo Leather Terrace",
                Slug = "puma-puma-palermo-leather-terrace",
                Sku = "PUM-TERR-1",
                CollectionName = "Puma Terrace Collection",
                Description = "Giày Sneaker Puma Palermo Leather Terrace chính hãng từ Puma. Chế tác từ Da trơn phối da lộn phong cách khán đài bóng đá Ý 1980 với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2690000m,
                OriginalPrice = 3100000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/puma/puma-palermo-leather-terrace.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-palermo-leather-terrace.jpg", "/img/brands/puma/puma-palermo-leather-terrace.jpg", "/img/brands/puma/puma-palermo-leather-terrace.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da trơn phối da lộn phong cách khán đài bóng đá Ý 1980",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_palermo_leather_terrace.Variants.Add(new ProductVariant { Sku = "PUM-TERR-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2690000m, StockQuantity = 15 });
            prod_puma_puma_palermo_leather_terrace.Variants.Add(new ProductVariant { Sku = "PUM-TERR-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2690000m, StockQuantity = 20 });
            prod_puma_puma_palermo_leather_terrace.Variants.Add(new ProductVariant { Sku = "PUM-TERR-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2690000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_palermo_leather_terrace);
            var prod_puma_puma_t7_track_jacket_heritage = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Thể Thao Puma T7 Track Jacket Heritage",
                Slug = "puma-puma-t7-track-jacket-heritage",
                Sku = "PUM-HERI-2",
                CollectionName = "Puma T7 Heritage",
                Description = "Áo Khoác Thể Thao Puma T7 Track Jacket Heritage chính hãng từ Puma. Chế tác từ Dải sọc 7cm đặc trưng trên vai áo, chất thun co giãn thể thao với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1950000m,
                OriginalPrice = 2300000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/puma/puma-t7-track-jacket-heritage.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-t7-track-jacket-heritage.jpg", "/img/brands/puma/puma-t7-track-jacket-heritage.jpg", "/img/brands/puma/puma-t7-track-jacket-heritage.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Dải sọc 7cm đặc trưng trên vai áo, chất thun co giãn thể thao",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_t7_track_jacket_heritage.Variants.Add(new ProductVariant { Sku = "PUM-HERI-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1950000m, StockQuantity = 15 });
            prod_puma_puma_t7_track_jacket_heritage.Variants.Add(new ProductVariant { Sku = "PUM-HERI-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1950000m, StockQuantity = 20 });
            prod_puma_puma_t7_track_jacket_heritage.Variants.Add(new ProductVariant { Sku = "PUM-HERI-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1950000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_t7_track_jacket_heritage);
            var prod_puma_puma_velocity_nitro_3_running = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Chạy Bộ Puma Velocity Nitro 3 Running",
                Slug = "puma-puma-velocity-nitro-3-running",
                Sku = "PUM-RUNN-1",
                CollectionName = "Puma Running Performance",
                Description = "Giày Chạy Bộ Puma Velocity Nitro 3 Running chính hãng từ Puma. Chế tác từ Bọt đệm khí Nitơ NITROFOAM phản hồi lực cực nhạy với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3890000m,
                OriginalPrice = 4400000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/puma/puma-velocity-nitro-3-running.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-velocity-nitro-3-running.jpg", "/img/brands/puma/puma-velocity-nitro-3-running.jpg", "/img/brands/puma/puma-velocity-nitro-3-running.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Bọt đệm khí Nitơ NITROFOAM phản hồi lực cực nhạy",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_velocity_nitro_3_running.Variants.Add(new ProductVariant { Sku = "PUM-RUNN-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 3890000m, StockQuantity = 15 });
            prod_puma_puma_velocity_nitro_3_running.Variants.Add(new ProductVariant { Sku = "PUM-RUNN-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 3890000m, StockQuantity = 20 });
            prod_puma_puma_velocity_nitro_3_running.Variants.Add(new ProductVariant { Sku = "PUM-RUNN-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 3890000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_velocity_nitro_3_running);
            var prod_puma_puma_fenty_creeper_phatty = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Puma x Fenty Creeper Phatty By Rihanna",
                Slug = "puma-puma-fenty-creeper-phatty",
                Sku = "PUM-PHAT-1",
                CollectionName = "Puma x Fenty by Rihanna",
                Description = "Giày Sneaker Puma x Fenty Creeper Phatty By Rihanna chính hãng từ Puma. Chế tác từ Đế kếp dày chunky đệm nhung da lộn thời trang đỉnh cao với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3950000m,
                OriginalPrice = 4500000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/puma/puma-fenty-creeper-phatty.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-fenty-creeper-phatty.jpg", "/img/brands/puma/puma-fenty-creeper-phatty.jpg", "/img/brands/puma/puma-fenty-creeper-phatty.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Đế kếp dày chunky đệm nhung da lộn thời trang đỉnh cao",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_fenty_creeper_phatty.Variants.Add(new ProductVariant { Sku = "PUM-PHAT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 3950000m, StockQuantity = 15 });
            prod_puma_puma_fenty_creeper_phatty.Variants.Add(new ProductVariant { Sku = "PUM-PHAT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 3950000m, StockQuantity = 20 });
            prod_puma_puma_fenty_creeper_phatty.Variants.Add(new ProductVariant { Sku = "PUM-PHAT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 3950000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_fenty_creeper_phatty);
            var prod_puma_puma_core_heritage_backpack = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catAccessories.Id,
                Name = "Balo Thời Trang Puma Core Heritage Backpack",
                Slug = "puma-puma-core-heritage-backpack",
                Sku = "PUM-BACK-3",
                CollectionName = "Puma Accessories",
                Description = "Balo Thời Trang Puma Core Heritage Backpack chính hãng từ Puma. Chế tác từ Vải dệt chống bám bụi, ngăn đệm laptop 15.6 inch chống sốc với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 790000m,
                OriginalPrice = 950000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/puma/puma-core-heritage-backpack.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-core-heritage-backpack.jpg", "/img/brands/puma/puma-core-heritage-backpack.jpg", "/img/brands/puma/puma-core-heritage-backpack.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải dệt chống bám bụi, ngăn đệm laptop 15.6 inch chống sốc",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_core_heritage_backpack.Variants.Add(new ProductVariant { Sku = "PUM-BACK-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 50 });
            allProducts.Add(prod_puma_puma_core_heritage_backpack);
            var prod_puma_puma_classics_relaxed_hoodie = new Product
            {
                SellerId = seller_puma.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Nỉ Có Mũ Puma Classics Relaxed Hoodie",
                Slug = "puma-puma-classics-relaxed-hoodie",
                Sku = "PUM-HOOD-2",
                CollectionName = "Puma Classics",
                Description = "Áo Nỉ Có Mũ Puma Classics Relaxed Hoodie chính hãng từ Puma. Chế tác từ Chất nỉ bông mềm mại 100% bông bền vững Better Cotton với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1690000m,
                OriginalPrice = 1990000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/puma/puma-classics-relaxed-hoodie.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/puma/puma-classics-relaxed-hoodie.jpg", "/img/brands/puma/puma-classics-relaxed-hoodie.jpg", "/img/brands/puma/puma-classics-relaxed-hoodie.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất nỉ bông mềm mại 100% bông bền vững Better Cotton",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Puma, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Đức",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_puma_puma_classics_relaxed_hoodie.Variants.Add(new ProductVariant { Sku = "PUM-HOOD-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1690000m, StockQuantity = 15 });
            prod_puma_puma_classics_relaxed_hoodie.Variants.Add(new ProductVariant { Sku = "PUM-HOOD-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1690000m, StockQuantity = 20 });
            prod_puma_puma_classics_relaxed_hoodie.Variants.Add(new ProductVariant { Sku = "PUM-HOOD-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1690000m, StockQuantity = 15 });
            allProducts.Add(prod_puma_puma_classics_relaxed_hoodie);

            var seller_zara = dbUsers.First(u => u.Email == "zara@gmail.com");
            var prod_zara_zara_tailored_double_breasted_blazer = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Blazer Nữ Tailored Double-Breasted Wool Blend",
                Slug = "zara-zara-tailored-double-breasted-blazer",
                Sku = "ZAR-BLAZ-2",
                CollectionName = "Zara Woman Tailoring",
                Description = "Áo Blazer Nữ Tailored Double-Breasted Wool Blend chính hãng từ Zara. Chế tác từ Vải len pha cao cấp đứng form, hai hàng khuy kim loại sang trọng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2690000m,
                OriginalPrice = 3100000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/zara/zara-tailored-double-breasted-blazer.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-tailored-double-breasted-blazer.jpg", "/img/brands/zara/zara-tailored-double-breasted-blazer.jpg", "/img/brands/zara/zara-tailored-double-breasted-blazer.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải len pha cao cấp đứng form, hai hàng khuy kim loại sang trọng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_tailored_double_breasted_blazer.Variants.Add(new ProductVariant { Sku = "ZAR-BLAZ-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2690000m, StockQuantity = 15 });
            prod_zara_zara_tailored_double_breasted_blazer.Variants.Add(new ProductVariant { Sku = "ZAR-BLAZ-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2690000m, StockQuantity = 20 });
            prod_zara_zara_tailored_double_breasted_blazer.Variants.Add(new ProductVariant { Sku = "ZAR-BLAZ-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2690000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_tailored_double_breasted_blazer);
            var prod_zara_zara_minimalist_ribbed_knit_sweater = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Len Dệt Kim Cổ Cao Minimalist Ribbed Knit",
                Slug = "zara-zara-minimalist-ribbed-knit-sweater",
                Sku = "ZAR-SWEA-2",
                CollectionName = "Zara Knitwear",
                Description = "Áo Len Dệt Kim Cổ Cao Minimalist Ribbed Knit chính hãng từ Zara. Chế tác từ Sợi len dệt gân mềm mại ôm dáng, giữ nhiệt mùa đông tối ưu với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1290000m,
                OriginalPrice = 1590000m,
                DiscountPercent = 19,
                ImageUrl = "/img/brands/zara/zara-minimalist-ribbed-knit-sweater.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-minimalist-ribbed-knit-sweater.jpg", "/img/brands/zara/zara-minimalist-ribbed-knit-sweater.jpg", "/img/brands/zara/zara-minimalist-ribbed-knit-sweater.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Sợi len dệt gân mềm mại ôm dáng, giữ nhiệt mùa đông tối ưu",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_minimalist_ribbed_knit_sweater.Variants.Add(new ProductVariant { Sku = "ZAR-SWEA-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1290000m, StockQuantity = 15 });
            prod_zara_zara_minimalist_ribbed_knit_sweater.Variants.Add(new ProductVariant { Sku = "ZAR-SWEA-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1290000m, StockQuantity = 20 });
            prod_zara_zara_minimalist_ribbed_knit_sweater.Variants.Add(new ProductVariant { Sku = "ZAR-SWEA-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1290000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_minimalist_ribbed_knit_sweater);
            var prod_zara_zara_wide_leg_pleated_trousers = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Tây Ống Rộng Xếp Ly Wide-Leg Pleated Trousers",
                Slug = "zara-zara-wide-leg-pleated-trousers",
                Sku = "ZAR-TROU-2",
                CollectionName = "Zara Woman Studio",
                Description = "Quần Tây Ống Rộng Xếp Ly Wide-Leg Pleated Trousers chính hãng từ Zara. Chế tác từ Cạp cao xếp ly đôi tôn dáng, chất vải rũ nhẹ nhàng thanh lịch với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1490000m,
                OriginalPrice = 1790000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/zara/zara-wide-leg-pleated-trousers.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-wide-leg-pleated-trousers.jpg", "/img/brands/zara/zara-wide-leg-pleated-trousers.jpg", "/img/brands/zara/zara-wide-leg-pleated-trousers.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Cạp cao xếp ly đôi tôn dáng, chất vải rũ nhẹ nhàng thanh lịch",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_wide_leg_pleated_trousers.Variants.Add(new ProductVariant { Sku = "ZAR-TROU-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1490000m, StockQuantity = 15 });
            prod_zara_zara_wide_leg_pleated_trousers.Variants.Add(new ProductVariant { Sku = "ZAR-TROU-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1490000m, StockQuantity = 20 });
            prod_zara_zara_wide_leg_pleated_trousers.Variants.Add(new ProductVariant { Sku = "ZAR-TROU-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1490000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_wide_leg_pleated_trousers);
            var prod_zara_zara_faux_leather_oversized_trench = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Măng Tô Da Faux Leather Oversized Trench Coat",
                Slug = "zara-zara-faux-leather-oversized-trench",
                Sku = "ZAR-TREN-2",
                CollectionName = "Zara Outerwear",
                Description = "Áo Măng Tô Da Faux Leather Oversized Trench Coat chính hãng từ Zara. Chế tác từ Da nhân tạo mềm mịn chống gió, kèm thắt lưng buộc eo cá tính với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3290000m,
                OriginalPrice = 3800000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/zara/zara-faux-leather-oversized-trench.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-faux-leather-oversized-trench.jpg", "/img/brands/zara/zara-faux-leather-oversized-trench.jpg", "/img/brands/zara/zara-faux-leather-oversized-trench.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da nhân tạo mềm mịn chống gió, kèm thắt lưng buộc eo cá tính",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_faux_leather_oversized_trench.Variants.Add(new ProductVariant { Sku = "ZAR-TREN-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 3290000m, StockQuantity = 15 });
            prod_zara_zara_faux_leather_oversized_trench.Variants.Add(new ProductVariant { Sku = "ZAR-TREN-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 3290000m, StockQuantity = 20 });
            prod_zara_zara_faux_leather_oversized_trench.Variants.Add(new ProductVariant { Sku = "ZAR-TREN-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 3290000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_faux_leather_oversized_trench);
            var prod_zara_zara_pointed_toe_kitten_boots = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catSneaker.Id,
                Name = "Bốt Da Mũi Nhọn Pointed Toe Kitten Heel Boots",
                Slug = "zara-zara-pointed-toe-kitten-boots",
                Sku = "ZAR-BOOT-1",
                CollectionName = "Zara Footwear",
                Description = "Bốt Da Mũi Nhọn Pointed Toe Kitten Heel Boots chính hãng từ Zara. Chế tác từ Da thật mềm ôm bắp chân, gót mảnh 5cm thoải mái di chuyển với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2190000m,
                OriginalPrice = 2590000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/zara/zara-pointed-toe-kitten-boots.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-pointed-toe-kitten-boots.jpg", "/img/brands/zara/zara-pointed-toe-kitten-boots.jpg", "/img/brands/zara/zara-pointed-toe-kitten-boots.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da thật mềm ôm bắp chân, gót mảnh 5cm thoải mái di chuyển",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_pointed_toe_kitten_boots.Variants.Add(new ProductVariant { Sku = "ZAR-BOOT-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 15 });
            prod_zara_zara_pointed_toe_kitten_boots.Variants.Add(new ProductVariant { Sku = "ZAR-BOOT-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 20 });
            prod_zara_zara_pointed_toe_kitten_boots.Variants.Add(new ProductVariant { Sku = "ZAR-BOOT-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2190000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_pointed_toe_kitten_boots);
            var prod_zara_zara_textured_leather_city_bag = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Xách Da Đeo Chéo Textured Leather City Bag",
                Slug = "zara-zara-textured-leather-city-bag",
                Sku = "ZAR-BAG-3",
                CollectionName = "Zara Leather Bags",
                Description = "Túi Xách Da Đeo Chéo Textured Leather City Bag chính hãng từ Zara. Chế tác từ Da bò dập vân tự nhiên, nhiều ngăn đựng đồ tiện dụng văn phòng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1990000m,
                OriginalPrice = 2390000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/zara/zara-textured-leather-city-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-textured-leather-city-bag.jpg", "/img/brands/zara/zara-textured-leather-city-bag.jpg", "/img/brands/zara/zara-textured-leather-city-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò dập vân tự nhiên, nhiều ngăn đựng đồ tiện dụng văn phòng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_textured_leather_city_bag.Variants.Add(new ProductVariant { Sku = "ZAR-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 1990000m, StockQuantity = 50 });
            allProducts.Add(prod_zara_zara_textured_leather_city_bag);
            var prod_zara_zara_basic_relaxed_poplin_shirt = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Sơ Mi Poplin Cotton Dáng Rộng Basic Relaxed",
                Slug = "zara-zara-basic-relaxed-poplin-shirt",
                Sku = "ZAR-SHIR-2",
                CollectionName = "Zara Essentials",
                Description = "Áo Sơ Mi Poplin Cotton Dáng Rộng Basic Relaxed chính hãng từ Zara. Chế tác từ 100% Cotton Poplin cao cấp thấm hút tốt, cúc vỏ ốc tinh xảo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 990000m,
                OriginalPrice = 1190000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/zara/zara-basic-relaxed-poplin-shirt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-basic-relaxed-poplin-shirt.jpg", "/img/brands/zara/zara-basic-relaxed-poplin-shirt.jpg", "/img/brands/zara/zara-basic-relaxed-poplin-shirt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Cotton Poplin cao cấp thấm hút tốt, cúc vỏ ốc tinh xảo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_basic_relaxed_poplin_shirt.Variants.Add(new ProductVariant { Sku = "ZAR-SHIR-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 990000m, StockQuantity = 15 });
            prod_zara_zara_basic_relaxed_poplin_shirt.Variants.Add(new ProductVariant { Sku = "ZAR-SHIR-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 990000m, StockQuantity = 20 });
            prod_zara_zara_basic_relaxed_poplin_shirt.Variants.Add(new ProductVariant { Sku = "ZAR-SHIR-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 990000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_basic_relaxed_poplin_shirt);
            var prod_zara_zara_belted_linen_blend_jumpsuit = new Product
            {
                SellerId = seller_zara.Id,
                CategoryId = catStreetwear.Id,
                Name = "Bộ Jumpsuit Linen Pha Đai Eo Belted Jumpsuit",
                Slug = "zara-zara-belted-linen-blend-jumpsuit",
                Sku = "ZAR-JUMP-2",
                CollectionName = "Zara Summer Edition",
                Description = "Bộ Jumpsuit Linen Pha Đai Eo Belted Jumpsuit chính hãng từ Zara. Chế tác từ Vải đũi Linen thoáng khí mùa hè, đai thắt tạo điểm nhấn eo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1890000m,
                OriginalPrice = 2290000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/zara/zara-belted-linen-blend-jumpsuit.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/zara/zara-belted-linen-blend-jumpsuit.jpg", "/img/brands/zara/zara-belted-linen-blend-jumpsuit.jpg", "/img/brands/zara/zara-belted-linen-blend-jumpsuit.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải đũi Linen thoáng khí mùa hè, đai thắt tạo điểm nhấn eo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Zara, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Tây Ban Nha",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_zara_zara_belted_linen_blend_jumpsuit.Variants.Add(new ProductVariant { Sku = "ZAR-JUMP-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1890000m, StockQuantity = 15 });
            prod_zara_zara_belted_linen_blend_jumpsuit.Variants.Add(new ProductVariant { Sku = "ZAR-JUMP-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1890000m, StockQuantity = 20 });
            prod_zara_zara_belted_linen_blend_jumpsuit.Variants.Add(new ProductVariant { Sku = "ZAR-JUMP-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1890000m, StockQuantity = 15 });
            allProducts.Add(prod_zara_zara_belted_linen_blend_jumpsuit);

            var seller_uniqlo = dbUsers.First(u => u.Email == "uniqlo@gmail.com");
            var prod_uniqlo_uniqlo_ultra_light_down_jacket = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Phao Lông Vũ Siêu Nhẹ Ultra Light Down Jacket",
                Slug = "uniqlo-uniqlo-ultra-light-down-jacket",
                Sku = "UNI-JACK-2",
                CollectionName = "Uniqlo LifeWear Icon",
                Description = "Áo Phao Lông Vũ Siêu Nhẹ Ultra Light Down Jacket chính hãng từ Uniqlo. Chế tác từ Lông vũ 750+ fill power siêu ấm, có thể gấp gọn trong túi nhỏ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1790000m,
                OriginalPrice = 1990000m,
                DiscountPercent = 10,
                ImageUrl = "/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg", "/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg", "/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Lông vũ 750+ fill power siêu ấm, có thể gấp gọn trong túi nhỏ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_ultra_light_down_jacket.Variants.Add(new ProductVariant { Sku = "UNI-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1790000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_ultra_light_down_jacket.Variants.Add(new ProductVariant { Sku = "UNI-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1790000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_ultra_light_down_jacket.Variants.Add(new ProductVariant { Sku = "UNI-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1790000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_ultra_light_down_jacket);
            var prod_uniqlo_uniqlo_airism_cotton_oversize_tee = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Phông Cổ Tròn AIRism Cotton Oversized Tee",
                Slug = "uniqlo-uniqlo-airism-cotton-oversize-tee",
                Sku = "UNI-TEE-2",
                CollectionName = "Uniqlo AIRism Series",
                Description = "Áo Phông Cổ Tròn AIRism Cotton Oversized Tee chính hãng từ Uniqlo. Chế tác từ Công nghệ AIRism mát lạnh mặt trong, mặt ngoài cotton dệt mịn với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 390000m,
                OriginalPrice = 490000m,
                DiscountPercent = 20,
                ImageUrl = "/img/brands/uniqlo/uniqlo-airism-cotton-oversize-tee.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-airism-cotton-oversize-tee.jpg", "/img/brands/uniqlo/uniqlo-airism-cotton-oversize-tee.jpg", "/img/brands/uniqlo/uniqlo-airism-cotton-oversize-tee.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Công nghệ AIRism mát lạnh mặt trong, mặt ngoài cotton dệt mịn",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_airism_cotton_oversize_tee.Variants.Add(new ProductVariant { Sku = "UNI-TEE-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_airism_cotton_oversize_tee.Variants.Add(new ProductVariant { Sku = "UNI-TEE-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_airism_cotton_oversize_tee.Variants.Add(new ProductVariant { Sku = "UNI-TEE-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_airism_cotton_oversize_tee);
            var prod_uniqlo_uniqlo_extra_fine_merino_cardigan = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Cardigan Len Lông Cừu Extra Fine Merino Wool",
                Slug = "uniqlo-uniqlo-extra-fine-merino-cardigan",
                Sku = "UNI-CARD-2",
                CollectionName = "Uniqlo Merino Wool",
                Description = "Áo Cardigan Len Lông Cừu Extra Fine Merino Wool chính hãng từ Uniqlo. Chế tác từ 100% Len Merino 19.5 micron có thể giặt máy mà không xơ rối với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 990000m,
                OriginalPrice = 1190000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/uniqlo/uniqlo-extra-fine-merino-cardigan.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-extra-fine-merino-cardigan.jpg", "/img/brands/uniqlo/uniqlo-extra-fine-merino-cardigan.jpg", "/img/brands/uniqlo/uniqlo-extra-fine-merino-cardigan.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Len Merino 19.5 micron có thể giặt máy mà không xơ rối",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_extra_fine_merino_cardigan.Variants.Add(new ProductVariant { Sku = "UNI-CARD-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 990000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_extra_fine_merino_cardigan.Variants.Add(new ProductVariant { Sku = "UNI-CARD-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 990000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_extra_fine_merino_cardigan.Variants.Add(new ProductVariant { Sku = "UNI-CARD-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 990000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_extra_fine_merino_cardigan);
            var prod_uniqlo_uniqlo_smart_stretch_ankle_pants = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Dài Co Giãn 2 Chiều Smart Ankle Pants",
                Slug = "uniqlo-uniqlo-smart-stretch-ankle-pants",
                Sku = "UNI-PANT-2",
                CollectionName = "Uniqlo Smart Pants",
                Description = "Quần Dài Co Giãn 2 Chiều Smart Ankle Pants chính hãng từ Uniqlo. Chế tác từ Vải chống nhăn co giãn nhẹ, chiều dài chạm mắt cá chuẩn công sở với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 790000m,
                OriginalPrice = 990000m,
                DiscountPercent = 20,
                ImageUrl = "/img/brands/uniqlo/uniqlo-smart-stretch-ankle-pants.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-smart-stretch-ankle-pants.jpg", "/img/brands/uniqlo/uniqlo-smart-stretch-ankle-pants.jpg", "/img/brands/uniqlo/uniqlo-smart-stretch-ankle-pants.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải chống nhăn co giãn nhẹ, chiều dài chạm mắt cá chuẩn công sở",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_smart_stretch_ankle_pants.Variants.Add(new ProductVariant { Sku = "UNI-PANT-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_smart_stretch_ankle_pants.Variants.Add(new ProductVariant { Sku = "UNI-PANT-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_smart_stretch_ankle_pants.Variants.Add(new ProductVariant { Sku = "UNI-PANT-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_smart_stretch_ankle_pants);
            var prod_uniqlo_uniqlo_seamless_down_hooded_parka = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Parka Liền Mũ Seamless Down Parka",
                Slug = "uniqlo-uniqlo-seamless-down-hooded-parka",
                Sku = "UNI-PARK-2",
                CollectionName = "Uniqlo Seamless Down",
                Description = "Áo Khoác Parka Liền Mũ Seamless Down Parka chính hãng từ Uniqlo. Chế tác từ Thiết kế không đường may chống gió lùa và chống thấm nước mưa với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2990000m,
                OriginalPrice = 3400000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/uniqlo/uniqlo-seamless-down-hooded-parka.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-seamless-down-hooded-parka.jpg", "/img/brands/uniqlo/uniqlo-seamless-down-hooded-parka.jpg", "/img/brands/uniqlo/uniqlo-seamless-down-hooded-parka.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thiết kế không đường may chống gió lùa và chống thấm nước mưa",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_seamless_down_hooded_parka.Variants.Add(new ProductVariant { Sku = "UNI-PARK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_seamless_down_hooded_parka.Variants.Add(new ProductVariant { Sku = "UNI-PARK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_seamless_down_hooded_parka.Variants.Add(new ProductVariant { Sku = "UNI-PARK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2990000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_seamless_down_hooded_parka);
            var prod_uniqlo_uniqlo_premium_lambswool_sweater = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Len Cổ Tròn Dệt Kim Premium Lambswool",
                Slug = "uniqlo-uniqlo-premium-lambswool-sweater",
                Sku = "UNI-SWEA-2",
                CollectionName = "Uniqlo Knitwear",
                Description = "Áo Len Cổ Tròn Dệt Kim Premium Lambswool chính hãng từ Uniqlo. Chế tác từ 100% Len cừu non cao cấp từ trang trại đạt chuẩn nhân đạo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 790000m,
                OriginalPrice = 950000m,
                DiscountPercent = 17,
                ImageUrl = "/img/brands/uniqlo/uniqlo-premium-lambswool-sweater.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-premium-lambswool-sweater.jpg", "/img/brands/uniqlo/uniqlo-premium-lambswool-sweater.jpg", "/img/brands/uniqlo/uniqlo-premium-lambswool-sweater.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Len cừu non cao cấp từ trang trại đạt chuẩn nhân đạo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_premium_lambswool_sweater.Variants.Add(new ProductVariant { Sku = "UNI-SWEA-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_premium_lambswool_sweater.Variants.Add(new ProductVariant { Sku = "UNI-SWEA-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_premium_lambswool_sweater.Variants.Add(new ProductVariant { Sku = "UNI-SWEA-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 790000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_premium_lambswool_sweater);
            var prod_uniqlo_uniqlo_round_mini_shoulder_bag = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Đeo Chéo Bán Nguyệt Round Mini Shoulder Bag",
                Slug = "uniqlo-uniqlo-round-mini-shoulder-bag",
                Sku = "UNI-BAG-3",
                CollectionName = "Uniqlo Accessories",
                Description = "Túi Đeo Chéo Bán Nguyệt Round Mini Shoulder Bag chính hãng từ Uniqlo. Chế tác từ Thiết kế bán nguyệt chứa đồ thần kỳ chống nước nhẹ nhẹ tênh với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 390000m,
                OriginalPrice = 490000m,
                DiscountPercent = 20,
                ImageUrl = "/img/brands/uniqlo/uniqlo-round-mini-shoulder-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-round-mini-shoulder-bag.jpg", "/img/brands/uniqlo/uniqlo-round-mini-shoulder-bag.jpg", "/img/brands/uniqlo/uniqlo-round-mini-shoulder-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thiết kế bán nguyệt chứa đồ thần kỳ chống nước nhẹ nhẹ tênh",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_round_mini_shoulder_bag.Variants.Add(new ProductVariant { Sku = "UNI-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 50 });
            allProducts.Add(prod_uniqlo_uniqlo_round_mini_shoulder_bag);
            var prod_uniqlo_uniqlo_dry_ex_functional_tee = new Product
            {
                SellerId = seller_uniqlo.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Thể Thao Dry-EX Thoát Ẩm Nhanh Functional Tee",
                Slug = "uniqlo-uniqlo-dry-ex-functional-tee",
                Sku = "UNI-TEE-3",
                CollectionName = "Uniqlo DRY-EX Sport",
                Description = "Áo Thể Thao Dry-EX Thoát Ẩm Nhanh Functional Tee chính hãng từ Uniqlo. Chế tác từ Sợi microfiber thoát mồ hôi siêu tốc được các VĐV tin dùng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 390000m,
                OriginalPrice = 490000m,
                DiscountPercent = 20,
                ImageUrl = "/img/brands/uniqlo/uniqlo-dry-ex-functional-tee.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/uniqlo/uniqlo-dry-ex-functional-tee.jpg", "/img/brands/uniqlo/uniqlo-dry-ex-functional-tee.jpg", "/img/brands/uniqlo/uniqlo-dry-ex-functional-tee.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Sợi microfiber thoát mồ hôi siêu tốc được các VĐV tin dùng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Uniqlo, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Nhật Bản",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_uniqlo_uniqlo_dry_ex_functional_tee.Variants.Add(new ProductVariant { Sku = "UNI-TEE-3-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 15 });
            prod_uniqlo_uniqlo_dry_ex_functional_tee.Variants.Add(new ProductVariant { Sku = "UNI-TEE-3-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 20 });
            prod_uniqlo_uniqlo_dry_ex_functional_tee.Variants.Add(new ProductVariant { Sku = "UNI-TEE-3-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 390000m, StockQuantity = 15 });
            allProducts.Add(prod_uniqlo_uniqlo_dry_ex_functional_tee);

            var seller_calvinklein = dbUsers.First(u => u.Email == "calvinklein@gmail.com");
            var prod_calvinklein_calvinklein_modern_cotton_bralette = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catStreetwear.Id,
                Name = "Set Áo Lót Bralette Không Gọng Modern Cotton",
                Slug = "calvinklein-calvinklein-modern-cotton-bralette",
                Sku = "CAL-BRAL-2",
                CollectionName = "CK Modern Cotton",
                Description = "Set Áo Lót Bralette Không Gọng Modern Cotton chính hãng từ Calvin Klein. Chế tác từ Chất cotton modal siêu co giãn thoáng mát, đai chun logo CK với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1450000m,
                OriginalPrice = 1690000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg", "/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg", "/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất cotton modal siêu co giãn thoáng mát, đai chun logo CK",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_modern_cotton_bralette.Variants.Add(new ProductVariant { Sku = "CAL-BRAL-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1450000m, StockQuantity = 15 });
            prod_calvinklein_calvinklein_modern_cotton_bralette.Variants.Add(new ProductVariant { Sku = "CAL-BRAL-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1450000m, StockQuantity = 20 });
            prod_calvinklein_calvinklein_modern_cotton_bralette.Variants.Add(new ProductVariant { Sku = "CAL-BRAL-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1450000m, StockQuantity = 15 });
            allProducts.Add(prod_calvinklein_calvinklein_modern_cotton_bralette);
            var prod_calvinklein_calvinklein_90s_straight_denim_jeans = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Jeans Ống Suông 90s Straight Fit Selvedge",
                Slug = "calvinklein-calvinklein-90s-straight-denim-jeans",
                Sku = "CAL-JEAN-2",
                CollectionName = "CK Jeans Heritage",
                Description = "Quần Jeans Ống Suông 90s Straight Fit Selvedge chính hãng từ Calvin Klein. Chế tác từ Denim cotton nguyên bản dệt biên phong cách thập niên 90 với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3850000m,
                OriginalPrice = 4400000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/calvinklein/calvinklein-90s-straight-denim-jeans.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-90s-straight-denim-jeans.jpg", "/img/brands/calvinklein/calvinklein-90s-straight-denim-jeans.jpg", "/img/brands/calvinklein/calvinklein-90s-straight-denim-jeans.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Denim cotton nguyên bản dệt biên phong cách thập niên 90",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_90s_straight_denim_jeans.Variants.Add(new ProductVariant { Sku = "CAL-JEAN-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 15 });
            prod_calvinklein_calvinklein_90s_straight_denim_jeans.Variants.Add(new ProductVariant { Sku = "CAL-JEAN-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 20 });
            prod_calvinklein_calvinklein_90s_straight_denim_jeans.Variants.Add(new ProductVariant { Sku = "CAL-JEAN-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 15 });
            allProducts.Add(prod_calvinklein_calvinklein_90s_straight_denim_jeans);
            var prod_calvinklein_calvinklein_monogram_logo_tee = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Phông Monogram Logo Crewneck Tee Cotton",
                Slug = "calvinklein-calvinklein-monogram-logo-tee",
                Sku = "CAL-TEE-2",
                CollectionName = "CK Monogram Tees",
                Description = "Áo Phông Monogram Logo Crewneck Tee Cotton chính hãng từ Calvin Klein. Chế tác từ 100% Cotton hữu cơ mềm mại in logo cK Monogram ngực áo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1250000m,
                OriginalPrice = 1490000m,
                DiscountPercent = 16,
                ImageUrl = "/img/brands/calvinklein/calvinklein-monogram-logo-tee.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-monogram-logo-tee.jpg", "/img/brands/calvinklein/calvinklein-monogram-logo-tee.jpg", "/img/brands/calvinklein/calvinklein-monogram-logo-tee.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "100% Cotton hữu cơ mềm mại in logo cK Monogram ngực áo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_monogram_logo_tee.Variants.Add(new ProductVariant { Sku = "CAL-TEE-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1250000m, StockQuantity = 15 });
            prod_calvinklein_calvinklein_monogram_logo_tee.Variants.Add(new ProductVariant { Sku = "CAL-TEE-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1250000m, StockQuantity = 20 });
            prod_calvinklein_calvinklein_monogram_logo_tee.Variants.Add(new ProductVariant { Sku = "CAL-TEE-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1250000m, StockQuantity = 15 });
            allProducts.Add(prod_calvinklein_calvinklein_monogram_logo_tee);
            var prod_calvinklein_calvinklein_trucker_sherpa_jacket = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Bò Lót Lông Cừu Denim Trucker Sherpa Jacket",
                Slug = "calvinklein-calvinklein-trucker-sherpa-jacket",
                Sku = "CAL-JACK-2",
                CollectionName = "CK Outerwear",
                Description = "Áo Khoác Bò Lót Lông Cừu Denim Trucker Sherpa Jacket chính hãng từ Calvin Klein. Chế tác từ Vải denim wash dày dặn lót bông Sherpa ấm áp mùa đông với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 4950000m,
                OriginalPrice = 5600000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/calvinklein/calvinklein-trucker-sherpa-jacket.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-trucker-sherpa-jacket.jpg", "/img/brands/calvinklein/calvinklein-trucker-sherpa-jacket.jpg", "/img/brands/calvinklein/calvinklein-trucker-sherpa-jacket.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải denim wash dày dặn lót bông Sherpa ấm áp mùa đông",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_trucker_sherpa_jacket.Variants.Add(new ProductVariant { Sku = "CAL-JACK-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 4950000m, StockQuantity = 15 });
            prod_calvinklein_calvinklein_trucker_sherpa_jacket.Variants.Add(new ProductVariant { Sku = "CAL-JACK-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 4950000m, StockQuantity = 20 });
            prod_calvinklein_calvinklein_trucker_sherpa_jacket.Variants.Add(new ProductVariant { Sku = "CAL-JACK-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 4950000m, StockQuantity = 15 });
            allProducts.Add(prod_calvinklein_calvinklein_trucker_sherpa_jacket);
            var prod_calvinklein_calvinklein_low_rise_trunk_3pack = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catStreetwear.Id,
                Name = "Hộp 3 Quần Lót Nam Low-Rise Trunk Microfiber",
                Slug = "calvinklein-calvinklein-low-rise-trunk-3pack",
                Sku = "CAL-3PAC-2",
                CollectionName = "CK Underwear Pack",
                Description = "Hộp 3 Quần Lót Nam Low-Rise Trunk Microfiber chính hãng từ Calvin Klein. Chế tác từ Sợi Microfiber mát lạnh co giãn 4 chiều kháng khuẩn tối ưu với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1650000m,
                OriginalPrice = 1950000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/calvinklein/calvinklein-low-rise-trunk-3pack.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-low-rise-trunk-3pack.jpg", "/img/brands/calvinklein/calvinklein-low-rise-trunk-3pack.jpg", "/img/brands/calvinklein/calvinklein-low-rise-trunk-3pack.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Sợi Microfiber mát lạnh co giãn 4 chiều kháng khuẩn tối ưu",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_low_rise_trunk_3pack.Variants.Add(new ProductVariant { Sku = "CAL-3PAC-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 15 });
            prod_calvinklein_calvinklein_low_rise_trunk_3pack.Variants.Add(new ProductVariant { Sku = "CAL-3PAC-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 20 });
            prod_calvinklein_calvinklein_low_rise_trunk_3pack.Variants.Add(new ProductVariant { Sku = "CAL-3PAC-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 15 });
            allProducts.Add(prod_calvinklein_calvinklein_low_rise_trunk_3pack);
            var prod_calvinklein_calvinklein_reversible_leather_belt = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catAccessories.Id,
                Name = "Thắt Lưng Da Nam Reversible Leather Plaque Belt",
                Slug = "calvinklein-calvinklein-reversible-leather-belt",
                Sku = "CAL-BELT-3",
                CollectionName = "CK Leather Goods",
                Description = "Thắt Lưng Da Nam Reversible Leather Plaque Belt chính hãng từ Calvin Klein. Chế tác từ Da bò trơn 2 mặt đen và nâu, mặt khóa hợp kim xoay tiện lợi với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1850000m,
                OriginalPrice = 2190000m,
                DiscountPercent = 16,
                ImageUrl = "/img/brands/calvinklein/calvinklein-reversible-leather-belt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-reversible-leather-belt.jpg", "/img/brands/calvinklein/calvinklein-reversible-leather-belt.jpg", "/img/brands/calvinklein/calvinklein-reversible-leather-belt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò trơn 2 mặt đen và nâu, mặt khóa hợp kim xoay tiện lợi",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_reversible_leather_belt.Variants.Add(new ProductVariant { Sku = "CAL-BELT-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 1850000m, StockQuantity = 50 });
            allProducts.Add(prod_calvinklein_calvinklein_reversible_leather_belt);
            var prod_calvinklein_calvinklein_ck_one_eau_de_toilette = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa CK One Unisex Eau de Toilette 100ml",
                Slug = "calvinklein-calvinklein-ck-one-eau-de-toilette",
                Sku = "CAL-TOIL-3",
                CollectionName = "CK Fragrances",
                Description = "Nước Hoa CK One Unisex Eau de Toilette 100ml chính hãng từ Calvin Klein. Chế tác từ Hương thơm cam chanh trà xanh phóng khoáng tươi mát với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1950000m,
                OriginalPrice = 2250000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/calvinklein/calvinklein-ck-one-eau-de-toilette.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-ck-one-eau-de-toilette.jpg", "/img/brands/calvinklein/calvinklein-ck-one-eau-de-toilette.jpg", "/img/brands/calvinklein/calvinklein-ck-one-eau-de-toilette.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương thơm cam chanh trà xanh phóng khoáng tươi mát",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_ck_one_eau_de_toilette.Variants.Add(new ProductVariant { Sku = "CAL-TOIL-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 1950000m, StockQuantity = 50 });
            allProducts.Add(prod_calvinklein_calvinklein_ck_one_eau_de_toilette);
            var prod_calvinklein_calvinklein_minimalist_camera_bag = new Product
            {
                SellerId = seller_calvinklein.Id,
                CategoryId = catAccessories.Id,
                Name = "Túi Đeo Chéo Minimalist Faux Leather Camera Bag",
                Slug = "calvinklein-calvinklein-minimalist-camera-bag",
                Sku = "CAL-BAG-3",
                CollectionName = "CK Bags & Travel",
                Description = "Túi Đeo Chéo Minimalist Faux Leather Camera Bag chính hãng từ Calvin Klein. Chế tác từ Da thuần chay dập vân nhẹ, khóa kéo chắc chắn in nổi logo với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2450000m,
                OriginalPrice = 2890000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/calvinklein/calvinklein-minimalist-camera-bag.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/calvinklein/calvinklein-minimalist-camera-bag.jpg", "/img/brands/calvinklein/calvinklein-minimalist-camera-bag.jpg", "/img/brands/calvinklein/calvinklein-minimalist-camera-bag.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da thuần chay dập vân nhẹ, khóa kéo chắc chắn in nổi logo",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Calvin Klein, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_calvinklein_calvinklein_minimalist_camera_bag.Variants.Add(new ProductVariant { Sku = "CAL-BAG-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 50 });
            allProducts.Add(prod_calvinklein_calvinklein_minimalist_camera_bag);

            var seller_tommyhilfiger = dbUsers.First(u => u.Email == "tommyhilfiger@gmail.com");
            var prod_tommyhilfiger_tommyhilfiger_classic_oxford_shirt = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Sơ Mi Nam Classic Oxford Button-Down Shirt",
                Slug = "tommyhilfiger-tommyhilfiger-classic-oxford-shirt",
                Sku = "TOM-SHIR-2",
                CollectionName = "Tommy Classic Oxford",
                Description = "Áo Sơ Mi Nam Classic Oxford Button-Down Shirt chính hãng từ Tommy Hilfiger. Chế tác từ Chất vải dệt Oxford cotton cao cấp thêu cờ Tommy nhỏ ở ngực với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2450000m,
                OriginalPrice = 2850000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Chất vải dệt Oxford cotton cao cấp thêu cờ Tommy nhỏ ở ngực",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_classic_oxford_shirt.Variants.Add(new ProductVariant { Sku = "TOM-SHIR-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 15 });
            prod_tommyhilfiger_tommyhilfiger_classic_oxford_shirt.Variants.Add(new ProductVariant { Sku = "TOM-SHIR-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 20 });
            prod_tommyhilfiger_tommyhilfiger_classic_oxford_shirt.Variants.Add(new ProductVariant { Sku = "TOM-SHIR-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2450000m, StockQuantity = 15 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_classic_oxford_shirt);
            var prod_tommyhilfiger_tommyhilfiger_colorblock_windbreaker = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Gió Du Thuyền Colorblock Windbreaker Yacht Jacket",
                Slug = "tommyhilfiger-tommyhilfiger-colorblock-windbreaker",
                Sku = "TOM-WIND-2",
                CollectionName = "Tommy Yacht Club",
                Description = "Áo Gió Du Thuyền Colorblock Windbreaker Yacht Jacket chính hãng từ Tommy Hilfiger. Chế tác từ Phối 3 màu cờ Xanh - Trắng - Đỏ biểu tượng thương hiệu Mỹ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3850000m,
                OriginalPrice = 4400000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-colorblock-windbreaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-colorblock-windbreaker.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-colorblock-windbreaker.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-colorblock-windbreaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Phối 3 màu cờ Xanh - Trắng - Đỏ biểu tượng thương hiệu Mỹ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_colorblock_windbreaker.Variants.Add(new ProductVariant { Sku = "TOM-WIND-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 15 });
            prod_tommyhilfiger_tommyhilfiger_colorblock_windbreaker.Variants.Add(new ProductVariant { Sku = "TOM-WIND-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 20 });
            prod_tommyhilfiger_tommyhilfiger_colorblock_windbreaker.Variants.Add(new ProductVariant { Sku = "TOM-WIND-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 3850000m, StockQuantity = 15 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_colorblock_windbreaker);
            var prod_tommyhilfiger_tommyhilfiger_heritage_flag_sweater = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Len Vặn Thừng Heritage Flag Cable Knit Sweater",
                Slug = "tommyhilfiger-tommyhilfiger-heritage-flag-sweater",
                Sku = "TOM-SWEA-2",
                CollectionName = "Tommy Heritage Knit",
                Description = "Áo Len Vặn Thừng Heritage Flag Cable Knit Sweater chính hãng từ Tommy Hilfiger. Chế tác từ Len pha cotton dệt vặn thừng dày dặn giữ ấm phong cách preppy với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 3250000m,
                OriginalPrice = 3750000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-heritage-flag-sweater.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-heritage-flag-sweater.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-heritage-flag-sweater.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-heritage-flag-sweater.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Len pha cotton dệt vặn thừng dày dặn giữ ấm phong cách preppy",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_heritage_flag_sweater.Variants.Add(new ProductVariant { Sku = "TOM-SWEA-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 3250000m, StockQuantity = 15 });
            prod_tommyhilfiger_tommyhilfiger_heritage_flag_sweater.Variants.Add(new ProductVariant { Sku = "TOM-SWEA-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 3250000m, StockQuantity = 20 });
            prod_tommyhilfiger_tommyhilfiger_heritage_flag_sweater.Variants.Add(new ProductVariant { Sku = "TOM-SWEA-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 3250000m, StockQuantity = 15 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_heritage_flag_sweater);
            var prod_tommyhilfiger_tommyhilfiger_straight_fit_chino = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catStreetwear.Id,
                Name = "Quần Kaki Nam Essential Straight Fit Chino Pants",
                Slug = "tommyhilfiger-tommyhilfiger-straight-fit-chino",
                Sku = "TOM-CHIN-2",
                CollectionName = "Tommy Chino Pants",
                Description = "Quần Kaki Nam Essential Straight Fit Chino Pants chính hãng từ Tommy Hilfiger. Chế tác từ Vải twill co giãn nhẹ bền bỉ, đường cắt may ống đứng chuẩn mực với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2250000m,
                OriginalPrice = 2600000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-straight-fit-chino.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-straight-fit-chino.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-straight-fit-chino.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-straight-fit-chino.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Vải twill co giãn nhẹ bền bỉ, đường cắt may ống đứng chuẩn mực",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_straight_fit_chino.Variants.Add(new ProductVariant { Sku = "TOM-CHIN-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 2250000m, StockQuantity = 15 });
            prod_tommyhilfiger_tommyhilfiger_straight_fit_chino.Variants.Add(new ProductVariant { Sku = "TOM-CHIN-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 2250000m, StockQuantity = 20 });
            prod_tommyhilfiger_tommyhilfiger_straight_fit_chino.Variants.Add(new ProductVariant { Sku = "TOM-CHIN-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 2250000m, StockQuantity = 15 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_straight_fit_chino);
            var prod_tommyhilfiger_tommyhilfiger_retro_flag_leather_sneaker = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catSneaker.Id,
                Name = "Giày Sneaker Da Nam Retro Flag Low-Top Leather",
                Slug = "tommyhilfiger-tommyhilfiger-retro-flag-leather-sneaker",
                Sku = "TOM-SNEA-1",
                CollectionName = "Tommy Footwear",
                Description = "Giày Sneaker Da Nam Retro Flag Low-Top Leather chính hãng từ Tommy Hilfiger. Chế tác từ Da bò trắng trơn viền sọc cờ Tommy bên hông, đế cao su êm ái với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 2950000m,
                OriginalPrice = 3400000m,
                DiscountPercent = 13,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-retro-flag-leather-sneaker.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-retro-flag-leather-sneaker.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-retro-flag-leather-sneaker.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-retro-flag-leather-sneaker.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò trắng trơn viền sọc cờ Tommy bên hông, đế cao su êm ái",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_retro_flag_leather_sneaker.Variants.Add(new ProductVariant { Sku = "TOM-SNEA-1-40", Size = "EU 40", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 15 });
            prod_tommyhilfiger_tommyhilfiger_retro_flag_leather_sneaker.Variants.Add(new ProductVariant { Sku = "TOM-SNEA-1-41", Size = "EU 41", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 20 });
            prod_tommyhilfiger_tommyhilfiger_retro_flag_leather_sneaker.Variants.Add(new ProductVariant { Sku = "TOM-SNEA-1-42", Size = "EU 42", Color = "Tiêu chuẩn", Price = 2950000m, StockQuantity = 15 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_retro_flag_leather_sneaker);
            var prod_tommyhilfiger_tommyhilfiger_varsity_wool_bomber = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catStreetwear.Id,
                Name = "Áo Khoác Bóng Chày Varsity Wool Blend Bomber",
                Slug = "tommyhilfiger-tommyhilfiger-varsity-wool-bomber",
                Sku = "TOM-BOMB-2",
                CollectionName = "Tommy Varsity",
                Description = "Áo Khoác Bóng Chày Varsity Wool Blend Bomber chính hãng từ Tommy Hilfiger. Chế tác từ Thân áo len dạ pha da, thêu logo chữ TH phong cách học đường Mỹ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 5950000m,
                OriginalPrice = 6800000m,
                DiscountPercent = 12,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-varsity-wool-bomber.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-varsity-wool-bomber.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-varsity-wool-bomber.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-varsity-wool-bomber.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Thân áo len dạ pha da, thêu logo chữ TH phong cách học đường Mỹ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_varsity_wool_bomber.Variants.Add(new ProductVariant { Sku = "TOM-BOMB-2-S", Size = "Size S", Color = "Tiêu chuẩn", Price = 5950000m, StockQuantity = 15 });
            prod_tommyhilfiger_tommyhilfiger_varsity_wool_bomber.Variants.Add(new ProductVariant { Sku = "TOM-BOMB-2-M", Size = "Size M", Color = "Tiêu chuẩn", Price = 5950000m, StockQuantity = 20 });
            prod_tommyhilfiger_tommyhilfiger_varsity_wool_bomber.Variants.Add(new ProductVariant { Sku = "TOM-BOMB-2-L", Size = "Size L", Color = "Tiêu chuẩn", Price = 5950000m, StockQuantity = 15 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_varsity_wool_bomber);
            var prod_tommyhilfiger_tommyhilfiger_global_stripe_wallet = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catAccessories.Id,
                Name = "Ví Da Gập Nam Global Stripe Leather Billfold Wallet",
                Slug = "tommyhilfiger-tommyhilfiger-global-stripe-wallet",
                Sku = "TOM-WALL-3",
                CollectionName = "Tommy Accessories",
                Description = "Ví Da Gập Nam Global Stripe Leather Billfold Wallet chính hãng từ Tommy Hilfiger. Chế tác từ Da bò cao cấp dập viền sọc cờ nhỏ, 8 ngăn cắm thẻ sang trọng với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1650000m,
                OriginalPrice = 1950000m,
                DiscountPercent = 15,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-global-stripe-wallet.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-global-stripe-wallet.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-global-stripe-wallet.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-global-stripe-wallet.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Da bò cao cấp dập viền sọc cờ nhỏ, 8 ngăn cắm thẻ sang trọng",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_global_stripe_wallet.Variants.Add(new ProductVariant { Sku = "TOM-WALL-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 1650000m, StockQuantity = 50 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_global_stripe_wallet);
            var prod_tommyhilfiger_tommyhilfiger_cologne_spray = new Product
            {
                SellerId = seller_tommyhilfiger.Id,
                CategoryId = catAccessories.Id,
                Name = "Nước Hoa Tommy Girl & Boy Eau de Cologne 100ml",
                Slug = "tommyhilfiger-tommyhilfiger-cologne-spray",
                Sku = "TOM-SPRA-3",
                CollectionName = "Tommy Fragrance",
                Description = "Nước Hoa Tommy Girl & Boy Eau de Cologne 100ml chính hãng từ Tommy Hilfiger. Chế tác từ Hương hoa quả tươi mát ngập tràn năng lượng tuổi trẻ nước Mỹ với quy trình kiểm định chất lượng nghiêm ngặt của nhà mốt.",
                BasePrice = 1850000m,
                OriginalPrice = 2150000m,
                DiscountPercent = 14,
                ImageUrl = "/img/brands/tommyhilfiger/tommyhilfiger-cologne-spray.jpg",
                GalleryUrlsJson = JsonSerializer.Serialize(new[] { "/img/brands/tommyhilfiger/tommyhilfiger-cologne-spray.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-cologne-spray.jpg", "/img/brands/tommyhilfiger/tommyhilfiger-cologne-spray.jpg" }),
                StockQuantity = 50,
                StockStatus = StockStatus.InStock,
                Material = "Hương hoa quả tươi mát ngập tràn năng lượng tuổi trẻ nước Mỹ",
                CareInstructions = "Vệ sinh chuyên biệt, bảo quản trong túi vải thoáng khí tại nơi khô ráo",
                PackagingDetails = "Hộp quà tặng cao cấp của Tommy Hilfiger, túi bụi, ruy băng niêm phong và thẻ xác thực NFC",
                CountryOfOrigin = "Mỹ",
                Rating = 4.9,
                ReviewCount = 86,
                IsActive = true
            };
            prod_tommyhilfiger_tommyhilfiger_cologne_spray.Variants.Add(new ProductVariant { Sku = "TOM-SPRA-3-STD", Size = "Freesize", Color = "Tiêu chuẩn", Price = 1850000m, StockQuantity = 50 });
            allProducts.Add(prod_tommyhilfiger_tommyhilfiger_cologne_spray);

            await context.Products.AddRangeAsync(allProducts);
            await context.SaveChangesAsync();
        }

        // ==========================================
        // 5. SEED ORDERS & TRANSACTIONS
        // ==========================================
        if (!await context.Orders.AnyAsync())
        {
            var customer = await context.Users.FirstOrDefaultAsync(u => u.Email == "esther.howard@example.com");
            var products = await context.Products.Take(10).ToListAsync();

            if (products.Count >= 3)
            {
                var order1 = new Order
                {
                    OrderCode = "AG-2024-7890",
                    UserId = customer?.Id,
                    CustomerName = "Esther Howard",
                    CustomerEmail = "esther.howard@example.com",
                    CustomerPhone = "+84 902 345 678",
                    ShippingAddress = "Villa 18, Vinhomes Riverside, Long Biên, Hà Nội",
                    PaymentMethod = "Thẻ Tín Dụng Quốc Tế (Visa Signature)",
                    Status = OrderStatus.Delivered,
                    PaymentStatus = PaymentStatus.Paid,
                    Carrier = "FedEx Priority Luxury Express",
                    TrackingCode = "FX-VN-882910384",
                    EstimatedDelivery = "Đã giao thành công",
                    LastUpdateLocation = "Kho trung chuyển Nội Bài - Đã ký nhận",
                    ProgressStep = 4,
                    Subtotal = products[0].BasePrice,
                    ShippingCharge = 0,
                    Taxes = 0,
                    Discount = 0,
                    TotalAmount = products[0].BasePrice
                };
                order1.Items.Add(new OrderItem
                {
                    ProductId = products[0].Id,
                    ProductName = products[0].Name,
                    Specs = "EU 41 / Da thật / Fullbox",
                    ImageUrl = products[0].ImageUrl,
                    Price = products[0].BasePrice,
                    Quantity = 1,
                    Subtotal = products[0].BasePrice
                });

                var order2 = new Order
                {
                    OrderCode = "AG-2024-7891",
                    UserId = customer?.Id,
                    CustomerName = "Trần Thị Mai Phương",
                    CustomerEmail = "maiphuong.tran@gmail.com",
                    CustomerPhone = "+84 912 888 999",
                    ShippingAddress = "Penthouse 3201, Diamond Island, Quận 2, TP. Hồ Chí Minh",
                    PaymentMethod = "Chuyển Khoản Ngân Hàng Tức Thời (VietQR Pro)",
                    Status = OrderStatus.Shipped,
                    PaymentStatus = PaymentStatus.Paid,
                    Carrier = "Aethelgard White-Glove Courier",
                    TrackingCode = "AG-VIP-994812",
                    EstimatedDelivery = "Dự kiến giao trong 24 giờ",
                    LastUpdateLocation = "Trung tâm phân loại Tân Sơn Nhất - Đang luân chuyển",
                    ProgressStep = 3,
                    Subtotal = products[1].BasePrice,
                    ShippingCharge = 50000,
                    Taxes = 0,
                    Discount = 0,
                    TotalAmount = products[1].BasePrice + 50000
                };
                order2.Items.Add(new OrderItem
                {
                    ProductId = products[1].Id,
                    ProductName = products[1].Name,
                    Specs = "Size L / Bản giới hạn",
                    ImageUrl = products[1].ImageUrl,
                    Price = products[1].BasePrice,
                    Quantity = 1,
                    Subtotal = products[1].BasePrice
                });

                var order3 = new Order
                {
                    OrderCode = "AG-2024-7892",
                    UserId = customer?.Id,
                    CustomerName = "Lê Hoàng Nam",
                    CustomerEmail = "hoangnam.le@vng.com.vn",
                    CustomerPhone = "+84 983 222 111",
                    ShippingAddress = "Tòa nhà Keangnam Landmark 72, Phạm Hùng, Cầu Giấy, Hà Nội",
                    PaymentMethod = "Thẻ Tín Dụng Quốc Tế (Mastercard World Elite)",
                    Status = OrderStatus.Confirmed,
                    PaymentStatus = PaymentStatus.Paid,
                    Carrier = "FedEx Priority Luxury Express",
                    TrackingCode = "FX-VN-900213441",
                    EstimatedDelivery = "Dự kiến giao ngày mai",
                    LastUpdateLocation = "Đã niêm phong gói hàng tại Boutique chính hãng",
                    ProgressStep = 2,
                    Subtotal = products[2].BasePrice,
                    ShippingCharge = 0,
                    Taxes = 0,
                    Discount = 0,
                    TotalAmount = products[2].BasePrice
                };
                order3.Items.Add(new OrderItem
                {
                    ProductId = products[2].Id,
                    ProductName = products[2].Name,
                    Specs = "EU 42 / Tiêu chuẩn",
                    ImageUrl = products[2].ImageUrl,
                    Price = products[2].BasePrice,
                    Quantity = 1,
                    Subtotal = products[2].BasePrice
                });

                await context.Orders.AddRangeAsync(order1, order2, order3);
                await context.SaveChangesAsync();

                var transactions = new List<TransactionRecord>
                {
                    new TransactionRecord { TransactionCode = "#TXN-04910", CustomerName = order1.CustomerName, ProductName = products[0].Name, Status = "Success", Quantity = 1, UnitPrice = products[0].BasePrice, TotalAmount = order1.TotalAmount },
                    new TransactionRecord { TransactionCode = "#TXN-04911", CustomerName = order2.CustomerName, ProductName = products[1].Name, Status = "Success", Quantity = 1, UnitPrice = products[1].BasePrice, TotalAmount = order2.TotalAmount },
                    new TransactionRecord { TransactionCode = "#TXN-04912", CustomerName = order3.CustomerName, ProductName = products[2].Name, Status = "Success", Quantity = 1, UnitPrice = products[2].BasePrice, TotalAmount = order3.TotalAmount }
                };
                await context.Transactions.AddRangeAsync(transactions);
                await context.SaveChangesAsync();
            }
        }
    }
}