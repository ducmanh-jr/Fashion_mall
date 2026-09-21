# AETHELGARD SHOPPING MALL — HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ TÍCH HỢP AI

Hệ thống E-Commerce thời trang cao cấp hoàn chỉnh với kiến trúc chuẩn Enterprise, phân tách rõ ràng 3 phân hệ: **Người Bán (Seller)**, **Khách Hàng (Customer)** và **Quản Trị Viên (Admin)**, hỗ trợ nhóm 5 lập trình viên làm việc song song không xung đột.

- **Backend (.NET 10 Web API - Clean N-Tier)**: Phân tầng nghiêm ngặt `Ecommerce.API`, `Ecommerce.BLL`, `Ecommerce.DAL`, `Ecommerce.Common`, 8/8 Tests tự động Passed (3 Unit Tests + 5 Integration Tests).
- **Frontend (Next.js 15 / React 19 / TypeScript / Tailwind CSS)**: Đã tái cấu trúc sạch sẽ từ Monolithic God-Components sang Component-Driven Architecture (< 200 dòng/component). Tốc độ biên dịch đạt **5.2s (0 lỗi)**.
- **Hệ thống dữ liệu**: SQLite & SQL Server sẵn sàng, có Database Seeder tự động nạp sản phẩm thực tế, đơn hàng vận chuyển FedEx, ma trận doanh số 12 tháng.

---

## 👨‍💻 Thông Tin Dự Án
- **Lập trình viên Lead & Kiến trúc sư:** Nguyễn Đức Mạnh
- **Vai trò chính:** Phân hệ Người Bán (Seller System), Hạ tầng dùng chung (Core Foundation) và Cấu trúc dự án.
- **Tài liệu phối hợp đội ngũ 5 người:** Xem file [`TEAM_COLLABORATION_GUIDE.md`](file:///c:/Users/Admin/ducmanh/main/TEAM_COLLABORATION_GUIDE.md).

---

## 🏛️ Sơ Đồ Cây Cấu Trúc Hệ Thống Chuẩn

```text
main/
├── backend/
│   ├── Ecommerce.slnx
│   ├── src/
│   │   ├── Ecommerce.API/             # [Presentation] Controller, Middleware, JWT, Swagger, CORS
│   │   ├── Ecommerce.BLL/             # [Business Logic] Services (Product, Order, Auth, Inventory, Stats...)
│   │   ├── Ecommerce.DAL/             # [Data Access] EF Core, UnitOfWork, Repositories, DatabaseSeeder
│   │   └── Ecommerce.Common/          # [Domain & Shared] Entities, DTOs (CategoryDto, ProductDto,...), Enums
│   └── tests/
│       ├── Ecommerce.Tests.Unit/          # Unit Tests cho BLL (3/3 Passed)
│       └── Ecommerce.Tests.Integration/   # Integration Tests cho API Endpoints (5/5 Passed)
│
├── frontend/                              # [Next.js App Router] React 19, TypeScript, Tailwind CSS
│   ├── public/img/                        # Thư viện hình ảnh sản phẩm & boutique thực tế
│   └── src/
│       ├── app/                           # Tầng Page Router (< 200 dòng/trang)
│       │   ├── page.tsx                   # [Seller] Trang danh mục sản phẩm của Seller
│       │   ├── orders/page.tsx            # [Seller] Quản lý đơn hàng & Live Tracker FedEx
│       │   ├── inventory/page.tsx         # [Seller] Kiểm soát tồn kho SKU & Restock
│       │   ├── income-statistics/page.tsx # [Seller] Thống kê doanh thu & ma trận 12 tháng
│       │   ├── shop-profile/page.tsx      # [Seller] Hồ sơ cửa hàng Flagship Boutique
│       │   ├── login/page.tsx             # [Shared] Đăng nhập/Đăng ký & Quên mật khẩu OTP
│       │   ├── shop/                      # 🛒 [Customer Devs] Khu vực dành cho Khách hàng
│       │   └── admin/                     # ⚙️ [Admin Devs] Khu vực dành cho Quản trị viên
│       │
│       ├── components/                    # Tầng UI Components chuyên biệt
│       │   ├── ui/                        # 🧩 Shared UI Kit (Button, Modal, Card, Badge, KPICard...)
│       │   ├── seller/                    # 🏪 Components độc quyền Seller (orders, inventory, income...)
│       │   ├── customer/                  # 🛒 Components độc quyền Khách Mua Sắm
│       │   ├── admin/                     # ⚙️ Components độc quyền Ban Quản Trị
│       │   └── auth/                      # 🔒 AuthSlider, LoginForm, RegisterForm, ForgotPasswordFlow
│       │
│       ├── contexts/                      # State Context (AuthContext, ToastContext)
│       ├── hooks/                         # Custom Hooks (useAuth, useToast, useLocalStorage)
│       ├── services/                      # Tầng API Client (auth, product, order, inventory, stats, store)
│       ├── types/                         # TypeScript domain types (auth, product, order, inventory...)
│       └── lib/                           # Tiện ích chung (formatVND, utils, constants)
│
├── scripts/
│   ├── start-backend.cmd                  # Khởi động Web API (.NET) tại port 5000
│   ├── start-frontend.cmd                 # Khởi động Frontend (Next.js) tại port 3000
│   └── seed-database.cmd                  # Tool gửi lệnh nạp toàn bộ CSDL
└── start-all.cmd                          # Khởi động toàn bộ hệ thống bằng 1 click
```

---

## 🚀 Hướng Dẫn Khởi Động Nhanh

### Cách 1: Khởi động tự động bằng 1 cú click (Khuyên dùng)
Nhấp đúp chuột vào file:
```cmd
main\start-all.cmd
```
Hệ thống sẽ tự động khởi động Backend .NET (cổng 5000), Frontend Next.js (cổng 3000) và tự động mở trình duyệt web.

### Cách 2: Khởi động thủ công từng phân hệ

1. **Khởi động Backend:**
   ```bash
   cd main/backend
   dotnet run --project src/Ecommerce.API/Ecommerce.API.csproj --launch-profile http
   ```
   - Swagger API Explorer: `http://localhost:5000/swagger`
   - CSDL SQLite (`fashion_mall.db`) sẽ tự động được khởi tạo và nạp dữ liệu ngay khi chạy.

2. **Khởi động Frontend:**
   ```bash
   cd main/frontend
   npm run dev
   ```
   - Giao diện người bán: `http://localhost:3000`

---

## 🧪 Kết Quả Kiểm Thử (Automated Testing)

1. **Backend Tests:**
   ```bash
   cd main/backend
   dotnet test Ecommerce.slnx
   ```
   - **Ecommerce.Tests.Unit**: 3/3 bài kiểm thử đạt kết quả **PASSED**.
   - **Ecommerce.Tests.Integration**: 5/5 bài kiểm thử đạt kết quả **PASSED**.

2. **Frontend Production Build:**
   ```bash
   cd main/frontend
   npm run build
   ```
   - **Tất cả các route biên dịch hoàn hảo 0 lỗi trong ~5 giây**.
