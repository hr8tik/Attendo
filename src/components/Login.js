import React from 'react'
import { useRef, useState,useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

function Login() {
     const emailRef = useRef(null);
     const passwordRef = useRef(null);
     const navigate = useNavigate();
     const handleSubmit=(e)=>{
       e.preventDefault();
       const email = emailRef.current.value;
       const password = passwordRef.current.value; 
       try {
         auth.signInWithEmailAndPassword(email, password);
       } catch (error) {
         alert(error);
       }
    };
     const { currentUser } = useContext(AuthContext);
     if (currentUser) {
       return navigate('/dashboard')
     }
  return (
  <>
  <Card className="  d-flex align-items-center justify-content-centervh-90">
        <div
          className=" m-5 p-5 rounded border-bottom"
          style={{ background: "#f7f7f7" }}
        >
          <h1 className="my-5 text-center"> Log In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Password" />
            </Form.Group>
           

            <Button className="align-center" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Card>
    </>
 
  )
}

export default Login