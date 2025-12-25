package com.laptopShop.dto;

import lombok.Data;

@Data
public class CheckoutRequest {
    private String username;
    private String address;
    private String phone;
    private String paymentMethod;
}