# BÁO CÁO 22: RATE LIMITING, BACKOFF & ANTI-BAN HANDLING IN JAVA
**Dự án:** DM Fashion Data Tools (Java Web System)  
**Công nghệ:** Resilience4j, Bucket4j, Exponential Backoff with Jitter

---

## 1. Mục đích
Hệ thống phòng thủ của các thương hiệu thời trang cao cấp thường theo dõi tần suất gửi yêu cầu mạng (Request Cadence). Nếu một IP gửi các request đều tăm tắp cứ đúng 1.0 giây/lần, hệ thống AI của Akamai sẽ nhận diện ngay đó là bot. Để tránh bị cấm IP (Anti-Ban) và bảo vệ độ tin cậy của tool, cần phải áp dụng kỹ thuật kiểm soát tốc độ thích ứng (Adaptive Rate Limiting).

---

## 2. Các cơ chế phòng vệ chống khóa IP trong Java

### 2.1. Exponential Backoff with Full Jitter
Khi gặp lỗi mạng tạm thời hoặc phản hồi mã HTTP `429 Too Many Requests`:
- Thay vì thử lại ngay, hệ thống sẽ tạm dừng với công thức tính thời gian chờ tăng theo cấp số nhân kết hợp nhiễu ngẫu nhiên (Jitter):
  $$\text{Sleep Time} = \text{Random}(0, \; \min(\text{MaxDelay}, \; \text{BaseDelay} \times 2^{\text{attempt}}))$$
- Giúp phân tán tải và tránh tạo hiệu ứng sập hàng loạt (Thundering Herd Problem).

### 2.2. Human-like Delays (Mô phỏng nhịp thở con người)
Trước mỗi lần gửi yêu cầu xem sản phẩm mới hoặc kiểm tra kho chi nhánh tiếp theo, Java Thread sẽ chèn một khoảng trễ ngẫu nhiên:
```java
// Giả lập thời gian đọc của con người: từ 1.2 đến 2.8 giây ngẫu nhiên
long delayMillis = ThreadLocalRandom.current().nextLong(1200, 2800);
Thread.sleep(delayMillis);
```

---

## 3. Ứng dụng Resilience4j Circuit Breaker trong Spring Boot

```java
@Configuration
public class CrawlerResilienceConfig {

    @Bean
    public CircuitBreakerRegistry circuitBreakerRegistry() {
        CircuitBreakerConfig config = CircuitBreakerConfig.custom()
            .failureRateThreshold(30.0f) // Nếu tỷ lệ lỗi > 30% thì ngắt mạch
            .waitDurationInOpenState(Duration.ofSeconds(60)) // Chờ 60s trước khi thử lại
            .slidingWindowSize(20)
            .build();
        return CircuitBreakerRegistry.of(config);
    }
}
```
Khi WAF của một hãng bắt đầu kích hoạt tường lửa hàng loạt, Circuit Breaker lập tức chuyển sang trạng thái `OPEN`, tự động tạm dừng job và gửi cảnh báo cho người dùng trên Web UI thay vì tiếp tục gửi request gây cháy proxy.
