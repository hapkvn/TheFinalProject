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

    // Liên kết với User (Ai mua đơn này?)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String fullname;
    private String phone;
    private String address;
    private String status; // PENDING, PAID, Unpaid, DELIVERED...

    @Column(name = "total_money")
    private Double totalMoney;

    // Cột lưu phương thức thanh toán (COD / BANKING)
    // Nếu trong Database chưa có cột này, bạn cần chạy lệnh SQL bổ sung bên dưới
    @Column(name = "payment_method")
    private String paymentMethod;

    // --- CỘT QUAN TRỌNG ĐỂ SẮP XẾP ---
    @Column(name = "created_at")
    private Date createdAt;

    // Liên kết ngược lại OrderDetail để lấy danh sách sản phẩm khi xem lịch sử
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}