import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'


export default function SearchBar(props) {

    const [products, setProducts] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [noInput, setNoInput] = useState(true)
    const inputRef = useRef()


    // get all products to use them in a state
    const getAllProducts = async () => {
        const response = await axios.get(`${config.API_URL}/api/allproducts`)
        const result = await response.data
        const list = await result.map(item => {
            return {id: item._id, name: item.title, description: item.description, category: item.category }
        })

        setProducts(list)
    }


    // get and display filtered results based on input string
    const handleKeywordSearch = (e) => {
        e.preventDefault()
        const input = e.target.value

        let filteredProducts = products.filter(item => {
            return item.name.toLowerCase().includes(input)
          })

        setNoInput(false)
        setSearchResults(filteredProducts)
        
        if (!input) {
            setNoInput(true)
        }

        if(!searchResults) {
            setSearchResults([])
        }
    }


    // clear input on clicking cancel symbol
    const handleInputClear = () => {
        inputRef.current.value = null
        setNoInput(true)
    }



    useEffect(() => {
        getAllProducts()
    }, [])

    

    return (
        <div className="search-bar-dropdown ">

            <form>
                <div className="anon-search">
                    <label for="search">
                        <img src="/cancel.png" height="20" alt="" onClick={handleInputClear} />
                        <img src="/loupe.png" height="25" alt="" />
                    </label>

                    <input 
                    type="text" 
                    id="search" 
                    className="d-flex justify-content-between" 
                    placeholder="Search for product" 
                    onChange={handleKeywordSearch}
                    ref={inputRef} />
                </div>

                <ul className="list-group">
                {
                    noInput ? null : (!searchResults.length ? <div className="white-bg">(no results)</div> : searchResults.map((item, i) => {
                        return <Link to={`/product/${item.id}`}>
                                    <button type="button"
                                    className="list-group-item list-group-item-action d-flex justify-content-between">
                                    {item.name} <i>({item.category})</i>
                                    </button>
                                </Link>
                    }))
                } 
                </ul>
            </form>
        </div>
    )
}
