const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-header">
        {/* Lưu ý: thẻ li nên nằm trong ul/ol, nhưng giữ nguyên theo cấu trúc CSS hiện tại của bạn */}
        <li><i className="fas fa-bars"></i> DANH MỤC</li>
      </div>
      <ul className="menu-danhmuc">
        <li><i className="fa-solid fa-laptop"></i> Máy tính xách tay</li>
        <li><i className="fa-solid fa-gamepad"></i> Laptop Gaming - Đồ Họa</li>
        <li><i className="fa-solid fa-briefcase"></i> Laptop Văn phòng</li>
        <li><i className="fa-solid fa-code"></i> Laptop Lập trình</li>
        <li><i className="fa-solid fa-laptop-medical"></i> Laptop cao cấp</li>
        <li><i className="fa-brands fa-apple"></i> Apple Macbook</li>
        <li><i className="fa-solid fa-memory"></i> RAM - SSD</li>
        <li><i className="fa-solid fa-plug"></i> Kho phụ kiện</li>
        <li><i className="fa-solid fa-truck-fast"></i> Công chuyển</li>
        <li><i className="fa-solid fa-fan"></i> Tản nhiệt laptop</li>
      </ul>
    </div>
  );
};