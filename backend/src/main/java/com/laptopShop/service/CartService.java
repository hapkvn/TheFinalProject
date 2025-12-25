package com.laptopShop.service;

import com.laptopShop.entity.*;
import com.laptopShop.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {
    @Autowired private CartRepository cartRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;

    public void addToCart(String username, Long productId, int quantity) {
        User user = userRepo.findByUsername(username).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        // --- THÊM KIỂM TRA SỐ LƯỢNG ---
        if (product.getStock() < quantity) {
            throw new RuntimeException("Sản phẩm này chỉ còn " + product.getStock() + " chiếc!");
        }

        // ... (Logic cũ: Tìm existingCart hoặc tạo mới ...)
        Cart existingCart = cartRepo.findByUserAndProduct(user, product);

        if (existingCart != null) {
            // Kiểm tra tổng số lượng sau khi cộng dồn
            if (existingCart.getQuantity() + quantity > product.getStock()) {
                throw new RuntimeException("Kho không đủ hàng!");
            }
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            cartRepo.save(existingCart);
        } else {
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
            cartRepo.save(cart);
        }
    }
    public List<Cart> getMyCart(String username) {
        return cartRepo.findByUser_Username(username);
    }

    public void clearCart(String username) {
        cartRepo.deleteByUser_Username(username);
    }
}