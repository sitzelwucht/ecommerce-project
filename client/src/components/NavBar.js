/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Nav, Button, Badge } from 'react-bootstrap'
import Cart from './Cart'
import Favorites from './Favorites'
import SearchBar from './SearchBar'
import { useCart } from '../contexts/CartProvider'
import { useFavorites } from '../contexts/FavoriteProvider'


export default function NavBar(props) {

    const { cartItems } = useCart()
    const { favorites } = useFavorites()

    const [cartModalShow, setCartModalShow] = useState(false);
    const [favoriteModalShow, setFavoriteModalShow] = useState(false);
    const [items, setItems] = useState(cartItems)
    const [favoriteItems, setFavoriteItems] = useState(favorites)



    useEffect(() => {
        return setFavoriteItems(favorites.filter(elem => {
            return elem.user === props.user._id
        }))
        
    }, [favorites])


    useEffect(() => {
        return setItems(cartItems.filter(elem => {
           return elem.user === props.user._id
       }))
   }, [cartItems])


    return (
        <div>
            <Nav className={props.admin ? 
            "d-flex flex-column p-4 pt-5 admin-nav" : 
            "d-flex justify-content-around p-2 user-nav nav "} >

            {
                props.admin ? 
                <>
                    <Nav.Item>
                        <h6>ADMIN</h6>
                        <Badge variant="info" className="p-2 badge"><h6>{props.user.email}</h6></Badge>
                    </Nav.Item>
                </> : 
                <>
                    <Nav.Item className="d-flex align-items-center" >
                        <Nav.Link href="/">
                        <img src="/logo.svg" height="85" alt="home" className="m-1 " title="home" />
                        <Badge variant="info" className="m-3 p-2 badge">{props.user.email}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                
                    <Nav.Item className="d-flex pt-4 nav-symbols-container">
                        <Nav.Link eventKey="link-2" onClick={() => setFavoriteModalShow(true)}>
                        <div className="nav-symbols">
                            <img src="/star.svg" className="svg-icon" height="50" alt="favorites" title="your favorites" />
                            {
                            favoriteItems && favoriteItems.length > 0 && <div className="product-count favorite-count">{favoriteItems.length}</div>    
                            }
                        </div>
                        </Nav.Link>

                        <Nav.Link eventKey="link-1" onClick={() => setCartModalShow(true)}>
                            <div className="nav-symbols">
                                <img src="/shopping-cart.svg" className="svg-icon" height="55" alt="cart" title="your cart" />
                            {
                            items && items.length > 0 && <div className="product-count cart-count">{items.length}</div>    
                            }
                            </div>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="pt-4">
                        <SearchBar />
                    </Nav.Item>
                    
                    <Favorites user={props.user} show={favoriteModalShow} onHide={() => setFavoriteModalShow(false)} />
                    
                    <Cart user={props.user} show={cartModalShow} onHide={() => setCartModalShow(false)} />

                    <Nav.Item className="d-flex align-items-center">
                        <Nav.Link href="/categories"><Button variant="outline-light">Browse</Button></Nav.Link>
                    </Nav.Item>
                </>
            } 

 

                    <Nav.Item className="d-flex align-items-center">
                        <Button variant="dark" onClick={props.onLogout} >Log out</Button>
                    </Nav.Item>

            </Nav>
        </div>
    )
}
