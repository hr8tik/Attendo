import { useRef,useState } from "react";
import {Button,Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { auth,app } from "../firebase";
import { Redirect, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
   const [currentUser, setCurrentUser] = useState(false);   
   const navigate = useNavigate(); 

  const handleSubmit= async (e)=>{
    e.preventDefault(); 
    const email = emailRef.current.value; 
     const password = passwordRef.current.value; 
     const confirmPassword = confirmPasswordRef.current.value;
     if(password!==confirmPassword){
      alert("Enter the correct password ")
     }
     else{
        try{
          console.log("23")
         await auth.createUserWithEmailAndPassword(email, password);  
          setCurrentUser(true)
        }
        catch(error){
           alert(error);
           
          
        }
     }
     if (currentUser) {
      return navigate('/login')
      alert("Done");
    
      
       
     }
     
    
    
    
    
    }

    const handleClick=()=>{
      if(currentUser){
        console.log("50")
        navigate('/login');
      }
    }
 return (
    <>
      <Card className="  d-flex align-items-center justify-content-centervh-90">
        <div
          className=" m-5 p-5 rounded border-bottom"
          style={{ background: "#f7f7f7" }}
        >
          <h1 className="my-5 text-center"> SignUp</h1>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} placeholder=" Confirm Password" />
            </Form.Group>

            <Button className="align-center" onClick={handleClick} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Card>
    </>
  );
}

export default SignUp;
