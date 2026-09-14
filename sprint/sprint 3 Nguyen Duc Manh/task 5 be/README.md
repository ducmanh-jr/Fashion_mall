# 🔍 Task 5 BE: HTTMDTTHA-15 — [Backend] API Tìm Kiếm, Lọc Danh Mục & Sắp Xếp

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-12%2F12_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_3-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 5](<kết quả/task 5.png>)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-15` (thuộc Epic `HTTMDTTHA-38`)
- **Tên nhiệm vụ:** `[Backend] API Tìm kiếm, Lọc danh mục & Sắp xếp`
- **Mục tiêu:**
  - API query sản phẩm hỗ trợ full-text search theo tên/từ khóa.
  - Query lọc theo category_id, khoảng giá min_price - max_price; sắp xếp giá tăng/giảm, mới nhất.

---

## 📁 2. CẤU TRÚC THƯ MỤC TASK 5 BE

```
task 5 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 5 BE
├── 📁 mã nguồn/                        # Mã nguồn Backend
│   ├── 📄 order-api.js                 # Express Router API order & admin endpoints
│   └── 📄 order-service.js             # Service quản lý đơn hàng & thống kê
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (12/12 PASS)
└── 📁 kết quả/                         # Kết quả kiểm thử
    └── 📄 README.md                    # Báo cáo chi tiết kết quả test
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 3 Nguyen Duc Manh/task 5 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (12/12 PASS):
```text
📊 Kết quả Task 5 BE: 12/12 PASS (100%)
```
