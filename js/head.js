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
    
      <div className="main-top">
        <div className="logo">
          <Link to="/" >
              LAPTOPVIP
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
        <input type="text" className="search-input" placeholder="Tìm sản phẩm..." 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }}}/>
            <div className="glass">
              <i className="fa-solid fa-magnifying-glass"></i>    
            </div>
      </div>
      

      {/*top right */}
      <div className="topRight">

        <div className="contact">          
            <Link to="/contact">Liên hệ</Link>
        </div>

        <div className="account">        
          <Link to="/Login">
            <i className="fa-solid fa-circle-user" style={{marginRight: '5px'  }}></i>
              Đăng nhập        
          </Link>
        </div>
      </div>
    </div>
      
  </div>
  );
};

// Xuất component ra window
window.Headers = Headers;