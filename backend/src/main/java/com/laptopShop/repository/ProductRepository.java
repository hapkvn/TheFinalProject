package com.laptopShop.repository;

import com.laptopShop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Có thể tìm theo tên, danh mục...
    // List<Product> findByCat(String cat);
}