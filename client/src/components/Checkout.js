/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useCart } from '../contexts/CartProvider'
import { Button } from 'react-bootstrap'
import config from '../config'
import StripeCheckout from 'react-stripe-checkout'


export default function Checkout(props) {

    const { cartItems, getQuantities } = useCart()
    const [counts, setCounts] = useState([])
    const [items, setItems] = useState(cartItems)

    const [total, setTotal] = useState(null)


    const makePayment = (token) => {
        const body = {
            token, items
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        return fetch(`${config.API_URL}/api/payment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log('response :', response)
        })
        .catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        props.user && setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
        setCounts(getQuantities(items))
    }, [])


    useEffect(() => {
        setTotal(counts.map(item => {
            return Number(item.prodPrice/100) * item.quantity
            }).reduce((acc, elem) => {
            return elem + acc}, 0))
    }, [counts])



    return (
        
        <div>
        {  !props.user && <Redirect to={'/'} /> }

        <div className="w-50 border mx-auto mt-5 p-3 ">
            <h1 className="text-center category-title w-50 mx-auto ">checkout</h1>
                <table className="cart-table">
                    <thead>
                        <tr className="font-weight-bold">
                            <td>Product</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    !counts ? <div>loading...</div> :
                    counts.map((item, i) => {
                    return <tr className="m-3 product-line" key={i}>
                            <td>{item.prodName}</td>
                            <td>{item.quantity}</td>
                            <td>{item.prodPrice/100 * item.quantity}€</td>
                        </tr>
                    })
                    }    
                    </tbody>
                </table>
             
                    <div className="highlighted border d-flex m-5 w-50 mx-auto justify-content-center">
                        <span>Total:</span>
                        <span>{total}€</span>
                    </div>
      
                <div className="d-flex justify-content-center mt-5">


                    <StripeCheckout 
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                    token={makePayment}
                    amount={total*100}
                    name="Make payment" >
                    <Button type="button" variant="info" id="checkout-button" role="link" >
                        Checkout
                    </Button>
                    </StripeCheckout>   

                </div>   
        </div> 
        
        </div>
    )
}
