const { HashRouter, Route, Switch } = ReactRouterDOM;

const App = () => {
    return (
        <HashRouter>
            {/* Header luôn hiển thị */}
            <Headers />

            {/* Container chính */}
            <div className="main-container" style={{display: 'flex', maxWidth: '1200px', margin: '20px auto', gap: '20px'}}>
                
                {/* MENU BÊN TRÁI (Chiếm 25%) */}
                <div style={{flex: '0 0 250px'}}>
                    <Menu />
                </div>

                {/* NỘI DUNG BÊN PHẢI (Chiếm phần còn lại) */}
                <div style={{flex: 1}}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/products" component={Products} />
                        {/* Route cho chi tiết sản phẩm */}
                        <Route path="/detail/:id" component={Detail} />
                    </Switch>
                </div>

            </div>

            {/* Footer luôn hiển thị */}
            <Footer />
        </HashRouter>
    );
};

// Render vào thẻ div#root trong index.html
ReactDOM.render(<App />, document.getElementById('root'));