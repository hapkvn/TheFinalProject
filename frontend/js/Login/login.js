const { useState } = React;
// V5: Lấy useHistory
const { useHistory, Link } = ReactRouterDOM;

const Login = () => {
    const history = useHistory(); // V5: Khởi tạo history
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const dataToSend = {
            username: username,
            password: password
        };

        try {
            // Gọi API sang Java (cổng 8080)
            const response = await fetch("http://localhost:8088/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

           // js/Login.js

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data));

                // --- SỬA DÒNG NÀY ---
                // Cũ: window.location.href = "/";
                // Mới: Chuyển hướng về trang chủ (Hash) rồi tải lại trang
                window.location.hash = "/"; 
                window.location.reload(); 
            }

        } catch (err) {
            console.error("Lỗi:", err);
            setError("Không thể kết nối Server!");
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