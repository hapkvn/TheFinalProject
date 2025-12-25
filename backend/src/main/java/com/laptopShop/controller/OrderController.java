package com.laptopShop.controller;

import com.laptopShop.entity.Order;
import com.laptopShop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Cho phép React gọi
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    // API: GET http://localhost:8088/api/orders?username=khachhang
    @GetMapping
    public ResponseEntity<?> getMyOrders(@RequestParam String username) {
        // Tìm đơn hàng theo username, sắp xếp đơn mới nhất lên đầu (Desc)
        List<Order> orders = orderRepo.findByUser_UsernameOrderByCreatedAtDesc(username);
        return ResponseEntity.ok(orders);
    }
}