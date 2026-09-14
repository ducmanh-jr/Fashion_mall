# 📦 Task 2 BE: HTTMDTTHA-12 — Viết Seeder Dữ Liệu Mẫu Catalog & Đơn Hàng & API Sản Phẩm

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-12%2F12_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_3-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 2](<kết quả/task 2.png>)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-12` (thuộc Epic `HTTMDTTHA-36`)
- **Tên nhiệm vụ:** `Viết Seeder dữ liệu mẫu Catalog & Đơn hàng`
- **Mục tiêu:**
  - Tạo script seed dữ liệu mẫu sử dụng **20 hình ảnh sản phẩm thực tế** (như Adidas Samba, Balenciaga Track 4.0, Gucci Ace Sneaker, Nike Air Max, Puma Suede, Áo khoác Balenciaga, Quần Cargo...) trong thư mục `mã nguồn/img/`.
  - Xây dựng API Quản lý sản phẩm, Upload ảnh, Tồn kho & Cập nhật trạng thái sản phẩm.

---

## 📁 2. CẤU TRÚC THƯ MỤC TASK 2 BE

```
task 2 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 2 BE
├── 📁 mã nguồn/                        # Mã nguồn Backend
│   ├── 📄 seeder.js                    # Seeder Service khởi tạo 22 sản phẩm mẫu (Jira HTTMDTTHA-12)
│   ├── 📄 product-api.js               # Express Router API endpoints
│   └── 📄 product-service.js           # Business Logic Service CRUD sản phẩm & kho
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (12/12 PASS)
└── 📁 kết quả/                         # Kết quả kiểm thử
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả test
    └── 📸 task 2.png                   # Ảnh chụp màn hình Jira Work Item thực tế
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 3 Nguyen Duc Manh/task 2 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (12/12 PASS):
```text
📊 Kết quả Task 2 BE: 12/12 PASS (100%)
```
