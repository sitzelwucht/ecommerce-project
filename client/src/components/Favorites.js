/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFavorites } from '../contexts/FavoriteProvider'
import { useCart } from '../contexts/CartProvider'

export default function Favorites(props) {

    const { favorites, updateFavorites } = useFavorites()
    const [favoriteItems, setFavoriteItems] = useState(favorites)

    const { addToCart } = useCart()


    useEffect(() => {
        props.user && setFavoriteItems(favorites.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [favorites])


    return (
        <div>
            <Modal {...props } size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered >
                <Modal.Header className="d-flex justify-content-between">
                    <h2>Favorites</h2>
                    <Button variant="light" onClick={props.onHide}>x</Button>
                </Modal.Header>
                <Modal.Body>
                    { !favoriteItems.length ?
                        <div>No favorites</div>:
                    
                        <table className="cart-table">
                            <thead>
                                <tr className="font-weight-bold">
                                    <td>Product</td>
                                    <td>Price</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                        <tbody>
                        {
                        !favoriteItems ? <div>Loading...</div> :
                        favoriteItems.map((item, i) => {
                            return <tr key={i}>
                                    <td>{item.prodName}</td>
                                    <td>{item.prodPrice}</td>
                                    <td><Button variant="light" 
                                    onClick={() => updateFavorites(props.user._id, favoriteItems, item.prodName, false)}>x</Button></td>
                                    <td><Button variant="outline-dark"
                                    onClick={() => addToCart(props.user._id, item.prodName, item.prodPrice, 1)}>Add to cart</Button></td>
                                </tr>
                        })
                        }
                        </tbody>
                    </table>
                    }
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
