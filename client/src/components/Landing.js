/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Form, FormControl } from 'react-bootstrap'
import Home from './Home'
import AdminHome from './AdminHome'

export default function Landing(props) {


    return (
        <>
            { props.user && props.user.isAdmin && <AdminHome user={props.user} getCategories={props.getCategories} />}

            { props.user && !props.user.isAdmin && <Home user={props.user}/> }

            { !props.user &&
                <div className={ props.shrinkNav ? "container-max  landing" : "container-shrink  landing" }>

                    <div className="d-flex align-items-center justify-content-center w-50 mx-auto mt-5">
                    <div className=" w-25 mt-5 py-5">
                        <h1 className="welcome-msg">Welcome to random eCommerce Website</h1>
                        <Link to={'/categories'}>
                            <Button variant="dark" className="btn-lg m-5" onClick={props.onAction}>Browse</Button>
                        </Link>
                    </div>
                    <div className=" w-25">
                        <img src="/feather.png" height="300" className="frontpage-img m-5" alt="" />
                        </div>
                    </div>

                </div>
            }

        </>
    )
}
