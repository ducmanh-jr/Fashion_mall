# 👥 QUY CHUẨN LÀM VIỆC & PHỐI HỢP DỰ ÁN CHO ĐỘI NGŨ 5 THÀNH VIÊN
### Aethelgard Shopping Mall — Hệ Thống Thương Mại Điện Tử Thời Trang

---

## 🎯 1. Phân Công Nhân Sự & Phân Vùng Mã Nguồn

| Vai Trò | Phụ Trách | Khu Vực Làm Việc Chính (Frontend) | Nhiệm Vụ Trọng Tâm |
| :--- | :--- | :--- | :--- |
| **Architect & Seller Lead** | **Nguyễn Đức Mạnh** | `src/components/seller/`<br/>`src/app/`, `src/app/orders/`, `src/app/inventory/`, `src/app/income-statistics/`<br/>`src/services/`, `src/types/`, `src/lib/` | Thiết lập kiến trúc chuẩn, quản trị nền tảng lõi, hoàn thiện toàn bộ phân hệ Người Bán (Seller). |
| **Customer Frontend Dev 1** | Thành viên A | `src/components/customer/`<br/>`src/app/shop/page.tsx` | Trang chủ mua sắm khách hàng, Banner thời trang, Danh mục và Bộ lọc khách hàng. |
| **Customer Frontend Dev 2** | Thành viên B | `src/components/customer/`<br/>`src/app/shop/products/[id]/`, `src/app/shop/cart/` | Chi tiết sản phẩm, Trợ lý ảo AI Stylist tư vấn phối đồ, Giỏ hàng & Checkout thanh toán. |
| **Admin Frontend Dev 1** | Thành viên C | `src/components/admin/`<br/>`src/app/admin/dashboard/`, `src/app/admin/sellers/` | Dashboard quản trị sàn, Quản lý & duyệt đối tác bán lẻ (Seller KYC), Phí sàn. |
| **Admin Frontend Dev 2** | Thành viên D | `src/components/admin/`<br/>`src/app/admin/categories/`, `src/app/admin/reports/` | Quản lý cây danh mục sản phẩm toàn sàn, Báo cáo rủi ro & giải quyết khiếu nại. |

---

## 🏛️ 2. Sơ Đồ Cây Cấu Trúc Mã Nguồn Sau Chuẩn Hóa

```text
main/
├── backend/                                # [.NET 10 Web API - Clean N-Tier]
│   ├── src/
│   │   ├── Ecommerce.API/                  # Controllers, Middlewares, DI Setup, Swagger
│   │   ├── Ecommerce.BLL/                  # Business Logic, Services (Product, Order, Auth, v.v.)
│   │   ├── Ecommerce.DAL/                  # EF Core, UnitOfWork, Repositories, DatabaseSeeder
│   │   └── Ecommerce.Common/               # Entities, DTOs (CategoryDto, ProductDto,...), Enums
│   └── tests/                              # Unit Tests & Integration Tests (100% Passed)
│
├── frontend/                               # [Next.js 15 / React 19 / TypeScript]
│   ├── src/
│   │   ├── app/                            # Route Handlers & Pages
│   │   │   ├── page.tsx                    # [Seller] Trang quản lý danh mục sản phẩm (~200 dòng)
│   │   │   ├── orders/page.tsx             # [Seller] Quản lý đơn hàng & Live Tracker (~140 dòng)
│   │   │   ├── inventory/page.tsx          # [Seller] Quản lý tồn kho SKU & Restock (~180 dòng)
│   │   │   ├── income-statistics/page.tsx  # [Seller] Thống kê doanh thu & ma trận 12 tháng (~190 dòng)
│   │   │   ├── shop-profile/page.tsx       # [Seller] Hồ sơ cửa hàng Flagship Boutique
│   │   │   ├── login/page.tsx              # [Shared] Đăng nhập, Đăng ký & Quên mật khẩu (~110 dòng)
│   │   │   ├── shop/                       # [Customer] Dành riêng cho 2 dev Khách Hàng
│   │   │   └── admin/                      # [Admin] Dành riêng cho 2 dev Quản Trị Viên
│   │   │
│   │   ├── components/                     # Tách nhỏ Component (< 250 dòng/component)
│   │   │   ├── ui/                         # 🧩 UI Kit DÙNG CHUNG (Button, Modal, Card, Input, Badge...)
│   │   │   ├── seller/                     # 🏪 Độc quyền phân hệ Người Bán (Đức Mạnh quản lý)
│   │   │   │   ├── orders/                 # OrderKpiCards, OrderFilterBar, OrderTable, OrderTrackingDrawer
│   │   │   │   ├── inventory/              # InventoryKpis, InventoryTable, RestockModal
│   │   │   │   └── income/                 # MonthlyMatrixChart, NeedleGaugeChart, TransactionsTable
│   │   │   ├── customer/                   # 🛒 Độc quyền phân hệ Khách Hàng (Customer Devs)
│   │   │   ├── admin/                      # ⚙️ Độc quyền phân hệ Quản Trị Viên (Admin Devs)
│   │   │   └── auth/                       # 🔒 AuthSlider, LoginForm, RegisterForm, ForgotPasswordFlow
│   │   │
│   │   ├── contexts/                       # State quản lý tập trung (AuthContext, ToastContext)
│   │   ├── hooks/                          # Custom Hooks (useAuth, useToast, useLocalStorage)
│   │   ├── services/                       # Tầng API Client (auth, product, order, inventory, stats)
│   │   ├── types/                          # Kiểu dữ liệu TypeScript chuẩn hóa theo domain
│   │   ├── lib/                            # Hàm tiện ích dùng chung (formatVND, cn, calculateFinancials)
│   │   └── styles/                         # CSS Module & Global Stylesheets
```

---

## ⚡ 3. Ba Nguyên Tắc Bất Di Bất Dịch Để Không Bao Giờ Xung Đột (No-Conflict Rules)

1. **Nguyên tắc "Đất Ai Người Nấy Làm":**
   - Dev Khách Hàng chỉ tạo file trong `components/customer/` và `app/shop/`.
   - Dev Admin chỉ tạo file trong `components/admin/` và `app/admin/`.
   - Tuyệt đối không chạm vào code của nhau.

2. **Dùng chung hạ tầng đã dựng sẵn:**
   - Không tự viết lại hàm format tiền, dùng ngay: `import { formatVND } from '@/lib/utils'`.
   - Không tự code lại Toast thông báo, dùng ngay: `const { showToast } = useToast()`.
   - Không tự code lại logic đăng nhập/đăng xuất, dùng ngay: `const { user, logout } = useAuth()`.
   - Không tự gọi `fetch('http://localhost:5000...')`, gọi qua: `@/services/...`.

3. **Quy tắc Kiểm thử trước khi tạo Pull Request (PR):**
   - Mỗi thành viên trước khi đẩy code lên Git bắt buộc phải chạy lệnh:
     ```bash
     npm --prefix frontend run build
     ```
   - Chỉ được tạo PR khi màn hình hiển thị: **`✓ Compiled successfully` (0 errors)**.
