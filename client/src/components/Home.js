import React from 'react'
import { Redirect } from 'react-router-dom'
import { Nav, Container } from 'react-bootstrap'

export default function Home(props) {
    return (
        <div className="container">
        { !props.user && <Redirect to={'/'} /> }
       
        <Nav className="flex-column m-5 border">
            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav>
           

       <Container className="m-5 border">
        <h3>Welcome, {props.user.firstName}</h3>
       </Container>

             
        </div>
    )
}
