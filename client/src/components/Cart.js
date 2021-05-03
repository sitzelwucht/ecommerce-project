/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'

export default function Cart(props) {

    const { cartItems, updateProductQty } = useCart()
    const [userItems, setUserItems] = useState(cartItems)

    const [counts, setCounts] = useState([])



    // get an array of unique product names with number of their occurrences
    const getQuantities = () => {
        const countsArr = []

        userItems.forEach(item => {
            for (let i = 0; i < countsArr.length; i++) {
                if (item.prodName === countsArr[i].prodName) {
                    countsArr[i].quantity += 1
                    return
                }
            }
            item.quantity = 1
            countsArr.push(item)
        })
        return countsArr
    }
    

    useEffect(() => {
        setUserItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
        setCounts(getQuantities())
    }, [])



    useEffect(() => {
        setUserItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
        setCounts(getQuantities())
    }, [cartItems])




    return (
        <div>
            <Modal {...props } size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header className="d-flex justify-content-between">
                    <h2>Cart</h2>
                    <Button variant="light" onClick={props.onHide}>close</Button>
                </Modal.Header>

                <Modal.Body>
                    <table className="cart-table">
                        <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                        </thead>
                        <tbody>
                            {
                                !counts ?
                                <div>loading...</div> :
                                counts.map((item, i) => {
                                    return <tr className="m-3 product-line" key={i}>
                                            <td>{item.prodName}</td>
                                            <td>{item.prodPrice * item.quantity}</td>
                                            <td>
                                            <Button variant="light" className="m-1" 
                                            onClick={() => {updateProductQty(userItems, props.user._id, item.prodName, item.prodPrice, false)}}>-</Button>
                                            {item.quantity}
                                            <Button variant="light" className="m-1" 
                                            onClick={() => {updateProductQty(userItems, props.user._id, item.prodName, item.prodPrice, true)}}>+</Button>
                                            </td>
                                            </tr>
                                })
                            }
                                <tr className="highlighted">
                                    <td>Total</td>
                                    <td>{
                                        counts.map(item => {
                                            return parseInt(item.prodPrice * item.quantity)
                                            }).reduce((acc, elem) => {
                                            return elem + acc}, 0)
                                    }€</td>
                                </tr>
                            </tbody>
                    </table>
              
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={getQuantities}>Go to checkout</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
