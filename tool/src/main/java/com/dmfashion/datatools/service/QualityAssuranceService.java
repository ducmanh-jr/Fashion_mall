package com.dmfashion.datatools.service;

import com.dmfashion.datatools.model.Product;
import com.dmfashion.datatools.model.QuarantineRecord;
import com.dmfashion.datatools.repository.QuarantineRecordRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class QualityAssuranceService {

    private final QuarantineRecordRepository quarantineRepository;

    public QualityAssuranceService(QuarantineRecordRepository quarantineRepository) {
        this.quarantineRepository = quarantineRepository;
    }

    public static class ValidationResult {
        private final boolean passed;
        private final double score;
        private final String violationCode;
        private final String reason;

        public ValidationResult(boolean passed, double score, String violationCode, String reason) {
            this.passed = passed;
            this.score = score;
            this.violationCode = violationCode;
            this.reason = reason;
        }

        public boolean isPassed() { return passed; }
        public double getScore() { return score; }
        public String getViolationCode() { return violationCode; }
        public String getReason() { return reason; }
    }

    public ValidationResult validateProduct(Product product, String jobId) {
        double score = 100.0;
        String violationCode = null;
        StringBuilder reason = new StringBuilder();

        // Check 1: Mandatory identity
        if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            score -= 40;
            violationCode = "MISSING_NAME";
            reason.append("Tên sản phẩm bị rỗng. ");
        }

        if (product.getSku() == null || product.getSku().trim().isEmpty()) {
            score -= 20;
            if (violationCode == null) violationCode = "MISSING_SKU";
            reason.append("Mã SKU bị thiếu. ");
        }

        // Check 2: Pricing validity
        if (product.getPriceVnd() == null || product.getPriceVnd().compareTo(BigDecimal.ZERO) <= 0) {
            score -= 35;
            if (violationCode == null) violationCode = "INVALID_PRICE";
            reason.append("Giá bán không hợp lệ hoặc bằng 0. ");
        }

        // Check 3: Media Integrity
        if (product.getPrimaryImageUrl() == null || product.getPrimaryImageUrl().trim().isEmpty() ||
            !product.getPrimaryImageUrl().startsWith("http")) {
            score -= 25;
            if (violationCode == null) violationCode = "INVALID_IMAGE";
            reason.append("URL hình ảnh không hợp lệ hoặc bị thiếu. ");
        }

        // Check 4: Material & Specs
        if (product.getMaterial() == null || product.getMaterial().trim().isEmpty()) {
            score -= 5;
        }

        if (product.getDimensions() == null || product.getDimensions().trim().isEmpty()) {
            score -= 5;
        }

        // Normalize score between 0 and 100
        score = Math.max(0.0, Math.min(100.0, score));
        product.setQualityScore(score);

        boolean passed = score >= 90.0;
        product.setQuarantined(!passed);

        if (!passed) {
            QuarantineRecord record = new QuarantineRecord(
                jobId,
                product.getBrandId(),
                product.getSku(),
                product.getProductName(),
                violationCode != null ? violationCode : "LOW_QUALITY_SCORE",
                reason.toString(),
                score,
                "Price: " + product.getPriceVnd() + ", Image: " + product.getPrimaryImageUrl()
            );
            quarantineRepository.save(record);
        }

        return new ValidationResult(passed, score, violationCode, reason.toString());
    }
}
