using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using DM_FashionMall.API.Data;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Models;

namespace DM_FashionMall.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponse?> LoginSellerAsync(SellerLoginRequest request)
        {
            var user = await _context.Users
                .Include(u => u.Shop)
                .FirstOrDefaultAsync(u => u.Email == request.Email.Trim().ToLower());

            if (user == null) return null;

            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValid) return null;

            // If user has no shop yet and is SELLER or ADMIN, auto-link or create a placeholder shop
            Shop? shop = user.Shop;
            if (shop == null && (user.Role == "SELLER" || user.Role == "ADMIN"))
            {
                shop = await _context.Shops.FirstOrDefaultAsync(s => s.SellerId == user.Id);
                if (shop == null)
                {
                    shop = new Shop
                    {
                        SellerId = user.Id,
                        ShopName = $"{user.FullName}'s Boutique",
                        Slug = $"{user.FullName.ToLower().Replace(" ", "-")}-{user.Id}",
                        Rating = 5.0
                    };
                    _context.Shops.Add(shop);
                    await _context.SaveChangesAsync();
                }
            }

            string token = GenerateJwtToken(user, shop?.Id, shop?.ShopName);

            return new AuthResponse
            {
                Token = token,
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                ShopId = shop?.Id,
                ShopName = shop?.ShopName
            };
        }

        public async Task<AuthResponse?> RegisterShopAsync(SellerRegisterShopRequest request)
        {
            string email = request.Email.Trim().ToLower();
            if (await _context.Users.AnyAsync(u => u.Email == email))
            {
                return null; // Email already exists
            }

            var user = new User
            {
                FullName = request.FullName.Trim(),
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Phone = request.Phone,
                Role = "SELLER"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            string baseSlug = request.ShopName.Trim().ToLower().Replace(" ", "-");
            string slug = $"{baseSlug}-{user.Id}";

            var shop = new Shop
            {
                SellerId = user.Id,
                ShopName = request.ShopName.Trim(),
                Slug = slug,
                WarehouseAddress = request.WarehouseAddress,
                Phone = request.Phone,
                Email = email,
                Rating = 5.0
            };
            _context.Shops.Add(shop);

            var wallet = new SellerWallet
            {
                SellerId = user.Id,
                AvailableBalance = 0,
                PendingBalance = 0
            };
            _context.SellerWallets.Add(wallet);

            await _context.SaveChangesAsync();

            string token = GenerateJwtToken(user, shop.Id, shop.ShopName);

            return new AuthResponse
            {
                Token = token,
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                ShopId = shop.Id,
                ShopName = shop.ShopName
            };
        }

        public string GenerateJwtToken(User user, int? shopId, string? shopName)
        {
            var secret = _configuration["Jwt:Key"] ?? "DMFashionMall_SuperSecretKey_ForJwt_2026_DotNet10_BestSellerSystem";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.FullName),
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.Role, user.Role),
                new("ShopId", shopId?.ToString() ?? "0"),
                new("ShopName", shopName ?? "")
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"] ?? "DMFashionMall",
                audience: _configuration["Jwt:Audience"] ?? "DMFashionMallAudience",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
