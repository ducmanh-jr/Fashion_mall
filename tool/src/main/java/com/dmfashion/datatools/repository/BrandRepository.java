package com.dmfashion.datatools.repository;

import com.dmfashion.datatools.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, String> {

    @Query("SELECT b FROM Brand b WHERE b.active = true AND (" +
           "LOWER(b.displayName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.brandId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.aliases) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Brand> searchBrands(@Param("keyword") String keyword);
}
