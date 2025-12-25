package com.laptopShop.repository;

import com.laptopShop.entity.Cart;
import com.laptopShop.entity.User;      // <--- Thêm import này
import com.laptopShop.entity.Product;   // <--- Thêm import này
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);
    List<Cart> findByUser_Username(String username);
    void deleteByUser_Username(String username);

    // --- THÊM DÒNG NÀY ---
    // Tìm xem User A đã có Product B trong giỏ chưa?
    Cart findByUserAndProduct(User user, Product product);
    Cart findByUserAndProductAndIsCombo(User user, Product product, boolean isCombo);
}