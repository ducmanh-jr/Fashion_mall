package com.dmfashion.datatools.repository;

import com.dmfashion.datatools.model.StoreInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreInventoryRepository extends JpaRepository<StoreInventory, Long> {
    List<StoreInventory> findByProduct_ProductId(String productId);
    List<StoreInventory> findByStoreId(String storeId);
}
