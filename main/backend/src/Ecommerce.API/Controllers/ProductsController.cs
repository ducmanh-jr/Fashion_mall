using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResultDto<ProductDto>>> GetProducts([FromQuery] ProductFilterDto filter)
    {
        var result = await _productService.GetProductsAsync(filter);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetProductById(int id)
    {
        var result = await _productService.GetProductByIdAsync(id);
        return Ok(result);
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<ProductDto>> GetProductBySlug(string slug)
    {
        var result = await _productService.GetProductBySlugAsync(slug);
        return Ok(result);
    }

    [HttpGet("categories")]
    public async Task<ActionResult<List<CategoryDto>>> GetCategories()
    {
        var result = await _productService.GetCategoriesAsync();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto request)
    {
        var result = await _productService.CreateProductAsync(request, 1);
        return CreatedAtAction(nameof(GetProductById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] CreateProductDto request)
    {
        var result = await _productService.UpdateProductAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var success = await _productService.DeleteProductAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}
