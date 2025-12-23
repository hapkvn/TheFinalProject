const { useState } = React;
const { useHistory, Link } = ReactRouterDOM;

const Register = () => {
    const history = useHistory();
    
    // Khai báo các biến lưu trữ dữ liệu nhập vào
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // 1. Kiểm tra mật khẩu nhập lại có khớp không
        if (password !== confirmPass) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        // 2. Giả lập đăng ký thành công
        // (Ở dự án thật, bạn sẽ gửi dữ liệu này lên Server)
        console.log("Đăng ký:", { fullname, email, password });
        
        alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
        
        // 3. Chuyển hướng về trang đăng nhập
        history.push("/login");
    };

    return (
        // Chúng ta TÁI SỬ DỤNG class "login-page-wrapper" để có giao diện giống trang Login
        <div className="login-page-wrapper">
            <div className="login-form-container">
                <h2>Đăng Ký</h2>
                <p className="login-desc">Tạo tài khoản để nhận ưu đãi ngay hôm nay.</p>
                
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input 
                            type="text" 
                            placeholder="Nguyễn Văn A" 
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="email@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

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

                    {error && <p className="error-msg">{error}</p>}

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