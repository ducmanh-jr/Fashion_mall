package com.dmfashion.datatools.service;

import com.dmfashion.datatools.model.Brand;
import com.dmfashion.datatools.model.Store;
import com.dmfashion.datatools.repository.BrandRepository;
import com.dmfashion.datatools.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    private final BrandRepository brandRepository;
    private final StoreRepository storeRepository;

    public BrandService(BrandRepository brandRepository, StoreRepository storeRepository) {
        this.brandRepository = brandRepository;
        this.storeRepository = storeRepository;
    }

    public List<Brand> searchBrands(String query) {
        if (query == null || query.trim().isEmpty()) {
            return brandRepository.findAll().stream().limit(10).toList();
        }
        return brandRepository.searchBrands(query.trim());
    }

    public Optional<Brand> getBrand(String brandId) {
        return brandRepository.findById(brandId);
    }

    public List<Store> getStoresByBrand(String brandId) {
        return storeRepository.findByBrand_BrandId(brandId);
    }

    public List<Store> getStoresByBrandAndCountry(String brandId, String countryCode) {
        return storeRepository.findByBrand_BrandIdAndCountryCode(brandId, countryCode);
    }
}
