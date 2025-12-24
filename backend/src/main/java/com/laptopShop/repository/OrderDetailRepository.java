package com.laptopShop.repository;

import com.laptopShop.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    // 1. Hàm có sẵn:
    // save(OrderDetail detail) -> Đã có sẵn

    // 2. Hàm tìm kiếm tùy chỉnh:

    // Tìm tất cả chi tiết sản phẩm thuộc về một đơn hàng (Order ID)
    // Dùng khi xem chi tiết hóa đơn
    List<OrderDetail> findByOrderId(Long orderId);
}