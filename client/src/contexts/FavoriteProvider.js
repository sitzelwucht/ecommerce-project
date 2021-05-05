import React, { useContext, createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const FavoriteContext = createContext()


export const useFavorites = () => {
    return useContext(FavoriteContext)
}

export default function FavoriteProvider({children}) {
    
    const [favorites, setFavorites] = useLocalStorage('favorites', [])
    

    const updateFavorites = (user, favoritesArray, prodName, bool) => {

        if (bool) {
            const addedProduct = {
                user: user,
                prodName: prodName
            }
            
            if (!favoritesArray.some(elem => elem.prodName === prodName)) {
                setFavorites(prevFavorites => {
                return [...prevFavorites, addedProduct]
                })
            }
            else (console.log('already included'))
        }
        
        else {
            for (let i = 0; i < favoritesArray.length; i++) {
                if (favoritesArray[i].user === user && favoritesArray[i].prodName === prodName) {
                    favoritesArray.splice(i, 1)
                    break;
                }
            }
    
            setFavorites(favoritesArray)
        }

    }




    return (
        <FavoriteContext.Provider value={{ favorites, updateFavorites }}>
            {children}
        </FavoriteContext.Provider>
    )
}
