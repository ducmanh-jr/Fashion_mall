package com.dmfashion.datatools.repository;

import com.dmfashion.datatools.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByBrandIdOrderByScrapedAtDesc(String brandId);
    List<Product> findByQuarantinedFalseOrderByScrapedAtDesc();

    @Query("SELECT p FROM Product p WHERE p.quarantined = false AND (" +
           ":brandId IS NULL OR p.brandId = :brandId) AND (" +
           ":keyword IS NULL OR LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.sku) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))) ORDER BY p.scrapedAt DESC")
    List<Product> filterProducts(@Param("brandId") String brandId, @Param("keyword") String keyword);
}
