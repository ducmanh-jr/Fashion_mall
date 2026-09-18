using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Ecommerce.Common.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders([FromQuery] OrderStatus? status)
    {
        var result = await _orderService.GetOrdersAsync(status);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(int id)
    {
        var result = await _orderService.GetOrderByIdAsync(id);
        return Ok(result);
    }

    [HttpGet("code/{orderCode}")]
    public async Task<ActionResult<OrderDto>> GetOrderByCode(string orderCode)
    {
        var result = await _orderService.GetOrderByCodeAsync(orderCode);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto request)
    {
        var result = await _orderService.CreateOrderAsync(request);
        return CreatedAtAction(nameof(GetOrderById), new { id = result.Id }, result);
    }

    [HttpPatch("{id:int}/status")]
    public async Task<ActionResult<OrderDto>> UpdateStatus(int id, [FromBody] UpdateOrderStatusDto request)
    {
        var result = await _orderService.UpdateOrderStatusAsync(id, request);
        return Ok(result);
    }
}
