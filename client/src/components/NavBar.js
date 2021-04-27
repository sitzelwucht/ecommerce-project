import React from 'react'
import { Nav, Button, Badge } from 'react-bootstrap'

export default function NavBar(props) {
    return (
        <div>
            <Nav className={props.admin ? "d-flex justify-content-between p-4 admin-nav" : "d-flex justify-content-between p-4 p-4 user-nav"} >

    
            {
                props.admin ? 
                <>
                <Nav.Item>
                    <Badge variant="dark"><h6>{props.user.email}</h6></Badge>
                </Nav.Item>
                <Nav.Item>
                    <h6>admin</h6>
                </Nav.Item>
                </> : 
                <>
                <Nav.Item><h3>LOGO</h3></Nav.Item>
                <Nav.Item>
                    <Badge variant="warning"><h5>{props.user.email}</h5></Badge>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/home">Categories</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Cart</Nav.Link>
                </Nav.Item>
                </>
            } 
            
                <Nav.Item>
                    <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                </Nav.Item>
                    
            </Nav>
        </div>
    )
}
