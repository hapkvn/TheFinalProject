package com.laptopShop.service.payment;

import com.laptopShop.entity.Order;
import org.springframework.stereotype.Service;

@Service("BANKING")
public class BankingPaymentService implements IPaymentService {

    @Override
    public void processPayment(Order order) {
        System.out.println("Đang xử lý thanh toán Ngân hàng (Banking)...");

        // Banking thì trạng thái là Chưa thanh toán (chờ quét QR)
        // Hoặc "PAID" nếu bạn giả định đã thanh toán xong luôn
        order.setStatus("Unpaid");
    }
}