# 🎨 Task 6: HTTMDTTHA-51 — (FE) Giao diện Quên & Đổi Mật Khẩu

![Type](https://img.shields.io/badge/Task_Type-FRONTEND_(FE)-indigo?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-11%2F11_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-51` (Parent: `HTTMDTTHA-37 Tài khoản & người dùng`)
- **Loại nhiệm vụ:** `Frontend (FE)`
- **Tên nhiệm vụ:** `(FE) giao diện quên & đổi mật khẩu`
- **Mục tiêu & Điểm nổi bật:**
  - **Ràng buộc Email**: Tất cả Email trong hệ thống **bắt buộc phải có đuôi `@gmail.com`**, tự động từ chối mọi tên miền khác như `@yahoo.com`, `@outlook.com`,...
  - Xây dựng giao diện Frontend Quên Mật Khẩu 3 bước (Sketch Wireframe chuẩn):
    - **Bước 1**: Nhập email đăng ký (`@gmail.com`) nhận mã OTP.
    - **Bước 2**: Nhập 6 ô mã OTP (mặc định `000000`) với tính năng **tự động xác thực & chuyển bước** ngay khi nhập đủ 6 chữ số. Nếu nhập sai, 6 ô OTP lập tức đổi sang viền/nền **màu đỏ** (`.error`) báo hiệu trực quan.
    - **Bước 3**: Nhập và xác nhận mật khẩu mới.

---

## 📁 2. CẤU TRÚC THƯ MỤC FE

```
task 6 fe/
├── 📄 README.md                        # Báo cáo tổng quan Task 6
├── 📁 mã nguồn/                        # Mã nguồn FE duy nhất
│   ├── 📄 index.html                   # Giao diện chính Quên & Đổi Mật Khẩu
│   ├── 📄 style.css                    # CSS Wireframe Design System & Error Styling
│   ├── 📄 app.js                       # Logic xử lý OTP, Auto-Advance & State
│   ├── 📄 form-validator.js            # Module Validate Email @gmail.com & Mật khẩu
│   ├── 📄 password-meter.js            # Thanh đánh giá độ mạnh mật khẩu
│   └── 📄 brand-config.js              # Cấu hình Thương hiệu Aethelgard
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (11/11 PASS - Pure JS Logic)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 6.png                   # Ảnh chụp giao diện Jira minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 2 Nguyen Duc Manh/task 6 fe/test"
node test.js
```

### Kết Quả Thực Nghiệm (11/11 PASS):
```text
🧪 KIỂM THỬ THỰC NGHIỆM TASK 6: HTTMDTTHA-51 (FE Quên & Đổi Mật Khẩu)

--- 1. Kiểm thử Luồng Quên Mật Khẩu (Forgot Flow) ---
  ✅ [PASS] Chấp nhận dữ liệu hợp lệ (Email @gmail.com chuẩn, OTP 6 số mặc định: 000000, Mật khẩu mới >= 6 ký tự).
  ✅ [PASS] Từ chối OTP chưa đủ 6 chữ số (ví dụ: '123').
  ✅ [PASS] Từ chối Email không có đuôi @gmail.com (ví dụ: @yahoo.com).
  ✅ [PASS] Từ chối mật khẩu mới ngắn hơn 6 ký tự.

--- 2. Kiểm thử Luồng Đổi Mật Khẩu (Change Flow) ---
  ✅ [PASS] Chấp nhận mật khẩu cũ và mật khẩu mới hợp lệ.
  ✅ [PASS] Từ chối khi để trống mật khẩu cũ.
  ✅ [PASS] Từ chối mật khẩu mới ngắn hơn 6 ký tự.

--- 3. Kiểm thử Ràng Buộc Tên Miền Email (@gmail.com) ---
  ✅ [PASS] Chấp nhận Email chuẩn có đuôi @gmail.com.
  ✅ [PASS] Từ chối Email có đuôi @yahoo.com.
  ✅ [PASS] Từ chối Email có đuôi @outlook.com.
  ✅ [PASS] Validate độ dài và yêu cầu mật khẩu.

📊 KẾT QUẢ KIỂM THỬ TASK 6: 11/11 TEST CASES PASS
```
