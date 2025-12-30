package com.laptopShop.facade;

import com.laptopShop.entity.*;
import com.laptopShop.factory.PaymentFactory;
import com.laptopShop.repository.*;
import com.laptopShop.service.CartService;
import com.laptopShop.service.payment.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CheckoutFacade {
    @Autowired private CartService cartService;
    @Autowired private OrderRepository orderRepo;
    @Autowired private OrderDetailRepository orderDetailRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private PaymentFactory paymentFactory;

    @Transactional
    public void checkout(String username, String address, String phone, String paymentMethod) {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        List<Cart> cartItems = cartService.getMyCart(username);
        if(cartItems.isEmpty()) throw new RuntimeException("Giỏ hàng trống!");
        Order order = new Order();
        order.setUser(user);
        order.setFullname(user.getFullName()); // Lưu tên người nhận
        order.setAddress(address);
        order.setPhone(phone);
        order.setPaymentMethod(paymentMethod);


        double total = cartItems.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
        order.setTotalMoney(total);

        IPaymentService paymentService = paymentFactory.getService(paymentMethod);
        if (paymentService == null) {
            throw new RuntimeException("Phương thức thanh toán không hỗ trợ: " + paymentMethod);
        }
        paymentService.processPayment(order);

        Order savedOrder = orderRepo.save(order);

        for (Cart item : cartItems) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(savedOrder);
            detail.setProduct(item.getProduct());
            detail.setPrice(item.getProduct().getPrice());
            detail.setQuantity(item.getQuantity());
            detail.setTotalPrice(item.getProduct().getPrice() * item.getQuantity());

            orderDetailRepo.save(detail);

            Product product = item.getProduct();
            int newStock = product.getStock() - item.getQuantity();
            if (newStock < 0) {
                throw new RuntimeException("Sản phẩm " + product.getName() + " đã hết hàng!");
            }
            product.setStock(newStock);
            productRepo.save(product);
        }

        cartService.clearCart(username);
    }
}