package com.productRepository.order_service.service;

import com.productRepository.order_service.dto.OrderLineItemsDTO;
import com.productRepository.order_service.dto.OrderRequest;
import com.productRepository.order_service.model.Order;
import com.productRepository.order_service.model.OrderLineItems;
import com.productRepository.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryCheckService inventoryCheckService;

    public void placeOrder(OrderRequest orderRequest){
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderLineItems> orderLineItems =orderRequest.getOrderLineItemsDTOList()
                .stream()
                .map(this::mapToDto)
                .toList();
        order.setOrderLineItemsList(orderLineItems);

        List<String> skuCodes = order.getOrderLineItemsList().stream()
                .map(OrderLineItems::getSkuCode)
                .toList();

        boolean allProductsInStock = inventoryCheckService.checkIfInStock(skuCodes);

        if(allProductsInStock){
            orderRepository.save(order);
        }
        else{
            throw new IllegalArgumentException("Product is not in stock try later.");
        }
    }

    private OrderLineItems mapToDto(OrderLineItemsDTO orderLineItemsDTO) {
        OrderLineItems orderLineItems = new OrderLineItems();
        orderLineItems.setPrice(orderLineItemsDTO.getPrice());
        orderLineItems.setQuantity(orderLineItemsDTO.getQuantity());
        orderLineItems.setSkuCode(orderLineItemsDTO.getSkuCode());
        return orderLineItems;
    }

}
