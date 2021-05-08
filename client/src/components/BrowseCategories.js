import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Form, FormControl } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'

export default function BrowseCategories() {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [searchResults, setSearchResults] = useState([])


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
        const result = response.data
        const list = result.map(item => {
            return {name: item.title, description: item.description }
        })

        setProducts(list)
    }


    const handleKeywordSearch = async (e) => {
        e.preventDefault()
        const input = e.target.value

        let filteredProducts = products.filter(item => {
            return item.name.toLowerCase().includes(input)
          })

         setSearchResults(filteredProducts)
        
        if (!input) {
            setSearchResults([])
        }
    }


    useEffect(() => {
        getCategories()
        getAllProducts()
    }, [])


    return (
        <>
        <div>
            <h2 className="mx-auto border mt-3 text-center w-50 mt-5 p-3">Product Categories</h2>
            <div className="m-10 mt-1 mx-auto w-50 p-3 border d-flex flex-wrap">
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
            <h2 className="mx-auto border text-center w-50 mt-5 p-3">Search for product</h2>
            <div className="m-10 mt-1 mx-auto w-50 p-3 border d-flex">
            <Nav.Item className="d-flex align-items-center">
                <Form  inline>
                    <FormControl type="text" placeholder="type to search" onChange={handleKeywordSearch} className="mr-sm-2" />
                </Form>
            </Nav.Item></div>
            <div className="m-10 mt-1 mx-auto w-50 p-3">
                {
                    searchResults.length > 0 && searchResults.map((item, i) => {
                        return <div className="border m-1 p-3">
                            <h4>{item.name}</h4>
                            <div>{item.description}</div>
                        </div>
                    })
                }
            </div>
        </div>
        </>
    )
}
