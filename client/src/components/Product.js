import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import EditModal from './EditModal'


export default function Product(props) {

    const [modalShow, setModalShow] = useState(false);


    return (
        <>
            <div className="border m-3 p-3 w-25 product-box">
                        <h3 className="product-title">{props.title}</h3>
                        <h6>{props.description}</h6>
                        <h5 className="text-right">{props.price} EUR</h5>
                        <div className="text-right">Stock:
                        {
                            props.stock > 100 && <h6> {props.user && props.user.isAdmin && props.stock} — In Stock</h6> 
                        }
                        {
                            props.stock > 50 && props.stock <= 100 && <h6> {props.user && props.user.isAdmin && props.stock} — Available </h6>
                        }
                        {
                            props.stock > 20 && props.stock <= 50 && <h6> {props.user && props.user.isAdmin && props.stock} — Some Available </h6>
                        }
                        {
                            props.stock <= 20 && <h6> {props.user && props.user.isAdmin && props.stock} — Low stock </h6>
                        }
                        {
                            props.stock <= 0 && <h6> {props.user && props.user.isAdmin && props.stock} —  Out of stock </h6>
                        }
                        </div>

     
            <div className="d-flex flex-row bd-highlight mx-auto mt-2">
                        {
                        props.user && props.user.isAdmin && 
                            <>
                            <Button variant="danger" className="m-1" onClick={() => {props.onDelete(props._id)}}>delete</Button>
                            <Button variant="success" className="m-1" onClick={() => setModalShow(true)}>edit</Button>
                            <EditModal show={modalShow} onHide={() => setModalShow(false)} 
                                title={props.title}
                                description={props.description}
                                price={props.price}
                                stock={props.stock}
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
