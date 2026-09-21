namespace Ecommerce.Common.DTOs;

public class InventorySummaryDto
{
    public int TotalSku { get; set; }
    public int TotalStockItems { get; set; }
    public decimal TotalStockValue { get; set; }
    public int LowStockAlertCount { get; set; }
    public List<InventoryItemDto> Items { get; set; } = new();
}

public class InventoryItemDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string StockStatus { get; set; } = string.Empty;
    public int SafetyThreshold { get; set; } = 10;
}

public class RestockRequestDto
{
    public int ProductId { get; set; }
    public int AdditionalQuantity { get; set; }
}
