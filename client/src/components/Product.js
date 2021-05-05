/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, Form, Badge } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'
import { useCart } from '../contexts/CartProvider'
import { useFavorites } from '../contexts/FavoriteProvider'


export default function Product(props) {

    const [editMode, setEditMode] = useState(false);
    const { addToCart, cartItems } = useCart()
    const { favorites, updateFavorites } = useFavorites()
    const [favoriteItems, setFavoriteItems] = useState(favorites)

    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [stock, setStock] = useState(props.stock)
    const [updatedProduct, setUpdatedProduct] = useState({...props})

    const [quantity, setQuantity] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)


    // product editing for admins
    const handleEdit = (e) => {
      e.preventDefault()
      const editedProduct = {
        title: e.target.title.value,
        category: props.category,
        description: e.target.description.value,
        price: e.target.price.value,
        stock: e.target.stock.value,
      }
      
      axios.patch(`${config.API_URL}/api/products/${props.id}`, editedProduct)
      .then(() => {
          axios.get(`${config.API_URL}/api/getproduct/${props.id}`)
          .then((result) => {
            setUpdatedProduct(result.data)
          })
        
        setEditMode(false)
      })

    }

    const handleAdd = (e) => {
        e.preventDefault()
        if (quantity) {
            addToCart(props.user._id, props.title, props.price, quantity)
        }
       else {
        alert('Please select quantity')
       }
        
    }

    const toggleFavorite = () => {
        isFavorite ? setIsFavorite(false) : setIsFavorite(true)

        isFavorite ? 
        updateFavorites(props.user._id, favoriteItems, props.title, false) :
        updateFavorites(props.user._id, favoriteItems, props.title, true) 
    }


    useEffect(() => {
        props.user && setFavoriteItems(favoriteItems.filter(elem => {
            return elem.user === props.user._id
        }))
    }, [])


    return (
        <>
            <div className="border m-3 p-3 w-25 product-box">
            {
                !editMode ? 
                    <>
                        <div className="product-title text-center">{updatedProduct.title}</div>
                        <div>{updatedProduct.description}</div>
                        <h5 className="text-right">{updatedProduct.price} EUR</h5>
                        <div className="text-right"><div>Stock:</div>
                        {
                            updatedProduct.stock > 100 && 
                            <Badge className="stock darkgreen"> {props.user && props.user.isAdmin && <h5>{updatedProduct.stock} —</h5>} 
                            In Stock</Badge> 
                        }
                        {
                            updatedProduct.stock > 50 && updatedProduct.stock <= 100 && 
                            <Badge className="stock green"> {props.user && props.user.isAdmin && <h5>{updatedProduct.stock} —</h5>} 
                            Available </Badge>
                        }
                        {
                            updatedProduct.stock > 20 && updatedProduct.stock <= 50 && 
                            <Badge className="stock yellow"> {props.user && props.user.isAdmin && <h5>{updatedProduct.stock} —</h5>}  
                            Some Available </Badge>
                        }
                        {
                            updatedProduct.stock <= 20 && 
                            <Badge className="stock orange"> {props.user && props.user.isAdmin && <h5>{updatedProduct.stock} —</h5>} 
                            Low stock </Badge>
                        }
                        {
                            updatedProduct.stock <= 0 && 
                            <Badge className="stock red"> {props.user && props.user.isAdmin && <h5>{updatedProduct.stock} —</h5>} 
                            Out of stock </Badge>
                        }
                        </div>
                    </> :
                    <Form onSubmit={handleEdit}>
                    <Form.Group controlId="formBasicCategory">
                            <Form.Control type="text" name="category" defaultValue={props.category} hidden />
                        </Form.Group>
                        <Form.Group controlId="formBasicProductName">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={props.title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>description</Form.Label>
                            <Form.Control type="text" name="description" defaultValue={props.description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>price</Form.Label>
                            <Form.Control type="number" name="price" defaultValue={props.price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicStock">
                            <Form.Label>stock</Form.Label>
                            <Form.Control type="number" name="stock" defaultValue={props.stock} onChange={(e) => setStock(e.target.value)}  />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Save
                        </Button>
                    </Form>
            }
                       
     
            <div className="d-flex flex-row bd-highlight mx-auto mt-2">
                        {
                        props.user && props.user.isAdmin && !editMode &&
                            <>
                            <Button variant="danger" className="m-1" onClick={() => {props.onDelete(props._id)}}>delete</Button>
                            <Button variant="success" className="m-1" onClick={() => setEditMode(true)}>edit</Button>
                            </>
                        }
                        {
                        props.user && !props.user.isAdmin && 
                            <div className="d-flex flex-column mx-auto">
                            <Form className="d-flex">
                                <Form.Group className="m-1">
                                    <Form.Control as="select" onChange={(e) => {setQuantity(parseInt(e.target.value))}} name="qtySelect" >
                                        <option defaultValue >qty</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="info" className="m-1" 
                                onClick={handleAdd}>to cart</Button>
                            </Form>
                                <img src={isFavorite ? "/favorite2.svg" : "/unfavorite.svg"} 
                                height="30" 
                                className="favorite" 
                                alt="add favorite" 
                                title={isFavorite ? "remove from favorites" : "add to favorites"} 
                                onClick={toggleFavorite} /> 
                            </div>
                        }
                        </div>
                    </div>
        </>
    )
}
