package com.laptopShop.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Khóa ngoại trỏ về User

    private String fullname;
    private String address;
    private String phone;
    private Double totalMoney;
    private String status; // PENDING, PAID...

    // Một đơn hàng có nhiều chi tiết
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;
}