using Ecommerce.Common.Enums;

namespace Ecommerce.Common.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    public string OrderCode { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string StatusLabel { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string Carrier { get; set; } = "FedEx Logistics";
    public string TrackingCode { get; set; } = string.Empty;
    public string EstimatedDelivery { get; set; } = string.Empty;
    public string? LastUpdateLocation { get; set; }
    public int ProgressStep { get; set; }
    public decimal Subtotal { get; set; }
    public decimal ShippingCharge { get; set; }
    public decimal Taxes { get; set; }
    public decimal Discount { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}

public class OrderItemDto
{
    public int Id { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string Specs { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}

public class CreateOrderDto
{
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = "Thẻ Tín Dụng / Visa";
    public List<CreateOrderItemDto> Items { get; set; } = new();
}

public class CreateOrderItemDto
{
    public int ProductId { get; set; }
    public string Specs { get; set; } = string.Empty;
    public int Quantity { get; set; } = 1;
}

public class UpdateOrderStatusDto
{
    public OrderStatus Status { get; set; }
    public string? Location { get; set; }
}
