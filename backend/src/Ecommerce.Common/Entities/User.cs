using Ecommerce.Common.Enums;

namespace Ecommerce.Common.Entities;

public class User : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Customer;
    public string? PhoneNumber { get; set; }
    public string? AvatarUrl { get; set; }
    public bool IsEmailVerified { get; set; } = true;
    public string? ResetOtp { get; set; }
    public DateTime? ResetOtpExpiry { get; set; }

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
