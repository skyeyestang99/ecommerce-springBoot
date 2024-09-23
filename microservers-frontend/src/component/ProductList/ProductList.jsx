import './ProductList.css'
import React from "react"
import Product from "../Product/Product"

export default function ProductList() {


    return (
        <div className='product-list'>
            <h1 className='list-title'>Ecommerce Product Page</h1>
            <div className='product-grid'>
                <Product 
                    productName='iphone_15'
                    skuCode='iphone_15'
                />
                <Product 
                    productName='iphone_15'
                    skuCode='iphone_15'
                />
                <Product
                    productName='iphone_15'
                    skuCode='iphone_15'
                />
            </div>
        </div>
    )
}