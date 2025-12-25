const { useState } = React;
// Kiểm tra phiên bản React Router đang dùng (V5 dùng useHistory, V6 dùng useNavigate)
// Ở đây tôi giữ useHistory theo code của bạn.
const { useHistory, Link } = ReactRouterDOM;

const Register = () => {
    const history = useHistory();
    
    // --- KHAI BÁO STATE ---
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState(""); // Đổi Email thành Username để khớp với Java
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    
    // State thông báo
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess("");

        // 1. Validate phía Client
        if (password !== confirmPass) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        // 2. Chuẩn bị dữ liệu (Phải trùng tên biến với RegisterRequest.java bên Java)
        const dataToSend = {
            fullName: fullName,
            username: username,
            password: password
        };

        try {
            // 3. GỌI API SANG JAVA (Cổng 8088)
            const response = await fetch("http://localhost:8088/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            // 4. XỬ LÝ KẾT QUẢ
            if (response.ok) {
                setSuccess("Đăng ký thành công! Đang chuyển hướng...");
                // Đợi 1.5 giây rồi chuyển sang trang Login
                setTimeout(() => {
                    history.push("/login");
                }, 1500);
            } else {
                // Lỗi do Java trả về (Ví dụ: "Tên đăng nhập đã tồn tại")
                setError(data.message || "Đăng ký thất bại!");
            }

        } catch (err) {
            console.error(err);
            setError("Lỗi kết nối Server! Hãy kiểm tra xem Java đã chạy chưa.");
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-form-container">
                <h2>Đăng Ký</h2>
                <p className="login-desc">Tạo tài khoản để nhận ưu đãi ngay hôm nay.</p>
                
                <form onSubmit={handleRegister}>
                    
                    {/* HỌ TÊN */}
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input 
                            type="text" 
                            placeholder="Ví dụ: Nguyễn Văn A" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    {/* TÊN ĐĂNG NHẬP (Sửa từ Email) */}
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input 
                            type="text" 
                            placeholder="Nhập tên đăng nhập (viết liền)" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* MẬT KHẨU */}
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* NHẬP LẠI MẬT KHẨU */}
                    <div className="form-group">
                        <label>Nhập lại mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Xác nhận mật khẩu" 
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            required
                        />
                    </div>

                    {/* HIỂN THỊ THÔNG BÁO */}
                    {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                    {success && <p className="error-msg" style={{color: 'green', textAlign: 'center'}}>{success}</p>}

                    <button type="submit" className="btn-login-submit">ĐĂNG KÝ</button>
                </form>

                <div className="login-footer">
                    Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    );
};

window.Register = Register;