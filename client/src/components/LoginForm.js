import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default function LoginForm(props) {

    const [showErrorMsg, setShowErrorMsg] = useState(false)
    

    useEffect(() => {
        props.errorMsg ? setShowErrorMsg(true) : setShowErrorMsg(false)
    }, [props])

    
    return (
            <>
            { props.user && <Redirect to={'/'} /> }
            <div className={ props.shrinkNav ? "container-max" : "container-shrink" }>
            
                <div className="subcontainer">

                    <div className="w-25 mx-auto mt-5 p-5">
                    <h2 className="text-center p-3">LOG IN</h2>
                    
                    <Form className=" form" onSubmit={props.onLogin}>
                        
                        { showErrorMsg && <Alert variant="danger" onClick={() => {
                            setShowErrorMsg(false)
                            props.onResetError()
                            }} dismissible>{props.errorMsg}</Alert> } 
                

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="remember me" />
                        </Form.Group>

                        <Form.Group controlId="admin">
                        <input type="hidden" id="isAdmin" name="isAdmin" />
                        </Form.Group>

                        <Button variant="dark" type="submit" className="mt-3">
                        Submit
                        </Button>
                    </Form>
                </div>
                </div>
            </div>
        </>
    )
}
