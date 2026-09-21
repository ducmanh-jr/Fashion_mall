using Ecommerce.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce.DAL.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Name).IsRequired().HasMaxLength(255);
        builder.Property(p => p.Sku).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Slug).HasMaxLength(300);
        builder.Property(p => p.BasePrice).HasColumnType("decimal(18,2)");
        builder.Property(p => p.OriginalPrice).HasColumnType("decimal(18,2)");

        builder.HasIndex(p => p.Sku).IsUnique();
        builder.HasIndex(p => p.Slug);
        builder.HasIndex(p => p.SellerId);

        builder.HasOne(p => p.Category)
               .WithMany(c => c.Products)
               .HasForeignKey(p => p.CategoryId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(p => p.Variants)
               .WithOne(v => v.Product)
               .HasForeignKey(v => v.ProductId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);
        builder.Property(o => o.OrderCode).IsRequired().HasMaxLength(50);
        builder.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
        builder.Property(o => o.Subtotal).HasColumnType("decimal(18,2)");
        builder.Property(o => o.ShippingCharge).HasColumnType("decimal(18,2)");
        builder.Property(o => o.Taxes).HasColumnType("decimal(18,2)");
        builder.Property(o => o.Discount).HasColumnType("decimal(18,2)");

        builder.HasIndex(o => o.OrderCode).IsUnique();
        builder.HasIndex(o => o.UserId);

        builder.HasOne(o => o.User)
               .WithMany(u => u.Orders)
               .HasForeignKey(o => o.UserId)
               .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(o => o.Items)
               .WithOne(i => i.Order)
               .HasForeignKey(i => i.OrderId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(oi => oi.Id);
        builder.Property(oi => oi.Price).HasColumnType("decimal(18,2)");
        builder.Property(oi => oi.Subtotal).HasColumnType("decimal(18,2)");
        builder.Property(oi => oi.ProductName).IsRequired().HasMaxLength(255);

        builder.HasOne(oi => oi.Product)
               .WithMany(p => p.OrderItems)
               .HasForeignKey(oi => oi.ProductId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}

public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.HasKey(v => v.Id);
        builder.Property(v => v.Price).HasColumnType("decimal(18,2)");
        builder.Property(v => v.Size).HasMaxLength(20);
        builder.Property(v => v.Color).HasMaxLength(50);
        builder.Property(v => v.Sku).HasMaxLength(100);

        builder.HasIndex(v => v.Sku);
    }
}

public class TransactionRecordConfiguration : IEntityTypeConfiguration<TransactionRecord>
{
    public void Configure(EntityTypeBuilder<TransactionRecord> builder)
    {
        builder.HasKey(t => t.Id);
        builder.Property(t => t.UnitPrice).HasColumnType("decimal(18,2)");
        builder.Property(t => t.TotalAmount).HasColumnType("decimal(18,2)");
        builder.Property(t => t.TransactionCode).IsRequired().HasMaxLength(50);
        builder.Property(t => t.Status).HasMaxLength(20);

        builder.HasIndex(t => t.TransactionCode);
    }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
        builder.Property(u => u.FullName).IsRequired().HasMaxLength(200);
        builder.Property(u => u.PasswordHash).IsRequired();
        builder.Property(u => u.PhoneNumber).HasMaxLength(20);

        builder.HasIndex(u => u.Email).IsUnique();
    }
}

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Name).IsRequired().HasMaxLength(100);
        builder.Property(c => c.Slug).HasMaxLength(150);

        builder.HasIndex(c => c.Slug).IsUnique();
    }
}

public class StoreConfiguration : IEntityTypeConfiguration<Store>
{
    public void Configure(EntityTypeBuilder<Store> builder)
    {
        builder.HasKey(s => s.Id);
        builder.Property(s => s.StoreCode).IsRequired().HasMaxLength(30);
        builder.Property(s => s.StoreName).IsRequired().HasMaxLength(200);
        builder.Property(s => s.BrandId).HasMaxLength(50);
        builder.Property(s => s.Email).HasMaxLength(255);
        builder.Property(s => s.Phone).HasMaxLength(20);

        builder.HasIndex(s => s.StoreCode).IsUnique();
        builder.HasIndex(s => s.BrandId);
    }
}
