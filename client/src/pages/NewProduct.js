import React, { useState } from 'react'
import { Alert, Col, FormSelect, Row, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import axios from '../axios';
import './NewProduct.css'

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [ createProduct, {isError, error, isLoading, isSuccess}] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}`)
            .then((res) => {
            setImgToRemove(null);
            setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({name, description, price, category, images}).then(({data}) => {
            if(data.length > 0) {
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            }
        })
    };

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: "dxdkdixwg",
            uploadPreset: "gjlihtf4"
        },
        (error, result) => {
            if (!error && result.event === "success") {
                setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id}])
            }
        }
        );
        
        widget.open();
    }
  return (
    <Container>
        <Row>
            <Col md={6} className="new-product_from--container">
                <Form style={{width: "100%"}} onSubmit={handleSubmit}>
                    <h1 className='mt-4'>Create a product</h1>
                    {isSuccess && <Alert variant='success'>Product created with success</Alert>}
                    {isError && <Alert variant='danger' >{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name" 
                                value={name} required 
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Product description</Form.Label>
                            <Form.Control
                                as= "textarea"
                                placeholder="Product description"
                                style= {{ height: "100px"}}
                                value={description} required 
                                onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price $</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price {$}"
                                value={price} required 
                                onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' onChange={ (e) => setCategory(e.target.value)}>
                            <Form.Label>category</Form.Label>
                            <FormSelect>
                                <option disabled selected> 
                                -- Select One --
                                </option>
                                <option value="technology">technology</option>
                                <option value="tablets">tablets</option>
                                <option value="phones">phones</option>
                                <option value="laptops">laptops</option>
                            </FormSelect>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button type='button' onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className='images-perview-container'>
                                {images.map((image) => (
                                    <div className='image-perview'>
                                        <img src={image.url} />
                                        <i className='fa fa-times-circle' onClick={() => handleRemoveImg(image)}></i>
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                               Create product
                            </Button>
                        </Form.Group>
                        <p className='pt-3 text-center'>
                            Don't have an account?<Link to="/signup">Create account</Link>
                        </p>
                </Form>
            </Col>
            <Col md={6} className="new-product_image--container"></Col>
        </Row>
    </Container>
  )
}

export default NewProduct



