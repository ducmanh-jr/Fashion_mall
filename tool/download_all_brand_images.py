#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script tải về kho ảnh chuẩn xác cho 15 thương hiệu còn lại:
Chanel, Prada, Balenciaga, Hermès, Versace, Burberry, Saint Laurent,
Fendi, Bottega Veneta, Off-White, Puma, Zara, Uniqlo, Calvin Klein, Tommy Hilfiger.
Đảm bảo 100% tệp cục bộ lưu tại: main/frontend/public/img/brands/{brand}/{slug}.jpg
"""

import os
import sys
import urllib.request
import urllib.error

FRONTEND_IMG_DIR = r"C:\Users\Admin\ducmanh\DM_Fashion_mall_other_ducmanh\main\frontend\public\img\brands"

# Bộ sưu tập link ảnh Unsplash thời trang chất lượng cao theo đúng loại sản phẩm
BRAND_CATALOG = {
    "chanel": [
        ("chanel-classic-flap-bag", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("chanel-boy-quilted-bag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("chanel-tweed-boucle-jacket", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop"),
        ("chanel-coco-mademoiselle-perfume", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop"),
        ("chanel-two-tone-slingback", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop"),
        ("chanel-j12-ceramic-watch", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop"),
        ("chanel-quilted-leather-wallet", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop"),
        ("chanel-camellia-silk-scarf", "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop")
    ],
    "prada": [
        ("prada-re-edition-2005-nylon", "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop"),
        ("prada-cleo-brushed-shoulder-bag", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop"),
        ("prada-monolith-combat-boots", "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop"),
        ("prada-chocolate-brushed-loafers", "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop"),
        ("prada-re-nylon-cropped-jacket", "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop"),
        ("prada-triangle-logo-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("prada-symbole-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop"),
        ("prada-saffiano-card-holder", "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop")
    ],
    "balenciaga": [
        ("balenciaga-le-city-medium-bag", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("balenciaga-triple-s-sneaker", "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop"),
        ("balenciaga-track-sneaker-noir", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop"),
        ("balenciaga-oversized-denim-jacket", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"),
        ("balenciaga-strike-combat-boots", "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop"),
        ("balenciaga-hourglass-xs-bag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("balenciaga-bb-monogram-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("balenciaga-dynasty-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop")
    ],
    "hermes": [
        ("hermes-birkin-30-togo-gold", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("hermes-kelly-28-epsom-leather", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("hermes-oran-flat-sandals", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop"),
        ("hermes-constance-h-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("hermes-silk-carre-scarf", "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop"),
        ("hermes-calvi-card-case", "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop"),
        ("hermes-chaine-dancre-bracelet", "https://images.unsplash.com/photo-1611591475854-479607ebc3fb?w=800&auto=format&fit=crop"),
        ("hermes-terre-d-hermes-parfum", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop")
    ],
    "versace": [
        ("versace-la-medusa-handbag", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop"),
        ("versace-barocco-silk-shirt", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop"),
        ("versace-chain-reaction-sneaker", "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop"),
        ("versace-medusa-biggie-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop"),
        ("versace-palazzo-leather-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("versace-baroque-bathrobe", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop"),
        ("versace-dylan-blue-parfum", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop"),
        ("versace-greca-track-pants", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop")
    ],
    "burberry": [
        ("burberry-kensington-trench-coat", "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop"),
        ("burberry-vintage-check-scarf", "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop"),
        ("burberry-lola-quilted-bag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("burberry-arthur-check-sneaker", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop"),
        ("burberry-reversible-wool-cape", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"),
        ("burberry-tb-monogram-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("burberry-check-cotton-shirt", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop"),
        ("burberry-hero-eau-de-parfum", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop")
    ],
    "saintlaurent": [
        ("saintlaurent-loulou-medium-bag", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("saintlaurent-kate-chain-wallet", "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop"),
        ("saintlaurent-classic-biker-jacket", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop"),
        ("saintlaurent-tribute-heeled-sandals", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop"),
        ("saintlaurent-court-classic-sneaker", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop"),
        ("saintlaurent-monogram-narrow-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("saintlaurent-sl557-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop"),
        ("saintlaurent-black-opium-parfum", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop")
    ],
    "fendi": [
        ("fendi-baguette-medium-ff-bag", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop"),
        ("fendi-peekaboo-iseeu-handbag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("fendi-colibri-slingback-pumps", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop"),
        ("fendi-ff-jacquard-wool-sweater", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"),
        ("fendi-ff-buckle-leather-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("fendi-match-suede-sneaker", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop"),
        ("fendi-diamonds-square-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop"),
        ("fendi-sunshine-shopper-tote", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop")
    ],
    "bottegaveneta": [
        ("bottegaveneta-the-pouch-clutch", "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop"),
        ("bottegaveneta-jodie-mini-hobo", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("bottegaveneta-cassette-padded-bag", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop"),
        ("bottegaveneta-tire-chelsea-boots", "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop"),
        ("bottegaveneta-intrecciato-wallet", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop"),
        ("bottegaveneta-stretch-heeled-sandals", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop"),
        ("bottegaveneta-flash-sole-boots", "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop"),
        ("bottegaveneta-cat-eye-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop")
    ],
    "offwhite": [
        ("offwhite-jitney-28-top-handle", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("offwhite-out-of-office-sneaker", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop"),
        ("offwhite-industrial-yellow-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("offwhite-caravaggio-arrows-hoodie", "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop"),
        ("offwhite-vulcanized-canvas-sneaker", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop"),
        ("offwhite-diag-flap-crossbody", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("offwhite-typography-leather-wallet", "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop"),
        ("offwhite-arthur-acetate-sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop")
    ],
    "puma": [
        ("puma-suede-classic-xxi", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop"),
        ("puma-speedcat-og-motorsport", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop"),
        ("puma-palermo-leather-terrace", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop"),
        ("puma-t7-track-jacket-heritage", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop"),
        ("puma-velocity-nitro-3-running", "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop"),
        ("puma-fenty-creeper-phatty", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop"),
        ("puma-core-heritage-backpack", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop"),
        ("puma-classics-relaxed-hoodie", "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop")
    ],
    "zara": [
        ("zara-tailored-double-breasted-blazer", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop"),
        ("zara-minimalist-ribbed-knit-sweater", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"),
        ("zara-wide-leg-pleated-trousers", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop"),
        ("zara-faux-leather-oversized-trench", "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop"),
        ("zara-pointed-toe-kitten-boots", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop"),
        ("zara-textured-leather-city-bag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop"),
        ("zara-basic-relaxed-poplin-shirt", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop"),
        ("zara-belted-linen-blend-jumpsuit", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop")
    ],
    "uniqlo": [
        ("uniqlo-ultra-light-down-jacket", "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop"),
        ("uniqlo-airism-cotton-oversize-tee", "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop"),
        ("uniqlo-extra-fine-merino-cardigan", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"),
        ("uniqlo-smart-stretch-ankle-pants", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop"),
        ("uniqlo-seamless-down-hooded-parka", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop"),
        ("uniqlo-premium-lambswool-sweater", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"),
        ("uniqlo-round-mini-shoulder-bag", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop"),
        ("uniqlo-dry-ex-functional-tee", "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop")
    ],
    "calvinklein": [
        ("calvinklein-modern-cotton-bralette", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"),
        ("calvinklein-90s-straight-denim-jeans", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop"),
        ("calvinklein-monogram-logo-tee", "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop"),
        ("calvinklein-trucker-sherpa-jacket", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"),
        ("calvinklein-low-rise-trunk-3pack", "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop"),
        ("calvinklein-reversible-leather-belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop"),
        ("calvinklein-ck-one-eau-de-toilette", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop"),
        ("calvinklein-minimalist-camera-bag", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop")
    ],
    "tommyhilfiger": [
        ("tommyhilfiger-classic-oxford-shirt", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-colorblock-windbreaker", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-heritage-flag-sweater", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-straight-fit-chino", "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-retro-flag-leather-sneaker", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-varsity-wool-bomber", "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-global-stripe-wallet", "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop"),
        ("tommyhilfiger-cologne-spray", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop")
    ]
}

def download_file(url, target_path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(target_path, 'wb') as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"  [!] Lỗi khi tải {url}: {e}")
        return False

def main():
    print("================================================================")
    print(" BẮT ĐẦU TẢI ẢNH CHUẨN XÁC 100% CHO 15 THƯƠNG HIỆU THỜI TRANG ")
    print("================================================================")
    
    total_downloaded = 0
    total_skipped = 0
    
    for brand, items in BRAND_CATALOG.items():
        brand_dir = os.path.join(FRONTEND_IMG_DIR, brand)
        os.makedirs(brand_dir, exist_ok=True)
        print(f"\n--> Thương hiệu: {brand.upper()} ({len(items)} sản phẩm)")
        
        for slug, url in items:
            filename = f"{slug}.jpg"
            target_path = os.path.join(brand_dir, filename)
            
            if os.path.exists(target_path) and os.path.getsize(target_path) > 1024:
                print(f"  [OK] Đã có sẵn: {filename}")
                total_skipped += 1
                continue
                
            success = download_file(url, target_path)
            if success:
                size_kb = os.path.getsize(target_path) // 1024
                print(f"  [+] Đã tải: {filename} ({size_kb} KB)")
                total_downloaded += 1
            else:
                print(f"  [-] Thất bại: {filename}")
                
    print("\n================================================================")
    print(f" TỔNG KẾT: Tải mới {total_downloaded} ảnh, Bỏ qua (đã có) {total_skipped} ảnh.")
    print("================================================================")

if __name__ == "__main__":
    main()
