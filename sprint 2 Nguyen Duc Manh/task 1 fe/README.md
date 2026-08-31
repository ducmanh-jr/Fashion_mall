# 🎨 Task 1: HTTMDTTHA-6 — [Frontend] Làm giao diện cho form đăng ký, đăng nhập

![Type](https://img.shields.io/badge/Task_Type-FRONTEND_(FE)-indigo?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-4%2F4_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-6`
- **Loại nhiệm vụ:** `Frontend (FE)`
- **Tên nhiệm vụ:** `[Frontend] Làm giao diện cho form đăng ký , đăng nhập`
- **Mục tiêu:**
  - Thiết kế cổng xác thực đăng ký / đăng nhập chuẩn sản xuất (Production-Ready) với phong cách Light Theme tối giản, sang trọng.
  - Xây dựng component **Password Strength Meter** đánh giá độ mạnh mật khẩu realtime qua 5 tiêu chí bảo mật và 4 cấp độ trực quan (`Yếu` 🔴 ➔ `Trung Bình` 🟧 ➔ `Mạnh` 🟦 ➔ `Rất Mạnh` 🟢).

---

## 📁 2. CẤU TRÚC THƯ MỤC FE

```
task 1/
├── 📄 README.md                        # Tài liệu hướng dẫn & báo cáo Task 1
├── 📁 mã nguồn/                        # Mã nguồn FE chính
│   ├── 📄 index.html                   # Giao diện Đăng ký / Đăng nhập E-Commerce
│   ├── 📄 style.css                    # Design System Light Theme & Soft Ambient Blobs
│   ├── 📄 app.js                       # Logic tương tác UI & Tab Switcher
│   ├── 📄 password-meter.js            # Thuật toán đánh giá độ mạnh mật khẩu
│   └── 📁 ui-ux-design-system/         # Tài nguyên thiết kế UI/UX Pro Max
├── 📁 test/                            # Thư mục kiểm thử
│   └── 📄 test.js                      # Automated Test Suite (4/4 PASS)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 1.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd test
node test.js
```

### Kết Quả Thực Nghiệm (4/4 PASS):
```text
  ✅ [PASS] Mật khẩu '123' đánh giá đúng mức YẾU.
  ✅ [PASS] Mật khẩu 'pass1234' đánh giá đúng mức TRUNG BÌNH.
  ✅ [PASS] Mật khẩu 'Pass1234' đánh giá đúng mức MẠNH.
  ✅ [PASS] Mật khẩu 'StrongPass123!@#' đánh giá đúng mức RẤT MẠNH.
📊 Kết quả Task 1: 4/4 PASS
```
