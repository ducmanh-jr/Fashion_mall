using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Ecommerce.Common.Enums;
using Ecommerce.Common.Exceptions;
using Ecommerce.DAL.Interfaces;

namespace Ecommerce.BLL.Services;

public class InventoryService : IInventoryService
{
    private readonly IUnitOfWork _unitOfWork;

    public InventoryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<InventorySummaryDto> GetInventorySummaryAsync()
    {
        var allProducts = await _unitOfWork.Products.GetAllAsync();
        var products = allProducts.Where(p => p.IsActive).ToList();

        var totalSku = products.Count;
        var totalStockItems = products.Sum(p => p.StockQuantity);
        var totalStockValue = products.Sum(p => p.BasePrice * p.StockQuantity);
        var lowStockCount = products.Count(p => p.StockQuantity <= 10);

        var items = products.Select(p => new InventoryItemDto
        {
            Id = p.Id,
            Name = p.Name,
            Sku = p.Sku,
            CategoryName = p.Category?.Name ?? "Fashion",
            ImageUrl = p.ImageUrl,
            Price = p.BasePrice,
            StockQuantity = p.StockQuantity,
            StockStatus = p.StockQuantity == 0 ? "OUT_OF_STOCK" : (p.StockQuantity <= 10 ? "LOW_STOCK" : "IN_STOCK"),
            SafetyThreshold = 10
        }).ToList();

        return new InventorySummaryDto
        {
            TotalSku = totalSku,
            TotalStockItems = totalStockItems,
            TotalStockValue = totalStockValue,
            LowStockAlertCount = lowStockCount,
            Items = items
        };
    }

    public async Task<bool> RestockProductAsync(RestockRequestDto request)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(request.ProductId);
        if (product == null)
            throw new NotFoundException("Sản phẩm", request.ProductId);

        product.StockQuantity += request.AdditionalQuantity;
        if (product.StockQuantity > 10)
            product.StockStatus = StockStatus.InStock;
        else if (product.StockQuantity > 0)
            product.StockStatus = StockStatus.LowStock;

        _unitOfWork.Products.Update(product);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}
