const { Link } = ReactRouterDOM;

const Home = () => {
    const allProducts = window.DATA_PRODUCTS || [];
    const newProducts = allProducts.slice(0, 4);
    const bestSellers = allProducts.slice(4, 8);

    const ProductCard = ({ product }) => (
        <div className="product-card">
            <div className="img-container">
                <Link to={`/detail/${product.id}`}>
                    <img src={product.img || "https://via.placeholder.com/300x200"} alt={product.name} />
                </Link>
            </div>
            <div className="status-tag">{product.status || "Sẵn hàng"}</div>
            <h3 className="prod-title">
                <Link to={`/detail/${product.id}`}>{product.name}</Link>
            </h3>
            <div className="prod-price">{product.price} ₫</div>
            <div className="card-footer">
                <span>Phiên bản: Quốc tế</span>
                <span className="wishlist"><i className="fa fa-heart"></i> Yêu thích</span>
            </div>
        </div>
    );

    return (
        <div className="home-wrapper">
            
            {/* --- PHẦN 1: BANNER & TIN TỨC --- */}
            <div className="content">
                <div className="left">
                    <img src="img/892x556_1762486949.webp" alt="Banner" />
                </div>
                <div className="right">
                    <div className="news-header">TIN MỚI NHẤT</div>
                    <div className="news-list">
                        <div className="news-item highlight">
                            <img src="img/gg.jpg" className="news-thumb" />
                            <div className="news-info">
                                <span className="news-title">GIGABYTE CHRISTMAS & NEW YEAR: Ưu đãi cực khủng</span>
                                <span className="news-meta">13/12/2025 - 135 views</span>
                            </div>
                        </div>
                        <div className="news-item">
                            <img src="img/noel.jpg" className="news-thumb" />
                            <div className="news-info">
                                <span className="news-title">THÔNG BÁO LỊCH LÀM VIỆC NGÀY LỄ</span>
                                <span className="news-meta">10/12/2025 - 85 views</span>
                            </div>
                        </div>
                        <div className="news-item">
                            <img src="img/15.jpg" className="news-thumb" />
                            <div className="news-info">
                                <span className="news-title">Top 5 laptop làm quà Giáng Sinh</span>
                                <span className="news-meta">04/12/2025 - 125 views</span>
                            </div>
                        </div>
                    </div>
                    <div className="news-footer">
                        Tất cả tin tức <i className="fa-solid fa-chevron-right" style={{fontSize: '10px'}}></i>
                    </div>
                </div>
            </div>


            <div className="home-section">
                <div className="section-head">
                    <h2 className="sec-title">
                        <i className="fa fa-bolt" style={{color: '#ff8a00'}}></i> SẢN PHẨM MỚI VỀ
                    </h2>
                    <Link to="/products" className="view-all-btn">Xem tất cả <i className="fa fa-angle-right"></i></Link>
                </div>
                <div className="product-grid">
                    {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>

            {/* --- PHẦN 3: SẢN PHẨM BÁN CHẠY --- */}
            <div className="home-section">
                <div className="section-head">
                    <h2 className="sec-title">
                        <i className="fa fa-fire" style={{color: '#d70018'}}></i> SẢN PHẨM BÁN CHẠY
                    </h2>
                    <Link to="/products" className="view-all-btn">Xem tất cả <i className="fa fa-angle-right"></i></Link>
                </div>
                <div className="product-grid">
                    {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>

        </div>
    );
};

window.Home = Home;