# ⚙️ ADMIN PANEL MODULE — HƯỚNG DẪN DÀNH CHO DEV QUẢN TRỊ VIÊN

## 📌 Phân Công Trách Nhiệm
- **Nhóm phụ trách:** Lập trình viên Admin (Quản trị sàn thương mại điện tử)
- **Phạm vi làm việc:**
  - Thư mục Components: `src/components/admin/`
  - Thư mục Trang: `src/app/admin/` hoặc `src/app/(admin)/`
  - Các chức năng: Quản lý & duyệt tài khoản Người Bán (KYC), Quản lý danh mục ngành hàng toàn sàn, Giám sát doanh thu hoa hồng sàn (3.5%), Báo cáo vi phạm và kiểm duyệt nội dung niêm yết.

---

## 🏗️ Tài Nguyên Dùng Chung Được Chuẩn Hóa Sẵn:
1. **Gọi API:**
   - Dùng `apiClient` từ `@/services/api-client` (đã tự động đính kèm Token JWT quyền Admin).
   - Dùng `authService` từ `@/services/auth.service` để xác thực quyền hạn `user.role === 'Admin'`.
   - Dùng `statisticsService` từ `@/services/statistics.service` để lấy dữ liệu biểu đồ kinh doanh toàn sàn.

2. **UI Kit dùng chung (`@/components/ui`):**
   - `KPICard`: Hiển thị các chỉ số đo lường toàn sàn (Tổng seller, Doanh số sàn, Tỷ lệ khiếu nại).
   - `Table`: Dùng cấu trúc bảng có sẵn từ `@/components/ui/Skeleton` để làm Skeleton table.
   - `Button`, `Modal`, `Input`, `Badge`: Dùng chung để bảo đảm nhận diện thương hiệu đồng nhất.

3. **Hooks & Tiện ích:**
   - `useAuth()`: Kiểm tra quyền quản trị viên (`user?.role === 'Admin'`).
   - `useToast()`: Báo cáo kết quả duyệt hồ sơ, cảnh báo hệ thống.
   - `formatVND(amount)` từ `@/lib/utils`.

---

## 🚫 Quy Tắc Tránh Xung Đột Code (Anti-Conflict Rules)
1. **KHÔNG** sửa vào `src/components/seller/` hay `src/components/customer/`.
2. Mọi UI đặc thù của ban quản trị đặt gọn gàng trong `src/components/admin/`.
