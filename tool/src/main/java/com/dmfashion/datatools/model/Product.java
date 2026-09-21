package com.dmfashion.datatools.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @Column(name = "product_id", length = 128)
    private String productId;

    @Column(name = "brand_id", length = 32, nullable = false)
    private String brandId;

    @Column(name = "sku", length = 64)
    private String sku;

    @Column(name = "product_name", nullable = false, length = 500)
    private String productName;

    @Column(name = "category", length = 128)
    private String category;

    @Column(name = "price_vnd", precision = 15, scale = 2)
    private BigDecimal priceVnd;

    @Column(name = "price_original", precision = 15, scale = 2)
    private BigDecimal priceOriginal;

    @Column(name = "currency", length = 8)
    private String currency;

    @Column(name = "color", length = 128)
    private String color;

    @Column(name = "size", length = 64)
    private String size;

    @Column(name = "material", length = 500)
    private String material;

    @Column(name = "dimensions", length = 500)
    private String dimensions;

    @Column(name = "country_of_origin", length = 256)
    private String countryOfOrigin;

    @Column(name = "primary_image_url", length = 1000)
    private String primaryImageUrl;

    @Column(name = "gallery_urls_json", columnDefinition = "TEXT")
    private String galleryUrlsJson;

    @Column(name = "product_url", length = 1000)
    private String productUrl;

    @Column(name = "collection_name", length = 256)
    private String collectionName; // e.g. "Gucci Ancora 2024 / Fall-Winter"

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "hardware_color", length = 256)
    private String hardwareColor; // e.g. "Gold-toned hardware", "Palladium-toned finish"

    @Column(name = "lining_material", length = 500)
    private String liningMaterial; // e.g. "Microfiber lining with a suede-like finish"

    @Column(name = "strap_drop", length = 256)
    private String strapDrop; // e.g. "50 cm drop, adjustable from 45 to 55 cm"

    @Column(name = "packaging_details", length = 1000)
    private String packagingDetails; // e.g. "Signature Magnetic Hard Box, Dust Bag, Authenticity Card with RFID"

    @Column(name = "care_instructions", length = 1000)
    private String careInstructions; // e.g. "Protect from direct light, heat and rain. Clean with a soft, dry cloth."

    @Column(name = "quality_score")
    private Double qualityScore = 95.0;

    @Column(name = "is_quarantined")
    private boolean quarantined = false;

    @Column(name = "scraped_at")
    private LocalDateTime scrapedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<StoreInventory> inventories = new ArrayList<>();

    public Product() {}

    // Getters and Setters
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getBrandId() { return brandId; }
    public void setBrandId(String brandId) { this.brandId = brandId; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public BigDecimal getPriceVnd() { return priceVnd; }
    public void setPriceVnd(BigDecimal priceVnd) { this.priceVnd = priceVnd; }
    public BigDecimal getPriceOriginal() { return priceOriginal; }
    public void setPriceOriginal(BigDecimal priceOriginal) { this.priceOriginal = priceOriginal; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }
    public String getCountryOfOrigin() { return countryOfOrigin; }
    public void setCountryOfOrigin(String countryOfOrigin) { this.countryOfOrigin = countryOfOrigin; }
    public String getPrimaryImageUrl() { return primaryImageUrl; }
    public void setPrimaryImageUrl(String primaryImageUrl) { this.primaryImageUrl = primaryImageUrl; }
    public String getGalleryUrlsJson() { return galleryUrlsJson; }
    public void setGalleryUrlsJson(String galleryUrlsJson) { this.galleryUrlsJson = galleryUrlsJson; }
    public String getProductUrl() { return productUrl; }
    public void setProductUrl(String productUrl) { this.productUrl = productUrl; }
    public String getCollectionName() { return collectionName; }
    public void setCollectionName(String collectionName) { this.collectionName = collectionName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getHardwareColor() { return hardwareColor; }
    public void setHardwareColor(String hardwareColor) { this.hardwareColor = hardwareColor; }
    public String getLiningMaterial() { return liningMaterial; }
    public void setLiningMaterial(String liningMaterial) { this.liningMaterial = liningMaterial; }
    public String getStrapDrop() { return strapDrop; }
    public void setStrapDrop(String strapDrop) { this.strapDrop = strapDrop; }
    public String getPackagingDetails() { return packagingDetails; }
    public void setPackagingDetails(String packagingDetails) { this.packagingDetails = packagingDetails; }
    public String getCareInstructions() { return careInstructions; }
    public void setCareInstructions(String careInstructions) { this.careInstructions = careInstructions; }
    public Double getQualityScore() { return qualityScore; }
    public void setQualityScore(Double qualityScore) { this.qualityScore = qualityScore; }
    public boolean isQuarantined() { return quarantined; }
    public void setQuarantined(boolean quarantined) { this.quarantined = quarantined; }
    public LocalDateTime getScrapedAt() { return scrapedAt; }
    public void setScrapedAt(LocalDateTime scrapedAt) { this.scrapedAt = scrapedAt; }
    public List<StoreInventory> getInventories() { return inventories; }
    public void setInventories(List<StoreInventory> inventories) { this.inventories = inventories; }
}
