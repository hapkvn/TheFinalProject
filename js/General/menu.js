const Menu = () => {
  return (
    <div className="menu">
      {/* 1. Áp dụng class menu-header vào đây */}
      <div className="menu-header">
        <i className="fa fa-bars"></i> 
        <span>DANH MỤC</span>
      </div>
      
      {/* 2. Áp dụng class menu-danhmuc vào thẻ ul */}
      <ul className="menu-danhmuc">
        <li><Link to="/products">Máy tính xách tay</Link></li>
        <li><Link to="/products?cat=gaming">Laptop Gaming</Link></li>
        <li><Link to="/products?cat=macbook">Macbook Apple</Link></li>
        <li><Link to="/products?cat=office">Laptop cao cấp</Link></li>
        <li><Link to="/products?cat=office">Laptop live new</Link></li>
        <li><Link to="/products?cat=office">Phụ kiện</Link></li>
        <li><Link to="/products?cat=office">RAM, SSD</Link></li>
        <li><Link to="/products?cat=office">Màn hình</Link></li>
      </ul>
    </div>
  );
};