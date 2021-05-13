import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import SearchBar from './SearchBar'

export default function AnonymousNav() {
    return (
        <div>
            <Nav fill activeKey="/home" className="anon-nav nav d-flex justify-content-between shadow p-3">

            <Nav.Item className=" d-flex">

                <Link to={'/'}><img src="/logo.svg" height="110" className="m-3" alt="" /></Link>
                <div className="buttons">
                    <Link to={'/login'}><Button variant="outline-info" className="m-5">Login</Button></Link>
                    <Link to={'/signup'}><Button variant="info" className="m-5">Signup</Button></Link>
                </div>
            </Nav.Item>


            <Nav.Item className="d-flex align-items-center mr-5">
                <SearchBar />
            </Nav.Item>

            </Nav>
        </div>
    )
}
