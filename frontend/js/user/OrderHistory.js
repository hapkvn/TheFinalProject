const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Lấy user đang đăng nhập
    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;

    // --- GỌI API LẤY ĐƠN HÀNG ---
    useEffect(() => {
        if (username) {
            fetch(`http://localhost:8088/api/orders?username=${username}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data);
                    }
                })
                .catch(err => console.error("Lỗi tải đơn hàng:", err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [username]);

    // Hàm format tiền
    const formatPrice = (num) => num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";

    // --- GIAO DIỆN ---
    if (!username) return <div style={{padding: 50, textAlign: 'center'}}>Vui lòng đăng nhập!</div>;

    return (
        <div className="cart-page-wrapper">
            <h2 className="cart-title">LỊCH SỬ ĐƠN HÀNG CỦA BẠN</h2>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : orders.length === 0 ? (
                <div className="empty-cart">
                    <p>Bạn chưa mua đơn hàng nào.</p>
                    <Link to="/products" className="btn-continue">Mua sắm ngay</Link>
                </div>
            ) : (
                <div className="order-list-container">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            {/* Header của Card: Mã đơn + Trạng thái */}
                            <div className="order-header">
                                <div>
                                    <strong>ĐƠN HÀNG #{order.id}</strong>
                                    <span className="order-date">
                                        {/* Format ngày tháng */}
                                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                                    </span>
                                </div>
                                <div className={`order-status status-${order.status}`}>
                                    {order.status}
                                </div>
                            </div>

                            {/* Body: Thông tin chung */}
                            <div className="order-body">
                                <p><i className="fa-solid fa-user"></i> Người nhận: {order.fullname}</p>
                                <p><i className="fa-solid fa-phone"></i> SĐT: {order.phone}</p>
                                <p><i className="fa-solid fa-location-dot"></i> Địa chỉ: {order.address}</p>
                                <p><i className="fa-regular fa-credit-card"></i> Thanh toán: {order.paymentMethod || "COD"}</p>
                            </div>

                            {/* Footer: Tổng tiền */}
                            <div className="order-footer">
                                <span>Tổng cộng:</span>
                                <span className="order-total-price">{formatPrice(order.totalMoney)} ₫</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

window.OrderHistory = OrderHistory;