import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFavorites } from '../contexts/FavoriteProvider'

export default function Favorites(props) {

    const { favorites, removefromFavorites } = useFavorites()
    const [favoriteItems, setFavoriteItems] = useState(favorites)


    useEffect(() => {
        setFavoriteItems(favoriteItems.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [])


    return (
        <div>
            <Modal {...props } size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered >
                <Modal.Header className="d-flex justify-content-between">
                    <h2>Favorites</h2>
                    <Button variant="light" onClick={props.onHide}>x</Button>
                </Modal.Header>

                <Modal.Body>
                    <table>
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
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
