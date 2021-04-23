import React from 'react'
import { Card, Button, Form, FormControl, InputGroup, Accordion } from 'react-bootstrap'
import AddForm from './AddForm'

export default function AdminHome(props) {



    return (
        <div>
            <Card className="m-5 w-50 mx-auto">


                <Accordion className="w-100">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Add product
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    
                    
                    <AddForm />
                    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Browse by category
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                    
                    categories go here
                    
                    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        search products
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