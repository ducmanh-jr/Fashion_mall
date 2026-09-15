using System.Threading.Tasks;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Models;

namespace DM_FashionMall.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponse?> LoginSellerAsync(SellerLoginRequest request);
        Task<AuthResponse?> RegisterShopAsync(SellerRegisterShopRequest request);
        string GenerateJwtToken(User user, int? shopId, string? shopName);
    }
}
