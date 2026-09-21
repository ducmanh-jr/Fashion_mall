# BÁO CÁO 29: DEPLOYMENT, CONTAINERIZATION & CI/CD (KIẾN TRÚC TRIỂN KHAI ĐA NGÔN NGỮ)
**Dự án:** DM Fashion Data Tools  
**Mục tiêu:** Đóng gói trọn bộ hệ thống gồm Giao diện Web Java + Worker Cào Python + CSDL PostgreSQL & Redis thành cụm Docker Compose chuẩn chạy được trên mọi máy tính/máy chủ chỉ với một lệnh

---

## 1. Sơ đồ kiến trúc cụm Container (Container Topology)

```mermaid
graph TD
    User["Trình duyệt Người dùng"] --> Nginx["Nginx Reverse Proxy (Cổng 80)"]
    
    subgraph Docker Network [fashion-internal-net]
        Nginx -->|"Giao diện Web & API (/)"| JavaApp["1. Java Web Portal (Spring Boot 3, Cổng 8080)"]
        JavaApp --> Redis["3. Redis 7 (Task Queue & Live Progress)"]
        JavaApp --> Postgres[("4. PostgreSQL 16 Master DB")]
        
        PythonWorker["2. Python Scraper Engine (curl_cffi Worker)"] --> Redis
        PythonWorker --> Postgres
        PythonWorker --> Minio[("5. MinIO Image Cache (Tùy chọn)")]
    end
```

---

## 2. File cấu hình Docker Compose hoàn chỉnh (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  # 1. Cơ sở dữ liệu PostgreSQL 16
  postgres:
    image: postgres:16-alpine
    container_name: fashion_postgres
    restart: always
    environment:
      POSTGRES_DB: fashion_crawler_db
      POSTGRES_USER: crawler_user
      POSTGRES_PASSWORD: SecureCrawlerPassword2026!
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  # 2. Redis 7: Hàng đợi tác vụ & Bắn tiến độ WebSocket
  redis:
    image: redis:7-alpine
    container_name: fashion_redis
    restart: always
    ports:
      - "6379:6379"

  # 3. Giao diện Web chính bằng Java (Spring Boot 3, Java 21)
  java-web:
    build:
      context: ./backend-java
      dockerfile: Dockerfile
    container_name: fashion_java_web
    restart: always
    depends_on:
      - postgres
      - redis
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/fashion_crawler_db
      SPRING_DATASOURCE_USERNAME: crawler_user
      SPRING_DATASOURCE_PASSWORD: SecureCrawlerPassword2026!
      SPRING_DATA_REDIS_HOST: redis

  # 4. Nhân cào dữ liệu chuyên dụng bằng Python (curl_cffi / Playwright)
  python-scraper:
    build:
      context: ./scraper-python
      dockerfile: Dockerfile
    container_name: fashion_python_worker
    restart: always
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://crawler_user:SecureCrawlerPassword2026!@postgres:5432/fashion_crawler_db
      REDIS_URL: redis://redis:6379/0

volumes:
  pgdata:
```

---

## 3. Quy trình khởi chạy 1 chạm cho người dùng
Chỉ cần mở terminal tại thư mục dự án và gõ:
```bash
docker compose up -d --build
```
Hệ thống sẽ tự động build ứng dụng Java, khởi chạy worker Python, tạo bảng cơ sở dữ liệu PostgreSQL và mở cổng `http://localhost:8080` để người dùng truy cập giao diện web ngay lập tức!
