# 🔒 Task 5: HTTMDTTHA-47 — (BE) Change Password API

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-3%2F3_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-47`
- **Loại nhiệm vụ:** `Backend (BE)`
- **Tên nhiệm vụ:** `(BE) API Đổi mật khẩu tài khoản người dùng`
- **Mục tiêu:**
  - Xây dựng Backend Service `changePassword` cho người dùng đã xác thực JWT.
  - Đối soát mật khẩu cũ qua mã hóa Bcrypt.
  - Kiểm tra độ dài mật khẩu mới tối thiểu 6 ký tự và cập nhật vào CSDL.

---

## 📁 2. CẤU TRÚC THƯ MỤC BE

```
task 5 be/
├── 📄 README.md                        # Báo cáo tổng quan Task 5
├── 📁 mã nguồn/                        # Mã nguồn BE chính
│   └── 📄 change-pass-service.js       # Service Đổi Mật Khẩu
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (3/3 PASS - Pure Node.js)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả
    └── 🖼️ task 5.png                   # Ảnh chụp giao diện minh chứng
```

---

## 🧪 3. HƯỚNG DẪN CHẠY KIỂM THỬ

```bash
cd "sprint 2 Nguyen Duc Manh/task 5 be/test"
node test.js
```

### Kết Quả Thực Nghiệm (3/3 PASS):
```text
  ✅ [PASS] Từ chối đổi mật khẩu khi nhập sai mật khẩu cũ.
  ✅ [PASS] Đổi mật khẩu thành công khi nhập đúng mật khẩu cũ.
  ✅ [PASS] Mật khẩu mới được mã hóa và xác thực chính xác.
📊 Kết quả Task 5: 3/3 PASS
```
