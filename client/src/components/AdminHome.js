import React from 'react'
import { Card, Button, Form, FormControl, InputGroup, Accordion } from 'react-bootstrap'

export default function AdminHome(props) {



    return (
        <div>
            <Card className="m-5 w-50 mx-auto">


                <Accordion className="w-100">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Add
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    add form goes here</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Edit
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>edit form goes here</Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        search
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                
                    <Form inline>
                            <InputGroup>
                                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                                <InputGroup.Append><Button type="submit" variant="outline-dark">Go</Button></InputGroup.Append>
                                </InputGroup>
                            </Form>  
                    
                    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>



            </Card>

        </div>
    )
}