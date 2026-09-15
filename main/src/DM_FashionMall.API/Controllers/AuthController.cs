using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DM_FashionMall.API.DTOs;
using DM_FashionMall.API.Services;

namespace DM_FashionMall.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("seller/login")]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SellerLoginRequest request)
        {
            var res = await _authService.LoginSellerAsync(request);
            if (res == null)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác." });
            }
            return Ok(res);
        }

        [HttpPost("seller/register-shop")]
        public async Task<IActionResult> RegisterShop([FromBody] SellerRegisterShopRequest request)
        {
            var res = await _authService.RegisterShopAsync(request);
            if (res == null)
            {
                return BadRequest(new { message = "Email này đã được sử dụng." });
            }
            return Ok(res);
        }
    }
}
