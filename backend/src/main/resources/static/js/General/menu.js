const { Link } = ReactRouterDOM;

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-header">
        <i className="fa fa-bars"></i> 
        <span>DANH MỤC SẢN PHẨM</span>
      </div>
      
      <ul className="menu-danhmuc">
        <li><Link to="/products">Tất cả sản phẩm</Link></li>
        <li><Link to="/products?cat=gaming">Laptop Gaming</Link></li>
        <li><Link to="/products?cat=macbook">Macbook Apple</Link></li>
        <li><Link to="/products?cat=office">Laptop Văn phòng / Cao cấp</Link></li>
        <li><Link to="/products?cat=thin-light">Laptop Mỏng nhẹ</Link></li>
        <li><Link to="/products?cat=monitor">Màn hình máy tính</Link></li>
        <li><Link to="/products?cat=keyboard">Bàn phím cơ / Work</Link></li>
        <li><Link to="/products?cat=mouse">Chuột Gaming / Work</Link></li>
        <li><Link to="/products?cat=audio">Tai nghe & Loa</Link></li>
      </ul>
    </div>
  );
};

window.Menu = Menu;