using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DM_FashionMall.API.DTOs
{
    // 1. Auth DTOs
    public class SellerLoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class SellerRegisterShopRequest
    {
        [Required]
        public string FullName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, MinLength(6)]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string ShopName { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? WarehouseAddress { get; set; }
    }

    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public int? ShopId { get; set; }
        public string? ShopName { get; set; }
    }

    // 2. Dashboard DTOs
    public class DashboardMetricsDto
    {
        public decimal TodayRevenue { get; set; }
        public int PendingOrders { get; set; }
        public int LowStockProducts { get; set; }
        public int NewReviews { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalProducts { get; set; }
        public int TotalOrders { get; set; }
        public double AverageRating { get; set; }
    }

    public class SalesChartItemDto
    {
        public string Date { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
        public int OrderCount { get; set; }
    }

    // 3. Shop Profile DTOs
    public class ShopProfileDto
    {
        public int Id { get; set; }
        public string ShopName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? Bio { get; set; }
        public string? WarehouseAddress { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public double Rating { get; set; }
        public bool IsVacationMode { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class UpdateShopProfileRequest
    {
        [Required]
        public string ShopName { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? Bio { get; set; }
        public string? WarehouseAddress { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public bool IsVacationMode { get; set; }
    }

    // 4, 5, 6. Product DTOs
    public class ProductVariantDto
    {
        public int? Id { get; set; }
        public string Sku { get; set; } = string.Empty;
        public string Size { get; set; } = "FREE";
        public string Color { get; set; } = "Default";
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class ProductListItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? CategoryName { get; set; }
        public string? BrandName { get; set; }
        public decimal BasePrice { get; set; }
        public int TotalStock { get; set; }
        public string Status { get; set; } = "ACTIVE";
        public string? PrimaryImageUrl { get; set; }
        public double Rating { get; set; }
        public int VariantCount { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ProductDetailDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int? BrandId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal BasePrice { get; set; }
        public string Status { get; set; } = "ACTIVE";
        public bool IsFeatured { get; set; }
        public List<string> ImageUrls { get; set; } = new();
        public List<ProductVariantDto> Variants { get; set; } = new();
        public int TotalStock { get; set; }
    }

    public class SaveProductRequest
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public int CategoryId { get; set; }
        public int? BrandId { get; set; }
        public string? Description { get; set; }
        [Range(0, 1000000000)]
        public decimal BasePrice { get; set; }
        public string Status { get; set; } = "ACTIVE";
        public bool IsFeatured { get; set; } = false;
        public List<string> Images { get; set; } = new();
        public List<ProductVariantDto> Variants { get; set; } = new();
    }

    // 7. Inventory DTOs
    public class InventoryItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? PrimaryImageUrl { get; set; }
        public int TotalQuantity { get; set; }
        public int ReservedQuantity { get; set; }
        public int AvailableQuantity => Math.Max(0, TotalQuantity - ReservedQuantity);
        public int LowStockThreshold { get; set; }
        public string Status { get; set; } = "IN_STOCK";
        public List<ProductVariantDto> Variants { get; set; } = new();
    }

    public class QuickUpdateStockRequest
    {
        public int ProductId { get; set; }
        public int? VariantId { get; set; }
        public int NewQuantity { get; set; }
    }

    // 8, 9. Order DTOs
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int VariantId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }
    }

    public class OrderListItemDto
    {
        public int Id { get; set; }
        public string OrderCode { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public int ItemCount { get; set; }
        public string? ShippingTrackingCode { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class OrderDetailDto
    {
        public int Id { get; set; }
        public string OrderCode { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public string? Note { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = "COD";
        public string? ShippingTrackingCode { get; set; }
        public string? ShippingCarrier { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }

    public class UpdateOrderStatusRequest
    {
        [Required]
        public string Status { get; set; } = string.Empty; // CONFIRMED, SHIPPING, COMPLETED, CANCELLED
        public string? ShippingTrackingCode { get; set; }
        public string? ShippingCarrier { get; set; }
    }

    // 10. Shipping DTOs
    public class ShippingChannelDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsEnabled { get; set; }
        public decimal Cost { get; set; }
        public string EstimatedDays { get; set; } = string.Empty;
    }

    // 11. Promotion DTOs
    public class PromotionDto
    {
        public int Id { get; set; }
        public string VoucherCode { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string DiscountType { get; set; } = "PERCENT";
        public decimal DiscountValue { get; set; }
        public decimal MinOrderValue { get; set; }
        public int UsageLimit { get; set; }
        public int UsedCount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreatePromotionRequest
    {
        [Required]
        public string VoucherCode { get; set; } = string.Empty;
        [Required]
        public string Title { get; set; } = string.Empty;
        public string DiscountType { get; set; } = "PERCENT"; // PERCENT, FIXED
        public decimal DiscountValue { get; set; }
        public decimal MinOrderValue { get; set; } = 0;
        public int UsageLimit { get; set; } = 100;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime EndDate { get; set; } = DateTime.UtcNow.AddDays(30);
    }

    // 12. Finance DTOs
    public class WalletDto
    {
        public decimal AvailableBalance { get; set; }
        public decimal PendingBalance { get; set; }
        public string? BankName { get; set; }
        public string? BankAccountNumber { get; set; }
        public string? BankAccountName { get; set; }
        public List<WalletTransactionDto> Transactions { get; set; } = new();
    }

    public class WalletTransactionDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string? Note { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class WithdrawRequest
    {
        [Range(50000, 500000000)]
        public decimal Amount { get; set; }
        [Required]
        public string BankName { get; set; } = string.Empty;
        [Required]
        public string BankAccountNumber { get; set; } = string.Empty;
        [Required]
        public string BankAccountName { get; set; } = string.Empty;
    }

    // 13. Analytics DTOs
    public class AnalyticsOverviewDto
    {
        public decimal TotalRevenue { get; set; }
        public int TotalOrders { get; set; }
        public int TotalViews { get; set; }
        public double ConversionRate { get; set; }
        public List<SalesChartItemDto> DailyRevenue { get; set; } = new();
        public List<TopProductDto> TopProducts { get; set; } = new();
    }

    public class TopProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public int UnitsSold { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    // 14. Review DTOs
    public class ReviewDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string? SellerReply { get; set; }
        public DateTime? ReplyAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ReplyReviewRequest
    {
        [Required]
        public string Reply { get; set; } = string.Empty;
    }

    // 15. Settings DTOs
    public class SettingsDto
    {
        public bool IsVacationMode { get; set; }
        public bool EmailNotifications { get; set; } = true;
        public bool AutoConfirmOrders { get; set; } = false;
        public string? Hotline { get; set; }
        public string? SupportEmail { get; set; }
    }

    public class UpdateSettingsRequest
    {
        public bool IsVacationMode { get; set; }
        public bool EmailNotifications { get; set; }
        public bool AutoConfirmOrders { get; set; }
    }

    public class ChangePasswordRequest
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;
        [Required, MinLength(6)]
        public string NewPassword { get; set; } = string.Empty;
    }

    // AI Generation DTOs
    public class AiGenerateDescriptionRequest
    {
        [Required]
        public string ProductName { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? Brand { get; set; }
        public string? Material { get; set; }
        public string? TargetAudience { get; set; }
        public string? Tone { get; set; } // Luxury, Streetwear, Casual, Persuasive
    }

    public class AiGenerateDescriptionResponse
    {
        public string GeneratedDescription { get; set; } = string.Empty;
        public List<string> KeyFeatures { get; set; } = new();
        public string SeoKeywords { get; set; } = string.Empty;
    }
}
