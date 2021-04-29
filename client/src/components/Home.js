import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Nav, Container } from 'react-bootstrap'

export default function Home(props) {

    const [time, setTime] = useState()


    // show current date
    useEffect(() => {
        const date = new Date()
        setTime(date)
    }, [])
    

    return (
        <div className="user-page-container">
        { !props.user && <Redirect to={'/'} /> }

        <Nav className="flex-column m-5 border home-navbar">
            <Nav.Link href="/home">User settings</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav>
           

       <Container className="m-5 border">
       <header className="user-frontpage-header">
       <h3>Welcome, {props.user.firstName}</h3>
        <h5>{time && time.toDateString()}</h5>
       </header>

       </Container>

             
        </div>
    )
}
