namespace Ecommerce.Common.Entities;

public class ProductVariant : BaseEntity
{
    public int ProductId { get; set; }
    public Product? Product { get; set; }

    public string Size { get; set; } = string.Empty; // S, M, L, XL, 40, 41, 42...
    public string Color { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int StockQuantity { get; set; } = 0;
}
