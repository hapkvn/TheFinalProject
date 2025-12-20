const { useParams, Link } = ReactRouterDOM;

const Detail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    
    // Tìm sản phẩm trong dữ liệu
    const product = (window.DATA_PRODUCTS || []).find(p => p.id == id);

    if (!product) return <div style={{padding: 20}}>Không tìm thấy sản phẩm!</div>;

    // Danh sách các nhãn hiển thị (Mapping key sang tiếng Việt)
    const specLabels = {
        cpu: "CPU (Bộ vi xử lý)",
        ram: "Ram (Bộ nhớ trong)",
        storage: "Storage (Ổ cứng)",
        display: "Màn hình",
        gpu: "Card đồ họa",
        os: "Hệ điều hành",
        keyboard: "Bàn phím",
        fingerprint: "Bảo mật vân tay",
        battery: "Pin & Sạc",
        camera: "Webcam",
        audio: "Âm thanh",
        ports: "Cổng kết nối",
        wireless: "Kết nối không dây",
        size: "Kích thước",
        weight: "Trọng lượng",
        color: "Màu sắc",
        material: "Chất liệu",
        condition: "Tình trạng",
        year: "Năm sản xuất",
        warranty: "Bảo hành",
        brand: "Hãng sản xuất",
        origin: "Xuất xứ"
    };

    return (
        <div className="detail-container">
            {/* Nút quay lại */}
            <Link to="/" className="back-btn">← Quay lại danh sách</Link>

            <div className="detail-header">
                <div className="detail-img">
                    <img src={product.img} alt={product.name} />
                </div>
                <div className="detail-info">
                    <h1>{product.name}</h1>
                    <p className="detail-price">{product.price} ₫</p>
                    <div className="detail-status">{product.status}</div>
                    <p>{product.badge}</p>
                    <button className="buy-btn">MUA NGAY</button>
                </div>
            </div>

            {/* Bảng thông số kỹ thuật */}
            <div className="specs-section">
                <h2>Thông số kỹ thuật</h2>
                {product.specs && Object.keys(product.specs).length > 0 ? (
                    <table className="specs-table">
                        <tbody>
                            {/* Duyệt qua từng dòng trong specs để hiển thị */}
                            {Object.keys(specLabels).map(key => (
                                product.specs[key] ? (
                                    <tr key={key}>
                                        <td className="spec-label">{specLabels[key]}</td>
                                        <td className="spec-value">{product.specs[key]}</td>
                                    </tr>
                                ) : null
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Chưa có thông số chi tiết cho sản phẩm này.</p>
                )}
            </div>
        </div>
    );
};

window.Detail = Detail;