// js/services/CartService.js
const CartService = {
    addToCart: async (username, productId, quantity) => {
        try {
            const response = await fetch("http://localhost:8088/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    productId: productId,
                    quantity: quantity
                })
            });
            if (response.ok) {
                return true;
            } else {
                console.error("Lỗi thêm giỏ hàng");
                return false;
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            return false;
        }
    }
};

window.CartService = CartService;