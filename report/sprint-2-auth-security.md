# 🛡️ BÁO CÁO CHI TIẾT SPRINT 2: HỆ THỐNG XÁC THỰC & BẢO MẬT

- **Dự án:** Aethelgard Shopping Mall (DM Fashion Mall)
- **Thực hiện:** Nguyễn Đức Mạnh
- **Sprint:** Sprint 2
- **Tình trạng:** Hoàn thành 100% (All Tasks Done, All Tests Passed)

---

## 📋 Danh Sách Các Task Đã Thực Hiện

### 1. Task 1: `HTTMDTTHA-6` — [FE] Giao diện Form Đăng Ký & Đăng Nhập
- **Mô tả:** Thiết kế cổng xác thực 50:50, chia đôi màn hình với 1 bên là banner thời trang động chuyển cảnh mượt mà sau 15 giây, 1 bên là form tương tác.
- **Công nghệ:** HTML5, CSS3 hiện đại, Vanilla JavaScript ES6+.
- **Tính năng nổi bật:**
  - Bộ kiểm tra tính hợp lệ dữ liệu (Form Validator System): Full Name, Email, Password.
  - Chống mã độc XSS / SQL Injection ngay tại tầng client.
  - Password Strength Meter: Thanh đo độ mạnh mật khẩu realtime theo 5 cấp độ và 5 tiêu chí bảo mật (chữ hoa, chữ thường, số, ký tự đặc biệt, độ dài).
- **Kết quả kiểm thử:** 20/20 test cases PASS.

---

### 2. Task 2: `HTTMDTTHA-7` — [BE] API Xác Thực Đăng Nhập & Cấp Phát JWT Token
- **Mô tả:** Xây dựng endpoint `POST /api/auth/login`.
- **Bảo mật:**
  - Kiểm tra mật khẩu mã hóa bằng `bcrypt.compare()`.
  - Sinh chuỗi JWT Access Token có thời hạn kèm Payload an toàn (User ID, Email, Role).
  - Trả về mã lỗi HTTP chuẩn (400, 401, 404, 500).
- **Kết quả kiểm thử:** 15/15 test cases PASS.

---

### 3. Task 3: `HTTMDTTHA-8` — [BE] API Đăng Ký Tài Khoản Mới
- **Mô tả:** Xây dựng endpoint `POST /api/auth/register`.
- **Quy tắc xử lý:**
  - Kiểm tra tính duy nhất của Email trong hệ thống.
  - Băm mật khẩu với `bcrypt` (Salt rounds = 10).
  - Tự động gán quyền mặc định `CUSTOMER` cho tài khoản mới.
- **Kết quả kiểm thử:** 18/18 test cases PASS.

---

### 4. Task 4: `HTTMDTTHA-9` — [BE] Quản Lý Session & Hồ Sơ Người Dùng
- **Mô tả:** Xây dựng Middleware xác thực Token `authenticateJWT` và các endpoint:
  - `GET /api/user/profile`: Lấy thông tin cá nhân của phiên đăng nhập hiện tại.
  - `POST /api/auth/refresh`: Cấp mới Access Token khi token cũ hết hạn.
  - `POST /api/auth/logout`: Hủy bỏ phiên làm việc.
- **Kết quả kiểm thử:** 12/12 test cases PASS.

---

### 5. Task 5: `HTTMDTTHA-10` — [BE] API Quên Mật Khẩu & Xác Thực Mã OTP
- **Mô tả:** Xây dựng quy trình khôi phục mật khẩu bảo mật cao:
  - `POST /api/auth/forgot-password`: Sinh mã OTP ngẫu nhiên 6 chữ số có hiệu lực trong 5 phút, gửi qua email dịch vụ.
  - `POST /api/auth/verify-otp`: Kiểm tra mã OTP và xác thực quyền đặt lại mật khẩu.
  - `POST /api/auth/reset-password`: Cập nhật mật khẩu mới đã băm vào CSDL.
- **Kết quả kiểm thử:** 14/14 test cases PASS.

---

### 6. Task 6: `HTTMDTTHA-11` — [FE] Giao Diện Quên & Đặt Lại Mật Khẩu
- **Mô tả:** Giao diện 3 bước trực quan:
  - Bước 1: Nhập email nhận OTP.
  - Bước 2: 6 ô nhập mã OTP tự động focus sang ô tiếp theo và tự động lùi khi xóa phím.
  - Bước 3: Đặt mật khẩu mới kèm hiển thị thanh đánh giá độ mạnh mật khẩu.
- **Kết quả kiểm thử:** 16/16 test cases PASS.
