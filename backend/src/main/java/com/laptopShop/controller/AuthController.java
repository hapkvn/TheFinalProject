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
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword().equals(request.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");

                response.put("id", user.getId());
                response.put("username", user.getUsername());

                response.put("role", user.getRole());
                response.put("fullName", user.getFullName());

                return ResponseEntity.ok(response);
            }
        }
        Map<String, String> error = new HashMap<>();
        error.put("status", "error");
        error.put("message", "Sai tài khoản hoặc mật khẩu!");
        return ResponseEntity.status(401).body(error);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Tên đăng nhập đã tồn tại!");
            return ResponseEntity.badRequest().body(error);
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword());
        newUser.setFullName(request.getFullName());
        newUser.setRole("USER");
        userRepository.save(newUser);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Đăng ký thành công!");

        return ResponseEntity.ok(response);
    }
}