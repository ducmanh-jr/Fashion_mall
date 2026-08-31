# ⚙️ Task 4: HTTMDTTHA-46 — (BE) Xây api xác thực và đặt lại mk

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-4%2F4_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-46`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) Xây api xác thực và đặt lại mk`
- **Mục tiêu:**
  - Viết Backend API `/api/auth/verify-otp` kiểm tra tính hợp lệ của mã OTP và cấp Reset Token.
  - Viết Backend API `/api/auth/reset-password` băm mật khẩu mới bằng `bcryptjs` (salt round = 10).
  - Trả về phản hồi JSON chuẩn REST API và xác thực mật khẩu băm khi đăng nhập.

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 4/
├── 📄 README.md                        # Báo cáo tổng quan Task 4
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   └── 📄 reset-service.js             # Logic verify OTP & băm mật khẩu bcrypt
├── 📁 test/                            # Thư mục kiểm thử & Test UI Client
│   ├── 📄 test.js                      # Automated Test Suite (4/4 PASS)
│   └── 📄 index.html                   # HTML Test Client
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    ├── 🖼️ task 4.png                   # Ảnh chụp minh chứng Backend API
    └── 🖼️ task 4_fe.png                # Ảnh chụp minh chứng Frontend UI 3 Bước
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd test
node test.js
```

### Kết Quả Thực Nghiệm (4/4 PASS):
```text
  ✅ [PASS] Từ chối mã OTP sai ('000000').
  ✅ [PASS] Xác thực mã OTP đúng ('654321') và trả về Reset Token.
  ✅ [PASS] Cập nhật mật khẩu mới thành công.
  ✅ [PASS] Đăng nhập thành công bằng mật khẩu vừa reset.
📊 Kết quả Task 4: 4/4 PASS
```
