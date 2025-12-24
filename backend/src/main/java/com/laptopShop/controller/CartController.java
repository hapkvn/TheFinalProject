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
@CrossOrigin(origins = "*") // Cho phép React gọi qua
public class CartController {

    @Autowired
    private CartService cartService;

    // 1. Lấy danh sách giỏ hàng
    // GET: http://localhost:8088/api/cart?username=admin
    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam String username) {
        List<Cart> cartItems = cartService.getMyCart(username);
        return ResponseEntity.ok(cartItems);
    }

    // 2. Thêm vào giỏ hàng
    // POST: http://localhost:8088/api/cart/add
    // Body: { "username": "admin", "productId": 1, "quantity": 1 }
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = (int) payload.get("quantity");

        cartService.addToCart(username, productId, quantity);
        return ResponseEntity.ok("Đã thêm vào giỏ!");
    }

    // 3. Xóa giỏ hàng (Sau này làm thêm xóa từng món)
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestParam String username) {
        cartService.clearCart(username);
        return ResponseEntity.ok("Đã xóa giỏ hàng");
    }
}