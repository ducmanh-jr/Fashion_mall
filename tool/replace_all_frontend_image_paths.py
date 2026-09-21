#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Chuẩn hóa toàn bộ tên file ảnh trong mã nguồn Frontend:
- Loại bỏ khoảng trắng sai chính tả và ký tự đặc biệt
- Thay thế bằng các tệp ảnh chuẩn đã được xác thực
"""

import os

SRC_DIR = r"C:\Users\Admin\ducmanh\DM_Fashion_mall_other_ducmanh\main\frontend\src"

REPLACEMENTS = [
    ("/img/addidas samba.jpg", "/img/adidas-samba.jpg"),
    ("/img/Adidas sakura zip up hoodie.jpg", "/img/adidas-sakura-hoodie.jpg"),
    ("/img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg", "/img/balenciaga-track-beige.jpg"),
    ("/img/#balanciagatrack#thug 🥷🏿.jpg", "/img/balenciaga-track-black.jpg"),
    ("/img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg", "/img/balenciaga-track-street.jpg"),
    ("/img/gucci-sneaker-replica.jpg", "/img/gucci-sneaker.jpg"),
    ("/img/Nike men's summer sneaker (men shoe collection for 2024).jpg", "/img/nike-summer-sneaker.jpg"),
    ('/img/Nike men\'s summer sneaker (men shoe collection for 2024).jpg', "/img/nike-summer-sneaker.jpg"),
    ("/img/Oversized ripped balenciaga jacket.jpg", "/img/balenciaga-ripped-jacket.jpg"),
    ("/img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg", "/img/puma-shoes-fall.jpg"),
    ("/img/Some of favorite Gucci from recent collection 🔥….jpg", "/img/gucci-collection.jpg"),
]

def run():
    total_replaced = 0
    for root, dirs, files in os.walk(SRC_DIR):
        for f in files:
            if f.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.css')):
                file_path = os.path.join(root, f)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                
                new_content = content
                for old, new in REPLACEMENTS:
                    if old in new_content:
                        count = new_content.count(old)
                        new_content = new_content.replace(old, new)
                        print(f"[{f}] Thay '{old}' -> '{new}' ({count} lần)")
                        total_replaced += count
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as fp:
                        fp.write(new_content)

    print(f"\n[OK] Đã chuẩn hóa thành công {total_replaced} vị trí đường dẫn ảnh trong mã nguồn Frontend!")

if __name__ == "__main__":
    run()
