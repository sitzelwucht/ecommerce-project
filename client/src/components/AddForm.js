import React, { useState} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'

export default function AddForm(props) {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    
    const handleAdd = (e) => {
        e.preventDefault()
        const newProduct = {
            title: e.target.title.value,
            category: e.target.category.value,
            description: e.target.description.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
        }
        axios.post(`${config.API_URL}/api/newproduct`, newProduct)
        .then(response => setShowSuccessAlert(true))
        .catch(err => {
            console.log(err)
            setShowErrorAlert(true)
        })
    }





    return (
        <div>
        { showSuccessAlert && <Alert variant="success">Product added</Alert> }
        { showErrorAlert && <Alert variant="danger">Could not add product</Alert> }
            <Form onSubmit={handleAdd}>

            <Form.Group controlId="formBasicProductCategory">
                <Form.Label>category</Form.Label>
                <Form.Control type="text" name="category" placeholder="Enter product category" />
            </Form.Group>

            <Form.Group controlId="formBasicProductName">
                <Form.Label>name</Form.Label>
                <Form.Control type="text" name="title" placeholder="Enter product name" />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Product description" />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
                <Form.Label>price</Form.Label>
                <Form.Control type="number" name="price" placeholder="Product price" />
            </Form.Group>

            <Form.Group controlId="formBasicStock">
                <Form.Label>stock</Form.Label>
                <Form.Control type="number" name="stock" placeholder="Product stock" />
            </Form.Group>

            <Button variant="light" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}
