const { useParams, Link } = ReactRouterDOM;

const Detail = () => {
    const { id } = useParams();
    const product = (window.DATA_PRODUCTS || []).find(p => p.id == id);

    if (!product) return <div style={{padding: 20}}>Không tìm thấy sản phẩm!</div>;

    // Mapping thông số kỹ thuật
    const specLabels = {
        cpu: "CPU", ram: "RAM", storage: "Ổ cứng", display: "Màn hình",
        gpu: "VGA", os: "Hệ điều hành", weight: "Trọng lượng", battery: "Pin"
    };

    // Dữ liệu giả lập cho phần Mua theo combo (Giống ảnh bạn gửi)
    const comboList = [
        { id: 1, name: "Chuột Không Dây Logitech Signature M650", price: "615.000 ₫", img: "https://via.placeholder.com/50" },
        { id: 2, name: "Phích cắm chuyển đổi 3 chấu sang 2 chấu tròn", price: "20.000 ₫", img: "https://via.placeholder.com/50" },
        { id: 3, name: "Giá Đỡ Laptop Đa Năng Z34", price: "130.000 ₫", img: "https://via.placeholder.com/50" },
        { id: 4, name: "Tấm Lót Bàn Phím Laptop Đa Năng Siêu Mỏng", price: "35.000 ₫", img: "https://via.placeholder.com/50" },
    ];

    return (
        <div className="detail-page-wrapper">
            

            {/* Tên sản phẩm trên cùng */}
            <h1 className="product-name-top">{product.name}</h1>

            <div className="detail-main-content">
                
                {/* --- CỘT TRÁI: ẢNH & THÔNG SỐ --- */}
                <div className="detail-left">
                    <div className="main-image-box">
                        <img src={product.img || "https://via.placeholder.com/500x500"} alt={product.name} />
                    </div>
                    
                    <div className="thumbnail-list">
                        <div className="thumb-item active"><img src={product.img || "https://via.placeholder.com/60"} /></div>
                        <div className="thumb-item"><img src={product.img || "https://via.placeholder.com/60"} /></div>
                        <div className="thumb-item"><img src={product.img || "https://via.placeholder.com/60"} /></div>
                    </div>

                    {/* Bảng thông số kỹ thuật */}
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

                {/* --- CỘT PHẢI: GIÁ, KHUYẾN MÃI & COMBO --- */}
                <div className="detail-right">
                    
                    <div className="price-section">
                        <span className="current-price">{product.price} ₫</span>
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
                                    <li><i className="fa fa-gift"></i> Voucher giảm giá 200k.</li>
                                    <li><i className="fa fa-check-circle"></i> Hỗ trợ cài đặt phần mềm trọn đời.</li>
                                </ul>
                            </div>
                        </div>
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

                    <div className="consult-form">
                        <input type="text" placeholder="Nhập số điện thoại để được tư vấn..." />
                        <button>GỬI</button>
                    </div>

                    {/* --- PHẦN MỚI THÊM: MUA THEO COMBO --- */}
                    <div className="combo-wrapper">
                        <h3 className="combo-title">Mua theo combo</h3>
                        
                        <div className="combo-list">
                            {comboList.map(item => (
                                <div className="combo-item" key={item.id}>
                                    <input type="checkbox" defaultChecked className="combo-checkbox" />
                                    <div className="combo-img">
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="combo-info">
                                        <div className="combo-name">{item.name}</div>
                                        <div className="combo-row-bottom">
                                            <span className="combo-price">{item.price}</span>
                                            <a href="#" className="link-change">Chọn sản phẩm khác &gt;</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Nút thêm sản phẩm khác (dấu +) */}
                            <div className="combo-add-more">
                                <div className="icon-plus">+</div>
                                <span>Thêm sản phẩm</span>
                            </div>
                        </div>

                        {/* Footer tổng tiền combo */}
                        <div className="combo-footer">
                            <button className="btn-buy-combo">MUA THÊM 4 SẢN PHẨM</button>
                            <div className="combo-total-info">
                                <div className="saving">Tiết kiệm: <span>114.000₫</span></div>
                                <div className="total">Tổng tiền: <span>20.870.000₫</span></div>
                            </div>
                        </div>
                    </div>
                    {/* --- KẾT THÚC PHẦN COMBO --- */}

                </div>
            </div>
        </div>
    );
};

window.Detail = Detail;