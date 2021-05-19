import React, { useState, useEffect, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AdminHome from './AdminHome'
import { Button, Form, Alert } from 'react-bootstrap'

export default function Admin(props) {


    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [passwordMessage, setPasswordMessage] = useState()
    const [passwordConfMessage, setPasswordConfMessage] = useState()

    const [showMsg, setShowMsg] = useState(false)

    
    const passwordRef = useRef()

    const handleShowSignup = () => {
        setShowSignup(true)
        setShowLogin(false)
    }

    const handleShowLogin = () => {
        setShowLogin(true)
        setShowSignup(false)
    }


        // check if password matches requirements
        const handlePasswordInput = (e) => {
            let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
            let input = e.target.value
            if (!regex.test(input)) {
                setPasswordMessage('password must contain 8 characters, 1 number, 1 uppercase letter')
            }
            else setPasswordMessage(null)
        } 
    
        // check if passwords match
        const handlePasswordConfirmation = (e) => {
            let input = e.target.value
            if (input !== passwordRef.current.value) {
                setPasswordConfMessage('passwords do not match')
            }
            else setPasswordConfMessage(null)
        } 
    

    return (
        <>

        { props.user && <Redirect to={'/'} /> }

        <div className={ props.shrinkNav ? "container-max" : "container-shrink" }>

            <div className="subcontainer">

            { props.user && !props.user.isAdmin && <h4>Please log in as admin to use this page</h4> }
            
                    <div className="admin-enter">
                        <div><h2 >ADMIN</h2></div>

                        <div style={{width: "400px"}}>
                            <Button 
                            variant="info" 
                            onClick={handleShowLogin}>Log in as admin</Button>
                            <Button 
                            variant="light" 
                            onClick={handleShowSignup}>New admin user</Button>
                        </div>
                        { props.errorMsg && <Alert variant="danger">{props.errorMsg}</Alert>}
                        { showLogin && 
                        <div className=" admin-form ">
                            <Form className="d-flex" onSubmit={props.onLogin} >

                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" name="email" placeholder="email" />
                            </Form.Group>
            
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" name="password" placeholder="password" />
                            </Form.Group>
{/* 
                            <Form.Group controlId="admin">
                            <input type="hidden" id="isAdmin" name="isAdmin" value={props.isAdmin} />
                            </Form.Group> */}

                                <Button variant="link" type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    }

                    { showSignup && 
                        <div className="form admin-form mx-auto">
                            <Form className="d-flex" onSubmit={props.onSignup}>
                    
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" name="email" placeholder="email"  />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" name="password" ref={passwordRef} placeholder="password" onChange={handlePasswordInput} />
                                <Form.Text className="text-muted">                    
                                { passwordMessage && <Alert  variant="warning">{passwordMessage}</Alert> }</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword2">
                                <Form.Control type="password" name="password2" placeholder="confirm password" onChange={handlePasswordConfirmation}/>
                                <Form.Text className="text-muted">                    
                                { passwordConfMessage && <Alert  variant="warning">{passwordConfMessage}</Alert> }</Form.Text>
                            </Form.Group>


                            <Button variant="link" type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    }

                    </div>
                </div>
            </div> 

            
        </>
    )
}
