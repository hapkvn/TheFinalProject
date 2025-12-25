DROP DATABASE IF EXISTS laptop_shop;
CREATE DATABASE laptop_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laptop_shop;

-- 1. Bảng Users (PHẢI TẠO ĐẦU TIÊN)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER'
);

-- 2. Bảng Orders (Phải tạo trước Order Details)
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

-- 3. Bảng Products (Đã thêm cột STOCK)
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    img VARCHAR(255),
    cat VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Sẵn hàng',
    stock INT DEFAULT 10 -- Cột số lượng tồn kho
);

-- 4. Bảng Carts
CREATE TABLE carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT DEFAULT 1,
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

-- 1. Insert Users (Quan trọng: Phải có User thì mới mua hàng được)
INSERT INTO users (username, password, full_name, role) VALUES
('admin', '123456', 'Quản Trị Viên', 'ADMIN'),
('khachhang', '123456', 'Nguyễn Văn A', 'USER'),
('sales', '123456', 'Nhân Viên Bán Hàng', 'STAFF');

-- 2. Insert Products (Dữ liệu chuẩn của bạn)
INSERT INTO products (id, name, price, img, cat, stock) VALUES
-- LAPTOP (ID 1 -> 32)
(1, 'Thinkpad E14 Gen 7 21SX002QVA Ultra 5 225U', 20490000, 'img/892x556_1762486949.webp', 'office', 50),
(2, 'Thinkpad E16 Gen 3 21SR002JVA Ultra 5 225U', 21290000, 'img/thinkpad-e16.webp', 'office', 30),
(3, 'Lenovo Lecoo Pro 14 2025 Ryzen 7 8845H', 16790000, 'img/lecoo-pro-14.webp', 'gaming', 15),
(4, 'ASUS TUF Gaming F16 FX607VJ-RL034W Core i7', 29190000, 'img/asus-tuf-f16.webp', 'gaming', 20),
(5, 'Laptop Asus Vivobook 15 OLED A1505VA-L1201W', 17990000, 'img/vivobook-15-oled.webp', 'office', 40),
(6, 'Laptop Asus TUF Gaming A15 FA507NU-LP034W', 22490000, 'img/tuf-a15.webp', 'gaming', 25),
(7, 'Laptop Asus Zenbook 14 OLED UX3405MA', 24990000, 'img/zenbook-14-2024.webp', 'office', 35),
(8, 'Lenovo Ideapad Slim 5 Light 14ABR8', 15490000, 'img/ideapad-slim-5-light.webp', 'office', 60),
(9, 'Apple MacBook Air M2 2022 13.6 inch 8GB/256GB', 24990000, 'img/macbook-air-m2.webp', 'macbook', 22),
(10, 'Dell XPS 13 Plus 9320 i7-1360P 16GB 512GB 3.5K OLED', 35490000, 'img/dell-xps-13-plus.webp', 'office', 10),
(11, 'Lenovo Legion 5 15ARP8 Ryzen 7 7735HS RTX 4060', 27990000, 'img/legion-5.webp', 'gaming', 28),
(12, 'HP Envy X360 14 2-in-1 i5-1335U 16GB 512GB', 20990000, 'img/hp-envy-x360.webp', 'office', 32),
(13, 'Acer Nitro V ANV15-51-57B2 i5-13420H RTX 4050', 22490000, 'img/acer-nitro-v.webp', 'gaming', 45),
(14, 'MacBook Pro 14 inch M3 2023 8GB/512GB', 39990000, 'img/macbook-pro-m3.webp', 'macbook', 12),
(15, 'LG Gram 2023 17Z90R i7-1360P 16GB 512GB', 32990000, 'img/lg-gram-17.webp', 'office', 8),
(16, 'Asus ROG Strix G16 G614JV-N3009W i9-13980HX RTX 4060', 42990000, 'img/rog-strix-g16.webp', 'gaming', 9),
(17, 'Surface Laptop 5 13.5 inch i5/8GB/256GB', 23500000, 'img/surface-laptop-5.webp', 'office', 18),
(18, 'Dell Inspiron 15 3520 i5-1235U 8GB 256GB 120Hz', 13490000, 'img/dell-inspiron-3520.webp', 'office', 80),
(19, 'MSI Thin GF63 12UC-887VN i7-12650H RTX 3050', 18990000, 'img/msi-gf63.webp', 'gaming', 38),
(20, 'Asus Zenbook 14 OLED UX3402VA-KM074W i5-1340P', 21990000, 'img/zenbook-14-oled.webp', 'office', 26),
(21, 'HP Victus 16-r0129TX i5-13500H RTX 4050', 24490000, 'img/hp-victus-16.webp', 'gaming', 33),
(22, 'ThinkBook 14 G6 IRL i5-1335U 16GB 512GB', 17990000, 'img/thinkbook-14-g6.webp', 'office', 55),
(23, 'Acer Swift Go 14 SFG14-71-54AC i5-13500H OLED', 19990000, 'img/acer-swift-go-14.webp', 'office', 19),
(24, 'Gigabyte G5 MF-F2VN333SH i5-12450H RTX 4050', 19490000, 'img/gigabyte-g5.webp', 'gaming', 37),
(25, 'Dell Alienware m16 R1 i7-13700HX RTX 4070', 55990000, 'img/alienware-m16.webp', 'gaming', 5),
(26, 'Asus Vivobook Pro 15 OLED K6502VU i9-13900H', 29990000, 'img/vivobook-pro-15.webp', 'office', 14),
(27, 'Apple MacBook Air M1 2020 8GB/256GB', 18490000, 'img/macbook-air-m1.webp', 'macbook', 100),
(28, 'HP Pavilion 15-eg3093TU i5-1335U 8GB 512GB', 16490000, 'img/hp-pavilion-15.webp', 'office', 65),
(29, 'Lenovo Yoga Slim 7 14APU8 Ryzen 7 7840S 3K OLED', 26990000, 'img/yoga-slim-7.webp', 'office', 21),
(30, 'Dell Latitude 7440 i7-1355U 16GB 512GB', 31490000, 'img/dell-latitude-7440.webp', 'office', 24),
(31, 'Razer Blade 15 2023 i7-13800H RTX 4070 240Hz', 68990000, 'img/razer-blade-15.webp', 'gaming', 3),
(32, 'MSI Katana 15 B13VFK i7-13620H RTX 4060', 28490000, 'img/msi-katana-15.webp', 'gaming', 42),

-- PHỤ KIỆN (ID 101 -> 112)
(101, 'Màn hình LG UltraGear 24GN650-B 24" IPS 144Hz', 3490000, 'img/acc-lg-24gn650.webp', 'monitor', 50),
(102, 'Màn hình Dell UltraSharp U2422H 24" IPS', 5890000, 'img/acc-dell-u2422h.webp', 'monitor', 20),
(103, 'Màn hình ASUS TUF Gaming VG279Q1A 27" IPS', 4290000, 'img/acc-asus-vg279q1a.webp', 'monitor', 35),
(104, 'Bàn phím cơ DareU EK87 Multi-LED Black', 499000, 'img/acc-dareu-ek87.webp', 'keyboard', 100),
(105, 'Bàn phím cơ không dây FL-Esports CMK75', 1950000, 'img/acc-fl-cmk75.webp', 'keyboard', 5),
(106, 'Bàn phím Logitech MX Keys S Wireless', 2690000, 'img/acc-mx-keys-s.webp', 'keyboard', 15),
(107, 'Chuột Gaming Logitech G102 Lightsync Gen 2', 390000, 'img/acc-logitech-g102.webp', 'mouse', 150),
(108, 'Chuột Logitech MX Master 3S', 2190000, 'img/acc-mx-master-3s.webp', 'mouse', 25),
(109, 'Chuột Gaming Không Dây Razer Viper V2 Pro', 2890000, 'img/acc-razer-viper.webp', 'mouse', 10),
(110, 'Tai nghe Gaming HyperX Cloud II', 1890000, 'img/acc-hyperx-cloud2.webp', 'audio', 40),
(111, 'Tai nghe Sony WH-1000XM5 Chống ồn', 6490000, 'img/acc-sony-xm5.webp', 'audio', 8),
(112, 'Loa Bluetooth Marshall Emberton II', 3990000, 'img/acc-marshall-emberton2.webp', 'audio', 12);

-- 3. Insert thử vào giỏ hàng
INSERT INTO carts (user_id, product_id, quantity) VALUES (1, 1, 2);

-- Kiểm tra kết quả
SELECT * FROM products;