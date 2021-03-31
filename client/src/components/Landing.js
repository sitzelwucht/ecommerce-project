import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function Landing() {


    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const handleShowSignup = () => {
        setShowSignup(true)
        setShowLogin(false)
    }

    const handleShowLogin = () => {
        setShowLogin(true)
        setShowSignup(false)
    }


    return (
        <div>
        <Jumbotron className="m-5">
            <p>Welcome to random eCommerce Website</p>
        </Jumbotron>

            <div className="mx-auto" style={{width: "200px"}}>
                <Button className="m-3" variant="info" onClick={handleShowLogin}>Login</Button>
                <Button variant="light" onClick={handleShowSignup}>Signup</Button>
            </div>

        {
            showLogin && 
            <Form className="w-50 mx-auto my-5">
            <h3>LOGIN</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="remember me" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
                </Form>
        
        }
            

        { showSignup && 
        
        
     
            <Form className="w-50 mx-auto my-5">
            <h3>SIGNUP</h3>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="first name" />
       
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="last name" />

                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
                </Form>
            
        }
                
        </div>
    )
}
