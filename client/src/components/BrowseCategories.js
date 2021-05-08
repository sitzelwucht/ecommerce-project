import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Form, FormControl } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'

export default function BrowseCategories() {

    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const response = await axios.get(`${config.API_URL}/api/categories`)
        const data = await response.data
        const categs = data.map(item => {
            return item.name
        })
        setCategories(categs)
    }

        
    const getAllProducts = async () => {
        const response = await axios.get(`${config.API_URL}/api/allproducts`)
        const result = await response.data
        console.log(result)
    }

    useEffect(() => {
        getCategories()
    }, [])


    return (
        <>
        <div>
        <h2 className="mx-auto border text-center w-50 m-3 p-3">Product Categories</h2>
            <div className="m-10 mt-5 mx-auto w-50 p-3 border d-flex flex-wrap">
            {
                categories.map((item, i) => {
                    return <div className="categories-user" key={i}>
                                <Link to={`/bycategory/${item}`}><Button variant="link">{item}</Button></Link>
                            </div>
                })
            }
            </div>
        </div>
        <div>
        <h2 className="mx-auto border text-center w-50 m-3 p-3">Search for product</h2>
        <div className="m-10 mt-5 mx-auto w-50 p-3 border d-flex flex-wrap">
            <Nav.Item className="d-flex align-items-center">
                <Form className="m-5" inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Nav.Item></div>

        </div>
        </>
    )
}
