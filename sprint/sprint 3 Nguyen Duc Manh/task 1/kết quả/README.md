# 📊 Báo Cáo Kết Quả Kiểm Thử: Task 1 Sprint 3 (HTTMDTTHA-36)

![Test Suite](https://img.shields.io/badge/Test_Suite-5%2F5_PASS-10b981?style=for-the-badge&logo=github)
![Status](https://img.shields.io/badge/Task_Status-COMPLETED-blue?style=for-the-badge)
![Member](https://img.shields.io/badge/Developer-Nguyen_Duc_Manh-indigo?style=for-the-badge)

---

## 📸 MINH CHỨNG JIRA WORK ITEM THỰC TẾ

![Jira Work Item Task 1](<task 1.png>)

---

## 📌 1. TỔNG QUAN KẾT QUẢ THỰC NGHIỆM

Bộ kiểm thử tự động (Automated Test Suite) đã chạy trực tiếp trên môi trường Node.js (v24 native `node:sqlite`) và đạt kết quả **5/5 PASS (100%)**.

### Bảng Tổng Hợp Kiểm Thử:

| STT | Tên Bài Kiểm Thử | Yêu Cầu Kỹ Thuật | Trạng Thái | Kết Quả Chạy Thực Tế |
|:---:|:---|:---|:---:|:---:|
| 1 | **Migration Up & Table Existence** | Khởi tạo thành công 10/10 bảng (`Categories`, `Products`, `Product_Images`, `Inventories`, `Carts`, `Cart_Items`, `Orders`, `Order_Items`, `Payments`, `Order_Status_Histories`) | `PASS` | ✅ 10/10 Tables Present |
| 2 | **Foreign Key Constraints** | Kiểm tra ràng buộc khóa ngoại ngăn ngừa dữ liệu mồ côi (Orphan Records) | `PASS` | ✅ Blocked invalid FK |
| 3 | **Order Status CHECK Constraints** | Kiểm tra các trạng thái đơn bắt buộc: `PENDING`, `CONFIRMED`, `SHIPPING`, `COMPLETED`, `CANCELLED` | `PASS` | ✅ CHECK Constraint Passed |
| 4 | **Seed Data & Query Integrity** | Nạp và truy vấn dữ liệu mẫu cho tất cả các bảng | `PASS` | ✅ Seed Loaded & Verified |
| 5 | **Migration Down (Rollback)** | Rollback toàn bộ CSDL theo đúng thứ tự phụ thuộc khóa ngoại | `PASS` | ✅ All 10 Tables Dropped |

---

## 🧪 2. NHẬT KÝ XUẤT RA TỪ AUTOMATED TEST SUITE

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

🔹 [TEST 4/5] Testing Schema Data Insertion & Query Verification...
  ✅ [PASS] Schema data insertion & foreign key queries verified across all core tables.

🔹 [TEST 5/5] Testing Migration Down (Rollback)...
  ✅ [PASS] Rollback migration executed successfully. All 10 tables dropped without orphans.

================================================================
📊 RESULT TASK 1 SPRINT 3: 5/5 TESTS PASS (100%)
================================================================
```

```
