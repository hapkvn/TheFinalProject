const { useParams, Link } = ReactRouterDOM;

const Detail = () => {
    const { id } = useParams();
    
    // Tìm sản phẩm
    const product = (window.DATA_PRODUCTS || []).find(p => p.id == id);

    if (!product) return <div style={{padding: 20}}>Không tìm thấy sản phẩm!</div>;

    // Mapping key sang tiếng Việt (Code của bạn)
    const specLabels = {
        cpu: "CPU",
        ram: "RAM",
        storage: "Ổ cứng",
        display: "Màn hình",
        gpu: "VGA",
        os: "Hệ điều hành",
        keyboard: "Bàn phím",
        weight: "Trọng lượng",
        battery: "Pin",
        color: "Màu sắc",
        material: "Chất liệu",
        origin: "Xuất xứ"
    };

    return (
        <div className="detail-page-wrapper">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/">Trang chủ</Link> / <Link to="/products">Laptop</Link> / <span>{product.name}</span>
            </div>

            {/* 1. TÊN SẢN PHẨM (NẰM TRÊN CÙNG) */}
            <h1 className="product-name-top">{product.name}</h1>

            <div className="detail-main-content">
                
                {/* --- CỘT TRÁI: ẢNH & THÔNG SỐ KỸ THUẬT --- */}
                <div className="detail-left">
                    <div className="main-image-box">
                        <img src={product.img} alt={product.name} />
                    </div>
                    
                    {/* Thumbnail ảnh nhỏ */}
                    <div className="thumbnail-list">
                        <div className="thumb-item active"><img src={product.img} /></div>
                        <div className="thumb-item"><img src={product.img} /></div>
                        <div className="thumb-item"><img src={product.img} /></div>
                    </div>

                    {/* BẢNG THÔNG SỐ KỸ THUẬT (Code của bạn tích hợp vào đây) */}
                    <div className="specs-section">
                        <h2>Thông số kỹ thuật</h2>
                        {product.specs ? (
                            <table className="specs-table">
                                <tbody>
                                    {Object.keys(specLabels).map(key => 
                                        product.specs[key] ? (
                                            <tr key={key}>
                                                <td className="spec-label">{specLabels[key]}</td>
                                                <td className="spec-value">{product.specs[key]}</td>
                                            </tr>
                                        ) : null
                                    )}
                                </tbody>
                            </table>
                        ) : <p>Đang cập nhật...</p>}
                    </div>
                </div>

                {/* --- CỘT PHẢI: GIÁ & MUA HÀNG --- */}
                <div className="detail-right">
                    
                    <div className="price-section">
                        <span className="current-price">{product.price}</span>
                        <span className="vat-note">(Đã bao gồm VAT)</span>
                    </div>

                    {/* Khối Ưu đãi */}
                    <div className="promo-container">
                        <div className="promo-box">
                            <div className="box-header">ƯU ĐÃI</div>
                            <div className="box-content">
                                <ul>
                                    <li><i className="fa fa-gift"></i> Tặng Balo Laptop cao cấp.</li>
                                    <li><i className="fa fa-gift"></i> Tặng Chuột không dây chính hãng.</li>
                                    <li><i className="fa fa-gift"></i> Voucher giảm giá 200k cho lần mua sau.</li>
                                    <li><i className="fa fa-check-circle"></i> Hỗ trợ cài đặt phần mềm trọn đời.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bảo hành */}
                    <div className="warranty-badges">
                        <span><i className="fa fa-shield"></i> Bảo hành 12 tháng</span>
                        <span><i className="fa fa-refresh"></i> 1 đổi 1 trong 15 ngày</span>
                    </div>

                    {/* Nút Mua */}
                    <div className="action-buttons">
                        <button className="btn-buy-now">
                            <strong>MUA NGAY</strong>
                            <span>(Giao tận nơi hoặc nhận tại cửa hàng)</span>
                        </button>
                        <div className="btn-group-row">
                            <button className="btn-installment blue">
                                <strong>TRẢ GÓP 0%</strong>
                                <span>(Thủ tục đơn giản)</span>
                            </button>
                            <button className="btn-installment blue">
                                <strong>TRẢ GÓP QUA THẺ</strong>
                                <span>(Visa, Master, JCB)</span>
                            </button>
                        </div>
                    </div>

                    {/* Form tư vấn */}
                    <div className="consult-form">
                        <input type="text" placeholder="Nhập số điện thoại để được tư vấn..." />
                        <button>GỬI</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Detail = Detail;