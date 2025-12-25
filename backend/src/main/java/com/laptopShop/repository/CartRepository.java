package com.laptopShop.repository;

import com.laptopShop.entity.Cart;
import com.laptopShop.entity.User;
import com.laptopShop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);
    List<Cart> findByUser_Username(String username);
    void deleteByUser_Username(String username);


    Cart findByUserAndProduct(User user, Product product);
    Cart findByUserAndProductAndIsCombo(User user, Product product, boolean isCombo);
}