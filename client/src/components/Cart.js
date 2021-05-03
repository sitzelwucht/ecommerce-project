/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'

export default function Cart(props) {

    const { cartItems, removeFromCart } = useCart()
    const [items, setItems] = useState(cartItems)



    useEffect(() => {
        setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [])

    useEffect(() => {
        setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
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
                                </tr>
                        </thead>
                        <tbody>
                            {
                                items && items.map((elem, i) => {
                                    return <tr className="m-3 product-line" key={i}>
                                            <td>{elem.prodName}</td>
                                            <td>{elem.prodPrice}€ </td>
                                            <td>{
                                                <Button variant="warning" className="m-1" 
                                                onClick={() => {removeFromCart(cartItems, props.user._id, elem.prodName)}}>X</Button>
                                            }</td>
                                        </tr>
                                })
                            }
                                <tr className="highlighted">
                                    <td>total</td>
                                    <td>{
                                        items.map(el => {
                                            return parseInt(el.prodPrice)
                                            }).reduce((acc, elem) => {
                                            return elem + acc}, 0)
                                    }€</td>
                                </tr>
                                </tbody>
                    </table>
              
                </Modal.Body>

                <Modal.Footer>
                    <Button>Go to checkout</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
