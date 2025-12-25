package com.laptopShop.facade;

import com.laptopShop.entity.*;
import com.laptopShop.repository.*;
import com.laptopShop.service.CartService;
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

    @Transactional // Rất quan trọng: Mọi thứ thành công hết hoặc thất bại hết
    public void checkout(String username, String address, String phone) {
        // 1. Lấy user và giỏ hàng
        User user = userRepo.findByUsername(username).orElseThrow();
        List<Cart> cartItems = cartService.getMyCart(username);

        if(cartItems.isEmpty()) throw new RuntimeException("Giỏ hàng trống!");

        // 2. Tạo đơn hàng (Order)
        Order order = new Order();
        order.setFullname(user.getFullName());
        order.setAddress(address);
        order.setPhone(phone);
        order.setStatus("PENDING");

        // Tính tổng tiền Java 8 Stream
        double total = cartItems.stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
        order.setTotalMoney(total);

        Order savedOrder = orderRepo.save(order);

        // 3. Lưu chi tiết đơn hàng (OrderDetail)
        for (Cart item : cartItems) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(savedOrder);
            detail.setProduct(item.getProduct());
            detail.setPrice(item.getProduct().getPrice());
            detail.setQuantity(item.getQuantity());
            detail.setTotalPrice(item.getProduct().getPrice() * item.getQuantity());

            orderDetailRepo.save(detail);

            // --- THÊM ĐOẠN NÀY ĐỂ TRỪ KHO ---
            Product product = item.getProduct();
            int newStock = product.getStock() - item.getQuantity();

            // Đảm bảo không bị âm kho (Logic an toàn)
            if (newStock < 0) {
                throw new RuntimeException("Sản phẩm " + product.getName() + " đã hết hàng!");
            }

            product.setStock(newStock);
            // productRepo chưa được khai báo ở trên thì bạn phải @Autowired thêm vào nhé
            productRepo.save(product);
        }

        // 4. Xóa giỏ hàng
        cartService.clearCart(username);
    }
}