import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Accordion, Form, InputGroup, FormControl } from 'react-bootstrap'

export default function Home(props) {
    return (
        <div className="container">

        <h2>  
                <Form inline>
                <InputGroup>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                    <InputGroup.Append><Button type="submit">Submit</Button></InputGroup.Append>
                    </InputGroup>
                </Form> </h2>
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
