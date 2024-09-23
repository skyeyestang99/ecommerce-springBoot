package com.productRepository.order_service.controller;

import com.productRepository.order_service.dto.OrderRequest;
import com.productRepository.order_service.service.OrderService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") //all request from localhost: 3000
public class OrderController {

    private static final Logger log = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod")
    public String placeOrder(@RequestBody OrderRequest orderRequest){
        orderService.placeOrder(orderRequest);
        return "Order Placed Successfully";
    }

    public String fallbackMethod(OrderRequest orderRequest, RuntimeException runtimeException){
        return "Oops! Something went wrong, please order after some time!";
    }
}
