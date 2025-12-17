const { Link, useHistory } = ReactRouterDOM;

const Headers = () => {
  const history = useHistory();

  // Xử lý khi bấm nút tìm kiếm
  const handleSearch = () => {
    const input = document.querySelector(".search-input");
    if (input && input.value) {
      history.push(`/products?search=${input.value}`);
    }
  };

  return (
    <div className="header">     

      <div className="logo">
          <Link to="/" >
              LAPTOP VIP
          </Link>
      </div>

      {/* Menu Ngang */}
      <div className="nav-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/cart" >Giỏ hàng</Link>
      </div>

      {/* Tìm kiếm */}
      <div className="search-box">
          <input type="text" className="search-input" placeholder="Tìm máy tính..." />
          <button onClick={handleSearch}>Tìm</button>
      </div>
  </div>
  );
};

// Xuất component ra window
window.Headers = Headers;