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

    // Sửa hàm này nhận thêm boolean isCombo
    public void addToCart(String username, Long productId, int quantity, boolean isCombo) {
        User user = userRepo.findByUsername(username).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        // 1. Tìm chính xác sản phẩm trong giỏ khớp cả ID lẫn trạng thái Combo
        Cart existingCart = cartRepo.findByUserAndProductAndIsCombo(user, product, isCombo);

        if (existingCart != null) {
            // 2A. NẾU TÌM THẤY -> CỘNG DỒN SỐ LƯỢNG
            // (Ví dụ: Đã có Dell [Combo], mua thêm Dell [Combo] -> Dell [Combo] sl=2)
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            cartRepo.save(existingCart);
        } else {
            // 2B. NẾU KHÔNG THẤY -> TẠO DÒNG MỚI
            // (Ví dụ: Đã có Dell [Lẻ], mua Dell [Combo] -> Tạo dòng Dell [Combo] riêng)
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
            cart.setCombo(isCombo); // Lưu trạng thái
            cartRepo.save(cart);
        }
    }
    public void deleteCartItem(Long cartId) {
        cartRepo.deleteById(cartId);
    }
    public List<Cart> getMyCart(String username) {
        return cartRepo.findByUser_Username(username);
    }

    public void clearCart(String username) {
        cartRepo.deleteByUser_Username(username);
    }
}