package com.productRepository.order_service.dto;

import java.math.BigDecimal;

// commented out for deployment
//public record OrderRequest(Long id, String orderNumber, String skuCode, BigDecimal price, Integer quantity, UserDetails userDetails){
//    public record UserDetails(String email, String firstName, String lastName) {}
//}

public record OrderRequest(Long id, String orderNumber, String skuCode, BigDecimal price, Integer quantity){
//    public record UserDetails(String email, String firstName, String lastName) {}
}
