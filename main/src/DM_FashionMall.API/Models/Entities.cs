using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DM_FashionMall.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        [MaxLength(20)]
        public string? Phone { get; set; }
        public string? Address { get; set; }
        [Required, MaxLength(20)]
        public string Role { get; set; } = "SELLER"; // CUSTOMER, SELLER, ADMIN
        [MaxLength(10)]
        public string? OtpCode { get; set; }
        public DateTime? OtpExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Shop? Shop { get; set; }
        public SellerWallet? Wallet { get; set; }
    }

    public class Shop
    {
        [Key]
        public int Id { get; set; }
        public int SellerId { get; set; }
        [Required, MaxLength(100)]
        public string ShopName { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Slug { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? Bio { get; set; }
        public string? WarehouseAddress { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public double Rating { get; set; } = 5.0;
        public bool IsVacationMode { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("SellerId")]
        public User? Seller { get; set; }
        public List<Product> Products { get; set; } = new();
        public List<Promotion> Promotions { get; set; } = new();
    }

    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int? ParentId { get; set; }
        public string Status { get; set; } = "ACTIVE";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Brand
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string Slug { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int SellerId { get; set; }
        public int ShopId { get; set; }
        public int CategoryId { get; set; }
        public int? BrandId { get; set; }
        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(255)]
        public string Slug { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal BasePrice { get; set; }
        public double Rating { get; set; } = 5.0;
        public bool IsFeatured { get; set; } = false;
        [Required, MaxLength(50)]
        public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE, DRAFT, DELETED
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ShopId")]
        public Shop? Shop { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
        [ForeignKey("BrandId")]
        public Brand? Brand { get; set; }

        public List<ProductVariant> Variants { get; set; } = new();
        public List<ProductImage> Images { get; set; } = new();
        public Inventory? Inventory { get; set; }
        public List<ProductReview> Reviews { get; set; } = new();
    }

    public class ProductVariant
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        [Required, MaxLength(100)]
        public string Sku { get; set; } = string.Empty;
        [Required, MaxLength(20)]
        public string Size { get; set; } = "FREE";
        [Required, MaxLength(50)]
        public string Color { get; set; } = "Default";
        public decimal Price { get; set; }
        public int StockQuantity { get; set; } = 0;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
    }

    public class ProductImage
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        [Required]
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; } = false;
        public int DisplayOrder { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
    }

    public class Inventory
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 0;
        public int ReservedQuantity { get; set; } = 0;
        public int LowStockThreshold { get; set; } = 5;
        public string Status { get; set; } = "IN_STOCK"; // IN_STOCK, LOW_STOCK, OUT_OF_STOCK
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
    }

    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } = "ACTIVE";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public List<CartItem> Items { get; set; } = new();
    }

    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public int CartId { get; set; }
        public int VariantId { get; set; }
        public int Quantity { get; set; } = 1;
        public decimal PriceAtAddition { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("CartId")]
        public Cart? Cart { get; set; }
        [ForeignKey("VariantId")]
        public ProductVariant? Variant { get; set; }
    }

    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(50)]
        public string OrderCode { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int ShopId { get; set; }
        [Required, MaxLength(100)]
        public string CustomerName { get; set; } = string.Empty;
        [Required, MaxLength(20)]
        public string CustomerPhone { get; set; } = string.Empty;
        [Required]
        public string ShippingAddress { get; set; } = string.Empty;
        public string? Note { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "PENDING"; // PENDING, CONFIRMED, SHIPPING, COMPLETED, CANCELLED
        public string PaymentStatus { get; set; } = "UNPAID"; // UNPAID, PAID, REFUNDED
        public string? ShippingTrackingCode { get; set; }
        public string? ShippingCarrier { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ShopId")]
        public Shop? Shop { get; set; }
        public List<OrderItem> Items { get; set; } = new();
        public Payment? Payment { get; set; }
    }

    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int VariantId { get; set; }
        [Required, MaxLength(255)]
        public string ProductName { get; set; } = string.Empty;
        [Required, MaxLength(20)]
        public string Size { get; set; } = "FREE";
        [Required, MaxLength(50)]
        public string Color { get; set; } = "Default";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Subtotal { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
        [ForeignKey("VariantId")]
        public ProductVariant? Variant { get; set; }
    }

    public class Payment
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        [Required, MaxLength(50)]
        public string PaymentMethod { get; set; } = "COD"; // COD, BANK_TRANSFER, ONLINE
        [MaxLength(100)]
        public string? TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = "PENDING"; // PENDING, PAID, FAILED, REFUNDED
        public DateTime? PaidAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
    }

    public class Promotion
    {
        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        [Required, MaxLength(50)]
        public string VoucherCode { get; set; } = string.Empty;
        [Required, MaxLength(150)]
        public string Title { get; set; } = string.Empty;
        public string DiscountType { get; set; } = "PERCENT"; // PERCENT, FIXED
        public decimal DiscountValue { get; set; }
        public decimal MinOrderValue { get; set; } = 0;
        public int UsageLimit { get; set; } = 100;
        public int UsedCount { get; set; } = 0;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime EndDate { get; set; } = DateTime.UtcNow.AddDays(30);
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ShopId")]
        public Shop? Shop { get; set; }
    }

    public class SellerWallet
    {
        [Key]
        public int Id { get; set; }
        public int SellerId { get; set; }
        public decimal AvailableBalance { get; set; } = 0;
        public decimal PendingBalance { get; set; } = 0;
        [MaxLength(100)]
        public string? BankName { get; set; }
        [MaxLength(50)]
        public string? BankAccountNumber { get; set; }
        [MaxLength(100)]
        public string? BankAccountName { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("SellerId")]
        public User? Seller { get; set; }
        public List<WalletTransaction> Transactions { get; set; } = new();
    }

    public class WalletTransaction
    {
        [Key]
        public int Id { get; set; }
        public int WalletId { get; set; }
        public string Type { get; set; } = "SETTLEMENT"; // SETTLEMENT, WITHDRAW
        public decimal Amount { get; set; }
        public string? Note { get; set; }
        public string Status { get; set; } = "COMPLETED"; // PENDING, COMPLETED, FAILED
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("WalletId")]
        public SellerWallet? Wallet { get; set; }
    }

    public class ProductReview
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
        [Required, MaxLength(100)]
        public string CustomerName { get; set; } = string.Empty;
        public int Rating { get; set; } = 5; // 1 - 5
        public string Comment { get; set; } = string.Empty;
        public string? SellerReply { get; set; }
        public DateTime? ReplyAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
    }

    public class ShippingChannel
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        public string Code { get; set; } = string.Empty;
        public bool IsEnabled { get; set; } = true;
        public decimal Cost { get; set; } = 30000;
        public string EstimatedDays { get; set; } = "2-3 ngày";
    }
}
