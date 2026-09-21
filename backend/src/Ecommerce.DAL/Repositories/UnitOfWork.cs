using Ecommerce.Common.Entities;
using Ecommerce.DAL.Context;
using Ecommerce.DAL.Interfaces;

namespace Ecommerce.DAL.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IGenericRepository<User>? _users;
    private IGenericRepository<Product>? _products;
    private IGenericRepository<Category>? _categories;
    private IGenericRepository<ProductVariant>? _variants;
    private IGenericRepository<Order>? _orders;
    private IGenericRepository<OrderItem>? _orderItems;
    private IGenericRepository<Store>? _stores;
    private IGenericRepository<TransactionRecord>? _transactions;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IGenericRepository<User> Users => _users ??= new GenericRepository<User>(_context);
    public IGenericRepository<Product> Products => _products ??= new GenericRepository<Product>(_context);
    public IGenericRepository<Category> Categories => _categories ??= new GenericRepository<Category>(_context);
    public IGenericRepository<ProductVariant> ProductVariants => _variants ??= new GenericRepository<ProductVariant>(_context);
    public IGenericRepository<Order> Orders => _orders ??= new GenericRepository<Order>(_context);
    public IGenericRepository<OrderItem> OrderItems => _orderItems ??= new GenericRepository<OrderItem>(_context);
    public IGenericRepository<Store> Stores => _stores ??= new GenericRepository<Store>(_context);
    public IGenericRepository<TransactionRecord> Transactions => _transactions ??= new GenericRepository<TransactionRecord>(_context);

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}
