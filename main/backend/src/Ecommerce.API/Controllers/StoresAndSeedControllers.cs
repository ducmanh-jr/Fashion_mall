using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Ecommerce.DAL.Context;
using Ecommerce.DAL.Seed;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StoresController : ControllerBase
{
    private readonly IStoreService _storeService;

    public StoresController(IStoreService storeService)
    {
        _storeService = storeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<StoreDto>>> GetAllStores()
    {
        var stores = await _storeService.GetAllStoresAsync();
        return Ok(stores);
    }

    [HttpGet("{storeCode}")]
    public async Task<ActionResult<StoreDto>> GetStoreByCode(string storeCode)
    {
        var store = await _storeService.GetStoreByCodeAsync(storeCode);
        if (store == null) return NotFound();
        return Ok(store);
    }
}

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IAIService _aiService;

    public AIController(IAIService aiService)
    {
        _aiService = aiService;
    }

    [HttpGet("recommend")]
    public async Task<IActionResult> GetRecommendation([FromQuery] string query, [FromQuery] int? productId)
    {
        var recommendation = await _aiService.GenerateOutfitRecommendationAsync(query, productId);
        return Ok(new { recommendation });
    }
}

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<SeedController> _logger;

    public SeedController(ApplicationDbContext context, ILogger<SeedController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost("run")]
    public async Task<IActionResult> RunSeeder()
    {
        _logger.LogInformation("Kích hoạt nạp dữ liệu bản phác thảo E-Commerce...");
        await DatabaseSeeder.SeedAsync(_context);
        return Ok(new 
        { 
            success = true, 
            message = "Khởi tạo và nạp thành công 20 sản phẩm, đơn hàng FedEx, boutique store và dữ liệu tài chính vào CSDL!" 
        });
    }
}
