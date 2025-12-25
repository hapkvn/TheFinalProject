const { useState, useEffect } = React;
const { Link, useLocation } = ReactRouterDOM;

const Products = () => {
    const location = useLocation();


    const allItems = [
        ...(window.DATA_PRODUCTS || []), 
        ...(window.DATA_ACCESSORIES || [])
    ];

    const [products, setProducts] = useState(allItems);

    const [activeCat, setActiveCat] = useState("all");

    const [sortType, setSortType] = useState("default");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get("search");
        const catParam = params.get("cat");

        let result = [...allItems];

        // Nếu có từ khóa tìm kiếm
        if (search) {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Nếu có tham số danh mục trên URL
        if (catParam) {
            result = result.filter(p => p.cat === catParam);
            setActiveCat(catParam);
        } else {
            // Nếu không có search/cat thì hiển thị tất cả
            if (!search) setActiveCat("all");
        }

        setProducts(result);
    }, [location.search]);


    const handleFilter = (category) => {
        setActiveCat(category);
        let result = [...allItems];

        if (category !== "all") {
            result = result.filter(p => p.cat === category);
        }
        

        setSortType("default");
        setProducts(result);
    };


    const handleSort = (e) => {
        const type = e.target.value;
        setSortType(type);

        let sorted = [...products];
        if (type === "asc") {
            sorted.sort((a, b) => 
                parseInt(a.price.replace(/\./g, '')) - parseInt(b.price.replace(/\./g, ''))
            );
        } else if (type === "desc") {
            sorted.sort((a, b) => 
                parseInt(b.price.replace(/\./g, '')) - parseInt(a.price.replace(/\./g, ''))
            );
        } else {
            sorted.sort((a, b) => a.id - b.id);
        }
        setProducts(sorted);
    };

    return (
        <div className="product-page-container">
            

            <div className="toolbar" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                

                


                <div className="sort-box" style={{alignSelf: 'flex-end'}}>
                    Sắp xếp: 
                    <select className="sort-select" onChange={handleSort} value={sortType}>
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>


            <div className="product-grid">
                {products.length > 0 ? products.map(p => (
                    <div className="product-card" key={p.id}>
                                           

                        <div className="img-container">
                            <Link to={`/detail/${p.id}`}>
                                <img src={p.img || "https://via.placeholder.com/300"} alt={p.name} />
                            </Link>
                        </div>  

                        {/* Tag trạng thái */}
                        <div className="status-tag">{p.status}</div>

                        {/* Tên sản phẩm */}
                        <h3 className="prod-title">
                            <Link to={`/detail/${p.id}`}>{p.name}</Link>
                        </h3>

                        {/* Giá tiền */}
                        <div className="prod-price">{p.price} ₫</div>

                        {/* Footer của Card */}
                        <div className="card-footer">
                            <span style={{fontSize: '12px', color: '#666', textTransform: 'capitalize'}}>
                                {p.cat} {/* Hiển thị loại sản phẩm */}
                            </span>
                            <span className="wishlist"><i className="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
                )) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                        Không tìm thấy sản phẩm nào phù hợp.
                    </p>
                )}
            </div>
        </div>
    );
};

window.Products = Products;