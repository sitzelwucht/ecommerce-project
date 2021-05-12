import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, Form, FormControl } from 'react-bootstrap'

export default function AnonymousNav() {
    return (
        <div>
            <Nav activeKey="/home" className="anon-nav nav d-flex justify-content-between shadow p-3">

            <Nav.Item className=" d-flex">

                <Link to={'/'}><img src="/logo.svg" height="110" className="m-3" alt="" /></Link>
                <div className="buttons">
                    <Link to={'/login'}><Button variant="outline-info" className="m-5">Login</Button></Link>
                    <Link to={'/signup'}><Button variant="info" className="m-5">Signup</Button></Link>
                </div>
            </Nav.Item>
            <div className="d-flex anon-browse-search">
            {/* <Nav.Item className="d-flex align-items-center">
                <Link to={'/categories'}>
                    <Button variant="dark" className="m-5">Browse</Button>
                </Link>
            </Nav.Item> */}
            <Nav.Item className="d-flex align-items-center">
                <Form className="m-5" inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Nav.Item>
            </div>
            </Nav>
        </div>
    )
}
