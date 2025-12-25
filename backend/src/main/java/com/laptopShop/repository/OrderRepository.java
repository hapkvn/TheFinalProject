package com.laptopShop.repository;

import com.laptopShop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 1. Tìm đơn hàng theo Username (Cơ bản - Không sắp xếp)
    List<Order> findByUser_Username(String username);

    // 2. Tìm theo User ID
    List<Order> findByUserId(Long userId);


    List<Order> findByUser_UsernameOrderByCreatedAtDesc(String username);
}