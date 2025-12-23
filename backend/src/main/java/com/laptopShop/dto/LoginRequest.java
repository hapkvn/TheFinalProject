package com.laptopShop.dto; // <--- DÒNG NÀY PHẢI ĐÚNG VỚI TÊN PACKAGE CỦA BẠN

public class LoginRequest {
    private String username;
    private String password;

    // Getter và Setter (Bắt buộc)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}