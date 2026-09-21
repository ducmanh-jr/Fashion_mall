# DM FASHION DATA TOOLS - BLUEPRINT & SYSTEM ARCHITECTURE

Dự án nghiên cứu và phát triển hệ thống Web cào dữ liệu thời trang tự động (Automated Fashion Scraping Web System) quy mô lớn dành cho **30 thương hiệu thời trang hàng đầu thế giới**: **Gucci, Adidas, Louis Vuitton, Nike, Chanel, Zara, H&M, Dior, Prada, Balenciaga, Uniqlo, Puma, Burberry, Versace, Hermès, Saint Laurent, Fendi, Armani, Calvin Klein, Levi's, Tommy Hilfiger, Ralph Lauren, Converse, Vans, The North Face, Supreme, Off-White, Bottega Veneta, Valentino, Mango...**

Hệ thống được thiết kế theo mô hình kiến trúc tối ưu:
- **Giao diện Web & Điều phối chủ đạo:** **Java (Spring Boot 3 + Java 21)** cung cấp giao diện Web, tìm kiếm thương hiệu thông minh (Brand Autocomplete), chọn chi nhánh/cơ sở cụ thể (ví dụ: *Gucci Tràng Tiền Plaza*, *Zara Vincom Bà Triệu*, *Adidas Ba Triệu*), quản lý hàng đợi và xuất báo cáo Excel.
- **Nhân cào dữ liệu chuyên dụng (Scraping Worker Engine):** **Python (`curl_cffi` + Playwright-stealth)** giải quyết bài toán giả lập vân tay TLS JA3/JA4 để vượt qua tường lửa Akamai Bot Manager, Cloudflare, DataDome.
- **Hệ thống Kiểm thử & Sàng lọc tự động:** Bộ lọc 4 Cửa Ải (4-Tier Validation Gate) tự động chấm điểm chất lượng, tự sửa lỗi (Auto-heal) và cách ly (Quarantine) các bản ghi lỗi, cam kết độ chính xác đạt trên **90% - 99%**.
- **Giải pháp lưu trữ chuẩn mực (Master Storage):** **PostgreSQL 16 (Relational + JSONB)** kết hợp **Redis 7** (Hàng đợi tác vụ & WebSocket Live Progress) và **MinIO / S3** (Kho ảnh HD).

---

## 🌟 TÀI LIỆU ĐẶC BIỆT MỚI BỔ SUNG

1. 👉 **[BÁO CÁO 31: MA TRẬN KỸ THUẬT & GIẢI PHÁP CÀO 30 THƯƠNG HIỆU TOÀN CẦU](reports/31_30_global_brands_matrix_solution.md)**  
*(Phân tích 5 cụm công nghệ lõi, 4 Super-Adapters bao phủ 30 thương hiệu và quét kho tại các TTTM Việt Nam: Tràng Tiền Plaza, Vincom, Sheraton...)*

2. 👉 **[BÁO CÁO 32: QUY TRÌNH KIỂM THỬ TỰ ĐỘNG, SÀNG LỌC & CÁCH LY DỮ LIỆU SAI LỆCH](reports/32_automated_testing_screening_quarantine.md)**  
*(Thiết lập 4 Ải kiểm tra: Chống bẫy bot, Xác thực cú pháp, Phát hiện bất thường giá/kho, Chấm điểm chất lượng và khu vực Cách ly Quarantine)*

---

## 📚 MỤC LỤC TRỌN BỘ CÁC BẢN BÁO CÁO PHÂN TÍCH & THIẾT KẾ KỸ THUẬT

### PHẦN I: PHÂN TÍCH SCHEMA & TỪ ĐIỂN DỮ LIỆU THỜI TRANG (BÁO CÁO 01 - 10)
| STT | Báo cáo | Nội dung trọng tâm | File chi tiết |
| :---: | :--- | :--- | :--- |
| **01** | **Core Product Master Data** | SKU, Style Code, Model Code, Tên sản phẩm, Mùa ra mắt, Canonical URL. | [01_core_product_master_data.md](reports/01_core_product_master_data.md) |
| **02** | **Taxonomy & Category Hierarchy** | Cây phân loại đa tầng (L1 -> L3), Breadcrumbs chuẩn, Phân loại Thể thao vs Xa xỉ. | [02_taxonomy_category_hierarchy.md](reports/02_taxonomy_category_hierarchy.md) |
| **03** | **Pricing & Commercial Financial Data** | Giá niêm yết (MSRP), Giá bán thực, Thuế VAT khu vực, Geo-pricing, Giá liên hệ (POA). | [03_pricing_financial_data.md](reports/03_pricing_financial_data.md) |
| **04** | **Variants, Matrix & Inventory Status** | Ma trận Size x Màu sắc, Trạng thái còn hàng, Tồn kho cửa hàng thực tế. | [04_variants_inventory_stock.md](reports/04_variants_inventory_stock.md) |
| **05** | **Media & Digital Assets** | Thư viện ảnh HD/Zoom gốc, 8 góc chụp chuẩn, Video catwalk, File 3D/AR. | [05_media_digital_assets.md](reports/05_media_digital_assets.md) |
| **06** | **Material, Composition & Craftsmanship** | Tỷ lệ thành phần vải (Silk, Cashmere...), Xuất xứ (Made in Italy), Kỹ thuật thủ công. | [06_material_craftsmanship_origin.md](reports/06_material_craftsmanship_origin.md) |
| **07** | **Fit, Measurements & Sizing Guide** | Kích thước túi xách (Dài x Cao x Rộng), Độ dài quai, Thông số người mẫu, Bảng size. | [07_fit_sizing_measurements.md](reports/07_fit_sizing_measurements.md) |
| **08** | **Care Instructions & Sustainability** | Ký hiệu giặt là chuẩn quốc tế, Tuyên bố bền vững (Recycled content), Hộ chiếu số DPP. | [08_care_sustainability_compliance.md](reports/08_care_sustainability_compliance.md) |
| **09** | **Editorial Storytelling & SEO Marketing** | Câu chuyện biên tập từ Giám đốc sáng tạo, Gợi ý trang phục (Complete the Look). | [09_editorial_storytelling_seo.md](reports/09_editorial_storytelling_seo.md) |
| **10** | **Scraping Architecture & Master Schema** | Kiến trúc vượt WAF (Akamai, Cloudflare), Mô hình Polyglot Java Web + Python Worker, Master Schema. | [10_scraping_architecture_unified_schema.md](reports/10_scraping_architecture_unified_schema.md) |

---

### PHẦN II: THIẾT KẾ HỆ THỐNG WEB JAVA & TÍNH NĂNG CHỌN CHI NHÁNH (BÁO CÁO 11 - 20)
| STT | Báo cáo | Nội dung trọng tâm | File chi tiết |
| :---: | :--- | :--- | :--- |
| **11** | **Store Locator & Boutique Mapping** | Quét vị trí điểm bán, Store ID, cơ chế kiểm tra hàng tại Gucci Tràng Tiền Plaza. | [11_store_locator_boutique_mapping.md](reports/11_store_locator_boutique_mapping.md) |
| **12** | **Multi-Brand Autocomplete Architecture** | Ô tìm kiếm gợi ý hãng thông minh (Trie/Cache), hỗ trợ gõ không dấu & viết tắt. | [12_multi_brand_autocomplete_catalog.md](reports/12_multi_brand_autocomplete_catalog.md) |
| **13** | **Multi-Storefront Selective Scraping** | Điều phối cào: cào 1 chi nhánh vs cào song song nhiều chi nhánh (mô hình 2 pha). | [13_multi_storefront_selective_scraping.md](reports/13_multi_storefront_selective_scraping.md) |
| **14** | **Data Accuracy Framework (>= 90%)** | 5 chỉ số chất lượng, kiểm định bằng Bean Validation & chấm điểm tự động. | [14_data_accuracy_assurance_framework.md](reports/14_data_accuracy_assurance_framework.md) |
| **15** | **Java Backend & Web Portal Blueprint** | Kiến trúc Spring Boot 3, Java 21, Điều phối tác vụ, Danh bạ chi nhánh, Quản lý CSDL. | [15_java_backend_architecture.md](reports/15_java_backend_architecture.md) |
| **16** | **Real-time Job Orchestration & WebSocket** | Quản lý vòng đời tác vụ, hàng đợi Redis/RabbitMQ, cập nhật tiến độ live lên Web. | [16_realtime_job_orchestration.md](reports/16_realtime_job_orchestration.md) |
| **17** | **Nghiên cứu Công nghệ Cào Tối ưu** | So sánh Java vs Go vs Python, quyết định chọn Python `curl_cffi` làm nhân cào vượt Akamai. | [17_headless_browser_http_clients_java.md](reports/17_headless_browser_http_clients_java.md) |
| **18** | **Boutique Stock API Reverse Engineering** | Mổ xẻ chi tiết giao thức API kiểm tra hàng tại store của Gucci, Dior, Adidas. | [18_boutique_stock_api_reverse_engineering.md](reports/18_boutique_stock_api_reverse_engineering.md) |
| **19** | **Nghiên cứu Quyết định CSDL Tối ưu** | So sánh MySQL vs MongoDB vs PostgreSQL, quyết định chọn **PostgreSQL 16 + Redis 7**. | [19_database_design_store_inventory.md](reports/19_database_design_store_inventory.md) |
| **20** | **Frontend Web UI/UX Specification** | Thiết kế giao diện chủ đạo bằng Java (Spring Boot + Thymeleaf/HTMX): Gợi ý hãng, Checkbox cơ sở, Live Console. | [20_frontend_web_ui_ux_specification.md](reports/20_frontend_web_ui_ux_specification.md) |

---

### PHẦN III: VẬN HÀNH, TỐI ƯU HÓA & TRIỂN KHAI THỰC TẾ (BÁO CÁO 21 - 30)
| STT | Báo cáo | Nội dung trọng tâm | File chi tiết |
| :---: | :--- | :--- | :--- |
| **21** | **Proxy Management & IP Rotation** | Định tuyến Proxy dân cư theo địa lý cửa hàng (IP Việt Nam cho Tràng Tiền). | [21_proxy_management_ip_rotation.md](reports/21_proxy_management_ip_rotation.md) |
| **22** | **Rate Limiting & Anti-Ban Handling** | Exponential Backoff with Jitter, Resilience4j Circuit Breaker, mô phỏng người thật. | [22_rate_limiting_anti_ban_handling.md](reports/22_rate_limiting_anti_ban_handling.md) |
| **23** | **Data Normalization Pipeline** | Chuẩn hóa bảng size quốc tế (IT/FR/US/EU), quy đổi tiền tệ và nhóm màu sắc. | [23_data_normalization_transformation.md](reports/23_data_normalization_transformation.md) |
| **24** | **Media Processing & Deduplication** | Xử lý tải ảnh, tối ưu kích thước, băm hash pHash/MD5 chống trùng lặp, lưu S3. | [24_media_asset_processing_deduplication.md](reports/24_media_asset_processing_deduplication.md) |
| **25** | **Incremental Crawling & Delta Detection** | Cào gia tăng, chỉ quét sản phẩm mới hoặc biến động tồn kho/giá, tiết kiệm 80% tài nguyên. | [25_incremental_crawling_delta_detection.md](reports/25_incremental_crawling_delta_detection.md) |
| **26** | **Export & Reporting Engine in Java** | Xuất báo cáo Excel (.xlsx) dung lượng lớn bằng Apache POI SXSSF không tràn RAM. | [26_export_reporting_engine_java.md](reports/26_export_reporting_engine_java.md) |
| **27** | **Error Handling & Dead Letter Queue** | Tự phục hồi khi rớt mạng, lưu vết lỗi vào DLQ, cảnh báo qua Telegram/Discord. | [27_error_handling_dead_letter_queue.md](reports/27_error_handling_dead_letter_queue.md) |
| **28** | **Security, Authentication & Quotas** | Bảo mật Spring Security 6, JWT, phân quyền Admin/Manager và quản lý quota cào. | [28_security_auth_user_management.md](reports/28_security_auth_user_management.md) |
| **29** | **Deployment, Docker & CI/CD** | Cụm Docker Compose kết nối Java Web + Python Worker + PostgreSQL + Redis bằng 1 lệnh. | [29_deployment_containerization_cicd.md](reports/29_deployment_containerization_cicd.md) |
| **30** | **System Integration & Dev Roadmap** | Lộ trình 4 giai đoạn từ phiên bản thử nghiệm (MVP) đến sản phẩm hoàn thiện. | [30_system_integration_roadmap.md](reports/30_system_integration_roadmap.md) |
