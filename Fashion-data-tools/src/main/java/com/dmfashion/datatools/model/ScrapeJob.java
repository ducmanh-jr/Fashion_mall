package com.dmfashion.datatools.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scrape_jobs")
public class ScrapeJob {

    @Id
    @Column(name = "job_id", length = 64)
    private String jobId;

    @Column(name = "brand_id", length = 32, nullable = false)
    private String brandId;

    @Column(name = "brand_name", length = 128)
    private String brandName;

    @Column(name = "selected_stores", columnDefinition = "TEXT")
    private String selectedStores; // Comma or JSON array

    @Column(name = "status", length = 32, nullable = false)
    private String status; // QUEUED, RUNNING, PAUSED, COMPLETED, FAILED

    @Column(name = "total_discovered")
    private int totalDiscovered = 0;

    @Column(name = "total_scraped")
    private int totalScraped = 0;

    @Column(name = "total_quarantined")
    private int totalQuarantined = 0;

    @Column(name = "avg_quality_score")
    private Double avgQualityScore = 95.0;

    @Column(name = "current_log", length = 500)
    private String currentLog;

    @Column(name = "started_at")
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "finished_at")
    private LocalDateTime finishedAt;

    public ScrapeJob() {}

    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }
    public String getBrandId() { return brandId; }
    public void setBrandId(String brandId) { this.brandId = brandId; }
    public String getBrandName() { return brandName; }
    public void setBrandName(String brandName) { this.brandName = brandName; }
    public String getSelectedStores() { return selectedStores; }
    public void setSelectedStores(String selectedStores) { this.selectedStores = selectedStores; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getTotalDiscovered() { return totalDiscovered; }
    public void setTotalDiscovered(int totalDiscovered) { this.totalDiscovered = totalDiscovered; }
    public int getTotalScraped() { return totalScraped; }
    public void setTotalScraped(int totalScraped) { this.totalScraped = totalScraped; }
    public int getTotalQuarantined() { return totalQuarantined; }
    public void setTotalQuarantined(int totalQuarantined) { this.totalQuarantined = totalQuarantined; }
    public Double getAvgQualityScore() { return avgQualityScore; }
    public void setAvgQualityScore(Double avgQualityScore) { this.avgQualityScore = avgQualityScore; }
    public String getCurrentLog() { return currentLog; }
    public void setCurrentLog(String currentLog) { this.currentLog = currentLog; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    public LocalDateTime getFinishedAt() { return finishedAt; }
    public void setFinishedAt(LocalDateTime finishedAt) { this.finishedAt = finishedAt; }
}
