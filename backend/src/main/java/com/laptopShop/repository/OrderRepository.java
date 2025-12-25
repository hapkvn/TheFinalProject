package com.laptopShop.repository;

import com.laptopShop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser_Username(String username);


    List<Order> findByUserId(Long userId);


    List<Order> findByUser_UsernameOrderByCreatedAtDesc(String username);
}