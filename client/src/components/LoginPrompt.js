import React from 'react'
import { withRouter} from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'


function LoginPrompt(props) {

    const handleClick = (bool) => {
        if (bool) {
            props.history.push('/login')
        }
        else {
            props.history.push('/signup')
        }
        props.onHide()
    }
    
    return (
        <div>

            <Modal {...props } size="m" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header>
                    <h3>Login</h3> 
                    <Button variant="light" onClick={props.onHide}>close</Button>
                </Modal.Header>

                <Modal.Body>
                    <div className="m-3 p-3">Please log in or sign up in order to add the item to your cart</div>

                    <div className="d-flex justify-content-around"> 
                        <Button variant="dark" onClick={() => {handleClick(true)}}>Login</Button>
                        <Button variant="dark" onClick={() => {handleClick(false)}}>Signup</Button>
                    </div>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}

export default withRouter(LoginPrompt)