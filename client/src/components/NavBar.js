import React from 'react'
import { Nav, Button, Badge } from 'react-bootstrap'

export default function NavBar(props) {
    return (
        <div>
            <Nav fill className={props.admin ? "justify-content-center p-4 admin-nav" : "justify-content-center p-4 user-nav"} >

           
                  {
                    props.admin ? 
                    <>
                    <Nav.Item>
                        <Badge variant="success"><h6>{props.user.email}</h6></Badge>
                    </Nav.Item>
                    <Nav.Item>
                        <h6>admin</h6>
                    </Nav.Item>
                    
                    
                    </> : 
                    <>
                    <h3>LOGO</h3>
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
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
