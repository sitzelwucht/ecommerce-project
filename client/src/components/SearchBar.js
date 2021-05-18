import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default function SearchBar(props) {

    const [products, setProducts] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [noInput, setNoInput] = useState(true)

    const getAllProducts = async () => {
        const response = await axios.get(`${config.API_URL}/api/allproducts`)
        const result = await response.data
        const list = await result.map(item => {
            return {id: item._id, name: item.title, description: item.description, category: item.category }
        })

        setProducts(list)
    }

    const handleKeywordSearch = async (e) => {
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

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className="search-bar-dropdown ">

            <form>
            <div className="anon-search">
                <label for="search">
                    <img src="/loupe.png" height="20" alt="" />
                </label>

                <input type="text" id="search" className="d-flex justify-content-between" placeholder="Search" onChange={handleKeywordSearch} />
                </div>
                <ul className="list-group">
                {
                    noInput ? null : (!searchResults.length ? <div className="white-bg">(no results)</div> : searchResults.map((item, i) => {
                        return <Link to={`/product/${item.id}`}>
                        <button type="button"
                        className="list-group-item list-group-item-action d-flex justify-content-between">{item.name} <i>({item.category})</i></button></Link>
                    }))
                }
                    
                </ul>
            </form>
        </div>
    )
}
