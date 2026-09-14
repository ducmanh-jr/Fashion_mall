# 📦 Task 4 BE: HTTMDTTHA-14 — [Backend] API Cập Nhật Kho, Chỉnh Sửa/Ẩn/Xóa Sản Phẩm

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-12%2F12_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_3-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 4](<kết quả/task 4.png>)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-14` (thuộc Epic `HTTMDTTHA-38`)
- **Tên nhiệm vụ:** `[Backend] API Cập nhật kho, Chỉnh sửa/Ẩn/Xóa sản phẩm`
- **Mục tiêu:**
  - API cập nhật tồn kho nhanh.
  - API sửa thông tin, xóa mềm (Soft Delete) hoặc ẩn sản phẩm khỏi storefront.

---

## 📁 2. CẤU TRÚC THƯ MỤC TASK 4 BE

```
task 4 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 4 BE
├── 📁 mã nguồn/                        # Mã nguồn Backend
│   ├── 📄 cart-checkout-api.js         # Express Router API cart & checkout endpoints
│   └── 📄 cart-checkout-service.js     # Service quản lý giỏ hàng & thanh toán
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (12/12 PASS)
└── 📁 kết quả/                         # Kết quả kiểm thử
    └── 📄 README.md                    # Báo cáo chi tiết kết quả test
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 3 Nguyen Duc Manh/task 4 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (12/12 PASS):
```text
📊 Kết quả Task 4 BE: 12/12 PASS (100%)
```
