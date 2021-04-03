import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import AdminHome from './AdminHome'
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
        <>
            <div>
                { props.user && !props.user.isAdmin && <h4>Please log in as admin to use this page</h4> }

                { !props.user && 
                    <>
                    <header className="border w-100" ><h2 className="m-5">ADMIN</h2></header>
                    <div className="mx-auto" style={{width: "400px"}}>
                        <Button className="m-3" variant="info" onClick={handleShowLogin}>Log in as admin</Button>
                        <Button variant="light" onClick={handleShowSignup}>New admin user</Button>
                    </div>

                { showLogin && <LoginForm onLogin={props.onLogin} isAdmin="true" errorMsg={props.errorMsg} /> }

                { showSignup && <SignupForm onSignup={props.onSignup} isAdmin="true"  errorMsg={props.errorMsg} /> }
                    </>
                
                }

            </div>


            { props.user && props.user.isAdmin && <AdminHome user={props.user}/> }
        </>
    )
}
