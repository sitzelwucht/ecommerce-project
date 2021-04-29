import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Nav, Container } from 'react-bootstrap'
import UserSettings from './UserSettings'

export default function Home(props) {

    const [time, setTime] = useState()
    const [showWelcome, setShowWelcome] = useState(true)
    const [showSettings, setShowSettings] = useState(false)


    const handleShowSettings = () => {
        setShowWelcome(false)
        setShowSettings(true) 
    }


    // show current date
    useEffect(() => {
        const date = new Date()
        setTime(date)
    }, [])
    

    return (
        <div className="user-page-container">
        { !props.user && <Redirect to={'/'} /> }

            <Nav className="flex-column m-5 border home-navbar">
                <Nav.Link eventKey="link-0" onClick={handleShowSettings}> User settings</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav>
 

            <Container className="m-5 border">
               {

                showWelcome &&
                <header className="user-frontpage-header">
                    <h3>Welcome, {props.user.firstName}</h3>
                    <h5>{time && time.toLocaleString()}</h5>
                </header>
               }

                {
                
                showSettings && 
                    <UserSettings user={props.user}/>
               }


            </Container>


             
        </div>
    )
}
