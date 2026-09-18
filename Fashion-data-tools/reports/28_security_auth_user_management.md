# BÁO CÁO 28: SECURITY, AUTHENTICATION & USER MANAGEMENT (BẢO MẬT & PHÂN QUYỀN)
**Dự án:** DM Fashion Data Tools (Java Web System)  
**Công nghệ:** Spring Security 6, JWT (JSON Web Tokens), OAuth2 / API Key Management

---

## 1. Mục tiêu bảo mật hệ thống
Vì công cụ cào dữ liệu thời trang cao cấp sở hữu tài nguyên đắt giá (hạ tầng Proxy dân cư, dữ liệu tình báo giá và tồn kho độc quyền), hệ thống Web cần bảo vệ chặt chẽ:
1. Xác thực người dùng (Authentication) qua cơ chế Token JWT không trạng thái (Stateless).
2. Phân quyền đa cấp (Role-Based Access Control - RBAC).
3. Quản lý hạn mức cào dữ liệu (Quotas / Rate Limiting per User) để ngăn chặn việc người dùng lạm dụng làm cháy tài khoản proxy.

---

## 2. Bảng phân quyền người dùng (Role-Based Access Control)

| Vai trò (Role) | Quyền hạn trên hệ thống | Giới hạn số lượng cào / ngày |
| :--- | :--- | :--- |
| `ROLE_ADMIN` | Toàn quyền quản trị hệ thống, thêm/sửa cấu hình thương hiệu, quản lý proxy pool, xem log hệ thống. | Không giới hạn |
| `ROLE_MANAGER` | Được phép tạo job cào tất cả thương hiệu (Gucci, Dior, Adidas...), chọn nhiều chi nhánh cùng lúc, xuất báo cáo Excel. | 50,000 sản phẩm / ngày |
| `ROLE_ANALYST` | Được cào tối đa 2 chi nhánh cùng lúc, chỉ xem và tìm kiếm dữ liệu đã cào, xuất file Excel có watermark. | 5,000 sản phẩm / ngày |

---

## 3. Bảo vệ API bằng API Key dành cho bên thứ ba (B2B Integration)
Ngoài đăng nhập bằng tài khoản/mật khẩu trên giao diện Web, hệ thống hỗ trợ cấp `X-API-KEY` để người dùng có thể tích hợp dữ liệu cào tự động vào phần mềm quản lý kho nội bộ hoặc ERP của công ty.
