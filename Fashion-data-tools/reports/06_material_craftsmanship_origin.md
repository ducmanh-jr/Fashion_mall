# BÁO CÁO 06: MATERIAL, COMPOSITION & CRAFTSMANSHIP (CHẤT LIỆU, XUẤT XỨ & CHẾ TÁC)
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Chất liệu (Material) và Xuất xứ (Origin) là yếu tố quyết định tới 70% giá trị định giá của một món đồ thời trang. Một chiếc áo len len thường chỉ có giá \$50, nhưng 100% Loro Piana Cashmere có giá \$2,500. Đối với sneaker thể thao, công nghệ vật liệu (Boost, Gore-Tex, Primeknit) quyết định hiệu năng. Trích xuất có cấu trúc (Structured Extraction) từ văn bản mô tả tự do thành các trường vật liệu có tỷ lệ phần trăm là bắt buộc để phục vụ công cụ tìm kiếm ngữ nghĩa, so sánh thông số và phân tích chuỗi cung ứng.

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `primary_material` | String | Có | Chất liệu chính của sản phẩm | `Calfskin Leather` | `GG Supreme Canvas` | `Full Grain Leather & Suede` |
| `material_breakdown` | Array[Object]| Có | Danh sách tỷ lệ thành phần vật liệu (%) | `[{"material": "Silk", "pct": 85}, {"material": "Cashmere", "pct": 15}]` | `[{"material": "Cotton", "pct": 60}, {"material": "Polyester", "pct": 40}]` | `[{"component": "Upper", "material": "Leather", "pct": 100}]` |
| `lining_material` | String | Không | Chất liệu lớp lót bên trong | `Lambskin lining` | `Microfiber with suede-like finish` | `Textile lining` |
| `hardware_finish` | String | Không | Kim loại / Chi tiết khóa mạ | `Pale gold-finish metal` | `Gold-toned hardware with piston closure` | `Rubber cupsole` |
| `sole_material` | String | Không | Chất liệu đế (cho giày dép) | `Leather sole with star symbol` | `Leather sole` | `Gum rubber cupsole` |
| `country_of_origin` | String | Có | Quốc gia sản xuất | `Made in Italy` | `Made in Italy` | `Made in Vietnam` |
| `craftsmanship_method`| Array[String]| Không | Kỹ thuật may/chế tác thủ công | `["Hand-embroidered", "Quilted Cannage"]`| `["Web stripe inlay", "Edge-painted"]` | `["T-toe overlay", "Vulcanized rubber"]`|
| `special_tech` | Array[String]| Không | Công nghệ sợi/chất liệu bản quyền | `null` | `null` | `["Gore-Tex", "Primegreen", "Boost"]`|

---

## 3. Phân biệt đặc thù: Xa xỉ phẩm vs Đồ thể thao

### 3.1. Đối với Dior & Gucci (Luxury)
- **Vật liệu cao cấp tự nhiên:** Da bê (Calfskin), da cừu non (Lambskin), lụa tơ tằm (Silk twill), len lông cừu (Virgin wool), Cashmere, Vải Canvas dệt Jacquard.
- **Tiêu chuẩn "Made in":** Cực kỳ nghiêm ngặt. Dior và Gucci nhấn mạnh xuất xứ `Made in Italy` hoặc `Made in France` như một chứng chỉ chất lượng thủ công di sản.
- **Chi tiết phần cứng (Hardware):** Đặc biệt lưu ý các chi tiết như: "Piston closure", "Horsebit", "Cannage quilting", "CD signature clasp".

### 3.2. Đối với Adidas (Sportswear)
- **Vật liệu kỹ thuật cao & Tổng hợp:**
  - *Upper:* Primeknit, Da tổng hợp (Synthetic leather), Vải dệt lưới thoáng khí (Air Mesh), Suede (da lộn bảo vệ mũi).
  - *Midsole / Đệm:* Boost (TPU dạng hạt), Lightstrike Pro, EVA foam, Torsion System (thanh chống xoắn vặn).
  - *Outsole:* Continental Rubber, Gum Rubber.
- **Chuỗi cung ứng toàn cầu:** Xuất xứ thường là các nước gia công hàng đầu: `Made in Vietnam`, `Made in Indonesia`, `Made in Cambodia`, `Made in China`.

---

## 4. Thách thức trích xuất & Giải pháp kỹ thuật

1. **Thông tin chất liệu bị chôn vùi trong đoạn văn bản thuần (Unstructured Text / Free-form bullets):**
   - *Vấn đề:* Trang web hiển thị:
     > *"Crafted in Italy, this blazer is made from 90% virgin wool and 10% cashmere with a 100% cupro lining."*
   - *Giải pháp:* Áp dụng Regex hoặc mô hình Named Entity Recognition (NER) / LLM parser nhẹ để bóc tách:
     ```python
     # Regex trích xuất phần trăm vật liệu:
     # Pattern: (\d{1,3})%\s+([a-zA-Z\s]+)
     matches = re.findall(r"(\d{1,3})%\s+([a-zA-Z\s\-]+?)(?:,|\.|\sand\s|$)", text)
     # Kết quả: [('90', 'virgin wool'), ('10', 'cashmere')]
     ```
2. **Khóa "Made in":**
   - Luôn chuẩn hóa trường này bằng Regex tìm kiếm `Made in [A-Za-z\s]+` (ví dụ: `Made in Italy` -> chuẩn hóa mã ISO country: `IT`).

---

## 5. Mẫu JSON Data Object chuẩn hóa

```json
{
  "sku": "dior_blazer_01",
  "materials_and_origin": {
    "country_of_origin": "Italy",
    "country_code": "IT",
    "primary_material": "Virgin Wool",
    "composition": [
      {
        "component": "Main Body",
        "fiber": "Virgin Wool",
        "percentage": 90
      },
      {
        "component": "Main Body",
        "fiber": "Cashmere",
        "percentage": 10
      },
      {
        "component": "Lining",
        "fiber": "Cupro",
        "percentage": 100
      }
    ],
    "hardware": "Horn buttons engraved with Dior logo",
    "craftsmanship": ["Hand-stitched lapels", "Half-canvas construction"]
  }
}
```
