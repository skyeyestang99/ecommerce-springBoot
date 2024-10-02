package com.productRepository.order_service.service;

import com.productRepository.order_service.client.InventoryClient;
import com.productRepository.order_service.dto.OrderRequest;
import com.productRepository.order_service.event.OrderPlacedEvent;
import com.productRepository.order_service.model.Order;
import com.productRepository.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;
//    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    public void placeOrder(OrderRequest orderRequest){

        boolean isInStock = inventoryClient.isInStock(orderRequest.skuCode(), orderRequest.quantity());

        if(isInStock) {
            Order order = new Order();
            order.setOrderNumber(UUID.randomUUID().toString());
            order.setPrice(orderRequest.price());
            order.setQuantity(orderRequest.quantity());
            orderRepository.save(order);

            // Send the message to Kafka Topic
//            OrderPlacedEvent orderPlacedEvent = new OrderPlacedEvent(order.getOrderNumber(), orderRequest.userDetails().email());
//            System.out.println("preparing to send kafka");
//            kafkaTemplate.send("order-placed", orderPlacedEvent);
//            System.out.println(orderPlacedEvent);
        }
        else{
            throw new RuntimeException("Product with skuCode" + orderRequest.skuCode() + "is not in stock");
        }
    }
}
