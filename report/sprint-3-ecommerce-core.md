# 🛍️ BÁO CÁO CHI TIẾT SPRINT 3: CORE E-COMMERCE & KIẾN TRÚC CSDL

- **Dự án:** DM Fashion Mall
- **Thực hiện:** Nguyễn Đức Mạnh
- **Sprint:** Sprint 3
- **Tình trạng:** Hoàn thành 100% (All Tasks Done, All Tests Passed)

---

## 📋 Danh Sách Các Task Đã Thực Hiện

### 1. Task 1: `HTTMDTTHA-36` — Thiết Kế CSDL 10 Bảng ERD & Migration Runner
- **Mô tả:** Thiết kế kiến trúc CSDL quan hệ chuẩn hóa 3NF gồm **10 bảng**:
  1. `users`: Thông tin tài khoản, vai trò và địa chỉ.
  2. `categories`: Danh mục sản phẩm đa cấp (Áo, Quần, Giày, Phụ kiện...).
  3. `brands`: Thương hiệu thời trang (Nike, Adidas, Puma, Gucci, Balenciaga...).
  4. `products`: Sản phẩm chính kèm mô tả, giá gốc, trạng thái.
  5. `product_variants`: Biến thể sản phẩm (Kích thước Size S/M/L/XL, Màu sắc, SKU, Số lượng kho).
  6. `carts`: Giỏ hàng của từng người dùng.
  7. `cart_items`: Các mặt hàng cụ thể nằm trong giỏ.
  8. `orders`: Đơn đặt hàng kèm địa chỉ giao nhận, trạng thái xử lý và tổng tiền.
  9. `order_items`: Chi tiết từng sản phẩm trong đơn hàng tại thời điểm mua.
  10. `payments`: Lịch sử giao dịch thanh toán (COD, Chuyển khoản, Thẻ).
- **Công cụ:** Viết Node.js Native SQLite Migration Runner (`migrations.js`) hỗ trợ các lệnh `up`, `down`, `seed`, `status`.
- **Kết quả kiểm thử:** 5/5 test cases PASS.

---

### 2. Task 2: `HTTMDTTHA-37` — [BE] Product API & Service
- **Mô tả:** Xây dựng hệ thống quản lý và cung cấp dữ liệu sản phẩm:
  - `GET /api/products`: Lấy danh sách sản phẩm có phân trang (pagination), lọc theo danh mục, thương hiệu, sắp xếp theo giá và độ phổ biến.
  - `GET /api/products/:id`: Lấy chi tiết sản phẩm kèm danh sách biến thể màu sắc, kích thước và ảnh chất lượng cao.
  - Xây dựng Seeder dữ liệu thực tế cho các thương hiệu thời trang lớn.
- **Kết quả kiểm thử:** 10/10 test cases PASS.

---

### 3. Task 3: `HTTMDTTHA-38` — [BE] Search & Advanced Filter API
- **Mô tả:** Xây dựng công cụ tìm kiếm và lọc sản phẩm thông minh:
  - `GET /api/search`: Tìm kiếm full-text theo tên sản phẩm, thương hiệu hoặc từ khóa liên quan.
  - Bộ lọc kết hợp đồng thời nhiều điều kiện: khoảng giá (`min_price` - `max_price`), danh mục con, đánh giá sao (`rating >= 4.0`), tình trạng còn hàng.
  - Gợi ý từ khóa tìm kiếm nhanh (Search Suggestions).
- **Kết quả kiểm thử:** 10/10 test cases PASS.

---

### 4. Task 4: `HTTMDTTHA-39` — [BE] Cart & Checkout API
- **Mô tả:** Xây dựng dịch vụ quản lý giỏ hàng:
  - `POST /api/cart/items`: Thêm sản phẩm biến thể vào giỏ.
  - `PUT /api/cart/items/:id`: Cập nhật số lượng mặt hàng trong giỏ, tự động kiểm tra tồn kho.
  - `DELETE /api/cart/items/:id`: Xóa mặt hàng khỏi giỏ.
  - `POST /api/cart/apply-coupon`: Tính toán giảm giá theo mã voucher.
  - Tính toán tự động: Tạm tính, Thuế VAT, Phí vận chuyển và Tổng thanh toán cuối cùng.
- **Kết quả kiểm thử:** 12/12 test cases PASS.

---

### 5. Task 5: `HTTMDTTHA-40` — [BE] Order API & Vòng Đời Đơn Hàng
- **Mô tả:** Xây dựng hệ thống đặt hàng và quản lý trạng thái:
  - `POST /api/orders`: Tạo đơn hàng mới từ giỏ hàng hiện tại, trừ tồn kho trong giao dịch CSDL (Transaction).
  - `GET /api/orders/:id`: Tra cứu chi tiết tiến trình đơn hàng.
  - Quản lý quy tắc chuyển đổi trạng thái nghiêm ngặt:
    - `PENDING` ➔ `CONFIRMED` ➔ `SHIPPING` ➔ `COMPLETED`
    - Cho phép `CANCELLED` khi đơn hàng chưa giao cho đơn vị vận chuyển.
- **Kết quả kiểm thử:** 12/12 test cases PASS.

---

### 6. Task 6 & 7: `HTTMDTTHA-41` — [FE] Giao Diện Catalog, Bộ Lọc & Giỏ Hàng
- **Mô tả:** Giao diện mua sắm thời trang cao cấp:
  - Thanh công cụ lọc sản phẩm đa tiêu chí với giao diện Responsive tối ưu cho cả Mobile và Desktop.
  - Thẻ sản phẩm (Product Card) tích hợp xem nhanh, chọn kích cỡ, chọn màu sắc.
  - Bảng phối đồ thời trang (Fashion Moodboard) tạo cảm hứng phối đồ cho khách hàng.
  - Drawer giỏ hàng trượt ra từ bên phải màn hình hiển thị sản phẩm và tổng tiền tức thì.
  - Hệ thống Toast Notification thông báo thao tác mượt mà, chuyên nghiệp.
- **Kết quả kiểm thử:** 15/15 test cases PASS.
