namespace Ecommerce.Common.Entities;

public class TransactionRecord : BaseEntity
{
    public string TransactionCode { get; set; } = string.Empty; // #04910
    public string CustomerName { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
    public string Status { get; set; } = "Success"; // Success, Pending, Refunded
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalAmount { get; set; }
}
