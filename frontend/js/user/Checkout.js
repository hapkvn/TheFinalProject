const { useState, useEffect } = React;
const { useHistory } = ReactRouterDOM;

const Checkout = () => {
    const history = useHistory();
    
    // --- STATE QUẢN LÝ ---
    const [cartItems, setCartItems] = useState([]); // Danh sách hiển thị (đã gom nhóm)
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD"); // Mặc định COD
    const [loading, setLoading] = useState(false);
    const [totalCalculation, setTotalCalculation] = useState(0); // Biến lưu tổng tiền thực tế

    // Lấy thông tin User
    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;

    // --- 1. LOAD DỮ LIỆU & GOM NHÓM SẢN PHẨM ---
    useEffect(() => {
        if (!username) {
            alert("Vui lòng đăng nhập!");
            history.push("/login");
            return;
        }

        // Lấy danh sách ID các món hàng được chọn từ trang Cart
        const checkoutIdsRaw = localStorage.getItem("checkoutIds");
        const checkoutIds = checkoutIdsRaw ? JSON.parse(checkoutIdsRaw) : [];

        fetch(`http://localhost:8088/api/cart?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // 1. Lọc: Chỉ lấy những món có trong danh sách chọn mua
                    let selectedRawItems = data;
                    if (checkoutIds.length > 0) {
                        selectedRawItems = data.filter(item => checkoutIds.includes(item.id));
                    }

                    if (selectedRawItems.length === 0) {
                        alert("Không có sản phẩm nào để thanh toán!");
                        history.push("/cart");
                        return;
                    }

                    // 2. Thuật toán GOM NHÓM (Grouping) - Giống trang Cart
                    let mainItems = [];
                    let accessoryItems = [];

                    selectedRawItems.forEach(item => {
                        const isComboItem = item.isCombo || item.combo || (item.is_combo === 1) || (item.is_combo === true);
                        const isAccessory = item.product.id > 100; // Quy ước ID > 100 là phụ kiện

                        if (isComboItem && isAccessory) {
                            accessoryItems.push(item);
                        } else {
                            // Tạo item chính, chuẩn bị mảng combos
                            mainItems.push({
                                ...item,
                                combos: [] 
                            });
                        }
                    });

                    // 3. Ghép phụ kiện vào món chính đầu tiên tìm thấy
                    if (accessoryItems.length > 0) {
                        const targetMain = mainItems.find(i => (i.isCombo || i.combo || i.is_combo) && i.product.id <= 100);
                        
                        if (targetMain) {
                            // Map lại dữ liệu phụ kiện cho đẹp
                            const formattedSubs = accessoryItems.map(acc => ({
                                id: acc.id,
                                name: acc.product.name,
                                price: acc.product.price,
                                img: acc.product.img,
                                quantity: acc.quantity
                            }));
                            targetMain.combos = formattedSubs;
                        } else {
                            // Nếu mua phụ kiện lẻ mà ko mua máy -> Đẩy về mainItems để hiện ra
                            mainItems = [...mainItems, ...accessoryItems];
                        }
                    }

                    setCartItems(mainItems);

                    // 4. Tính tổng tiền (Dựa trên danh sách gốc đã lọc)
                    // Tính tổng tất cả món (cả chính lẫn phụ kiện)
                    const total = selectedRawItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                    setTotalCalculation(total);
                }
            })
            .catch(err => console.error(err));
    }, [username]);

    // Format tiền tệ
    const formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // --- 2. XỬ LÝ THANH TOÁN (SUBMIT) ---
    const handleConfirmCheckout = async (e) => {
        e.preventDefault();

        // Validate cơ bản
        if (!address.trim() || !phone.trim()) {
            alert("Vui lòng nhập đầy đủ địa chỉ và số điện thoại!");
            return;
        }

        setLoading(true);

        try {
            // --- ÁP DỤNG BUILDER PATTERN ---
            // Gọi window.OrderBuilder (file js/builders/OrderBuilder.js)
            const orderPayload = new window.OrderBuilder()
                .withUser(username)
                .withDeliveryInfo(address, phone)
                .withPaymentMethod(paymentMethod) // Gửi phương thức thanh toán (COD/BANKING)
                .build();

            console.log("Payload gửi đi:", orderPayload);

            // Gọi API
            const response = await fetch("http://localhost:8088/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            if (response.ok) {
                alert("🎉 ĐẶT HÀNG THÀNH CÔNG! Cảm ơn bạn đã mua sắm.");
                // Xóa danh sách chọn mua tạm thời
                localStorage.removeItem("checkoutIds");
                // Chuyển hướng sang trang Lịch sử đơn hàng
                history.push("/orders");
            } else {
                const errData = await response.text();
                alert("Đặt hàng thất bại: " + errData);
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server!");
        } finally {
            setLoading(false);
        }
    };

    // --- 3. GIAO DIỆN (JSX) ---
    return (
        <div className="checkout-page-container">
            
            {/* CỘT TRÁI: FORM NHẬP LIỆU */}
            <div className="checkout-left">
                <h3 className="checkout-title">Thông tin giao hàng</h3>
                
                <form onSubmit={handleConfirmCheckout}>
                    {/* Người nhận */}
                    <div className="checkout-form-group">
                        <label className="checkout-label">Người nhận:</label>
                        <input 
                            type="text" 
                            className="checkout-input" 
                            value={(userStored && userStored.fullName) || ""} 
                            disabled 
                            style={{backgroundColor: '#f9f9f9', cursor: 'not-allowed'}}
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="checkout-form-group">
                        <label className="checkout-label">Số điện thoại <span className="required-star">*</span>:</label>
                        <input 
                            type="text" 
                            className="checkout-input"
                            placeholder="Nhập số điện thoại..." 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                        />
                    </div>

                    {/* Địa chỉ */}
                    <div className="checkout-form-group">
                        <label className="checkout-label">Địa chỉ nhận hàng <span className="required-star">*</span>:</label>
                        <textarea 
                            rows="3"
                            className="checkout-input"
                            placeholder="Số nhà, tên đường, phường/xã..." 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Chọn phương thức thanh toán (Factory Support) */}
                    <div className="checkout-form-group" style={{marginTop: '25px'}}>
                        <label className="checkout-label">Phương thức thanh toán:</label>
                        <div className="payment-options" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            
                            {/* Option 1: COD */}
                            <label className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`} 
                                   style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: paymentMethod === 'COD' ? '2px solid #d70018' : '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: '#fff', transition: 'all 0.2s'}}>
                                <input 
                                    type="radio" name="payment" value="COD" 
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{accentColor: '#d70018', transform: 'scale(1.2)'}}
                                />
                                <div>
                                    <strong style={{display: 'block', fontSize: '15px'}}>Thanh toán khi nhận hàng (COD)</strong>
                                    <span style={{fontSize: '13px', color: '#666'}}>Kiểm tra hàng rồi mới thanh toán.</span>
                                </div>
                            </label>

                            {/* Option 2: BANKING */}
                            <label className={`payment-option ${paymentMethod === 'BANKING' ? 'active' : ''}`}
                                   style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: paymentMethod === 'BANKING' ? '2px solid #d70018' : '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: '#fff', transition: 'all 0.2s'}}>
                                <input 
                                    type="radio" name="payment" value="BANKING" 
                                    checked={paymentMethod === 'BANKING'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{accentColor: '#d70018', transform: 'scale(1.2)'}}
                                />
                                <div>
                                    <strong style={{display: 'block', fontSize: '15px'}}>Chuyển khoản ngân hàng</strong>
                                    <span style={{fontSize: '13px', color: '#666'}}>Quét mã QR - Xác nhận tự động.</span>
                                </div>
                            </label>

                        </div>
                    </div>

                    {/* Nút Submit */}
                    <button type="submit" className="btn-confirm-checkout" disabled={loading} style={{marginTop: '20px'}}>
                        {loading ? "ĐANG XỬ LÝ..." : `XÁC NHẬN THANH TOÁN (${formatPrice(totalCalculation)} ₫)`}
                    </button>
                </form>
            </div>

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
            <div className="checkout-right">
                <h3 className="checkout-title">Đơn hàng của bạn</h3>
                
                <div className="order-summary-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="order-item">
                            {/* Ảnh sản phẩm chính */}
                            <img 
                                src={item.product.img} 
                                className="item-img" 
                                alt={item.product.name}
                                onError={(e) => {e.target.onerror=null; e.target.src="https://via.placeholder.com/80?text=No+Img"}}
                            />
                            
                            <div className="item-info">
                                {/* Tên món chính */}
                                <div className="item-name">{item.product.name}</div>
                                
                                {/* Số lượng & Giá */}
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px'}}>
                                    <span style={{fontSize: '13px', fontWeight: 'bold'}}>x {item.quantity}</span>
                                    <span className="item-price-highlight">{formatPrice(item.product.price * item.quantity)} ₫</span>
                                </div>

                                {/* --- HIỂN THỊ COMBO/QUÀ TẶNG (NẾU CÓ) --- */}
                                {item.combos && item.combos.length > 0 && (
                                    <div className="checkout-combo-list" style={{marginTop: '10px', background: '#f5f5f5', padding: '8px', borderRadius: '4px', fontSize: '12px'}}>
                                        <div style={{color: '#666', fontStyle: 'italic', marginBottom: '4px'}}>↳ Kèm theo:</div>
                                        {item.combos.map(sub => (
                                            <div key={sub.id} style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px'}}>
                                                <img src={sub.img} style={{width: '20px', height: '20px', objectFit: 'cover', borderRadius: '2px'}} />
                                                <span style={{flex: 1}}>{sub.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tổng tiền */}
                <div className="checkout-total-section">
                    <div className="total-row">
                        <span>Tổng cộng:</span>
                        <span className="total-price">{formatPrice(totalCalculation)} ₫</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

window.Checkout = Checkout;