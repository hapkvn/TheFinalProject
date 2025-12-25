package com.laptopShop.controller;

import com.laptopShop.facade.CheckoutFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "*")
public class CheckoutController {

    @Autowired
    private CheckoutFacade checkoutFacade;

    @PostMapping
    public ResponseEntity<?> checkout(@RequestBody Map<String, String> payload) {
        try {
            String username = payload.get("username");
            String address = payload.get("address");
            String phone = payload.get("phone");

            // --- BỔ SUNG DÒNG NÀY ---
            // Lấy phương thức thanh toán (COD hoặc BANKING) từ React gửi lên
            String paymentMethod = payload.getOrDefault("paymentMethod", "COD");
            // ------------------------

            // Gọi Facade với đủ 4 tham số
            checkoutFacade.checkout(username, address, phone, paymentMethod);

            return ResponseEntity.ok(Map.of("message", "Đặt hàng thành công!"));
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra console để dễ debug
            return ResponseEntity.badRequest().body(Map.of("message", "Lỗi: " + e.getMessage()));
        }
    }
}