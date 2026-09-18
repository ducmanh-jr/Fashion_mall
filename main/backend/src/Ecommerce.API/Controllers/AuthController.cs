using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);
        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<ActionResult<LoginResponseDto>> Register([FromBody] RegisterRequestDto request)
    {
        var result = await _authService.RegisterAsync(request);
        return Ok(result);
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto request)
    {
        await _authService.SendPasswordResetOtpAsync(request);
        return Ok(new { success = true, message = "Mã OTP đặt lại mật khẩu đã được gửi đến email của bạn." });
    }

    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto request)
    {
        var isValid = await _authService.VerifyOtpAsync(request);
        if (!isValid)
            return BadRequest(new { success = false, message = "Mã OTP không hợp lệ hoặc đã hết hạn." });

        return Ok(new { success = true, message = "Xác thực OTP thành công." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto request)
    {
        await _authService.ResetPasswordAsync(request);
        return Ok(new { success = true, message = "Đặt lại mật khẩu thành công. Vui lòng đăng nhập với mật khẩu mới." });
    }
}
