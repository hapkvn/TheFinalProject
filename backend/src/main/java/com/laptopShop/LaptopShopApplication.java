package com.laptopShop; // Đặt ở thư mục gốc của dự án

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication: Đây là lệnh bảo Java: "Hãy khởi động Server và đi tìm tất cả Controller cho tôi"
@SpringBootApplication
public class LaptopShopApplication {

    public static void main(String[] args) {
        // Đây chính là hàm main bạn đang tìm kiếm!
        SpringApplication.run(LaptopShopApplication.class, args);
    }
}