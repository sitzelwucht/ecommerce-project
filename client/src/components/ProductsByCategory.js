/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Button, Form } from 'react-bootstrap'
import EditModal from './EditModal'
import { useCart } from '../contexts/CartProvider'

function ProductsByCategory(props) {

    const history = useHistory();
    const { addToCart, cartItems } = useCart()

    const [products, setProducts] = useState([])
    const [updatedProducts, setUpdatedProducts] = useState(products)
    const [modalShow, setModalShow] = useState(false);


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
                !products ? <div>no results</div> : products.map((item, i) => {

                    return (<div className="border m-3 p-3 w-25">
        
                        <h3>{item.title}</h3>
                        <h6>{item.description}</h6>
                        <h5>{item.price} EUR</h5>
                        <div>Stock:
                        {
                            item.stock > 100 && <span> Available</span>
                        }
                        {
                            item.stock > 50 && item.stock < 100 && <span> Some available</span>
                        }
                        {
                            item.stock > 20 && item.stock <= 50 && <span> Few Available</span>
                        }
                        {
                            item.stock <= 20 && <span> Low stock</span>
                        }
                        {
                            item.stock <= 0 && <span> Out of stock</span>
                        }
                        </div>
                                        
                        <div className="d-flex flex-row bd-highlight mx-auto mt-5">
                        {
                        props.user && props.user.isAdmin && 
                            <>
                            <Button variant="danger" className="m-1" onClick={() => {handleDelete(item._id)}}>delete</Button>
                            <Button variant="success" onClick={() => setModalShow(true)}>edit</Button>
                        
                            <EditModal show={modalShow} onHide={() => setModalShow(false)} 
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                stock={item.stock}
                                category={props.category}
                                id={item._id}
                            />
                            </>
                        }
                        {
                        props.user && !props.user.isAdmin && 
                            <>
                            <Form>
                            <Form.Group className="m-1">
                                <Form.Control as="select" name="categorySelect" >
                                    <option selected disabled hidden>qty</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            
                            </Form>
                            <Button variant="info" className="m-1" 
                            onClick={() => {addToCart(props.user._id, item.title, item.price)}}>to cart</Button>
                            <Button variant="danger" className="m-1" 
                            onClick={() => {handleDelete(cartItems, props.user._id, item.prodName)}}>to favorites</Button>
                            </>
                        }
                        </div>
                        </div>)
                    })
                }
                { products.length <= 0 && <div className="p-3">No products in this category</div>}
                </div>
        </div>
    )
}


export default withRouter(ProductsByCategory)