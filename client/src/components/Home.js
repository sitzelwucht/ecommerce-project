import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Nav, Container } from 'react-bootstrap'
import UserSettings from './UserSettings'
import Clock from './Clock'

export default function Home(props) {

    const [showWelcome, setShowWelcome] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const hours = new Date().getHours()

    const handleShowSettings = () => {
        setShowWelcome(false)
        setShowSettings(true) 
    }


    return (
        <div className="user-page-container">
        { !props.user && <Redirect to={'/'} /> }

            <Nav className="flex-column m-5 border home-navbar">
                <Nav.Link eventKey="link-0" onClick={handleShowSettings}>User Settings</Nav.Link>
                <Nav.Link eventKey="link-1">Purchase History</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav>
 

            <Container className="m-5 border">
               {
                showWelcome &&
                <header className="user-frontpage-header">
                    <h3>{
                        hours >= 6 && hours < 12 && 'Good morning'
                    }
                    { 
                        hours >= 12 && hours < 18 && 'Good afternoon'
                    }
                    {
                        hours >= 18 && hours < 23 && 'Good evening'
                    }
                    {
                        hours < 6 && 'Good night'
                    }
                    , {props.user.firstName}</h3>
                    <Clock />
                </header>
               }
                {
                showSettings && <UserSettings user={props.user}/>
               }

            </Container>
        </div>
    )
}
