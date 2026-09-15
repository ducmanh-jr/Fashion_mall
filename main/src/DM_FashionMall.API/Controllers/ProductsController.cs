using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DM_FashionMall.API.Data;

namespace DM_FashionMall.API.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] string? search, [FromQuery] int? categoryId, [FromQuery] int? brandId)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Where(p => p.Status == "ACTIVE");

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(term));
            }

            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            if (brandId.HasValue && brandId.Value > 0)
            {
                query = query.Where(p => p.BrandId == brandId.Value);
            }

            var list = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();

            var result = list.Select(p => new
            {
                p.Id,
                p.Name,
                p.Slug,
                p.BasePrice,
                Category = p.Category?.Name,
                Brand = p.Brand?.Name,
                PrimaryImage = p.Images.FirstOrDefault(i => i.IsPrimary)?.ImageUrl ?? p.Images.FirstOrDefault()?.ImageUrl,
                p.Rating,
                p.IsFeatured,
                Variants = p.Variants.Select(v => new { v.Id, v.Sku, v.Size, v.Color, v.Price, v.StockQuantity })
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var p = await _context.Products
                .Include(x => x.Category)
                .Include(x => x.Brand)
                .Include(x => x.Shop)
                .Include(x => x.Images.OrderBy(i => i.DisplayOrder))
                .Include(x => x.Variants)
                .Include(x => x.Reviews)
                .FirstOrDefaultAsync(x => x.Id == id && x.Status == "ACTIVE");

            if (p == null) return NotFound(new { message = "Không tìm thấy sản phẩm" });

            return Ok(new
            {
                p.Id,
                p.Name,
                p.Slug,
                p.Description,
                p.BasePrice,
                Category = p.Category?.Name,
                Brand = p.Brand?.Name,
                Shop = new { p.Shop?.Id, p.Shop?.ShopName, p.Shop?.Rating },
                Images = p.Images.Select(i => i.ImageUrl),
                Variants = p.Variants.Select(v => new { v.Id, v.Sku, v.Size, v.Color, v.Price, v.StockQuantity }),
                Reviews = p.Reviews.Select(r => new { r.Id, r.CustomerName, r.Rating, r.Comment, r.SellerReply, r.CreatedAt })
            });
        }
    }
}
