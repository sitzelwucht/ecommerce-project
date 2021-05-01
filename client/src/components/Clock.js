import React, { useState, useEffect } from 'react'

export default function Clock() {

    const [time, setTime] = useState(new Date())

    const updateTime = () => {
        setTime(new Date())
    }


    useEffect(() => {
        setInterval(() => 
            updateTime(), 1000)
    }, [])


    

    return (
        <div>
            <h5>{time.toLocaleString()}</h5>
        </div>
    )
}
