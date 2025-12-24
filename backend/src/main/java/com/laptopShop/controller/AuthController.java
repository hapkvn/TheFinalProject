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

    // ... (Các import cũ)

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        // 1. Kiểm tra xem tên đăng nhập đã tồn tại chưa?
        // (Lưu ý: Bạn cần vào UserRepository thêm hàm: boolean existsByUsername(String username);)
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Tên đăng nhập đã tồn tại!");
            return ResponseEntity.badRequest().body(error);
        }

        // 2. Tạo user mới
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword()); // Lưu pass thường (Sau này nên mã hóa)
        newUser.setFullName(request.getFullName());
        newUser.setRole("USER"); // Mặc định là khách hàng (USER)

        // 3. Lưu vào Database
        userRepository.save(newUser);

        // 4. Trả về thành công
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Đăng ký thành công!");

        return ResponseEntity.ok(response);
    }
}