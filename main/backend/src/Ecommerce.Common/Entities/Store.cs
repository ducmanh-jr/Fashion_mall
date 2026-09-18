namespace Ecommerce.Common.Entities;

public class Store : BaseEntity
{
    public string StoreCode { get; set; } = string.Empty; // VN_HN_01
    public string BrandId { get; set; } = string.Empty;   // gucci, adidas...
    public string StoreName { get; set; } = string.Empty; // Gucci Tràng Tiền Plaza
    public string StoreType { get; set; } = string.Empty; // Flagship Boutique
    public string City { get; set; } = string.Empty;      // Hà Nội, TP. Hồ Chí Minh
    public string Country { get; set; } = "Việt Nam";
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string OperatingHours { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? ServicesJson { get; set; }
    public string? CategoriesJson { get; set; }
    public string? ImageUrl { get; set; }
    public string? StoreUrl { get; set; }
}
