import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'



export default function UserSettings(props) {

    const [showEditing, setShowEditing] = useState(false)

    const handleShowEditing = () => {
       showEditing ? setShowEditing(false) : setShowEditing(true)

    }


    return (
        <div>
        
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

            <Form >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" defaultValue={props.user.email}  />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" defaultValue={props.user.firstName}  />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" defaultValue={props.user.lastName}  />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" name="phone" defaultValue={props.user.phone}   />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" defaultValue={props.user.address}  />
            </Form.Group>

            <Form.Group controlId="formBasicPostcode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control type="number" name="postCode" defaultValue={props.user.postCode}   />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" defaultValue={props.user.city}   />
            </Form.Group>



            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>



        }

        </div>
    )
}
