# BÁO CÁO 03: PRICING & COMMERCIAL FINANCIAL DATA (DỮ LIỆU GIÁ BÁN & KHUYẾN MÃI)
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Dữ liệu giá (Pricing Data) là một trong những thông tin quan trọng nhất để làm nghiên cứu thị trường, theo dõi chênh lệch giá giữa các khu vực (Arbitrage/Market Intelligence), dự đoán xu hướng giảm giá (Markdown cadence) và theo dõi chính sách tăng giá của các nhà mốt xa xỉ (Price Hike index).

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `currency` | String (ISO 4217)| Có | Mã tiền tệ chuẩn hóa 3 ký tự | `EUR`, `USD`, `VND` | `EUR`, `USD`, `GBP` | `USD`, `VND`, `JPY` |
| `regular_price` (MSRP) | Decimal/Float | Có | Giá niêm yết gốc (Original List Price) | `3350.00` | `2400.00` | `100.00` |
| `current_price` | Decimal/Float | Có | Giá bán thực tế tại thời điểm cào | `3350.00` | `2400.00` | `70.00` (đang sale) |
| `discount_amount` | Decimal/Float | Không | Số tiền được giảm giá | `0.00` | `0.00` | `30.00` |
| `discount_percentage`| Integer/Float | Không | Phần trăm giảm giá (%) | `0` | `0` | `30` (30% off) |
| `is_on_sale` | Boolean | Có | Đang áp dụng chương trình giảm giá | `false` | `false` | `true` |
| `price_on_request` | Boolean | Có | Sản phẩm không hiển thị giá (liên hệ) | `true` (Fine Jewelry) | `false` | `false` |
| `tax_included` | Boolean | Có | Giá đã bao gồm thuế (VAT) chưa | `true` (ở Châu Âu/VN) | `false` (ở Mỹ) | `false` (ở Mỹ) |
| `vat_rate` | Float | Không | Tỷ lệ thuế ước tính nếu có | `0.20` (20% Pháp) | `null` | `0.08` |
| `installment_plan` | Object | Không | Hỗ trợ trả góp (Klarna, Afterpay, v.v.)| `null` | `{"provider":"Klarna","installments":4,"monthly":600.0}` | `{"provider":"Afterpay","amount":25.0}` |
| `price_history` | Array[Object]| Không | Lịch sử biến động giá qua các lần cào | `[{"price": 3100, "date": "2024-01-01"}]` | `[{"price": 2200, "date": "2023-11-15"}]` | `[{"price": 100, "date": "2024-05-01"}]` |

---

## 3. Khác biệt cốt lõi: Luxury (Dior, Gucci) vs Sportswear (Adidas)

### 3.1. Luxury (Dior, Gucci)
- **Tuyệt đối KHÔNG hiển thị giảm giá công khai trên Storefront chính thức:** Các hãng như Dior, Chanel, Hermès, Gucci gần như không bao giờ có tag "Sale 30%" trên website chính thức (hàng tồn chuyển sang Private Sale nội bộ hoặc outlet tách biệt).
- **Price On Application (POA / Price Upon Request):** Các sản phẩm High Jewelry, túi da cá sấu quý hiếm hoặc đầm Haute Couture sẽ để nhãn "Contact a Client Advisor" thay vì hiển thị con số giá. Trường `price_on_request` cần được xử lý riêng rẽ để tránh lỗi kiểu dữ liệu `null`.
- **Chênh lệch giá địa lý (Geo-pricing Index):** Cùng chiếc túi Dior Book Tote, giá ở Paris (Pháp, đã bao gồm VAT và có thể hoàn thuế 12%) thường rẻ hơn 15% - 25% so với mua tại New York hay Thượng Hải, Tokyo.

### 3.2. Sportswear (Adidas)
- **Cấu trúc khuyến mãi động (Dynamic Promotions):** Giá thay đổi liên tục theo chiến dịch (Black Friday, Back to School, Member Days).
- **Phân mảnh giá theo Variant/Màu:** Một đôi giày Adidas UltraBoost cùng model nhưng màu bán chạy (Triple White) giữ nguyên \$190, còn màu kén người mua có thể giảm còn \$110. Cần lưu giá ở cấp độ `Variant` (Child SKU), không chỉ ở cấp độ `Parent`.
- **Mã voucher / Member Discount:** Thường có trường giá `member_price` hoặc giá sau khi nhập voucher coupon code.

---

## 4. Thách thức trích xuất & Giải pháp kỹ thuật

1. **Chuỗi giá chứa ký tự tiền tệ địa phương không đồng nhất:**
   - *Vấn đề:* Ký tự `€`, `$`, `£`, `₫`, định dạng dấu phẩy và chấm đảo lộn (ví dụ Pháp: `3.350,00 €` vs Mỹ: `$3,350.00`).
   - *Giải pháp:* Viết hàm Regex Regex Parser chuẩn hóa:
     ```python
     import re
     def parse_price(raw_str):
         cleaned = re.sub(r"[^\d,\.]", "", raw_str).strip()
         # Xử lý format Châu Âu (chấm phân cách nghìn, phẩy thập phân)
         if ',' in cleaned and '.' in cleaned:
             if cleaned.find('.') < cleaned.find(','):
                 cleaned = cleaned.replace('.', '').replace(',', '.')
             else:
                 cleaned = cleaned.replace(',', '')
         elif ',' in cleaned:
             cleaned = cleaned.replace(',', '.')
         return float(cleaned)
     ```
2. **Xác định storefront theo IP/Geolocation:**
   - *Vấn đề:* Website tự redirect theo IP của crawler sang storefront nội địa (ví dụ crawler IP ở VN bị nhảy sang trang `.com/vn/`).
   - *Giải pháp:* Thiết lập cookie khu vực hoặc cào qua Proxy tương ứng với từng quốc gia mục tiêu (`FR`, `US`, `JP`, `UK`).

---

## 5. Mẫu JSON Data Object chuẩn hóa

```json
{
  "sku": "dior_M1296ZRGO_M928",
  "pricing": {
    "currency": "EUR",
    "country_code": "FR",
    "regular_price": 3350.00,
    "current_price": 3350.00,
    "discount_percentage": 0,
    "is_on_sale": false,
    "price_on_request": false,
    "tax_included": true,
    "tax_rate": 0.20,
    "price_formatted": "3.350,00 €",
    "price_history_snapshots": [
      {"timestamp": "2026-01-10T00:00:00Z", "price": 3200.00},
      {"timestamp": "2026-07-01T00:00:00Z", "price": 3350.00}
    ]
  }
}
```
