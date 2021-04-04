import React from 'react'
import { Nav, Button, Form, FormControl, InputGroup } from 'react-bootstrap'

export default function NavBar(props) {
    return (
        <div>
            <Nav fill className={props.admin ? "justify-content-center p-4 admin-nav" : "justify-content-center p-4 user-nav"} >
                <Nav.Item>
                  {
                    props.admin ? <h3>admin</h3> :  <h3>LOGO</h3>
                  } 
                    <h5>{props.user.email}</h5>
                </Nav.Item>
                    
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                    
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                    
                <Nav.Item>
                    <Form inline>
                    <InputGroup>
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                        <InputGroup.Append><Button type="submit" variant="outline-dark">Go</Button></InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                </Nav.Item>
                    
            </Nav>
        </div>
    )
}
