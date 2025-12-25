const { HashRouter, Route, Switch, useLocation } = ReactRouterDOM;

// 1. Component Layout để xử lý việc ẩn/hiện Menu
const MainLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();
    

    const noMenuPaths = ['/login', '/register', '/cart', '/contact', '/profile', '/orders', '/checkout'];
    const showMenu = !noMenuPaths.includes(currentPath);


    return (
        <div className="app-root">
            <React.Fragment>
                <window.Headers />

                <div className="main-container">
                    {showMenu && (
                        <div style={{flex: '0 0 250px'}}>
                            <window.Menu />
                        </div>
                    )}
                    <div style={{flex: 1}}>
                        <Switch>
                            <Route exact path="/" component={window.Home} />
                            <Route path="/products" component={window.Products} />
                            <Route path="/detail/:id" component={window.Detail} />
                            <Route path="/cart" component={window.Cart} />
                            <Route path="/orders" component={window.OrderHistory} />
                                                
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