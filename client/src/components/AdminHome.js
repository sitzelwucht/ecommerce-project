import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Form, FormControl, InputGroup, Accordion } from 'react-bootstrap'
import AddForm from './AddForm'
import axios from 'axios'
import config from '../config'

export default function AdminHome(props) {


    const [categories, setCategories] = useState([])
    const [searchResults, setSearchResults] = useState([])


    // fetch categories
    const getCategories = async () => {
        const response = await axios.get(`${config.API_URL}/api/categories`)
        const categories = await response.data
        const names = categories.map((item) => {
            return item.name
        })
        return names
    }



    const handleKeywordSearch = async (e) => {
        e.preventDefault()
        setSearchResults([])
        const input = e.target.input.value

        const response = await axios.get(`${config.API_URL}/api/productsearch?input=${input}`)
        const result = await response.data
        const products = result.map(item => {
            return item
        })

        setSearchResults(products)
        
    }


    // put categories in the state 
    useEffect(() => {
       getCategories().then(result => setCategories(result))
    }, [])


    return (
        <div>
            <Card className="w-75 mx-auto">

             <Accordion className="w-100">
                <Card className="blue-bg">
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Add product
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="blue-bg-light">
                    
                            <AddForm categories={categories} />
                    
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="orange-bg mx-auto">
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Browse by category
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="orange-bg-light">
                    
                        <ul className="border p-3 mb-3">
                            {
                                categories.map((item, i) => {
                                    return <Link to={`/bycategory/${item}`}>
                                                <Button variant="link">
                                                <li className=" list-group-item orange-bg-light" key={i}>{item}</li>
                                                </Button>
                                            </Link>
                                })
                            }
                        </ul>
                    
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="red-bg">
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            search products
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="2">
                        <Card.Body className="red-bg-light">
                    
                        <Form inline onSubmit={handleKeywordSearch}>
                                <InputGroup>
                                    <FormControl type="text" name="input" placeholder="Search" />
                                    <InputGroup.Append><Button type="submit" variant="dark">Go</Button></InputGroup.Append>
                                </InputGroup>
                        </Form>  
                        
                        {
                            searchResults.map((item, i) => {
                            return <div className="m-3">
                                    <h4 key={i}>{item.title}</h4>
                                    <div key={i}>{item.description}</div>
                                    </div>
                            })
                        }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            </Card>

    
        </div>
    )
}