drop database laptop_shop;
CREATE DATABASE laptop_shop;
use laptop_shop;

-- 1. Tạo bảng users (Nếu Java chưa tự tạo)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20)
);

-- 2. Thêm dữ liệu mẫu (Tên đăng nhập / Mật khẩu)
-- Lưu ý: Ở đây ta đang dùng mật khẩu chưa mã hóa (plain text) để test cho dễ.
INSERT INTO users (username, password, full_name, role) VALUES
('admin', '123456', 'Quản Trị Viên', 'ADMIN'),
('khachhang', '123456', 'Nguyễn Văn A', 'USER'),
('sales', '123456', 'Nhân Viên Bán Hàng', 'STAFF');

select *from users
