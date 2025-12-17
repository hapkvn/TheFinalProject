const { useParams, Link } = ReactRouterDOM;

const Detail = () => {
    const { id } = useParams();
    
    // Lấy data từ biến toàn cục đã khai báo ở Products.js (hoặc dùng lại mảng y hệt)
    // Để an toàn, tôi khai báo lại mảng data y hệt ở đây
    const DATA = [
        { id: 1, name: "Asus ROG Strix", price: "25.000.000đ", img: "https://via.placeholder.com/300", desc: "Laptop chơi game cấu hình khủng." },
        { id: 2, name: "Macbook Air M1", price: "18.000.000đ", img: "https://via.placeholder.com/300", desc: "Mỏng nhẹ, sang trọng, pin trâu." },
        { id: 3, name: "Dell Inspiron 15", price: "15.000.000đ", img: "https://via.placeholder.com/300", desc: "Bền bỉ cho văn phòng." },
        { id: 4, name: "Acer Nitro 5", price: "21.000.000đ", img: "https://via.placeholder.com/300", desc: "Gaming giá rẻ quốc dân." },
    ];

    const product = DATA.find(p => p.id == id);

    if (!product) return <h3>Sản phẩm không tồn tại!</h3>;

    return (
        <div className="detail-box">
            <h1>{product.name}</h1>
            <div style={{display: 'flex', gap: '30px', marginTop: '20px'}}>
                <img src={product.img} alt={product.name} style={{border: '1px solid #ddd'}} />
                <div>
                    <h2 style={{color: 'red'}}>{product.price}</h2>
                    <p>{product.desc}</p>
                    <button style={{padding: '10px 20px', background: 'red', color: 'white', border: 'none', cursor: 'pointer'}}>
                        ĐẶT MUA NGAY
                    </button>
                    <br/><br/>
                    <Link to="/products">← Quay lại danh sách</Link>
                </div>
            </div>
        </div>
    );
};

window.Detail = Detail;