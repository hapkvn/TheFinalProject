package com.laptopShop.controller;

import com.laptopShop.dto.LoginRequest;
import com.laptopShop.dto.RegisterRequest;
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
@CrossOrigin(origins = "*") // Cho phép React gọi API
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // --- ĐĂNG NHẬP ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // 1. Tìm user
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 2. So sánh mật khẩu
            if (user.getPassword().equals(request.getPassword())) {

                // --- PHẦN QUAN TRỌNG ĐÃ ĐƯỢC BỔ SUNG ---
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");

                // Phải trả về ID và Username để React lưu vào LocalStorage
                response.put("id", user.getId());
                response.put("username", user.getUsername()); // <--- CÁI NÀY QUAN TRỌNG NHẤT

                response.put("role", user.getRole());
                response.put("fullName", user.getFullName());

                return ResponseEntity.ok(response);
            }
        }

        // 3. Đăng nhập thất bại
        Map<String, String> error = new HashMap<>();
        error.put("status", "error");
        error.put("message", "Sai tài khoản hoặc mật khẩu!");
        return ResponseEntity.status(401).body(error);
    }

    // --- ĐĂNG KÝ ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        // 1. Kiểm tra tồn tại
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Tên đăng nhập đã tồn tại!");
            return ResponseEntity.badRequest().body(error);
        }

        // 2. Tạo user mới
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword());
        newUser.setFullName(request.getFullName());
        newUser.setRole("USER"); // Mặc định là khách hàng

        // 3. Lưu DB
        userRepository.save(newUser);

        // 4. Trả về thành công
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Đăng ký thành công!");

        return ResponseEntity.ok(response);
    }
}