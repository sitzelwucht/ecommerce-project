import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default function LoginForm(props) {


    return (
       
             <Form className="w-50 mx-auto my-5" onSubmit={props.onLogin}>
            <h3>LOGIN</h3>
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
                <Button variant="dark" type="submit">
                    Submit
                </Button>
                </Form>
       
    )
}
