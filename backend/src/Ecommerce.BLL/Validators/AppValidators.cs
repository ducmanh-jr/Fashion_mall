using Ecommerce.Common.DTOs;
using FluentValidation;

namespace Ecommerce.BLL.Validators;

public class LoginRequestValidator : AbstractValidator<LoginRequestDto>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithMessage("Email không được để trống").EmailAddress().WithMessage("Email không hợp lệ");
        RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu không được để trống").MinimumLength(6).WithMessage("Mật khẩu tối thiểu 6 ký tự");
    }
}

public class RegisterRequestValidator : AbstractValidator<RegisterRequestDto>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.FullName).NotEmpty().WithMessage("Họ và tên không được để trống");
        RuleFor(x => x.Email).NotEmpty().WithMessage("Email không được để trống").EmailAddress().WithMessage("Email không hợp lệ");
        RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu không được để trống").MinimumLength(6).WithMessage("Mật khẩu tối thiểu 6 ký tự");
    }
}

public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Tên sản phẩm không được để trống");
        RuleFor(x => x.Sku).NotEmpty().WithMessage("Mã SKU không được để trống");
        RuleFor(x => x.BasePrice).GreaterThan(0).WithMessage("Giá bán phải lớn hơn 0");
        RuleFor(x => x.CategoryId).GreaterThan(0).WithMessage("Vui lòng chọn danh mục hợp lệ");
    }
}
