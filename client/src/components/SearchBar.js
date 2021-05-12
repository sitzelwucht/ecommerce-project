import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

export default function SearchBar(props) {

    const [products, setProducts] = useState([])
    const [searchResults, setSearchResults] = useState([])

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

         setSearchResults(filteredProducts)
        
        if (!input) {
            setSearchResults([])
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className="search-bar-dropdown">
        {console.log(searchResults)}
            <input type="text" className="form-control" placeholder="Search" onChange={handleKeywordSearch}/>
            <ul className="list-group">
            {
                searchResults.length && searchResults.map((item, i) => {
                    return <Link to={`/product/${item.id}`}>
                    <button type="button"
                    className="list-group-item list-group-item-action d-flex justify-content-between">{item.name} <i>({item.category})</i></button></Link>
                })
            }
                
            </ul>
        </div>
    )
}
