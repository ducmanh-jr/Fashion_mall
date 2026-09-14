# 🛍️ DM Fashion Mall — Hệ Thống Thương Mại Điện Tử Thời Trang Tích Hợp AI

[![GitHub Repo](https://img.shields.io/badge/GitHub-ducmanh--jr%2FFashion__mall-181717?style=for-the-badge&logo=github)](https://github.com/ducmanh-jr/Fashion_mall)
[![Team Project](https://img.shields.io/badge/Team_Repo-longthan12334%2FHTTMDTTHA-blue?style=for-the-badge&logo=git)](https://github.com/longthan12334/He-thong-thuong-mai-ien-tu-tich-hop-AI)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Java Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.3-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/)
[![Database](https://img.shields.io/badge/Database-SQLite%20%7C%20H2-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![Developer](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-ff69b4?style=for-the-badge&logo=visualstudiocode)]()

---

## 📖 Giới Thiệu Tổng Quan

**DM Fashion Mall** (tên thương hiệu phân hệ: **Aethelgard Shopping Mall**) là một phân hệ cốt lõi trong đề tài **"Hệ thống thương mại điện tử tích hợp AI"**, tập trung vào trải nghiệm mua sắm, tìm kiếm và quản lý chuỗi cung ứng các sản phẩm thời trang cao cấp. 

Dự án được xây dựng theo mô hình phát triển **Agile/Scrum**, phân chia nhiệm vụ và giám sát tiến độ thông qua hệ thống **Jira**, tuân thủ nghiêm ngặt các tiêu chuẩn chất lượng về giao diện (UI/UX Design System), kiểm thử tự động (Automated Testing Suite 100% Pass) và toàn vẹn dữ liệu CSDL quan hệ.

---

## 📂 Cấu Trúc Dự Án Đã Tái Cấu Trúc

```text
DM_Fashion_mall_other_ducmanh/
├── 📁 sprint/                           # Toàn bộ mã nguồn phát triển theo các Sprint
│   ├── 📁 sprint 2 Nguyen Duc Manh/     # Sprint 2: Hệ thống Xác thực, Tài khoản & Bảo mật
│   │   ├── 📁 task 1 fe/                # [FE] Form Đăng ký & Đăng nhập (50:50 Split-screen)
│   │   ├── 📁 task 2 be/                # [BE] API Xác thực Đăng nhập & Cấp phát JWT Token
│   │   ├── 📁 task 3 be/                # [BE] API Đăng ký tài khoản & Mã hóa mật khẩu Bcrypt
│   │   ├── 📁 task 4 be/                # [BE] Quản lý Session, Refresh Token & Hồ sơ người dùng
│   │   ├── 📁 task 5 be/                # [BE] API Quên mật khẩu & Gửi mã OTP xác thực
│   │   └── 📁 task 6 fe/                # [FE] Giao diện Quên mật khẩu & Đặt lại mật khẩu
│   └── 📁 sprint 3 Nguyen Duc Manh/     # Sprint 3: Danh Mục, Tìm Kiếm, Giỏ Hàng & Đơn Hàng
│       ├── 📁 task 1/                   # Thiết kế CSDL (10 bảng ERD) & Native SQLite Migrations
│       ├── 📁 task 2 be/                # [BE] Product API & Service, Seeder dữ liệu mẫu
│       ├── 📁 task 3 be/                # [BE] Search API & Service (Lọc đa tiêu chí, từ khóa)
│       ├── 📁 task 4 be/                # [BE] Cart & Checkout API (Tính tổng, mã giảm giá)
│       ├── 📁 task 5 be/                # [BE] Order API & Service (Quản lý vòng đời đơn hàng)
│       └── 📁 task 6 and 7 fe/          # [FE] Giao diện Catalog, Bộ lọc, Moodboard & Giỏ hàng
├── 📁 Fashion-data-tools/               # Phân hệ Studio: Spring Boot 3.3.3 cào và xử lý dữ liệu thời trang
├── 📁 skill/                            # Bộ tài liệu Design System & Hướng dẫn UI/UX Pro Max
├── 📁 link/                             # Phím tắt truy cập nhanh Jira Backlog và Repo nhóm
├── 📁 main/                             # Thư mục chuẩn bị cho việc đóng gói & release chính thức
└── 📄 README.md                         # Tài liệu thuyết minh tổng quan dự án
```

---

## 🚀 Chi Tiết Các Phân Hệ & Sprint Nhiệm Vụ

### 1. 🛡️ Sprint 2: Xác Thực & Bảo Mật Người Dùng
- **Task 1 (Frontend):** Thiết kế giao diện Đăng nhập / Đăng ký hiện đại tỉ lệ 50:50, cơ chế tự động chuyển slide ảnh không gây gián đoạn, bộ validator kiểm tra chặt chẽ độ dài, định dạng email, chống tấn công XSS/SQL Injection và thanh đo độ mạnh mật khẩu (Password Strength Meter) 5 cấp độ.
- **Task 2 (Backend):** Xây dựng API Đăng nhập an toàn, xác minh thông tin đăng nhập, sinh và ký số chuẩn JWT (JSON Web Token) kèm thời gian hết hạn.
- **Task 3 (Backend):** Xây dựng API Đăng ký tài khoản mới, kiểm tra trùng lặp email, băm mật khẩu với thuật toán an toàn `bcrypt`.
- **Task 4 (Backend):** Cung cấp các endpoint quản lý thông tin tài khoản người dùng, xác thực token qua Middleware, xử lý làm mới token (Refresh Token).
- **Task 5 (Backend):** Luồng khôi phục mật khẩu thông qua mã OTP (One-Time Password) ngẫu nhiên có thời hạn, tích hợp gửi email tự động.
- **Task 6 (Frontend):** Thiết kế form quên mật khẩu, nhập OTP 6 số tự động nhảy ô và form đặt mật khẩu mới thân thiện với người dùng.

### 2. 🛍️ Sprint 3: Quản Lý Sản Phẩm, Giỏ Hàng & Đơn Hàng
- **Task 1 (Database Architecture):** Thiết kế mô hình quan hệ ERD gồm **10 bảng CSDL** (Users, Categories, Brands, Products, Product Variants, Carts, Cart Items, Orders, Order Items, Payments). Xây dựng công cụ chạy Migration thuần (Node.js Native SQLite Runner) hỗ trợ `up`, `down`, `seed`.
- **Task 2 (Product Service & API):** Cung cấp RESTful API quản lý sản phẩm thời trang: phân trang, lấy chi tiết biến thể kích cỡ (Size), màu sắc (Color), hình ảnh và tồn kho.
- **Task 3 (Search Service & API):** Tìm kiếm full-text đa thuộc tính, gợi ý từ khóa, lọc theo khoảng giá, danh mục, thương hiệu và đánh giá sao.
- **Task 4 (Cart & Checkout Service):** Quản lý giỏ hàng realtime, tính toán thuế phí, áp dụng voucher khuyến mãi, lưu phiên giỏ hàng của khách.
- **Task 5 (Order Service & Lifecycle):** Xử lý quy trình đặt hàng, quản lý chuyển trạng thái đơn hàng nghiêm ngặt: `PENDING` ➔ `CONFIRMED` ➔ `SHIPPING` ➔ `COMPLETED` / `CANCELLED`.
- **Task 6 & 7 (Frontend Catalog & Shopping Experience):** Giao diện danh mục sản phẩm thời trang, thanh lọc thông minh, bảng chọn phong cách (Fashion Moodboard), hiệu ứng thêm vào giỏ và xem trước giỏ hàng.

### 3. 🛠️ Phân Hệ Bổ Trợ: Fashion Data Tools
- Viết trên nền tảng **Java 21 & Spring Boot 3.3.3**.
- Cung cấp cổng Web Admin quản trị, tích hợp công cụ cào và trích xuất dữ liệu tự động từ các trang thời trang quốc tế (Nike, Adidas, Gucci, Balenciaga...).
- Tích hợp xuất/nhập dữ liệu qua file Excel (Apache POI), lưu trữ dữ liệu tại chỗ với CSDL H2.

---

## 💻 Công Nghệ Sử Dụng (Tech Stack)

| Lĩnh Vực | Công Nghệ / Thư Viện |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), Modern Responsive Layout, UI/UX Design System |
| **Backend Chính** | Node.js, Express.js, JWT, Bcrypt, Validator |
| **Backend Dữ Liệu** | Java 21, Spring Boot 3.3.3, Spring Data JPA, Thymeleaf, WebSocket, Apache POI |
| **Cơ Sở Dữ Liệu** | SQLite (Node:sqlite), H2 Persistent Database |
| **Kiểm Thử** | Node.js Built-in Test Runner, Assertion Suite (100% Pass) |
| **Quản Lý Phiên Bản** | Git, GitHub Multi-Remote (Đồng bộ đồng thời nhánh `ducmanh` nhóm & `main` cá nhân) |
| **Quản Lý Dự Án** | Jira Software (`HTTMDTTHA`) |

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy Thử Nghiệm

### 1. Yêu cầu môi trường
- **Node.js**: Phiên bản 18.x trở lên.
- **Java**: JDK 21 trở lên (nếu sử dụng module Fashion Data Tools).
- **Git**: Đã cài đặt trên máy.

### 2. Cài đặt các thư viện Node.js

```powershell
# Chạy cài đặt cho Sprint 2
cd "sprint/sprint 2 Nguyen Duc Manh"
npm install

# Chạy cài đặt cho Sprint 3
cd "../../sprint/sprint 3 Nguyen Duc Manh"
npm install
```

### 3. Khởi tạo Cơ sở dữ liệu Sprint 3 (Migration & Seed)

```powershell
cd "sprint/sprint 3 Nguyen Duc Manh/task 1/mã nguồn"
node migrations.js up
node migrations.js seed
```

### 4. Chạy kiểm thử tự động (Automated Test Suite)

```powershell
# Chạy test Sprint 3 Task 1 (Database)
node "sprint/sprint 3 Nguyen Duc Manh/task 1/test/test.js"

# Chạy test Sprint 3 Task 2 (Product API)
node "sprint/sprint 3 Nguyen Duc Manh/task 2 be/test/test.js"

# Chạy test Sprint 3 Task 3 (Search API)
node "sprint/sprint 3 Nguyen Duc Manh/task 3 be/test/test.js"

# Chạy test Sprint 3 Task 4 (Cart API)
node "sprint/sprint 3 Nguyen Duc Manh/task 4 be/test/test.js"

# Chạy test Sprint 3 Task 5 (Order API)
node "sprint/sprint 3 Nguyen Duc Manh/task 5 be/test/test.js"
```

### 5. Khởi động Web Frontend (Catalog & Mua Sắm)
Mở file `sprint/sprint 3 Nguyen Duc Manh/task 6 and 7 fe/mã nguồn/index.html` trực tiếp trên trình duyệt hoặc sử dụng Live Server trong VS Code để trải nghiệm giao diện.

---

## 👨‍💻 Tác Giả & Đóng Góp
- **Sinh viên thực hiện:** Nguyễn Đức Mạnh
- **GitHub cá nhân:** [@ducmanh-jr](https://github.com/ducmanh-jr)
- **Dự án nhóm:** [He-thong-thuong-mai-ien-tu-tich-hop-AI](https://github.com/longthan12334/He-thong-thuong-mai-ien-tu-tich-hop-AI)
