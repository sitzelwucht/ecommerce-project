import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, Form, FormControl } from 'react-bootstrap'

export default function AnonymousNav() {
    return (
        <div>
            <Nav activeKey="/home" className="anon-nav nav d-flex justify-content-between">
                <Nav.Item>
                <Link to={'/'}><img src="/logo.svg" height="150" className="m-3" alt="" /></Link>
                    <Link to={'/login'}>
                        <Button variant="outline-info" className="m-5">Login</Button>
                    </Link>
                <Link to={'/signup'}>
                    <Button variant="info" className="m-5">Signup</Button>
                </Link>
            </Nav.Item>

            <Nav.Item className="d-flex align-items-center">
                <Link to={'/categories'}>
                    <Button variant="dark" className="m-5">Browse</Button>
                </Link>
            </Nav.Item>
            <Nav.Item className="d-flex align-items-center">
                <Form className="m-5" inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Nav.Item>

            </Nav>
        </div>
    )
}
