# 📊 Kết Quả Kiểm Thử Task 2 BE: HTTMDTTHA-12 — Viết Seeder Dữ Liệu Mẫu Catalog & Đơn Hàng

![Test Suite](https://img.shields.io/badge/Test_Suite-12%2F12_PASS-10b981?style=for-the-badge&logo=github)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 2](<task 2.png>)

---

## 📌 Bảng Tổng Hợp Kiểm Thử

| STT | Tên Test Case | Chức Năng (User Story) | Trạng Thái | Kết Quả |
|:---:|:---|:---|:---:|:---:|
| 1 | `Seller Product Posting` | US-08: Đăng sản phẩm | `PASS` | ✅ Tạo thành công kèm tồn kho 0 |
| 2 | `Negative Price Validation` | Ràng buộc giá gốc >= 0 | `PASS` | ✅ Giá âm bị chặn chính xác |
| 3 | `Product Images Upload` | US-09: Tải ảnh <= 5 hình | `PASS` | ✅ Gán ảnh chính thành công |
| 4 | `Max Images Exception` | Ràng buộc tối đa 5 ảnh | `PASS` | ✅ Thêm 6 ảnh bị chặn |
| 5 | `Inventory Stock Alert` | US-10: Cập nhật tồn kho | `PASS` | ✅ Chuyển IN_STOCK -> LOW_STOCK -> OUT_OF_STOCK |
| 6 | `Edit & Hide Product` | US-11: Chỉnh sửa / Ẩn sản phẩm | `PASS` | ✅ Đổi tên và chuyển status INACTIVE |
| 7 | `Full Detail Query` | Truy vấn đầy đủ chi tiết | `PASS` | ✅ Lấy đúng thông tin sản phẩm, ảnh & tồn kho |
| 8 | `API POST /api/products` | Express Route Đăng sản phẩm | `PASS` | ✅ Trả về HTTP 201 Created |
| 9 | `API POST /api/products/:id/images` | Express Route Upload ảnh | `PASS` | ✅ Trả về HTTP 200 OK |
| 10 | `API PUT /api/products/:id/inventory` | Express Route Tồn kho | `PASS` | ✅ Trả về HTTP 200 OK |
| 11 | `API PUT /api/products/:id` | Express Route Chỉnh sửa | `PASS` | ✅ Trả về HTTP 200 OK |
| 12 | `API GET /api/products/:id` | Express Route Lấy chi tiết | `PASS` | ✅ Trả về HTTP 200 OK |

---

## 🧪 Nhật Ký Chi Tiết (Log Output)

```text
================================================================
🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 2 BE (HTTMDTTHA-37)
================================================================

🔹 [TEST 1/12] ProductService.createProduct() (US-08)...
  ✅ [PASS] Product created with auto inventory record.

🔹 [TEST 2/12] ProductService.createProduct() price < 0 validation...
  ✅ [PASS] Price < 0 rejected correctly.

🔹 [TEST 3/12] ProductService.uploadProductImages() <= 5 images (US-09)...
  ✅ [PASS] Images uploaded and primary set correctly.

🔹 [TEST 4/12] ProductService.uploadProductImages() > 5 images rejection...
  ✅ [PASS] Over 5 images blocked.

🔹 [TEST 5/12] ProductService.updateInventory() stock transitions (US-10)...
  ✅ [PASS] Stock status transitions verified.

🔹 [TEST 6/12] ProductService.updateProduct() (US-11)...
  ✅ [PASS] Product updated and deactivated.

🔹 [TEST 7/12] ProductService.getProductDetail()...
  ✅ [PASS] Product detail query verified.

🔹 [TEST 8/12] Express API POST /api/products (201 Created)...
  ✅ [PASS] Express API create product route verified.

🔹 [TEST 9/12] Express API POST /api/products/:id/images (200 OK)...
  ✅ [PASS] Express API upload images route verified.

🔹 [TEST 10/12] Express API PUT /api/products/:id/inventory (200 OK)...
  ✅ [PASS] Express API inventory route verified.

🔹 [TEST 11/12] Express API PUT /api/products/:id (200 OK)...
  ✅ [PASS] Express API edit product route verified.

🔹 [TEST 12/12] Express API GET /api/products/:id (200 OK)...
  ✅ [PASS] Express API get product detail route verified.

================================================================
📊 RESULT TASK 2 BE: 12/12 TESTS PASS (100%)
================================================================
```
