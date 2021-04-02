import React from 'react'

export default function Home(props) {
    return (
        <div>
        { props.user && <h2>{props.user}</h2>}
            Home page
        </div>
    )
}
