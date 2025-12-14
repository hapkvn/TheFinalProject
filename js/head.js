const { useEffect } = React;
 
const Headers = () => {
  useEffect(() => {
    const handleSearch = () => {
      const keyword = document.querySelector(".search-box").value.trim();
      if (keyword) {
        window.location.href = `products.html?search=${encodeURIComponent(keyword)}`;
      }
    };
 
    const input = document.querySelector(".search-box");
    const button = document.querySelector(".search-btn");
 
    if (button) {
      button.addEventListener("click", handleSearch);
    }
 
    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      });
    }
 
    // Cleanup khi unmount
    return () => {
      if (button) {
        button.removeEventListener("click", handleSearch);
      }
      if (input) {
        input.removeEventListener("keypress", handleSearch);
      }
    };
  }, []);
 
  return (
    <div className="wrapper">
      <div className="header">
        <div className="header-left">
          <ul>
            <li>
            <a href="TrangChu.html">hoangvu.vn</a>
            <span>0123 456 789</span>
          </li>
          </ul>
          <ul>
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <a className="nav-link" href="TrangChu.html">Trang chủ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/products.html#/category/laptop">Sản phẩm</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="cart.html">Giỏ hàng</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">Liên hệ</a>
              </li>
            </ul>
          </ul>
          <div className="header-center">
            <input
              type="text"
              placeholder="Tìm kiếm laptop bạn muốn..."
              className="search-box"
            />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="header-right">
            <a href="#"><i className="fa fa-user"></i></a>
            <a href="#"><i className="fa fa-shopping-cart"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};
 