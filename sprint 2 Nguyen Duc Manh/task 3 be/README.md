# ⚙️ Task 3: HTTMDTTHA-10 — (BE) Cấu hình mail service & api quên mật khẩu

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-4%2F4_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-10`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) Cấu hình mail service & api quên mật khẩu`
- **Mục tiêu:**
  - Xây dựng Backend Mail Service sinh mã OTP ngẫu nhiên 6 chữ số (`100000` - `999999`).
  - Thiết lập thời hạn hết hạn chính xác 10 phút (`600 giây`).
  - Sinh chuỗi Reset Token 64 ký tự hex ngẫu nhiên bảo mật lưu vào CSDL/Store.

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 3/
├── 📄 README.md                        # Báo cáo tổng quan Task 3
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   └── 📄 mail-service.js              # Backend Mail Service OTP Generator & Store
├── 📁 test/                            # Thư mục kiểm thử & Test UI Client
│   ├── 📄 test.js                      # Automated Test Suite (4/4 PASS)
│   └── 📄 index.html                   # HTML Test Client
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 3.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd test
node test.js
```

### Kết Quả Thực Nghiệm (4/4 PASS):
```text
✉️ [MAIL SERVICE] Đã gửi OTP 712471 tới user_test_forgot@ecommerce.vn (Hiệu lực 10 phút).
  ✅ [PASS] Gửi yêu cầu Quên mật khẩu thành công.
  ✅ [PASS] Mã OTP sinh ra đúng 6 chữ số.
  ✅ [PASS] Thời gian hết hạn của OTP được thiết lập đúng 10 phút.
  ✅ [PASS] Mã OTP và Reset Token được lưu chính xác trong CSDL/Store.
📊 Kết quả Task 3: 4/4 PASS
```
