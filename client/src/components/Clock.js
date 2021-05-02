import React, { useState, useEffect } from 'react'

export default function Clock() {

    const [time, setTime] = useState(new Date())

    const updateTime = () => {
        setTime(new Date())
    }


    useEffect(() => {
        const timer = setInterval(() => {
          updateTime();
        }, 1000);
        return () => clearInterval(timer);
      }, []);


      
    return (
        <div>
            <h5>{time.toLocaleString()}</h5>
        </div>
    )
}
