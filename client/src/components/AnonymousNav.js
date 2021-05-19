import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import SearchBar from './SearchBar'

export default function AnonymousNav(props) {
    return (
        <div >

            <Nav fill className={props.shrinkNav ? "nav anon-nav-shrink p-3" : "nav anon-nav p-3" }>
                <div className="mt-3 d-flex justify-content-center w-100">
                    <Nav.Item className=" d-flex align-items-center">

                        <Link to={'/'}><img src="/logo.png" height={props.shrinkNav ? "110" : "220" } className="m-3" alt="" /></Link>
                        <div className="buttons">
                            <Link to={'/login'}><Button variant="outline-light" className="m-5" onClick={props.onAction}>Login</Button></Link>
                            <Link to={'/signup'}><Button variant="light" className="m-5" onClick={props.onAction}>Signup</Button></Link>
                        </div>
                    </Nav.Item>


                    <Nav.Item className="d-flex align-items-center">
                        <SearchBar />
                    </Nav.Item>

           

                    <Nav.Item>
                    <Link to={'/admin'}><Button variant="link" className="m-5" onClick={props.onAction}>admin</Button></Link>
                    </Nav.Item>
          
                </div>
            
            </Nav>
        </div>
          
    )
}
