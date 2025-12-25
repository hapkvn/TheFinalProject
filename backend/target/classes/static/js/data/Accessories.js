const DATA_ACCESSORIES = [
    { 
        id: 101, 
        name: "Màn hình LG UltraGear 24GN650-B 24\" IPS 144Hz 1ms", 
        price: "3.490.000", 
        img: "img/101.jpg", 
        cat: "monitor",
        badge: "Best Seller tầm trung",
        status: "Sẵn hàng",
        stock: 50,
        specs: {
            type: "Màn hình Gaming phẳng",
            size: "23.8 inch",
            panel: "IPS",
            resolution: "FHD (1920 x 1080)",
            refresh_rate: "144Hz",
            response_time: "1ms (GtG)",
            color: "99% sRGB",
            connect: "HDMI x2, DisplayPort"
        }
    },
    { 
        id: 102, 
        name: "Màn hình Dell UltraSharp U2422H 24\" IPS Chuyên Đồ Họa", 
        price: "5.890.000", 
        img: "img/102.jpg", 
        cat: "monitor",
        badge: "Chuẩn màu đồ họa",
        status: "Sẵn hàng",
        stock: 20,
        specs: {
            type: "Màn hình đồ họa",
            size: "23.8 inch",
            panel: "IPS Black",
            resolution: "FHD (1920 x 1080)",
            refresh_rate: "60Hz",
            response_time: "5ms",
            color: "100% sRGB, 85% DCI-P3",
            connect: "USB-C, HDMI, DP, LAN (RJ45)"
        }
    },
    { 
        id: 103, 
        name: "Màn hình ASUS TUF Gaming VG279Q1A 27\" IPS 165Hz", 
        price: "4.290.000", 
        img: "img/103.jpg", 
        cat: "monitor",
        badge: "Màn to, tần số quét cao",
        status: "Sẵn hàng",
        stock: 35,
        specs: {
            type: "Màn hình Gaming",
            size: "27 inch",
            panel: "IPS",
            resolution: "FHD (1920 x 1080)",
            refresh_rate: "165Hz",
            response_time: "1ms MPRT",
            color: "FreeSync Premium",
            connect: "HDMI 1.4 x2, DisplayPort 1.2"
        }
    },

    // --- BÀN PHÍM (KEYBOARD) ---
    { 
        id: 104, 
        name: "Bàn phím cơ DareU EK87 Multi-LED Black", 
        price: "499.000", 
        img: "img/104.jpg", 
        cat: "keyboard",
        badge: "Ngon - Bổ - Rẻ",
        status: "Sẵn hàng",
        stock: 100,
        specs: {
            type: "Bàn phím cơ (Tenkeyless)",
            switch: "D-Switch (Blue/Brown/Red)",
            layout: "87 phím",
            led: "Multi-LED 7 màu",
            keycap: "ABS Double shot",
            connect: "Dây USB liền",
            feature: "N-Key Rollover",
            weight: "Chuyên game Net cỏ"
        }
    },
    { 
        id: 105, 
        name: "Bàn phím cơ không dây FL-Esports CMK75", 
        price: "1.950.000", 
        img: "img/105.jpg", 
        cat: "keyboard",
        badge: "Build cực đầm, Hotswap",
        status: "Còn ít",
        stock: 5,
        specs: {
            type: "Bàn phím cơ Custom (75%)",
            switch: "Kailh Box Cool Mint",
            layout: "82 phím + Núm xoay",
            led: "RGB từng phím",
            keycap: "PBT Doubleshot Cherry Profile",
            connect: "3 Mode (Type-C, 2.4Ghz, Bluetooth)",
            feature: "Hotswap 5 pin, Gasket Mount",
            battery: "Pin 3000mAh"
        }
    },
    { 
        id: 106, 
        name: "Bàn phím Logitech MX Keys S Wireless", 
        price: "2.690.000", 
        img: "img/106.jpg", 
        cat: "keyboard",
        badge: "Vua văn phòng",
        status: "Sẵn hàng",
        stock: 15,
        specs: {
            type: "Bàn phím văn phòng cao cấp",
            switch: "Scissor (Kéo cắt)",
            layout: "Fullsize",
            led: "Led trắng thông minh",
            connect: "Bluetooth + Logi Bolt USB",
            feature: "Kết nối 3 thiết bị cùng lúc (Flow)",
            battery: "Sạc USB-C, dùng 5 tháng",
            os: "Tương thích Win/Mac"
        }
    },

    // --- CHUỘT (MOUSE) ---
    { 
        id: 107, 
        name: "Chuột Gaming Logitech G102 Lightsync Gen 2", 
        price: "390.000", 
        img: "img/107.jpg", 
        cat: "mouse",
        badge: "Chuột quốc dân",
        status: "Sẵn hàng",
        stock: 150,
        specs: {
            type: "Chuột Gaming có dây",
            dpi: "200 - 8.000 DPI",
            sensor: "Mercury",
            led: "RGB Lightsync 16.8tr màu",
            buttons: "6 nút lập trình được",
            weight: "85g",
            connect: "USB",
            warranty: "24 tháng chính hãng"
        }
    },
    { 
        id: 108, 
        name: "Chuột Logitech MX Master 3S", 
        price: "2.190.000", 
        img: "img/108.jpg", 
        cat: "mouse",
        badge: "Đỉnh cao productivity",
        status: "Sẵn hàng",
        stock: 25,
        specs: {
            type: "Chuột văn phòng cao cấp",
            dpi: "8.000 DPI (Kính cũng di được)",
            sensor: "Darkfield",
            buttons: "Con lăn vô cực MagSpeed",
            click: "Silent Click (Yên tĩnh)",
            connect: "Bluetooth + Logi Bolt",
            feature: "Kết nối 3 máy, kéo thả file giữa các máy",
            battery: "Sạc nhanh 1 phút dùng 3 giờ"
        }
    },
    { 
        id: 109, 
        name: "Chuột Gaming Không Dây Razer Viper V2 Pro", 
        price: "2.890.000", 
        img: "img/109.webp", 
        cat: "mouse",
        badge: "Siêu nhẹ 58g",
        status: "Sẵn hàng",
        stock: 10,
        specs: {
            type: "Chuột Gaming Esport",
            dpi: "30.000 DPI (Focus Pro 30K)",
            switch: "Optical Mouse Switches Gen-3",
            polling: "4000Hz (Cần dongle rời)",
            weight: "58g (Siêu nhẹ)",
            connect: "Razer HyperSpeed Wireless",
            battery: "80 giờ sử dụng",
            feature: "Dành cho tay to / Claw Grip"
        }
    },

    // --- TAI NGHE / LOA (AUDIO) ---
    { 
        id: 110, 
        name: "Tai nghe Gaming HyperX Cloud II", 
        price: "1.890.000", 
        img: "img/110.jpg", 
        cat: "audio",
        badge: "Huyền thoại FPS",
        status: "Sẵn hàng",
        stock: 40,
        specs: {
            type: "Tai nghe chụp tai (Over-ear)",
            sound: "Giả lập 7.1 Surround",
            driver: "53mm Neodymium",
            mic: "Tháo rời được, lọc tạp âm",
            connect: "Jack 3.5mm + USB Soundcard",
            material: "Khung nhôm, đệm da êm ái",
            feature: "Nghe tiếng chân cực rõ",
            compatible: "PC, PS4, Xbox, Mobile"
        }
    },
    { 
        id: 111, 
        name: "Tai nghe Sony WH-1000XM5 Chống ồn", 
        price: "6.490.000", 
        img: "img/111.png", 
        cat: "audio",
        badge: "Chống ồn chủ động tốt nhất",
        status: "Sẵn hàng",
        stock: 8,
        specs: {
            type: "Tai nghe Bluetooth Over-ear",
            sound: "Hi-Res Audio, DSEE Extreme",
            feature: "Chống ồn chủ động (ANC) kép",
            mic: "8 mic lọc gió, đàm thoại cực rõ",
            connect: "Bluetooth 5.2 (LDAC)",
            battery: "30 giờ (bật ANC)",
            app: "Sony Headphones Connect",
            color: "Đen / Bạc"
        }
    },
    { 
        id: 112, 
        name: "Loa Bluetooth Marshall Emberton II", 
        price: "3.990.000", 
        img: "img/112.webp", 
        cat: "audio",
        badge: "Nhỏ gọn, Bass lực",
        status: "Sẵn hàng",
        stock: 12,
        specs: {
            type: "Loa di động",
            sound: "Stereo 360 độ (True Stereophonic)",
            power: "20W (2 x 10W)",
            waterproof: "IP67 (Chống nước/bụi)",
            connect: "Bluetooth 5.1",
            battery: "30 giờ chơi nhạc",
            feature: "Stack Mode (Kết nối nhiều loa)",
            size: "Nhỏ gọn cầm tay"
        }
    }
];


window.DATA_ACCESSORIES = DATA_ACCESSORIES;