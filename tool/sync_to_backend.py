# -*- coding: utf-8 -*-
"""
DM Fashion Data Tools - Mass Scraper & Direct Backend .NET Syncer
Cào 50 sản phẩm cho mỗi thương hiệu (20 thương hiệu = 1000 sản phẩm)
Nạp vào CSDL Backend .NET (fashion_mall.db)
Tạo 20 tài khoản Seller tương ứng: {brand}@gmail.com / mat khau: 00000000
"""

import os
import sys
import json
import sqlite3
import hashlib
import base64
import random
from datetime import datetime

# Fix Windows encoding
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def sha256_hash_password(password: str) -> str:
    m = hashlib.sha256()
    m.update(password.encode('utf-8'))
    return base64.b64encode(m.digest()).decode('utf-8')

# 20 Thương hiệu được chọn
TOP_20_BRANDS = [
    {"id": "gucci", "name": "Gucci", "country": "Ý", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Luxury Italian Fashion", "logo": "https://logo.clearbit.com/gucci.com"},
    {"id": "adidas", "name": "Adidas", "country": "Đức", "category": 1, "cat_name": "Giày Sneaker & Thể Thao", "style": "Sportswear & Streetwear", "logo": "https://logo.clearbit.com/adidas.com"},
    {"id": "dior", "name": "Christian Dior", "country": "Pháp", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Haute Couture & Leather Goods", "logo": "https://logo.clearbit.com/dior.com"},
    {"id": "louisvuitton", "name": "Louis Vuitton", "country": "Pháp", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "High-End Luxury Luggage & Leather", "logo": "https://logo.clearbit.com/louisvuitton.com"},
    {"id": "nike", "name": "Nike", "country": "Mỹ", "category": 1, "cat_name": "Giày Sneaker & Thể Thao", "style": "Athletic Footwear & Innovation", "logo": "https://logo.clearbit.com/nike.com"},
    {"id": "chanel", "name": "Chanel", "country": "Pháp", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Classic Haute Couture & Quilted Bags", "logo": "https://logo.clearbit.com/chanel.com"},
    {"id": "prada", "name": "Prada", "country": "Ý", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Avant-Garde Luxury & Re-Nylon", "logo": "https://logo.clearbit.com/prada.com"},
    {"id": "balenciaga", "name": "Balenciaga", "country": "Tây Ban Nha / Pháp", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Oversized Luxury Streetwear", "logo": "https://logo.clearbit.com/balenciaga.com"},
    {"id": "hermes", "name": "Hermès", "country": "Pháp", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Ultra Luxury Handcrafted Leather", "logo": "https://logo.clearbit.com/hermes.com"},
    {"id": "versace", "name": "Versace", "country": "Ý", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Baroque & High-Glamour Luxury", "logo": "https://logo.clearbit.com/versace.com"},
    {"id": "burberry", "name": "Burberry", "country": "Anh Quốc", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "British Heritage Trench & Check", "logo": "https://logo.clearbit.com/burberry.com"},
    {"id": "saintlaurent", "name": "Saint Laurent", "country": "Pháp", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Parisian Chic & Tailoring", "logo": "https://logo.clearbit.com/ysl.com"},
    {"id": "fendi", "name": "Fendi", "country": "Ý", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Baguette Bags & FF Monogram", "logo": "https://logo.clearbit.com/fendi.com"},
    {"id": "puma", "name": "Puma", "country": "Đức", "category": 1, "cat_name": "Giày Sneaker & Thể Thao", "style": "Motorsport & Retro Running", "logo": "https://logo.clearbit.com/puma.com"},
    {"id": "zara", "name": "Zara", "country": "Tây Ban Nha", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Fast Fashion Trendsetter", "logo": "https://logo.clearbit.com/zara.com"},
    {"id": "uniqlo", "name": "Uniqlo", "country": "Nhật Bản", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Japanese LifeWear & Functional Minimal", "logo": "https://logo.clearbit.com/uniqlo.com"},
    {"id": "calvinklein", "name": "Calvin Klein", "country": "Mỹ", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Minimalist Denim & Underwear", "logo": "https://logo.clearbit.com/calvinklein.com"},
    {"id": "tommyhilfiger", "name": "Tommy Hilfiger", "country": "Mỹ", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Classic American Cool & Preppy", "logo": "https://logo.clearbit.com/tommy.com"},
    {"id": "bottegaveneta", "name": "Bottega Veneta", "country": "Ý", "category": 3, "cat_name": "Quần & Phụ Kiện Thời Trang", "style": "Quiet Luxury Intrecciato Weave", "logo": "https://logo.clearbit.com/bottegaveneta.com"},
    {"id": "offwhite", "name": "Off-White", "country": "Ý / Mỹ", "category": 2, "cat_name": "Thời Trang Streetwear & Áo Khoác", "style": "Industrial Streetwear & Quotation Marks", "logo": "https://logo.clearbit.com/off---white.com"}
]

# Verified high-resolution fashion images by domain
CURATED_IMAGES = {
    "footwear": [
        "/img/addidas samba.jpg",
        "/img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg",
        "/img/#balanciagatrack#thug 🥷🏿.jpg",
        "/img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg",
        "/img/Nike men's summer sneaker (men shoe collection for 2024).jpg",
        "/img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg",
        "/img/gucci-sneaker.jpg",
        "/img/sample-nextgen.jpg",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop"
    ],
    "apparel": [
        "/img/Adidas sakura zip up hoodie.jpg",
        "/img/Oversized ripped balenciaga jacket.jpg",
        "/img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg",
        "/img/Some of favorite Gucci from recent collection 🔥….jpg",
        "/img/sample-velora.jpg",
        "/img/fashion mood board.jpg",
        "/img/gucci-runway.jpg",
        "/img/420734790192673506.jpg",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop"
    ],
    "accessories": [
        "/img/gucci-runway.jpg",
        "/img/sample-velora.jpg",
        "/img/gucci-sneaker.jpg",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop"
    ]
}

# Product archetypes by brand archetype
ARCHETYPES = {
    "gucci": [
        ("Túi Xách Jackie 1961 Mini Shoulder Bag", "Gucci Icons Permanent", 62000000, 70000000, "Da bê bóng / Khóa Piston mạ vàng"),
        ("Túi Xách Dionysus GG Supreme Mini Chain", "Gucci Dionysus", 32000000, 36000000, "Canvas GG Supreme & Khóa đầu hổ bạc"),
        ("Giày Sneaker Gucci Ace Web Embroidered", "Gucci Footwear", 18900000, 21000000, "Da bò nappa Ý cao cấp, dải sọc Web xanh đỏ"),
        ("Giày Loafer Jordaan Classic Horsebit", "Gucci Jordaan", 26500000, 29000000, "Da bóng mịn, hàm thiếc kim loại mạ vàng"),
        ("Áo Khoác Heritage Monogram GG Runway Jacket", "Gucci Runway Show", 48000000, 54000000, "Vải dệt Jacquard GG, cúc xà cừ khắc nổi"),
        ("Thắt Lưng Da Double G Buckle Reversible", "Gucci Leather Goods", 14500000, 16000000, "Da bò trơn 2 mặt đen/nâu, khóa GG đồng mờ"),
        ("Kính Mát Chữ Nhật Double G Oversized", "Gucci Eyewear", 11500000, 13000000, "Gọng Acetate đen bóng, tròng chống tia UV400"),
        ("Khăn Lụa Tơ Tằm Flora Silk Carré 90x90", "Gucci Flora", 12500000, 14000000, "100% Silk Twill dệt thủ công tại Como Ý")
    ],
    "adidas": [
        ("Giày Adidas Samba OG Classic Cloud White", "Adidas Originals Terrace", 2790000, 3200000, "Da thật full-grain, mũi T-toe da lộn"),
        ("Giày Adidas Gazelle Indoor Core Black Gum", "Adidas Originals Indoor", 2950000, 3400000, "Da lộn mềm cao cấp, đế cao su gum bán trong"),
        ("Giày Adidas Handball Spezial Clear Pink", "Adidas Terrace Special", 2900000, 3300000, "Da lộn hồng pastel, đế gum cổ điển"),
        ("Giày Chạy Bộ Adidas Ultraboost Light 2024", "Adidas Performance", 5200000, 5800000, "Sợi dệt Primeknit+, đệm Boost hoàn trả 100% năng lượng"),
        ("Áo Khoác Nỉ Beckenbauer Tracktop Night Indigo", "Adidas Originals Heritage", 2200000, 2600000, "Vải dệt đôi 52% cotton hữu cơ, 48% poly tái chế"),
        ("Quần Thể Thao Tiro 23 League Training Pants", "Adidas Football Training", 1350000, 1600000, "Vải thun công nghệ AEROREADY thoát ẩm nhanh"),
        ("Áo Hoodie Trefoil Essentials French Terry", "Adidas Originals Everyday", 1850000, 2200000, "Chất nỉ bông 100% cotton Pháp 380gsm dày dặn"),
        ("Balo Thời Trang Adicolor Classic Trefoil", "Adidas Accessories", 890000, 1100000, "Vải Poly dệt chống nước nhẹ, quai đệm êm ái")
    ],
    "dior": [
        ("Túi Xách Lady Dior Medium Cannage Lambskin", "Lady Dior Heritage", 155000000, 170000000, "Da cừu dập nổi vân Cannage, charm kim loại D.I.O.R"),
        ("Túi Xách Dior Saddle Bag Black Grained Calfskin", "Dior Saddle Collection", 115000000, 125000000, "Da bê hạt sần cao cấp, khóa chữ D kim loại mạ vàng"),
        ("Túi Tote Dior Book Tote Thêu Oblique Xanh", "Dior Oblique Embroidery", 88000000, 95000000, "Vải Canvas thêu hàng triệu mũi chỉ thủ công Paris"),
        ("Giày Cao Gót J'Adior Slingback Technical Fabric", "Dior Footwear", 28500000, 32000000, "Vải dệt kỹ thuật cao, dải ruy băng thêu chữ J'Adior"),
        ("Giày Sneaker Dior B27 Low-Top Galaxy Leather", "Dior Men Footwear", 32500000, 36000000, "Da bê mịn kết hợp chi tiết dập lỗ Oblique Galaxy"),
        ("Áo Khoác Bar Jacket Len Dạ Haute Couture", "Dior 30 Montaigne", 98000000, 110000000, "Len dệt thượng hạng, đường may chiết eo huyền thoại"),
        ("Nước Hoa Gris Dior La Collection Privée 250ml", "Dior Beauty Haute", 12500000, 14000000, "Hương gỗ sồi, cam Bergamot và hoa hồng Grasse"),
        ("Khăn Quàng Cổ Mitzah Lụa Tơ Tằm Toile de Jouy", "Dior Cruise Silk", 6800000, 7500000, "100% Silk Twill in họa tiết cổ điển nước Pháp")
    ],
    "louisvuitton": [
        ("Túi Xách Neverfull MM Monogram Canvas", "LV Monogram Classic", 51500000, 56000000, "Canvas tráng nhựa độc quyền bền bỉ, viền da bò tự nhiên"),
        ("Túi Du Lịch Speedy Bandoulière 30", "LV Speedy Icons", 48500000, 52000000, "Canvas Monogram biểu tượng, khóa đồng khắc hoa văn"),
        ("Túi Xách Pochette Métis Monogram Reverse", "LV Metis Collection", 64000000, 70000000, "Canvas 2 tông màu, khóa S-lock mạ vàng sáng bóng"),
        ("Túi Xách Capucines MM Taurillon Noir", "LV High Craftsmanship", 185000000, 200000000, "Da bò sần Taurillon nguyên tấm, biểu tượng LV bọc da"),
        ("Vali Du Lịch Horizon 55 Rolling Luggage", "LV Art of Travel", 89000000, 98000000, "Cần kéo trợ lực titan bên ngoài, khóa số TSA tiêu chuẩn"),
        ("Giày Sneaker LV Trainer Da Bò Phối Màu", "LV Men Sneaker", 36000000, 40000000, "7 giờ khâu thủ công tại Ý, đế cao su khắc hoa Monogram"),
        ("Ví Dài Da Zippy Wallet Monogram Empreinte", "LV Small Leather Goods", 28000000, 31000000, "Da bò dập vân Monogram chìm, 12 ngăn cắm thẻ"),
        ("Kính Mát Millionaires Sunglasses 1.1 Noir", "LV Runway Eyewear", 24000000, 27000000, "Gọng kính vát cạnh đính chỉ vàng chạm khắc cổ điển")
    ],
    "nike": [
        ("Giày Sneaker Nike Air Force 1 '07 All White", "Nike Sportswear Icon", 2950000, 3300000, "Da phủ nhân tạo dễ vệ sinh, đệm Air-Sole êm ái"),
        ("Giày Nike Air Jordan 1 Retro High OG Chicago", "Jordan Brand Heritage", 5600000, 6500000, "Da thật phối 3 màu đỏ trắng đen lịch sử bóng rổ"),
        ("Giày Nike Dunk Low Retro Panda Black White", "Nike Dunk Skate", 3200000, 3800000, "Phối màu Panda kinh điển, cổ thấp đệm lót thoải mái"),
        ("Giày Chạy Bộ Nike Vaporfly 3 Road Racing", "Nike Running Elite", 6800000, 7500000, "Đế đệm ZoomX siêu nảy kèm tấm sợi carbon Flyplate"),
        ("Áo Khoác Gió Nike Sportswear Windrunner", "Nike Windrunner", 2400000, 2800000, "Vải dệt nhẹ chống gió nước, thiết kế Chevron 26 độ"),
        ("Quần Nỉ Bo Gấu Nike Club Fleece Joggers", "Nike Everyday Casual", 1450000, 1750000, "Chất nỉ chải mềm mại giữ ấm hoàn hảo cho mùa đông"),
        ("Áo Thun Thể Thao Nike Dri-FIT Legend", "Nike Training Tops", 750000, 950000, "Công nghệ Dri-FIT thấm hút mồ hôi cực nhanh"),
        ("Balo Thể Thao Nike Elemental Backpack 21L", "Nike Equipment", 850000, 1050000, "Nhiều ngăn chứa chuyên dụng, dây đeo đệm mút dày")
    ]
}

def get_product_blueprints(brand_id: str, brand_name: str, brand_country: str, count: int = 50):
    """Sinh 50 sản phẩm chất lượng cao chuẩn quốc tế cho mỗi thương hiệu"""
    base_archetype = ARCHETYPES.get(brand_id)
    if not base_archetype:
        base_archetype = [
            (f"Túi Xách {brand_name} Signature Leather Flap Bag", f"{brand_name} Leather Icons", 45000000, 52000000, "Da bê non nguyên tấm, phụ kiện kim loại cao cấp"),
            (f"Giày Sneaker {brand_name} Low-Top Luxury Runner", f"{brand_name} Footwear", 16500000, 19000000, "Da Ý thủ công, đế đệm giảm xóc hiện đại"),
            (f"Áo Khoác {brand_name} Bomber Jacket Streetwear", f"{brand_name} Ready-to-Wear", 28000000, 32000000, "Vải kỹ thuật chống thấm, khóa kéo mạ crôm sáng bóng"),
            (f"Áo Hoodie {brand_name} Heavyweight Embroidered Logo", f"{brand_name} Urban Collection", 12500000, 14500000, "100% Cotton hữu cơ dệt nỉ bông dày 400gsm"),
            (f"Quần Jean {brand_name} Slim Fit Japanese Selvedge", f"{brand_name} Denim", 14000000, 16000000, "Vải bò dệt biên Nhật Bản nhuộm chàm tự nhiên"),
            (f"Ví Da Cầm Tay {brand_name} Continental Wallet", f"{brand_name} Accessories", 11000000, 12500000, "Da saffiano chống xước, dập logo nhũ vàng"),
            (f"Kính Mát Thời Trang {brand_name} Acetate Square Frame", f"{brand_name} Eyewear", 9500000, 11000000, "Gọng đúc thủ công, tròng phân cực chống lóa"),
            (f"Thắt Lưng Da {brand_name} Monogram Plaque Buckle", f"{brand_name} Belts", 13500000, 15000000, "Da bò trơn thuộc thảo mộc, mặt khóa hợp kim không gỉ")
        ]
        
    products = []
    sizes_pool = ["XS", "S", "M", "L", "XL", "39 EU", "40 EU", "41 EU", "42 EU", "43 EU", "Free Size"]
    colors_pool = ["Đen Tuyển (Onyx Black)", "Trắng Tinh Khiết (Pure White)", "Beige Cổ Điển", "Xanh Navy Đậm", "Đỏ Bordeaux Quý Phái", "Xám Khói Titan", "Nâu Da Bò Caramel", "Xanh Rêu Safari"]
    
    for i in range(count):
        template = base_archetype[i % len(base_archetype)]
        variant_num = (i // len(base_archetype)) + 1
        
        sku_prefix = brand_id[:3].upper()
        sku = f"{sku_prefix}-{100 + i:03d}"
        
        name = template[0]
        if variant_num > 1:
            name = f"{name} (Phiên Bản Đặc Biệt Vol.{variant_num})"
            
        collection = f"{brand_name} {template[1]}"
        base_price = template[2] + (i * 250000)
        orig_price = template[3] + (i * 300000)
        discount = int(round((1 - base_price / orig_price) * 100))
        if discount < 5:
            discount = 8
            
        color = colors_pool[i % len(colors_pool)]
        size = sizes_pool[i % len(sizes_pool)]
        
        # Chọn ảnh
        if "giay" in name.lower() or "sneaker" in name.lower() or "loafer" in name.lower():
            img_pool = CURATED_IMAGES["footwear"]
        elif "tui" in name.lower() or "vi" in name.lower() or "balo" in name.lower() or "that lung" in name.lower() or "kinh" in name.lower():
            img_pool = CURATED_IMAGES["accessories"]
        else:
            img_pool = CURATED_IMAGES["apparel"]
            
        primary_img = img_pool[i % len(img_pool)]
        gallery = [primary_img]
        for g_idx in range(1, 4):
            gallery.append(img_pool[(i + g_idx) % len(img_pool)])
            
        desc = (
            f"Sản phẩm {name} chính hãng từ thương hiệu cao cấp {brand_name} ({brand_country}). "
            f"Thiết kế thuộc bộ sưu tập {collection}, kết hợp hoàn hảo giữa kỹ thuật chế tác thủ công tinh xảo "
            f"và phong cách thời trang đương đại đỉnh cao. Đạt chuẩn kiểm định chất lượng quốc tế và phân phối tại các Boutique Flagship."
        )
        
        products.append({
            "sku": sku,
            "name": name,
            "slug": f"{brand_id}-{sku.lower()}",
            "collection_name": collection,
            "description": desc,
            "base_price": base_price,
            "original_price": orig_price,
            "discount_percent": discount,
            "image_url": primary_img,
            "gallery_urls": gallery,
            "stock_quantity": random.randint(15, 60),
            "material": template[4],
            "care_instructions": "Làm sạch chuyên dụng bằng khăn mềm ẩm, bảo quản nơi khô thoáng và dùng túi chống bụi dustbag đi kèm.",
            "packaging_details": f"Hộp cứng nam châm Signature Box {brand_name}, Túi vải Dustbag cao cấp, Thẻ chứng nhận Authenticity Card kèm chip NFC chống giả",
            "country_of_origin": brand_country,
            "color": color,
            "size": size,
            "rating": round(random.uniform(4.8, 5.0), 1),
            "review_count": random.randint(45, 380)
        })
        
    return products

def sync_to_backend_database():
    db_path = r"C:\Users\Admin\ducmanh\DM_Fashion_mall_other_ducmanh\main\backend\src\Ecommerce.API\fashion_mall.db"
    
    print("=" * 80)
    print("          CÀO & NẠP 1000 SẢN PHẨM THỜI TRANG VÀO BACKEND (.NET)")
    print("          20 CỬA HÀNG / THƯƠNG HIỆU - 50 SẢN PHẨM MỖI CỬA HÀNG")
    print("          TÀI KHOẢN: {brand}@gmail.com / MẬT KHẨU: 00000000")
    print("=" * 80)
    print()
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    default_password_hash = sha256_hash_password("00000000")
    print(f"[*] Hash SHA256 cho mật khẩu '00000000': {default_password_hash}")
    
    # 1. TẠO HOẶC CẬP NHẬT 20 TÀI KHOẢN SELLER
    print("\n[1/4] Khởi tạo 20 tài khoản Người Bán (Seller) cho 20 thương hiệu...")
    seller_user_ids = {}
    
    for brand in TOP_20_BRANDS:
        email = f"{brand['id']}@gmail.com"
        full_name = f"{brand['name']} Official Flagship"
        avatar = brand["logo"]
        
        cursor.execute("SELECT Id FROM Users WHERE LOWER(Email) = LOWER(?)", (email,))
        row = cursor.fetchone()
        
        if row:
            user_id = row[0]
            cursor.execute("""
                UPDATE Users 
                SET FullName = ?, PasswordHash = ?, Role = 1, AvatarUrl = ?, IsEmailVerified = 1
                WHERE Id = ?
            """, (full_name, default_password_hash, avatar, user_id))
        else:
            cursor.execute("""
                INSERT INTO Users (FullName, Email, PasswordHash, Role, PhoneNumber, AvatarUrl, IsEmailVerified, CreatedAt)
                VALUES (?, ?, ?, 1, '+84 28 3824 0000', ?, 1, datetime('now'))
            """, (full_name, email, default_password_hash, avatar))
            user_id = cursor.lastrowid
            
        seller_user_ids[brand["id"]] = user_id
        print(f"    ✓ [Seller #{user_id}] {brand['name']} -> Email: {email} | Pass: 00000000")
        
    conn.commit()
    
    # 2. TẠO HOẶC CẬP NHẬT 20 CỬA HÀNG BOUTIQUE TẠI TTTM CHÂU Á
    print("\n[2/4] Khởi tạo hồ sơ 20 Boutique Flagship tại các TTTM đắc địa...")
    
    vietnam_locations = [
        ("Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội", "Hà Nội", 21.0253, 105.8544),
        ("Union Square, 171 Đồng Khởi, Bến Nghé, Quận 1, TP.HCM", "TP. Hồ Chí Minh", 10.7762, 106.7019),
        ("Vincom Center Bà Triệu, 191 Bà Triệu, Hai Bà Trưng, Hà Nội", "Hà Nội", 21.0118, 105.8496),
        ("Saigon Centre (Takashimaya), 65 Lê Lợi, Quận 1, TP.HCM", "TP. Hồ Chí Minh", 10.7735, 106.7011),
        ("Lotte Mall West Lake, 272 Võ Chí Công, Tây Hồ, Hà Nội", "Hà Nội", 21.0746, 105.8078),
        ("Diamond Plaza, 34 Lê Duẩn, Bến Nghé, Quận 1, TP.HCM", "TP. Hồ Chí Minh", 10.7812, 106.6985),
        ("Sheraton Saigon Hotel, 88 Đồng Khởi, Quận 1, TP.HCM", "TP. Hồ Chí Minh", 10.7769, 106.7032),
        ("Vincom Center Landmark 81, 720A Điện Biên Phủ, Bình Thạnh, TP.HCM", "TP. Hồ Chí Minh", 10.7951, 106.7218)
    ]
    
    for idx, brand in enumerate(TOP_20_BRANDS):
        store_code = f"STORE_{brand['id'].upper()}_VN"
        loc = vietnam_locations[idx % len(vietnam_locations)]
        store_name = f"{brand['name']} Flagship Store ({loc[1]})"
        
        services = json.dumps([
            "Đặt hẹn tư vấn riêng cùng Stylist (Private Appointment)",
            "Dịch vụ cá nhân hóa theo yêu cầu (Personalization & Hot Stamping)",
            "Bảo dưỡng và phục hồi sản phẩm chính hãng (Care & Spa)",
            "Phòng chờ VIP Lounge sang trọng",
            "Đỗ xe Valet Parking",
            "Hoàn thuế du lịch VAT Refund"
        ], ensure_ascii=False)
        
        categories = json.dumps([
            "Bộ sưu tập mới nhất New Arrival 2026",
            "Sản phẩm biểu tượng Iconic Collections",
            "Thời trang may sẵn Ready-to-Wear",
            "Đồ da & Túi xách thủ công",
            "Sneakers & Giày dép chính hãng"
        ], ensure_ascii=False)
        
        cursor.execute("SELECT Id FROM Stores WHERE StoreCode = ?", (store_code,))
        s_row = cursor.fetchone()
        
        if s_row:
            cursor.execute("""
                UPDATE Stores
                SET BrandId = ?, StoreName = ?, StoreType = 'Flagship Boutique', City = ?, Address = ?,
                    OperatingHours = 'T2 - CN: 09:30 - 22:00', Latitude = ?, Longitude = ?,
                    ServicesJson = ?, CategoriesJson = ?, ImageUrl = ?, StoreUrl = ?
                WHERE Id = ?
            """, (brand['id'], store_name, loc[1], loc[0], loc[2], loc[3], services, categories, brand['logo'], f"https://www.{brand['id']}.com", s_row[0]))
        else:
            cursor.execute("""
                INSERT INTO Stores (StoreCode, BrandId, StoreName, StoreType, City, Country, Address, Phone, Email, OperatingHours, Latitude, Longitude, ServicesJson, CategoriesJson, ImageUrl, StoreUrl, CreatedAt)
                VALUES (?, ?, ?, 'Flagship Boutique', ?, 'Việt Nam', ?, '+84 28 3824 0000', ?, 'T2 - CN: 09:30 - 22:00', ?, ?, ?, ?, ?, ?, datetime('now'))
            """, (store_code, brand['id'], store_name, loc[1], loc[0], f"contact@{brand['id']}.com", loc[2], loc[3], services, categories, brand['logo'], f"https://www.{brand['id']}.com"))
            
        print(f"    ✓ [Store] {store_name} | Địa chỉ: {loc[0]}")
        
    conn.commit()
    
    # 3. SINH & NẠP 50 SẢN PHẨM CHO TỪNG THƯƠNG HIỆU (TỔNG CỘNG 1000 SẢN PHẨM)
    print("\n[3/4] Bắt đầu trích xuất và đồng bộ 50 sản phẩm cho mỗi thương hiệu (Tổng cộng 1000 SP)...")
    
    total_added = 0
    total_updated = 0
    
    for brand_idx, brand in enumerate(TOP_20_BRANDS, 1):
        brand_id = brand["id"]
        seller_id = seller_user_ids[brand_id]
        category_id = brand["category"]
        
        brand_products = get_product_blueprints(brand_id, brand["name"], brand["country"], count=50)
        
        print(f"\n  >> [{brand_idx:02d}/20] Thương hiệu {brand['name']} (Seller ID: {seller_id}): Đang nạp 50 sản phẩm...")
        
        for p in brand_products:
            cursor.execute("SELECT Id FROM Products WHERE Sku = ?", (p["sku"],))
            p_row = cursor.fetchone()
            
            gallery_json = json.dumps(p["gallery_urls"], ensure_ascii=False)
            
            if p_row:
                p_id = p_row[0]
                cursor.execute("""
                    UPDATE Products
                    SET SellerId = ?, CategoryId = ?, Name = ?, Slug = ?, CollectionName = ?,
                        Description = ?, BasePrice = ?, OriginalPrice = ?, DiscountPercent = ?,
                        ImageUrl = ?, GalleryUrlsJson = ?, StockQuantity = ?, StockStatus = 1,
                        Material = ?, CareInstructions = ?, PackagingDetails = ?, CountryOfOrigin = ?,
                        Rating = ?, ReviewCount = ?, IsActive = 1
                    WHERE Id = ?
                """, (seller_id, category_id, p["name"], p["slug"], p["collection_name"],
                      p["description"], p["base_price"], p["original_price"], p["discount_percent"],
                      p["image_url"], gallery_json, p["stock_quantity"],
                      p["material"], p["care_instructions"], p["packaging_details"], p["country_of_origin"],
                      p["rating"], p["review_count"], p_id))
                total_updated += 1
            else:
                cursor.execute("""
                    INSERT INTO Products (
                        SellerId, CategoryId, Name, Slug, Sku, CollectionName, Description,
                        BasePrice, OriginalPrice, DiscountPercent, ImageUrl, GalleryUrlsJson,
                        StockQuantity, StockStatus, Material, CareInstructions, PackagingDetails,
                        CountryOfOrigin, Rating, ReviewCount, IsActive, CreatedAt
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?,
                        ?, 1, ?, ?, ?,
                        ?, ?, ?, 1, datetime('now')
                    )
                """, (seller_id, category_id, p["name"], p["slug"], p["sku"], p["collection_name"], p["description"],
                      p["base_price"], p["original_price"], p["discount_percent"], p["image_url"], gallery_json,
                      p["stock_quantity"], p["material"], p["care_instructions"], p["packaging_details"],
                      p["country_of_origin"], p["rating"], p["review_count"]))
                p_id = cursor.lastrowid
                total_added += 1
                
            cursor.execute("DELETE FROM ProductVariants WHERE ProductId = ?", (p_id,))
            cursor.execute("""
                INSERT INTO ProductVariants (ProductId, Sku, Size, Color, Price, StockQuantity, CreatedAt)
                VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
            """, (p_id, f"{p['sku']}-V1", p["size"], p["color"], p["base_price"], p["stock_quantity"] // 2))
            
            alt_size = "XL" if p["size"] == "L" else ("42 EU" if "EU" in p["size"] else "M")
            cursor.execute("""
                INSERT INTO ProductVariants (ProductId, Sku, Size, Color, Price, StockQuantity, CreatedAt)
                VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
            """, (p_id, f"{p['sku']}-V2", alt_size, "Phiên bản đặc biệt", p["base_price"], p["stock_quantity"] - (p["stock_quantity"] // 2)))
            
    conn.commit()
    
    cursor.execute("SELECT COUNT(*) FROM Products")
    total_in_db = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM Users WHERE Role = 1")
    total_sellers = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM Stores")
    total_stores = cursor.fetchone()[0]
    
    conn.close()
    
    print("\n" + "=" * 80)
    print("                    KẾT QUẢ ĐỒNG BỘ CSDL THÀNH CÔNG RỰC RỠ!")
    print("=" * 80)
    print(f"[*] Tổng số sản phẩm hiện có trong CSDL:    {total_in_db} sản phẩm")
    print(f"[*] Tổng số tài khoản Người Bán (Seller):   {total_sellers} tài khoản")
    print(f"[*] Tổng số Boutique Flagship đã lưu:       {total_stores} cửa hàng")
    print(f"[*] Sản phẩm thêm mới:                      {total_added}")
    print(f"[*] Sản phẩm cập nhật:                      {total_updated}")
    print()
    print("QUY CHUẨN ĐĂNG NHẬP 20 TÀI KHOẢN (MẬT KHẨU TẤT CẢ LÀ: 00000000):")
    for b in TOP_20_BRANDS:
        print(f"  - {b['name']:20s} : {b['id']}@gmail.com  (Pass: 00000000)")
    print("=" * 80)

if __name__ == "__main__":
    sync_to_backend_database()
