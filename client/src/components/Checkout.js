import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartProvider'
import StripeComponent from './StripeComponent'

export default function Checkout(props) {

    const { cartItems, getQuantities } = useCart()
    const [counts, setCounts] = useState([])

    const [items, setItems] = useState(cartItems)


    useEffect(() => {
        props.user && setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
        setCounts(getQuantities(items))
    }, [])



    return (
     
        <div className="w-75 border mx-auto mt-5 p-3">
            <h1 className="text-center category-title w-50 mx-auto ">checkout</h1>
                <table>
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
                            <td>{item.prodPrice * item.quantity}</td>
                        </tr>
                    })
                    }
                    </tbody>
                </table>
  
               <StripeComponent />
        </div>  
    )
}
