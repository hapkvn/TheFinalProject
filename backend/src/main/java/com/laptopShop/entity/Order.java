package com.laptopShop.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- QUAN TRỌNG: LIÊN KẾT USER ---
    @ManyToOne
    @JoinColumn(name = "user_id") // Map với cột user_id trong SQL
    private User user;
    // ---------------------------------

    private String fullname;
    private String phone;
    private String address;
    private String status;

    @Column(name = "total_money")
    private Double totalMoney;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "created_at")
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}