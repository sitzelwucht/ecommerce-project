import React, { useState, useEffect} from 'react'
import { Form, Button, Alert, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'

export default function AddForm(props) {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [categs, setCategs] = useState(props.categories)


    // display alert for 1.5 seconds
    const handleSuccessAlert = () => {
        setShowSuccessAlert(true)
        setTimeout(() => {
            setShowSuccessAlert(false)
        }, 1500)
    }

    const handleErrorAlert = () => {
        setShowErrorAlert(true)
        setTimeout(() => {
            setShowErrorAlert(false)
        }, 1500)
    }


    const handleAddCategory = (e) => {
        e.preventDefault()
        const newCategory = {
            name: e.target.category.value
         }
       
        axios.post(`${config.API_URL}/api/newcategory`, newCategory)
        .then(response => setCategs(prevCategs => {
            return [response, ...prevCategs]
        }))
        .catch(err => handleErrorAlert())
    }



    const handleAdd = (e) => {
        e.preventDefault()
        const newProduct = {
            title: e.target.title.value,
            category: e.target.categorySelect.value,
            description: e.target.description.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
        }
        axios.post(`${config.API_URL}/api/newproduct`, newProduct)
        .then(response => handleSuccessAlert())
        .catch(err => {
            console.log(err)
            handleErrorAlert()
        })

    }


    useEffect(() => {
        setCategs(categs)
    }, [categs])

    return (
        <div>
        { showSuccessAlert && <Alert variant="success">Product added</Alert> }
        { showErrorAlert && <Alert variant="danger">Adding failed</Alert> }

            <Form inline className="border p-3 mb-3" onSubmit={handleAddCategory}>
                    <InputGroup>
                        <FormControl type="text" name="category" placeholder="add new product category" />
                        <InputGroup.Append><Button type="submit" variant="dark">Submit</Button></InputGroup.Append>
                    </InputGroup>
            </Form>  


            <Form onSubmit={handleAdd} className="border p-3">

            <Form.Group controlId="formBasicProductCategory">
                <Form.Label>category</Form.Label>

                <Form.Control as="select" name="categorySelect" default="select product category" >
                <option selected disabled hidden>select product category</option>
                {
                    props.categories.map((item, i) => {
                        return <option key={i}>{item}</option>
                    })
                }
  
                </Form.Control>
                

     
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
