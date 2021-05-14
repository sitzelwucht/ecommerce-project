import React from 'react'

export default function NotFound(props) {
    return (
        <div className={ props.shrinkNav ? "container-max" : "container-shrink" }>
            <div className="w-50 h-50 border mx-auto pt-5 text-center">
                <h1>404</h1>
                <p>This page does not exist</p>
            </div>
        </div>
    )
}
