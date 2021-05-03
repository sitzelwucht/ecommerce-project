/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'


export default function Product(props) {

    const [editMode, setEditMode] = useState(false);

    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [stock, setStock] = useState(props.stock)
    const [updatedProduct, setUpdatedProduct] = useState({...props})


    const handleEdit = (e) => {
      e.preventDefault()
      const editedProduct = {
        title: e.target.title.value,
        category: props.category,
        description: e.target.description.value,
        price: e.target.price.value,
        stock: e.target.stock.value,
      }
      
      axios.patch(`${config.API_URL}/api/products/${props.id}`, editedProduct)
      .then(() => {
          axios.get(`${config.API_URL}/api/getproduct/${props.id}`)
          .then((result) => {
            setUpdatedProduct(result.data)
          })
        
        setEditMode(false)
      })

    }

    return (
        <>
            <div className="border m-3 p-3 w-25 product-box">
            {
                !editMode ? 
                    <>
                        <h3 className="product-title">{updatedProduct.title}</h3>
                        <h6>{updatedProduct.description}</h6>
                        <h5 className="text-right">{updatedProduct.price} EUR</h5>
                        <div className="text-right">Stock:
                        {
                            updatedProduct.stock > 100 && <h6> {props.user && props.user.isAdmin && updatedProduct.stock} — In Stock</h6> 
                        }
                        {
                            updatedProduct.stock > 50 && updatedProduct.stock <= 100 && <h6> {props.user && props.user.isAdmin && updatedProduct.stock} — Available </h6>
                        }
                        {
                            updatedProduct.stock > 20 && updatedProduct.stock <= 50 && <h6> {props.user && props.user.isAdmin && updatedProduct.stock} — Some Available </h6>
                        }
                        {
                            updatedProduct.stock <= 20 && <h6> {props.user && props.user.isAdmin && updatedProduct.stock} — Low stock </h6>
                        }
                        {
                            updatedProduct.stock <= 0 && <h6> {props.user && props.user.isAdmin && updatedProduct.stock} —  Out of stock </h6>
                        }
                        </div>
                    </> :
                    <Form onSubmit={handleEdit}>
                    <Form.Group controlId="formBasicCategory">
                            <Form.Control type="text" name="category" defaultValue={props.category} hidden />
                        </Form.Group>
                        <Form.Group controlId="formBasicProductName">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={props.title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>description</Form.Label>
                            <Form.Control type="text" name="description" defaultValue={props.description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>price</Form.Label>
                            <Form.Control type="number" name="price" defaultValue={props.price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicStock">
                            <Form.Label>stock</Form.Label>
                            <Form.Control type="number" name="stock" defaultValue={props.stock} onChange={(e) => setStock(e.target.value)}  />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Save
                        </Button>
                    </Form>
            }
                       

     
            <div className="d-flex flex-row bd-highlight mx-auto mt-2">
                        {
                        props.user && props.user.isAdmin && !editMode &&
                            <>
                            <Button variant="danger" className="m-1" onClick={() => {props.onDelete(props._id)}}>delete</Button>
                            <Button variant="success" className="m-1" onClick={() => setEditMode(true)}>edit</Button>
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
                            onClick={() => {props.onAdd(props.user._id, props.title, props.price)}}>to cart</Button>
                            <Button variant="danger" className="m-1" 
                            onClick={() => {props.onDelete(props.items, props.user._id, props.prodName)}}>to favorites</Button>
                            </>
                        }
                        </div>
                    </div>
        </>
    )
}
