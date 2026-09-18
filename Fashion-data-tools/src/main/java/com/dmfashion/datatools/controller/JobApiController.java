package com.dmfashion.datatools.controller;

import com.dmfashion.datatools.model.Product;
import com.dmfashion.datatools.model.QuarantineRecord;
import com.dmfashion.datatools.model.ScrapeJob;
import com.dmfashion.datatools.repository.ProductRepository;
import com.dmfashion.datatools.repository.QuarantineRecordRepository;
import com.dmfashion.datatools.repository.ScrapeJobRepository;
import com.dmfashion.datatools.service.ScrapingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApiController {

    private final ScrapingService scrapingService;
    private final ScrapeJobRepository jobRepository;
    private final ProductRepository productRepository;
    private final QuarantineRecordRepository quarantineRepository;

    public JobApiController(ScrapingService scrapingService,
                            ScrapeJobRepository jobRepository,
                            ProductRepository productRepository,
                            QuarantineRecordRepository quarantineRepository) {
        this.scrapingService = scrapingService;
        this.jobRepository = jobRepository;
        this.productRepository = productRepository;
        this.quarantineRepository = quarantineRepository;
    }

    public static record StartJobPayload(
        String brandId,
        String brandName,
        List<String> storeIds,
        int limit
    ) {}

    @PostMapping("/start")
    public ResponseEntity<ScrapeJob> startJob(@RequestBody StartJobPayload payload) {
        ScrapeJob job = scrapingService.startJob(new ScrapingService.StartJobRequest(
            payload.brandId(),
            payload.brandName(),
            payload.storeIds() != null ? payload.storeIds() : List.of(),
            payload.limit() > 0 ? payload.limit() : 10
        ));
        return ResponseEntity.ok(job);
    }

    @GetMapping("/latest")
    public ResponseEntity<ScrapeJob> getLatestJob() {
        return jobRepository.findTopByOrderByStartedAtDesc()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(value = "brandId", required = false) String brandId,
            @RequestParam(value = "keyword", required = false) String keyword) {
        List<Product> list = productRepository.filterProducts(
            (brandId != null && !brandId.isBlank()) ? brandId : null,
            (keyword != null && !keyword.isBlank()) ? keyword : null
        );
        return ResponseEntity.ok(list);
    }

    @GetMapping("/quarantine")
    public ResponseEntity<List<QuarantineRecord>> getQuarantine() {
        return ResponseEntity.ok(quarantineRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping("/clear")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<java.util.Map<String, String>> clearAllData() {
        productRepository.deleteAll();
        jobRepository.deleteAll();
        quarantineRepository.deleteAll();
        return ResponseEntity.ok(java.util.Map.of("status", "SUCCESS", "message", "Đã xóa sạch toàn bộ dữ liệu cào cũ"));
    }
}
