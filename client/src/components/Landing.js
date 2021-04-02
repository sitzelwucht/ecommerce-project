import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Home from './Home'

export default function Landing(props) {

    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const handleShowSignup = () => {
        setShowSignup(true)
        setShowLogin(false)
    }

    const handleShowLogin = () => {
        setShowLogin(true)
        setShowSignup(false)
    }

    return (
        <>
    {!props.user &&
        <div>
            <Jumbotron className="m-5 h-100">
                <p>Welcome to random eCommerce Website</p>
            </Jumbotron>

                <div className="mx-auto" style={{width: "200px"}}>
                    <Button className="m-3" variant="info" onClick={handleShowLogin}>Login</Button>
                    <Button variant="light" onClick={handleShowSignup}>Signup</Button>
                </div>

            { showLogin && <LoginForm onLogin={props.onLogin} errorMsg={props.errorMsg} /> }

            { showSignup && <SignupForm onSignup={props.onSignup} errorMsg={props.errorMsg} /> }
                    
            </div>
    }

    { props.user && <Home user={props.user}/> }

        </>
    )
}
