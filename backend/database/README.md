# 📦 Database — Aethelgard Shopping Mall

## Cấu trúc

```
database/
├── schema.sql          # DDL script tạo toàn bộ schema (idempotent, chạy lại được)
└── README.md           # File này
```

## Thông tin kết nối

| Thuộc tính | Giá trị |
|-----------|---------|
| **Server** | `localhost\SQLEXPRESS` |
| **Database** | `fashion_mall` |
| **Authentication** | Windows Integrated Security |
| **Connection String** | `Server=localhost\SQLEXPRESS;Database=fashion_mall;Integrated Security=True;TrustServerCertificate=True;MultipleActiveResultSets=True;` |

## Cách sử dụng

### Tạo database mới từ code (khuyến nghị)
```bash
# EF Core sẽ tự apply migration + seed data khi chạy backend
cd backend
dotnet run --project src/Ecommerce.API
```

### Tạo database từ file SQL
```bash
# Bước 1: Tạo database
sqlcmd -S localhost\SQLEXPRESS -E -C -Q "CREATE DATABASE fashion_mall;"

# Bước 2: Chạy schema
sqlcmd -S localhost\SQLEXPRESS -E -C -d fashion_mall -i database/schema.sql
```

### Tạo migration mới khi thay đổi Entity
```bash
cd backend
dotnet ef migrations add <TenMigration> --project src/Ecommerce.DAL --startup-project src/Ecommerce.API --output-dir Migrations

# Export ra SQL
dotnet ef migrations script --project src/Ecommerce.DAL --startup-project src/Ecommerce.API --output database/schema.sql --idempotent
```

## Schema Overview

| Table | Mô tả | Records (Seed) |
|-------|-------|----------------|
| `Users` | Tài khoản (Admin, Seller, Customer) | 23 |
| `Categories` | Danh mục sản phẩm | 4 |
| `Products` | Sản phẩm thời trang | 180 |
| `ProductVariants` | Biến thể (size, màu) | 368 |
| `Orders` | Đơn hàng | 3 |
| `OrderItems` | Chi tiết đơn hàng | 3 |
| `Stores` | Cửa hàng vật lý | 23 |
| `Transactions` | Giao dịch tài chính | 3 |

## Tài khoản mặc định (Seed)

| Email | Mật khẩu | Role |
|-------|----------|------|
| `ducmanh@gmail.com` | `Password123@` | Seller |
| `admin@gmail.com` | `Password123@` | Admin |
| `gucci@gmail.com` | `Password123@` | Seller |
