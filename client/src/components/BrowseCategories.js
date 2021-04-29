import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
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


    useEffect(() => {
        getCategories()
    }, [])


    return (
        <div>
            <div className="m-10 mt-5 mx-auto w-50 p-3 border">
            {
                categories.map((item, i) => {
                    return <div className="categories-user" key={i}>
                                <Link to={`/bycategory/${item}`}><Button variant="link">{item}</Button></Link>
                            </div>
                })
            }

            </div>
        </div>
    )
}
