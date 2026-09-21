package com.dmfashion.datatools.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quarantine_records")
public class QuarantineRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_id", length = 64)
    private String jobId;

    @Column(name = "brand_id", length = 32)
    private String brandId;

    @Column(name = "sku", length = 64)
    private String sku;

    @Column(name = "product_name", length = 256)
    private String productName;

    @Column(name = "violation_code", length = 64, nullable = false)
    private String violationCode; // PRICE_ZERO, MISSING_IMAGE, UNKNOWN_CURRENCY, CORRUPTED_DATA

    @Column(name = "violation_reason", length = 500)
    private String violationReason;

    @Column(name = "quality_score")
    private Double qualityScore;

    @Column(name = "raw_payload", columnDefinition = "TEXT")
    private String rawPayload;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public QuarantineRecord() {}

    public QuarantineRecord(String jobId, String brandId, String sku, String productName, String violationCode, String violationReason, Double qualityScore, String rawPayload) {
        this.jobId = jobId;
        this.brandId = brandId;
        this.sku = sku;
        this.productName = productName;
        this.violationCode = violationCode;
        this.violationReason = violationReason;
        this.qualityScore = qualityScore;
        this.rawPayload = rawPayload;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }
    public String getBrandId() { return brandId; }
    public void setBrandId(String brandId) { this.brandId = brandId; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getViolationCode() { return violationCode; }
    public void setViolationCode(String violationCode) { this.violationCode = violationCode; }
    public String getViolationReason() { return violationReason; }
    public void setViolationReason(String violationReason) { this.violationReason = violationReason; }
    public Double getQualityScore() { return qualityScore; }
    public void setQualityScore(Double qualityScore) { this.qualityScore = qualityScore; }
    public String getRawPayload() { return rawPayload; }
    public void setRawPayload(String rawPayload) { this.rawPayload = rawPayload; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
