const Home = () => {
    return (
        <div className="content">
            
            {/* 2. KHỐI BÊN TRÁI: Chứa ảnh Banner (Giữ nguyên) */}
            <div className="left">
                <img src="img/892x556_1762486949.webp" alt="Banner" />
            </div>

            {/* 3. KHỐI BÊN PHẢI: Giao diện Tin Mới Nhất (Đã sửa lại) */}
            <div className="right">
                
                {/* Tiêu đề */}
                <div className="news-header">TIN MỚI NHẤT</div>

                {/* Danh sách các tin */}
                <div className="news-list">
                    
                    {/* Tin 1: Có highlight (nền xanh nhạt) */}
                    <div className="news-item highlight">
                        {/* Ảnh thumbnail */}
                        <img src="https://via.placeholder.com/150" alt="Tin 1" className="news-thumb" />
                        {/* Thông tin */}
                        <div className="news-info">
                            <span className="news-title">GIGABYTE CHRISTMAS & NEW YEAR: Ưu đãi cực khủng</span>
                            <span className="news-meta">13/12/2025 - 135 views</span>
                        </div>
                    </div>

                    {/* Tin 2 */}
                    <div className="news-item">
                        <img src="https://via.placeholder.com/150" alt="Tin 2" className="news-thumb" />
                        <div className="news-info">
                            <span className="news-title">THÔNG BÁO THAY ĐỔI LỊCH LÀM VIỆC NGÀY LỄ</span>
                            <span className="news-meta">10/12/2025 - 85 views</span>
                        </div>
                    </div>

                    {/* Tin 3 */}
                    <div className="news-item">
                        <img src="https://via.placeholder.com/150" alt="Tin 3" className="news-thumb" />
                        <div className="news-info">
                            <span className="news-title">Có nên mua laptop làm quà Giáng Sinh? Top 5 lựa chọn</span>
                            <span className="news-meta">04/12/2025 - 125 views</span>
                        </div>
                    </div>

                    {/* Tin 4 */}
                    <div className="news-item">
                        <img src="https://via.placeholder.com/150" alt="Tin 4" className="news-thumb" />
                        <div className="news-info">
                            <span className="news-title">Laptop OLED có bền không? Tư vấn laptop văn phòng</span>
                            <span className="news-meta">19/11/2025 - 296 views</span>
                        </div>
                    </div>

                </div>

                {/* Footer Link */}
                <div className="news-footer">
                    Tất cả tin tức <i className="fa-solid fa-chevron-right" style={{fontSize: '10px', marginLeft: '5px'}}></i>
                </div>

            </div>
            
        </div>
    );
};

window.Home = Home;