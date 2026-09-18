# AETHELGARD SHOPPING MALL — HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ TÍCH HỢP AI

Dự án hoàn chỉnh được xây dựng và chuẩn hóa 100% từ bản phác thảo kỹ thuật (`sketch/`), áp dụng kiến trúc chuẩn doanh nghiệp:
- **Backend (.NET 10 Web API - N-Tier Architecture)**: Phân tầng chặt chẽ `Ecommerce.API`, `Ecommerce.BLL`, `Ecommerce.DAL`, `Ecommerce.Common`, tích hợp đầy đủ Unit Tests và Integration Tests.
- **Frontend (Next.js 15 / React 19 / TypeScript / Tailwind CSS)**: Tái hiện đầy đủ toàn bộ giao diện, hiệu ứng và luồng nghiệp vụ từ bản phác thảo.
- **Cơ chế nạp dữ liệu (Database Seeder Tool)**: Nạp 20 sản phẩm thực tế, tài khoản người bán, đơn hàng vận chuyển FedEx, ma trận doanh số 12 tháng và mạng lưới Flagship Boutique châu Á.

---

## 👨‍💻 Thông Tin Dự Án
- **Lập trình viên phụ trách:** Nguyễn Đức Mạnh
- **Vai trò chính:** Phân hệ Người Bán (Seller / Merchant System) và Hệ thống Lõi E-Commerce (Core).
- **Thư mục làm việc:** `main/`

---

## 🏛️ Kiến Trúc Hệ Thống

```text
main/
|-- backend/
|   |-- Ecommerce.slnx
|   |-- src/
|   |   |-- Ecommerce.API/             # [Presentation Layer] Controller, Middleware, JWT, Swagger, CORS
|   |   |-- Ecommerce.BLL/             # [Business Logic Layer] Services, AutoMapper, FluentValidation
|   |   |-- Ecommerce.DAL/             # [Data Access Layer] EF Core, UnitOfWork, Repositories, Seeder
|   |   `-- Ecommerce.Common/          # [Domain & Shared] Entities, DTOs, Enums, Exceptions, Constants
|   `-- tests/
|       |-- Ecommerce.Tests.Unit/          # Unit Tests cho BLL (3/3 Passed)
|       `-- Ecommerce.Tests.Integration/   # Integration Tests cho API Endpoints (5/5 Passed)
|
|-- frontend/                              # [Next.js App Router] React 19, TypeScript, Tailwind CSS
|   |-- public/img/                        # Thư viện 25 hình ảnh sản phẩm & boutique thực tế
|   `-- src/app/
|       |-- page.tsx                       # Trang chủ Catalog (Watermark, Search, Filter, Quick View, Giỏ hàng)
|       |-- login/page.tsx                 # Đăng nhập/Đăng ký & Quy trình 3 bước Quên mật khẩu vẽ vector SVG
|       |-- inventory/page.tsx             # Quản lý tồn kho SKU, KPI Cards, Modal Restock nhập hàng
|       |-- orders/page.tsx                # Quản lý đơn hàng, Timeline FedEx Live Tracker 4 chặng
|       |-- income-statistics/page.tsx     # Thống kê thu nhập, Block Matrix Chart 12 tháng, Needle Gauge
|       |-- shop-profile/page.tsx          # Hồ sơ GUCCI Flagship, Chứng nhận Kering, Boutique Locator Hà Nội & HCM
|       `-- product-detail/[id]/page.tsx   # Chi tiết sản phẩm, chọn size, nhận tại Boutique, Trợ lý AI Stylist
|
|-- scripts/
|   |-- start-backend.cmd                  # Khởi động Web API (.NET) tại port 5000
|   |-- start-frontend.cmd                 # Khởi động Frontend (Next.js) tại port 3000
|   `-- seed-database.cmd                  # Tool gửi lệnh nạp toàn bộ CSDL
`-- start-all.cmd                          # Khởi động toàn bộ hệ thống bằng 1 click
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
   - Database SQLite (`fashion_mall.db`) sẽ tự động được khởi tạo và nạp dữ liệu ngay khi chạy.

2. **Khởi động Frontend:**
   ```bash
   cd main/frontend
   npm run dev
   ```
   - Truy cập giao diện: `http://localhost:3000`

3. **Chạy Tool nạp dữ liệu Database Seeder:**
   Khi Backend đang chạy, mở cửa sổ lệnh và chạy:
   ```cmd
   main\scripts\seed-database.cmd
   ```
   Hoặc gọi API `POST http://localhost:5000/api/seed/run`.

---

## 🧪 Kết Quả Kiểm Thử (Automated Testing)

Chạy toàn bộ bài test:
```bash
cd main/backend
dotnet test Ecommerce.slnx
```

- **Ecommerce.Tests.Unit**: 3/3 bài kiểm thử đạt kết quả **PASSED**.
- **Ecommerce.Tests.Integration**: 5/5 bài kiểm thử đạt kết quả **PASSED**.
- **Frontend Build**: `npm run build` đạt kết quả biên dịch hoàn hảo **0 lỗi**, tối ưu hóa và prerender 100% các route tĩnh & động.
