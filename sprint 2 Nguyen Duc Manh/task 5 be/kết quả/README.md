# 🔒 Báo Cáo Kết Quả Task 5: HTTMDTTHA-47 — (BE) Change Password API

![Type](https://img.shields.io/badge/Task_Type-BACKEND_(BE)-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-3%2F3_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. BÁO CÁO THỰC HIỆN

Nhiệm vụ `HTTMDTTHA-47` thuộc Sprint 2 đã hoàn thành 100% yêu cầu Backend Change Password API:
1. Xác thực và đổi mật khẩu cho người dùng tài khoản **@gmail.com**.
2. Mã hóa Bcrypt bảo mật cho mật khẩu mới.
3. Đã làm sạch thư mục `test/`, loại bỏ các file HTML/CSS thừa.

---

## 🧪 2. KẾT QUẢ TEST SUITE (3/3 PASS)

```bash
cd "sprint 2 Nguyen Duc Manh/task 5 be/test"
node test.js
```

```text
  ✅ [PASS] Từ chối đổi mật khẩu khi nhập sai mật khẩu cũ.
  ✅ [PASS] Đổi mật khẩu thành công khi nhập đúng mật khẩu cũ.
  ✅ [PASS] Mật khẩu mới được mã hóa và xác thực chính xác.
📊 Kết quả Task 5: 3/3 PASS
```
