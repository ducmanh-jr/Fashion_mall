# BÁO CÁO 05: MEDIA & DIGITAL ASSETS (HÌNH ẢNH, VIDEO, 3D/AR & LOOKBOOK)
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Thời trang là ngành công nghiệp thị giác (Visual-driven). Một sản phẩm thời trang xa xỉ hay thể thao cao cấp có thể đi kèm từ 6 đến 15 góc chụp khác nhau, video người mẫu sải bước (runway catwalk clip), mô hình 3D xoay 360 độ hoặc file AR (thử giày thực tế ảo). Nếu hệ thống cào chỉ lấy 1 ảnh thumbnail chất lượng thấp, dữ liệu sẽ mất đi 80% giá trị để huấn luyện mô hình AI (Computer Vision, Virtual Try-on, Recommender System) hoặc tái tạo trải nghiệm eCommerce cao cấp.

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `media_gallery` | Array[Object]| Có | Danh sách toàn bộ tài sản hình ảnh | Array các object ảnh | Array các object ảnh | Array các object ảnh |
| `primary_image_url` | String (URL)| Có | Ảnh bìa/Thumbnail chính góc chính diện | `https://media.dior.com/.../front.jpg` | `https://media.gucci.com/.../001_Default.jpg` | `https://assets.adidas.com/.../IG1025_01_standard.jpg` |
| `zoom_image_url` | String (URL)| Không | Đường dẫn ảnh độ phân giải siêu nét (Ultra HD/Zoom) | `https://media.dior.com/.../zoom_4000x4000.jpg` | `https://media.gucci.com/.../full_3840.jpg` | `https://assets.adidas.com/.../zoom_2000.jpg` |
| `image_shot_type` | Enum | Có | Góc chụp / Phân loại kiểu ảnh | `FRONT`, `BACK`, `SIDE`, `DETAIL`, `ON_MODEL`, `FLAT_LAY`, `INTERIOR` | `ON_MODEL`, `DETAIL` | `LATERAL_OUTSIDE`, `MEDIAL_INSIDE`, `TOP`, `OUTSOLE` |
| `image_width` | Integer | Không | Chiều rộng ảnh (pixels) | `2000` | `3000` | `2000` |
| `image_height` | Integer | Không | Chiều cao ảnh (pixels) | `2500` | `3000` | `2000` |
| `video_clips` | Array[Object]| Không | Video catwalk / người mẫu chuyển động | `[{"type": "mp4", "url": "https://.../catwalk.mp4"}]` | `[{"type": "hls", "url": "https://.../master.m3u8"}]` | `[{"type": "mp4", "url": "https://.../video.mp4"}]` |
| `model_3d_ar` | Object | Không | Tệp 3D thực tế ảo (`.gltf`, `.usdz`) | `null` | `{"gltf": "...", "usdz": "..."}` (Thử kính/túi Gucci) | `{"glb": "...", "ar_quicklook": "..."}` (Thử giày) |
| `color_swatch_url` | String (URL)| Không | Ảnh mẫu hoa văn/màu cắt nhỏ (Swatch) | `https://.../swatch_blue.png` | `https://.../swatch_monogram.png` | `https://.../swatch_white.png` |

---

## 3. Khác biệt chuẩn ảnh: Luxury (Dior, Gucci) vs Sportswear (Adidas)

### 3.1. Đối với Dior & Gucci (Luxury)
- **Tỉ lệ khung hình (Aspect Ratio):** Thường sử dụng tỉ lệ `4:5` hoặc `1:1` với nền trắng nghệ thuật (off-white hoặc editorial studio lighting).
- **Trọng tâm chi tiết thủ công (Craftsmanship close-ups):** Thường xuyên có ảnh zoom cực cận vào đường kim mũi chỉ, khóa mạ vàng khắc logo, vân da cá sấu/da bê tự nhiên, lớp lót nhung bên trong túi.
- **On-Figure / Model Look:** Ảnh người mẫu mặc cả bộ trang phục (Total Look) thể hiện tỷ lệ kích thước túi/quần áo thực tế khi mang trên người.
- **Kỹ thuật CDN:** Dior dùng Akamai EdgeCDN, Gucci dùng Akamai/Cloudinary với cơ chế tạo URL biến đổi tham số `w={width}&h={height}&q={quality}`.

### 3.2. Đối với Adidas (Sportswear)
- **Chuẩn hóa 8 góc cố định cho giày thể thao (Footwear Angle Convention):**
  1. Lateral Outside (Má ngoài)
  2. Medial Inside (Má trong)
  3. Top-down (Mặt trên nhìn xuống)
  4. Outsole (Đế giày cao su)
  5. Back / Heel Counter (Gót giày)
  6. Front / Toe Box (Mũi giày)
  7. On-Feet Street Action (Mang trên chân vận động)
  8. Detail Cushioning / Tech (Ảnh chi tiết công nghệ Boost, Lightstrike, Torsion).
- **CDN Template:** Adidas dùng CDN Scene7 / Adobe Dynamic Media hoặc Cloudinary: `https://assets.adidas.com/images/w_600,f_auto,q_auto/IG1025_01_standard.jpg`. Ta có thể tùy chỉnh tham số `w_2000` để lấy ảnh chất lượng gốc siêu nét mà không tốn công tìm kiếm!

---

## 4. Thách thức trích xuất & Giải pháp kỹ thuật

1. **Website chỉ nạp ảnh Lazy-load hoặc ảnh Thumbnail mờ:**
   - *Vấn đề:* Thuộc tính `src` ban đầu là placeholder SVG hoặc data base64 nhẹ.
   - *Giải pháp:* Tìm kiếm các thuộc tính: `data-src`, `srcset`, `data-original`, hoặc parse thẳng từ JSON state trong mã nguồn JavaScript.
2. **Reverse URL CDN để lấy ảnh gốc Full HD:**
   - *Ví dụ Adidas:* Thay thế chuỗi `w_383,h_383` bằng `w_3000,f_auto,q_auto` trong URL CDN.
   - *Ví dụ Gucci:* Thay thế `wid=600&hei=600` bằng `wid=2400&hei=2400`.
3. **Lưu trữ tài nguyên (Asset Storage Pipeline):**
   - Không nên tải toàn bộ hàng trăm GB ảnh về máy crawler ngay lập tức. Hãy lưu `cdn_url` trước, sau đó cho một background worker (dùng Celery/Kafka + AWS S3/MinIO) tải và băm hash MD5 để chống trùng lặp.

---

## 5. Mẫu JSON Data Object chuẩn hóa

```json
{
  "sku": "gucci_735113_FACVY_8440",
  "media": {
    "cover_image": "https://media.gucci.com/style/DarkCenter_Generic_hd_3000x3000/1684335607/735113_FACVY_8440_001_100_0000_Light.jpg",
    "images": [
      {
        "order": 1,
        "angle": "FRONT",
        "type": "FLAT_LAY",
        "url_hd": "https://media.gucci.com/.../735113_001_hd.jpg",
        "url_original": "https://media.gucci.com/.../735113_001_raw.jpg"
      },
      {
        "order": 2,
        "angle": "ON_MODEL",
        "type": "EDITORIAL",
        "url_hd": "https://media.gucci.com/.../735113_002_hd.jpg"
      },
      {
        "order": 3,
        "angle": "DETAIL",
        "type": "HARDWARE_CLOSURE",
        "url_hd": "https://media.gucci.com/.../735113_003_hd.jpg"
      }
    ],
    "videos": [
      {
        "url": "https://media.gucci.com/video/jackie_runway.mp4",
        "duration_seconds": 12,
        "format": "mp4"
      }
    ],
    "model_3d": {
      "gltf_url": "https://assets.gucci.com/3d/735113.gltf",
      "usdz_url": "https://assets.gucci.com/3d/735113.usdz"
    }
  }
}
```
