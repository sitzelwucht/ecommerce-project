import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Form, FormControl, InputGroup, Accordion, Nav } from 'react-bootstrap'
import AddForm from './AddForm'
import axios from 'axios'
import config from '../config'

export default function AdminHome(props) {


    const [categories, setCategories] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [noResults, setNoResults] = useState(false)

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
        setNoResults(false)
        if (!products.length) {
            setNoResults(true)
        }
    }


    // put categories in the state 
    useEffect(() => {
       props.getCategories().then(result => setCategories(result))
    }, [])


    return (
        <div className="admin-bg">
            <Card className="w-50 mx-auto">

             <Accordion className="m-5 accordion-links">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Add product
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                    
                            <AddForm categories={categories} onGetCategs={props.getCategories} />
                    
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="mx-auto">
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Browse by category
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                    
                        <ul className="p-1 mb-1 d-flex flex-wrap">
                            {
                                categories.map((item, i) => {
                                    return <div key={i}>
                                            <Link to={`/bycategory/${item}`}>
                                                <Button variant="link">
                                                <li className="list-group-item category-button">{item}</li>
                                                </Button>
                                            </Link>
                                            </div>
                                })
                            }
                        </ul>
                    
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="dark-bg">
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Search products
                        </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                    
                        <Form inline onSubmit={handleKeywordSearch}>
                                <InputGroup className="mx-auto">
                                    <FormControl type="text" name="input" placeholder="Search" />
                                    <InputGroup.Append><Button type="submit" variant="dark">Go</Button></InputGroup.Append>
                                </InputGroup>
                        </Form>  
                        
                        {   noResults ? <div className="m-5">no results</div> :
                            searchResults.map((item, i) => {
                            return <div className="border mt-5 product-search">
                                    <Link to={`/product/${item._id}`}>
                                            <div className="m-3">
                                                <div className="d-flex justify-content-between">
                                                    <h4 key={i}>{item.title}</h4>
                                                    <div>{item.category}</div>
                                                </div>
                                                <div>{item.description}</div>
           
                                            </div>
                                    </Link>
                                    
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