import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
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
        <div className="user-page-bg">

        <div className="wrapper">
        
            <nav className="home-navbar">
                <div className="home-nav-btn"><Button variant="link" onClick={handleShowSettings}>User Settings</Button></div>
                <div className="home-nav-btn"><Button variant="link" onClick={handleShowSettings}>Purchase History</Button></div>
                <div className="home-nav-btn"><Button variant="link" onClick={handleShowSettings}>Other</Button></div>
            </nav>


            <div className="w-100 welcome">
            { !props.user && <Redirect to={'/'} /> }

                <Container className="m-5 border w-75 blur-bg">
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
                            hours >= 18 && hours <= 23 && 'Good evening'
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
            </div>
        </div>
    )
}
