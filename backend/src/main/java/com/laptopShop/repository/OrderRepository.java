package com.laptopShop.repository;

import com.laptopShop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 1. Hàm có sẵn của JpaRepository:
    // save(Order order) -> Đã có sẵn, không cần viết

    // 2. Hàm tìm kiếm tùy chỉnh:

    // Tìm danh sách đơn hàng của một người dùng cụ thể (Theo username)
    // Giúp hiển thị "Lịch sử mua hàng"
    List<Order> findByUser_Username(String username);

    // Hoặc tìm theo ID người dùng
    List<Order> findByUserId(Long userId);
}