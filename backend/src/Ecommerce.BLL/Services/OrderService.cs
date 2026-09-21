using AutoMapper;
using Ecommerce.BLL.Interfaces;
using Ecommerce.Common.DTOs;
using Ecommerce.Common.Entities;
using Ecommerce.Common.Enums;
using Ecommerce.Common.Exceptions;
using Ecommerce.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.BLL.Services;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<List<OrderDto>> GetOrdersAsync(OrderStatus? status = null)
    {
        var query = _unitOfWork.Orders.Query()
            .Include(o => o.Items)
            .AsQueryable();

        if (status.HasValue)
        {
            query = query.Where(o => o.Status == status.Value);
        }

        var orders = await query.OrderByDescending(o => o.Id).ToListAsync();
        return _mapper.Map<List<OrderDto>>(orders);
    }

    public async Task<OrderDto> GetOrderByIdAsync(int id)
    {
        var order = await _unitOfWork.Orders.Query()
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            throw new NotFoundException("Đơn hàng", id);

        return _mapper.Map<OrderDto>(order);
    }

    public async Task<OrderDto> GetOrderByCodeAsync(string orderCode)
    {
        var order = await _unitOfWork.Orders.Query()
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.OrderCode.ToLower() == orderCode.ToLower());

        if (order == null)
            throw new NotFoundException($"Không tìm thấy đơn hàng mã '{orderCode}'.");

        return _mapper.Map<OrderDto>(order);
    }

    public async Task<OrderDto> CreateOrderAsync(CreateOrderDto request, int? userId = null)
    {
        if (request.Items == null || !request.Items.Any())
            throw new BadRequestException("Đơn hàng phải có ít nhất 1 sản phẩm.");

        var orderCode = $"AG-{DateTime.UtcNow.Year}-{Random.Shared.Next(1000, 9999)}";
        var trackingCode = $"{Random.Shared.NextInt64(100000000000, 999999999999)}";

        decimal subtotal = 0;
        var orderItems = new List<OrderItem>();

        foreach (var item in request.Items)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
            if (product == null)
                throw new NotFoundException("Sản phẩm trong giỏ", item.ProductId);

            var itemSubtotal = product.BasePrice * item.Quantity;
            subtotal += itemSubtotal;

            orderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                Specs = item.Specs,
                ImageUrl = product.ImageUrl,
                Price = product.BasePrice,
                Quantity = item.Quantity,
                Subtotal = itemSubtotal
            });

            // Giảm tồn kho
            if (product.StockQuantity >= item.Quantity)
            {
                product.StockQuantity -= item.Quantity;
                if (product.StockQuantity == 0)
                    product.StockStatus = StockStatus.OutOfStock;
                else if (product.StockQuantity <= 10)
                    product.StockStatus = StockStatus.LowStock;
                _unitOfWork.Products.Update(product);
            }
        }

        var shippingCharge = subtotal > 10000000 ? 0 : 50000;
        var taxes = Math.Round(subtotal * 0.08m, 0);
        var totalAmount = subtotal + shippingCharge + taxes;

        var order = new Order
        {
            OrderCode = orderCode,
            UserId = userId,
            CustomerName = request.CustomerName,
            CustomerEmail = request.CustomerEmail,
            CustomerPhone = request.CustomerPhone,
            ShippingAddress = request.ShippingAddress,
            PaymentMethod = request.PaymentMethod,
            Status = OrderStatus.Pending,
            PaymentStatus = PaymentStatus.Paid,
            Carrier = "FedEx Logistics",
            TrackingCode = trackingCode,
            EstimatedDelivery = DateTime.UtcNow.AddDays(3).ToString("dd/MM/yyyy"),
            LastUpdateLocation = "Hệ thống sàn Aethelgard Mall tiếp nhận",
            ProgressStep = 1,
            Subtotal = subtotal,
            ShippingCharge = shippingCharge,
            Taxes = taxes,
            Discount = 0,
            TotalAmount = totalAmount,
            Items = orderItems
        };

        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        return await GetOrderByIdAsync(order.Id);
    }

    public async Task<OrderDto> UpdateOrderStatusAsync(int id, UpdateOrderStatusDto request)
    {
        var order = await _unitOfWork.Orders.Query()
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            throw new NotFoundException("Đơn hàng", id);

        order.Status = request.Status;
        if (!string.IsNullOrEmpty(request.Location))
            order.LastUpdateLocation = request.Location;

        order.ProgressStep = request.Status switch
        {
            OrderStatus.Pending => 1,
            OrderStatus.Confirmed => 2,
            OrderStatus.Processing => 2,
            OrderStatus.Shipped => 3,
            OrderStatus.Delivered => 4,
            _ => order.ProgressStep
        };

        _unitOfWork.Orders.Update(order);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<OrderDto>(order);
    }
}
