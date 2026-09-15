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

-- 8. Insert Sample Orders
INSERT OR IGNORE INTO Orders (id, order_code, user_id, customer_name, customer_phone, shipping_address, note, subtotal, discount, shipping_fee, total_amount, status, payment_status, created_at) VALUES
(1, 'DMF-2026-9001', 2, 'Nguyễn Đức Mạnh', '0977777777', '18 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội', 'Giao giờ hành chính, gọi trước 15 phút', 24500000, 0, 50000, 24550000, 'COMPLETED', 'PAID', '2026-09-10 09:30:00'),
(2, 'DMF-2026-9002', 2, 'Trần Minh Hoàng', '0912345678', 'Landmark 81, 720A Điện Biên Phủ, Bình Thạnh, TP.HCM', 'Hàng giá trị cao, bọc bubble bọc xốp cẩn thận', 5600000, 500000, 0, 5100000, 'SHIPPING', 'PAID', '2026-09-12 14:15:00'),
(3, 'DMF-2026-9003', 2, 'Lê Thu Thảo', '0987654321', 'Số 45 Tràng Tiền, Hoàn Kiếm, Hà Nội', 'Hỏa tốc trong chiều nay', 18900000, 1000000, 30000, 17930000, 'CONFIRMED', 'PAID', '2026-09-14 10:00:00'),
(4, 'DMF-2026-9004', 2, 'Đỗ Khắc Nam', '0933445566', 'Khu Đô Thị Sala, TP Thủ Đức, TP.HCM', 'Giao thứ 7 hoặc chủ nhật', 32000000, 0, 0, 32000000, 'PENDING', 'UNPAID', '2026-09-15 08:20:00');

-- 9. Insert Order Items
INSERT OR IGNORE INTO Order_Items (order_id, variant_id, product_name, size, color, price, quantity, subtotal) VALUES
(1, 1, 'Balenciaga Track 4.0 Multi-Layered Sneaker', '40', 'White/Orange', 24500000, 1, 24500000),
(2, 4, 'Adidas Samba Classic OG White Black', '40', 'White/Black', 2800000, 2, 5600000),
(3, 7, 'Gucci Ace Embroidered Sneaker Replica Authentic', '40', 'White/Green/Red', 18900000, 1, 18900000),
(4, 9, 'Balenciaga Oversized Distressed Denim Jacket', 'L', 'Vintage Wash Blue', 32000000, 1, 32000000);

-- 10. Insert Order Payments
INSERT OR IGNORE INTO Payments (order_id, payment_method, transaction_id, amount, status, paid_at) VALUES
(1, 'ONLINE', 'PAY-DMF-9001-VN', 24550000, 'PAID', '2026-09-10 09:35:00'),
(2, 'BANK_TRANSFER', 'PAY-DMF-9002-VN', 5100000, 'PAID', '2026-09-12 14:20:00'),
(3, 'ONLINE', 'PAY-DMF-9003-VN', 17930000, 'PAID', '2026-09-14 10:05:00'),
(4, 'COD', 'PAY-DMF-9004-VN', 32000000, 'PENDING', NULL);

-- 11. Insert Shop Profile
INSERT OR IGNORE INTO Shops (id, seller_id, shop_name, slug, logo_url, banner_url, bio, warehouse_address, phone, email, rating, is_vacation_mode) VALUES
(1, 1, 'Aethelgard Luxury Studio', 'aethelgard-luxury', 'img/fashion mood board.jpg', 'img/fashion mood board.jpg', 'Nhà mốt phân phối thời trang xa xỉ, Haute Couture & Streetwear phiên bản giới hạn chính hãng.', 'Tầng 18, Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội', '0988888888', 'contact@aethelgard.vn', 4.95, 0);

-- 12. Insert Shipping Channels
INSERT OR IGNORE INTO Shipping_Channels (id, name, code, is_enabled, cost, estimated_days) VALUES
(1, 'Hỏa Tốc Cao Cấp (Aethelgard Express)', 'EXPRESS', 1, 50000, '2 - 4 giờ'),
(2, 'Giao Hàng Nhanh (GHN Luxury)', 'GHN', 1, 32000, '1 - 2 ngày'),
(3, 'Viettel Post Đồng Giá Toàn Quốc', 'VTP', 1, 28000, '2 - 3 ngày'),
(4, 'J&T Express Tiết Kiệm', 'JT', 0, 22000, '3 - 4 ngày');

-- 13. Insert Promotions / Vouchers
INSERT OR IGNORE INTO Promotions (id, shop_id, voucher_code, title, discount_type, discount_value, min_order_value, usage_limit, used_count, start_date, end_date, is_active) VALUES
(1, 1, 'AETHEL10', 'Ưu đãi 10% Bộ sưu tập Sneaker & Áo khoác Hè', 'PERCENT', 10, 2000000, 200, 42, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1),
(2, 1, 'LUXURY500K', 'Giảm 500.000đ cho đơn hàng xa xỉ từ 10.000.000đ', 'FIXED', 500000, 10000000, 50, 18, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1),
(3, 1, 'FREESHIP', 'Miễn phí vận chuyển toàn quốc cho đơn từ 1.500.000đ', 'FIXED', 50000, 1500000, 500, 129, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1),
(4, 1, 'VIPMEMBER', 'Đặc quyền thành viên VIP giảm 15%', 'PERCENT', 15, 5000000, 100, 31, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1);

-- 14. Insert Seller Wallet
INSERT OR IGNORE INTO Seller_Wallets (id, seller_id, available_balance, pending_balance, bank_name, bank_account_number, bank_account_name) VALUES
(1, 1, 148500000, 32600000, 'Techcombank - TMCP Kỹ Thương Việt Nam', '19036888999018', 'NGUYEN DUC MANH');

-- 15. Insert Wallet Transactions
INSERT OR IGNORE INTO Wallet_Transactions (id, wallet_id, type, amount, note, status, created_at) VALUES
(1, 1, 'SETTLEMENT', 24550000, 'Thanh toán đối soát đơn hàng DMF-2026-9001', 'COMPLETED', '2026-09-10 10:00:00'),
(2, 1, 'WITHDRAW', 20000000, 'Rút tiền về STK Techcombank 19036888999018', 'COMPLETED', '2026-09-11 15:30:00'),
(3, 1, 'SETTLEMENT', 5100000, 'Thanh toán đối soát đơn hàng DMF-2026-9002', 'COMPLETED', '2026-09-12 15:00:00'),
(4, 1, 'SETTLEMENT', 17930000, 'Thanh toán đối soát đơn hàng DMF-2026-9003', 'COMPLETED', '2026-09-14 11:30:00');

-- 16. Insert Product Reviews
INSERT OR IGNORE INTO Product_Reviews (id, product_id, order_id, user_id, customer_name, rating, comment, seller_reply, reply_at, created_at) VALUES
(1, 1, 1, 2, 'Hoàng Long Luxury', 5, 'Đôi Balenciaga Track 4.0 chuẩn authentic từng chi tiết, form dáng góc cạnh hầm hố cực kỳ thời thượng. Đóng gói hộp đôi 2 lớp rất chu đáo!', 'Aethelgard chân thành cảm ơn anh Hoàng Long! Rất vinh hạnh được phục vụ phong cách của anh!', '2026-09-10 11:00:00', '2026-09-10 10:30:00'),
(2, 2, 2, 2, 'Minh Thảo Sneakerhead', 5, 'Samba OG phối màu trắng đen huyền thoại, đế gum bám sàn tốt, da mịn xịn. Shop giao hàng hỏa tốc trong 2h quá đỉnh.', 'Cảm ơn bạn Minh Thảo đã ủng hộ Aethelgard Studio! Chúc bạn có những outfit dạo phố thật ưng ý ạ!', '2026-09-12 16:00:00', '2026-09-12 15:45:00'),
(3, 6, 4, 2, 'Trần Đăng Khoa', 5, 'Balenciaga Distressed Denim Jacket wash màu quá đỉnh, form rộng chuẩn runway. Xứng đáng từng đồng bỏ ra.', NULL, NULL, '2026-09-15 09:00:00'),
(4, 4, 3, 2, 'Phạm Quỳnh Nga', 4, 'Giày Gucci thêu ong rất đẹp, tuy nhiên đợt này đơn vị vận chuyển giao muộn 1 hôm so với dự kiến. Shop hỗ trợ nhiệt tình.', 'Aethelgard xin lỗi bạn Quỳnh Nga về sự cố từ phía đối tác vận chuyển ạ. Shop đã tặng bạn voucher FREESHIP cho lần mua tiếp theo nhé!', '2026-09-14 14:00:00', '2026-09-14 12:00:00');
