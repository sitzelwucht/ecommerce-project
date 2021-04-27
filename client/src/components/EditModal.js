import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'

function EditModal(props) {


    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [stock, setStock] = useState(props.stock)


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
        props.history.push(`/bycategory/${props.category}`)
        props.onHide()
      })

    }

    return (
        <div>
             <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit product
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleEdit}>
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
                Submit
            </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>

    </Modal>

        </div>
    )
}

export default withRouter(EditModal)