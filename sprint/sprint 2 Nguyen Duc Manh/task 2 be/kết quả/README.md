# ⚙️ Báo Cáo Kết Quả Task 2: HTTMDTTHA-9 — (BE) Route Guards & RBAC

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-3%2F3_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. BÁO CÁO THỰC HIỆN

Nhiệm vụ `HTTMDTTHA-9` thuộc Sprint 2 đã hoàn thành 100% yêu cầu Backend Route Protection:
1. Middleware `authenticateToken` xác thực mã JWT Bearer.
2. Middleware `requireRole` bảo vệ tài nguyên theo vai trò `Customer`, `Seller`, `Admin`.
3. Đã làm sạch thư mục `test/`, chỉ giữ file kiểm thử `test.js` thuần Node.js.

---

## 🧪 2. KẾT QUẢ TEST SUITE (3/3 PASS)

```bash
cd "sprint 2 Nguyen Duc Manh/task 2 be/test"
node test.js
```

```text
  ✅ [PASS] Chặn truy cập Unauthenticated (HTTP 401).
  ✅ [PASS] Chặn Customer vào trang Admin (HTTP 403 Forbidden).
  ✅ [PASS] Cho phép Admin truy cập Admin Dashboard (HTTP 200 OK).
📊 Kết quả Task 2: 3/3 PASS
```
