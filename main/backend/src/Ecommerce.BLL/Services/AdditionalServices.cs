using AutoMapper;
using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Ecommerce.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.BLL.Services;

public class StoreService : IStoreService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public StoreService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<List<StoreDto>> GetAllStoresAsync()
    {
        var stores = await _unitOfWork.Stores.GetAllAsync();
        return _mapper.Map<List<StoreDto>>(stores);
    }

    public async Task<StoreDto?> GetStoreByCodeAsync(string storeCode)
    {
        var store = (await _unitOfWork.Stores.FindAsync(s => s.StoreCode.ToLower() == storeCode.ToLower())).FirstOrDefault();
        return store != null ? _mapper.Map<StoreDto>(store) : null;
    }
}

public class AIService : IAIService
{
    private readonly IUnitOfWork _unitOfWork;

    public AIService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<string> GenerateOutfitRecommendationAsync(string query, int? productId = null)
    {
        if (productId.HasValue)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(productId.Value);
            if (product != null)
            {
                return $"[AI Fashion Stylist]: Đối với sản phẩm '{product.Name}' mang phong cách {product.CollectionName ?? "Luxury"}, bạn nên phối cùng quần nỉ ống rộng dáng suông màu tối và áo khoác bomber hoặc jacket denim oversize. Hoàn thiện set đồ với kính mát gọng chữ nhật Double G để tăng nét thanh lịch, thượng lưu.";
            }
        }

        return "[AI Fashion Stylist]: Xu hướng phối đồ thời thượng hiện nay là phong cách High-Low kết hợp giữa giày sneaker biểu tượng (Adidas Samba OG hoặc Gucci Ace) cùng áo nỉ form rộng và phụ kiện kính râm tối giản.";
    }
}
