const productsData = [
  {
    id: 1,
    type: "accessory", // Loại phụ kiện
    name: "Loa Bluetooth Bass Mạnh",
    price: 457000,
    discount: "-10%",
    img: "anh/img/8.jpg",
    features: [
      "Bass mạnh mẽ, âm thanh sống động",
      "Thiết kế nhỏ gọn, dễ dàng mang theo",
      "Kết nối Bluetooth 5.0",
      "Thời gian sử dụng lên đến 20 giờ"
    ]
  },
  {
    id: 2,
    type: "laptop", // Loại Laptop
    name: "Asus Vivobook 14 OLED",
    price: 18500000,
    discount: "-5%",
    img: "anh/img/44758_laptop_asus_vivobook_14_oled_a1405va_km095w__2_.jpg",
    specs: {
      cpu: "AMD Ryzen 7 8745HS",
      ram: "8GB DDR5 5600MHz",
      screen: "14″ FHD+ (1920x1200) IPS",
      gpu: "Intel Iris Xe"
    }
  },
  {
    id: 3,
    type: "laptop",
    name: "Lenovo Gaming Legion",
    price: 25000000,
    discount: "-15%",
    img: "anh/img/3.webp",
    specs: {
      cpu: "AMD Ryzen 7 8745HS",
      ram: "16GB DDR5 5600MHz",
      screen: "15.6″ FHD+ IPS, 300nits",
      gpu: "RTX 4060"
    }
  },
  {
    id: 4,
    type: "general", // Loại chung chung
    name: "Laptop Văn Phòng Cơ Bản",
    price: 8000000,
    discount: "-10%",
    img: "anh/img/4.png",
    description: "Laptop phù hợp cho công việc văn phòng, thiết kế nhẹ và pin sử dụng lâu dài."
  }
];