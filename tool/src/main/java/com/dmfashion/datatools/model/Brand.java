package com.dmfashion.datatools.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fashion_brands")
public class Brand {

    @Id
    @Column(name = "brand_id", length = 32)
    private String brandId;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "aliases")
    private String aliases; // Comma separated

    @Column(name = "country", length = 64)
    private String country;

    @Column(name = "segment", length = 64)
    private String segment;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "is_active")
    private boolean active = true;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Store> stores = new ArrayList<>();

    public Brand() {}

    public Brand(String brandId, String displayName, String country, String segment, String aliases, String logoUrl) {
        this.brandId = brandId;
        this.displayName = displayName;
        this.country = country;
        this.segment = segment;
        this.aliases = aliases;
        this.logoUrl = logoUrl;
        this.active = true;
    }

    public String getBrandId() { return brandId; }
    public void setBrandId(String brandId) { this.brandId = brandId; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getAliases() { return aliases; }
    public void setAliases(String aliases) { this.aliases = aliases; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getSegment() { return segment; }
    public void setSegment(String segment) { this.segment = segment; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public List<Store> getStores() { return stores; }
    public void setStores(List<Store> stores) { this.stores = stores; }
}
