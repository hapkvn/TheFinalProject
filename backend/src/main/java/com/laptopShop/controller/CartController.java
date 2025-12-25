package com.laptopShop.controller;

import com.laptopShop.entity.Cart;
import com.laptopShop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam String username) {
        List<Cart> cartItems = cartService.getMyCart(username);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = (int) payload.get("quantity");

        boolean isCombo = false;
        if (payload.containsKey("isCombo")) {
            isCombo = (boolean) payload.get("isCombo");
        }

        cartService.addToCart(username, productId, quantity, isCombo);
        return ResponseEntity.ok(Map.of("message", "Thêm thành công"));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestParam String username) {
        cartService.clearCart(username);
        return ResponseEntity.ok("Đã xóa giỏ hàng");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
        return ResponseEntity.ok("Xóa thành công!");
    }
}