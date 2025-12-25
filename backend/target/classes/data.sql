DROP DATABASE IF EXISTS laptop_shop;
CREATE DATABASE laptop_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laptop_shop;

-- 1. Bảng Users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER'
);

-- 2. Bảng Orders
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    fullname VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(500),
    total_money DECIMAL(15, 2),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Bảng Products (Đã sửa 'cat' thành 'category')
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    img VARCHAR(255),
    category VARCHAR(50), -- Sửa từ 'cat' thành 'category' cho khớp lệnh Insert
    status VARCHAR(50) DEFAULT 'Sẵn hàng',
    stock INT DEFAULT 10
);

-- 4. Bảng Carts (Đã thêm sẵn cột is_combo)
CREATE TABLE carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT DEFAULT 1,
    is_combo BOOLEAN DEFAULT FALSE, -- Thêm trực tiếp tại đây
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 5. Bảng Order Details
CREATE TABLE order_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    price DECIMAL(15, 2),
    quantity INT,
    total_price DECIMAL(15, 2),

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- --- PHẦN INSERT DỮ LIỆU ---

-- 1. Insert Users
INSERT INTO users (username, password, full_name, role) VALUES
('admin', '123456', 'Quản Trị Viên', 'ADMIN'),
('khachhang', '123456', 'Nguyễn Văn A', 'USER'),
('sales', '123456', 'Nhân Viên Bán Hàng', 'STAFF');


INSERT INTO products (id, name, price, img, category, stock) VALUES
(1, 'Thinkpad E14 Gen 7 21SX002QVA Ultra 5 225U', 20490000, 'img/1.jpg', 'office', 50),
(2, 'Thinkpad E16 Gen 3 21SR002JVA Ultra 5 225U', 21290000, 'img/2.jpg', 'office', 30),
(3, 'Lenovo Lecoo Pro 14 2025 Ryzen 7 8845H', 16790000, 'img/3.webp', 'gaming', 15),
(4, 'ASUS TUF Gaming F16 FX607VJ-RL034W Core i7', 29190000, 'img/4.jpg', 'gaming', 20),
(5, 'Laptop Asus Vivobook 15 OLED A1505VA-L1201W', 17990000, 'img/5.jpg', 'office', 40),
(6, 'Laptop Asus TUF Gaming A15 FA507NU-LP034W', 22490000, 'img/6.png', 'gaming', 25),
(7, 'Laptop Asus Zenbook 14 OLED UX3405MA', 24990000, 'img/7.webp', 'office', 35),
(8, 'Lenovo Ideapad Slim 5 Light 14ABR8', 15490000, 'img/8.jpg', 'office', 60),
(9, 'Apple MacBook Air M2 2022 13.6 inch 8GB/256GB', 24990000, 'img/9.jpg', 'macbook', 22),
(10, 'Dell XPS 13 Plus 9320 i7-1360P 16GB 512GB 3.5K OLED', 35490000, 'img/10.jpeg', 'office', 10),
(11, 'Lenovo Legion 5 15ARP8 Ryzen 7 7735HS RTX 4060', 27990000, 'img/11.png', 'gaming', 28),
(12, 'HP Envy X360 14 2-in-1 i5-1335U 16GB 512GB', 20990000, 'img/12.webp', 'office', 32),
(13, 'Acer Nitro V ANV15-51-57B2 i5-13420H RTX 4050', 22490000, 'img/13.webp', 'gaming', 45),
(14, 'MacBook Pro 14 inch M3 2023 8GB/512GB', 39990000, 'img/14.jpg', 'macbook', 12),
(15, 'LG Gram 2023 17Z90R i7-1360P 16GB 512GB', 32990000, 'img/15.jpg', 'office', 8),
(16, 'Asus ROG Strix G16 G614JV-N3009W i9-13980HX RTX 4060', 42990000, 'img/16.jpg', 'gaming', 9),

(101, 'Màn hình LG UltraGear 24GN650-B 24" IPS 144Hz', 3490000, 'img/101.jpg', 'monitor', 50),
(102, 'Màn hình Dell UltraSharp U2422H 24" IPS', 5890000, 'img/102.jpg', 'monitor', 20),
(103, 'Màn hình ASUS TUF Gaming VG279Q1A 27" IPS', 4290000, 'img/103.jpg', 'monitor', 35),
(104, 'Bàn phím cơ DareU EK87 Multi-LED Black', 499000, 'img/104.jpg', 'keyboard', 100),
(105, 'Bàn phím cơ không dây FL-Esports CMK75', 1950000, 'img/105.jpg', 'keyboard', 5),
(106, 'Bàn phím Logitech MX Keys S Wireless', 2690000, 'img/106.jpg', 'keyboard', 15),
(107, 'Chuột Gaming Logitech G102 Lightsync Gen 2', 390000, 'img/107.jpg', 'mouse', 150),
(108, 'Chuột Logitech MX Master 3S', 2190000, 'img/108.jpg', 'mouse', 25),
(109, 'Chuột Gaming Không Dây Razer Viper V2 Pro', 2890000, 'img/109.webp', 'mouse', 10),
(110, 'Tai nghe Gaming HyperX Cloud II', 1890000, 'img/110.jpg', 'audio', 40),
(111, 'Tai nghe Sony WH-1000XM5 Chống ồn', 6490000, 'img/111.png', 'audio', 8),
(112, 'Loa Bluetooth Marshall Emberton II', 3990000, 'img/112.webp', 'audio', 12);

-- 3. Insert thử vào giỏ hàng
INSERT INTO carts (user_id, product_id, quantity) VALUES (1, 1, 2);

-- Kiểm tra kết quả
SELECT * FROM products;
SELECT * FROM users;