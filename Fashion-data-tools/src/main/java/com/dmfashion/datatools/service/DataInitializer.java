package com.dmfashion.datatools.service;

import com.dmfashion.datatools.model.Brand;
import com.dmfashion.datatools.model.Store;
import com.dmfashion.datatools.repository.BrandRepository;
import com.dmfashion.datatools.repository.StoreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final BrandRepository brandRepository;
    private final StoreRepository storeRepository;

    public DataInitializer(BrandRepository brandRepository, StoreRepository storeRepository) {
        this.brandRepository = brandRepository;
        this.storeRepository = storeRepository;
    }

    @Override
    public void run(String... args) {
        if (brandRepository.count() == 0) {
            log.info("Seeding 30 global fashion brands...");
            seedBrands();
        }

        log.info("Ensuring all Asian flagship boutique stores are seeded...");
        seedAsianStores();
        log.info("Database initialized with Asian Flagship Network!");
    }

    private void seedBrands() {
        List<Brand> brands = List.of(
            new Brand("gucci", "Gucci", "Italy", "Luxury", "guci,gucxi,kering", "https://logo.clearbit.com/gucci.com"),
            new Brand("adidas", "Adidas", "Germany", "Sportswear", "das,adida,three stripes", "https://logo.clearbit.com/adidas.com"),
            new Brand("louis-vuitton", "Louis Vuitton", "France", "Luxury", "lv,louis vuitton,lvmh", "https://logo.clearbit.com/louisvuitton.com"),
            new Brand("nike", "Nike", "USA", "Sportswear", "swoosh,just do it", "https://logo.clearbit.com/nike.com"),
            new Brand("chanel", "Chanel", "France", "Luxury Haute Couture", "coco,chanel paris", "https://logo.clearbit.com/chanel.com"),
            new Brand("zara", "Zara", "Spain", "Fast Fashion", "inditex,zara man,zara woman", "https://logo.clearbit.com/zara.com"),
            new Brand("hm", "H&M", "Sweden", "Fast Fashion", "h&m,hennes mauritz", "https://logo.clearbit.com/hm.com"),
            new Brand("dior", "Christian Dior", "France", "Luxury", "cd,dior,couture", "https://logo.clearbit.com/dior.com"),
            new Brand("prada", "Prada", "Italy", "Luxury", "prada milano", "https://logo.clearbit.com/prada.com"),
            new Brand("balenciaga", "Balenciaga", "France", "Luxury Streetwear", "balen,balenciaga paris", "https://logo.clearbit.com/balenciaga.com"),
            new Brand("uniqlo", "Uniqlo", "Japan", "Casual Lifewear", "fast retailing,ao chong nang,heattech", "https://logo.clearbit.com/uniqlo.com"),
            new Brand("puma", "Puma", "Germany", "Sportswear", "puma cat", "https://logo.clearbit.com/puma.com"),
            new Brand("burberry", "Burberry", "UK", "Luxury", "trench coat,burberry check", "https://logo.clearbit.com/burberry.com"),
            new Brand("versace", "Versace", "Italy", "Luxury", "medusa,versace milan", "https://logo.clearbit.com/versace.com"),
            new Brand("hermes", "Hermès", "France", "Ultra Luxury", "birkin,kelly,hermes paris", "https://logo.clearbit.com/hermes.com"),
            new Brand("ysl", "Saint Laurent (YSL)", "France", "Luxury", "yves saint laurent,ysl", "https://logo.clearbit.com/ysl.com"),
            new Brand("fendi", "Fendi", "Italy", "Luxury", "fendi roma,baguette", "https://logo.clearbit.com/fendi.com"),
            new Brand("armani", "Giorgio Armani", "Italy", "Luxury Tailoring", "armani,emporio armani", "https://logo.clearbit.com/armani.com"),
            new Brand("calvin-klein", "Calvin Klein", "USA", "Contemporary", "ck,calvin klein jeans", "https://logo.clearbit.com/calvinklein.com"),
            new Brand("levis", "Levi's", "USA", "Denim Icon", "501,jeans,levi strauss", "https://logo.clearbit.com/levi.com"),
            new Brand("tommy-hilfiger", "Tommy Hilfiger", "USA", "Preppy Heritage", "tommy,hilfiger", "https://logo.clearbit.com/tommy.com"),
            new Brand("ralph-lauren", "Ralph Lauren", "USA", "Luxury Heritage", "polo,polo ralph lauren", "https://logo.clearbit.com/ralphlauren.com"),
            new Brand("converse", "Converse", "USA", "Footwear", "chuck taylor,all star", "https://logo.clearbit.com/converse.com"),
            new Brand("vans", "Vans", "USA", "Skateboarding", "off the wall,old skool", "https://logo.clearbit.com/vans.com"),
            new Brand("the-north-face", "The North Face", "USA", "Outdoor Performance", "tnf,north face,nuptse", "https://logo.clearbit.com/thenorthface.com"),
            new Brand("supreme", "Supreme", "USA", "Streetwear", "box logo,supreme new york", "https://logo.clearbit.com/supremenewyork.com"),
            new Brand("off-white", "Off-White", "Italy", "Luxury Streetwear", "virgil abloh,arrow", "https://logo.clearbit.com/off---white.com"),
            new Brand("bottega-veneta", "Bottega Veneta", "Italy", "Quiet Luxury", "intrecciato,bottega", "https://logo.clearbit.com/bottegaveneta.com"),
            new Brand("valentino", "Valentino", "Italy", "Luxury", "valentino garavani,rockstud", "https://logo.clearbit.com/valentino.com"),
            new Brand("mango", "Mango", "Spain", "Fast Fashion", "mango woman,mango man", "https://logo.clearbit.com/mango.com")
        );
        brandRepository.saveAll(brands);
    }

    private void seedAsianStores() {
        // 1. GUCCI ASIAN STORES
        Brand gucci = brandRepository.findById("gucci").orElse(null);
        if (gucci != null) {
            List<Store> gucciAsianStores = List.of(
                new Store("VN_HN_01", gucci, "Gucci Tràng Tiền Plaza", "Hà Nội", "VN", 
                          "Tràng Tiền Plaza, 24 Hai Bà Trưng, P. Tràng Tiền, Q. Hoàn Kiếm", "+84 24 3936 9999",
                          "Flagship Boutique", "T2 - T6: 09:30 - 21:30 | T7 - CN: 09:30 - 22:00", 21.0253, 105.8544,
                          "trangtien.boutique@gucci.com", 
                          "Đặt hẹn chuyên gia VIP, Khắc tên dập nhiệt (Hot Stamping), Chăm sóc bảo dưỡng đồ da, Đỗ xe Valet, Hoàn thuế VAT Refund, Giao hàng White Glove",
                          "Túi xách biểu tượng, Đồ da nhỏ, Giày dép nam/nữ, Trang sức cao cấp, Nước hoa & Mỹ phẩm, Thời trang may sẵn",
                          "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/us/en/store/trang-tien-plaza"),
                new Store("VN_SG_01", gucci, "Gucci Sheraton Saigon", "TP. Hồ Chí Minh", "VN", 
                          "Sheraton Saigon Hotel, 88 Đồng Khởi, P. Bến Nghé, Quận 1", "+84 28 3827 6688",
                          "Luxury Hotel Boutique", "T2 - CN: 10:00 - 21:00", 10.7769, 106.7032,
                          "sheraton.saigon@gucci.com",
                          "Phục vụ phòng VIP Lounge, Đặt hẹn tư vấn tại phòng Suite, Dập chữ cá nhân hóa, Chăm sóc đồ da",
                          "Túi xách cao cấp, Phụ kiện da, Giày, Đồng hồ & Trang sức",
                          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/us/en/store/sheraton-saigon"),
                new Store("VN_SG_02", gucci, "Gucci Union Square", "TP. Hồ Chí Minh", "VN", 
                          "Union Square Shopping Center, 171 Đồng Khởi, Quận 1", "+84 28 3824 5566",
                          "Mall Flagship", "T2 - CN: 09:30 - 22:00", 10.7761, 106.7018,
                          "unionsquare.hcm@gucci.com",
                          "Dịch vụ khách hàng cao cấp, Đặt lịch hẹn thử trang phục, Đổi trả tại cửa hàng, Thanh toán đa ngoại tệ",
                          "Đầy đủ bộ sưu tập Nam & Nữ, Túi xách, Giày dép, Trang sức, Phụ kiện du lịch",
                          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/us/en/store/union-square-saigon"),
                new Store("JP_TYO_01", gucci, "Gucci Ginza Flagship", "Tokyo", "JP", 
                          "4-4-10 Ginza, Chuo-ku, Tokyo 104-0061", "+81 3 5537 3211",
                          "Global Maison Flagship", "T2 - CN: 11:00 - 20:00", 35.6719, 139.7656,
                          "ginza.tokyo@gucci.com",
                          "Nhà hàng ẩm thực cao cấp Gucci Osteria da Massimo Bottura Tokyo, Phòng VIP Salon riêng, Khắc tên cá nhân hóa Hot Stamping ký tự Kanji, Hoàn thuế Tax-Free tại quầy",
                          "Toàn bộ bộ sưu tập Runway, Túi xách độc bản Ginza Edition, Trang sức kim cương High Jewelry, Thời trang may sẵn",
                          "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/jp/ja/store/ginza"),
                new Store("KR_SEL_01", gucci, "Gucci Gaok Itaewon Flagship", "Seoul", "KR", 
                          "223 Itaewon-ro, Yongsan-gu, Seoul 04399", "+82 2 3442 1921",
                          "Cultural Concept Flagship", "T2 - CN: 11:00 - 20:30", 37.5358, 126.9996,
                          "gaok.seoul@gucci.com",
                          "Kiến trúc mặt tiền kim loại phát sáng nghệ thuật của Park Seung-mo, Nhà hàng Gucci Osteria Seoul, Trải nghiệm K-Stylist cá nhân, Miễn thuế Global Tax Free",
                          "Gucci Gaok Exclusive Capsule Collection, Túi xách Horsebit & Bamboo, Đồ da thủ công, Thời trang K-pop thời thượng",
                          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/kr/ko/store/gucci-gaok"),
                new Store("SG_MBS_01", gucci, "Gucci Marina Bay Sands", "Singapore", "SG", 
                          "The Shoppes at Marina Bay Sands, 2 Bayfront Ave, #B1-109", "+65 6723 8880",
                          "Waterfront Luxury Flagship", "T2 - CN: 10:30 - 22:00 (Cuối tuần 23:00)", 1.2847, 103.8596,
                          "mbs.singapore@gucci.com",
                          "Phòng VIP Suite view vịnh Marina, Khu vực Gucci Valigeria du lịch, Dịch vụ xe Limousine đưa đón, Hoàn thuế du lịch GST Refund tự động",
                          "Túi xách cao cấp, Phụ kiện du lịch, Giày thể thao, Kính mát, Nước hoa & Mỹ phẩm Alchemist Garden",
                          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/sg/en_gb/store/marina-bay-sands"),
                new Store("TH_BKK_01", gucci, "Gucci Siam Paragon Maison", "Bangkok", "TH", 
                          "Siam Paragon, M Floor, 991 Rama I Rd, Pathum Wan, Bangkok 10330", "+66 2 610 8640",
                          "Southeast Asia Flagship", "T2 - CN: 10:00 - 21:00", 13.7466, 100.5348,
                          "siamparagon.bkk@gucci.com",
                          "Phòng thử đồ VIP Suite sang trọng, Nhân viên hỗ trợ đa ngôn ngữ (Việt - Thái - Anh), Dịch vụ dập tên cá nhân hóa, Hoàn thuế VAT Refund for Tourists",
                          "Túi xách nữ, Vali hành lý cao cấp, Giày Princetown, Thời trang may sẵn và Trang sức kim cương",
                          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/th/en_gb/store/siam-paragon"),
                new Store("HK_HKG_01", gucci, "Gucci Landmark Central", "Hong Kong", "HK", 
                          "Shop G23-30, Landmark Atrium, 15 Queen's Road Central, Central, Hong Kong", "+852 2524 4492",
                          "Heritage Flagship", "T2 - CN: 10:30 - 20:00", 22.2812, 114.1578,
                          "landmark.hk@gucci.com",
                          "Dịch vụ khách hàng thượng lưu Private Client Clienteling, Triển lãm đồng hồ Haute Horlogerie, Miễn thuế hoàn toàn (Freeport Shopping)",
                          "Đầy đủ bộ sưu tập cao cấp Nam & Nữ, Đồng hồ Grip, Túi xách Jackie 1961, Đồ da quý hiếm Exotic Skins",
                          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.gucci.com/hk/en_gb/store/the-landmark")
            );
            storeRepository.saveAll(gucciAsianStores);
        }

        // 2. DIOR ASIAN STORES
        Brand dior = brandRepository.findById("dior").orElse(null);
        if (dior != null) {
            List<Store> diorAsianStores = List.of(
                new Store("DIOR_VN_HN", dior, "Dior Tràng Tiền Plaza", "Hà Nội", "VN", 
                          "Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm", "+84 24 3824 0000",
                          "Haute Couture Boutique", "T2 - CN: 09:30 - 21:30", 21.0254, 105.8545,
                          "dior.hanoi@christiandior.com",
                          "Khu thử đồ Haute Couture riêng tư, Đặt may trang phục dạ hội, Dịch vụ thêu tên cá nhân hóa, Giao hàng tận nhà",
                          "Lady Dior, Túi Saddle, Book Tote, Giày dép thời trang cao cấp, Trang sức và Đồng hồ Dior Joaillerie",
                          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.dior.com/en_us/fashion/stores/dior-trang-tien-plaza"),
                new Store("DIOR_VN_SG", dior, "Dior Union Square", "TP. Hồ Chí Minh", "VN", 
                          "Union Square, 171 Đồng Khởi, Quận 1", "+84 28 3822 0000",
                          "Flagship Boutique", "T2 - CN: 09:30 - 22:00", 10.7762, 106.7019,
                          "dior.saigon@christiandior.com",
                          "Phòng tư vấn VIP riêng biệt, Đặt hẹn phong cách cùng Stylist, Chăm sóc đồ da Dior",
                          "Bộ sưu tập Túi xách nữ, Thời trang may sẵn, Giày, Phụ kiện, Nước hoa độc bản Maison Christian Dior",
                          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.dior.com/en_us/fashion/stores/dior-union-square"),
                new Store("DIOR_KR_SEL", dior, "House of Dior Seoul Cheongdam", "Seoul", "KR", 
                          "464 Apgujeong-ro, Gangnam-gu, Seoul 06015", "+82 2 513 0300",
                          "Global Architectural Maison", "T2 - CN: 11:00 - 20:00", 37.5255, 127.0450,
                          "houseofdior.seoul@christiandior.com",
                          "Tòa nhà kiệt tác hình cánh hoa của kiến trúc sư Christian de Portzamparc, Quán Café Dior by Pierre Hermé tầng thượng, Dịch vụ thêu tên ABCDior",
                          "Lady Dior Limited Cheongdam Edition, Bộ sưu tập Haute Couture, Dior Maison đồ gia dụng cao cấp, Trang sức Rose des Vents",
                          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.dior.com/en_us/fashion/stores/house-of-dior-seoul"),
                new Store("DIOR_JP_TYO", dior, "House of Dior Ginza Six", "Tokyo", "JP", 
                          "Ginza Six, 6-10-1 Ginza, Chuo-ku, Tokyo 104-0061", "+81 3 3569 1081",
                          "Mega Flagship Maison", "T2 - CN: 10:30 - 20:30", 35.6698, 139.7640,
                          "ginza.dior@christiandior.com",
                          "Café Dior by Ladurée, Phòng Haute Couture Salon 5 tầng tráng lệ, Dịch vụ cá nhân hóa nghệ nhân Nhật Bản",
                          "Đầy đủ bộ sưu tập Dior Men của Kim Jones & Dior Women của Maria Grazia Chiuri, Túi Book Tote thêu tinh xảo",
                          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.dior.com/en_us/fashion/stores/house-of-dior-ginza"),
                new Store("DIOR_SG_MBS", dior, "Dior Marina Bay Sands", "Singapore", "SG", 
                          "2 Bayfront Ave, #B1-63/64 The Shoppes at Marina Bay Sands", "+65 6688 7188",
                          "Luxury Waterfront Boutique", "T2 - CN: 10:30 - 22:30", 1.2845, 103.8594,
                          "mbs.dior@christiandior.com",
                          "Phòng Suite tiếp khách VIP ngắm kênh nước ngầm, Dịch vụ thêu tên túi ABCDior trong 2 giờ, Hoàn thuế GST",
                          "Lady D-Joy, Dior Toujours, Giày J'Adior slingback, Đồ da nhỏ và Nước hoa độc bản La Collection Privée",
                          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.dior.com/en_us/fashion/stores/dior-marina-bay-sands")
            );
            storeRepository.saveAll(diorAsianStores);
        }

        // 3. LOUIS VUITTON ASIAN STORES
        Brand lv = brandRepository.findById("louis-vuitton").orElse(null);
        if (lv != null) {
            List<Store> lvAsianStores = List.of(
                new Store("LV_VN_HN", lv, "Louis Vuitton Tràng Tiền Plaza", "Hà Nội", "VN", 
                          "Tràng Tiền Plaza, Hoàn Kiếm, Hà Nội", "+84 28 3861 4107",
                          "Maison Flagship", "T2 - CN: 09:30 - 21:30", 21.0255, 105.8546,
                          "client.services.vn@louisvuitton.com",
                          "Dịch vụ dập nổi Mon Monogram cá nhân hóa, Sửa chữa đồ da chính hãng Louis Vuitton Care, Đặt hàng vali da thủ công MTO, Phòng VIP",
                          "Vali du lịch truyền thống, Túi xách Neverfull, Speedy, Giày dép nam nữ, Đồng hồ Tambour, Nước hoa Les Parfums",
                          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://en.louisvuitton.com/eng-nl/point-of-sale/vietnam/louis-vuitton-hanoi-trang-tien"),
                new Store("LV_SG_MBS", lv, "Louis Vuitton Island Maison Marina Bay Sands", "Singapore", "SG", 
                          "Crystal Pavilion South, Marina Bay Sands, 2 Bayfront Ave", "+65 6788 3888",
                          "Floating Island Maison", "T2 - CN: 11:00 - 22:30", 1.2842, 103.8588,
                          "mbs.island@louisvuitton.com",
                          "Tòa nhà nổi hình pha lê trên mặt nước do Peter Marino thiết kế, Đường hầm nghệ thuật dưới biển kết nối vào mall, Sân thượng ngắm vịnh Marina, Phòng VIP thủy cung",
                          "Bộ sưu tập Rương du lịch Objets Nomades, Túi Capucines, Petite Malle, Đồng hồ Tambour Carpe Diem, Trang sức kim cương LV Diamonds",
                          "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://en.louisvuitton.com/eng-nl/point-of-sale/singapore/louis-vuitton-island-maison"),
                new Store("LV_JP_TYO", lv, "Louis Vuitton Ginza Namiki", "Tokyo", "JP", 
                          "7-6-1 Ginza, Chuo-ku, Tokyo 104-0061", "+81 120 00 1854",
                          "Architectural Landmark Flagship", "T2 - CN: 11:00 - 20:00", 35.6695, 139.7618,
                          "ginzanamiki@louisvuitton.com",
                          "Kiến trúc mặt kính uốn lượn như mặt nước óng ánh của Jun Aoki & Peter Marino, Nhà hàng Le Café V & Le Chocolat V by Sugalabo, Dập Mon Monogram ký tự Kanji",
                          "Bộ sưu tập phiên bản giới hạn Tokyo, Túi xách Twist & Coussin, Thời trang may sẵn nam/nữ, Trang sức cao cấp",
                          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://jp.louisvuitton.com/jpn-jp/point-of-sale/japan/louis-vuitton-ginza-namikidori"),
                new Store("LV_KR_SEL", lv, "Louis Vuitton Maison Seoul Gangnam", "Seoul", "KR", 
                          "454 Apgujeong-ro, Gangnam-gu, Seoul 06015", "+82 2 3432 1854",
                          "Frank Gehry Designed Maison", "T2 - CN: 11:00 - 20:00", 37.5258, 127.0454,
                          "maisonseoul@louisvuitton.com",
                          "Kiến trúc cánh buồm kính của huyền thoại Frank Gehry, Phòng triển lãm nghệ thuật Espace Louis Vuitton Seoul tầng 4, VIP Apartment sang trọng",
                          "Túi xách Capucines thủ công cao cấp, Đồng hồ thông minh Tambour Horizon, Giày LV Trainer, Bộ sưu tập Pharrell Williams",
                          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://kr.louisvuitton.com/kor-kr/point-of-sale/korea/louis-vuitton-maison-seoul"),
                new Store("LV_TH_BKK", lv, "Louis Vuitton The Place Bangkok", "Bangkok", "TH", 
                          "Gaysorn Amarin, 496-502 Phloen Chit Rd, Lumphini, Bangkok 10330", "+66 2 610 8400",
                          "LV The Place Concept Maison", "T2 - CN: 10:00 - 20:00", 13.7441, 100.5412,
                          "theplace.bkk@louisvuitton.com",
                          "Nhà hàng ẩm thực cao cấp Gaggan at Louis Vuitton, Triển lãm nhập vai Visionary Journeys, Quán Le Café Louis Vuitton",
                          "Túi xách Alma, Speedy P9 phiên bản Đông Nam Á, Thời trang du lịch nhiệt đới, Giày dép cao cấp",
                          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://th.louisvuitton.com/tha-th/point-of-sale/thailand/louis-vuitton-the-place-bangkok")
            );
            storeRepository.saveAll(lvAsianStores);
        }

        // 4. ADIDAS ASIAN STORES
        Brand adidas = brandRepository.findById("adidas").orElse(null);
        if (adidas != null) {
            List<Store> adidasAsianStores = List.of(
                new Store("ADI_VN_HN_01", adidas, "Adidas Brand Center Bà Triệu", "Hà Nội", "VN", 
                          "Vincom Center, 191 Bà Triệu, Hai Bà Trưng", "+84 24 3974 0000",
                          "Brand Center Flagship", "T2 - CN: 09:30 - 22:00", 21.0118, 105.8496,
                          "batrieu.bc@adidas.com.vn",
                          "Trải nghiệm phân tích dáng chạy Run Genie, In tên & số áo thể thao lấy ngay, Dịch vụ vệ sinh giày sneaker, Đổi trả 30 ngày",
                          "Adidas Originals (Samba, Gazelle, Spezial, Campus), Giày chạy bộ Ultraboost, Quần áo thể thao, Phụ kiện bóng đá",
                          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.adidas.com.vn/vi/store/batrieu"),
                new Store("ADI_JP_TYO", adidas, "Adidas Brand Center Shibuya", "Tokyo", "JP", 
                          "23-5 Udagawacho, Shibuya-ku, Tokyo 150-0042", "+81 3 5456 6810",
                          "Global Brand Center (5 Tầng)", "T2 - CN: 11:00 - 21:00", 35.6601, 139.6985,
                          "shibuya.bc@adidas.com",
                          "MakerLab cá nhân hóa áo đấu & giày sneaker, Khu trải nghiệm chạy bộ kỹ thuật số 4DFWD, Trưng bày collab Y-3 Yohji Yamamoto",
                          "Tokyo City Exclusive Edition, Samba OG, Handball Spezial, Adizero Pro Racing, Quần áo thể thao công nghệ cao",
                          "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://shop.adidas.jp/stores/article/shibuya"),
                new Store("ADI_KR_SEL", adidas, "Adidas Brand Center Gangnam", "Seoul", "KR", 
                          "412 Gangnam-daero, Gangnam-gu, Seoul 06241", "+82 2 3446 0205",
                          "Asia Pacific Flagship", "T2 - CN: 10:30 - 22:00", 37.5005, 127.0264,
                          "gangnam.bc@adidas.com",
                          "Seoul City Shop độc quyền, Khu văn hóa K-Streetwear Originals, Phòng phân tích sinh trắc học bàn chân Footwear Lab",
                          "Adidas Originals Seoul Limited, Giày Ultraboost Light, Quần áo thể thao biểu tượng Beckenbauer, Áo đấu bóng đá K-League",
                          "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.adidas.co.kr/store/gangnam"),
                new Store("ADI_SG_ORC", adidas, "Adidas Brand Center Orchard", "Singapore", "SG", 
                          "270 Orchard Road, Knightsbridge, Singapore 238857", "+65 6734 5678",
                          "Southeast Asia Largest Flagship", "T2 - CN: 10:00 - 22:00", 1.3025, 103.8378,
                          "orchard.bc@adidas.com",
                          "MakerLab Singapore Edition, Dịch vụ chăm sóc giày Crep Protect Sneaker Services, Đấu trường trải nghiệm thể thao ảo Home of Sport",
                          "Đầy đủ bộ sưu tập Stella McCartney, Terrex Outdoor, Originals Terrace, Ultraboost, Phụ kiện bóng đá & bơi lội",
                          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
                          "[\"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop\", \"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop\"]",
                          "https://www.adidas.com.sg/stores/orchard")
            );
            storeRepository.saveAll(adidasAsianStores);
        }
    }
}
