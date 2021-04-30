import React, { useContext, createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext()


export const useCart = () => {
    return useContext(CartContext)
}

export default function CartProvider({children}) {
    
    const [cartItems, setCartItems] = useLocalStorage('items', [])
    
    // add to cart using user's id and product's id
    const addToCart = (user, prodName, prodPrice) => {
        setCartItems(prevCart => {
            return [...prevCart, {user, prodName, prodPrice}]
        })
    }

    const removeFromCart = (cartArray, user, product) => {
        const updatedCart = cartArray.filter(elem => {
            return elem.user !== user && elem.user !== product
        })
        // setCartItems(updatedCart)
        console.log(updatedCart)
    }


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}
