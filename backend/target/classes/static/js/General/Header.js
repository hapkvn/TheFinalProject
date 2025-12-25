const { Link, useHistory } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;

const Headers = () => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(null);
    

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        const userStored = localStorage.getItem("user");
        if (userStored) {
            try {
                setCurrentUser(JSON.parse(userStored));
            } catch (error) {
                console.error("Lỗi parse user:", error);
            }
        }
    }, []);


      const handleLogout = (e) => {
          e.preventDefault();
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          

          window.location.hash = "/";
          window.location.reload();
      };

    // Hàm tìm kiếm
    const handleSearch = () => {
        const input = document.querySelector(".search-input");
        if (input && input.value) {
            history.push(`/products?search=${input.value}`);
        }
    };

    return (
        <div className="header">
            <div className="main-top">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">LAPTOPVIP</Link>
                </div>

                {/* Menu chính */}
                <div className="nav-links">
                    <Link to="/">Trang chủ</Link>
                    <Link to="/products">Sản phẩm</Link>
                    <Link to="/cart">Giỏ hàng</Link>
                </div>

                {/* Tìm kiếm */}
                <div className="search-box">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Tìm sản phẩm..." 
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <div className="glass" onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>    
                    </div>
                </div>


                <div className="topRight">
                    <div className="contact">          
                        <Link to="/contact">Liên hệ</Link>
                    </div>


                    <div className="account">        
                        {currentUser ? (

                            <div className="account-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                
                                {/* Tên người dùng để bấm vào */}
                                <div className="user-name">
                                    <i className="fa-solid fa-user-circle" style={{fontSize: '20px'}}></i>
                                    <span>{currentUser.fullName || currentUser.username}</span>
                                    <i className={`fa-solid fa-caret-${isDropdownOpen ? 'up' : 'down'}`}></i>
                                </div>


                                {isDropdownOpen && (
                                    <div className="user-dropdown">
                                        

                                        <Link to="/profile" className="dropdown-item">
                                            <i className="fa-solid fa-id-card"></i> Hồ sơ của tôi
                                        </Link>

                                        <Link to="/orders" className="dropdown-item">
                                            <i className="fa-solid fa-box-open"></i> Đơn mua
                                        </Link>


                                        <a href="#" className="dropdown-item logout-btn" onClick={handleLogout}>
                                            <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (

                            <Link to="/login">
                                <i className="fa-solid fa-circle-user" style={{marginRight: '5px'}}></i>
                                Đăng nhập        
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Headers = Headers;