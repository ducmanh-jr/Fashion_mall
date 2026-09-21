namespace Ecommerce.Common.DTOs;

public class StoreDto
{
    public int Id { get; set; }
    public string StoreCode { get; set; } = string.Empty;
    public string BrandId { get; set; } = string.Empty;
    public string StoreName { get; set; } = string.Empty;
    public string StoreType { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string OperatingHours { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public List<string> Services { get; set; } = new();
    public List<string> Categories { get; set; } = new();
    public string? ImageUrl { get; set; }
    public string? StoreUrl { get; set; }
}
