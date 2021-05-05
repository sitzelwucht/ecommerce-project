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
            addedProducts.push({user, prodName, prodPrice, quantity})
        }
        setCartItems(prevCart => {
            return [...prevCart, ...addedProducts]
        })
    }

    // add/remove product from cart
    const updateProductQty = (cartArray, user, product, price, bool) => {
        if (bool) {
            const newProduct = {
                user: user,
                prodName: product,
                prodPrice: price
            }
            cartArray.splice(0, 0, newProduct)
        }
        else {
            for (let i = 0; i < cartArray.length; i++) {
                if (cartArray[i].user === user && cartArray[i].prodName === product) {
                    cartArray.splice(i, 1)
                    break;
                }
            }
        }

        setCartItems(cartArray)
    }

    // get an array of unique product names with number of their occurrences
    const getQuantities = (arr) => {
        const countsArr = []

        arr.forEach(item => {
            for (let i = 0; i < countsArr.length; i++) {
                if (item.prodName === countsArr[i].prodName) {
                    countsArr[i].quantity += 1
                    return
                }
            }
            item.quantity = 1
            countsArr.push(item)
        })
        return countsArr
    }


    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateProductQty, getQuantities }}>
            {children}
        </CartContext.Provider>
    )
}
