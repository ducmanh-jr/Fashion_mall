# 🎨 Báo Cáo Kết Quả Task 6: HTTMDTTHA-51 — (FE) Giao diện Quên & Đổi Mật Khẩu

![Type](https://img.shields.io/badge/Task_Type-FRONTEND_(FE)-indigo?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-11%2F11_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. BÁO CÁO THỰC HIỆN

Nhiệm vụ `HTTMDTTHA-51` thuộc Sprint 2 đã hoàn thành 100% yêu cầu tính năng Frontend:
1. **Ràng buộc đuôi Email bắt buộc là `@gmail.com`**:
   - Tất cả các trường Email (Đăng ký, Đăng nhập, Quên mật khẩu) đều được kiểm tra chặt chẽ bởi `validateEmail`.
   - Nếu người dùng nhập địa chỉ không có đuôi `@gmail.com` (VD: `@yahoo.com`, `@outlook.com`), hệ thống từ chối ngay lập tức với thông báo rõ ràng.
2. **Giao diện 3 Bước Quên Mật Khẩu (Sketch Wireframe)**:
   - Nhập sai OTP -> 6 ô OTP đổi màu viền/nền **đỏ** (`.error`).
   - Nhập đủ 6 số OTP đúng -> Tự động xác thực & chuyển thẳng sang Bước 3.

---

## 🧪 2. KẾT QUẢ TEST SUITE (11/11 PASS)

```bash
cd "sprint 2 Nguyen Duc Manh/task 6 fe/test"
node test.js
```

```text
🧪 KIỂM THỬ THỰC NGHIỆM TASK 6: HTTMDTTHA-51 (FE Quên & Đổi Mật Khẩu)

--- 1. Kiểm thử Luồng Quên Mật Khẩu (Forgot Flow) ---
  ✅ [PASS] Chấp nhận dữ liệu hợp lệ (Email @gmail.com chuẩn, OTP 6 số mặc định: 000000, Mật khẩu mới >= 6 ký tự).
  ✅ [PASS] Từ chối OTP chưa đủ 6 chữ số (ví dụ: '123').
  ✅ [PASS] Từ chối Email không có đuôi @gmail.com (ví dụ: @yahoo.com).
  ✅ [PASS] Từ chối mật khẩu mới ngắn hơn 6 ký tự.

--- 2. Kiểm thử Luồng Đổi Mật Khẩu (Change Flow) ---
  ✅ [PASS] Chấp nhận mật khẩu cũ và mật khẩu mới hợp lệ.
  ✅ [PASS] Từ chối khi để trống mật khẩu cũ.
  ✅ [PASS] Từ chối mật khẩu mới ngắn hơn 6 ký tự.

--- 3. Kiểm thử Ràng Buộc Tên Miền Email (@gmail.com) ---
  ✅ [PASS] Chấp nhận Email chuẩn có đuôi @gmail.com.
  ✅ [PASS] Từ chối Email có đuôi @yahoo.com.
  ✅ [PASS] Từ chối Email có đuôi @outlook.com.
  ✅ [PASS] Validate độ dài và yêu cầu mật khẩu.

📊 KẾT QUẢ KIỂM THỬ TASK 6: 11/11 TEST CASES PASS
```
