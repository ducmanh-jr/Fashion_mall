package com.dmfashion.datatools.controller;

import com.dmfashion.datatools.model.Brand;
import com.dmfashion.datatools.model.Store;
import com.dmfashion.datatools.service.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandApiController {

    private final BrandService brandService;

    public BrandApiController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/suggest")
    public ResponseEntity<List<Brand>> suggest(@RequestParam(value = "q", defaultValue = "") String query) {
        List<Brand> brands = brandService.searchBrands(query);
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/{brandId}/stores")
    public ResponseEntity<List<Store>> getStores(
            @PathVariable("brandId") String brandId,
            @RequestParam(value = "country", required = false) String country) {
        List<Store> stores;
        if (country != null && !country.isEmpty()) {
            stores = brandService.getStoresByBrandAndCountry(brandId, country);
        } else {
            stores = brandService.getStoresByBrand(brandId);
        }
        return ResponseEntity.ok(stores);
    }
}
