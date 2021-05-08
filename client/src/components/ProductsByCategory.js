/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'
import { useFavorites } from '../contexts/FavoriteProvider'
import Product from './Product'

function ProductsByCategory(props) {

    const history = useHistory();
    const { addToCart, cartItems } = useCart()
    const { favorites } = useFavorites()

    const [products, setProducts] = useState([])
    const [updatedProducts, setUpdatedProducts] = useState(products)

    // fetch products
    const getProducts = async () => {
        const response = await axios.get(`${config.API_URL}/api/bycategory/${props.category}`)
        const result = await response.data
        const products = result.map(item => {
            return item
        })

        return products
    }


    // admin product deletion
    const handleDelete = (id) => {
        axios.delete(`${config.API_URL}/api/products/${id}`)
        .then(() => {
            setUpdatedProducts(products)
            props.history.push(`/bycategory/${props.category}`)
        })
        .catch(err => console.log(err))
    }

    

    useEffect(() => {
        getProducts().then(result => setProducts(result))
    }, [])



    return (
        <div>
            <Button variant="outlined-link" className="m-3" onClick={() => history.goBack()}>back</Button>

            <div className="mt-5 mx-auto category-title">{props.category}</div>
    
            <div className="d-flex border m-5 product-container">
                {
                    !products.length ? 
                    <div className="p-3">no results</div> : 
                    products.map((item, i) => {
                    return <Product 
                            key={i}
                            category={props.category}
                            user={props.user}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            stock={item.stock} 
                            id={item._id}
                            onDelete={handleDelete}
                            onAdd={addToCart}
                            items={cartItems}
                            favorites={favorites}
                            />
                 
                    })
                }

            </div>
        </div>
    )
}


export default withRouter(ProductsByCategory)