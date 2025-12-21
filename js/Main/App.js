const { HashRouter, Route, Switch, useLocation } = ReactRouterDOM;

// 1. Tạo một component con để xử lý logic hiển thị
const MainLayout = () => {
    const location = useLocation(); // Hook này giúp lấy đường dẫn hiện tại
    const currentPath = location.pathname;
    
    // Kiểm tra: Nếu đường dẫn là "/login" thì biến này là true
    const noMenuPaths = ['/Login', '/register', '/cart','/contact'];
    const showMenu = !noMenuPaths.includes(currentPath);

    return (
        <div className="app-root">

        
        <React.Fragment>
            {/* Header luôn hiển thị (Giữ nguyên) */}
            <Headers />

            {/* Container chính (Giữ nguyên) */}
            <div className="main-container">

                
                {showMenu &&  (
                    <div style={{flex: '0 0 250px'}}>
                        <Menu />
                    </div>
                )}
                <div style={{flex: 1}}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/products" component={Products} />
                        <Route path="/detail/:id" component={Detail} />
                        <Route path="/Login" component={Login} />
                    </Switch>
                </div>

            </div>

            {/* Footer luôn hiển thị (Giữ nguyên) */}
            <Footer />
        </React.Fragment>
        </div>
    );
};

// 2. Component App gốc chỉ còn nhiệm vụ bọc HashRouter
const App = () => {
    return (
        <HashRouter>
            <MainLayout />
        </HashRouter>
    );
};

// Render
ReactDOM.render(<App />, document.getElementById('root'));