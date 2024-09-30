import './ProductList.css'
import React, { useEffect, useState } from "react"
import Product from "../Product/Product"
import { getAllProducts } from '../../service/product/getAllProducts'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'

export default function ProductList() {
    const navigate = useNavigate()
    const { keycloak, initialized }= useKeycloak()
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState(false)
    const [err, setErr] = useState(null)

    useEffect(() => {
        const loadProduct = async () => {
            setLoad(true)
            try {
                if (initialized && keycloak.authenticated) {
                    await keycloak.updateToken(30);
                    const token = keycloak.token
                    console.log('you are authebnticated')
                    const fetchedProducts = await getAllProducts(token);
                    setProducts(fetchedProducts)
                    console.log(fetchedProducts)
                }
            } catch(err) {
                setErr(err.message)
            } finally {
                setLoad(false)
            }
        }
        
        loadProduct()
    }, [initialized,keycloak])

    if (!initialized) {
        return <div>Loading...</div>;
      }
    
    if (!keycloak.authenticated) {
        console.log('User is not authenticated');
        return <div>Redirecting to login...</div>;
    }

    return (
        <div className='product-list'>
            <p>Welcome, {keycloak.tokenParsed?.name || 'User'}</p>
            <button onClick={() => keycloak.logout()}>Logout</button>
            <h1 className='list-title'>Ecommerce Product Page</h1>
            <button onClick={() => navigate('/create-product')}>Create New Product</button>
            {load && <p>Loading products...</p>}
            {err && <p>Error: {err}</p>}
            {!load && !err && (
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Product
                                key={product.id}
                                description={product.description}
                                productName={product.name}
                                skuCode={product.skuCode}
                                price={product.price}
                            />
                        ))
                     ) : (
                        <p>No products found</p>
                    )}
                </div>
            )}
        </div>
    )
}