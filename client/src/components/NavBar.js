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


    return (
        <div>
            <Nav className={props.admin ? 
            "d-flex justify-content-between p-4 admin-nav" : 
            "d-flex justify-content-around p-4 pt-5 user-nav"} >

            {
                props.admin ? 
                <>
                    <Nav.Item>
                        <Badge variant="dark"><h6>{props.user.email}</h6></Badge>
                    </Nav.Item>
                    <Nav.Item>
                        <h6>admin</h6>
                    </Nav.Item>
                </> : 
                <>
                    <Nav.Item >
                        <Nav.Link href="/">
                        <img src="/logo.svg" height="50" alt="home" title="home" />
                        </Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item className="m-1">
                        <Badge variant="warning"><h5>{props.user.email}</h5></Badge>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/categories"><Button variant="outline-light">Categories</Button></Nav.Link>
                    </Nav.Item>
                
                    <Nav.Item className="d-flex">
                        <Nav.Link eventKey="link-2" onClick={() => setFavoriteModalShow(true)}>
                        <img src="/favorite.svg" height="35" alt="cart" title="your favorites" />
                        
                        </Nav.Link>

                        <Nav.Link eventKey="link-1" onClick={() => setCartModalShow(true)}>
                        <img src="/shopping-cart.svg" height="35" alt="cart" title="your cart" />
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
                
                    <Nav.Item>
                        <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                    </Nav.Item>  
            </Nav>
        </div>
    )
}
