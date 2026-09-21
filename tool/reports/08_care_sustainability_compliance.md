# BÁO CÁO 08: CARE INSTRUCTIONS, SUSTAINABILITY & COMPLIANCE (BẢO QUẢN & BỀN VỮNG)
**Dự án:** DM Fashion Data Tools  
**Đối tượng phân tích:** Dior, Gucci, Adidas

---

## 1. Mục đích & Tầm quan trọng
Trong bối cảnh các quy định pháp lý quốc tế (như Chỉ thị EPR của Liên minh Châu Âu, Hộ chiếu Sản phẩm Kỹ thuật số - Digital Product Passport - DPP) ngày càng khắt khe, dữ liệu về bảo quản, thành phần tái chế và tính bền vững (Sustainability) trở thành bắt buộc khi lưu trữ và phân phối hàng hóa thời trang xuyên biên giới. Người tiêu dùng thế hệ mới cũng đặc biệt quan tâm đến chứng chỉ xanh, thành phần tái chế và nguồn gốc không thử nghiệm trên động vật / chứng nhận da thuộc bền vững (LWG).

---

## 2. Bảng phân tích chi tiết các trường dữ liệu (Field Schema)

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Mô tả chức năng | Ví dụ Dior | Ví dụ Gucci | Ví dụ Adidas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `care_instructions` | Array[String]| Có | Hướng dẫn giặt, ủi, bảo quản | `["Do not wash", "Professional dry clean only"]` | `["Protect from direct light, heat and rain", "Clean with a soft, dry cloth"]` | `["Machine wash cold delicate cycle", "Do not tumble dry"]` |
| `care_symbols` | Array[String]| Không | Mã ký hiệu giặt là chuẩn quốc tế (Ginetex) | `["DO_NOT_WASH", "DRY_CLEAN_P"]` | `["SPECIALIST_LEATHER_CLEAN"]` | `["WASH_30C", "DO_NOT_BLEACH"]` |
| `sustainability_claims`| Array[String]| Không | Tuyên bố môi trường / nguyên liệu tái chế | `["Certified sustainable silk"]` | `["Gucci Equilibrium", "Metal-free tanning"]` | `["Made with at least 20% recycled materials", "End Plastic Waste"]` |
| `recycled_percentage` | Float | Không | Phần trăm vật liệu tái chế (%) | `null` | `null` | `20.0` (20%) |
| `eco_certifications` | Array[String]| Không | Các chứng chỉ xanh/chuẩn kiểm định | `["GOTS Organic"]` | `["Leather Working Group (LWG)"]`| `["OEKO-TEX Standard 100", "Parley Ocean Plastic"]` |
| `packaging_info` | Object | Không | Quy cách đóng gói cao cấp / hộp quà | `{"box": "Dior iconic gift box", "dustbag": true}` | `{"gift_wrapping": "FSC certified packaging", "dustbag": true}` | `{"box": "Recycled cardboard shoebox"}` |
| `regulatory_warnings` | String | Không | Cảnh báo hóa chất theo luật (California Prop 65...)| `null` | `null` | `null` |

---

## 3. Khác biệt cách tiếp cận: Luxury vs Sportswear

```mermaid
graph LR
    subgraph Luxury Approach (Dior / Gucci)
        L1["Bảo dưỡng di sản (Heritage Maintenance)"] --> L2["Chăm sóc da thuộc (Specialist Leather Care)"]
        L1 --> L3["Lưu trữ túi (Keep in dust bag, fill with tissue)"]
        L1 --> L4["Bao bì cao cấp (FSC Certified Gift Box & Ribbon)"]
    end

    subgraph Sportswear Approach (Adidas)
        S1["Tác động vòng đời (Circular Economy)"] --> S2["Vật liệu tái chế (Recycled Poly / Ocean Plastic)"]
        S1 --> S3["Quy trình giặt máy thực tế (Washing machine / Iron temps)"]
        S1 --> S4["Sáng kiến khí hậu (Carbon Footprint declaration)"]
    end
```

### 3.1. Đối với Dior & Gucci (Luxury)
- **Chăm sóc và bảo dưỡng sản phẩm (Care and Maintenance Guide):** Không dùng các chỉ dẫn giặt máy thông thường. Thay vào đó là các chỉ dẫn bảo tồn đồ da: *"Tránh để túi tiếp xúc trực tiếp với ánh nắng mặt trời, hóa chất khử trùng, nước hoa"*, *"Luôn cất túi vào Dustbag vải flannel đi kèm khi không sử dụng"*.
- **Chứng nhận da thuộc không chứa kim loại nặng (Metal-free Tanning):** Gucci thường xuyên công bố quy trình thuộc da không chứa chrome để giảm thiểu ô nhiễm nguồn nước theo dự án *Gucci Equilibrium*.

### 3.2. Đối với Adidas (Sportswear)
- **Tập trung vào chỉ số tái chế và giảm phát thải carbon:** Adidas cam kết chiến dịch "End Plastic Waste". Nhiều dòng sản phẩm có tuyên bố rõ ràng: *"Chứa ít nhất 50% Parley Ocean Plastic và 50% recycled polyester"*.
- **Hướng dẫn giặt là kỹ thuật số:** Liệt kê nhiệt độ nước chính xác (`30°C`), có được dùng nước xả vải hay không (nước xả vải làm hỏng tính năng thoáng khí Climalite/AEROREADY).

---

## 4. Thách thức trích xuất & Giải pháp kỹ thuật

1. **Care guide thường giấu trong thẻ Accordion hoặc Modal Popup:**
   - *Vấn đề:* Khi cào HTML tĩnh, phần nội dung tab "Care & Sustainability" có thể chưa được load vào DOM hoặc nằm trong thẻ `<template>` hoặc ẩn qua CSS `display: none`.
   - *Giải pháp:* Trích xuất trực tiếp từ các component dữ liệu JSON của Next.js/Nuxt.js hoặc gọi API product details để lấy trọn vẹn cả các tab thông tin phụ trợ.
2. **Chuẩn hóa danh mục Care Tag:**
   - Sử dụng từ khóa Regex để map sang enum chuẩn: `DRY_CLEAN_ONLY`, `DO_NOT_WASH`, `HAND_WASH`, `COLD_WASH`.

---

## 5. Mẫu JSON Data Object chuẩn hóa

```json
{
  "sku": "adidas_IG1025",
  "compliance_and_care": {
    "care_instructions": [
      "Do not bleach",
      "Do not tumble dry",
      "Do not dry clean",
      "Touch up with cool iron",
      "Machine wash cold delicate cycle"
    ],
    "care_symbols": ["DO_NOT_BLEACH", "DO_NOT_TUMBLE_DRY", "WASH_COLD_DELICATE"],
    "sustainability": {
      "is_sustainable": true,
      "claims": ["Contains a minimum of 20% recycled content"],
      "recycled_percentage": 20.0,
      "initiatives": ["End Plastic Waste"]
    },
    "packaging": {
      "has_shoebox": true,
      "shoebox_material": "100% Recycled Cardboard"
    }
  }
}
```
