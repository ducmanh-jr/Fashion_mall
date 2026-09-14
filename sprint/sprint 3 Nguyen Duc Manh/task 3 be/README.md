# 📦 Task 3 BE: HTTMDTTHA-13 — [Backend] API Đăng Sản Phẩm & Upload Nhiều Ảnh

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-10%2F10_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_3-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 3](<kết quả/task 3.png>)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-13` (thuộc Epic `HTTMDTTHA-38`)
- **Tên nhiệm vụ:** `[Backend] API Đăng sản phẩm & Upload nhiều ảnh`
- **Mục tiêu:**
  - API tạo sản phẩm (Tên, mô tả, danh mục, giá gốc, số lượng ban đầu).
  - API nhận và upload tối đa 5 hình ảnh/sản phẩm lên Cloudinary/S3.

---

## 📁 2. CẤU TRÚC THƯ MỤC TASK 3 BE

```
task 3 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 3 BE
├── 📁 mã nguồn/                        # Mã nguồn Backend
│   ├── 📄 search-api.js                # Express Router API search endpoints
│   └── 📄 search-service.js            # Service tìm kiếm, lọc & sắp xếp SQL
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (10/10 PASS)
└── 📁 kết quả/                         # Kết quả kiểm thử
    └── 📄 README.md                    # Báo cáo chi tiết kết quả test
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 3 Nguyen Duc Manh/task 3 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (10/10 PASS):
```text
📊 Kết quả Task 3 BE: 10/10 PASS (100%)
```
