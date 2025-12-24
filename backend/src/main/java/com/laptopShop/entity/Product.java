package com.laptopShop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products") // Tên bảng trong MySQL
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    private String img;

    private String cat; // Danh mục (category): laptop, mouse...

    private String status; // Ví dụ: "Sẵn hàng"
}