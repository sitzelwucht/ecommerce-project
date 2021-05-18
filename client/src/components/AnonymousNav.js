import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import SearchBar from './SearchBar'

export default function AnonymousNav(props) {
    return (
        <div >
            <Nav fill className={props.shrink ? "nav anon-nav-shrink p-3" : "nav anon-nav p-3" }>
                <Nav.Item className=" d-flex">

                    <Link to={'/'}><img src="/logo.png" height={props.shrink ? "110" : "220" } className="m-3" alt="" /></Link>
                    <div className="buttons">
                        <Link to={'/login'}><Button variant="outline-light" className="m-5">Login</Button></Link>
                        <Link to={'/signup'}><Button variant="light" className="m-5">Signup</Button></Link>
                    </div>
                </Nav.Item>


                <Nav.Item className="d-flex align-items-center">
                    <SearchBar />
                </Nav.Item>

               {
                !props.shrink && <Nav.Item>
                <a href="/admin"><Button variant="link">admin</Button></a>
                </Nav.Item>
               } 
            </Nav>
        </div>
    )
}
