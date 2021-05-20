import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader() {
    return (
        <div>
            <Spinner animation="border" className="m-5 p-3" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}
