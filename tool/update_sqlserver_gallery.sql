SET NOCOUNT ON;
BEGIN TRANSACTION;
UPDATE Products SET 
            ImageUrl = '/img/adidas-samba.jpg',
            GalleryUrlsJson = N'["/img/adidas-samba.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 118
            WHERE Id = 1;
UPDATE Products SET 
            ImageUrl = '/img/adidas-sakura-hoodie.jpg',
            GalleryUrlsJson = N'["/img/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 244
            WHERE Id = 2;
UPDATE Products SET 
            ImageUrl = '/img/balenciaga-track-beige.jpg',
            GalleryUrlsJson = N'["/img/balenciaga-track-beige.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/1.jpg"]',
            Material = N'Vải dệt Denim Nhật Bản wash rách vintage & Da bê nứt Agneau distressed',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 247
            WHERE Id = 3;
UPDATE Products SET 
            ImageUrl = '/img/balenciaga-track-black.jpg',
            GalleryUrlsJson = N'["/img/balenciaga-track-black.jpg", "/img/products/adidas-samba.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/gucci-sneaker.jpg", "/img/home/2.jpg"]',
            Material = N'Vải dệt Denim Nhật Bản wash rách vintage & Da bê nứt Agneau distressed',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 163
            WHERE Id = 4;
UPDATE Products SET 
            ImageUrl = '/img/balenciaga-track-street.jpg',
            GalleryUrlsJson = N'["/img/balenciaga-track-street.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/3.jpg"]',
            Material = N'Vải dệt Denim Nhật Bản wash rách vintage & Da bê nứt Agneau distressed',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 276
            WHERE Id = 5;
UPDATE Products SET 
            ImageUrl = '/img/balenciaga-ripped-jacket.jpg',
            GalleryUrlsJson = N'["/img/balenciaga-ripped-jacket.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/home/4.jpg"]',
            Material = N'Vải dệt Denim Nhật Bản wash rách vintage & Da bê nứt Agneau distressed',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 59
            WHERE Id = 6;
UPDATE Products SET 
            ImageUrl = '/img/gucci-sneaker.jpg',
            GalleryUrlsJson = N'["/img/gucci-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 222
            WHERE Id = 7;
UPDATE Products SET 
            ImageUrl = '/img/gucci-runway.jpg',
            GalleryUrlsJson = N'["/img/gucci-runway.jpg", "/img/home/6.jpg", "/img/home/2.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 377
            WHERE Id = 8;
UPDATE Products SET 
            ImageUrl = '/img/puma-shoes-fall.jpg',
            GalleryUrlsJson = N'["/img/puma-shoes-fall.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 342
            WHERE Id = 9;
UPDATE Products SET 
            ImageUrl = '/img/nike-summer-sneaker.jpg',
            GalleryUrlsJson = N'["/img/nike-summer-sneaker.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 251
            WHERE Id = 10;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/lady-dior-medium-cannage.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/lady-dior-medium-cannage.jpg", "/img/products/gucci-runway.jpg", "/img/products/gucci-collection.jpg", "/img/home/2.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 179
            WHERE Id = 11;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-jackie-1961-mini.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-jackie-1961-mini.jpg", "/img/home/1.jpg", "/img/products/gucci-runway.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 200
            WHERE Id = 12;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", "/img/home/5.jpg", "/img/products/gucci-collection.jpg", "/img/home/4.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 74
            WHERE Id = 13;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-classic-flap-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-classic-flap-bag.jpg", "/img/home/4.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/home/3.jpg"]',
            Material = N'Da cừu non Lambskin chần bông Cannage biểu tượng, khóa CC mạ rutenium',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 332
            WHERE Id = 14;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-re-edition-2005-nylon.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-re-edition-2005-nylon.jpg", "/img/products/gucci-runway.jpg", "/img/home/5.jpg", "/img/home/4.jpg"]',
            Material = N'Vải sợi tái chế Re-Nylon độc quyền kết hợp da Saffiano vân chéo chống xước',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 119
            WHERE Id = 15;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-birkin-30-togo-gold.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", "/img/home/5.jpg", "/img/home/4.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 97
            WHERE Id = 16;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", "/img/home/1.jpg", "/img/home/3.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 146
            WHERE Id = 17;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", "/img/home/1.jpg", "/img/products/gucci-runway.jpg", "/img/home/5.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Canvas dệt logo FF Jacquard kinh điển & Da Cuoio Romano may viền thủ công',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 148
            WHERE Id = 18;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", "/img/home/2.jpg", "/img/home/6.jpg", "/img/products/fashion-mood-board.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 188
            WHERE Id = 19;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", "/img/home/6.jpg", "/img/home/3.jpg", "/img/products/gucci-collection.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 109
            WHERE Id = 20;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-jackie-1961-mini.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-jackie-1961-mini.jpg", "/img/home/1.jpg", "/img/products/gucci-runway.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 305
            WHERE Id = 21;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-dionysus-gg-supreme.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-dionysus-gg-supreme.jpg", "/img/products/gucci-collection.jpg", "/img/home/1.jpg", "/img/home/6.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 154
            WHERE Id = 22;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-ace-sneaker-web.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-ace-sneaker-web.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/adidas-samba.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 284
            WHERE Id = 23;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-jordaan-loafer.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-jordaan-loafer.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 117
            WHERE Id = 24;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-runway-monogram-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-runway-monogram-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 319
            WHERE Id = 25;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-double-g-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-double-g-belt.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/2.jpg", "/img/products/gucci-collection.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 234
            WHERE Id = 26;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-double-g-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-double-g-sunglasses.jpg", "/img/home/1.jpg", "/img/home/2.jpg", "/img/home/5.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 147
            WHERE Id = 27;
UPDATE Products SET 
            ImageUrl = '/img/brands/gucci/gucci-flora-silk-carre.jpg',
            GalleryUrlsJson = N'["/img/brands/gucci/gucci-flora-silk-carre.jpg", "/img/home/4.jpg", "/img/products/gucci-collection.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 136
            WHERE Id = 28;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/lady-dior-medium-cannage.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/lady-dior-medium-cannage.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/5.jpg", "/img/home/4.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 73
            WHERE Id = 29;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/dior-saddle-bag-black.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/dior-saddle-bag-black.jpg", "/img/products/gucci-runway.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/6.jpg", "/img/home/1.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 195
            WHERE Id = 30;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/dior-book-tote-oblique.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/dior-book-tote-oblique.jpg", "/img/products/gucci-runway.jpg", "/img/home/2.jpg", "/img/home/5.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 318
            WHERE Id = 31;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/dior-jadior-slingback-pump.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/dior-jadior-slingback-pump.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/adidas-samba.jpg", "/img/home/3.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 143
            WHERE Id = 32;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/dior-b27-low-top-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/dior-b27-low-top-sneaker.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/gucci-sneaker.jpg", "/img/home/4.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 111
            WHERE Id = 33;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/dior-bar-jacket-couture.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/dior-bar-jacket-couture.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 225
            WHERE Id = 34;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/gris-dior-perfume-privee.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/gris-dior-perfume-privee.jpg", "/img/home/6.jpg", "/img/home/2.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Len dạ Wool cao cấp & Canvas dệt Oblique thủ công tại Pháp, lót lụa tơ tằm',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 153
            WHERE Id = 35;
UPDATE Products SET 
            ImageUrl = '/img/brands/dior/dior-mitzah-silk-scarf.jpg',
            GalleryUrlsJson = N'["/img/brands/dior/dior-mitzah-silk-scarf.jpg", "/img/home/4.jpg", "/img/home/2.jpg", "/img/home/3.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 323
            WHERE Id = 36;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-samba-og-classic.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-samba-og-classic.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/adidas-samba.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 82
            WHERE Id = 37;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-gazelle-indoor-black.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-gazelle-indoor-black.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 117
            WHERE Id = 38;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-handball-spezial-pink.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-handball-spezial-pink.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/home/1.jpg"]',
            Material = N'Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 286
            WHERE Id = 39;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-ultraboost-light.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-ultraboost-light.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-street.jpg", "/img/home/2.jpg"]',
            Material = N'Da thật Full-Grain kết hợp da lộn T-toe, đế ngoài cao su tự nhiên Gum chống trơn',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 116
            WHERE Id = 40;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-beckenbauer-tracktop.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-beckenbauer-tracktop.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/products/sample-nextgen.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 304
            WHERE Id = 41;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-tiro23-training-pants.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-tiro23-training-pants.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 129
            WHERE Id = 42;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-trefoil-hoodie.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-trefoil-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 140
            WHERE Id = 43;
UPDATE Products SET 
            ImageUrl = '/img/brands/adidas/adidas-adicolor-backpack.jpg',
            GalleryUrlsJson = N'["/img/brands/adidas/adidas-adicolor-backpack.jpg", "/img/home/4.jpg", "/img/home/6.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 145
            WHERE Id = 44;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-speedy-bandouliere-25.jpg", "/img/products/gucci-collection.jpg", "/img/products/gucci-runway.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 191
            WHERE Id = 45;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-neverfull-mm-monogram.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-neverfull-mm-monogram.jpg", "/img/home/5.jpg", "/img/home/6.jpg", "/img/products/fashion-mood-board.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 154
            WHERE Id = 46;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-capucines-mm-taurillon.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-capucines-mm-taurillon.jpg", "/img/home/4.jpg", "/img/home/6.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 235
            WHERE Id = 47;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-trainer-sneaker-green.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-trainer-sneaker-green.jpg", "/img/products/adidas-samba.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-street.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 232
            WHERE Id = 48;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-run-away-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-run-away-sneaker.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 334
            WHERE Id = 49;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-monogram-windbreaker.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-monogram-windbreaker.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-velora.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 93
            WHERE Id = 50;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-initiales-40mm-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-initiales-40mm-belt.jpg", "/img/home/5.jpg", "/img/products/gucci-collection.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 352
            WHERE Id = 51;
UPDATE Products SET 
            ImageUrl = '/img/brands/louisvuitton/lv-zippy-wallet-empreinte.jpg',
            GalleryUrlsJson = N'["/img/brands/louisvuitton/lv-zippy-wallet-empreinte.jpg", "/img/home/5.jpg", "/img/home/3.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 305
            WHERE Id = 52;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-air-force-1-white.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-air-force-1-white.jpg", "/img/products/adidas-samba.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-street.jpg", "/img/home/6.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 236
            WHERE Id = 53;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-air-jordan-1-retro-chicago.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-air-jordan-1-retro-chicago.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 282
            WHERE Id = 54;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-dunk-low-retro-panda.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-dunk-low-retro-panda.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 108
            WHERE Id = 55;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-air-zoom-alphafly-next.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-air-zoom-alphafly-next.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 282
            WHERE Id = 56;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-tech-fleece-windrunner.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-tech-fleece-windrunner.jpg", "/img/products/sample-velora.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/1.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 363
            WHERE Id = 57;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-club-fleece-cargo-pants.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-club-fleece-cargo-pants.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/home/2.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 342
            WHERE Id = 58;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-windrunner-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-windrunner-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/3.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 345
            WHERE Id = 59;
UPDATE Products SET 
            ImageUrl = '/img/brands/nike/nike-heritage-crossbody-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/nike/nike-heritage-crossbody-bag.jpg", "/img/home/4.jpg", "/img/home/2.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Da bò mịn Nappa phối lưới thoát khí Mesh, đệm bọt Air-Sole đàn hồi trợ lực',
            CountryOfOrigin = N'Made in USA',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 72
            WHERE Id = 60;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-classic-flap-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-classic-flap-bag.jpg", "/img/home/5.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 99
            WHERE Id = 61;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-boy-quilted-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-boy-quilted-bag.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/4.jpg", "/img/home/1.jpg", "/img/home/6.jpg"]',
            Material = N'Da cừu non Lambskin chần bông Cannage biểu tượng, khóa CC mạ rutenium',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 144
            WHERE Id = 62;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-tweed-boucle-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-tweed-boucle-jacket.jpg", "/img/products/sample-velora.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 192
            WHERE Id = 63;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-coco-mademoiselle-perfume.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-coco-mademoiselle-perfume.jpg", "/img/home/1.jpg", "/img/home/5.jpg", "/img/products/fashion-mood-board.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'Da cừu non Lambskin chần bông Cannage biểu tượng, khóa CC mạ rutenium',
            CountryOfOrigin = N'Made in France',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 322
            WHERE Id = 64;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-two-tone-slingback.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-two-tone-slingback.jpg", "/img/products/adidas-samba.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 290
            WHERE Id = 65;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-j12-ceramic-watch.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-j12-ceramic-watch.jpg", "/img/home/5.jpg", "/img/home/2.jpg", "/img/home/3.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 350
            WHERE Id = 66;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-quilted-leather-wallet.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-quilted-leather-wallet.jpg", "/img/home/1.jpg", "/img/home/4.jpg", "/img/products/gucci-collection.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 236
            WHERE Id = 67;
UPDATE Products SET 
            ImageUrl = '/img/brands/chanel/chanel-camellia-silk-scarf.jpg',
            GalleryUrlsJson = N'["/img/brands/chanel/chanel-camellia-silk-scarf.jpg", "/img/home/2.jpg", "/img/products/fashion-mood-board.jpg", "/img/products/gucci-runway.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 172
            WHERE Id = 68;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-re-edition-2005-nylon.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-re-edition-2005-nylon.jpg", "/img/products/gucci-runway.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/3.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 314
            WHERE Id = 69;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-cleo-brushed-shoulder-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-cleo-brushed-shoulder-bag.jpg", "/img/home/2.jpg", "/img/home/4.jpg", "/img/products/gucci-collection.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 370
            WHERE Id = 70;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-monolith-combat-boots.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-monolith-combat-boots.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 325
            WHERE Id = 71;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-chocolate-brushed-loafers.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-chocolate-brushed-loafers.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 173
            WHERE Id = 72;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-re-nylon-cropped-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-re-nylon-cropped-jacket.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 245
            WHERE Id = 73;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-triangle-logo-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-triangle-logo-belt.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 198
            WHERE Id = 74;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-symbole-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-symbole-sunglasses.jpg", "/img/home/2.jpg", "/img/home/6.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/1.jpg"]',
            Material = N'Vải sợi tái chế Re-Nylon độc quyền kết hợp da Saffiano vân chéo chống xước',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 144
            WHERE Id = 75;
UPDATE Products SET 
            ImageUrl = '/img/brands/prada/prada-saffiano-card-holder.jpg',
            GalleryUrlsJson = N'["/img/brands/prada/prada-saffiano-card-holder.jpg", "/img/home/5.jpg", "/img/home/3.jpg", "/img/home/4.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 194
            WHERE Id = 76;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-le-city-medium-bag.jpg", "/img/products/gucci-collection.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/4.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 240
            WHERE Id = 77;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-triple-s-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-triple-s-sneaker.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/gucci-sneaker.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 357
            WHERE Id = 78;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-track-sneaker-noir.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-track-sneaker-noir.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 222
            WHERE Id = 79;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-oversized-denim-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-oversized-denim-jacket.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 199
            WHERE Id = 80;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-strike-combat-boots.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-strike-combat-boots.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 58
            WHERE Id = 81;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-hourglass-xs-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-hourglass-xs-bag.jpg", "/img/products/gucci-collection.jpg", "/img/products/gucci-runway.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 279
            WHERE Id = 82;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-bb-monogram-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-bb-monogram-belt.jpg", "/img/products/gucci-runway.jpg", "/img/products/gucci-collection.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 68
            WHERE Id = 83;
UPDATE Products SET 
            ImageUrl = '/img/brands/balenciaga/balenciaga-dynasty-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/balenciaga/balenciaga-dynasty-sunglasses.jpg", "/img/home/2.jpg", "/img/home/4.jpg", "/img/home/6.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 57
            WHERE Id = 84;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-birkin-30-togo-gold.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-birkin-30-togo-gold.jpg", "/img/home/5.jpg", "/img/home/3.jpg", "/img/home/1.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 178
            WHERE Id = 85;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-kelly-28-epsom-leather.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-kelly-28-epsom-leather.jpg", "/img/home/2.jpg", "/img/products/gucci-runway.jpg", "/img/home/1.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 155
            WHERE Id = 86;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-oran-flat-sandals.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-oran-flat-sandals.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 173
            WHERE Id = 87;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-constance-h-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-constance-h-belt.jpg", "/img/products/gucci-runway.jpg", "/img/products/gucci-collection.jpg", "/img/home/6.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 79
            WHERE Id = 88;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-silk-carre-scarf.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-silk-carre-scarf.jpg", "/img/home/3.jpg", "/img/products/gucci-collection.jpg", "/img/home/2.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 59
            WHERE Id = 89;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-calvi-card-case.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-calvi-card-case.jpg", "/img/home/5.jpg", "/img/home/4.jpg", "/img/home/3.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 310
            WHERE Id = 90;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-chaine-dancre-bracelet.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-chaine-dancre-bracelet.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/2.jpg", "/img/home/1.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 303
            WHERE Id = 91;
UPDATE Products SET 
            ImageUrl = '/img/brands/hermes/hermes-terre-d-hermes-parfum.jpg',
            GalleryUrlsJson = N'["/img/brands/hermes/hermes-terre-d-hermes-parfum.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/5.jpg", "/img/home/1.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 183
            WHERE Id = 92;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-la-medusa-handbag.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-la-medusa-handbag.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/home/4.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 289
            WHERE Id = 93;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-barocco-silk-shirt.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-barocco-silk-shirt.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 309
            WHERE Id = 94;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-chain-reaction-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-chain-reaction-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/adidas-samba.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 356
            WHERE Id = 95;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-medusa-biggie-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-medusa-biggie-sunglasses.jpg", "/img/home/2.jpg", "/img/home/3.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 87
            WHERE Id = 96;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-palazzo-leather-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-palazzo-leather-belt.jpg", "/img/home/3.jpg", "/img/products/gucci-collection.jpg", "/img/products/gucci-runway.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 213
            WHERE Id = 97;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-baroque-bathrobe.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-baroque-bathrobe.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 172
            WHERE Id = 98;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-dylan-blue-parfum.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-dylan-blue-parfum.jpg", "/img/home/4.jpg", "/img/products/gucci-runway.jpg", "/img/home/5.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 56
            WHERE Id = 99;
UPDATE Products SET 
            ImageUrl = '/img/brands/versace/versace-greca-track-pants.jpg',
            GalleryUrlsJson = N'["/img/brands/versace/versace-greca-track-pants.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 269
            WHERE Id = 100;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-kensington-trench-coat.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-kensington-trench-coat.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 215
            WHERE Id = 101;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-vintage-check-scarf.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-vintage-check-scarf.jpg", "/img/home/1.jpg", "/img/home/4.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 355
            WHERE Id = 102;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-lola-quilted-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-lola-quilted-bag.jpg", "/img/products/gucci-collection.jpg", "/img/home/5.jpg", "/img/home/6.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 97
            WHERE Id = 103;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-arthur-check-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-arthur-check-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/balenciaga-track-street.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 252
            WHERE Id = 104;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-reversible-wool-cape.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-reversible-wool-cape.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 116
            WHERE Id = 105;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-tb-monogram-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-tb-monogram-belt.jpg", "/img/home/5.jpg", "/img/home/3.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 70
            WHERE Id = 106;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-check-cotton-shirt.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-check-cotton-shirt.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 250
            WHERE Id = 107;
UPDATE Products SET 
            ImageUrl = '/img/brands/burberry/burberry-hero-eau-de-parfum.jpg',
            GalleryUrlsJson = N'["/img/brands/burberry/burberry-hero-eau-de-parfum.jpg", "/img/home/6.jpg", "/img/products/gucci-runway.jpg", "/img/home/1.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Vải Gabardine chống thấm nước dệt tại Yorkshire, lót họa tiết Vintage Check',
            CountryOfOrigin = N'Made in United Kingdom',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 153
            WHERE Id = 108;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-loulou-medium-bag.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/1.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 108
            WHERE Id = 109;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-kate-chain-wallet.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-kate-chain-wallet.jpg", "/img/products/gucci-runway.jpg", "/img/home/1.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 158
            WHERE Id = 110;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-classic-biker-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-classic-biker-jacket.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 172
            WHERE Id = 111;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-tribute-heeled-sandals.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-tribute-heeled-sandals.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 297
            WHERE Id = 112;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-court-classic-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-court-classic-sneaker.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 220
            WHERE Id = 113;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-monogram-narrow-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-monogram-narrow-belt.jpg", "/img/home/1.jpg", "/img/products/gucci-runway.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 348
            WHERE Id = 114;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-sl557-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-sl557-sunglasses.jpg", "/img/home/6.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/4.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 265
            WHERE Id = 115;
UPDATE Products SET 
            ImageUrl = '/img/brands/saintlaurent/saintlaurent-black-opium-parfum.jpg',
            GalleryUrlsJson = N'["/img/brands/saintlaurent/saintlaurent-black-opium-parfum.jpg", "/img/products/gucci-collection.jpg", "/img/home/4.jpg", "/img/products/gucci-runway.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 230
            WHERE Id = 116;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-baguette-medium-ff-bag.jpg", "/img/products/gucci-collection.jpg", "/img/home/6.jpg", "/img/home/1.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 83
            WHERE Id = 117;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-peekaboo-iseeu-handbag.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-peekaboo-iseeu-handbag.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 370
            WHERE Id = 118;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-colibri-slingback-pumps.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-colibri-slingback-pumps.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/adidas-samba.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 144
            WHERE Id = 119;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-ff-jacquard-wool-sweater.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-ff-jacquard-wool-sweater.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-velora.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 65
            WHERE Id = 120;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-ff-buckle-leather-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-ff-buckle-leather-belt.jpg", "/img/products/gucci-collection.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 210
            WHERE Id = 121;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-match-suede-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-match-suede-sneaker.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/home/3.jpg"]',
            Material = N'Canvas dệt logo FF Jacquard kinh điển & Da Cuoio Romano may viền thủ công',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 59
            WHERE Id = 122;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-diamonds-square-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-diamonds-square-sunglasses.jpg", "/img/home/2.jpg", "/img/products/gucci-runway.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 236
            WHERE Id = 123;
UPDATE Products SET 
            ImageUrl = '/img/brands/fendi/fendi-sunshine-shopper-tote.jpg',
            GalleryUrlsJson = N'["/img/brands/fendi/fendi-sunshine-shopper-tote.jpg", "/img/home/1.jpg", "/img/products/gucci-collection.jpg", "/img/home/2.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 240
            WHERE Id = 124;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-the-pouch-clutch.jpg", "/img/products/gucci-runway.jpg", "/img/home/6.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 85
            WHERE Id = 125;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-jodie-mini-hobo.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-jodie-mini-hobo.jpg", "/img/home/3.jpg", "/img/home/4.jpg", "/img/products/gucci-collection.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 369
            WHERE Id = 126;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-cassette-padded-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-cassette-padded-bag.jpg", "/img/home/3.jpg", "/img/home/6.jpg", "/img/home/1.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 228
            WHERE Id = 127;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-tire-chelsea-boots.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-tire-chelsea-boots.jpg", "/img/products/adidas-samba.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 59
            WHERE Id = 128;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-intrecciato-wallet.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-intrecciato-wallet.jpg", "/img/products/gucci-collection.jpg", "/img/home/4.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 225
            WHERE Id = 129;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-stretch-heeled-sandals.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-stretch-heeled-sandals.jpg", "/img/products/adidas-samba.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/balenciaga-track-street.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 92
            WHERE Id = 130;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-flash-sole-boots.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-flash-sole-boots.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/gucci-sneaker.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 272
            WHERE Id = 131;
UPDATE Products SET 
            ImageUrl = '/img/brands/bottegaveneta/bottegaveneta-cat-eye-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/bottegaveneta/bottegaveneta-cat-eye-sunglasses.jpg", "/img/home/2.jpg", "/img/home/4.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 110
            WHERE Id = 132;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-jitney-28-top-handle.jpg", "/img/home/3.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/1.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 74
            WHERE Id = 133;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-out-of-office-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-out-of-office-sneaker.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 305
            WHERE Id = 134;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-industrial-yellow-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-industrial-yellow-belt.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 292
            WHERE Id = 135;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-caravaggio-arrows-hoodie.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-caravaggio-arrows-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 333
            WHERE Id = 136;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-vulcanized-canvas-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-vulcanized-canvas-sneaker.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/adidas-samba.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 323
            WHERE Id = 137;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-diag-flap-crossbody.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-diag-flap-crossbody.jpg", "/img/home/2.jpg", "/img/home/6.jpg", "/img/home/5.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 335
            WHERE Id = 138;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-typography-leather-wallet.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-typography-leather-wallet.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/home/1.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 170
            WHERE Id = 139;
UPDATE Products SET 
            ImageUrl = '/img/brands/offwhite/offwhite-arthur-acetate-sunglasses.jpg',
            GalleryUrlsJson = N'["/img/brands/offwhite/offwhite-arthur-acetate-sunglasses.jpg", "/img/products/fashion-mood-board.jpg", "/img/products/gucci-runway.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 243
            WHERE Id = 140;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-suede-classic-xxi.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-suede-classic-xxi.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/4.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 169
            WHERE Id = 141;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-speedcat-og-motorsport.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-speedcat-og-motorsport.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/home/5.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 65
            WHERE Id = 142;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-palermo-leather-terrace.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-palermo-leather-terrace.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/gucci-sneaker.jpg", "/img/home/6.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 343
            WHERE Id = 143;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-t7-track-jacket-heritage.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-t7-track-jacket-heritage.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 99
            WHERE Id = 144;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-velocity-nitro-3-running.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-velocity-nitro-3-running.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/balenciaga-track-beige.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 265
            WHERE Id = 145;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-fenty-creeper-phatty.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-fenty-creeper-phatty.jpg", "/img/products/adidas-samba.jpg", "/img/products/puma-shoes-fall.jpg", "/img/products/nike-summer-sneaker.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 243
            WHERE Id = 146;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-core-heritage-backpack.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-core-heritage-backpack.jpg", "/img/products/gucci-runway.jpg", "/img/home/6.jpg", "/img/home/1.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 70
            WHERE Id = 147;
UPDATE Products SET 
            ImageUrl = '/img/brands/puma/puma-classics-relaxed-hoodie.jpg',
            GalleryUrlsJson = N'["/img/brands/puma/puma-classics-relaxed-hoodie.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/2.jpg"]',
            Material = N'Da lộn nguyên bản Suede 1968, lót cổ đệm mút thoáng khí và đế cupsole cao su',
            CountryOfOrigin = N'Made in Germany',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 74
            WHERE Id = 148;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-tailored-double-breasted-blazer.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-tailored-double-breasted-blazer.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 134
            WHERE Id = 149;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-minimalist-ribbed-knit-sweater.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-minimalist-ribbed-knit-sweater.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 328
            WHERE Id = 150;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-wide-leg-pleated-trousers.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-wide-leg-pleated-trousers.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 94
            WHERE Id = 151;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-faux-leather-oversized-trench.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-faux-leather-oversized-trench.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 289
            WHERE Id = 152;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-pointed-toe-kitten-boots.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-pointed-toe-kitten-boots.jpg", "/img/products/balenciaga-track-black.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/adidas-samba.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 270
            WHERE Id = 153;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-textured-leather-city-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-textured-leather-city-bag.jpg", "/img/products/gucci-collection.jpg", "/img/home/6.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 99
            WHERE Id = 154;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-basic-relaxed-poplin-shirt.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-basic-relaxed-poplin-shirt.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 138
            WHERE Id = 155;
UPDATE Products SET 
            ImageUrl = '/img/brands/zara/zara-belted-linen-blend-jumpsuit.jpg',
            GalleryUrlsJson = N'["/img/brands/zara/zara-belted-linen-blend-jumpsuit.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 228
            WHERE Id = 156;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-ultra-light-down-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 262
            WHERE Id = 157;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-airism-cotton-oversize-tee.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-airism-cotton-oversize-tee.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 134
            WHERE Id = 158;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-extra-fine-merino-cardigan.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-extra-fine-merino-cardigan.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-velora.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 135
            WHERE Id = 159;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-smart-stretch-ankle-pants.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-smart-stretch-ankle-pants.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 173
            WHERE Id = 160;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-seamless-down-hooded-parka.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-seamless-down-hooded-parka.jpg", "/img/products/sample-velora.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 152
            WHERE Id = 161;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-premium-lambswool-sweater.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-premium-lambswool-sweater.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 211
            WHERE Id = 162;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-round-mini-shoulder-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-round-mini-shoulder-bag.jpg", "/img/home/5.jpg", "/img/products/gucci-runway.jpg", "/img/home/2.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 351
            WHERE Id = 163;
UPDATE Products SET 
            ImageUrl = '/img/brands/uniqlo/uniqlo-dry-ex-functional-tee.jpg',
            GalleryUrlsJson = N'["/img/brands/uniqlo/uniqlo-dry-ex-functional-tee.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 100
            WHERE Id = 164;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-modern-cotton-bralette.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 288
            WHERE Id = 165;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-90s-straight-denim-jeans.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-90s-straight-denim-jeans.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 55
            WHERE Id = 166;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-monogram-logo-tee.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-monogram-logo-tee.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-velora.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 245
            WHERE Id = 167;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-trucker-sherpa-jacket.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-trucker-sherpa-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 254
            WHERE Id = 168;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-low-rise-trunk-3pack.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-low-rise-trunk-3pack.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/products/sample-velora.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 99
            WHERE Id = 169;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-reversible-leather-belt.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-reversible-leather-belt.jpg", "/img/products/gucci-collection.jpg", "/img/products/fashion-mood-board.jpg", "/img/home/3.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 256
            WHERE Id = 170;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-ck-one-eau-de-toilette.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-ck-one-eau-de-toilette.jpg", "/img/home/1.jpg", "/img/home/2.jpg", "/img/home/5.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 328
            WHERE Id = 171;
UPDATE Products SET 
            ImageUrl = '/img/brands/calvinklein/calvinklein-minimalist-camera-bag.jpg',
            GalleryUrlsJson = N'["/img/brands/calvinklein/calvinklein-minimalist-camera-bag.jpg", "/img/home/6.jpg", "/img/home/2.jpg", "/img/home/4.jpg", "/img/products/gucci-collection.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 189
            WHERE Id = 172;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-classic-oxford-shirt.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-velora.jpg", "/img/products/gucci-runway.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 107
            WHERE Id = 173;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-colorblock-windbreaker.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-colorblock-windbreaker.jpg", "/img/products/sample-velora.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/sample-nextgen.jpg", "/img/home/1.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.8,
            ReviewCount = 252
            WHERE Id = 174;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-heritage-flag-sweater.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-heritage-flag-sweater.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/2.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 319
            WHERE Id = 175;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-straight-fit-chino.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-straight-fit-chino.jpg", "/img/products/sample-nextgen.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/home/3.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 320
            WHERE Id = 176;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-retro-flag-leather-sneaker.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-retro-flag-leather-sneaker.jpg", "/img/products/gucci-sneaker.jpg", "/img/products/balenciaga-track-street.jpg", "/img/products/balenciaga-track-black.jpg", "/img/home/4.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 126
            WHERE Id = 177;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-varsity-wool-bomber.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-varsity-wool-bomber.jpg", "/img/products/adidas-sakura-hoodie.jpg", "/img/products/balenciaga-ripped-jacket.jpg", "/img/products/sample-nextgen.jpg", "/img/home/5.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 147
            WHERE Id = 178;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-global-stripe-wallet.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-global-stripe-wallet.jpg", "/img/products/gucci-collection.jpg", "/img/home/2.jpg", "/img/home/3.jpg", "/img/home/6.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 4.9,
            ReviewCount = 70
            WHERE Id = 179;
UPDATE Products SET 
            ImageUrl = '/img/brands/tommyhilfiger/tommyhilfiger-cologne-spray.jpg',
            GalleryUrlsJson = N'["/img/brands/tommyhilfiger/tommyhilfiger-cologne-spray.jpg", "/img/home/4.jpg", "/img/home/2.jpg", "/img/products/fashion-mood-board.jpg"]',
            Material = N'100% Da bê non Ý Calfskin, lót lụa tơ tằm Mulberry Silk, chi tiết mạ vàng 18K',
            CountryOfOrigin = N'Made in Italy',
            CareInstructions = N'Vệ sinh chuyên dụng bằng khăn mềm khô. Không giặt máy hoặc dùng hóa chất tẩy rửa mạnh. Bảo quản trong túi vải dustbag và hộp chuyên dụng tại nhiệt độ phòng thoáng mát.',
            PackagingDetails = N'Hộp cứng nắp gập nam châm Aethelgard Signature Luxury Box, túi vải lụa chống bụi, thẻ chip NFC xác thực chính hãng quốc tế, ruy băng niêm phong Boutique.',
            Rating = 5.0,
            ReviewCount = 199
            WHERE Id = 180;
COMMIT TRANSACTION;
PRINT 'Da cap nhat thanh cong 180 san pham!';