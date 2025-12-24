const { useState, useEffect } = React;
const { useHistory, Link } = ReactRouterDOM;

const Checkout = () => {
    const history = useHistory();
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    // Lấy User
    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;

    // 1. Tải danh sách sản phẩm
    useEffect(() => {
        if (!username) {
            alert("Vui lòng đăng nhập!");
            history.push("/login");
            return;
        }

        fetch(`http://localhost:8088/api/cart?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    alert("Không có sản phẩm nào để thanh toán!");
                    history.push("/");
                }
                setCartItems(data);
            })
            .catch(err => console.error(err));
    }, [username]);

    // 2. Tính tổng tiền
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // 3. Xử lý Đặt Hàng
    const handleConfirmCheckout = async (e) => {
        e.preventDefault();
        if (!address || !phone) {
            alert("Vui lòng nhập đầy đủ địa chỉ và số điện thoại!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8088/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    address: address,
                    phone: phone
                })
            });

            if (response.ok) {
                alert("🎉 ĐẶT HÀNG THÀNH CÔNG! Cảm ơn bạn đã mua sắm.");
                history.push("/");
                window.location.reload(); 
            } else {
                alert("Đặt hàng thất bại. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối server!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page-container">
            
            {/* CỘT TRÁI: FORM NHẬP LIỆU */}
            <div className="checkout-left">
                <h3 className="checkout-title">Thông tin giao hàng</h3>
                
                <form onSubmit={handleConfirmCheckout}>
                    <div className="checkout-form-group">
                        <label className="checkout-label">Người nhận:</label>
                        <input 
                            type="text" 
                            className="checkout-input" 
                            value={userStored?.fullName || ""} 
                            disabled 
                        />
                    </div>

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

                    <button type="submit" className="btn-confirm-checkout" disabled={loading}>
                        {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT HÀNG"}
                    </button>
                </form>
            </div>

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
            <div className="checkout-right">
                <h3 className="checkout-title">Đơn hàng của bạn</h3>
                
                <div className="order-summary-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="order-item">
                            <img src={item.product.img} className="item-img" alt={item.product.name} />
                            <div className="item-info">
                                <div className="item-name">{item.product.name}</div>
                                <div>x {item.quantity}</div>
                                <div className="item-price-highlight">{formatPrice(item.product.price * item.quantity)} ₫</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="checkout-total-section">
                    <div className="total-row">
                        <span>Tổng cộng:</span>
                        <span className="total-price">{formatPrice(totalAmount)} ₫</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

window.Checkout = Checkout;