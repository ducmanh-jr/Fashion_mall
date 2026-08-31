# ⚙️ Task 2: HTTMDTTHA-9 — (BE) Route Guards & Role-Based Access Control (RBAC)

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-3%2F3_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-9`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) Phân quyền truy cập các Route Guard (Protect Route)`
- **Mục tiêu:**
  - Xây dựng Backend Middleware bảo vệ Route Endpoint (`authenticateToken`) kiểm tra Bearer JWT Token.
  - Phân quyền người dùng (`requireRole`) ngăn chặn truy cập trái phép giữa các vai trò `Customer`, `Seller` và `Admin`.
  - Trả về đúng mã HTTP Status Standard: `401 Unauthorized` (chưa đăng nhập) và `403 Forbidden` (không đủ quyền).

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 2 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 2
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   ├── 📄 route-guard.js               # Middleware authenticateToken & requireRole
│   └── 📄 auth-api.js                  # Router API Auth
├── 📁 test/                            # Thư mục kiểm thử & Test UI Client
│   ├── 📄 test.js                      # Automated Test Suite (3/3 PASS)
│   └── 📄 index.html                   # Interactive RBAC Admin Dashboard (Light Theme)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 2.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd test
node test.js
```

### Kết Quả Thực Nghiệm (3/3 PASS):
```text
  ✅ [PASS] Chặn truy cập Unauthenticated (HTTP 401).
  ✅ [PASS] Chặn Customer vào trang Admin (HTTP 403 Forbidden).
  ✅ [PASS] Cho phép Admin truy cập Admin Dashboard (HTTP 200 OK).
📊 Kết quả Task 2: 3/3 PASS
```
