-- ============================================================================
-- SEED DATA: DM FASHION MALL
-- ============================================================================

-- 1. Insert Sample Users (pass: 123456 -> hashed)
-- bcrypt hash of '123456' is '$2b$10$wE99qWn5m9qG4eJ4Vb2dxe7V0pDk4iC1yU9wWpX0qB1j9l3vA1/2m' (or standard test hash)
INSERT OR IGNORE INTO Users (id, full_name, email, password, phone, address, role) VALUES
(1, 'Admin DM Fashion', 'admin@dmfashionmall.vn', '$2b$10$wK1V.X.tN.K1xX.wK1V.X.tN.K1xX.wK1V.X.tN.K1xX.wK1V.X.', '0988888888', 'Hà Nội, Việt Nam', 'ADMIN'),
(2, 'Nguyễn Đức Mạnh', 'ducmanh@gmail.com', '$2b$10$wK1V.X.tN.K1xX.wK1V.X.tN.K1xX.wK1V.X.tN.K1xX.wK1V.X.', '0977777777', 'Thanh Xuân, Hà Nội', 'CUSTOMER');

-- 2. Insert Categories
INSERT OR IGNORE INTO Categories (id, name, slug, description) VALUES
(1, 'Giày Sneaker', 'giay-sneaker', 'Các dòng giày thể thao và sneaker cao cấp'),
(2, 'Áo Khoác & Hoodie', 'ao-khoac-hoodie', 'Áo khoác bomber, hoodie, zip jacket'),
(3, 'Quần & Jeans', 'quan-jeans', 'Quần denim, quần cargo, quần nỉ'),
(4, 'Phụ Kiện Thời Trang', 'phu-kien', 'Túi xách, mũ, thắt lưng, kính mắt');

-- 3. Insert Brands
INSERT OR IGNORE INTO Brands (id, name, slug, logo_url, description) VALUES
(1, 'Nike', 'nike', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', 'Just Do It - Thương hiệu thể thao số 1 thế giới'),
(2, 'Adidas', 'adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', 'Thương hiệu thời trang đường phố biểu tượng 3 sọc'),
(3, 'Balenciaga', 'balenciaga', 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Balenciaga_logo.svg', 'Nhà mốt haute couture phong cách đường phố tương lai'),
(4, 'Gucci', 'gucci', 'https://upload.wikimedia.org/wikipedia/commons/7/79/1990s_Gucci_logo.svg', 'Thương hiệu thời trang xa xỉ hàng đầu từ Ý'),
(5, 'Puma', 'puma', 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_complete_logo.svg', 'Forever Faster - Giày và trang phục thể thao năng động');

-- 4. Insert Products
INSERT OR IGNORE INTO Products (id, seller_id, category_id, brand_id, name, slug, description, base_price, rating, is_featured, status) VALUES
(1, 1, 1, 3, 'Balenciaga Track 4.0 Multi-Layered Sneaker', 'balenciaga-track-4-0', 'Thiết kế hầm hố phá cách, kết hợp 176 mảnh ghép đa chất liệu mesh và cao su cao cấp.', 24500000, 4.9, 1, 'ACTIVE'),
(2, 1, 1, 2, 'Adidas Samba Classic OG White Black', 'adidas-samba-classic-og', 'Mẫu giày biểu tượng retro trường tồn, da mềm cao cấp kết hợp đế gum chống trơn trượt.', 2800000, 4.8, 1, 'ACTIVE'),
(3, 1, 1, 1, 'Nike Air Zoom Pegasus 40 Summer Collection', 'nike-air-zoom-pegasus-40', 'Đệm khí Zoom Air kép êm ái, bứt phá mọi cung đường và phong cách năng động.', 3600000, 4.7, 1, 'ACTIVE'),
(4, 1, 1, 4, 'Gucci Ace Embroidered Sneaker Replica Authentic', 'gucci-ace-embroidered', 'Giày sneaker da bê thượng hạng đính họa tiết thêu ong vàng tinh xảo.', 18900000, 4.9, 1, 'ACTIVE'),
(5, 1, 2, 2, 'Adidas Sakura Zip-Up Embroidered Hoodie', 'adidas-sakura-zip-up-hoodie', 'Phiên bản giới hạn hoa anh đào thêu lưng, nỉ bông dày dặn ấm áp form rộng trendy.', 2200000, 4.6, 0, 'ACTIVE'),
(6, 1, 2, 3, 'Balenciaga Oversized Distressed Denim Jacket', 'balenciaga-oversized-distressed-jacket', 'Áo khoác bò rách phong cách Grunge thời thượng, wash màu cổ điển độc bản.', 32000000, 5.0, 1, 'ACTIVE'),
(7, 1, 1, 5, 'Puma Palermo Special Leather Sneakers', 'puma-palermo-special', 'Dòng giày thể thao đường phố phong cách Terraces từ thập niên 80 tái xuất.', 2300000, 4.5, 0, 'ACTIVE'),
(8, 1, 4, 4, 'Gucci GG Marmont Leather Belt with Shiny Buckle', 'gucci-gg-marmont-belt', 'Thắt lưng da nguyên tấm khóa cài logo hai chữ G mạ vàng cổ điển sang trọng.', 11500000, 4.9, 0, 'ACTIVE');

-- 5. Insert Product Variants
INSERT OR IGNORE INTO Product_Variants (id, product_id, sku, size, color, price, stock_quantity, image_url) VALUES
(1, 1, 'BAL-TRK-40-WHT', '40', 'White/Orange', 24500000, 15, 'img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg'),
(2, 1, 'BAL-TRK-41-WHT', '41', 'White/Orange', 24500000, 12, 'img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg'),
(3, 1, 'BAL-TRK-42-BLK', '42', 'Black/Green', 24500000, 8, 'img/#balanciagatrack#thug 🥷🏾🏿.jpg'),
(4, 2, 'ADI-SAM-40-WHT', '40', 'White/Black', 2800000, 50, 'img/addidas samba.jpg'),
(5, 2, 'ADI-SAM-41-WHT', '41', 'White/Black', 2800000, 45, 'img/addidas samba.jpg'),
(6, 3, 'NIK-PEG-41-BLU', '41', 'Ocean Blue', 3600000, 30, 'img/Nike men''s summer sneaker (men shoe collection for 2024).jpg'),
(7, 4, 'GUC-ACE-40-WHT', '40', 'White/Green/Red', 18900000, 10, 'img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg'),
(8, 5, 'ADI-SAK-L-PNK', 'L', 'Sakura Pink', 2200000, 25, 'img/Adidas sakura zip up hoodie.jpg'),
(9, 6, 'BAL-OVR-L-BLU', 'L', 'Vintage Wash Blue', 32000000, 5, 'img/Oversized ripped balenciaga jacket.jpg'),
(10, 7, 'PUM-PAL-41-BRN', '41', 'Caramel Gum', 2300000, 35, 'img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg');

-- 6. Insert Product Images
INSERT OR IGNORE INTO Product_Images (product_id, image_url, is_primary, display_order) VALUES
(1, 'img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg', 1, 1),
(2, 'img/addidas samba.jpg', 1, 1),
(3, 'img/Nike men''s summer sneaker (men shoe collection for 2024).jpg', 1, 1),
(4, 'img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg', 1, 1),
(5, 'img/Adidas sakura zip up hoodie.jpg', 1, 1),
(6, 'img/Oversized ripped balenciaga jacket.jpg', 1, 1),
(7, 'img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg', 1, 1);

-- 7. Insert Inventories
INSERT OR IGNORE INTO Inventories (product_id, quantity, reserved_quantity, low_stock_threshold, status) VALUES
(1, 35, 0, 5, 'IN_STOCK'),
(2, 95, 0, 10, 'IN_STOCK'),
(3, 30, 0, 5, 'IN_STOCK'),
(4, 10, 0, 3, 'IN_STOCK'),
(5, 25, 0, 5, 'IN_STOCK'),
(6, 5, 0, 2, 'LOW_STOCK'),
(7, 35, 0, 5, 'IN_STOCK'),
(8, 15, 0, 5, 'IN_STOCK');
