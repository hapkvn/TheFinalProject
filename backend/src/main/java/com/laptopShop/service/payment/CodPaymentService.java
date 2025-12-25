package com.laptopShop.service.payment;

import com.laptopShop.entity.Order;
import org.springframework.stereotype.Service;

@Service("COD")
public class CodPaymentService implements IPaymentService {

    @Override
    public void processPayment(Order order) {
        System.out.println("Đang xử lý thanh toán COD...");
        // COD thì trạng thái là Chờ xử lý
        order.setStatus("PENDING");
    }
}