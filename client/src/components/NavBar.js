import React from 'react'
import { Nav, Button } from 'react-bootstrap'

export default function NavBar(props) {
    return (
        <div>
        <Nav className="justify-content-center m-5" activeKey="/home">
          <Nav.Item>
          {props.user.email}
          </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                </Nav.Item>
            </Nav>
        </div>
    )
}
