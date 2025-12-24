const Cart = () => {
    // 1. Khởi tạo giỏ hàng rỗng
    const [cartItems, setCartItems] = useState([]);
    const [checkedIds, setCheckedIds] = useState([]);
    
    // Lấy user từ localStorage (để biết ai đang đăng nhập)
    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;

    // 2. GỌI API LẤY GIỎ HÀNG KHI VÀO TRANG
    useEffect(() => {
        if (username) {
            fetch(`http://localhost:8088/api/cart?username=${username}`)
                .then(res => res.json())
                .then(data => {
                    // Dữ liệu từ Java trả về có cấu trúc: 
                    // [{id: 1, product: {name: "Dell", price: ...}, quantity: 1}, ...]
                    // Ta cần map lại một chút cho khớp giao diện React cũ nếu cần
                    const mappedData = data.map(item => ({
                        id: item.id,
                        productId: item.product.id,
                        name: item.product.name,
                        price: item.product.price,
                        img: item.product.img,
                        quantity: item.quantity,
                        combos: [] // Tạm thời để trống combo nếu chưa xử lý
                    }));
                    setCartItems(mappedData);
                })
                .catch(err => console.error("Lỗi tải giỏ hàng:", err));
        }
    }, [username]);

    // --- HÀM XỬ LÝ ---

    // 1. Tăng giảm số lượng
    const updateQuantity = (id, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        setCartItems(newCart);
    };

    // 2. Xóa sản phẩm (Xóa cả cụm)
    const removeItem = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            setCartItems(cartItems.filter(item => item.id !== id));
            // Bỏ tick nếu đang chọn
            setCheckedIds(checkedIds.filter(checkedId => checkedId !== id));
        }
    };

    // 3. Xử lý checkbox chọn mua
    const handleCheck = (id) => {
        if (checkedIds.includes(id)) {
            setCheckedIds(checkedIds.filter(item => item !== id));
        } else {
            setCheckedIds([...checkedIds, id]);
        }
    };

    // 4. Chọn tất cả
    const handleCheckAll = () => {
        if (checkedIds.length === cartItems.length) {
            setCheckedIds([]);
        } else {
            setCheckedIds(cartItems.map(item => item.id));
        }
    };

    // --- TÍNH TOÁN TỔNG TIỀN ---
    const totalAmount = cartItems.reduce((sum, item) => {
        // Chỉ tính tiền nếu sản phẩm được chọn (checked)
        if (checkedIds.includes(item.id)) {
            // Giá main = Giá * Số lượng
            const mainTotal = item.price * item.quantity;
            // Giá combo = Tổng giá phụ kiện * Số lượng (Phụ kiện cũng nhân theo số lượng máy)
            const comboTotal = item.combos.reduce((acc, combo) => acc + combo.price, 0) * item.quantity;
            
            return sum + mainTotal + comboTotal;
        }
        return sum;
    }, 0);

    const formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
        <div className="cart-page-wrapper">
            <h2 className="cart-title">Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h2>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Giỏ hàng đang trống!</p>
                    <Link to="/products" className="btn-continue">Tiếp tục mua sắm</Link>
                </div>
            ) : (
                <div className="cart-content">
                    {/* --- CỘT TRÁI: DANH SÁCH --- */}
                    <div className="cart-list">
                        
                        <div className="cart-header-row">
                            <label className="checkbox-wrap">
                                <input 
                                    type="checkbox" 
                                    checked={checkedIds.length === cartItems.length && cartItems.length > 0}
                                    onChange={handleCheckAll}
                                />
                                <span>Tất cả ({cartItems.length} sản phẩm)</span>
                            </label>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <span><i className="fa-solid fa-trash"></i></span>
                        </div>

                        {cartItems.map(item => (
                            <div className="cart-item-block" key={item.id}>
                                
                                {/* 1. DÒNG SẢN PHẨM CHÍNH */}
                                <div className="main-product-row">
                                    {/* Checkbox mua hàng */}
                                    <div className="col-check">
                                        <input 
                                            type="checkbox" 
                                            checked={checkedIds.includes(item.id)}
                                            onChange={() => handleCheck(item.id)}
                                        />
                                    </div>

                                    {/* Ảnh & Tên */}
                                    <div className="col-info">
                                        <img src={item.img || "https://via.placeholder.com/80"} alt={item.name} />
                                        <div className="info-text">
                                            <Link to={`/detail/${item.productId}`} className="name-link">{item.name}</Link>
                                            <div className="badges">
                                                <span className="badge-promo">Quà tặng kèm</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Đơn giá */}
                                    <div className="col-price">
                                        {formatPrice(item.price)} ₫
                                    </div>

                                    {/* Số lượng */}
                                    <div className="col-qty">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <input type="text" value={item.quantity} readOnly />
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>

                                    {/* Thành tiền (Main * Qty) */}
                                    <div className="col-total">
                                        {formatPrice(item.price * item.quantity)} ₫
                                    </div>

                                    {/* Nút xóa */}
                                    <div className="col-action">
                                        <i className="fa-regular fa-trash-can" onClick={() => removeItem(item.id)}></i>
                                    </div>
                                </div>

                                {/* 2. DANH SÁCH PHỤ KIỆN ĐI KÈM (Hiện nhỏ hơn) */}
                                {item.combos.length > 0 && (
                                    <div className="combo-list-in-cart">
                                        <div className="combo-arrow-up"></div> {/* Mũi tên trang trí */}
                                        {item.combos.map(combo => (
                                            <div className="combo-row" key={combo.id}>
                                                <div className="combo-check-placeholder"></div> {/* Khoảng trắng để thẳng hàng */}
                                                
                                                <div className="combo-info">
                                                    <span className="combo-connector">↳ Mua kèm:</span>
                                                    <img src={combo.img} alt={combo.name} />
                                                    <span className="combo-name">{combo.name}</span>
                                                </div>

                                                <div className="combo-price">{formatPrice(combo.price)} ₫</div>
                                                
                                                {/* Số lượng phụ kiện theo số lượng máy */}
                                                <div className="combo-qty">x {item.quantity}</div>
                                                
                                                <div className="combo-total">{formatPrice(combo.price * item.quantity)} ₫</div>
                                                <div className="combo-action"></div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* --- CỘT PHẢI: TỔNG KẾT --- */}
                    <div className="cart-summary-box">
                        <div className="summary-row">
                            <span>Tạm tính:</span>
                            <span>{formatPrice(totalAmount)} ₫</span>
                        </div>
                        <div className="summary-row">
                            <span>Giảm giá:</span>
                            <span>0 ₫</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-total">
                            <span>Tổng cộng:</span>
                            <span className="final-price">{formatPrice(totalAmount)} ₫</span>
                        </div>
                        <div className="vat-text">(Đã bao gồm VAT)</div>

                        <button className="btn-checkout">MUA HÀNG ({checkedIds.length})</button>
                    </div>
                </div>
            )}
        </div>
    );
};

window.Cart = Cart;