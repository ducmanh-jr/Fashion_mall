using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Services;

namespace DM_FashionMall.API.Controllers
{
    [ApiController]
    [Route("api/seller")]
    public class SellerController : ControllerBase
    {
        private readonly ISellerService _sellerService;

        public SellerController(ISellerService sellerService)
        {
            _sellerService = sellerService;
        }

        private int GetCurrentShopId()
        {
            if (Request.Headers.TryGetValue("X-Shop-Id", out var headerVal) && int.TryParse(headerVal, out int hId))
            {
                return hId;
            }

            var shopClaim = User.FindFirst("ShopId")?.Value;
            if (int.TryParse(shopClaim, out int sId) && sId > 0)
            {
                return sId;
            }

            return 1; // Default sample shop ID
        }

        private int GetCurrentUserId()
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userClaim, out int uId) && uId > 0)
            {
                return uId;
            }

            return 1; // Default sample user ID
        }

        // 2. Dashboard
        [HttpGet("dashboard/metrics")]
        public async Task<IActionResult> GetDashboardMetrics()
        {
            var metrics = await _sellerService.GetDashboardMetricsAsync(GetCurrentShopId());
            return Ok(metrics);
        }

        [HttpGet("dashboard/chart")]
        public async Task<IActionResult> GetSalesChart([FromQuery] int days = 7)
        {
            var data = await _sellerService.GetSalesChartDataAsync(GetCurrentShopId(), days);
            return Ok(data);
        }

        // 3. Shop Profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var profile = await _sellerService.GetShopProfileAsync(GetCurrentShopId());
            if (profile == null) return NotFound(new { message = "Không tìm thấy hồ sơ shop" });
            return Ok(profile);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateShopProfileRequest request)
        {
            var success = await _sellerService.UpdateShopProfileAsync(GetCurrentShopId(), request);
            if (!success) return BadRequest(new { message = "Cập nhật hồ sơ shop thất bại" });
            return Ok(new { message = "Cập nhật hồ sơ shop thành công" });
        }

        // 4, 5, 6. Products
        [HttpGet("products")]
        public async Task<IActionResult> GetProducts([FromQuery] string? search, [FromQuery] int? categoryId, [FromQuery] string? status)
        {
            var list = await _sellerService.GetProductsAsync(GetCurrentShopId(), search, categoryId, status);
            return Ok(list);
        }

        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var prod = await _sellerService.GetProductDetailAsync(GetCurrentShopId(), id);
            if (prod == null) return NotFound(new { message = "Không tìm thấy sản phẩm" });
            return Ok(prod);
        }

        [HttpPost("products")]
        public async Task<IActionResult> CreateProduct([FromBody] SaveProductRequest request)
        {
            var created = await _sellerService.CreateProductAsync(GetCurrentUserId(), GetCurrentShopId(), request);
            return CreatedAtAction(nameof(GetProduct), new { id = created.Id }, created);
        }

        [HttpPut("products/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] SaveProductRequest request)
        {
            var success = await _sellerService.UpdateProductAsync(GetCurrentShopId(), id, request);
            if (!success) return NotFound(new { message = "Không tìm thấy sản phẩm để cập nhật" });
            return Ok(new { message = "Cập nhật sản phẩm thành công" });
        }

        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _sellerService.DeleteProductAsync(GetCurrentShopId(), id);
            if (!success) return NotFound(new { message = "Không tìm thấy sản phẩm" });
            return Ok(new { message = "Xóa sản phẩm thành công" });
        }

        [HttpPatch("products/{id}/status")]
        public async Task<IActionResult> ToggleProductStatus(int id)
        {
            var success = await _sellerService.ToggleProductStatusAsync(GetCurrentShopId(), id);
            if (!success) return NotFound(new { message = "Không tìm thấy sản phẩm" });
            return Ok(new { message = "Chuyển trạng thái sản phẩm thành công" });
        }
        // 7. Inventory
        [HttpGet("inventory")]
        public async Task<IActionResult> GetInventory([FromQuery] bool lowStockOnly = false)
        {
            var list = await _sellerService.GetInventoryAsync(GetCurrentShopId(), lowStockOnly);
            return Ok(list);
        }

        [HttpPatch("inventory/quick-update")]
        public async Task<IActionResult> QuickUpdateStock([FromBody] QuickUpdateStockRequest request)
        {
            var success = await _sellerService.QuickUpdateStockAsync(GetCurrentShopId(), request);
            if (!success) return NotFound(new { message = "Không tìm thấy sản phẩm/biến thể để cập nhật kho" });
            return Ok(new { message = "Cập nhật tồn kho thành công" });
        }

        // 8, 9. Orders
        [HttpGet("orders")]
        public async Task<IActionResult> GetOrders([FromQuery] string? status = null)
        {
            var list = await _sellerService.GetOrdersAsync(GetCurrentShopId(), status);
            return Ok(list);
        }

        [HttpGet("orders/{id}")]
        public async Task<IActionResult> GetOrderDetail(int id)
        {
            var order = await _sellerService.GetOrderDetailAsync(GetCurrentShopId(), id);
            if (order == null) return NotFound(new { message = "Không tìm thấy đơn hàng" });
            return Ok(order);
        }

        [HttpPut("orders/{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusRequest request)
        {
            var success = await _sellerService.UpdateOrderStatusAsync(GetCurrentShopId(), id, request);
            if (!success) return NotFound(new { message = "Không tìm thấy đơn hàng để cập nhật trạng thái" });
            return Ok(new { message = $"Đã cập nhật trạng thái đơn hàng sang {request.Status}" });
        }

        // 10. Shipping
        [HttpGet("shipping/channels")]
        public async Task<IActionResult> GetShippingChannels()
        {
            var channels = await _sellerService.GetShippingChannelsAsync();
            return Ok(channels);
        }

        [HttpPost("shipping/channels/{id}/toggle")]
        public async Task<IActionResult> ToggleShippingChannel(int id)
        {
            var success = await _sellerService.ToggleShippingChannelAsync(id);
            if (!success) return NotFound(new { message = "Không tìm thấy kênh vận chuyển" });
            return Ok(new { message = "Đã cập nhật trạng thái kênh vận chuyển" });
        }

        // 11. Promotions
        [HttpGet("promotions")]
        public async Task<IActionResult> GetPromotions()
        {
            var list = await _sellerService.GetPromotionsAsync(GetCurrentShopId());
            return Ok(list);
        }

        [HttpPost("promotions")]
        public async Task<IActionResult> CreatePromotion([FromBody] CreatePromotionRequest request)
        {
            var promo = await _sellerService.CreatePromotionAsync(GetCurrentShopId(), request);
            return Ok(promo);
        }

        [HttpDelete("promotions/{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var success = await _sellerService.DeletePromotionAsync(GetCurrentShopId(), id);
            if (!success) return NotFound(new { message = "Không tìm thấy mã khuyến mãi" });
            return Ok(new { message = "Xóa mã khuyến mãi thành công" });
        }

        // 12. Finance
        [HttpGet("finance/wallet")]
        public async Task<IActionResult> GetWallet()
        {
            var wallet = await _sellerService.GetWalletAsync(GetCurrentUserId());
            if (wallet == null) return NotFound(new { message = "Không tìm thấy ví người bán" });
            return Ok(wallet);
        }

        [HttpPost("finance/withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] WithdrawRequest request)
        {
            var success = await _sellerService.RequestWithdrawAsync(GetCurrentUserId(), request);
            if (!success) return BadRequest(new { message = "Số dư không đủ hoặc thông tin ngân hàng không hợp lệ" });
            return Ok(new { message = "Lệnh rút tiền đã được thực hiện thành công" });
        }

        // 13. Analytics
        [HttpGet("analytics/overview")]
        public async Task<IActionResult> GetAnalyticsOverview()
        {
            var data = await _sellerService.GetAnalyticsOverviewAsync(GetCurrentShopId());
            return Ok(data);
        }

        // 14. Reviews
        [HttpGet("reviews")]
        public async Task<IActionResult> GetReviews([FromQuery] int? rating = null)
        {
            var list = await _sellerService.GetReviewsAsync(GetCurrentShopId(), rating);
            return Ok(list);
        }

        [HttpPost("reviews/{id}/reply")]
        public async Task<IActionResult> ReplyReview(int id, [FromBody] ReplyReviewRequest request)
        {
            var success = await _sellerService.ReplyReviewAsync(GetCurrentShopId(), id, request);
            if (!success) return NotFound(new { message = "Không tìm thấy đánh giá" });
            return Ok(new { message = "Đã gửi phản hồi đánh giá thành công" });
        }

        // 15. Settings
        [HttpGet("settings")]
        public async Task<IActionResult> GetSettings()
        {
            var settings = await _sellerService.GetSettingsAsync(GetCurrentShopId());
            return Ok(settings);
        }

        [HttpPut("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] UpdateSettingsRequest request)
        {
            var success = await _sellerService.UpdateSettingsAsync(GetCurrentShopId(), request);
            if (!success) return BadRequest(new { message = "Cập nhật cài đặt thất bại" });
            return Ok(new { message = "Cập nhật cài đặt thành công" });
        }

        [HttpPost("settings/change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var success = await _sellerService.ChangePasswordAsync(GetCurrentUserId(), request);
            if (!success) return BadRequest(new { message = "Mật khẩu hiện tại không chính xác" });
            return Ok(new { message = "Đổi mật khẩu thành công" });
        }

        // AI Copywriter
        [HttpPost("ai/generate-description")]
        public async Task<IActionResult> GenerateDescription([FromBody] AiGenerateDescriptionRequest request)
        {
            var result = await _sellerService.GenerateProductDescriptionAsync(request);
            return Ok(result);
        }

        // Helpers
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var cats = await _sellerService.GetCategoriesAsync();
            return Ok(cats);
        }

        [HttpGet("brands")]
        public async Task<IActionResult> GetBrands()
        {
            var brands = await _sellerService.GetBrandsAsync();
            return Ok(brands);
        }
    }
}
