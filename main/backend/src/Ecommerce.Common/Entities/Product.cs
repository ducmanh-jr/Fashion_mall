using Ecommerce.Common.Enums;

namespace Ecommerce.Common.Entities;

public class Product : BaseEntity
{
    public int SellerId { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public string? CollectionName { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public decimal? OriginalPrice { get; set; }
    public int DiscountPercent { get; set; } = 0;
    public string ImageUrl { get; set; } = string.Empty;
    public string? GalleryUrlsJson { get; set; }
    public int StockQuantity { get; set; } = 0;
    public StockStatus StockStatus { get; set; } = StockStatus.InStock;
    public string? Material { get; set; }
    public string? CareInstructions { get; set; }
    public string? PackagingDetails { get; set; }
    public string? CountryOfOrigin { get; set; }
    public double Rating { get; set; } = 4.9;
    public int ReviewCount { get; set; } = 120;
    public bool IsActive { get; set; } = true;

    public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
