/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Form, FormControl, Carousel } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Home from './Home'
import AdminHome from './AdminHome'

export default function Landing(props) {


    return (
        <>
            { props.user && props.user.isAdmin && <AdminHome user={props.user} getCategories={props.getCategories} />}

            { props.user && !props.user.isAdmin && <Home user={props.user}/> }

            { !props.user &&
                <div>
                <img src="/cube.png" className="frontpage-img m-5" alt="" />
                    <Jumbotron className="mt-5 text-center">
                        <h1 className="font-weight-bold">Welcome to random eCommerce Website</h1>

   
                            <Link to={'/categories'}>
                                <Button variant="dark" className="btn-lg m-5">Browse</Button>
                            </Link>
           

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
