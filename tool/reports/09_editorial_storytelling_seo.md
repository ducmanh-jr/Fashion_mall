# BÁO CÁO 09: EDITORIAL, STORYTELLING & SEO MARKETING COPY
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Trong thời trang cao cấp, khách hàng không chỉ mua công năng vật lý mà còn mua "câu chuyện văn hóa, cảm xúc và di sản" (Storytelling & Heritage). Đối với Dior và Gucci, mỗi thiết kế gắn liền với tầm nhìn nghệ thuật của Giám đốc Sáng tạo (Creative Director), cảm hứng từ sàn diễn thời trang Paris/Milan Fashion Week. Thu thập được các trường mô tả biên tập (Editorial copy), mẹo phối đồ ("Complete the Look" / "Pair With") và dữ liệu SEO có cấu trúc cho phép xây dựng các công cụ AI tư vấn thời trang ảo (AI Stylist), sinh nội dung bài viết và tăng trưởng SEO tự nhiên.

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `short_description` | String | Có | Mô tả ngắn gọn súc tích về sản phẩm | `A hallmark silhouette introduced by Maria Grazia Chiuri...` | `The Jackie 1961 is reimagined in a fresh tribute to the archive...` | `Born on the pitch, the Samba is a timeless icon of street style.` |
| `editorial_story` | String (HTML/MD)| Không | Đoạn văn biên tập dài về cảm hứng sáng tạo | Văn bản chi tiết về họa tiết Toile de Jouy di sản từ năm 1947 | Cảm hứng từ phong cách equestrian (thể thao cưỡi ngựa thập niên 60) | Lịch sử từ giày bóng đá sân băng thập niên 1950 |
| `creative_director_era`| String | Không | Kỷ nguyên của Giám đốc Sáng tạo | `Maria Grazia Chiuri` / `Kim Jones` | `Sabato De Sarno` | `null` |
| `runway_look_number` | String | Không | Mã số bộ trang phục trên sàn runway | `Look 24 - Cruise 2024` | `Look 03 - Ancora SS24` | `null` |
| `styling_suggestions` | Array[String]| Không | Mẹo phối đồ từ chuyên gia tạo mẫu | `["Can be carried by hand or worn over the shoulder"]` | `["Attach the additional shoulder strap for crossbody wear"]` | `["Pair with flared denim and an oversized track jacket"]` |
| `complete_the_look_ids`| Array[String]| Không | Danh sách mã SKU các sản phẩm phối kèm | `["dior_scarf_01", "dior_sandal_02"]` | `["gucci_belt_03", "gucci_sunglasses_04"]`| `["adidas_trackpant_01", "adidas_socks_02"]`|
| `seo_meta_title` | String | Có | Thẻ tiêu đề trang web (Meta Title) | `Medium Dior Book Tote Blue Toile de Jouy Embroidery \| DIOR` | `Gucci Jackie 1961 small shoulder bag in GG Supreme \| GUCCI® US`| `adidas Samba OG Shoes - White \| Men's Lifestyle \| adidas US` |
| `seo_meta_description`| String | Có | Thẻ mô tả công cụ tìm kiếm | `Discover the iconic Medium Dior Book Tote...` | `Shop the Jackie 1961 small shoulder bag at GUCCI.COM...` | `Shop Samba OG Shoes at adidas.com! Free shipping options...` |
| `json_ld_raw` | Object | Không | Khối dữ liệu JSON-LD nguyên gốc từ trang | Dữ liệu Schema.org Product | Dữ liệu Schema.org Product | Dữ liệu Schema.org Product |

---

## 3. Khác biệt chiến lược nội dung: Luxury vs Sportswear

```mermaid
graph TD
    subgraph Luxury Storytelling (Dior / Gucci)
        L_Inspiration["Creative Director Inspiration"] --> L_Heritage["House Archives & Craftsmanship"]
        L_Heritage --> L_Lookbook["Curated 'Complete the Look' High Fashion Ensemble"]
    end

    subgraph Sportswear Marketing (Adidas)
        S_Heritage["Origins on Pitch / Street Culture"] --> S_Tech["Performance Benefit & Comfort"]
        S_Tech --> S_SocialProof["Customer Reviews, Star Ratings & UGC Feed"]
    end
```

### 3.1. Đối với Dior & Gucci (Luxury)
- **Văn phong thơ mộng và tôn vinh di sản (Poetic & Archival Language):** Sử dụng các từ vựng tinh hoa thời trang như *Atelier, Savoir-faire, House heritage, Signature motifs, Reinterpretation of archival silhouette*.
- **"Complete the Look" (Gợi ý trang phục hoàn chỉnh):** Dữ liệu cross-sell này là một kho báu. Một chiếc túi sẽ được liên kết trực tiếp với khăn quàng Mitzah, giày cao gót J'Adior và áo trench coat để tạo thành một set đồ hàng chục nghìn đô la.

### 3.2. Đối với Adidas (Sportswear)
- **Truyền cảm hứng di sản văn hóa đường phố + Công năng thực dụng:**
  - Kể về nguồn gốc lịch sử từ thể thao (thập niên 1950, phong trào terrace casuals của bóng đá Anh thập niên 1980).
  - Kết hợp với phần đánh giá cộng đồng (User Reviews & Star Ratings: `rating_value: 4.8`, `review_count: 14205`).

---

## 4. Thách thức trích xuất & Giải pháp kỹ thuật

1. **Thẻ Meta & JSON-LD đôi khi bị rút gọn so với nội dung hiển thị:**
   - *Vấn đề:* JSON-LD chỉ có 1 dòng description ngắn, trong khi bài xã luận dài nằm trong các khối accordion trên giao diện.
   - *Giải pháp:* Thiết lập crawler trích xuất kép: Ưu tiên lấy từ DOM HTML render đầy đủ (`div.product-description-accordion`), đồng thời vẫn lưu bản sao `json_ld_raw` để đối chiếu độ tin cậy.
2. **Quan hệ "Complete The Look" (Cross-sell Graph):**
   - Không chỉ lưu URL của sản phẩm gợi ý, hãy bóc tách ra `recommended_product_sku` để đưa vào cơ sở dữ liệu quan hệ (hoặc Graph Database như Neo4j) để xây dựng biểu đồ mạng lưới gợi ý phối đồ thời trang!

---

## 5. Mẫu JSON Data Object chuẩn hóa

```json
{
  "sku": "dior_M1296ZRGO_M928",
  "editorial_and_marketing": {
    "short_description": "The Dior Book Tote, an original style introduced by Maria Grazia Chiuri, has become a staple of the Dior aesthetic.",
    "full_editorial": "Designed to hold all the daily essentials, the style is fully embroidered with a blue Toile de Jouy motif. Adorned with the Christian Dior Paris signature on the front, the medium tote exemplifies the House's signature savoir-faire and may be carried by hand or worn over the shoulder.",
    "creative_line": "Maria Grazia Chiuri Women's Collection",
    "styling_tips": [
      "May be carried by hand or worn over the shoulder",
      "Pairs elegantly with other Toile de Jouy creations"
    ],
    "complete_the_look_skus": [
      "15DOB106I600_C540",
      "KCK211OBE_S56B"
    ],
    "seo": {
      "meta_title": "Medium Dior Book Tote Blue Toile de Jouy Embroidery | DIOR",
      "meta_description": "Discover the Christian Dior Medium Dior Book Tote in Blue Toile de Jouy Embroidery.",
      "keywords": ["Dior Book Tote", "Maria Grazia Chiuri", "Toile de Jouy", "Luxury Tote Bag"]
    }
  }
}
```
