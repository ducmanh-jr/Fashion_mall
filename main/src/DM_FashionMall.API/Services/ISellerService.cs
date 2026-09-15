using System.Collections.Generic;
using System.Threading.Tasks;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Models;

namespace DM_FashionMall.API.Services
{
    public interface ISellerService
    {
        // 2. Dashboard
        Task<DashboardMetricsDto> GetDashboardMetricsAsync(int shopId);
        Task<List<SalesChartItemDto>> GetSalesChartDataAsync(int shopId, int days = 7);

        // 3. Shop Profile
        Task<ShopProfileDto?> GetShopProfileAsync(int shopId);
        Task<bool> UpdateShopProfileAsync(int shopId, UpdateShopProfileRequest request);

        // 4, 5, 6. Products
        Task<List<ProductListItemDto>> GetProductsAsync(int shopId, string? search, int? categoryId, string? status);
        Task<ProductDetailDto?> GetProductDetailAsync(int shopId, int productId);
        Task<ProductDetailDto> CreateProductAsync(int sellerId, int shopId, SaveProductRequest request);
        Task<bool> UpdateProductAsync(int shopId, int productId, SaveProductRequest request);
        Task<bool> DeleteProductAsync(int shopId, int productId);
        Task<bool> ToggleProductStatusAsync(int shopId, int productId);

        // 7. Inventory
        Task<List<InventoryItemDto>> GetInventoryAsync(int shopId, bool lowStockOnly = false);
        Task<bool> QuickUpdateStockAsync(int shopId, QuickUpdateStockRequest request);

        // 8, 9. Orders
        Task<List<OrderListItemDto>> GetOrdersAsync(int shopId, string? status = null);
        Task<OrderDetailDto?> GetOrderDetailAsync(int shopId, int orderId);
        Task<bool> UpdateOrderStatusAsync(int shopId, int orderId, UpdateOrderStatusRequest request);

        // 10. Shipping
        Task<List<ShippingChannelDto>> GetShippingChannelsAsync();
        Task<bool> ToggleShippingChannelAsync(int channelId);

        // 11. Promotions
        Task<List<PromotionDto>> GetPromotionsAsync(int shopId);
        Task<PromotionDto> CreatePromotionAsync(int shopId, CreatePromotionRequest request);
        Task<bool> DeletePromotionAsync(int shopId, int promoId);

        // 12. Finance
        Task<WalletDto?> GetWalletAsync(int sellerId);
        Task<bool> RequestWithdrawAsync(int sellerId, WithdrawRequest request);

        // 13. Analytics
        Task<AnalyticsOverviewDto> GetAnalyticsOverviewAsync(int shopId);

        // 14. Reviews
        Task<List<ReviewDto>> GetReviewsAsync(int shopId, int? rating = null);
        Task<bool> ReplyReviewAsync(int shopId, int reviewId, ReplyReviewRequest request);

        // 15. Settings
        Task<SettingsDto?> GetSettingsAsync(int shopId);
        Task<bool> UpdateSettingsAsync(int shopId, UpdateSettingsRequest request);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordRequest request);

        // AI Copywriter
        Task<AiGenerateDescriptionResponse> GenerateProductDescriptionAsync(AiGenerateDescriptionRequest request);

        // Master Data Helpers
        Task<List<Category>> GetCategoriesAsync();
        Task<List<Brand>> GetBrandsAsync();
    }
}
