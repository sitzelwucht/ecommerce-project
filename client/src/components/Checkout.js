import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useCart } from '../contexts/CartProvider'
import { loadStripe } from "@stripe/stripe-js";
import { Button } from 'react-bootstrap'
import config from '../config'


const stripePromise = loadStripe("pk_test_51IQBs7El6fb6DcQO7RhMclJlifFCggSxFClvtm0jbraStLl1MWaNG5e6ytjQq9iI0Fi0y3ILmpk66ZKg6vMzBBK600W2mV1KUg");


export default function Checkout(props) {

    const { cartItems, getQuantities } = useCart()
    const [counts, setCounts] = useState([])
    const [items, setItems] = useState(cartItems)
    const [message, setMessage] = useState(null);


    const Message = ({ msg }) => (
        <section>
          <p>{message}</p>
        </section>
      );


    const handleClick = async (e) => {
        const stripe = await stripePromise;
        const response = await fetch(`${config.API_URL}/api/create-checkout-session`, {
          method: "POST",
        });
    }


    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get('success')) {
        setMessage('Order placed! You will receive an email confirmation.');
      }
      if (query.get('canceled')) {
        setMessage(
          'Order canceled -- continue to shop around and checkout when you\'re ready.'
        );
      }
    }, []);
  


    useEffect(() => {
        props.user && setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
        setCounts(getQuantities(items))
    }, [])



    return (
        
        <>
        {  !props.user && <Redirect to={'/'} /> }

        {
            message ? (<Message msg={message} /> ) :
    
        (<div className="w-75 border mx-auto mt-5 p-3">
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
                            <td>{item.prodPrice * item.quantity}€</td>
                        </tr>
                    })
                    }    
                    </tbody>
                </table>
             
                    <div className="highlighted border d-flex m-5 justify-content-center">
                        <span>Total</span>
                        <span>{ counts.map(item => {
                                    return parseInt(item.prodPrice * item.quantity)
                                    }).reduce((acc, elem) => {
                                    return elem + acc}, 0)
                                }€
                            </span>
                    </div>
      
                <div className="d-flex justify-content-center mt-5">
                    <Button type="button" variant="info" id="checkout-button" role="link" onClick={handleClick}>
                        Checkout
                    </Button>   

                </div>   
        </div> )
        } 
        </>
    )
}
