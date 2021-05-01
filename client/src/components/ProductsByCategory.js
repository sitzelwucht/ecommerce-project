/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartProvider'
import Product from './Product'

function ProductsByCategory(props) {

    const history = useHistory();
    const { addToCart, cartItems } = useCart()

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


    useEffect(() => {
        getProducts().then(result => setProducts(result))
    }, [updatedProducts])


    return (
        <div>
      
            <Button variant="outlined-link" className="m-3" onClick={() => history.goBack()}>back</Button>

            <h1 className="mt-5 mx-auto w-25 category-title">{props.category}</h1>
        
            <div className="d-flex border m-5">
                {
                    !products ? 
                    <div>no results</div> : 
                    products.map((item, i) => {
                    return <Product 
                            user={props.user}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            stock={item.stock} 
                            id={item._id}
                            onDelete={handleDelete}
                            onAdd={addToCart}
                            items={cartItems}
                            />
                 
                    })
                }

                </div>
        </div>
    )
}


export default withRouter(ProductsByCategory)