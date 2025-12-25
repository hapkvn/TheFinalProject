package com.laptopShop.factory;

import com.laptopShop.service.payment.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class PaymentFactory {

    @Autowired
    private Map<String, IPaymentService> paymentServices;

    public IPaymentService getPaymentService(String paymentType) {
        // paymentType gửi lên là "COD" hoặc "BANKING"
        IPaymentService service = paymentServices.get(paymentType);
        if (service == null) {
            throw new RuntimeException("Phương thức thanh toán không hỗ trợ: " + paymentType);
        }
        return service;
    }
}