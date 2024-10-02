package com.productRepository.order_service.client;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "inventory", url = "http://Inventory-service-10-env.eba-vxqumbm2.us-east-2.elasticbeanstalk.com:5000")
public interface InventoryClient {

    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod")
    @GetMapping("/api/inventory")
    @Retry(name = "inventory")
    boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);

    default boolean fallbackMethod(String code, Integer quantity, Throwable throwable) {
        System.out.println("fallback called due to:" + throwable.getMessage());
        return false;
    }
}
