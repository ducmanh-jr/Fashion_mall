# 🛒 CUSTOMER WEB MODULE — HƯỚNG DẪN DÀNH CHO DEV KHÁCH HÀNG

## 📌 Phân Công Trách Nhiệm
- **Nhóm phụ trách:** Lập trình viên Customer (Khách mua sắm)
- **Phạm vi làm việc:**
  - Thư mục Components: `src/components/customer/`
  - Thư mục Trang: `src/app/shop/` hoặc `src/app/(customer)/`
  - Các chức năng: Danh mục mua sắm, Bộ sưu tập thời trang, Trang chi tiết sản phẩm khách hàng, Giỏ hàng cá nhân, Checkout thanh toán online/COD, Lịch sử đơn hàng của tôi.

---

## 🏗️ Kiến Trúc Được Sử Dụng Sẵn (Không Cần Viết Lại):
Khi phát triển giao diện Khách Hàng, bạn **dùng trực tiếp** các tài nguyên lõi đã được Nguyễn Đức Mạnh chuẩn hóa:

1. **Gọi API:**
   - Dùng `productService` từ `@/services/product.service` (lấy danh sách sản phẩm, chi tiết sản phẩm).
   - Dùng `orderService` từ `@/services/order.service` (tạo đơn hàng, tra cứu đơn hàng).
   - Dùng `authService` từ `@/services/auth.service` (đăng nhập/đăng ký tài khoản khách).

2. **UI Kit dùng chung (`@/components/ui`):**
   - `Button`: Nút bấm đa kích thước và biến thể màu sắc.
   - `Modal`: Hộp thoại popup có sẵn hiệu ứng mờ nền và phím Escape.
   - `Card`, `CardHeader`, `CardContent`: Thẻ hiển thị nội dung.
   - `Badge`: Huy hiệu trạng thái, tag khuyến mãi.
   - `Input`: Ô nhập liệu có validation lỗi và label tự động.
   - `Skeleton`: Hiệu ứng tải trang khung xương khi đợi API.

3. **Hooks & Tiện ích:**
   - `useAuth()`: Lấy thông tin khách hàng đang đăng nhập, hàm logout.
   - `useToast()`: Hiển thị thông báo toast góc màn hình (`showToast('Đã thêm vào giỏ!')`).
   - `formatVND(amount)` từ `@/lib/utils`: Format tiền tệ chuẩn Việt Nam (ví dụ: `2.790.000 đ`).

---

## 🚫 Quy Tắc Tránh Xung Đột Code (Anti-Conflict Rules)
1. **KHÔNG** sửa trực tiếp vào thư mục `src/components/seller/` (thuộc phân hệ Người Bán).
2. **KHÔNG** tự ý sửa `src/services/api-client.ts` nếu chưa thảo luận với Lead/Seller Dev.
3. Mọi component mới phục vụ giao diện Khách hàng đặt trong `src/components/customer/`.
