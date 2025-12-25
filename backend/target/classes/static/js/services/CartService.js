// File: js/services/CartService.js

const CartService = {
    // QUAN TRỌNG: Thêm tham số "isCombo = false" vào trong ngoặc đơn
    addToCart: async (username, productId, quantity, isCombo = false) => {
        try {
            const response = await fetch("http://localhost:8088/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    productId: productId,
                    quantity: quantity,
                    isCombo: isCombo // Bây giờ biến này mới tồn tại để gửi đi
                })
            });

            if (response.ok) {
                return true;
            } else {
                const data = await response.json();
                alert(data.message || "Lỗi khi thêm vào giỏ hàng");
                return false;
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            return false;
        }
    },
};

window.CartService = CartService;