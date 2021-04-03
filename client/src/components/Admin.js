import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Button } from 'react-bootstrap'

export default function Admin(props) {


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
        <div>
            { props.user && !props.user.isAdmin && <h4>Please log in as admin to use this page</h4> }

            { !props.user && 
                <>
               
                <div className="mx-auto" style={{width: "200px"}}>
                <h2 className="m-5">ADMIN</h2>
                    <Button className="m-3" variant="info" onClick={handleShowLogin}>Log in</Button>
                    <Button variant="light" onClick={handleShowSignup}>Sign up</Button>
                </div>

            { showLogin && <LoginForm onLogin={props.onLogin} isAdmin="true" errorMsg={props.errorMsg} /> }

            { showSignup && <SignupForm onSignup={props.onSignup} isAdmin="true"  errorMsg={props.errorMsg} /> }
                </>
            
            }

        </div>
    )
}
