import React, { useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Alert, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'
import { Image } from 'cloudinary-react'
import Loader from './Loader'


function AddForm(props) {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [categs, setCategs] = useState([])
    const [updatedCategs, setUpdatedCategs] = useState(null)

    const [cloudinaryId, setCloudinaryId] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    // display failure/success alert for 1.5 seconds
    const handleAlert = (bool) => {
        bool ? setShowSuccessAlert(true) : setShowErrorAlert(true)
        setTimeout(() => {
            bool ? setShowSuccessAlert(false) : setShowErrorAlert(false)
        }, 1500)
       
    }

    const uploadImage = files => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'kcutxuxu')
        axios.post('https://api.cloudinary.com/v1_1/dew5980fy/image/upload', formData)
        .then(response => {
            setCloudinaryId(response.data.public_id)
            setImageUrl(response.data.url)
            setIsLoading(true)
        })
    }

    // add new category
    const handleAddCategory = (e) => {
        e.preventDefault()
        const newCategory = {
            name: e.target.category.value
         }
       
        axios.post(`${config.API_URL}/api/newcategory`, newCategory)
        .then(response => {
            handleAlert(true)
            setUpdatedCategs(() => {
                props.getCategories().then(result => setUpdatedCategs(result))
            })
            props.history.push('/')
        })
        .catch(err => handleAlert(false))
    }


    // add new product
    const handleAdd = (e) => {
        e.preventDefault()
        const newProduct = {
            title: e.target.title.value,
            category: e.target.categorySelect.value,
            description: e.target.description.value,
            price: e.target.price.value,
            stock: e.target.stock.value,
        }
        axios.post(`${config.API_URL}/api/newproduct`, newProduct)
        .then(response => handleAlert(true))
        .catch(err => {
            console.log(err)
            handleAlert(false)
        })

    }


    useEffect(() => {
        props.onGetCategs().then(result => {
            setCategs(result)
        })
    }, [])


    useEffect(() => {
        props.onGetCategs().then(result => {
            setCategs(result)
        })
    }, [updatedCategs])


    return (
        <div>
        { showSuccessAlert && <Alert variant="success">Product added</Alert> }
        { showErrorAlert && <Alert variant="danger">Adding failed</Alert> }

            <Form inline className="border p-3 mb-3" onSubmit={handleAddCategory}>
                    <InputGroup>
                        <FormControl type="text" name="category" placeholder="add new product category" />
                        <InputGroup.Append><Button type="submit" variant="dark">Submit</Button></InputGroup.Append>
                    </InputGroup>
            </Form>  


            <Form onSubmit={handleAdd} className="border p-3">

                <Form.Group controlId="formBasicProductCategory">
                    <Form.Label className="font-weight-bold">category</Form.Label>

                    <Form.Control as="select" name="categorySelect" default="select product category" >
                    <option selected disabled hidden>select product category</option>
                    {
                        categs && categs.map((item, i) => {
                            return <option key={i}>{item}</option>
                        })
                    }
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicImage"> 
                    <Form.Control type="file" onChange={(e) => {uploadImage(e.target.files)}} />
                        <Form.Label className="font-weight-bold">Image url</Form.Label>
                        <Form.Control name="imageUrl" type="text" value={imageUrl} />
 
     
                </Form.Group>

            <Form.Group controlId="formBasicProductName">
                <Form.Label className="font-weight-bold">name</Form.Label>
                <Form.Control type="text" name="title" placeholder="Enter product name" />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label className="font-weight-bold">description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Product description" />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
                <Form.Label className="font-weight-bold">price (in cents) </Form.Label>
                <Form.Control type="number" name="price" placeholder="Product price" />
            </Form.Group>

            <Form.Group controlId="formBasicStock">
                <Form.Label className="font-weight-bold">stock</Form.Label>
                <Form.Control type="number" name="stock" placeholder="Product stock" />
            </Form.Group>

            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
        <div>
        { !isLoading ? <Image style={{height: '200px'}} cloudName="dew5980fy" publicId={cloudinaryId} /> : <Loader /> }
        </div>

        </div>
    )
}

export default withRouter(AddForm)