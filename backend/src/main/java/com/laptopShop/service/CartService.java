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
        // 1. Lấy thông tin User và Product từ DB
        User user = userRepo.findByUsername(username).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        // 2. Kiểm tra xem sản phẩm này đã có trong giỏ của user chưa?
        // [SỬ DỤNG HÀM VỪA TẠO Ở BƯỚC 1]
        Cart existingCart = cartRepo.findByUserAndProduct(user, product);

        if (existingCart != null) {
            // 3A. Nếu CÓ rồi -> Cộng dồn số lượng
            int newQuantity = existingCart.getQuantity() + quantity;
            existingCart.setQuantity(newQuantity);
            cartRepo.save(existingCart);
        } else {
            // 3B. Nếu CHƯA có -> Tạo dòng mới
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