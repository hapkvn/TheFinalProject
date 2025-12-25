

class OrderBuilder {
    constructor() {
        this.order = {
            username: null,
            address: null,
            phone: null,
            paymentMethod: "COD" // Mặc định
        };
    }

    withUser(username) {
        this.order.username = username;
        return this;
    }

    withDeliveryInfo(address, phone) {
        this.order.address = address;
        this.order.phone = phone;
        return this;
    }

    withPaymentMethod(method) {
        this.order.paymentMethod = method;
        return this;
    }

    build() {
        // Có thể validate dữ liệu ở đây
        if (!this.order.username) throw new Error("Thiếu thông tin User");
        if (!this.order.phone) throw new Error("Thiếu số điện thoại");
        return this.order;
    }
}

window.OrderBuilder = OrderBuilder;