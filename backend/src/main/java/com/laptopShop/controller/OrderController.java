package com.laptopShop.controller;

import com.laptopShop.entity.Order;
import com.laptopShop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @GetMapping
    public ResponseEntity<?> getMyOrders(@RequestParam String username) {

        List<Order> orders = orderRepo.findByUser_UsernameOrderByCreatedAtDesc(username);
        return ResponseEntity.ok(orders);
    }
}