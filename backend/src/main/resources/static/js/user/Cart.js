const { useState, useEffect } = React;
// 1. Lấy useHistory từ ReactRouterDOM
const { useHistory, Link } = ReactRouterDOM;

const Cart = () => {
    const history = useHistory(); // Khởi tạo history
    const [cartItems, setCartItems] = useState([]);
    const [checkedIds, setCheckedIds] = useState([]);
    
    const userStored = JSON.parse(localStorage.getItem("user"));
    const username = userStored ? userStored.username : null;

  
    // 2. GỌI API VÀ GOM NHÓM DỮ LIỆU
    useEffect(() => {
        if (username) {
            fetch(`http://localhost:8088/api/cart?username=${username}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Dữ liệu gốc từ Server:", data); // Check log

                    // BƯỚC 1: PHÂN LOẠI
                    let mainItems = [];      // Chứa Laptop/PC (Cả lẻ và Combo)
                    let accessoryItems = []; // Chứa Phụ kiện Combo (Để gộp vào Laptop)

                    data.forEach(item => {
                        // Chuẩn hóa cờ isCombo (Backend có thể trả về nhiều kiểu tên)
                        const isComboItem = item.isCombo || item.combo || (item.is_combo === 1) || (item.is_combo === true);
                        
                        // Xác định đâu là Phụ kiện dựa vào ID (theo data của bạn ID > 100 là phụ kiện)
                        // Hoặc bạn có thể check theo category nếu backend có trả về
                        const isAccessory = item.product.id > 100; 

                        if (isComboItem && isAccessory) {
                            // Đây là Phụ kiện của Combo -> Bỏ vào kho phụ kiện
                            accessoryItems.push(item);
                        } else {
                            // Đây là Laptop (Lẻ hoặc Combo) hoặc Phụ kiện mua lẻ -> Giữ làm dòng chính
                            // Tạo sẵn mảng combos rỗng cho nó
                            let newItem = {
                                ...item,
                                productId: item.product.id,
                                name: item.product.name,
                                price: item.product.price,
                                img: item.product.img,
                                combos: [], // Chuẩn bị chỗ chứa
                                isCombo: isComboItem // Lưu trạng thái
                            };
                            mainItems.push(newItem);
                        }
                    });

                    // BƯỚC 2: GÉP PHỤ KIỆN VÀO LAPTOP
                    // Logic: Tìm Laptop Combo đầu tiên và nhét tất cả phụ kiện combo vào đó
                    if (accessoryItems.length > 0) {
                        // Tìm sản phẩm chính là Combo (Ví dụ: Laptop Dell)
                        const targetMain = mainItems.find(i => i.isCombo && i.productId <= 100);

                        if (targetMain) {
                            // Map lại phụ kiện cho đẹp đội hình
                            const formattedAccessories = accessoryItems.map(acc => ({
                                id: acc.id, // Giữ ID cart để sau này xóa nếu cần
                                name: acc.product.name,
                                price: acc.product.price,
                                img: acc.product.img,
                                quantity: acc.quantity
                            }));

                            // Nhét vào bụng Laptop
                            targetMain.combos = formattedAccessories;
                        } else {
                            // Trường hợp hiếm: Mua phụ kiện combo mà không mua Laptop
                            // Thì đành trả nó về danh sách chính để nó hiện ra
                            const orphans = accessoryItems.map(item => ({
                                ...item,
                                productId: item.product.id,
                                name: item.product.name,
                                price: item.product.price,
                                img: item.product.img,
                                combos: []
                            }));
                            mainItems = [...mainItems, ...orphans];
                        }
                    }

                    // BƯỚC 3: CẬP NHẬT STATE
                    // Lúc này mainItems đã gọn gàng (Laptop đã chứa phụ kiện bên trong)
                    setCartItems(mainItems);
                })
                .catch(err => console.error("Lỗi tải giỏ hàng:", err));
        }
    }, [username]);

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

    const handleRemoveItem = async (cartId) => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        try {
            const response = await fetch(`http://localhost:8088/api/cart/${cartId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setCartItems(cartItems.filter(item => item.id !== cartId));
                setCheckedIds(checkedIds.filter(id => id !== cartId));
                alert("Đã xóa sản phẩm!");
            } else {
                alert("Lỗi khi xóa sản phẩm!");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
        }
    };

    const handleCheck = (id) => {
        if (checkedIds.includes(id)) {
            setCheckedIds(checkedIds.filter(item => item !== id));
        } else {
            setCheckedIds([...checkedIds, id]);
        }
    };

    const handleCheckAll = () => {
        if (checkedIds.length === cartItems.length) {
            setCheckedIds([]);
        } else {
            setCheckedIds(cartItems.map(item => item.id));
        }
    };


    const handleCheckout = () => {
        if (!username) {
            alert("Vui lòng đăng nhập để mua hàng!");
            history.push("/login");
            return;
        }

        if (checkedIds.length === 0) {
            alert("Bạn chưa chọn sản phẩm nào để thanh toán!");
            return;
        }

        localStorage.setItem("checkoutIds", JSON.stringify(checkedIds));

        history.push("/checkout");
    };

    const totalAmount = cartItems.reduce((sum, item) => {
        if (checkedIds.includes(item.id)) {
            const mainTotal = item.price * item.quantity;
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
                                <div className="main-product-row">
                                    <div className="col-check">
                                        <input 
                                            type="checkbox" 
                                            checked={checkedIds.includes(item.id)}
                                            onChange={() => handleCheck(item.id)}
                                        />
                                    </div>
                                    <div className="col-info">
                                        <img src={item.img || "https://via.placeholder.com/80"} alt={item.name} />
                                        <div className="info-text">
                                            <Link to={`/detail/${item.productId}`} className="name-link">{item.name}</Link>
                                            <div className="badges">
                                                <span className="badge-promo">Quà tặng kèm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-price">{formatPrice(item.price)} ₫</div>
                                    <div className="col-qty">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <input type="text" value={item.quantity} readOnly />
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                    <div className="col-total">{formatPrice(item.price * item.quantity)} ₫</div>
                                    <div className="col-action">
                                        <i className="fa-regular fa-trash-can" onClick={() => handleRemoveItem(item.id)}></i>
                                    </div>
                                </div>
                                {/* Phần Combo giữ nguyên */}
                                {item.combos.length > 0 && (
                                    <div className="combo-list-in-cart">
                                        <div className="combo-arrow-up"></div>
                                        {item.combos.map(combo => (
                                            <div className="combo-row" key={combo.id}>
                                                <div className="combo-check-placeholder"></div>
                                                <div className="combo-info">
                                                    <span className="combo-connector">↳ Mua kèm:</span>
                                                    <img src={combo.img} alt={combo.name} />
                                                    <span className="combo-name">{combo.name}</span>
                                                </div>
                                                <div className="combo-price">{formatPrice(combo.price)} ₫</div>
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

                        {/* --- NÚT MUA HÀNG ĐÃ ĐƯỢC GẮN SỰ KIỆN --- */}
                        <button 
                            className="btn-checkout" 
                            onClick={handleCheckout}
                        >
                            MUA HÀNG ({checkedIds.length})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

window.Cart = Cart;