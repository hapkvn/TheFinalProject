const { useState } = React;
const { useHistory, Link } = ReactRouterDOM;

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault(); // Ngăn việc tải lại trang
        
        // --- LOGIC KIỂM TRA MẬT KHẨU GIẢ LẬP ---
        if (username === "admin" && password === "123456") {
            // 1. Lưu trạng thái đã đăng nhập vào LocalStorage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", username);
            
            // 2. Chuyển hướng về trang chủ
            alert("Đăng nhập thành công!");
            history.push("/"); 
            
            // (Mẹo: Nếu muốn reload để Header cập nhật tên, dùng window.location.href = "/")
        } else {
            setError("Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-form-container">
                <h2>Đăng Nhập</h2>
                <p className="login-desc">Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên.</p>
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Tên đăng nhập / Email</label>
                        <input 
                            type="text" 
                            placeholder="Nhập admin" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Nhập 123456" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <div className="form-actions">
                        <Link to="#" className="forgot-pass">Quên mật khẩu?</Link>
                    </div>

                    <button type="submit" className="btn-login-submit">ĐĂNG NHẬP</button>
                </form>

                <div className="login-footer">
                    Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
};

window.Login = Login;