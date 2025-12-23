const { Link, useLocation } = ReactRouterDOM;

const Products = () => {
    const search = new URLSearchParams(useLocation().search);
    const keyword = search.get("search") || "";
    const category = search.get("cat") || "";

    // Lấy dữ liệu từ window (file data.js)
    const products = window.DATA_PRODUCTS || [];

    // Logic lọc sản phẩm
    const filtered = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(keyword.toLowerCase());
        const matchCat = category ? p.cat === category : true;
        return matchName && matchCat;
    });

    return (
        <div className="product-page-container">
            {/* 1. Thanh Toolbar (Sắp xếp & So sánh) */}
            <div className="toolbar">
                <div className="sort-box">
                    Sắp xếp: 
                    <select className="sort-select">
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '10px' }}>So sánh</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            {/* Hiển thị tiêu đề tìm kiếm nếu có */}
            {(keyword || category) && (
                <h3 style={{ marginBottom: '15px' }}>
                    {keyword ? `Kết quả tìm kiếm: "${keyword}"` : `Danh mục: ${category}`}
                </h3>
            )}

            {/* 2. Lưới sản phẩm (Grid) */}
            <div className="product-grid">
                {filtered.length > 0 ? filtered.map(p => (
                    <div className="product-card" key={p.id}>
                        {/* Badge (Ruy băng cam góc trái) */}
                        <div className="top-badge">{p.badge}</div>

                    <div className="img-container">
                        {/* --- THÊM LINK VÀO ĐÂY --- */}
                        <Link to={`/detail/${p.id}`}>
                            <img src={p.img} alt={p.name} />
                        </Link>
                        {/* ------------------------- */}
                    </div>  

                        {/* Tag trạng thái */}
                        <div className="status-tag">{p.status}</div>

                        {/* Tên sản phẩm */}
                        <h3 className="prod-title">
                            <Link to={`/detail/${p.id}`}>{p.name}</Link>
                        </h3>

                        {/* Giá tiền */}
                        <div className="prod-price">{p.price} ₫</div>

                        {/* Footer của Card (Phiên bản & Yêu thích) */}
                        <div className="card-footer">
                            <span>phiên bản</span>
                            <span className="wishlist">Yêu thích</span>
                        </div>
                    </div>
                )) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        Không tìm thấy sản phẩm nào.
                    </p>
                )}
            </div>
        </div>
    );
};

window.Products = Products;