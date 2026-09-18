package com.dmfashion.datatools.repository;

import com.dmfashion.datatools.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, String> {
    List<Store> findByBrand_BrandId(String brandId);
    List<Store> findByBrand_BrandIdAndCountryCode(String brandId, String countryCode);
}
