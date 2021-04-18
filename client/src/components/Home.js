import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Accordion, Form, InputGroup, FormControl } from 'react-bootstrap'

export default function Home(props) {
    return (
        <div className="container">
        { !props.user && <Redirect to={'/'} /> }
       

        User home page        
        </div>
    )
}
