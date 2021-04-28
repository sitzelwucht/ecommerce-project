import React, { useState } from 'react'
import { Nav, Button, Badge } from 'react-bootstrap'
import Cart from './Cart'


export default function NavBar(props) {


    const [modalShow, setModalShow] = useState(false);

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
                <Nav.Item><a href="/"><h3>LOGO</h3></a></Nav.Item>
                <Nav.Item>
                    <Badge variant="warning"><h5>{props.user.email}</h5></Badge>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/categories">Categories</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => setModalShow(true)}>
                    <img src="/shopping-cart.svg" height="35" alt="cart" /></Nav.Link>
                    
                  
                </Nav.Item>
                <Cart show={modalShow} onHide={() => setModalShow(false)} />
                </>
            } 
            
                <Nav.Item>
                    <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                </Nav.Item>
                    
            </Nav>
        </div>
    )
}
