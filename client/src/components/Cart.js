/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'

export default function Cart(props) {

    const { cartItems, removeFromCart } = useCart()
    const [items, setItems] = useState(cartItems)

    const [counts, setCounts] = useState({})



    // get an array of unique product names with number of their occurrences
    const getQuantities = () => {
        const countsArr = []
        const cartProducts = items.map(elem => {
            const product = {
                name: elem.prodName,
                price: elem.prodPrice,
                count: 0
            }
            return product
        })

        cartProducts.forEach(item => {
            for (let i = 0; i < countsArr.length; i++) {
                if (item.name === countsArr[i].name) {
                    countsArr[i].count += 1
                    return
                }
            }
            item.count = 1
            countsArr.push(item)
        })
          setCounts(countsArr)
    }
    

    useEffect(() => {
        setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [])

    useEffect(() => {
        setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))

        getQuantities()
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
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>
                                            <Button variant="light" className="m-1">+</Button>
                                            {item.count}
                                            <Button variant="light" className="m-1">-</Button>
                                            </td>
                                            </tr>
                                })
                            }
                                <tr className="highlighted">
                                    <td>Total</td>
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
