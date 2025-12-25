const { useParams, useHistory } = ReactRouterDOM; 
const { useState, useEffect } = React;

const Detail = () => {
    const { id } = useParams();
    // Xử lý history để chuyển trang (hỗ trợ cả Router v5 và v6/Hash)
    const history = ReactRouterDOM.useHistory ? ReactRouterDOM.useHistory() : null;

    // 1. LẤY USERNAME TỪ LOCALSTORAGE
    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;

    // 2. LẤY SẢN PHẨM TỪ DATA
    const allItems = [...(window.DATA_PRODUCTS || []), ...(window.DATA_ACCESSORIES || [])];
    const product = allItems.find(p => p.id == id);
    
    // State chọn combo
    const [selectedCombos, setSelectedCombos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Tự động gợi ý combo nếu có
    useEffect(() => {
        if (window.DATA_ACCESSORIES && window.DATA_ACCESSORIES.length > 0) {
            // Lọc bỏ chính nó ra khỏi danh sách gợi ý (nếu đang xem phụ kiện)
            const suggestion = window.DATA_ACCESSORIES.filter(i => i.id != id).slice(0, 2);
            setSelectedCombos(suggestion);
        }
    }, [id]);

    // --- HÀM 1: MUA NGAY (Thêm -> Chuyển sang Giỏ hàng) ---
    const handleBuyNow = async () => {
        if (!username) {
            alert("Vui lòng đăng nhập để mua hàng!");
            history.push("/login");
            return;
        }

        // Gọi API thêm vào giỏ
        const success = await window.CartService.addToCart(username, product.id, 1);
        
        if (success) {
            // --- SỬA Ở ĐÂY ---
            // Thay vì push("/checkout"), hãy đưa về "/cart"
            if (history) history.push("/cart"); 
            else window.location.href = "#/cart";
        } else {
            alert("Lỗi khi thêm vào giỏ hàng!");
        }
    };

    // --- HÀM 2: THÊM VÀO GIỎ (Thêm -> Ở lại trang hiện tại) ---
    const handleAddToCart = async () => {
        if (!username) {
            alert("Vui lòng đăng nhập để thêm vào giỏ!");
            return;
        }
        // Hiệu ứng rung nhẹ hoặc thông báo
        const success = await window.CartService.addToCart(username, product.id, 1);
        if (success) {
            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
            // Có thể reload nhẹ header nếu muốn cập nhật số lượng
        } else {
            alert("Lỗi kết nối server!");
        }
    };

    // --- HÀM 3: MUA COMBO ---
   // Trong file Detail.js
    const handleBuyCombo = async () => {
        if (!username) { /* check login */ return; }

        // Gọi API thêm vào giỏ với cờ isCombo = true
        // KHÔNG CẦN add thêm chuột nữa, vì ta coi chuột là phần đi kèm của Laptop này
        const success = await window.CartService.addToCart(username, product.id, 1, true); // <--- Thêm true vào tham số cuối (bạn cần sửa CartService.js ở client nữa)
        
        if (success) {
            alert("Đã thêm Combo vào giỏ!");
            history.push("/cart");
        }
    };

    // Logic tính toán hiển thị
    if (!product) return <div style={{padding:20}}>Không tìm thấy sản phẩm</div>;

    const specLabels = { cpu: "CPU", ram: "RAM", storage: "Ổ cứng", display: "Màn hình", gpu: "VGA" };
    const productPrice = parseInt(product.price.toString().replace(/\./g, ''));
    const comboPrice = selectedCombos.reduce((total, item) => total + parseInt(item.price.toString().replace(/\./g, '')), 0);
    const totalPrice = productPrice + comboPrice;
    const formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Hàm thêm/bớt combo
    const removeComboItem = (id) => setSelectedCombos(selectedCombos.filter(i => i.id !== id));
    const addComboItem = (item) => {
        if (!selectedCombos.find(c => c.id === item.id)) {
            setSelectedCombos([...selectedCombos, item]);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="detail-page-wrapper">
            <h1 className="product-name-top">{product.name}</h1>

            <div className="detail-main-content">
                
                {/* --- CỘT TRÁI: ẢNH & THÔNG SỐ (PHẦN BẠN BỊ MẤT) --- */}
                <div className="detail-left">
                    <div className="main-image-box">
                        <img src={product.img || "https://via.placeholder.com/500"} alt={product.name} />
                    </div>
                    <div className="specs-section">
                        <h2>Thông số kỹ thuật</h2>
                        <table className="specs-table">
                            <tbody>
                                {product.specs && Object.keys(specLabels).map(key => 
                                    product.specs[key] && (
                                        <tr key={key}>
                                            <td className="spec-label">{specLabels[key]}</td>
                                            <td className="spec-value">{product.specs[key]}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- CỘT PHẢI: GIÁ & NÚT MUA --- */}
                <div className="detail-right">
                    <div className="price-section">
                        <span className="current-price">{product.price} ₫</span>
                        <span className="vat-note">(Đã bao gồm VAT)</span>
                    </div>

                    <div className="promo-container">
                        <div className="promo-box">
                            <div className="box-header"><i className="fa fa-gift"></i> QUÀ TẶNG ƯU ĐÃI</div>
                            <div className="box-content">
                                <ul><li>Tặng Balo Laptop cao cấp.</li><li>Voucher giảm giá 200k.</li></ul>
                            </div>
                        </div>
                    </div>

                    {/* --- KHỐI NÚT MUA (ĐÃ SỬA) --- */}
                    <div className="action-buttons">
                        
                        {/* Dòng 1: Mua ngay + Thêm vào giỏ */}
                        <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                            
                            <button className="btn-buy-now" onClick={handleBuyNow} style={{flex: 1, marginBottom: 0}}>
                                <strong>MUA NGAY</strong>
                                <span>(Giao tận nơi)</span>
                            </button>

                            <button className="btn-add-cart" onClick={handleAddToCart} style={{width: '120px'}}>
                                <i className="fa-solid fa-cart-plus" style={{fontSize: '20px', marginBottom: '5px'}}></i>
                                <span>Thêm vào giỏ</span>
                            </button>

                        </div>
                    </div>

                    {/* --- PHẦN MUA COMBO --- */}
                    <div className="combo-wrapper">
                        <h3 className="combo-title">Ưu đãi mua kèm</h3>
                        <div className="combo-list">
                            {selectedCombos.map(item => (
                                <div className="combo-item" key={item.id}>
                                    <div className="icon-remove" onClick={() => removeComboItem(item.id)}><i className="fa-solid fa-circle-minus"></i></div>
                                    <div className="combo-img"><img src={item.img} /></div>
                                    <div className="combo-info">
                                        <div className="combo-name">{item.name}</div>
                                        <div className="combo-price">{item.price} ₫</div>
                                    </div>
                                </div>
                            ))}
                            <div className="combo-add-more" onClick={() => setIsModalOpen(true)}>
                                <div className="icon-plus">+</div><span>Thêm phụ kiện khác</span>
                            </div>
                        </div>
                        <div className="combo-footer">
                            <button className="btn-buy-combo" onClick={handleBuyCombo}>MUA COMBO ({selectedCombos.length + 1} SP)</button>
                            <div className="combo-total-info">
                                <div className="total">Tổng: <span>{formatPrice(totalPrice)} ₫</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL CHỌN COMBO --- */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header"><h3>Chọn phụ kiện</h3><button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button></div>
                        <div className="modal-body">
                            {(window.DATA_ACCESSORIES || []).map(acc => (
                                <div className="modal-item" key={acc.id}>
                                    <img src={acc.img} />
                                    <div className="modal-item-info"><div>{acc.name}</div><div className="modal-item-price">{acc.price} ₫</div></div>
                                    <button className="btn-add-acc" onClick={() => addComboItem(acc)} disabled={selectedCombos.find(c => c.id === acc.id)}>
                                        {selectedCombos.find(c => c.id === acc.id) ? "Đã chọn" : "Thêm"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

window.Detail = Detail;