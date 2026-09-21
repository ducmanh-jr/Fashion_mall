# BÁO CÁO 13: MULTI-STOREFRONT SELECTIVE SCRAPING ENGINE (ĐIỀU PHỐI CÀO THEO CHI NHÁNH)
**Dự án:** DM Fashion Data Tools (Java Web System)  
**Mục tiêu:** Cho phép người dùng tùy biến cào 1 chi nhánh hoặc chọn nhiều chi nhánh cùng một lúc mà không bị nghẽn mạng hay trùng lặp tác vụ

---

## 1. Mục đích & Nghiệp vụ trọng tâm
Người dùng có nhu cầu rất linh hoạt:
- **Tình huống A:** Chỉ muốn cào kiểm tra tồn kho & giá của đúng **1 cửa hàng** (ví dụ: `Gucci Tràng Tiền Plaza`) để phục vụ khách mua trực tiếp tại Hà Nội.
- **Tình huống B:** Muốn cào **nhiều cửa hàng được chọn** (ví dụ: `Gucci Tràng Tiền Plaza` + `Gucci Sheraton Sài Gòn`).
- **Tình huống C:** Muốn cào **toàn bộ chi nhánh trên cả nước hoặc toàn cầu** để phân tích mạng lưới phân phối.

Hệ thống điều phối (Scraping Orchestrator) viết bằng Java phải đủ thông minh để:
1. Không lặp lại việc cào thông tin tĩnh của sản phẩm (ảnh, chất liệu, kích thước giống nhau giữa các cửa hàng).
2. Tách lớp tác vụ: **Master Data Scraper** (chỉ chạy 1 lần lấy danh mục và mô tả sản phẩm) và **Store Stock Prober** (chạy song song cho từng chi nhánh được chọn).

---

## 2. Kiến trúc 2 Pha (Two-Phase Crawling Pattern)

```mermaid
flowchart TD
    JobInit["Người dùng chọn: Gucci + [Tràng Tiền Plaza, Sheraton SG]"] --> Phase1["PHA 1: Catalog & Master Data Harvester"]
    
    subgraph Master Scraper [Chỉ cào 1 lần duy nhất]
        Phase1 --> FetchCatalog["Lấy toàn bộ Product List / Style IDs"]
        FetchCatalog --> ExtractMaster["Bóc tách: Tên, Ảnh, Giá niêm yết, Bảng size"]
        ExtractMaster --> SaveMaster["Lưu vào bảng product_master"]
    end

    SaveMaster --> Phase2["PHA 2: Store Inventory Fan-out"]

    subgraph Store Prober [Chạy song song theo Store đã chọn]
        Phase2 --> Worker1["Worker Chi nhánh 1: Tràng Tiền Plaza (Store ID: VN01)"]
        Phase2 --> Worker2["Worker Chi nhánh 2: Sheraton Sài Gòn (Store ID: VN02)"]
        Worker1 --> StoreStock1["Gọi API kiểm tra hàng tại Tràng Tiền"]
        Worker2 --> StoreStock2["Gọi API kiểm tra hàng tại Sheraton"]
    end

    StoreStock1 --> SaveStoreInventory["Lưu vào bảng store_inventory_status"]
    StoreStock2 --> SaveStoreInventory
    SaveStoreInventory --> CompleteJob["Báo cáo hoàn thành tiến trình cào"]
```

---

## 3. Lợi ích vượt trội của mô hình 2 pha trong Java
1. **Tiết kiệm 70% băng thông và yêu cầu mạng:** Không phải tải lại hình ảnh hay parse HTML lặp lại cho từng cửa hàng.
2. **Tránh bị WAF khóa IP:** Việc kiểm tra tồn kho chi nhánh thường chỉ là các gói tin JSON nhẹ (`GET /stock?sku=...&storeId=VN01`), gửi nhanh và ít tốn tài nguyên.
3. **Dễ dàng mở rộng (Scalability):** Nếu người dùng tích chọn 20 chi nhánh, Java Virtual Threads (Project Loom trong Java 21) có thể kích hoạt 20 coroutine/virtual thread đồng thời thăm dò kho mà không tốn nhiều RAM.

---

## 4. Cấu trúc Job Request DTO trong Spring Boot

```java
public record CreateScrapeJobRequest(
    @NotBlank String brandId,                       // e.g. "gucci"
    @NotEmpty List<String> selectedStoreIds,       // e.g. ["VN01", "VN02"]
    boolean scrapeMasterData,                      // Có cần cào lại ảnh, mô tả không
    boolean highResolutionMedia,                   // Tải ảnh gốc 4K không
    int maxProductsLimit,                          // Giới hạn số lượng (0 = toàn bộ)
    Priority priority                              // NORMAL, HIGH
) {}
```
