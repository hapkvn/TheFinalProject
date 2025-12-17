const { Link } = ReactRouterDOM;

const Menu = () => {
  return (
    <div className="menu-sidebar" style={{background: '#fff', border: '1px solid #ddd', minHeight: '300px'}}>
      <div style={{background: '#eee', padding: '10px', fontWeight: 'bold'}}>
        <i className="fa fa-bars"></i> DANH MỤC
      </div>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        <li><Link to="/products" style={{display: 'block', padding: '10px', borderBottom: '1px solid #eee', color: '#333'}}>Tất cả sản phẩm</Link></li>
        <li><Link to="/products?cat=gaming" style={{display: 'block', padding: '10px', borderBottom: '1px solid #eee', color: '#333'}}>Laptop Gaming</Link></li>
        <li><Link to="/products?cat=macbook" style={{display: 'block', padding: '10px', borderBottom: '1px solid #eee', color: '#333'}}>Macbook Apple</Link></li>
        <li><Link to="/products?cat=office" style={{display: 'block', padding: '10px', borderBottom: '1px solid #eee', color: '#333'}}>Laptop Văn phòng</Link></li>
      </ul>
    </div>
  );
};

window.Menu = Menu;