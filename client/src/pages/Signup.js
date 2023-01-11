
import React, { useState } from 'react';
import { Container, Col,  Button, Row, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSignupMutation } from '../services/appApi';
import "./signup.css";

function Signup() {
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ signup, { error, isLoading, isError}] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ firstName, lastName, email, password});
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="signup_from--container">
                <Form style={{width: "100%"}} onSubmit={handleSignup}>
                    <h1>Create an account</h1>
                    {isError && <Alert variant='danger' >{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Your first name" 
                            value={firstName} required 
                            onChange={(e) => setFirstName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder="Your Last name" 
                            value={ lastName} required 
                            onChange={(e) => setLastName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email" 
                            placeholder="Enter email" 
                            value={email} required 
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group  className='mb-3'>
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
                            Create account
                        </Button>
                    </Form.Group>
                    <p className='pt-3 text-center'>
                        Don't have an account? <Link to="/login">Login</Link>
                    </p>
                </Form>
            </Col>
            <Col md={6} className="signup_image--container"></Col>
            </Row>
    </Container>
  )
}

export default Signup