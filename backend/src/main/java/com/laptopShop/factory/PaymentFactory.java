package com.laptopShop.factory;

import com.laptopShop.service.payment.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class PaymentFactory {

    @Autowired
    private Map<String, IPaymentService> paymentServices;

    // --- SỬA TÊN HÀM TỪ getPaymentService THÀNH getService ---
    public IPaymentService getService(String paymentType) {


        IPaymentService service = paymentServices.get(paymentType);

        if (service == null) {
            throw new RuntimeException("Phương thức thanh toán không hỗ trợ: " + paymentType);
        }
        return service;
    }
}-