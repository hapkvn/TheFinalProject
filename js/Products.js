const { Link, useLocation } = ReactRouterDOM;

// Dữ liệu giả lập (Không cần fetch data.json để tránh lỗi)
const DATA_PRODUCTS = [
    { id: 1, name: "Asus ROG Strix", price: "25.000.000đ", img: "https://via.placeholder.com/200", cat: "gaming" },
    { id: 2, name: "Macbook Air M1", price: "18.000.000đ", img: "https://via.placeholder.com/200", cat: "macbook" },
    { id: 3, name: "Dell Inspiron 15", price: "15.000.000đ", img: "https://via.placeholder.com/200", cat: "office" },
    { id: 4, name: "Acer Nitro 5", price: "21.000.000đ", img: "https://via.placeholder.com/200", cat: "gaming" },
];

const Products = () => {
    const search = new URLSearchParams(useLocation().search);
    const keyword = search.get("search") || "";
    const category = search.get("cat") || "";

    // Logic lọc sản phẩm
    const filtered = DATA_PRODUCTS.filter(p => {
        const matchName = p.name.toLowerCase().includes(keyword.toLowerCase());
        const matchCat = category ? p.cat === category : true;
        return matchName && matchCat;
    });

    return (
        <div className="product-page">
            <h2>
                {keyword ? `Tìm kiếm: "${keyword}"` : category ? `Danh mục: ${category}` : "Tất cả sản phẩm"}
            </h2>

            <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
                {filtered.length > 0 ? filtered.map(p => (
                    <div key={p.id} style={{width: '30%', border: '1px solid #ddd', padding: '10px', textAlign: 'center'}}>
                        <img src={p.img} style={{width: '100%'}} alt={p.name} />
                        <h4>{p.name}</h4>
                        <p style={{color: 'red', fontWeight: 'bold'}}>{p.price}</p>
                        <Link to={`/detail/${p.id}`} className="btn btn-primary" style={{display:'inline-block', padding: '5px 10px', background: 'blue', color: 'white', textDecoration: 'none'}}>
                            Xem chi tiết
                        </Link>
                    </div>
                )) : <p>Không tìm thấy sản phẩm nào.</p>}
            </div>
        </div>
    );
};

window.Products = Products;
// Xuất data ra window để Detail.js dùng chung
window.DATA_PRODUCTS = DATA_PRODUCTS;