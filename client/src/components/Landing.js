/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Home from './Home'
import AdminHome from './AdminHome'

export default function Landing(props) {


    return (
        <>
            { props.user && props.user.isAdmin && <AdminHome user={props.user} />}

            { props.user && !props.user.isAdmin && <Home user={props.user}/> }

            { !props.user &&
                <div>
                <img src="/logo4.png" className="frontpage-img" alt="" />
                    <Jumbotron className="mt-5">
                        <p>Welcome to random eCommerce Website</p>
                    </Jumbotron>
                    <div className="text-center p-3 w-100" 
                        style={{
                        background: 'rgba(60,60,60, .4)',
                        position: 'fixed',
                        bottom: '0'
                        }}>
                        <a href="/admin"><Button variant="link">admin</Button></a>
                    </div>     
                </div>
            }

        </>
    )
}
