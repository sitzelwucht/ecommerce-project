/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Form, FormControl } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Home from './Home'
import AdminHome from './AdminHome'

export default function Landing(props) {


    return (
        <>
            { props.user && props.user.isAdmin && <AdminHome user={props.user} getCategories={props.getCategories} />}

            { props.user && !props.user.isAdmin && <Home user={props.user}/> }

            { !props.user &&
                <div className={ props.shrinkNav ? "container-max" : "container-shrink" }>
                <Link to={'/categories'}>
                        <Button variant="dark" className="btn-lg m-5">Browse</Button>
                    </Link>
                    <div className="d-flex align-items-center">
                        <h1 className="welcome-msg">Welcome to random eCommerce Website</h1>
                        <img src="/feather.png" className="frontpage-img m-5" alt="" />
                    </div>
              
                    

    


                </div>
            }

        </>
    )
}
