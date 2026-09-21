using Ecommerce.Common.Enums;

namespace Ecommerce.Common.Entities;

public class Order : BaseEntity
{
    public string OrderCode { get; set; } = string.Empty; // AG-2024-7890
    public int? UserId { get; set; }
    public User? User { get; set; }

    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;

    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Paid;

    public string Carrier { get; set; } = "FedEx Logistics";
    public string TrackingCode { get; set; } = string.Empty;
    public string EstimatedDelivery { get; set; } = string.Empty;
    public string? LastUpdateLocation { get; set; }
    public int ProgressStep { get; set; } = 1; // 1: Ordered, 2: Confirmed, 3: Shipped, 4: Delivered

    public decimal Subtotal { get; set; }
    public decimal ShippingCharge { get; set; } = 0;
    public decimal Taxes { get; set; } = 0;
    public decimal Discount { get; set; } = 0;
    public decimal TotalAmount { get; set; }

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
