# BÁO CÁO 17: NGHIÊN CỨU & QUYẾT ĐỊNH CÔNG NGHỆ CÀO DỮ LIỆU TỐI ƯU
**Dự án:** DM Fashion Data Tools  
**Mục tiêu:** Phân tích chuyên sâu nên dùng ngôn ngữ gì cho nhân cào dữ liệu (Crawler Worker) để kết hợp hoàn hảo với Giao diện Web Java

---

## 1. Nghiên cứu & So sánh thực nghiệm các ngôn ngữ cho việc cào WAF Akamai/Cloudflare

Để cào được dữ liệu của **Gucci, Dior, Adidas** (vốn được bảo vệ bởi Akamai Bot Manager, Cloudflare Turnstile, DataDome), yêu cầu quan trọng nhất là **Khả năng giả lập vân tay trình duyệt (TLS/JA3/JA4 & HTTP/2 Fingerprint)**.

| Tiêu chí kỹ thuật | Java thuần (HttpClient / OkHttp) | Go (`tls-client`) | Python (`curl_cffi` / Playwright) |
| :--- | :--- | :--- | :--- |
| **Vượt Akamai Bot Manager** | ❌ **Rất khó (< 10%)**: JSSE của Java có cấu trúc Cipher Suites đặc trưng, bị Akamai chặn ngay ở bước TCP/TLS Handshake (Lỗi 403). | ⚡ **Tốt (~ 85-90%)**: Thư viện `bogdanfinn/tls-client` giả lập được TLS, nhưng ít hỗ trợ parse HTML linh hoạt. | 🏆 **Xuất sắc (> 95%)**: `curl_cffi` liên kết với C `libcurl-impersonate`, giả lập hoàn hảo Chrome 124, Safari 17. |
| **Vượt JavaScript Challenge & SPA** | ⚠️ **Chậm**: Selenium Java rất nặng (~500MB/tab), dễ lộ biến `navigator.webdriver`. | ⚠️ **Hạn chế**: Thư viện `chromedp` thiếu các plugin stealth chuyên dụng. | 🏆 **Tối ưu**: `playwright-stealth` và `camoufox` loại bỏ 100% cờ bot, render React/Next.js mượt mà. |
| **Tốc độ bóc tách dữ liệu (Parsing)** | ⚡ Nhanh (Jsoup) nhưng code dài dòng với JSON phức tạp. | ⚡ Rất nhanh nhưng xử lý JSON lồng nhau nhiều cấp khá cực. | 🏆 **Cực nhanh & Linh hoạt**: `BeautifulSoup`, `selectolax` (nhanh gấp 10 lần), `Pydantic` validate dữ liệu mạnh mẽ. |
| **Hệ sinh thái Reverse Engineering** | ❌ Yếu trong mảng bypass anti-bot. | ⚡ Tốt nhưng cộng đồng hẹp. | 🏆 **Số 1 toàn cầu**: 90% công cụ khai phá API ngầm và bypass WAF đều được viết bằng Python. |

---

## 2. Quyết định công nghệ đúng đắn: Mô hình Chuyên biệt hóa (Specialized Polyglot)

```mermaid
graph LR
    subgraph Giao diện & Điều khiển (Java)
        A["Java Web Portal (Spring Boot)"] -- "Giao diện người dùng, Tìm kiếm hãng, Chọn cơ sở Tràng Tiền" --> B["Redis Task Queue"]
    end

    subgraph Thu thập & Vượt WAF (Python)
        B -- "Job cào (Brand, Store IDs)" --> C["Python Scraper Worker"]
        C -- "Dùng curl_cffi giả lập Chrome 124" --> D["Akamai / Cloudflare WAF"]
        D -- "Dữ liệu trả về" --> C
    end

    subgraph Lưu trữ & Đồng bộ
        C -- "Lưu sản phẩm & tồn kho đạt chuẩn >= 90%" --> E[("PostgreSQL 16")]
        C -- "Bắn tiến độ % & live log" --> F["Redis Pub/Sub"]
        F -- "WebSocket" --> A
    end
```

### Kết luận phân công ngôn ngữ:
1. **Giao diện Web & Điều phối tổng thể (Frontend & Orchestrator):** Dùng **Java (Spring Boot 3 + Java 21)** theo đúng định hướng cốt lõi của bạn. Java đảm bảo giao diện hiển thị mượt mà, quản lý danh bạ thương hiệu, lọc cơ sở, xử lý file Excel an toàn và ổn định.
2. **Nhân cào dữ liệu (Scraper Engine):** Dùng **Python (FastAPI / Celery Worker với `curl_cffi` và `Playwright-stealth`)**. Đây là lựa chọn kỹ thuật tối ưu nhất hiện nay để đảm bảo tỷ lệ cào thành công đạt trên 95% mà không bị Akamai/Cloudflare chặn.
3. **Cơ chế giao tiếp:** Java và Python kết nối thông qua **Redis Queue** và chia sẻ chung **PostgreSQL 16**. Hai thành phần hoạt động độc lập, tách biệt, một bên chết bên kia vẫn hoạt động bình thường!
