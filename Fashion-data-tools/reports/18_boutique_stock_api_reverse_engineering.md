# BÁO CÁO 18: BOUTIQUE STOCK CHECKER API REVERSE ENGINEERING
**Dự án:** DM Fashion Data Tools (Java Web System)  
**Mục tiêu:** Mổ xẻ chi tiết giao thức API nội bộ kiểm tra tồn kho tại cửa hàng vật lý của Gucci, Dior, Adidas

---

## 1. Phân tích chi tiết API Gucci (Kering Group)

### 1.1. Endpoint Store Availability
- **URL:** `GET https://www.gucci.com/api/store-finder/availability`
- **Query Parameters:**
  - `country`: `VN` (hoặc `US`, `FR`, `IT`)
  - `language`: `en`
  - `styleCode`: `735113` (Mã mẫu túi Jackie 1961)
  - `colorCode`: `8440` (Mã màu)
  - `size`: `U` (Kích cỡ)
- **Headers bắt buộc:**
  ```http
  Accept: application/json
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
  X-Requested-With: XMLHttpRequest
  Referer: https://www.gucci.com/us/en/pr/women/handbags/shoulder-bags-for-women/jackie-1961-small-shoulder-bag-p-735113FACVY8440
  ```
- **Cấu trúc JSON phản hồi từ Gucci:**
  ```json
  {
    "stores": [
      {
        "storeCode": "VN_HN_01",
        "storeName": "Tràng Tiền Plaza",
        "city": "Hanoi",
        "address": "24 Hai Ba Trung Street, Trang Tien Ward, Hoan Kiem District",
        "availability": {
          "status": "AVAILABLE",
          "stockLevelText": "In Boutique",
          "isReservable": true,
          "hasAppointmentBooking": true
        }
      },
      {
        "storeCode": "VN_SG_01",
        "storeName": "Sheraton Saigon Hotel & Towers",
        "city": "Ho Chi Minh City",
        "availability": {
          "status": "OUT_OF_STOCK",
          "stockLevelText": "Out of Stock",
          "isReservable": false
        }
      }
    ]
  }
  ```

---

## 2. Phân tích chi tiết API Dior (LVMH Group)

### 2.1. Endpoint Store Availability
- **URL:** `POST https://www.dior.com/couture/api/availability/in-store`
- **Payload Request (JSON):**
  ```json
  {
    "sku": "M1296ZRGO_M928",
    "country": "VN",
    "locale": "en_int"
  }
  ```
- **Xử lý đặc thù của Dior:** Dior sử dụng cookie phiên làm việc được mã hóa bởi Akamai Sensor Data. Do đó, request kiểm tra kho cần kèm theo Cookie hợp lệ hoặc gửi thông qua TLS Fingerprint matching.

---

## 3. Phân tích chi tiết API Adidas (Salesforce Commerce Cloud - SFCC)

### 3.1. Endpoint BOPIS Store Search
- **URL:** `GET https://www.adidas.com.vn/api/checkout/bopis/stores?productId=IG1025_650&latitude=21.0285&longitude=105.8542`
- **Cấu trúc JSON phản hồi từ Adidas:**
  ```json
  {
    "count": 3,
    "stores": [
      {
        "id": "VN_HNI_001",
        "name": "adidas Brand Center Ba Trieu",
        "distance": "1.2 km",
        "inventory": {
          "orderable": true,
          "ats": 4,
          "backorderable": false
        }
      }
    ]
  }
  ```
- **Lưu ý:** Adidas trả về chính xác số lượng tồn `ats: 4` (Available To Sell), cực kỳ giá trị để theo dõi doanh số và tốc độ tiêu thụ hàng của từng chi nhánh!

---

## 4. Xây dựng lớp Java Service chung (Adapter Pattern)

```java
public interface BrandBoutiqueStockAdapter {
    String getBrandId();
    List<StoreDto> fetchStoreList(String countryCode);
    StoreStockResult checkStock(String sku, String storeId);
}
```
Mỗi thương hiệu sẽ triển khai interface này, giúp hệ thống Java dễ dàng thêm thương hiệu mới mà không ảnh hưởng đến kiến trúc hiện hữu.
