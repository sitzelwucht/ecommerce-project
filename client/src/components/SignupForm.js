import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default function SignupForm(props) {


    const [passwordMessage, setPasswordMessage] = useState()
    const [passwordConfMessage, setPasswordConfMessage] = useState()
    const [showMsg, setShowMsg] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    
    const passwordRef = useRef()

    // check if password matches requirements
    const handlePasswordInput = (e) => {
        let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        let input = e.target.value
        if (!regex.test(input)) {
            setPasswordMessage('password must contain 8 characters, 1 number, 1 uppercase letter')
        }
        else setPasswordMessage(null)
    } 

    // check if passwords match
    const handlePasswordConfirmation = (e) => {
        let input = e.target.value
        if (input !== passwordRef.current.value) {
            setPasswordConfMessage('passwords do not match')
        }
        else setPasswordConfMessage(null)
    } 

    useEffect(() => {
        setShowMsg(true)
    }, [passwordMessage])

    useEffect(() => {
        setShowMsg(true)
    }, [passwordConfMessage])

    useEffect(() => {
        props.errorMsg ? setShowErrorMsg(true) : setShowErrorMsg(false)
    }, [props])

    
    return (<>
            { props.user && <Redirect to={'/'} /> }

        <div className={ props.shrinkNav ? "container-max" : "container-shrink" }>
            
            <div className="subcontainer">
            <div className="w-25 mx-auto mt-5 p-5">
            <h2 className="text-center p-3">SIGN UP</h2>
                <Form className=" form" onSubmit={props.onSignup}>
                
                { showErrorMsg && <Alert variant="danger" onClick={() => {setShowErrorMsg(false)}} dismissible>{props.errorMsg}</Alert> }
                    <Form.Group controlId="formBasicName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="first name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="last name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="email"  />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" ref={passwordRef} placeholder="password" onChange={handlePasswordInput} />
                        <Form.Text className="text-muted">                    
                        { passwordMessage && <Alert  variant="warning">{passwordMessage}</Alert> }</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password2" placeholder="confirm password" onChange={handlePasswordConfirmation}/>
                        <Form.Text className="text-muted">                    
                        { passwordConfMessage && <Alert  variant="warning">{passwordConfMessage}</Alert> }</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="admin">
                    <input type="hidden" id="isAdmin" name="isAdmin" value={props.isAdmin} />
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
