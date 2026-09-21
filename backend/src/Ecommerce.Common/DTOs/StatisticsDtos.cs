namespace Ecommerce.Common.DTOs;

public class IncomeSummaryDto
{
    public decimal TotalRevenue { get; set; }
    public decimal MonthlyRevenue { get; set; }
    public int TotalOrders { get; set; }
    public double GrowthPercent { get; set; }
    public List<MonthlyDataDto> MonthlyMatrix { get; set; } = new();
    public List<TransactionDto> RecentTransactions { get; set; } = new();
}

public class MonthlyDataDto
{
    public string Month { get; set; } = string.Empty; // JAN, FEB, MAR...
    public int ExistingUsers { get; set; }
    public int NewUsers { get; set; }
    public string ValTotal { get; set; } = string.Empty; // 14k, 56k...
    public bool IsActive { get; set; }
    public string? NewText { get; set; }
    public string? ExistText { get; set; }
}

public class TransactionDto
{
    public string Id { get; set; } = string.Empty; // #04910
    public string Customer { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public string Status { get; set; } = "Success";
    public int Qty { get; set; }
    public string UnitPrice { get; set; } = string.Empty;
    public string Total { get; set; } = string.Empty;
}
