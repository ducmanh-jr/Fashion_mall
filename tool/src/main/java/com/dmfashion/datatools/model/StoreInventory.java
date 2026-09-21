package com.dmfashion.datatools.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "store_inventories")
public class StoreInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

    @Column(name = "store_id", length = 64, nullable = false)
    private String storeId;

    @Column(name = "store_name", length = 128)
    private String storeName;

    @Column(name = "stock_status", length = 32, nullable = false)
    private String stockStatus; // IN_STOCK, OUT_OF_STOCK, FEW_PIECES, CALL_BOUTIQUE

    @Column(name = "available_qty")
    private Integer availableQty;

    @Column(name = "last_checked_at")
    private LocalDateTime lastCheckedAt = LocalDateTime.now();

    public StoreInventory() {}

    public StoreInventory(Product product, String storeId, String storeName, String stockStatus, Integer availableQty) {
        this.product = product;
        this.storeId = storeId;
        this.storeName = storeName;
        this.stockStatus = stockStatus;
        this.availableQty = availableQty;
        this.lastCheckedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public String getStoreId() { return storeId; }
    public void setStoreId(String storeId) { this.storeId = storeId; }
    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }
    public String getStockStatus() { return stockStatus; }
    public void setStockStatus(String stockStatus) { this.stockStatus = stockStatus; }
    public Integer getAvailableQty() { return availableQty; }
    public void setAvailableQty(Integer availableQty) { this.availableQty = availableQty; }
    public LocalDateTime getLastCheckedAt() { return lastCheckedAt; }
    public void setLastCheckedAt(LocalDateTime lastCheckedAt) { this.lastCheckedAt = lastCheckedAt; }
}
