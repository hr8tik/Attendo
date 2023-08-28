
import {React,useContext} from 'react'
import { Button } from 'react-bootstrap'
import { Link,Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
function Home() {
   const { currentUser } = useContext(AuthContext);
   return (
     <>
       <h1>Home</h1>
       {currentUser ? (
         <p>
           You are logged - <Link to="/dashboard">View Dashboard</Link>
         </p>
       ) : (
         <p>
           <Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link>
         </p>
       )}
     </>
   );
}

export default Home