# 🎨 Task 6 & 7 FE: HTTMDTTHA-16 & HTTMDTTHA-61 — [Frontend] Quản Lý Sản Phẩm Seller & Tìm Kiếm, Bộ Lọc

![Type](https://img.shields.io/badge/Task_Type-FRONTEND_(FE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-15%2F15_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_3-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 6 - Seller Management](<kết quả/task 6.png>)

![Jira Work Item Task 6 - Search & Filter](<kết quả/task 6_filter.png>)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-16` & `HTTMDTTHA-61` (thuộc Epic `HTTMDTTHA-38`)
- **Tên nhiệm vụ:** `[Frontend] Màn hình Quản lý sản phẩm dành cho Seller & Giao diện Tìm kiếm, Bộ lọc`
- **Mục tiêu:**
  - Bảng danh sách sản phẩm của Seller (chuyển trạng thái ẩn/hiện, sửa nhanh kho).
  - Form thêm mới/chỉnh sửa sản phẩm có kéo thả tải lên 5 ảnh và preview.
  - Thanh tìm kiếm Header kèm gợi ý.
  - Trang danh sách sản phẩm với sidebar lọc danh mục, thanh trượt giá và dropdown sắp xếp.

---

## 📁 2. CẤU TRÚC THƯ MỤC TASK 6 AND 7 FE

```
task 6 and 7 fe/
├── 📄 README.md                        # Báo cáo tổng quan Task 6 & 7 FE
├── 📁 mã nguồn/                        # Mã nguồn Frontend HTML/CSS/JS
│   ├── 🌐 index.html                   # Cổng Web Portal Aethelgard Shopping Mall
│   ├── 🎨 style.css                    # Design System Dark Mode, Glassmorphism & Responsive
│   ├── 📜 app.js                       # Logic xử lý sản phẩm, giỏ hàng, đặt hàng & tracking đơn
│   ├── 📄 brand-config.js              # Cấu hình thương hiệu Aethelgard Shopping Mall
│   └── 📁 img/                         # Thư mục 20 file ảnh sản phẩm thực tế lấy từ Task 2 BE
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (15/15 PASS)
└── 📁 kết quả/                         # Kết quả kiểm thử
    └── 📄 README.md                    # Báo cáo chi tiết kết quả test
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ VÀ TRẢI NGHIỆM

### 3.1. Chạy Bộ Kiểm Thử Tự Động
```bash
cd "sprint 3 Nguyen Duc Manh/task 6 and 7 fe/test"
node test.js
```

### 3.2. Mở Giao Diện Trực Tiếp Trên Trình Duyệt
- Mở file [`index.html`](file:///c:/Users/Admin/ducmanh/DMS_shoppe/sprint%203%20Nguyen%20Duc%20Manh/task%206%20and%207%20fe/m%C3%A3%20ngu%E1%BB%93n/index.html) trực tiếp bằng Google Chrome hoặc Microsoft Edge để trải nghiệm mua sắm và giỏ hàng với kho ảnh 20 sản phẩm thực tế từ Task 2 BE.

### Kết Quả Thực Nghiệm (15/15 PASS):
```text
📊 Kết quả Task 6 & 7 FE: 15/15 PASS (100%)
```
