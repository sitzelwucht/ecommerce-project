/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import UserSettings from './UserSettings'
import Clock from './Clock'

export default function Home(props) {

    const [showWelcome, setShowWelcome] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const hours = new Date().getHours()
    const [quote, setQuote] = useState(null)


    const handleShowSettings = () => {
        setShowWelcome(false)
        setShowSettings(true) 
    }

    const getQuote = async () => {
        const rand = Math.floor(Math.random() * 1500)
        const result = await fetch('https://type.fit/api/quotes')
        const data = await result.json()

        let quote = {
            author: data[rand].author,
            quote: data[rand].text
        }
        setQuote(quote)
    }   

    
    useEffect(() => {
        getQuote(setQuote(quote))
    }, [])


    return (

        <div className="container-max">

            <div className="subcontainer">

                <div className="wrapper w-75">
                
                    <nav className="home-navbar">
                        <div className="home-nav-btn"><Button variant="link" onClick={handleShowSettings}>User Settings</Button></div>
                        <div className="home-nav-btn"><Button variant="link" onClick={handleShowSettings}>Purchase History</Button></div>
                        <div className="home-nav-btn"><Button variant="link" onClick={handleShowSettings}>Other</Button></div>
                    </nav>


                    <div className="w-100 welcome">
                    { !props.user && <Redirect to={'/'} /> }

                        <Container className="m-5">
                        {
                            showWelcome &&
                            <>
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
                            <div>
                                { quote &&
                                <div className="quote">
                                <div className="font-italic">{quote.quote}</div>
                                <div className="font-weight-bold">- { quote.author ? quote.author : 'anonymous'}</div>
                                </div>
                                }
                            </div>
                            </>
                        }

                            {
                            showSettings && <UserSettings user={props.user}/>
                        }
        
                        </Container>
                
                    </div>
                </div>
            </div>
        </div>
    )
}
