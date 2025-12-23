package com.laptopShop.controller;

import com.laptopShop.dto.LoginRequest;
import com.laptopShop.entity.User;
import com.laptopShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    // Tiêm (Inject) cái kho chứa dữ liệu vào để dùng
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // 1. Tìm xem user có tồn tại trong Database không?
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isPresent()) {
            // Nếu tìm thấy user
            User user = userOptional.get();

            // 2. So sánh mật khẩu (Database vs Người dùng nhập)
            if (user.getPassword().equals(request.getPassword())) {
                // ĐÚNG MẬT KHẨU
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("message", "Đăng nhập thành công!");
                response.put("role", user.getRole());
                response.put("fullName", user.getFullName());

                return ResponseEntity.ok(response);
            }
        }

        // 3. Nếu không tìm thấy user HOẶC sai mật khẩu
        Map<String, String> error = new HashMap<>();
        error.put("status", "error");
        error.put("message", "Sai tài khoản hoặc mật khẩu!");
        return ResponseEntity.status(401).body(error);
    }
}