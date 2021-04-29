/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'


export default function UserSettings(props) {

    const [showEditing, setShowEditing] = useState(false)
    const [email, setEmail] = useState(props.user.email)
    const [firstName, setFirstName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)
    const [phone, setPhone] = useState(props.user.phone)
    const [address, setAddress] = useState(props.user.address)
    const [postCode, setPostCode] = useState(props.user.postCode)
    const [city, setCity] = useState(props.user.city)
    const [updatedUser, setUpdatedUser] = useState(props.user)

    const handleShowEditing = () => {
       showEditing ? setShowEditing(false) : setShowEditing(true)

    }

    const editInfo = (e) => {
        e.preventDefault()
        const updatedInfo = {
            email: e.target.email.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            postCode: e.target.postCode.value,
            city: e.target.city.value
        }
        console.log(updatedInfo)
  
        axios.patch(`${config.API_URL}/api/edituser/${props.user._id}`, updatedInfo)
        .then(() => {
            console.log('hello')
        })
    
    }


    useEffect(() => {
        const user = axios.get(`/getuser/${props.user._id}`)
        .then(result => {
            setUpdatedUser(result)
        })
    }, [])

    
    return (
        <div>
        { console.log(props.user)}
            <div className="d-flex justify-content-align-items p-3">
                <h2>User information</h2>
               {
                <Button variant="outlined-light" onClick={handleShowEditing}>
                { !showEditing ? 'edit' : 'cancel' }
                </Button> 
               } 

            </div>
        {
            !showEditing && 
            <table>
                <tr>
                    <td className="bold">Email</td>
                    <td>{props.user.email}</td>
                </tr>
                <tr>
                    <td className="bold">Firstname</td>
                    <td>{props.user.firstName}</td>
                </tr>
        
                <tr>
                    <td className="bold">Lastname</td>
                    <td>{props.user.lastName}</td>
                </tr>

                <tr>
                    <td className="bold">Phone</td>
                    {
                        props.user.phone ? <td>{props.user.phone}</td> :
                        <Button variant="success">add</Button>
                    }   
                </tr>

                <tr>
                    <td className="bold">Street Address</td>
                    {
                        props.user.address ? <td>{props.user.address}</td> :
                        <Button variant="success">add</Button>
                    }  
                </tr>

                <tr>
                    <td className="bold">Post Code</td>
                    {
                        props.user.postCode ? <td>{props.user.postCode}</td> :
                        <Button variant="success">add</Button>
                    }  
                </tr>

                <tr>
                    <td className="bold">City</td>
                    {
                        props.user.city ? <td>{props.user.city}</td> :
                        <Button variant="success">add</Button>
                    }  
                </tr>
            </table>

        }
            

        {
            showEditing && 

            <Form onSubmit={editInfo}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" defaultValue={props.user.email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" defaultValue={props.user.firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" defaultValue={props.user.lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" defaultValue={props.user.phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" defaultValue={props.user.address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPostcode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control type="text" name="postCode" defaultValue={props.user.postCode} onChange={(e) => setPostCode(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={props.user.city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>

            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>



        }

        </div>
    )
}
