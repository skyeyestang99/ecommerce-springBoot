package com.ecommerce.invertory_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String skuCode;
    private boolean isInStock;
}
