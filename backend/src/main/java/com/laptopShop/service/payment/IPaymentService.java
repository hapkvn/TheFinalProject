package com.laptopShop.service.payment;

import com.laptopShop.entity.Order;

public interface IPaymentService {
    // Quy định chung: Tên hàm là processPayment, không trả về giá trị (void)
    void processPayment(Order order);
}