import React from 'react'
import { Modal, Button } from 'react-bootstrap'


export default function Cart(props) {
    return (
        <div>
            <Modal {...props } size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered >
                <Modal.Header>
                    Your cart
                </Modal.Header>

                <Modal.Body>
                    Products go here
                </Modal.Body>

                <Modal.Footer>
                    <Button>Go to checkout</Button>
                    <Button variant="light" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
