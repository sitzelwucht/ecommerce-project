import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'
import { useFavorites } from '../contexts/FavoriteProvider'




function ProductView(props) {

    const outerBox = props.user && props.user.isAdmin ? "w-50 mx-auto" : "m-5 border w-50 mx-auto"
    const innerBox = "border w-75 m-3 mx-auto product-view"
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
        <div className={ props.shrinkNav ? "container-max" : "container-shrink" }>
            <div className={outerBox}>
            <Button variant="outlined-link" className="m-3" onClick={() => history.goBack()}>back</Button>
            {
                product && <div className={innerBox}>
                                <h3 className="text-center product-title">{product.title}</h3>
                                <div className="m-3">
                                    <div className="d-flex justify-content-between m-3">
                                        <div>{product.description}</div>
                                        <div>{product.price / 100}</div>
                                    </div>
                                    <div><img src={product.imageUrl} height="250" alt="product"/></div>
                                </div>
                                
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
    )
}


export default withRouter(ProductView)