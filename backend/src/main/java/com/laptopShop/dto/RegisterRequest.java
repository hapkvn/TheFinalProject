package com.laptopShop.dto;

import lombok.Data;

@Data // Tự động sinh Getter/Setter
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
    // Có thể thêm email, phone nếu muốn
}