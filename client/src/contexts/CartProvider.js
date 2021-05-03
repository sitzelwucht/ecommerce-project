import React, { useContext, createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext()


export const useCart = () => {
    return useContext(CartContext)
}

export default function CartProvider({children}) {
    
    const [cartItems, setCartItems] = useLocalStorage('items', [])
    

    // add to cart using user's id and product's id
    const addToCart = (user, prodName, prodPrice, quantity) => {
        const addedProducts = []
        for (let i = 0; i < quantity; i++) {
            addedProducts.push({user, prodName, prodPrice})
        }
        setCartItems(prevCart => {
            return [...prevCart, ...addedProducts]
        })
    }

    const removeFromCart = (cartArray, user, product) => {
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].user === user && cartArray[i].prodName === product) {
                cartArray.splice(i, 1)
                break;
            }
        }
       setCartItems(cartArray)
    }


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}
