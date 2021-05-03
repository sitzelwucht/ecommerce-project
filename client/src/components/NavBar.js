/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Nav, Button, Badge } from 'react-bootstrap'
import Cart from './Cart'
import Favorites from './Favorites'
import { useCart } from '../contexts/CartProvider'


export default function NavBar(props) {

    const { cartItems } = useCart()

    const [cartModalShow, setCartModalShow] = useState(false);
    const [favoriteModalShow, setFavoriteModalShow] = useState(false);
    const [items, setItems] = useState(cartItems)


    // show cart items of logged in user only
    useEffect(() => {
        setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [])


    useEffect(() => {
        // setItems(cartItems.filter(elem => {
        //     return elem.user === props.user._id
        // }))
        return setItems(cartItems.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [cartItems])


    return (
        <div>
            <Nav className={props.admin ? 
            "d-flex justify-content-between p-4 pt-5 admin-nav" : 
            "d-flex justify-content-around p-4 user-nav nav"} >

            {
                props.admin ? 
                <>
                    <Nav.Item className="d-flex align-items-center">
                        <Badge variant="info" className="p-1"><h6>{props.user.email}</h6></Badge>
                    </Nav.Item>
                    <Nav.Item>
                        <h6>ADMIN</h6>
                    </Nav.Item>
                </> : 
                <>
                    <Nav.Item className="d-flex align-items-center" >
                        <Nav.Link href="/">
                        <img src="/logo.svg" height="85" alt="home" className="m-1 " title="home" />
                        <Badge variant="info" className="m-3"><h5>{props.user.email}</h5></Badge>
                        </Nav.Link>
                    </Nav.Item>
       
                    <Nav.Item className="d-flex align-items-center">
                        <Nav.Link href="/categories"><Button variant="outline-light">Categories</Button></Nav.Link>
                    </Nav.Item>
                
                    <Nav.Item className="d-flex pt-4">
                        <Nav.Link eventKey="link-2" onClick={() => setFavoriteModalShow(true)}>
                        <img src="/favorite.svg" className="svg-icon" height="40" alt="favorites" title="your favorites" />
                        
                        </Nav.Link>

                        <Nav.Link eventKey="link-1" onClick={() => setCartModalShow(true)}>
                        <img src="/shopping-cart.svg" className="svg-icon" height="40" alt="cart" title="your cart" />
                        {
                        items && items.length > 0 && <div className="product-count">{items.length}</div>    
                        }
                        </Nav.Link>
                    </Nav.Item>

                    <Favorites show={favoriteModalShow} onHide={() => setFavoriteModalShow(false)} />
                
                    <Nav.Item>
                     
                    </Nav.Item>
                    
                    <Cart user={props.user} show={cartModalShow} onHide={() => setCartModalShow(false)} />
                </>
            } 
                
                    <Nav.Item className="d-flex align-items-center">
                        <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                    </Nav.Item>  
            </Nav>
        </div>
    )
}
