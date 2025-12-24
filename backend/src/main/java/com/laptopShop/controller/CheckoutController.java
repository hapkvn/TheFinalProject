package com.laptopShop.controller;

import com.laptopShop.facade.CheckoutFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "*") // Cho phép React gọi
public class CheckoutController {

    @Autowired
    private CheckoutFacade checkoutFacade;

    @PostMapping
    public ResponseEntity<?> checkout(@RequestBody Map<String, String> payload) {
        try {
            String username = payload.get("username");
            String address = payload.get("address");
            String phone = payload.get("phone");

            // Gọi Facade để xử lý chuỗi logic phức tạp (Tạo đơn -> Lưu chi tiết -> Xóa giỏ)
            checkoutFacade.checkout(username, address, phone);

            return ResponseEntity.ok(Map.of("message", "Đặt hàng thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Lỗi: " + e.getMessage()));
        }
    }
}