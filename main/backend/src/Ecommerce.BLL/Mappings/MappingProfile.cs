using AutoMapper;
using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Ecommerce.Common.Entities;

namespace Ecommerce.BLL.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>()
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category != null ? s.Category.Name : string.Empty))
            .ForMember(d => d.StockStatus, opt => opt.MapFrom(s => s.StockStatus.ToString()))
            .ForMember(d => d.GalleryUrls, opt => opt.MapFrom(s => 
                !string.IsNullOrEmpty(s.GalleryUrlsJson) 
                    ? System.Text.Json.JsonSerializer.Deserialize<List<string>>(s.GalleryUrlsJson, (System.Text.Json.JsonSerializerOptions?)null) ?? new List<string>()
                    : new List<string>()));

        CreateMap<ProductVariant, ProductVariantDto>();

        CreateMap<Category, CategoryDto>()
            .ForMember(d => d.ProductCount, opt => opt.MapFrom(s => s.Products.Count));

        CreateMap<Order, OrderDto>()
            .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.StatusLabel, opt => opt.MapFrom(s => GetStatusLabel(s.Status)));

        CreateMap<OrderItem, OrderItemDto>();

        CreateMap<Store, StoreDto>()
            .ForMember(d => d.Services, opt => opt.MapFrom(s => 
                !string.IsNullOrEmpty(s.ServicesJson) 
                    ? System.Text.Json.JsonSerializer.Deserialize<List<string>>(s.ServicesJson, (System.Text.Json.JsonSerializerOptions?)null) ?? new List<string>()
                    : new List<string>()))
            .ForMember(d => d.Categories, opt => opt.MapFrom(s => 
                !string.IsNullOrEmpty(s.CategoriesJson) 
                    ? System.Text.Json.JsonSerializer.Deserialize<List<string>>(s.CategoriesJson, (System.Text.Json.JsonSerializerOptions?)null) ?? new List<string>()
                    : new List<string>()));
    }

    private static string GetStatusLabel(Ecommerce.Common.Enums.OrderStatus status)
    {
        return status switch
        {
            Ecommerce.Common.Enums.OrderStatus.Pending => "Chờ Xác Nhận",
            Ecommerce.Common.Enums.OrderStatus.Confirmed => "Đã Xác Nhận",
            Ecommerce.Common.Enums.OrderStatus.Processing => "Đang Chuẩn Bị Hàng",
            Ecommerce.Common.Enums.OrderStatus.Shipped => "Đang Vận Chuyển",
            Ecommerce.Common.Enums.OrderStatus.Delivered => "Giao Thành Công",
            Ecommerce.Common.Enums.OrderStatus.Cancelled => "Đã Hủy",
            _ => status.ToString()
        };
    }
}
