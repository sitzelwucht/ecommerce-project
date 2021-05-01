/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
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
    const [showAlert, setShowAlert] = useState(false) 

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

        axios.patch(`${config.API_URL}/api/edituser/${props.user._id}`, updatedInfo)
        .then(() => {
            handleShowAlert()
            axios.get(`${config.API_URL}/api/getuser/${props.user._id}`)
            .then(result => {
                setUpdatedUser(result.data)
            })
        

        })


    }

    const handleShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 1500);
    }


    // useEffect(() => {
    //     console.log(updatedUser)
    // }, [updatedUser])


    return (
        <div>
    {console.log(props.user)}
    {console.log(updatedUser)}
            <div className="d-flex justify-content-align-items p-3">
                <h2>User information</h2>
               {
                <Button variant="outlined-light" onClick={handleShowEditing}>
                { !showEditing ? 'edit' : 'cancel' }
                </Button> 
               } 

            </div>
            { showAlert && <Alert variant="success">Information updated</Alert> }
        {
            !showEditing && 
            <table>
                <tr>
                    <td className="bold">Email</td>
                    <td>{updatedUser.email}</td>
                </tr>
                <tr>
                    <td className="bold">Firstname</td>
                    <td>{updatedUser.firstName}</td>
                </tr>
        
                <tr>
                    <td className="bold">Lastname</td>
                    <td>{updatedUser.lastName}</td>
                </tr>

                <tr>
                    <td className="bold">Phone</td>
                    {
                        updatedUser.phone ? <td>{updatedUser.phone}</td> :
                        <Button variant="success">add</Button>
                    }   
                </tr>

                <tr>
                    <td className="bold">Street Address</td>
                    {
                        updatedUser.address ? <td>{updatedUser.address}</td> :
                        <Button variant="success">add</Button>
                    }  
                </tr>

                <tr>
                    <td className="bold">Post Code</td>
                    {
                        updatedUser.postCode ? <td>{updatedUser.postCode}</td> :
                        <Button variant="success">add</Button>
                    }  
                </tr>

                <tr>
                    <td className="bold">City</td>
                    {
                        updatedUser.city ? <td>{updatedUser.city}</td> :
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
                <Form.Control type="email" name="email" defaultValue={updatedUser.email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" defaultValue={updatedUser.firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" defaultValue={updatedUser.lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" defaultValue={updatedUser.phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" defaultValue={updatedUser.address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPostcode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control type="text" name="postCode" defaultValue={updatedUser.postCode} onChange={(e) => setPostCode(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={updatedUser.city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>

            <Button variant="dark" type="submit">
                Save
            </Button>
        </Form>



        }

        </div>
    )
}
