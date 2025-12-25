const { useParams, useHistory } = ReactRouterDOM; 
const { useState, useEffect } = React;

const Detail = () => {
    const { id } = useParams();

    const history = ReactRouterDOM.useHistory ? ReactRouterDOM.useHistory() : null;

    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;
  A
    const allItems = [...(window.DATA_PRODUCTS || []), ...(window.DATA_ACCESSORIES || [])];
    const product = allItems.find(p => p.id == id);

    const [selectedCombos, setSelectedCombos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (window.DATA_ACCESSORIES && window.DATA_ACCESSORIES.length > 0) {
            const suggestion = window.DATA_ACCESSORIES.filter(i => i.id != id).slice(0, 2);
            setSelectedCombos(suggestion);
        }
    }, [id]);


    const handleBuyNow = async () => {
        if (!username) {
            alert("Vui lòng đăng nhập để mua hàng!");
            history.push("/login");
            return;
        }


        const success = await window.CartService.addToCart(username, product.id, 1);
        
        if (success) {

            if (history) history.push("/cart"); 
            else window.location.href = "#/cart";
        } else {
            alert("Lỗi khi thêm vào giỏ hàng!");
        }
    };

    const handleAddToCart = async () => {
        if (!username) {
            alert("Vui lòng đăng nhập để thêm vào giỏ!");
            return;
        }

        const success = await window.CartService.addToCart(username, product.id, 1);
        if (success) {
            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);

        } else {
            alert("Lỗi kết nối server!");
        }
    };


    const handleBuyCombo = async () => {
        if (!username) { 
            alert("Vui lòng đăng nhập để mua hàng!"); 
            history.push("/login"); 
            return; 
        }


        let success = await window.CartService.addToCart(username, product.id, 1, true);
        

        if (success && selectedCombos.length > 0) {
            for (const item of selectedCombos) {

                await window.CartService.addToCart(username, item.id, 1, true);
            }
        }

        if (success) {
            alert(`Đã thêm Combo gồm Máy + ${selectedCombos.length} món phụ kiện vào giỏ!`);

            if (history) history.push("/cart"); 
            else window.location.href = "#/cart";
        } else {
            alert("Lỗi khi thêm sản phẩm vào giỏ!");
        }
    };


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