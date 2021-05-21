import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'
import { useFavorites } from '../contexts/FavoriteProvider'
import LoginPrompt from './LoginPrompt'



function ProductView(props) {

    const outerBox = props.user && props.user.isAdmin ? "w-50 mx-auto" : "m-5 pb-3 w-50 mx-auto product-view"
    const innerBox = "border w-75 m-3 pt-5 mx-auto product-view"

    const history = useHistory();

    const { addToCart, cartItems } = useCart()
    const { favorites, updateFavorites } = useFavorites()

    const [product, setProduct] = useState()
    const [modalShow, setModalShow] = useState()
     

    const getInfo = async () => {
        const response = await axios.get(`${config.API_URL}/api/getproduct/${props.id}`)
        const result = response.data
        setProduct(result)
    }
   

    useEffect(() => {
        getInfo()
    }, [])



    return (
        <div className={ !props.user ? (props.shrinkNav ? "container-max" : "container-shrink") : "container-max" }>
            <div className="subcontainer">
                <div className={outerBox}>
                <Button variant="outlined-link" className="m-3" onClick={() => history.goBack()}>back</Button>
                {
                    product && <div className={innerBox}>
                                    <h3 className="text-center product-title">{product.title}</h3>

                                    <div className="m-3 d-flex justify-content-around">

                                        <div className="border d-flex flex-column justify-content-center">
                                            {
                                                product.imageUrl 
                                                ? <img src={product.imageUrl} height="250" alt="product"/> 
                                                : <div>No image available</div>
                                            }
                                        </div>

                                        <div className="d-flex m-3 flex-column text-right">
                                            <div className="mb-5">{product.description}</div>
                                            <Button variant="outline-dark" onClick={() => {setModalShow(true)}}>
                                                <h3>{product.price / 100}€</h3>
                                            </Button>
                                        </div>

                                    </div>

                                    <LoginPrompt show={modalShow} onHide={() => {setModalShow(false)}}/>

                                    { props.user && !props.user.isAdmin && 
                                    <div className="d-flex justify-content-around m-3">
                                        <Button variant="danger">Add to favorites</Button>
                                        <Button variant="success">Add to cart</Button>
                                    </div>
                                    }
                                </div>
                }
                </div>
            </div>
        </div>
    )
}


export default withRouter(ProductView)