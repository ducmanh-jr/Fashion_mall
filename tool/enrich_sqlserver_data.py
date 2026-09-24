# -*- coding: utf-8 -*-
"""
Script làm giàu dữ liệu trực tiếp cho SQL Server (localhost\\SQLEXPRESS - DB: fashion_mall)
Cập nhật Gallery 5 - 8 góc chụp đa dạng, thông số chất liệu, xuất xứ, hướng dẫn chăm sóc, đóng gói
cho toàn bộ sản phẩm trong hệ thống.
"""

import subprocess
import json
import random
import os
import sys

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

SNEAKER_ANGLES = [
    "/img/products/adidas-samba.jpg",
    "/img/products/nike-summer-sneaker.jpg",
    "/img/products/gucci-sneaker.jpg",
    "/img/products/puma-shoes-fall.jpg",
    "/img/products/balenciaga-track-beige.jpg",
    "/img/products/balenciaga-track-black.jpg",
    "/img/products/balenciaga-track-street.jpg",
]

APPAREL_ANGLES = [
    "/img/products/adidas-sakura-hoodie.jpg",
    "/img/products/balenciaga-ripped-jacket.jpg",
    "/img/products/sample-velora.jpg",
    "/img/products/sample-nextgen.jpg",
]

EDITORIAL_LOOKBOOK = [
    "/img/products/fashion-mood-board.jpg",
    "/img/products/gucci-collection.jpg",
    "/img/products/gucci-runway.jpg",
    "/img/home/1.jpg",
    "/img/home/2.jpg",
    "/img/home/3.jpg",
    "/img/home/4.jpg",
    "/img/home/5.jpg",
    "/img/home/6.jpg",
]

MATERIAL_DICT = {
    "gucci": ("100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K", "Made in Italy"),
    "dior": ("Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm", "Made in France"),
    "chanel": ("Da cừu non Lambskin chần bông Cannage biểu tượng, khóa CC mạ rutenium", "Made in France"),
    "louisvuitton": ("Canvas Monogram chống thấm độc quyền & Da bò tự nhiên Vachetta thuộc thảo mộc", "Made in France"),
    "hermes": ("Da Togo / Epsom cao cấp từ vùng núi Alpes, khâu tay thủ công Saddle Stitch", "Made in France"),
    "prada": ("Vải sợi tái chế Re-Nylon độc quyền kết hợp da Saffiano vân chéo chống xước", "Made in Italy"),
    "balenciaga": ("Vải dệt Denim Nhật Bản wash rách vintage & Da bê nứt Agneau distressed", "Made in Italy"),
    "versace": ("Lụa tơ tằm Silk Twill hoa văn Baroque mạ vàng & Da nappa bóng cao cấp", "Made in Italy"),
    "burberry": ("Vải Gabardine chống thấm nước dệt tại Yorkshire, lót họa tiết Vintage Check", "Made in United Kingdom"),
    "saintlaurent": ("100% Da cừu chần bông hình chữ Y chevron, logo YSL kim loại đánh xước", "Made in Italy"),
    "bottegaveneta": ("Kỹ thuật đan da Intrecciato thủ công trứ danh vùng Veneto, da cừu mềm Plissé", "Made in Italy"),
    "fendi": ("Canvas dệt logo FF Jacquard kinh điển & Da Cuoio Romano may viền thủ công", "Made in Italy"),
    "offwhite": ("Cotton Jersey 100% 320 GSM in graphic phản quang & Dây khóa Zip-tie", "Made in Italy"),
    "adidas": ("Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn", "Made in Germany"),
    "nike": ("Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực", "Made in USA"),
    "puma": ("Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su", "Made in Germany"),
    "zara": ("Vải len pha Viscose cao cấp, cấu trúc đệm vai may đo theo phom dáng Châu Âu", "Made in Spain"),
    "uniqlo": ("Vải sợi công nghệ Heattech / AIRism độc quyền Nhật Bản, co giãn 4 chiều", "Made in Japan"),
    "calvinklein": ("95% Cotton Pima siêu dài mềm mịn, 5% Elastane giữ form ôm sát hoàn hảo", "Made in Sri Lanka"),
    "tommyhilfiger": ("100% Cotton Oxford dệt sợi đôi bền bỉ, thêu logo cờ tam sắc biểu tượng", "Made in Portugal")
}

DEFAULT_CARE = "Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát."
DEFAULT_PACK = "Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique."

def generate_sql():
    sql_file = r"c:\Users\Admin\ducmanh\main\tool\update_sqlserver_gallery.sql"
    
    # 1. Đọc danh sách sản phẩm từ SQL Server qua sqlcmd
    cmd = 'sqlcmd -S "localhost\\SQLEXPRESS" -d "fashion_mall" -C -s "^" -W -Q "SET NOCOUNT ON; SELECT Id, CategoryId, Name, Sku, ImageUrl FROM Products;"'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    
    lines = res.stdout.strip().split('\n')
    if len(lines) < 2:
        print("[-] Không đọc được dữ liệu từ SQL Server:", res.stderr)
        return
        
    print(f"[+] Đọc được {len(lines)-1} dòng từ SQL Server.")
    
    updates = []
    updates.append("SET NOCOUNT ON;")
    updates.append("BEGIN TRANSACTION;")
    
    count = 0
    for line in lines:
        parts = line.split('^')
        if len(parts) < 5 or not parts[0].strip().isdigit():
            continue
            
        p_id = int(parts[0].strip())
        cat_id = int(parts[1].strip())
        name = parts[2].strip()
        sku = parts[3].strip()
        img_url = parts[4].strip()
        
        name_lower = name.lower()
        
        # Xác định thương hiệu
        brand_key = "gucci"
        for b in MATERIAL_DICT.keys():
            if b in name_lower or b in sku.lower():
                brand_key = b
                break
                
        mat_info = MATERIAL_DICT.get(brand_key, MATERIAL_DICT["gucci"])
        mat_text = mat_info[0].replace("'", "''")
        origin_text = mat_info[1].replace("'", "''")
        
        # Chuẩn hóa ImageUrl
        primary = img_url if img_url else "/img/products/adidas-samba.jpg"
        if not primary.startswith("/"):
            primary = "/" + primary
            
        gallery = [primary]
        
        if cat_id == 1 or "giày" in name_lower or "sneaker" in name_lower or "loafer" in name_lower:
            pool = [a for a in SNEAKER_ANGLES if a != primary]
            gallery.extend(random.sample(pool, min(3, len(pool))))
        elif cat_id == 2 or "áo" in name_lower or "quần" in name_lower or "jacket" in name_lower:
            pool = [a for a in APPAREL_ANGLES if a != primary]
            gallery.extend(random.sample(pool, min(3, len(pool))))
        else:
            pool = [a for a in EDITORIAL_LOOKBOOK if a != primary]
            gallery.extend(random.sample(pool, min(3, len(pool))))
            
        # Thêm 1 ảnh Lookbook nghệ thuật và 1 ảnh chi tiết
        lookbook_item = EDITORIAL_LOOKBOOK[p_id % len(EDITORIAL_LOOKBOOK)]
        if lookbook_item not in gallery:
            gallery.append(lookbook_item)
            
        gallery_json = json.dumps(gallery, ensure_ascii=False).replace("'", "''")
        rating = round(random.uniform(4.8, 5.0), 1)
        reviews = random.randint(55, 380)
        
        updates.append(f"""UPDATE Products SET 
            ImageUrl = '{primary}',
            GalleryUrlsJson = N'{gallery_json}',
            Material = N'{mat_text}',
            CountryOfOrigin = N'{origin_text}',
            CareInstructions = N'{DEFAULT_CARE.replace("'", "''")}',
            PackagingDetails = N'{DEFAULT_PACK.replace("'", "''")}',
            Rating = {rating},
            ReviewCount = {reviews}
            WHERE Id = {p_id};""")
        count += 1

    updates.append("COMMIT TRANSACTION;")
    updates.append(f"PRINT 'Da cap nhat thanh cong {count} san pham!';")
    
    with open(sql_file, "w", encoding="utf-8") as f:
        f.write("\n".join(updates))
        
    print(f"[+] Đã tạo file SQL cập nhật: {sql_file} ({count} câu lệnh UPDATE).")
    
    # 2. Thực thi file SQL qua sqlcmd
    print("[+] Đang nạp dữ liệu vào SQL Server (localhost\\SQLEXPRESS)...")
    exec_cmd = f'sqlcmd -S "localhost\\SQLEXPRESS" -d "fashion_mall" -C -i "{sql_file}"'
    exec_res = subprocess.run(exec_cmd, shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    print(exec_res.stdout)
    if exec_res.stderr:
        print("Stderr:", exec_res.stderr)
    print(f"[SUCCESS] Đã hoàn tất làm giàu dữ liệu SQL Server cho {count} sản phẩm!")

if __name__ == '__main__':
    generate_sql()
