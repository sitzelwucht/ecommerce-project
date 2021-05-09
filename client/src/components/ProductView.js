import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'
import { useFavorites } from '../contexts/FavoriteProvider'


const outerBox = "m-5 border w-75 mx-auto"
const innerBox = "border w-75 m-3 mx-auto"

function ProductView(props) {

    const history = useHistory();
    const { addToCart, cartItems } = useCart()
    const { favorites, updateFavorites } = useFavorites()

    const [product, setProduct] = useState()
    

    const getInfo = async () => {
        const response = await axios.get(`${config.API_URL}/api/getproduct/${props.id}`)
        const result = response.data
        setProduct(result)
    }
   

    useEffect(() => {
        getInfo()
    }, [])



    return (
        <div className={outerBox}>
        <Button variant="outlined-link" className="m-3" onClick={() => history.goBack()}>back</Button>
         {
             product && <div className={innerBox}>
                            <h3 className="text-center product-title">{product.title}</h3>
                            <div className="m-3">
                                <div>{product.description}</div>
                                <div>{product.price}</div>
                                <div>{product.description}</div>
                            </div>
                            <div className="d-flex justify-content-around m-3">
                                <Button variant="danger">Add to favorites</Button>
                                <Button variant="success">Add to cart</Button>
                            </div>
                        </div>
         }
        </div>
    )
}


export default withRouter(ProductView)