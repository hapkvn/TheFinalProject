package com.laptopShop.service;

import com.laptopShop.entity.Product;
import com.laptopShop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired private ProductRepository productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }
}