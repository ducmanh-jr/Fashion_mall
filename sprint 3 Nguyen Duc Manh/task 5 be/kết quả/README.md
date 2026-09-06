# 📊 Kết Quả Kiểm Thử Task 5 BE: HTTMDTTHA-15 — [Backend] API Tìm Kiếm, Lọc Danh Mục & Sắp Xếp

![Test Suite](https://img.shields.io/badge/Test_Suite-12%2F12_PASS-10b981?style=for-the-badge&logo=github)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 5](<task 5.png>)

---

## 📌 Bảng Tổng Hợp Kiểm Thử

| STT | Tên Test Case | Chức Năng (User Story) | Trạng Thái | Kết Quả |
|:---:|:---|:---|:---:|:---:|
| 1 | `Customer Order History` | US-20: Lịch sử đơn hàng khách | `PASS` | ✅ Lấy đúng danh sách đơn & chi tiết món |
| 2 | `Status Transition CONFIRMED` | US-21: Seller duyệt đơn | `PASS` | ✅ Đổi status CONFIRMED & lưu history log |
| 3 | `Status Transition SHIPPING` | US-21: Giao đơn đơn | `PASS` | ✅ Đổi status SHIPPING & lưu history log |
| 4 | `Status Transition COMPLETED` | US-22: Seller xác nhận hoàn thành | `PASS` | ✅ Đổi status COMPLETED & payment PAID |
| 5 | `Terminal State Lock` | Khóa trạng thái đơn kết thúc | `PASS` | ✅ Chặn sửa đổi đơn đã COMPLETED |
| 6 | `Invalid Status Name` | Kiểm tra trạng thái không hợp lệ | `PASS` | ✅ Tên trạng thái sai bị từ chối |
| 7 | `Admin Revenue Analytics` | US-23: Thống kê doanh thu | `PASS` | ✅ Thống kê tổng đơn & doanh thu theo ngày |
| 8 | `API GET /my-orders` | Express Route Lịch sử đơn | `PASS` | ✅ Trả về HTTP 200 OK |
| 9 | `API PUT /orders/:id/status` | Express Route Duyệt đơn | `PASS` | ✅ Trả về HTTP 200 OK |
| 10 | `API GET /admin/dashboard` | Express Route Admin Dashboard | `PASS` | ✅ Trả về HTTP 200 OK |
| 11 | `Order Cancellation` | Hủy đơn PENDING/CONFIRMED | `PASS` | ✅ Chuyển sang CANCELLED hợp lệ |
| 12 | `Audit Log Retention` | Nhật ký biến động CSDL | `PASS` | ✅ Lưu đủ lịch sử biến động trong DB |

---

## 🧪 Nhật Ký Chi Tiết (Log Output)

```text
================================================================
🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 5 BE (HTTMDTTHA-40)
================================================================

🔹 [TEST 1/12] OrderService.getCustomerOrders() (US-20)...
  ✅ [PASS] Customer orders retrieved.

🔹 [TEST 2/12] OrderService.updateOrderStatus() CONFIRMED (US-21)...
  ✅ [PASS] Transition to CONFIRMED verified.

🔹 [TEST 3/12] OrderService.updateOrderStatus() SHIPPING (US-21)...
  ✅ [PASS] Transition to SHIPPING verified.

🔹 [TEST 4/12] OrderService.updateOrderStatus() COMPLETED (US-22)...
  ✅ [PASS] Transition to COMPLETED & payment status update verified.

🔹 [TEST 5/12] State transition lock on COMPLETED order...
  ✅ [PASS] Terminal state lock enforced.

🔹 [TEST 6/12] Invalid status name rejection...
  ✅ [PASS] Invalid status rejected.

🔹 [TEST 7/12] OrderService.getAdminDashboard() (US-23)...
  ✅ [PASS] Admin dashboard summary generated.

🔹 [TEST 8/12] Express API GET /api/orders/my-orders...
  ✅ [PASS] Express API customer orders route verified.

🔹 [TEST 9/12] Express API PUT /api/orders/:id/status...
  ✅ [PASS] Express API status transition route verified.

🔹 [TEST 10/12] Express API GET /api/admin/dashboard...
  ✅ [PASS] Express API admin dashboard route verified.

🔹 [TEST 11/12] Order cancellation (CONFIRMED -> CANCELLED)...
  ✅ [PASS] Order cancellation verified.

🔹 [TEST 12/12] Audit log retention in Order_Status_Histories...
  ✅ [PASS] Audit logs recorded and retained in CSDL.

================================================================
📊 RESULT TASK 5 BE: 12/12 TESTS PASS (100%)
================================================================
```
