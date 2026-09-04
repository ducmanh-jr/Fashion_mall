# 📧 Task 3: HTTMDTTHA-10 — (BE) Mail Service & OTP Generation

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-5%2F5_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-10`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) Dịch vụ gửi Mail & Tạo mã OTP Quên Mật Khẩu`
- **Mục tiêu:**
  - Xây dựng Backend Service `requestForgotPasswordOTP(email)` sinh mã OTP 6 chữ số ngẫu nhiên có hiệu lực trong 10 phút.
  - **Ràng buộc Tên miền Email**: Chỉ hỗ trợ địa chỉ Email **bắt buộc phải có đuôi `@gmail.com`**, tự động từ chối các loại tên miền khác.
  - Tạo Reset Token bảo mật lưu trữ trong OTP Store.

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 3 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 3
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   └── 📄 mail-service.js              # Service gửi Mail & Quản lý OTP Store
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (5/5 PASS - Pure Node.js)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 3.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 2 Nguyen Duc Manh/task 3 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (5/5 PASS):
```text
  ✅ [PASS] Gửi yêu cầu Quên mật khẩu thành công cho Email @gmail.com.
  ✅ [PASS] Mã OTP sinh ra đúng 6 chữ số.
  ✅ [PASS] Thời gian hết hạn của OTP được thiết lập đúng 10 phút.
  ✅ [PASS] Mã OTP và Reset Token được lưu chính xác trong Store.
  ✅ [PASS] Từ chối gửi OTP cho Email không có đuôi @gmail.com (VD: @yahoo.com).
📊 Kết quả Task 3: 5/5 PASS
```
