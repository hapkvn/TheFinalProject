package com.laptopShop.entity;

import jakarta.persistence.*; // Nếu dùng Spring Boot cũ (<3.0) thì đổi thành javax.persistence.*
import lombok.Data;

@Entity
@Table(name = "order_details")
@Data
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order; // Cái này khớp với mappedBy="order" bên file Order

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // Đảm bảo bạn đã có class Product trong entity

    private Double price;

    private Integer quantity;

    private Double totalPrice;
}