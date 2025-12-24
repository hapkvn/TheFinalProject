const { HashRouter, Route, Switch, useLocation } = ReactRouterDOM;

// 1. Component Layout để xử lý việc ẩn/hiện Menu
const MainLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();
    
    // Các trang không hiện Menu
    const noMenuPaths = ['/login', '/register', '/cart', '/contact', '/profile', '/orders', '/checkout'];
    const showMenu = !noMenuPaths.includes(currentPath);


    return (
        <div className="app-root">
            <React.Fragment>
                <window.Headers />

                <div className="main-container">
                    {/* Menu bên trái */}
                    {showMenu && (
                        <div style={{flex: '0 0 250px'}}>
                            <window.Menu />
                        </div>
                    )}

                    {/* Nội dung chính */}
                    <div style={{flex: 1}}>
                        {/* CÚ PHÁP V5: Dùng Switch */}
                        <Switch>
                            <Route exact path="/" component={window.Home} />
                            <Route path="/products" component={window.Products} />
                            <Route path="/detail/:id" component={window.Detail} />
                            <Route path="/cart" component={window.Cart} />
                    
                            <Route path="/checkout" component={window.Checkout} /> 

                            <Route path="/login" component={window.Login} />
                            <Route path="/register" component={window.Register} />
                        </Switch>
                    </div>
                </div>

                <window.Footer />
            </React.Fragment>
        </div>
    );
};

// 2. App gốc bọc Router
const App = () => {
    return (
        <HashRouter>
            <MainLayout />
        </HashRouter>
    );
};

// Render
ReactDOM.render(<App />, document.getElementById('root'));