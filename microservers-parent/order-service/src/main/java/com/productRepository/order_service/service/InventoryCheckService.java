package com.productRepository.order_service.service;

import com.productRepository.order_service.dto.InventoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryCheckService {
    private final WebClient webClient;

    @Cacheable(value = "inventoryCheck", key = "#skuCodes")
    public boolean checkIfInStock(List<String> skuCodes) {
        // Call Inventory Service, and place order if product is in stock
        InventoryResponse[] inventoryResponsesArray = webClient.get()
                .uri("http://localhost:8082/api/inventory",
                        uriBuilder -> uriBuilder.queryParam("skuCode", skuCodes).build()
                )
                .retrieve()
                .bodyToMono(InventoryResponse[].class)
                .block(); //block makes a sync request

        return Arrays.stream(inventoryResponsesArray)
                .allMatch(InventoryResponse::isInStock);
    }
}
