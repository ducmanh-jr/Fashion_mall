# 🛍️ DM Fashion Mall — Hệ Thống Thương Mại Điện Tử Thời Trang Tích Hợp AI
## 🏪 Phân Hệ Trọng Tâm: Cổng Quản Trị Người Bán (Seller Center & Merchant System)

[![GitHub Repo](https://img.shields.io/badge/GitHub-ducmanh--jr%2FFashion__mall-181717?style=for-the-badge&logo=github)](https://github.com/ducmanh-jr/Fashion_mall)
[![Team Project](https://img.shields.io/badge/Team_Repo-longthan12334%2FHTTMDTTHA-blue?style=for-the-badge&logo=git)](https://github.com/longthan12334/He-thong-thuong-mai-ien-tu-tich-hop-AI)
[![Role](https://img.shields.io/badge/Core_Role-SELLER_SYSTEM_OWNER-indigo?style=for-the-badge&logo=shopify)]()
[![TypeScript](https://img.shields.io/badge/Backend-TypeScript%20%7C%20Node.js-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Java Spring Boot](https://img.shields.io/badge/Data_Studio-Spring_Boot_3.3.3-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/)
[![Developer](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-ff69b4?style=for-the-badge&logo=visualstudiocode)]()

---

## 📖 1. Giới Thiệu Tổng Quan & Vai Trò Trong Dự Án

Trong đề tài lớn **"Hệ thống thương mại điện tử tích hợp AI" (HTTMDTTHA)**, sinh viên **Nguyễn Đức Mạnh** đảm nhiệm **toàn quyền phát triển Phân Hệ Người Bán (Seller / Merchant System)** và **Hệ thống Lõi E-Commerce (Core Engine)** của sàn thời trang cao cấp **DM Fashion Mall** (Aethelgard Shopping Mall).

Phân hệ Người Bán là "trái tim" vận hành nguồn cung sản phẩm, quản lý kho hàng và xử lý dòng tiền của toàn bộ sàn thương mại điện tử, tuân thủ quy trình phát triển **Agile/Scrum** quản lý qua hệ thống **Jira**.

---

## 🏪 2. CHI TIẾT NHIỆM VỤ PHÂN HỆ NGƯỜI BÁN (SELLER RESPONSIBILITIES)

Toàn bộ các yêu cầu nghiệp vụ của Người bán được thiết kế và hiện thực hóa qua các Sprint:

### 📦 2.1. Quản lý Gian Hàng & Đăng Bán Sản Phẩm (Product Catalog Management)
- **Đăng bán sản phẩm đa thuộc tính:** Người bán tạo sản phẩm mới (`seller_id`), liên kết danh mục (`category_id`) và thương hiệu (`brand_id`).
- **Quản lý đa biến thể (Product Variants):** Cấu hình linh hoạt kích thước (Size S/M/L/XL/Free), Màu sắc (Color), Mã định danh sản phẩm duy nhất (SKU) và giá bán riêng cho từng biến thể.
- **Tải lên thư viện ảnh:** Upload và sắp xếp tối đa 5 hình ảnh sản phẩm (`Product_Images`) với cơ chế ảnh đại diện chính (Primary Thumbnail).
- **Kiểm soát trạng thái sản phẩm:** Hỗ trợ chuyển đổi trạng thái: Đang bán (`ACTIVE`), Tạm ẩn (`INACTIVE`), Bản nháp (`DRAFT`), Đã xóa (`DELETED`).

### 📊 2.2. Kiểm Soát & Quản Trị Kho Hàng (Inventory & Stock Control)
- **Theo dõi số lượng tồn kho thực tế:** Quản lý số lượng tồn (`quantity`) và số lượng đang giữ chờ thanh toán (`reserved_quantity`).
- **Trừ kho an toàn trong Transaction:** Khi có khách đặt hàng, hệ thống tự động trừ kho tức thì, ngăn chặn hiện tượng bán vượt tồn kho (Overselling).
- **Cơ chế cảnh báo hết hàng:** Tự động phát hiện ngưỡng tồn kho thấp (`low_stock_threshold <= 5`) để cảnh báo người bán nhập thêm hàng và tự động cập nhật trạng thái `OUT_OF_STOCK` khi hết hàng.

### 🚚 2.3. Xử Lý Vận Đơn & Vòng Đời Đơn Hàng (Order Fulfillment & Lifecycle)
- **Tiếp nhận đơn hàng mới:** Nhận đơn hàng ở trạng thái `PENDING` có chứa các mặt hàng thuộc gian hàng của mình.
- **Xác nhận & Bàn giao vận chuyển:** Thao tác Người bán chuyển trạng thái sang `CONFIRMED` (Đã duyệt) ➔ `SHIPPING` (Đã giao đơn vị vận chuyển).
- **Xử lý hủy đơn & Tự động hoàn kho:** Khi đơn hàng bị hủy (`CANCELLED`), hệ thống tự động hoàn trả số lượng biến thể về kho hàng.

### 🛠️ 2.4. Bộ Công Cụ Dữ Liệu Cho Người Bán (Fashion Data Tools Studio)
- Xây dựng phân hệ độc lập bằng **Java 21 & Spring Boot 3.3.3**.
- Công cụ cào và trích xuất thông số, hình ảnh, bảng giá tự động từ các thương hiệu thời trang quốc tế lớn (Nike, Adidas, Puma, Balenciaga, Gucci).
- Hỗ trợ Người bán xuất/nhập danh mục sản phẩm hàng loạt qua file mẫu **Excel (Apache POI)** và lưu trữ trên CSDL H2.

### 🤖 2.5. Định Hướng Tích Hợp AI Cho Người Bán (AI Power Tools for Seller)
- **AI Viết bài mô tả sản phẩm (Product Description Generator):** Người bán chỉ cần nhập tên sản phẩm cơ bản ➔ Trợ lý AI tự động sinh bài viết mô tả sản phẩm chuẩn SEO, văn phong thời trang hấp dẫn.
- **AI Đề xuất phân loại & gắn tag thông minh:** Hỗ trợ người bán phân loại sản phẩm vào đúng danh mục thời trang xu hướng.

---

## 📂 3. Cấu Trúc Dự Án Toàn Diện

```text
DM_Fashion_mall_other_ducmanh/
├── 📁 main/                             # [CORE CHÍNH] Hệ thống E-Commerce & Cổng Seller bằng TypeScript
│   ├── 📁 src/                          # Backend TypeScript chuẩn MVC (Type-Safe)
│   │   ├── 📁 types/                    # Định nghĩa Types/DTO cho User, Product, Variant, Cart, Order
│   │   ├── 📁 database/                 # CSDL SQLite Native (12 bảng), Migrations & Seed data
│   │   ├── 📁 services/                 # Nghiệp vụ Seller, Sản phẩm, Giỏ hàng, Đơn hàng, Xác thực
│   │   ├── 📁 controllers/              # Bộ điều khiển REST API
│   │   ├── 📁 middlewares/              # Xác thực JWT Token & Phân quyền Role (CUSTOMER / SELLER / ADMIN)
│   │   └── server.ts                    # Entry point Express App
│   ├── 📁 public/                       # Frontend Web Portal động (Catalog, Auth 50:50, Giỏ hàng, Seller)
│   └── 📁 tests/                        # Bộ kiểm thử tích hợp tự động End-to-End (12/12 PASS)
├── 📁 branches/                         # [CÁC NHÁNH NHÓM] Đồng bộ mã nguồn của 4 thành viên (Git Worktree)
│   ├── 📁 huyhoang/                     # Nhánh Hoàng: Backend .NET C#, Mobile Expo, Web React, Payment
│   ├── 📁 long1/                        # Nhánh Long: CSDL MySQL/Postgres Sprint 2, sơ đồ ERD & RBAC
│   ├── 📁 sprint2-Bac/                  # Nhánh Bắc: Backend Node.js xác thực & kết quả test
│   ├── 📁 tricong/                      # Nhánh Công: Tài liệu kiến trúc Module AI (CLIP, LLM, FastAPI)
│   └── 📁 main-team/                    # Nhánh main gốc ban đầu của nhóm
├── 📁 report/                           # Thư mục Báo cáo chi tiết tiến độ, mã Jira & minh chứng kiểm thử
│   ├── 📄 README.md                     # Báo cáo tổng hợp toàn diện (149/149 test cases pass)
│   ├── 📄 sprint-2-auth-security.md     # Báo cáo chuyên sâu Sprint 2 (Xác thực & Bảo mật)
│   └── 📄 sprint-3-ecommerce-core.md    # Báo cáo chuyên sâu Sprint 3 (CSDL 10 bảng, Quản lý sản phẩm, Đơn hàng)
├── 📁 sprint/                           # Toàn bộ mã nguồn & ảnh minh chứng Jira lịch sử Sprint 2 và Sprint 3
├── 📁 Fashion-data-tools/               # Phân hệ Studio: Spring Boot 3.3.3 cào & xử lý dữ liệu Excel cho Seller
├── 📁 skill/                            # Bộ tài liệu Design System & Hướng dẫn UI/UX Pro Max
├── 📁 link/                             # Phím tắt truy cập nhanh Jira Backlog và Repo nhóm
├── 📄 update-team.ps1 / .bat            # Công cụ 1 chạm cập nhật code mới nhất của cả nhóm an toàn 100%
└── 📄 README.md                         # Tài liệu thuyết minh tổng quan dự án
```

---

## 💻 4. Công Nghệ Sử Dụng (Tech Stack)

| Lĩnh Vực | Công Nghệ / Thư Viện |
|---|---|
| **Core Backend (main/)** | **TypeScript**, Node.js (v24), Express.js, JWT, Bcrypt, Dotenv, Cors |
| **Cơ Sở Dữ Liệu** | **SQLite Native (node:sqlite DatabaseSync)** — Siêu nhẹ, chuẩn ACID, giao dịch an toàn |
| **Data Studio Cho Seller** | **Java 21, Spring Boot 3.3.3**, Spring Data JPA, Thymeleaf, Apache POI (Excel) |
| **Frontend Web** | HTML5, CSS3 Luxury Design System, JavaScript ES6+ Fetch API |
| **Kiểm Thử & Đảm Bảo Chất Lượng** | Node.js Test Runner, Assertion Suite (100% Test Pass) |
| **Quản Trị Phiên Bản & DevOps** | Git Dual-Remote (Đồng bộ đồng thời nhánh `ducmanh` nhóm & `main` cá nhân), Git Worktree |
| **Quản Lý Tiến Độ Dự Án** | Jira Software (`HTTMDTTHA`) |

---

## ⚙️ 5. Hướng Dẫn Vận Hành Hệ Thống

### 1. Khởi động Cổng Mua Sắm & Hệ Thống Lõi (`main/`)

```powershell
cd main

# 1. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 2. Khởi động server chế độ phát triển (Hot Reload bằng tsx)
npm run dev
```

- **Website Mua sắm:** [http://localhost:3000/](http://localhost:3000/)
- **Cổng Đăng nhập / Đăng ký:** [http://localhost:3000/auth.html](http://localhost:3000/auth.html)
- **API Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

### 2. Chạy bộ kiểm thử tự động E2E (12/12 Test Cases Pass):
```powershell
npm test
```

### 3. Cập nhật mã nguồn mới nhất của các thành viên trong nhóm:
```powershell
npm run update-team
# Hoặc nhấp đúp chuột vào file update-team.bat ở thư mục gốc
```

---

## 👨‍💻 Thông Tin Tác Giả
- **Sinh viên thực hiện:** Nguyễn Đức Mạnh
- **Vai trò đảm nhiệm:** Phân hệ Người Bán (Seller System) & Hệ thống Lõi E-Commerce (TypeScript Core)
- **GitHub cá nhân:** [@ducmanh-jr](https://github.com/ducmanh-jr)
- **Dự án nhóm:** [He-thong-thuong-mai-ien-tu-tich-hop-AI](https://github.com/longthan12334/He-thong-thuong-mai-ien-tu-tich-hop-AI)
