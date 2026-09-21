package com.dmfashion.datatools.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "brand_stores")
public class Store {

    @Id
    @Column(name = "store_id", length = 64)
    private String storeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    @JsonIgnore
    private Brand brand;

    @Column(name = "store_name", nullable = false)
    private String storeName;

    @Column(name = "city", length = 64)
    private String city;

    @Column(name = "country_code", length = 8)
    private String countryCode;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "phone", length = 64)
    private String phone;

    @Column(name = "store_type", length = 64)
    private String storeType; // Flagship Boutique, Department Store, Concept Store

    @Column(name = "operating_hours", length = 256)
    private String operatingHours; // e.g. "T2 - CN: 09:30 - 21:30"

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "email", length = 128)
    private String email;

    @Column(name = "services", length = 500)
    private String services; // Dịch vụ: Đặt hẹn riêng, Dập chữ cá nhân hóa, Bảo dưỡng đồ da...

    @Column(name = "categories", length = 500)
    private String categories; // Ngành hàng: Túi xách, Giày dép, Trang sức, Thời trang may sẵn...

    @Column(name = "store_image_url", length = 1000)
    private String storeImageUrl;

    @Column(name = "store_gallery_json", columnDefinition = "TEXT")
    private String storeGalleryJson;

    @Column(name = "store_url", length = 1000)
    private String storeUrl;

    public Store() {}

    public Store(String storeId, Brand brand, String storeName, String city, String countryCode, String address, String phone) {
        this.storeId = storeId;
        this.brand = brand;
        this.storeName = storeName;
        this.city = city;
        this.countryCode = countryCode;
        this.address = address;
        this.phone = phone;
    }

    public Store(String storeId, Brand brand, String storeName, String city, String countryCode, String address, String phone,
                 String storeType, String operatingHours, Double latitude, Double longitude, String email,
                 String services, String categories, String storeImageUrl, String storeUrl) {
        this(storeId, brand, storeName, city, countryCode, address, phone, storeType, operatingHours, latitude, longitude, email, services, categories, storeImageUrl, null, storeUrl);
    }

    public Store(String storeId, Brand brand, String storeName, String city, String countryCode, String address, String phone,
                 String storeType, String operatingHours, Double latitude, Double longitude, String email,
                 String services, String categories, String storeImageUrl, String storeGalleryJson, String storeUrl) {
        this.storeId = storeId;
        this.brand = brand;
        this.storeName = storeName;
        this.city = city;
        this.countryCode = countryCode;
        this.address = address;
        this.phone = phone;
        this.storeType = storeType;
        this.operatingHours = operatingHours;
        this.latitude = latitude;
        this.longitude = longitude;
        this.email = email;
        this.services = services;
        this.categories = categories;
        this.storeImageUrl = storeImageUrl;
        this.storeGalleryJson = storeGalleryJson;
        this.storeUrl = storeUrl;
    }

    public String getStoreId() { return storeId; }
    public void setStoreId(String storeId) { this.storeId = storeId; }
    public Brand getBrand() { return brand; }
    public void setBrand(Brand brand) { this.brand = brand; }
    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getCountryCode() { return countryCode; }
    public void setCountryCode(String countryCode) { this.countryCode = countryCode; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getStoreType() { return storeType; }
    public void setStoreType(String storeType) { this.storeType = storeType; }
    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
    public String getCategories() { return categories; }
    public void setCategories(String categories) { this.categories = categories; }
    public String getStoreImageUrl() { return storeImageUrl; }
    public void setStoreImageUrl(String storeImageUrl) { this.storeImageUrl = storeImageUrl; }
    public String getStoreGalleryJson() { return storeGalleryJson; }
    public void setStoreGalleryJson(String storeGalleryJson) { this.storeGalleryJson = storeGalleryJson; }
    public String getStoreUrl() { return storeUrl; }
    public void setStoreUrl(String storeUrl) { this.storeUrl = storeUrl; }
}
