# ⚙️ Task 5: HTTMDTTHA-47 — (BE) xây api đổi mật khẩu

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-3%2F3_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-47`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) xây api đổi mật khẩu`
- **Mục tiêu:**
  - Viết Backend API `/api/auth/change-password` xác thực mật khẩu cũ qua `bcrypt.compareSync`.
  - Mã hóa mật khẩu mới bằng `bcrypt.hashSync` (10 rounds).
  - Trả về thông báo thành công hoặc lỗi chi tiết.

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 5/
├── 📄 README.md                        # Báo cáo tổng quan Task 5
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   └── 📄 change-pass-service.js       # Logic kiểm tra & đổi mật khẩu bcrypt
├── 📁 test/                            # Thư mục kiểm thử & Test UI Client
│   ├── 📄 test.js                      # Automated Test Suite (3/3 PASS)
│   └── 📄 index.html                   # HTML Test Client
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 5.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd test
node test.js
```

### Kết Quả Thực Nghiệm (3/3 PASS):
```text
  ✅ [PASS] Từ chối đổi mật khẩu khi nhập sai mật khẩu cũ.
  ✅ [PASS] Đổi mật khẩu thành công khi nhập đúng mật khẩu cũ.
  ✅ [PASS] Mật khẩu mới được mã hóa và xác thực chính xác.
📊 Kết quả Task 5: 3/3 PASS
```
