# BÁO CÁO 02: TAXONOMY & CATEGORY HIERARCHY (PHÂN LOẠI DANH MỤC & CÂY PHẢ HỆ)
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Ngành thời trang có cấu trúc danh mục cực kỳ phân mảnh và phức tạp. Một chiếc áo có thể vừa thuộc mục "New In", vừa thuộc "Ready-to-wear > Tops > Blouses", vừa nằm trong chiến dịch "Cruise Collection". Nếu crawler chỉ lấy danh mục dạng text đơn giản thì dữ liệu sẽ bị trùng lặp, mất ngữ cảnh và không thể lọc (filter) hoặc xây dựng cây thư mục chuẩn (canonical taxonomy) cho công cụ tìm kiếm hoặc hệ thống phân tích BI.

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `department` | String | Có | Phân nhánh cao nhất (Ngành hàng) | `Fashion & Accessories` | `Handbags`, `Women` | `Men`, `Women`, `Kids` |
| `category_l1` | String | Có | Danh mục cấp 1 (Primary Category) | `Bags` | `Women's Handbags` | `Shoes` |
| `category_l2` | String | Có | Danh mục cấp 2 (Subcategory) | `Tote Bags` | `Shoulder Bags` | `Sneakers` |
| `category_l3` | String | Không | Danh mục cấp 3 (Micro-category) | `Medium Totes` | `Jackie 1961` | `Low Top Sneakers` |
| `breadcrumbs` | Array[Object]| Có | Chuỗi đường dẫn điều hướng gốc | `[{"name":"Home"},{"name":"Women's Fashion"},{"name":"Bags"}]` | `[{"name":"Gucci"},{"name":"Handbags"},{"name":"Shoulder"}]` | `[{"name":"Originals"},{"name":"Shoes"},{"name":"Samba"}]` |
| `product_type` | String | Có | Định dạng chủng loại vật phẩm chuẩn | `Handbag` | `Shoulder Bag` | `Footwear` |
| `sport_activity` | String | Không | Hoạt động/Môn thể thao áp dụng | `null` (N/A) | `null` (N/A) | `Football`, `Running`, `Skateboarding` |
| `occasion` | Array[String]| Không | Dịp sử dụng gợi ý | `["Cocktail", "Evening", "Gala"]`| `["Casual Chic", "Business"]` | `["Daily Streetwear", "Gym Training"]` |
| `collection_tag` | Array[String]| Không | Tag bộ sưu tập/Chiến dịch | `["Lady Dior", "Dioriviera"]` | `["Gucci Ancora", "Gucci Blondie"]`| `["Stan Smith", "YEEZY", "Adicolor"]`|
| `is_new_arrival` | Boolean | Có | Gắn nhãn sản phẩm mới | `true` | `false` | `true` |
| `is_best_seller` | Boolean | Không | Gắn nhãn bán chạy | `false` | `false` | `true` |
| `is_exclusive` | Boolean | Không | Độc quyền Online / Boutique | `true` ("Online Exclusive") | `true` ("Gucci Boutique Exclusive") | `false` |

---

## 3. Khác biệt cấu trúc cây danh mục giữa Luxury và Sportswear

```mermaid
graph TD
    subgraph Luxury Taxonomy (Dior / Gucci)
        L_Dept["Department: Women's Couture"] --> L_L1["Category L1: Bags"]
        L_L1 --> L_L2["Category L2: Top Handles"]
        L_L2 --> L_Line["Iconic Line: Lady Dior"]
        L_Line --> L_Size["Format: Mini Lady Dior"]
    end

    subgraph Sportswear Taxonomy (Adidas)
        S_Dept["Department: Men"] --> S_Div["Division: Footwear"]
        S_Div --> S_Sport["Category L1: Sport / Lifestyle"]
        S_Sport --> S_Franchise["Category L2: Franchise (Samba/Gazelle)"]
        S_Franchise --> S_Surface["L3: Sub-type (OG / Indoor / Classic)"]
    end
```

### 3.1. Đối với Dior & Gucci
- Taxonomy tập trung vào **Line/Iconic Collection** và **Kiểu dáng thủ công** (ví dụ: Lady Dior, Saddle, Dior Book Tote, Dionysus, GG Marmont, Jackie 1961).
- Phân khúc danh mục thường đi kèm vật liệu quý hiếm hoặc phiên bản giới hạn: `High Jewelry`, `Fine Jewelry`, `Exotics Leather`.

### 3.2. Đối với Adidas
- Phân loại 3 chiều ma trận: **Gender** (Nam/Nữ/Trẻ em) x **Sport/Activity** (Running/Football/Basketball/Lifestyle) x **Product Group** (Shoes/Clothing/Accessories).
- Có cấu trúc **Franchise** rất sâu (ví dụ: `Ultraboost`, `Samba`, `Gazelle`, `Predator`).

---

## 4. Thách thức trích xuất & Giải pháp kỹ thuật

1. **Một sản phẩm xuất hiện ở nhiều Category URLs:**
   - *Vấn đề:* Đôi giày Adidas Samba có thể được cào từ cả `adidas.com/us/men-shoes`, `adidas.com/us/originals`, lẫn `adidas.com/us/soccer`.
   - *Giải pháp:* Thiết lập thuật toán **Canonical Taxonomy Normalization**. Crawler lưu danh sách tất cả các tag/danh mục phụ mà sản phẩm xuất hiện (`categories_all`), nhưng chọn danh mục sâu nhất làm `primary_category_path`.
2. **Breadcrumbs ẩn hoặc dùng mã hóa riêng:**
   - *Giải pháp:* Đọc Schema.org BreadcrumbList trong block script:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "BreadcrumbList",
     "itemListElement": [ ... ]
   }
   </script>
   ```

---

## 5. Mẫu JSON Data Object chuẩn hóa

```json
{
  "product_id": "adidas_prod_IG1025",
  "taxonomy": {
    "department": "Men",
    "division": "Footwear",
    "category_l1": "Shoes",
    "category_l2": "Sneakers",
    "category_l3": "Low-Top",
    "franchise": "Samba",
    "sub_brand": "adidas Originals",
    "sport_activity": "Lifestyle",
    "breadcrumbs": [
      {"level": 1, "name": "Men", "url": "/men"},
      {"level": 2, "name": "Shoes", "url": "/men-shoes"},
      {"level": 3, "name": "Originals", "url": "/men-originals-shoes"},
      {"level": 4, "name": "Samba", "url": "/samba"}
    ],
    "marketing_tags": ["Classic", "Trending", "Streetwear", "Members Exclusive"]
  }
}
```
