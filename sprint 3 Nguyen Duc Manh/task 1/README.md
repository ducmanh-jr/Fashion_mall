# 🗄️ Task 1 Sprint 3: HTTMDTTHA-36 — ERD & Migrations cho Catalog, Giỏ Hàng, Đơn Hàng & Thanh Toán

![Task Type](https://img.shields.io/badge/Task_Type-DATABASE_MIGRATION-blue?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Test_Suite-5%2F5_PASS-10b981?style=for-the-badge&logo=github)
![Sprint](https://img.shields.io/badge/Sprint-Sprint_3-indigo?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-blue?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 1](<kết quả/task 1.png>)

---

## 📌 1. TỔNG QUAN NHIỆM VỤ JIRA

- **Mã Jira Issue:** `HTTMDTTHA-36` (liên quan `HTTMDTTHA-11`)
- **Tên nhiệm vụ:** `Thiết kế CSDL cho Sprint 3: ERD & Migrations cho Catalog & Giỏ hàng + Đơn hàng & Thanh toán`
- **Mục tiêu:**
  - Thiết kế ERD và tạo 10 bảng CSDL đáp ứng các tính năng quản lý sản phẩm, giỏ hàng, đặt hàng và thanh toán.
  - Thiết lập khóa ngoại, chỉ mục (indexes), và các ràng buộc toàn vẹn dữ liệu (Constraints).
  - Cấu hình các trạng thái đơn hàng bắt buộc: `PENDING`, `CONFIRMED`, `SHIPPING`, `COMPLETED`, `CANCELLED`.
  - Xây dựng Node.js Migration Runner hỗ trợ lệnh `up()`, `down()`, `seed()`, và `status()`.
  - Viết bộ test tự động (Automated Test Suite) đạt **100% PASS (5/5 tests)**.

---

## 📁 2. CẤU TRÚC THƯ MỤC TASK 1

```
sprint 3 Nguyen Duc Manh/task 1/
├── 📄 README.md                        # Báo cáo tổng quan Task 1 Sprint 3
├── 📁 mã nguồn/                        # Mã nguồn CSDL & Migration Runner
│   ├── 📄 schema.sql                   # SQL DDL định nghĩa 10 bảng, FKs, Indexes & CHECK constraints
│   ├── 📄 migrations.js                # Migration Runner (Node.js Native node:sqlite)
│   └── 📄 seed.sql                     # Dữ liệu mẫu khởi tạo cho 10 bảng CSDL
├── 📁 test/                            # Thư mục kiểm thử tự động
│   └── 📄 test.js                      # Automated Test Suite (5/5 PASS - Node.js assertion)
└── 📁 kết quả/                         # Kết quả kiểm thử & Minh chứng
    ├── 📄 README.md                    # Báo cáo chi tiết kết quả test
    └── 📸 task 1.png                   # Ảnh minh chứng Jira Work Item thực tế
```

---

## 🗃️ 3. CHI TIẾT CÁC BẢNG CƠ SỞ DỮ LIỆU (10 BẢNG)

| STT | Tên Bảng | Mô Tả Chức Năng | Các Ràng Buộc & Khóa Ngoại Chi Tiết |
|:---:|:---|:---|:---|
| 1 | `Categories` | Danh mục sản phẩm đa cấp | `PK: id`, `UQ: slug`, `FK: parent_id -> Categories(id) ON DELETE SET NULL` |
| 2 | `Products` | Sản phẩm đăng bán bởi người bán | `PK: id`, `UQ: slug`, `FK: category_id -> Categories(id) ON DELETE RESTRICT`, `CHECK: base_price >= 0` |
| 3 | `Product_Images` | Quản lý tối đa 5 hình ảnh sản phẩm | `PK: id`, `FK: product_id -> Products(id) ON DELETE CASCADE` |
| 4 | `Inventories` | Hàng tồn kho & Cảnh báo kho | `PK: id`, `FK, UQ: product_id -> Products(id) ON DELETE CASCADE`, `CHECK: quantity >= 0` |
| 5 | `Carts` | Giỏ hàng của từng khách hàng | `PK: id`, `UQ: user_id`, `CHECK: status IN ('ACTIVE', 'CHECKED_OUT', 'ABANDONED')` |
| 6 | `Cart_Items` | Chi tiết mặt hàng nằm trong giỏ | `PK: id`, `FK: cart_id -> Carts(id)`, `FK: product_id -> Products(id)`, `UQ(cart_id, product_id)` |
| 7 | `Orders` | Đơn hàng mua sắm | `PK: id`, `UQ: order_code`, `CHECK: status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED')` |
| 8 | `Order_Items` | Mặt hàng chi tiết trong đơn | `PK: id`, `FK: order_id -> Orders(id)`, `FK: product_id -> Products(id) ON DELETE RESTRICT` |
| 9 | `Payments` | Giao dịch thanh toán (COD/Online) | `PK: id`, `FK: order_id -> Orders(id)`, `CHECK: payment_method IN ('COD', 'ONLINE', 'BANK_TRANSFER', 'E_WALLET')` |
| 10 | `Order_Status_Histories` | Nhật ký chuyển đổi trạng thái đơn | `PK: id`, `FK: order_id -> Orders(id)`, `CHECK: new_status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED')` |

---

## 🔄 4. CẤU HÌNH TRẠNG THÁI ĐƠN HÀNG (ORDER STATUS FLOW)

CSDL áp dụng ràng buộc `CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'))`:

```
   [ PENDING ]  ---> (Người bán bấm xác nhận)  ---> [ CONFIRMED ]
        |                                                 |
        v (Khách/Hệ thống hủy)                            v (Giao hàng)
   [ CANCELLED ]                                    [ SHIPPING ]
                                                          |
                                                          v (Giao thành công)
                                                    [ COMPLETED ]
```

---

## 🧪 5. HƯỚNG DẪN CHẠY KIỂM THỬ VÀ MIGRATIONS

### 5.1. Chạy Bộ Kiểm Thử Tự Động (Automated Test Suite)
```bash
cd "sprint 3 Nguyen Duc Manh/task 1/test"
node test.js
```

### 5.2. Chạy Lệnh Migrations CLI
```bash
cd "sprint 3 Nguyen Duc Manh/task 1/mã nguồn"

# Khởi tạo CSDL (Apply Up)
node migrations.js up

# Nạp dữ liệu mẫu (Seed Data)
node migrations.js seed

# Rollback toàn bộ CSDL (Apply Down)
node migrations.js down
```

---

## 📊 6. KẾT QUẢ KIỂM THỬ THỰC TẾ

```text
================================================================
🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 1 (HTTMDTTHA-36)
================================================================

🔹 [TEST 1/5] Checking Migration Up & Table Existence (10 Tables)...
  ✅ [PASS] Successfully verified creation of all 10/10 required database tables.

🔹 [TEST 2/5] Testing Foreign Key Constraints...
  ✅ [PASS] Foreign Key Constraint blocked orphan child insertion as expected.

🔹 [TEST 3/5] Testing Order Status CHECK Constraints...
  ✅ [PASS] Order Status CHECK constraint strictly validated (PENDING, CONFIRMED, SHIPPING, COMPLETED, CANCELLED).

🔹 [TEST 4/5] Testing Seed Data Insertion & Query Verification...
  ✅ [PASS] Seed data loaded successfully: 4 Categories, 3 Products, 5 Orders, 4 Payments, 6 Status Histories verified.

🔹 [TEST 5/5] Testing Migration Down (Rollback)...
  ✅ [PASS] Rollback migration executed successfully. All 10 tables dropped without orphans.

================================================================
📊 RESULT TASK 1 SPRINT 3: 5/5 TESTS PASS (100%)
================================================================
```
