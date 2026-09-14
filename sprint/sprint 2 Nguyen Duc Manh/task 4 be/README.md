# 🔑 Task 4: HTTMDTTHA-46 — (BE) Verify OTP & Reset Password API

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-5%2F5_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-46`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) Xác thực mã OTP & Đặt lại mật khẩu mới`
- **Mục tiêu:**
  - Xây dựng Backend API xác thực mã OTP 6 số (`verifyOTP`).
  - Kiểm tra điều kiện ngặt nghèo về thời gian hết hạn (10 phút) và trạng thái verify.
  - Cập nhật mật khẩu mới mã hóa Bcrypt (`resetPassword`) với địa chỉ **Email bắt buộc có đuôi `@gmail.com`**.
  - Kiểm tra đăng nhập lại bằng mật khẩu vừa được reset thành công (`verifyLogin`).

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 4 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 4
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   └── 📄 reset-service.js             # Service Verify OTP & Reset Password
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (5/5 PASS - Pure Node.js)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 4.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 2 Nguyen Duc Manh/task 4 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (5/5 PASS):
```text
  ✅ [PASS] Từ chối mã OTP sai ('000000').
  ✅ [PASS] Xác thực mã OTP đúng ('654321') và trả về Reset Token.
  ✅ [PASS] Cập nhật mật khẩu mới thành công.
  ✅ [PASS] Đăng nhập thành công bằng mật khẩu vừa reset cho tài khoản @gmail.com.
  ✅ [PASS] Từ chối xác thực OTP với Email không phải đuôi @gmail.com.
📊 Kết quả Task 4: 5/5 PASS
```
