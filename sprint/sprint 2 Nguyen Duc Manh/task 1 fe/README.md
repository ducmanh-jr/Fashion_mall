# 🎨 Task 1: HTTMDTTHA-6 — [Frontend] Giao diện Form Đăng Ký & Đăng Nhập (Aethelgard Shopping Mall)

![Task Type](https://img.shields.io/badge/Task_Type-FRONTEND_(FE)-indigo?style=for-the-badge)
![Test Status](https://img.shields.io/badge/Test_Suite-20%2F20_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_2-indigo?style=for-the-badge)
![Developer](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-6`
- **Loại nhiệm vụ:** `Frontend (FE)`
- **Tên nhiệm vụ:** `[Frontend] Làm giao diện cho form đăng ký, đăng nhập`
- **Thương hiệu:** **Aethelgard Shopping Mall** — Sàn thương mại điện tử đa ngành hàng tích hợp AI.
- **Mục tiêu:**
  - Thiết kế cổng xác thực Đăng ký / Đăng nhập 50:50 chuyên nghiệp chuẩn sản xuất (Production-Ready).
  - Tích hợp bộ tự động chuyển slide ảnh 2 cột 15 giây mượt mà không bị giật lag khi chuyển tab.
  - Tích hợp **Form Validator System** kiểm tra toàn bộ điều kiện ràng buộc (Validation Rules) và trường hợp biên (Edge Cases) cho **Full Name**, **Email Address**, và **Password**.
  - Xây dựng component **Password Strength Meter** đánh giá độ mạnh mật khẩu realtime qua 5 tiêu chí bảo mật trực quan.

---

## 📋 2. CHI TIẾT CÁC ĐIỀU KIỆN RÀNG BUỘC (VALIDATION RULES & EDGE CASES)

Dưới đây là tổng hợp các trường hợp điều kiện ràng buộc (validation rules) chi tiết cho form đăng ký gồm 3 trường **Full Name**, **Email Address**, và **Password**, bao gồm cả kiểm tra frontend, backend và các trường hợp biên (edge cases):

### 1. Full Name (Họ và tên)

* **Bắt buộc (Required):** Không được để trống hoặc chỉ chứa khoảng trắng.
* **Độ dài (Length):**
  * Tối thiểu: `2` ký tự (sau khi `trim()`).
  * Tối đa: `50 – 100` ký tự (tránh vượt quá kích thước cơ sở dữ liệu).
* **Định dạng ký tự (Format):**
  * Chỉ cho phép chữ cái (bao gồm chữ có dấu Tiếng Việt / Unicode) và khoảng trắng.
  * Không chứa số (`0-9`) hoặc ký tự đặc biệt (`!@#$%^&*()_+=...`).
  * Không cho phép 2 hoặc nhiều khoảng trắng liên tiếp nhau (VD từ chối: `Nguyễn   Mạnh`).
  * Không bắt đầu hoặc kết thúc bằng khoảng trắng (tự động `trim()` trước khi validate).
* **Trường hợp biên / Bảo mật:**
  * Chống mã độc XSS / SQL Injection (mã hóa HTML entity: `<script>` ➔ `&lt;script&gt;`, loại bỏ script tag).

---

### 2. Email Address (Địa chỉ Email)

* **Bắt buộc (Required):** Không được để trống.
* **Định dạng chuẩn (Format):** Đúng cấu trúc `username@domain.extension` (sử dụng RegEx tiêu chuẩn RFC 5322).
  * Phần username: Không chứa ký tự đặc biệt không hợp lệ.
  * Phải có ký tự `@`.
  * Phần domain phải có ít nhất một dấu chấm `.` và phần mở rộng (extension) từ 2 ký tự trở lên (VD: `.com`, `.vn`).
* **Độ dài (Length):** Tối đa `254` ký tự (chuẩn RFC).
* **Ràng buộc nghiệp vụ (Business Rules):**
  * Không trùng lặp: Email chưa từng được đăng ký trong hệ thống (Unique Check tại backend).
  * Chuyển về chữ thường (`lowercase`) trước khi lưu để tránh trùng lặp do phân biệt hoa/thường (`A@g.com` vs `a@g.com`).
  * (Tùy chọn) Loại bỏ các email rác/email ảo dùng 1 lần (Disposable email blocklist).

---

### 3. Password (Mật khẩu)

* **Bắt buộc (Required):** Không được để trống.
* **Độ dài (Length):** Tối thiểu `8` ký tự, tối đa `64 – 128` ký tự.
* **Độ phức tạp (Complexity):** Đạt 5 tiêu chí bảo mật trực quan:
  1. Tối thiểu 8 ký tự (`hasMin`)
  2. Có chữ hoa A-Z (`hasUpper`)
  3. Có chữ thường a-z (`hasLower`)
  4. Có chữ số 0-9 (`hasNumber`)
  5. Có ký tự đặc biệt `!@#$%^&*...` (`hasSpecial`)
* **Tính năng UI đi kèm:**
  * Nút **"Toggle Password Visibility"** (Biểu tượng con mắt) để ẩn/hiện mật khẩu phải hoạt động chính xác trạng thái `type="password"` và `type="text"`.

---

## 📁 3. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
task 1 fe/
├── 📄 README.md                        # Tài liệu hướng dẫn & báo cáo kỹ thuật Task 1
├── 📁 mã nguồn/                        # Mã nguồn Frontend chính
│   ├── 📄 index.html                   # Giao diện Auth Portal Aethelgard Shopping Mall
│   ├── 📄 style.css                    # Design System, Tab Switcher 60fps & Responsive
│   ├── 📄 app.js                       # Logic tương tác UI & Auto Slider 15s
│   ├── 📄 form-validator.js            # Module xử lý Validation & XSS Sanitizer cho 3 trường
│   ├── 📄 password-meter.js            # Thuật toán đánh giá độ mạnh mật khẩu 5 tiêu chí
│   ├── 📄 brand-config.js             # Cấu hình hệ thống thương hiệu động
│   └── 📁 img/                         # Thư mục chứa 17 ảnh chất lượng cao (1.jpg -> 17.jpg)
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (20/20 PASS)
```

---

## 🧪 4. HƯỚNG DẪN CHẠY KIỂM THỬ TỰ ĐỘNG

Chạy lệnh sau tại thư mục gốc dự án:

```bash
node test/test.js
```

### Kết Quả Thực Nghiệm (20/20 PASS):

```text
===============================================================
🧪 KIỂM THỬ THỰC NGHIỆM TASK 1: HTTMDTTHA-6 (Form Validation Suite)
===============================================================

  ✅ [PASS] Full Name: Từ chối khi để trống.
  ✅ [PASS] Full Name: Từ chối khi chỉ chứa khoảng trắng.
  ✅ [PASS] Full Name: Từ chối độ dài < 2 ký tự.
  ✅ [PASS] Full Name: Hợp lệ với tiếng Việt có dấu Unicode.
  ✅ [PASS] Full Name: Từ chối khi chứa ký tự số (0-9).
  ✅ [PASS] Full Name: Từ chối khi chứa ký tự đặc biệt.
  ✅ [PASS] Full Name: Từ chối khi chứa 2 hoặc nhiều khoảng trắng liên tiếp.
  ✅ [PASS] Full Name: Tự động trim() khoảng trắng đầu và cuối.
  ✅ [PASS] Full Name: Mã hóa HTML entities chống XSS.
  ✅ [PASS] Email: Từ chối khi để trống.
  ✅ [PASS] Email: Từ chối khi thiếu ký tự '@' và domain.
  ✅ [PASS] Email: Từ chối khi thiếu phần mở rộng extension (.com, .vn).
  ✅ [PASS] Email: Hợp lệ đúng chuẩn RFC 5322.
  ✅ [PASS] Email: Tự động chuyển về dạng chữ thường (lowercase).
  ✅ [PASS] Password: Mật khẩu '123' đánh giá đúng mức YẾU.
  ✅ [PASS] Password: Mật khẩu 'pass1234' đánh giá đúng mức TRUNG BÌNH.
  ✅ [PASS] Password: Mật khẩu 'Pass1234' đánh giá đúng mức MẠNH.
  ✅ [PASS] Password: Mật khẩu 'StrongPass123!@#' đánh giá đúng mức RẤT MẠNH.
  ✅ [PASS] Password: Phân tích đầy đủ 5 tiêu chí độ phức tạp.
  ✅ [PASS] Brand System: Cấu hình thương hiệu Aethelgard Shopping Mall nạp thành công.

📊 Kết quả Task 1: 20/20 PASS
```
