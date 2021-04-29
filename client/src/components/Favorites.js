import React from 'react'
import { Modal, Button } from 'react-bootstrap'


export default function Favorites(props) {
    return (
        <div>
            <Modal {...props } size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered >
                <Modal.Header>
                    <h2>Favorites</h2>
                </Modal.Header>

                <Modal.Body>
                    favorites go here
                </Modal.Body>

                <Modal.Footer>
                    <Button>Go to checkout</Button>
                    <Button variant="light" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
