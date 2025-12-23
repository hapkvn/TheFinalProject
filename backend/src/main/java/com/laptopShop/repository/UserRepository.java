package com.laptopShop.repository;

import com.laptopShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Chỉ cần viết dòng này, Spring Boot tự động viết câu lệnh SQL "SELECT * FROM users WHERE username = ?" cho bạn
    Optional<User> findByUsername(String username);
}