import React, { useState } from 'react';
import { Container, Col,  Button, Row, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../services/appApi';
import "./signup.css";


function Login() {
    const [email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [login, {isError, isLoading, error}] = useLoginMutation();
    function handleLogin(e){
        e.preventDefault();
        login({ email, password })
    }  
  return (
    <Container>
        <Row>
            <Col md={6} className="login_from--container">
                <Form style={{width: "100%"}} onSubmit= {handleLogin}>
                    <h1>Loding to your account</h1>
                    {isError && <Alert variant='danger' >{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email" 
                            placeholder="Enter email" 
                            value={email} required 
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password address</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password" 
                            value={password} required 
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" disabled={isLoading}>
                            Loding
                        </Button>
                    </Form.Group>
                    <p className='pt-3 text-center'>
                        Don't have an account?<Link to="/signup">Create account</Link>
                    </p>
                </Form>
            </Col>
            <Col md={6} className="login_image--container"></Col>
            </Row>
    </Container>
    
  )
}

export default Login