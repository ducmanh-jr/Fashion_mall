# BÁO CÁO 01: CORE PRODUCT MASTER DATA (DỮ LIỆU ĐỊNH DANH & CƠ BẢN)
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Dữ liệu định danh sản phẩm (Master Data) là xương sống của toàn bộ hệ thống cơ sở dữ liệu thời trang. Đây là tập hợp các trường dữ liệu bắt buộc nhằm xác định danh tính duy nhất của một sản phẩm, phân biệt giữa cấp độ cha (Parent/Style level) và cấp độ con (Child/SKU/Variant level), đồng thời đồng bộ hóa khi sản phẩm xuất hiện trên nhiều thị trường/quốc gia khác nhau.

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `product_id` | String | Có | ID duy nhất của hệ thống cào định danh sản phẩm | `dior_prod_M1296ZRGO` | `gucci_prod_735113` | `adidas_prod_IG1025` |
| `brand_name` | String | Có | Tên thương hiệu chuẩn hóa | `Dior` | `Gucci` | `Adidas` |
| `parent_sku` / `style_code` | String | Có | Mã dòng thiết kế (Style Code), gom nhóm các màu/kích cỡ | `M1296ZRGO` | `735113 FACVY` | `IG1025` |
| `product_name` | String | Có | Tên sản phẩm chính thức trên website | `Medium Dior Book Tote` | `Gucci Jackie 1961 small shoulder bag` | `Samba OG Shoes` |
| `sub_title` / `collection_line` | String | Không | Dòng sản phẩm phụ hoặc bộ sưu tập nhỏ | `Toile de Jouy Embroidery` | `Gucci Ancora` | `Originals` |
| `gender` | Enum | Có | Phân loại giới tính mục tiêu | `Women` | `Women`, `Men`, `Unisex` | `Unisex` |
| `age_group` | Enum | Có | Nhóm tuổi mục tiêu | `Adult` | `Adult` | `Adult`, `Kids`, `Infant` |
| `season` | String | Tùy chọn | Mùa ra mắt / Năm phát hành | `Cruise 2024` | `Spring Summer 2024` | `FW24` |
| `model_code` | String | Tùy chọn | Mã model nhà máy sản xuất | `M1296` | `735113` | `B75806` |
| `url_canonical` | String (URL)| Có | URL chuẩn của trang chi tiết sản phẩm | `https://www.dior.com/...` | `https://www.gucci.com/...` | `https://www.adidas.com/...` |
| `country_code` | String (2) | Có | Quốc gia/Khu vực của storefront đang cào | `FR`, `US`, `VN` | `IT`, `US` | `US`, `VN` |
| `locale` | String | Có | Ngôn ngữ hiển thị | `fr_FR`, `en_US` | `it_IT`, `en_US` | `en_US`, `vi_VN` |
| `created_at_crawler` | Timestamp | Có | Thời gian hệ thống cào bản ghi này | `2026-09-09T14:30:00Z` | `2026-09-09T14:30:00Z` | `2026-09-09T14:30:00Z` |

---

## 3. So sánh đặc thù định danh: Luxury (Dior, Gucci) vs Sportswear (Adidas)

### 3.1. Đối với Dior & Gucci (Luxury)
- **Cấu trúc mã sản phẩm (Reference Number):** Thường phản ánh mã thiết kế + mã chất liệu + mã màu.
  - *Dior:* Ví dụ `M1296ZRGO_M928` (`M1296` = Dáng túi Book Tote trung, `ZRGO` = Thêu Toile de Jouy, `M928` = Blue).
  - *Gucci:* Ví dụ `735113 FACVY 8440` (`735113` = Kiểu túi Jackie 1961, `FACVY` = Vải GG Canvas, `8440` = Phối viền da nâu).
- **Tính trường tồn:** Các dòng sản phẩm "Iconic / Permanent" được duy trì qua nhiều năm, chỉ đổi seasonal colorways.
- **Tính cá nhân hóa (Personalization):** Có thêm thuộc tính `is_customizable` (như dịch vụ ABCDior dập tên).

### 3.2. Đối với Adidas (Sportswear)
- **Article Number (Mã phối màu):** 6 ký tự chuẩn quốc tế (ví dụ: `B75806` cho Samba White/Black, `B75807` cho Samba Black/White).
- **Model Code (Mã phom giày):** Gom tất cả các Article Number cùng chung silhouette (ví dụ: Silhouette `Samba`, Model `SAMBA OG`).
- **Phân khúc sản phẩm (Franchise/Sub-brand):** Phân tầng rất rõ rệt: `Performance` (thể thao thi đấu), `Originals` (thời trang đường phố), `Y-3` (high-end hợp tác Yohji Yamamoto).

---

## 4. Thách thức khi trích xuất (Scraping Challenges) & Giải pháp

1. **Định danh biến thể URL:**
   - *Vấn đề:* Khi đổi màu sản phẩm, Gucci cập nhật URL query `?color=...`, Dior đổi sang URL path con riêng, Adidas có trang riêng cho từng Article Code.
   - *Giải pháp:* Tách cấu trúc bảng thành `Product Parent` và `Product Variant`. Luôn lưu `parent_sku` làm khóa ngoại kết nối.
2. **Ẩn dữ liệu trong Client-side Rendering (CSR):**
   - *Vấn đề:* Tiêu đề và mã sản phẩm có thể chỉ xuất hiện sau khi Javascript hoàn tất nạp.
   - *Giải pháp:* Tìm kiếm block `script[type="application/ld+json"]` hoặc trích xuất từ `window.__INITIAL_STATE__`, `window.__NEXT_DATA__` hoặc các payload API nội bộ của trang web.

---

## 5. Mẫu JSON Data Object chuẩn hóa (Standard JSON Schema)

```json
{
  "product_id": "dior_prod_M1296ZRGO_M928",
  "brand": "Dior",
  "parent_sku": "M1296ZRGO",
  "sku": "M1296ZRGO_M928",
  "title": "Medium Dior Book Tote",
  "sub_title": "Blue Dior Oblique Embroidery (36 x 27.5 x 16.5 cm)",
  "gender": "Women",
  "age_group": "Adult",
  "season": "Cruise 2024",
  "canonical_url": "https://www.dior.com/en_int/couture/products/M1296ZRGO_M928-medium-dior-book-tote",
  "franchise": "Book Tote",
  "status": "ACTIVE",
  "crawl_metadata": {
    "source_domain": "dior.com",
    "scraped_at": "2026-09-09T14:30:00Z",
    "storefront_country": "INT",
    "storefront_locale": "en_int"
  }
}
```
