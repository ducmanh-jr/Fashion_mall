# 🎨 Task 6: HTTMDTTHA-51 — (FE) giao diện quên & đổi mật khẩu

![Type](https://img.shields.io/badge/Task_Type-FRONTEND_(FE)-indigo?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-3%2F3_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-51` (Parent: `HTTMDTTHA-37 Tài khoản & người dùng`)
- **Loại nhiệm vụ:** `Frontend (FE)`
- **Tên nhiệm vụ:** `(FE) giao diện quên & đổi mật khẩu`
- **Mục tiêu:**
  - Xây dựng giao diện Frontend hoàn chỉnh cho tính năng **Quên Mật Khẩu (3 Bước)** với trình nhập OTP 6 số và đặt mật khẩu mới.
  - Xây dựng giao diện Frontend **Cài Đặt Đổi Mật Khẩu** bảo mật bởi JWT cho người dùng đã đăng nhập.

---

## 📁 2. CẤU TRÚC THƯ MỤC FE

```
task 6/
├── 📄 README.md                        # Báo cáo tổng quan Task 6
├── 📁 mã nguồn/                        # Mã nguồn FE chính
│   └── 📄 index.html                   # Giao diện Frontend Quên & Đổi Mật Khẩu
├── 📁 test/                            # Thư mục kiểm thử & Demo UI
│   ├── 📄 test.js                      # Automated Test Suite (3/3 PASS)
│   └── 📄 index.html                   # Giao diện test
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 6.png                   # Ảnh chụp giao diện Jira minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd test
node test.js
```

### Kết Quả Thực Nghiệm (3/3 PASS):
```text
  ✅ [PASS] Form FE Quên mật khẩu chấp nhận dữ liệu hợp lệ (Email, OTP 6 số, Mật khẩu mới).
  ✅ [PASS] Form FE Quên mật khẩu từ chối OTP ngắn hơn 6 chữ số.
  ✅ [PASS] Form FE Đổi mật khẩu chấp nhận mật khẩu cũ và mật khẩu mới hợp lệ.
📊 Kết quả Task 6: 3/3 PASS
```
