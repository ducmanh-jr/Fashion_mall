namespace Ecommerce.Common.Enums;

public enum UserRole
{
    Admin = 1,
    Seller = 2,
    Customer = 3
}

public enum OrderStatus
{
    Pending = 1,
    Confirmed = 2,
    Processing = 3,
    Shipped = 4,
    Delivered = 5,
    Cancelled = 6
}

public enum PaymentStatus
{
    Pending = 1,
    Paid = 2,
    Failed = 3,
    Refunded = 4
}

public enum StockStatus
{
    InStock = 1,
    LowStock = 2,
    OutOfStock = 3
}
