import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Accordion } from 'react-bootstrap'

export default function Home(props) {
    return (
        <div className="container">

        <h2> Home page </h2>
        { !props.user && <Redirect to={'/'} /> }
       

        <Accordion className="w-25">
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click me!
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        </Accordion>
        
        </div>
    )
}
