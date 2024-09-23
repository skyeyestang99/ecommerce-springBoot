import './ProductList.css'
import React from "react"
import Product from "../Product/Product"

export default function ProductList() {


    return (
        <div className='product-list'>
            <h1 className='list-title'>Ecommerce Product Page</h1>
            <div className='product-grid'>
                <Product 
                    productName='iPhone'
                    skuCode='iphone_13_red'
                />
                <Product 
                    productName='iPhone 13 Red'
                    skuCode='iphone_13_red'
                />
                <Product
                    productName='iPhone 9'
                    skuCode='iphone_13_red'
                />
            </div>
        </div>
    )
}