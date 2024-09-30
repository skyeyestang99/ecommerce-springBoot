import './Product.css'
import React, { useState } from "react";
import ReactLoading from 'react-loading';
import { useEffect } from "react";
import { useKeycloak } from '@react-keycloak/web';
import { postOrder } from '../../service/order/postOrder';

export default function Product(props) {
    const [load, setLoad] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [quantity, setQuantity] = useState(1)
    const { keycloak } = useKeycloak()

    const handleQuantityChange = (e) => {
      setQuantity(e.target.value)
      console.log(quantity)
    };

    async function handleOrder() {
      console.log('clicked')
      setLoad(true);

      const orderData = {
        'skuCode': props.skuCode,
        'price': 1212,
        'quantity': quantity,
        'userDetails': {
          'firstName':keycloak.tokenParsed?.firstName,
          'lastName':keycloak.tokenParsed?.lastName,
          'email': keycloak.tokenParsed?.email,
        }
      };

      try{
        if(keycloak && keycloak.authenticated) {
          await keycloak.updateToken(30)
          const token = keycloak.token
          const result = await postOrder(token, orderData)
          if(result !== 'Order Placed Successfully'){
            console.log('failed:  ', result)
            setOrderSuccess(false)
          }
          else {
            console.log('success: ', result)
            setOrderSuccess(true)
          }
        }
      } catch(error) {
        console.log('Order failed', error.message)
        setOrderSuccess(false)
      } finally {
        setLoad(false)
      }
    }

    return (
      <div className="product-card">
          {load ? (
              <ReactLoading type="bubbles" color="blue" height={100} width={100} />
          ) : (
              <div className="product-details">
                  <h3 className="product-name">{props.productName}</h3>
                  <p className="product-skuCode">SKU Code: {props.skuCode}</p>
                  <p className="product-price">Price: {props.price}</p>
                  <p className="product-description">Description: {props.description}</p>
                  <div className='quanity-input'>
                    <label>Quantity: </label>
                    <input
                        type='number'
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                    />
                  </div>
                  <div className="order-service">
                      <button className="order-button" onClick={handleOrder}>Order</button>
                  </div>
              </div>
          )}
          {orderSuccess === true && <p className='success-message'>Order placed successfully !</p>}
          {orderSuccess === false && <p className='error-message'>Failed to place an order. Please try again</p>}
      </div>
    )
}