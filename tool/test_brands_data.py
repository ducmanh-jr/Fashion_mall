#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script sinh mã C# cho DatabaseSeeder.cs chuẩn xác 100%,
tương thích hoàn toàn với SQL Server SQLEXPRESS và SQLite,
sử dụng kho ảnh 160 tệp cục bộ sạch tại /img/brands/ và /img/
"""

import os
import json

TARGET_FILE = r"C:\Users\Admin\ducmanh\DM_Fashion_mall_other_ducmanh\main\backend\src\Ecommerce.DAL\Seed\DatabaseSeeder.cs"

# 20 Thương hiệu
BRANDS_DATA = [
    ("gucci", "Gucci", "Ý", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Jackie 1961 Mini Shoulder Bag", "gucci-jackie-1961-mini", 3, 62000000, 70000000, "Da bê bóng / Khóa Piston mạ vàng 18K", "Gucci Icons"),
        ("Túi Xách Dionysus GG Supreme Mini Chain", "gucci-dionysus-gg-supreme", 3, 32000000, 36000000, "Canvas GG Supreme & Khóa đầu hổ chạm bạc", "Gucci Dionysus"),
        ("Giày Sneaker Gucci Ace Web Embroidered", "gucci-ace-sneaker-web", 1, 18900000, 21000000, "Da bò Nappa Ý trắng, sọc Web xanh đỏ", "Gucci Footwear"),
        ("Giày Loafer Jordaan Classic Horsebit", "gucci-jordaan-loafer", 1, 26500000, 29000000, "Da bóng mịn, hàm thiếc mạ vàng thủ công", "Gucci Jordaan"),
        ("Áo Khoác Heritage Monogram GG Runway Jacket", "gucci-runway-monogram-jacket", 2, 48000000, 54000000, "Vải dệt Jacquard GG cao cấp", "Gucci Runway"),
        ("Thắt Lưng Da Double G Buckle Reversible", "gucci-double-g-belt", 3, 14500000, 16000000, "Da bò trơn 2 mặt đen/nâu, khóa GG mạ đồng", "Gucci Leather"),
        ("Kính Mát Chữ Nhật Double G Oversized", "gucci-double-g-sunglasses", 3, 11500000, 13000000, "Gọng Acetate đen bóng, tròng chống UV400", "Gucci Eyewear"),
        ("Khăn Lụa Tơ Tằm Flora Silk Carré 90x90", "gucci-flora-silk-carre", 3, 12500000, 14000000, "100% Silk Twill dệt thủ công tại Como Ý", "Gucci Flora")
    ]),
    ("dior", "Christian Dior", "Pháp", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Lady Dior Medium Cannage Lambskin", "lady-dior-medium-cannage", 3, 155000000, 170000000, "Da cừu non chần bông Cannage, charm D.I.O.R", "Lady Dior Heritage"),
        ("Túi Xách Dior Saddle Bag Black Grained Calfskin", "dior-saddle-bag-black", 3, 115000000, 125000000, "Da bê hạt sần, khóa chữ D kim loại mạ vàng", "Dior Saddle Icons"),
        ("Túi Tote Dior Book Tote Thêu Oblique Xanh", "dior-book-tote-oblique", 3, 88000000, 95000000, "Vải Canvas thêu hàng triệu mũi chỉ Oblique", "Dior Oblique"),
        ("Giày Cao Gót J'Adior Slingback Technical Fabric", "dior-jadior-slingback-pump", 1, 28500000, 32000000, "Vải dệt kỹ thuật, dải ruy băng thêu J'Adior", "J'Adior Footwear"),
        ("Giày Sneaker Dior B27 Low-Top Galaxy Leather", "dior-b27-low-top-sneaker", 1, 32500000, 36000000, "Da bê mịn trắng xám dập lỗ Oblique Galaxy", "Dior Men Sneaker"),
        ("Áo Khoác Bar Jacket Len Dạ Haute Couture", "dior-bar-jacket-couture", 2, 98000000, 110000000, "Len dạ dệt thủ công, eo đồng hồ cát biểu tượng", "Dior 30 Montaigne"),
        ("Nước Hoa Gris Dior La Collection Privée 250ml", "gris-dior-perfume-privee", 3, 12500000, 14000000, "Hương chypre hoa cỏ quý hiếm gỗ sồi & hoắc hương", "Dior Parfumerie"),
        ("Khăn Quàng Cổ Mitzah Lụa Toile de Jouy", "dior-mitzah-silk-scarf", 3, 6800000, 7500000, "100% Silk Twill in họa tiết Toile de Jouy", "Dior Cruise Silk")
    ]),
    ("adidas", "Adidas", "Đức", 1, "Giày Sneaker & Thể Thao", [
        ("Giày Adidas Samba OG Classic Cloud White", "adidas-samba-og-classic", 1, 2790000, 3200000, "Da thật full-grain, mũi T-toe da lộn", "Adidas Originals Terrace"),
        ("Giày Adidas Gazelle Indoor Core Black Gum", "adidas-gazelle-indoor-black", 1, 2950000, 3400000, "Da lộn mềm cao cấp, đế cao su gum bán trong", "Adidas Originals Indoor"),
        ("Giày Adidas Handball Spezial Clear Pink", "adidas-handball-spezial-pink", 1, 2900000, 3300000, "Da lộn hồng pastel, đế gum cổ điển", "Adidas Terrace Special"),
        ("Giày Chạy Bộ Adidas Ultraboost Light 2026", "adidas-ultraboost-light", 1, 5200000, 5800000, "Sợi dệt Primeknit+, đệm Boost hoàn trả năng lượng", "Adidas Performance"),
        ("Áo Khoác Nỉ Beckenbauer Tracktop Night Indigo", "adidas-beckenbauer-tracktop", 2, 2200000, 2600000, "Vải dệt đôi 52% cotton hữu cơ, 48% poly tái chế", "Adidas Heritage"),
        ("Quần Thể Thao Tiro 23 League Training Pants", "adidas-tiro23-training-pants", 2, 1350000, 1600000, "Vải thun công nghệ AEROREADY thoát ẩm nhanh", "Adidas Training"),
        ("Áo Hoodie Trefoil Essentials French Terry", "adidas-trefoil-hoodie", 2, 1850000, 2200000, "Chất nỉ bông 100% cotton Pháp 380gsm dày dặn", "Adidas Originals"),
        ("Balo Thời Trang Adicolor Classic Trefoil", "adidas-adicolor-backpack", 3, 890000, 1100000, "Vải Poly dệt chống nước nhẹ, quai đệm êm", "Adidas Accessories")
    ]),
    ("louisvuitton", "Louis Vuitton", "Pháp", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Speedy Bandoulière 25 Monogram", "lv-speedy-bandouliere-25", 3, 48500000, 55000000, "Canvas Monogram kinh điển, tay cầm da bò tự nhiên", "LV Speedy Heritage"),
        ("Túi Tote Neverfull MM Monogram Canvas", "lv-neverfull-mm-monogram", 3, 52000000, 58000000, "Canvas Monogram lót vải sọc, kèm ví pouch tháo rời", "LV Icons"),
        ("Túi Xách Capucines MM Da Taurillon Đen", "lv-capucines-mm-taurillon", 3, 185000000, 200000000, "Da bò Taurillon cao cấp nguyên tấm, logo LV kim loại", "LV Capucines"),
        ("Giày Sneaker LV Trainer Green White", "lv-trainer-sneaker-green", 1, 34500000, 38000000, "Thiết kế của Virgil Abloh, da bê Ý 7 giờ chế tác", "LV Trainer by Virgil"),
        ("Giày Sneaker Run Away Calf Leather", "lv-run-away-sneaker", 1, 29000000, 32500000, "Phối da bê và canvas monogram, đế nâng gót ẩn", "LV Footwear"),
        ("Áo Khoác Gió Reversible Monogram Windbreaker", "lv-monogram-windbreaker", 2, 72000000, 80000000, "Vải kỹ thuật chống thấm 2 mặt, họa tiết monogram dệt chìm", "LV Outerwear"),
        ("Thắt Lưng LV Initiales 40mm Reversible", "lv-initiales-40mm-belt", 3, 16500000, 18500000, "Mặt ngoài Monogram Canvas, mặt trong da bê đen", "LV Belts"),
        ("Ví Dài Zippy Wallet Da Monogram Empreinte", "lv-zippy-wallet-empreinte", 3, 27500000, 30500000, "Da bò dập nổi họa tiết Monogram, khóa kéo kim loại vàng", "LV Small Leather")
    ]),
    ("nike", "Nike", "Mỹ", 1, "Giày Sneaker & Thể Thao", [
        ("Giày Nike Air Force 1 '07 Triple White", "nike-air-force-1-white", 1, 2990000, 3400000, "Da thật full-grain, đệm khí Nike Air êm ái", "Nike Sportswear Icon"),
        ("Giày Nike Air Jordan 1 Retro High OG Chicago", "nike-air-jordan-1-retro-chicago", 1, 5500000, 6200000, "Phiên bản màu Chicago kinh điển da Nappa cao cấp", "Jordan Brand Heritage"),
        ("Giày Nike Dunk Low Retro White Black Panda", "nike-dunk-low-retro-panda", 1, 2890000, 3300000, "Phối màu trắng đen Panda biểu tượng streetwear", "Nike Dunk Legacy"),
        ("Giày Chạy Bộ Nike Air Zoom Alphafly NEXT% 3", "nike-air-zoom-alphafly-next", 1, 7890000, 8500000, "Đế đệm bọt ZoomX & đĩa đệm sợi carbon Flyplate", "Nike Running Elite"),
        ("Áo Khoác Nỉ Nike Tech Fleece Full-Zip Windrunner", "nike-tech-fleece-windrunner", 2, 2850000, 3300000, "Chất nỉ cách nhiệt Tech Fleece nhẹ và ấm vượt trội", "Nike Tech Pack"),
        ("Quần Nỉ Thể Thao Nike Club Fleece Cargo Pants", "nike-club-fleece-cargo-pants", 2, 1650000, 1950000, "Vải nỉ bông mềm mại, túi hộp tiện dụng thể thao", "Nike Club Fleece"),
        ("Áo Gió Chạy Bộ Nike Windrunner Repel Jacket", "nike-windrunner-jacket", 2, 2450000, 2900000, "Vải dệt chevron 26 độ chống thấm nước nhẹ", "Nike Running Essentials"),
        ("Túi Đeo Chéo Thể Thao Nike Heritage Crossbody Bag", "nike-heritage-crossbody-bag", 3, 750000, 950000, "Vải poly bền bỉ, dây đeo điều chỉnh linh hoạt", "Nike Accessories")
    ]),
    ("chanel", "Chanel", "Pháp", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Classic Flap Bag Lambskin Black", "chanel-classic-flap-bag", 3, 260000000, 280000000, "Da cừu non chần quả trám, khóa xoay CC mạ vàng 24K", "Chanel Timeless Classic"),
        ("Túi Xách Boy Chanel Quilted Calfskin", "chanel-boy-quilted-bag", 3, 175000000, 190000000, "Da bê hạt sần cao cấp, khóa bấm kim loại ruthenium", "Boy Chanel Icons"),
        ("Áo Khoác Dạ Tweed Bouclé Haute Couture", "chanel-tweed-boucle-jacket", 2, 145000000, 160000000, "Vải Tweed dệt thủ công Lesage Paris, cúc chạm sư tử", "Chanel Ready-to-Wear"),
        ("Nước Hoa Chanel Coco Mademoiselle Intense 100ml", "chanel-coco-mademoiselle-perfume", 3, 4950000, 5500000, "Hương hoắc hương, hoa hồng Thổ Nhĩ Kỳ và cam Bergamot", "Chanel Fragrance"),
        ("Giày Slingback Two-Tone Beige Black Goat Leather", "chanel-two-tone-slingback", 1, 29500000, 33000000, "Da dê phối mũi lụa đen huyền thoại Gabrielle Chanel 1957", "Chanel Footwear"),
        ("Đồng Hồ J12 Ceramic Diamond Bezel Automatic", "chanel-j12-ceramic-watch", 3, 220000000, 240000000, "Ceramic công nghệ cao chống trầy, bộ máy Caliber 12.1", "Chanel Horlogerie"),
        ("Ví Gập Cầm Tay Quilted Caviar Flap Wallet", "chanel-quilted-leather-wallet", 3, 31000000, 35000000, "Da hạt Caviar chống xước, logo CC vàng tinh xảo", "Chanel Small Leather"),
        ("Khăn Lụa Tơ Tằm Camellia Silk Twill 90x90", "chanel-camellia-silk-scarf", 3, 14500000, 16500000, "100% Silk Twill dệt tại Pháp, họa tiết hoa trà Camellia", "Chanel Silk Foulards")
    ]),
    ("prada", "Prada", "Ý", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Re-Edition 2005 Re-Nylon Shoulder Bag", "prada-re-edition-2005-nylon", 3, 45000000, 50000000, "Chất liệu Re-Nylon tái chế đại dương, quai da Saffiano", "Prada Re-Edition"),
        ("Túi Kẹp Nách Cleo Brushed Leather Shoulder Bag", "prada-cleo-brushed-shoulder-bag", 3, 75000000, 82000000, "Da bê bóng Spazzolato uốn cong duyên dáng Milan", "Prada Cleo Icons"),
        ("Giày Combat Boots Monolith Leather & Nylon", "prada-monolith-combat-boots", 1, 38000000, 42000000, "Đế răng cưa hầm hố kèm ví pouch gắn bắp chân tháo rời", "Prada Monolith Footwear"),
        ("Giày Loafer Chocolate Brushed Leather With Triangle", "prada-chocolate-brushed-loafers", 1, 31500000, 35000000, "Da bóng mịn đính logo tam giác tráng men Men Milan", "Prada Footwear"),
        ("Áo Khoác Phao Re-Nylon Cropped Down Jacket", "prada-re-nylon-cropped-jacket", 2, 65000000, 72000000, "Vải Re-Nylon chống thấm, lông vũ tơ tằm siêu nhẹ", "Prada Ready-to-Wear"),
        ("Thắt Lưng Da Saffiano Reversible Triangle Belt", "prada-triangle-logo-belt", 3, 15500000, 17500000, "Da Saffiano dập vân chéo chống trầy, khóa tam giác bạc", "Prada Accessories"),
        ("Kính Mát Chữ Nhật Prada Symbole Geometric", "prada-symbole-sunglasses", 3, 12800000, 14500000, "Gọng Acetate cắt góc geometric, tròng chống lóa 100%", "Prada Eyewear"),
        ("Ví Đựng Thẻ Saffiano Leather Card Holder", "prada-saffiano-card-holder", 3, 9500000, 11000000, "Da Saffiano đen 6 ngăn cắm thẻ, logo men kim loại", "Prada Small Leather")
    ]),
    ("balenciaga", "Balenciaga", "Tây Ban Nha / Pháp", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Túi Xách Le City Medium Arena Leather Bag", "balenciaga-le-city-medium-bag", 3, 68000000, 75000000, "Da cừu non Arena nhăn tự nhiên, đinh tán kim loại bạc", "Balenciaga Icons"),
        ("Giày Sneaker Triple S Clear Sole White Multi", "balenciaga-triple-s-sneaker", 1, 26500000, 29000000, "Đế ba lớp công nghệ Clear Sole bán trong suốt", "Balenciaga Triple S"),
        ("Giày Sneaker Track 4.0 LED Light-Up Sneaker", "balenciaga-track-sneaker-noir", 1, 32000000, 36000000, "Phiên bản đèn LED gót 11 chế độ, dây buộc đa lớp", "Balenciaga Track"),
        ("Áo Khoác Bò Oversized Ripped Denim Jacket", "balenciaga-oversized-denim-jacket", 2, 42000000, 48000000, "Vải Denim Nhật Bản wash mài rách thủ công phong cách grunge", "Balenciaga Streetwear"),
        ("Giày Bốt Strike 20mm Matte Leather Combat Boots", "balenciaga-strike-combat-boots", 1, 31000000, 35000000, "Da bò đen mờ, đế cao su khâu viền răng cưa chắc chắn", "Balenciaga Strike"),
        ("Túi Xách Hourglass XS Top Handle Shiny Calfskin", "balenciaga-hourglass-xs-bag", 3, 58000000, 65000000, "Thiết kế đáy uốn cong parabol độc đáo, khóa chữ B mạ vàng", "Balenciaga Hourglass"),
        ("Thắt Lưng Da BB Monogram Antique Brass Belt", "balenciaga-bb-monogram-belt", 3, 12500000, 14000000, "Da bò trơn thuộc thảo mộc, mặt khóa BB đồng giả cổ", "Balenciaga Belts"),
        ("Kính Mát Chữ Nhật Dynasty Rectangle Sunglasses", "balenciaga-dynasty-sunglasses", 3, 13500000, 15000000, "Gọng dày đính logo BB kim loại mạ vàng hai bên càng kính", "Balenciaga Eyewear")
    ]),
    ("hermes", "Hermès", "Pháp", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Birkin 30 Togo Leather Gold Hardware", "hermes-birkin-30-togo-gold", 3, 380000000, 420000000, "Da bê Togo sần chống xước, khóa kim loại mạ vàng 18K", "Hermès Birkin Heritage"),
        ("Túi Xách Kelly 28 Sellier Epsom Leather", "hermes-kelly-28-epsom-leather", 3, 340000000, 370000000, "Da Epsom cứng cáp giữ form tuyệt đối, đường may viền Sellier", "Hermès Kelly Sellier"),
        ("Dép Quai Ngang Oran Flat Calfskin Sandals Gold", "hermes-oran-flat-sandals", 1, 19500000, 22000000, "Da bê Box cao cấp màu nâu bò Gold, quai chữ H kinh điển", "Hermès Footwear"),
        ("Thắt Lưng Da Constance H-Buckle Reversible", "hermes-constance-h-belt", 3, 24500000, 27500000, "Da Togo/Swift hai mặt, mặt khóa chữ H mạ palladium sáng bóng", "Hermès Belts"),
        ("Khăn Lụa Tơ Tằm Carré 90x90 Grand Tralala", "hermes-silk-carre-scarf", 3, 13500000, 15500000, "Lụa tơ tằm dệt thủ công tại Lyon, viền may tay cuộn tròn", "Hermès Silk"),
        ("Ví Đựng Thẻ Calvi Card Case Epsom Leather", "hermes-calvi-card-case", 3, 12000000, 14000000, "Thiết kế gập phong bì tối giản da Epsom bền bỉ", "Hermès Small Leather"),
        ("Vòng Tay Bạc Chaine d'Ancre Silver Bracelet", "hermes-chaine-dancre-bracelet", 3, 42000000, 47000000, "Bạc nguyên khối 925 lấy cảm hứng từ mỏ neo du thuyền", "Hermès Bijouterie"),
        ("Nước Hoa Terre d'Hermès Eau Intense Vétiver 100ml", "hermes-terre-d-hermes-parfum", 3, 3850000, 4300000, "Hương gỗ khoáng đạt, cỏ hương bài và cam Bergamot nồng nàn", "Hermès Parfums")
    ]),
    ("versace", "Versace", "Ý", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Túi Xách La Medusa Small Leather Handbag", "versace-la-medusa-handbag", 3, 48000000, 54000000, "Da bê dẻo mềm mịn, logo đầu nữ thần rắn Medusa mạ vàng", "Versace La Medusa"),
        ("Áo Sơ Mi Lụa Barocco Silk Button-Up Shirt", "versace-barocco-silk-shirt", 2, 38000000, 43000000, "100% Lụa tơ tằm in họa tiết hoa văn vàng hoàng gia Baroque", "Versace Silk Icons"),
        ("Giày Sneaker Chain Reaction Chunky Sole", "versace-chain-reaction-sneaker", 1, 24500000, 27500000, "Đế đúc hình mắt xích dây chuyền Versace, họa tiết da báo", "Versace Footwear"),
        ("Kính Mát Medusa Biggie Geometric Sunglasses", "versace-medusa-biggie-sunglasses", 3, 9500000, 11000000, "Gọng acetate lấy cảm hứng từ rapper Biggie Smalls thập niên 90", "Versace Eyewear"),
        ("Thắt Lưng Da Palazzo Medusa Buckle Belt", "versace-palazzo-leather-belt", 3, 14000000, 16000000, "Da bò nappa dập vân nhẹ, mặt khóa đầu rắn Medusa 3D nổi bật", "Versace Belts"),
        ("Áo Choàng Tắm Cotton Barocco Bathrobe", "versace-baroque-bathrobe", 2, 16500000, 18500000, "100% Cotton Jacquard dệt họa tiết Greca và hoa văn Baroque", "Versace Maison"),
        ("Nước Hoa Dylan Blue Pour Homme Eau de Toilette 100ml", "versace-dylan-blue-parfum", 3, 2950000, 3400000, "Hương cam chanh Địa Trung Hải, lá sung và hổ phách xạ hương", "Versace Fragrance"),
        ("Quần Thể Thao Greca Border Cotton Track Pants", "versace-greca-track-pants", 2, 18500000, 21000000, "Chất nỉ cotton co giãn nhẹ, đai lưng dệt hoa văn Greca Hy Lạp", "Versace Activewear")
    ]),
    ("burberry", "Burberry", "Anh Quốc", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Áo Măng Tô The Kensington Heritage Trench Coat", "burberry-kensington-trench-coat", 2, 68000000, 76000000, "Vải dệt Gabardine chống thấm nước độc quyền Thomas Burberry", "Burberry Heritage Trench"),
        ("Khăn Choàng Cổ Vintage Check Cashmere Scarf", "burberry-vintage-check-scarf", 3, 15500000, 17500000, "100% Lông dê Cashmere chải bằng quả kế dại Scotland", "Burberry Cashmere"),
        ("Túi Xách Lola Quilted Leather Shoulder Bag", "burberry-lola-quilted-bag", 3, 49000000, 55000000, "Da cừu Ý chần bông quả trám, khóa logo TB mạ vàng", "Burberry Lola"),
        ("Giày Sneaker Arthur Vintage Check Low-Top", "burberry-arthur-check-sneaker", 1, 23500000, 26000000, "Đế bọc cao su chống mưa lội nước, thân giày vải check", "Burberry Footwear"),
        ("Áo Choàng Wool Reversible Check Poncho Cape", "burberry-reversible-wool-cape", 2, 36000000, 41000000, "Len lông cừu nguyên chất dệt hai mặt, viền tua rua cổ điển", "Burberry Ready-to-Wear"),
        ("Thắt Lưng Da TB Monogram Plaque Leather Belt", "burberry-tb-monogram-belt", 3, 12500000, 14000000, "Da bê trơn mịn, mặt khóa chữ TB mạ bóng phong cách hiện đại", "Burberry Accessories"),
        ("Áo Sơ Mi Kẻ Vintage Check Cotton Twill Shirt", "burberry-check-cotton-shirt", 2, 17500000, 19500000, "Vải dệt cotton twill thoáng mát in họa tiết kẻ ô Burberry kinh điển", "Burberry Shirts"),
        ("Nước Hoa Burberry Hero Eau de Parfum 100ml", "burberry-hero-eau-de-parfum", 3, 3650000, 4100000, "Hương gỗ tuyết tùng ba vùng núi lửa, tiêu đen và trầm hương", "Burberry Fragrance")
    ]),
    ("saintlaurent", "Saint Laurent", "Pháp", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Túi Xách LouLou Medium Quilted Leather Bag", "saintlaurent-loulou-medium-bag", 3, 78000000, 86000000, "Da bê thuộc mềm mịn may chần chữ Y, logo YSL kim loại bạc", "YSL LouLou Icons"),
        ("Ví Xích Cầm Tay Kate Chain Wallet Tassel", "saintlaurent-kate-chain-wallet", 3, 48000000, 53000000, "Da hạt sần Grain de Poudre bền bỉ, tua rua kim loại lắc kê vàng", "YSL Kate"),
        ("Áo Khoác Da Classic Biker Motorcycle Jacket", "saintlaurent-classic-biker-jacket", 2, 125000000, 140000000, "Da cừu non Ý bóng nhẹ, phéc-mơ-tuy bất đối xứng phong cách rock", "Saint Laurent Permanent"),
        ("Giày Cao Gót Tribute 105 Stiletto Platform Sandals", "saintlaurent-tribute-heeled-sandals", 1, 27500000, 31000000, "Dây da đan chéo vắt chân duyên dáng, đế đúp tôn dáng tối đa", "YSL Tribute Footwear"),
        ("Giày Sneaker Court Classic SL/06 Embroidered", "saintlaurent-court-classic-sneaker", 1, 18500000, 21000000, "Da bê trắng Ý thêu chỉ Saint Laurent phong cách vintage lãng tử", "YSL Court Classic"),
        ("Thắt Lưng Da Monogram Narrow Square Buckle", "saintlaurent-monogram-narrow-belt", 3, 11500000, 13000000, "Da bò dập vân tự nhiên, vòng khuyên luồn đính logo YSL nhỏ", "YSL Belts"),
        ("Kính Mát Dày SL 557 Shade Oversized Sunglasses", "saintlaurent-sl557-sunglasses", 3, 10500000, 12000000, "Gọng đúc vuông đen bóng cá tính, bản lề chạm khắc Saint Laurent", "YSL Eyewear"),
        ("Nước Hoa Black Opium Eau de Parfum Extreme 90ml", "saintlaurent-black-opium-parfum", 3, 3950000, 4500000, "Hương cà phê đen quyến rũ, vani Bourbon và hoa nhài trắng", "YSL Beaute")
    ]),
    ("fendi", "Fendi", "Ý", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Xách Baguette Medium Leather FF Monogram", "fendi-baguette-medium-ff-bag", 3, 85000000, 93000000, "Da cừu nappa mềm dập nổi họa tiết FF, khóa móc gập FF kinh điển", "Fendi Baguette 1997"),
        ("Túi Xách Peekaboo ISeeU Medium Calfskin", "fendi-peekaboo-iseeu-handbag", 3, 135000000, 150000000, "Da bê Cuoio Romano thủ công hai ngăn riêng biệt, khóa xoay", "Fendi Peekaboo"),
        ("Giày Slingback Colibrì Lite Mesh & Technical Ribbon", "fendi-colibri-slingback-pumps", 1, 26500000, 29500000, "Chất lưới dệt trong suốt in FF monogram, quai hậu đệm thể thao", "Fendi Colibrì"),
        ("Áo Len Dệt Kim FF Jacquard Wool & Cashmere", "fendi-ff-jacquard-wool-sweater", 2, 34000000, 38000000, "Sợi len lông cừu pha cashmere cao cấp dệt hoa văn FF hai tông màu", "Fendi Ready-to-Wear"),
        ("Thắt Lưng Da FF Buckle Reversible Calf Leather", "fendi-ff-buckle-leather-belt", 3, 14500000, 16500000, "Da bê đen/nâu hai mặt, mặt khóa chữ FF mạ bóng sang trọng", "Fendi Accessories"),
        ("Giày Sneaker Fendi Match Suede & Leather Low-Top", "fendi-match-suede-sneaker", 1, 24500000, 27500000, "Da lộn phối da trơn phong cách bóng rổ cổ điển, logo FF bọc da", "Fendi Footwear"),
        ("Kính Mát Chữ Nhật FF Diamonds Square Frame", "fendi-diamonds-square-sunglasses", 3, 11500000, 13000000, "Gọng kim loại thanh mảnh chạm họa tiết kim cương và logo FF", "Fendi Eyewear"),
        ("Túi Tote Sunshine Medium FF Jacquard Canvas", "fendi-sunshine-shopper-tote", 3, 72000000, 80000000, "Vải Canvas dệt FF, tay cầm bằng kính Plexiglas đồi mồi sang trọng", "Fendi Sunshine")
    ]),
    ("bottegaveneta", "Bottega Veneta", "Ý", 3, "Quần & Phụ Kiện Thời Trang", [
        ("Túi Cầm Tay The Pouch Soft Gathered Calfskin", "bottegaveneta-the-pouch-clutch", 3, 78000000, 86000000, "Da bê non nếp gấp mềm mại như mây, khung nam châm ẩn", "Bottega The Pouch"),
        ("Túi Xách Jodie Mini Knotted Intrecciato Leather", "bottegaveneta-jodie-mini-hobo", 3, 62000000, 69000000, "Da cừu nappa đan Intrecciato thủ công, tay cầm thắt nút đặc trưng", "Bottega Jodie"),
        ("Túi Đeo Chéo Cassette Padded Crossbody Bag", "bottegaveneta-cassette-padded-bag", 3, 85000000, 95000000, "Kỹ thuật đan da bản lớn dập phồng chần bông hai mặt", "Bottega Cassette"),
        ("Giày Bốt Tire Lug-Sole Chelsea Ankle Boots", "bottegaveneta-tire-chelsea-boots", 1, 35000000, 39000000, "Da bê sáp dày dặn, đế cao su uốn lượn phong cách viễn tưởng", "Bottega Tire Footwear"),
        ("Ví Gập Dài Intrecciato Weave Leather Wallet", "bottegaveneta-intrecciato-wallet", 3, 22500000, 25500000, "Da cừu đan tay truyền thống vùng Veneto, 12 ngăn thẻ rộng rãi", "Bottega Small Leather"),
        ("Dép Cao Gót Stretch Square-Toe Heeled Sandals", "bottegaveneta-stretch-heeled-sandals", 1, 26000000, 29000000, "Mũi vuông cá tính quai mảnh, đế cao su đệm chống trượt", "Bottega Stretch"),
        ("Giày Bốt Flash Chunky Sole Leather Boots", "bottegaveneta-flash-sole-boots", 1, 38000000, 42000000, "Đế đúc màu dạ quang tương phản nổi bật, da trơn kháng nước", "Bottega Flash"),
        ("Kính Mát Mắt Mèo Cat-Eye Acetate Sunglasses", "bottegaveneta-cat-eye-sunglasses", 3, 11500000, 13000000, "Gọng kính vuốt nhọn đính chi tiết ruy băng kim loại vàng ở bản lề", "Bottega Eyewear")
    ]),
    ("offwhite", "Off-White", "Ý / Mỹ", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Túi Xách Jitney 2.8 Top Handle Leather Bag", "offwhite-jitney-28-top-handle", 3, 38000000, 43000000, "Da bê trơn in chữ typography, khóa kim loại mũi tên xoay", "Off-White Jitney"),
        ("Giày Sneaker Out Of Office (OOO) Low-Top", "offwhite-out-of-office-sneaker", 1, 16500000, 18500000, "Da bê Ý phối mảng màu tương phản, tag zip-tie da cá tính", "Off-White OOO Footwear"),
        ("Thắt Lưng Dây Bản Industrial Yellow Logo Belt", "offwhite-industrial-yellow-belt", 3, 8500000, 9800000, "Dây dệt công nghiệp 200cm màu vàng neon thêu chữ Off-White", "Off-White Industrial"),
        ("Áo Nỉ Có Mũ Caravaggio Arrows Graphic Hoodie", "offwhite-caravaggio-arrows-hoodie", 2, 17500000, 19500000, "Nỉ bông cotton dày 450gsm, in tranh danh họa Caravaggio và mũi tên", "Off-White Caravaggio"),
        ("Giày Sneaker Low Vulcanized Canvas Sneaker", "offwhite-vulcanized-canvas-sneaker", 1, 9500000, 11000000, "Vải canvas bền chắc, họa tiết kẻ sọc Diag sọc chéo thân giày", "Off-White Vulcanized"),
        ("Túi Đeo Chéo Diag Flap Crossbody Leather Bag", "offwhite-diag-flap-crossbody", 3, 28500000, 32000000, "Da bê dập họa tiết sọc chéo phản quang, quai đeo vải công nghiệp", "Off-White Diag Icons"),
        ("Ví Da Gập Quote Typography Bifold Leather Wallet", "offwhite-typography-leather-wallet", 3, 8900000, 10500000, "Da bê đen in chữ 'WALLET' trong dấu ngoặc kép phong cách Virgil", "Off-White Accessories"),
        ("Kính Mát Khung Vuông Arthur Acetate Sunglasses", "offwhite-arthur-acetate-sunglasses", 3, 9800000, 11200000, "Gọng acetate dày đính họa tiết logo kim loại cắt laser chìm", "Off-White Eyewear")
    ]),
    ("puma", "Puma", "Đức", 1, "Giày Sneaker & Thể Thao", [
        ("Giày Sneaker Puma Suede Classic XXI Low", "puma-suede-classic-xxi", 1, 2190000, 2500000, "Da lộn cao cấp êm ái, dải Formstrip viền da trắng cổ điển", "Puma Suede Heritage"),
        ("Giày Thể Thao Puma Speedcat OG Motorsport", "puma-speedcat-og-motorsport", 1, 2890000, 3300000, "Thiết kế giày đua xe F1 da lộn ôm chân siêu nhẹ", "Puma Motorsport"),
        ("Giày Sneaker Puma Palermo Leather Terrace", "puma-palermo-leather-terrace", 1, 2690000, 3100000, "Da trơn phối da lộn phong cách khán đài bóng đá Ý 1980", "Puma Terrace Collection"),
        ("Áo Khoác Thể Thao Puma T7 Track Jacket Heritage", "puma-t7-track-jacket-heritage", 2, 1950000, 2300000, "Dải sọc 7cm đặc trưng trên vai áo, chất thun co giãn thể thao", "Puma T7 Heritage"),
        ("Giày Chạy Bộ Puma Velocity Nitro 3 Running", "puma-velocity-nitro-3-running", 1, 3890000, 4400000, "Bọt đệm khí Nitơ NITROFOAM phản hồi lực cực nhạy", "Puma Running Performance"),
        ("Giày Sneaker Puma x Fenty Creeper Phatty By Rihanna", "puma-fenty-creeper-phatty", 1, 3950000, 4500000, "Đế kếp dày chunky đệm nhung da lộn thời trang đỉnh cao", "Puma x Fenty by Rihanna"),
        ("Balo Thời Trang Puma Core Heritage Backpack", "puma-core-heritage-backpack", 3, 790000, 950000, "Vải dệt chống bám bụi, ngăn đệm laptop 15.6 inch chống sốc", "Puma Accessories"),
        ("Áo Nỉ Có Mũ Puma Classics Relaxed Hoodie", "puma-classics-relaxed-hoodie", 2, 1690000, 1990000, "Chất nỉ bông mềm mại 100% bông bền vững Better Cotton", "Puma Classics")
    ]),
    ("zara", "Zara", "Tây Ban Nha", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Áo Blazer Nữ Tailored Double-Breasted Wool Blend", "zara-tailored-double-breasted-blazer", 2, 2690000, 3100000, "Vải len pha cao cấp đứng form, hai hàng khuy kim loại sang trọng", "Zara Woman Tailoring"),
        ("Áo Len Dệt Kim Cổ Cao Minimalist Ribbed Knit", "zara-minimalist-ribbed-knit-sweater", 2, 1290000, 1590000, "Sợi len dệt gân mềm mại ôm dáng, giữ nhiệt mùa đông tối ưu", "Zara Knitwear"),
        ("Quần Tây Ống Rộng Xếp Ly Wide-Leg Pleated Trousers", "zara-wide-leg-pleated-trousers", 2, 1490000, 1790000, "Cạp cao xếp ly đôi tôn dáng, chất vải rũ nhẹ nhàng thanh lịch", "Zara Woman Studio"),
        ("Áo Măng Tô Da Faux Leather Oversized Trench Coat", "zara-faux-leather-oversized-trench", 2, 3290000, 3800000, "Da nhân tạo mềm mịn chống gió, kèm thắt lưng buộc eo cá tính", "Zara Outerwear"),
        ("Bốt Da Mũi Nhọn Pointed Toe Kitten Heel Boots", "zara-pointed-toe-kitten-boots", 1, 2190000, 2590000, "Da thật mềm ôm bắp chân, gót mảnh 5cm thoải mái di chuyển", "Zara Footwear"),
        ("Túi Xách Da Đeo Chéo Textured Leather City Bag", "zara-textured-leather-city-bag", 3, 1990000, 2390000, "Da bò dập vân tự nhiên, nhiều ngăn đựng đồ tiện dụng văn phòng", "Zara Leather Bags"),
        ("Áo Sơ Mi Poplin Cotton Dáng Rộng Basic Relaxed", "zara-basic-relaxed-poplin-shirt", 2, 990000, 1190000, "100% Cotton Poplin cao cấp thấm hút tốt, cúc vỏ ốc tinh xảo", "Zara Essentials"),
        ("Bộ Jumpsuit Linen Pha Đai Eo Belted Jumpsuit", "zara-belted-linen-blend-jumpsuit", 2, 1890000, 2290000, "Vải đũi Linen thoáng khí mùa hè, đai thắt tạo điểm nhấn eo", "Zara Summer Edition")
    ]),
    ("uniqlo", "Uniqlo", "Nhật Bản", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Áo Phao Lông Vũ Siêu Nhẹ Ultra Light Down Jacket", "uniqlo-ultra-light-down-jacket", 2, 1790000, 1990000, "Lông vũ 750+ fill power siêu ấm, có thể gấp gọn trong túi nhỏ", "Uniqlo LifeWear Icon"),
        ("Áo Phông Cổ Tròn AIRism Cotton Oversized Tee", "uniqlo-airism-cotton-oversize-tee", 2, 390000, 490000, "Công nghệ AIRism mát lạnh mặt trong, mặt ngoài cotton dệt mịn", "Uniqlo AIRism Series"),
        ("Áo Cardigan Len Lông Cừu Extra Fine Merino Wool", "uniqlo-extra-fine-merino-cardigan", 2, 990000, 1190000, "100% Len Merino 19.5 micron có thể giặt máy mà không xơ rối", "Uniqlo Merino Wool"),
        ("Quần Dài Co Giãn 2 Chiều Smart Ankle Pants", "uniqlo-smart-stretch-ankle-pants", 2, 790000, 990000, "Vải chống nhăn co giãn nhẹ, chiều dài chạm mắt cá chuẩn công sở", "Uniqlo Smart Pants"),
        ("Áo Khoác Parka Liền Mũ Seamless Down Parka", "uniqlo-seamless-down-hooded-parka", 2, 2990000, 3400000, "Thiết kế không đường may chống gió lùa và chống thấm nước mưa", "Uniqlo Seamless Down"),
        ("Áo Len Cổ Tròn Dệt Kim Premium Lambswool", "uniqlo-premium-lambswool-sweater", 2, 790000, 950000, "100% Len cừu non cao cấp từ trang trại đạt chuẩn nhân đạo", "Uniqlo Knitwear"),
        ("Túi Đeo Chéo Bán Nguyệt Round Mini Shoulder Bag", "uniqlo-round-mini-shoulder-bag", 3, 390000, 490000, "Thiết kế bán nguyệt chứa đồ thần kỳ chống nước nhẹ nhẹ tênh", "Uniqlo Accessories"),
        ("Áo Thể Thao Dry-EX Thoát Ẩm Nhanh Functional Tee", "uniqlo-dry-ex-functional-tee", 2, 390000, 490000, "Sợi microfiber thoát mồ hôi siêu tốc được các VĐV tin dùng", "Uniqlo DRY-EX Sport")
    ]),
    ("calvinklein", "Calvin Klein", "Mỹ", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Set Áo Lót Bralette Không Gọng Modern Cotton", "calvinklein-modern-cotton-bralette", 2, 1450000, 1690000, "Chất cotton modal siêu co giãn thoáng mát, đai chun logo CK", "CK Modern Cotton"),
        ("Quần Jeans Ống Suông 90s Straight Fit Selvedge", "calvinklein-90s-straight-denim-jeans", 2, 3850000, 4400000, "Denim cotton nguyên bản dệt biên phong cách thập niên 90", "CK Jeans Heritage"),
        ("Áo Phông Monogram Logo Crewneck Tee Cotton", "calvinklein-monogram-logo-tee", 2, 1250000, 1490000, "100% Cotton hữu cơ mềm mại in logo cK Monogram ngực áo", "CK Monogram Tees"),
        ("Áo Khoác Bò Lót Lông Cừu Denim Trucker Sherpa Jacket", "calvinklein-trucker-sherpa-jacket", 2, 4950000, 5600000, "Vải denim wash dày dặn lót bông Sherpa ấm áp mùa đông", "CK Outerwear"),
        ("Hộp 3 Quần Lót Nam Low-Rise Trunk Microfiber", "calvinklein-low-rise-trunk-3pack", 2, 1650000, 1950000, "Sợi Microfiber mát lạnh co giãn 4 chiều kháng khuẩn tối ưu", "CK Underwear Pack"),
        ("Thắt Lưng Da Nam Reversible Leather Plaque Belt", "calvinklein-reversible-leather-belt", 3, 1850000, 2190000, "Da bò trơn 2 mặt đen và nâu, mặt khóa hợp kim xoay tiện lợi", "CK Leather Goods"),
        ("Nước Hoa CK One Unisex Eau de Toilette 100ml", "calvinklein-ck-one-eau-de-toilette", 3, 1950000, 2250000, "Hương thơm cam chanh trà xanh phóng khoáng tươi mát", "CK Fragrances"),
        ("Túi Đeo Chéo Minimalist Faux Leather Camera Bag", "calvinklein-minimalist-camera-bag", 3, 2450000, 2890000, "Da thuần chay dập vân nhẹ, khóa kéo chắc chắn in nổi logo", "CK Bags & Travel")
    ]),
    ("tommyhilfiger", "Tommy Hilfiger", "Mỹ", 2, "Thời Trang Streetwear & Áo Khoác", [
        ("Áo Sơ Mi Nam Classic Oxford Button-Down Shirt", "tommyhilfiger-classic-oxford-shirt", 2, 2450000, 2850000, "Chất vải dệt Oxford cotton cao cấp thêu cờ Tommy nhỏ ở ngực", "Tommy Classic Oxford"),
        ("Áo Gió Du Thuyền Colorblock Windbreaker Yacht Jacket", "tommyhilfiger-colorblock-windbreaker", 2, 3850000, 4400000, "Phối 3 màu cờ Xanh - Trắng - Đỏ biểu tượng thương hiệu Mỹ", "Tommy Yacht Club"),
        ("Áo Len Vặn Thừng Heritage Flag Cable Knit Sweater", "tommyhilfiger-heritage-flag-sweater", 2, 3250000, 3750000, "Len pha cotton dệt vặn thừng dày dặn giữ ấm phong cách preppy", "Tommy Heritage Knit"),
        ("Quần Kaki Nam Essential Straight Fit Chino Pants", "tommyhilfiger-straight-fit-chino", 2, 2250000, 2600000, "Vải twill co giãn nhẹ bền bỉ, đường cắt may ống đứng chuẩn mực", "Tommy Chino Pants"),
        ("Giày Sneaker Da Nam Retro Flag Low-Top Leather", "tommyhilfiger-retro-flag-leather-sneaker", 1, 2950000, 3400000, "Da bò trắng trơn viền sọc cờ Tommy bên hông, đế cao su êm ái", "Tommy Footwear"),
        ("Áo Khoác Bóng Chày Varsity Wool Blend Bomber", "tommyhilfiger-varsity-wool-bomber", 2, 5950000, 6800000, "Thân áo len dạ pha da, thêu logo chữ TH phong cách học đường Mỹ", "Tommy Varsity"),
        ("Ví Da Gập Nam Global Stripe Leather Billfold Wallet", "tommyhilfiger-global-stripe-wallet", 3, 1650000, 1950000, "Da bò cao cấp dập viền sọc cờ nhỏ, 8 ngăn cắm thẻ sang trọng", "Tommy Accessories"),
        ("Nước Hoa Tommy Girl & Boy Eau de Cologne 100ml", "tommyhilfiger-cologne-spray", 3, 1850000, 2150000, "Hương hoa quả tươi mát ngập tràn năng lượng tuổi trẻ nước Mỹ", "Tommy Fragrance")
    ])
]

print(f"[*] Đã nạp thành công cấu hình {len(BRANDS_DATA)} thương hiệu với 8 sản phẩm cao cấp mỗi hãng (tổng 160 sản phẩm).")
