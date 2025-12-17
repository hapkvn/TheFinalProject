const Home = () => {
    return (
        <div className="home-content">
            {/* Banner lớn */}
            <div style={{marginBottom: '20px'}}>
                <img src="https://via.placeholder.com/800x300?text=Sieu+Sale+Laptop" alt="Banner" style={{width: '100%', borderRadius: '5px'}} />
            </div>

            <h2>SẢN PHẨM NỔI BẬT</h2>
            <p>Chào mừng bạn đến với cửa hàng máy tính.</p>
            
            <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
                <div style={{flex: 1, background: '#f9f9f9', padding: '20px', border: '1px solid #ddd'}}>
                    <h3>Tin tức công nghệ</h3>
                    <ul>
                        <li>Ra mắt chip Intel thế hệ 14</li>
                        <li>Macbook Air M3 sắp về hàng</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

window.Home = Home;