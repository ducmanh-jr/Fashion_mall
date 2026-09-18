using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly IInventoryService _inventoryService;

    public InventoryController(IInventoryService inventoryService)
    {
        _inventoryService = inventoryService;
    }

    [HttpGet]
    public async Task<ActionResult<InventorySummaryDto>> GetSummary()
    {
        var result = await _inventoryService.GetInventorySummaryAsync();
        return Ok(result);
    }

    [HttpPost("restock")]
    public async Task<IActionResult> Restock([FromBody] RestockRequestDto request)
    {
        var success = await _inventoryService.RestockProductAsync(request);
        return Ok(new { success, message = "Đã nhập hàng thành công vào hệ thống tồn kho sàn." });
    }
}

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly IStatisticsService _statisticsService;

    public StatisticsController(IStatisticsService statisticsService)
    {
        _statisticsService = statisticsService;
    }

    [HttpGet("income")]
    public async Task<ActionResult<IncomeSummaryDto>> GetIncomeStatistics()
    {
        var result = await _statisticsService.GetIncomeStatisticsAsync();
        return Ok(result);
    }
}
