/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import EditModal from './EditModal'

function ProductsByCategory(props) {

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
        
        <Link to={'/'}><Button variant="outlined-link">back</Button></Link>
        <h1 className="mt-5 mx-auto w-25">{props.category}</h1>
        
        <div className="d-flex">
            {
                !products ? <div>no results</div> : products.map((item, i) => {
                    return <div className="border m-3 p-3 w-25">
       
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
                                   
                                   <Button variant="danger" className="m-1" onClick={() => {handleDelete(item._id)}}>delete</Button>
                                   <Button variant="success" onClick={() => setModalShow(true)}>
                                    edit
                                </Button>
                               
                                <EditModal show={modalShow} onHide={() => setModalShow(false)} 
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    stock={item.stock}
                                    category={props.category}
                                    id={item._id}
                                />
                               </div>
                            </div>
                })
            }
            </div>
        </div>
    )
}




export default withRouter(ProductsByCategory)