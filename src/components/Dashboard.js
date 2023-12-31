import {React,useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';
import Timer from './Timer';

function Dashboard() {
    const navigate = useNavigate();
     const { currentUser } = useContext(AuthContext);
     if (!currentUser) {
       return navigate('/login');
     }
  return (
    <>
    <Timer/>
    <Button onClick={()=>auth.signOut()}>
        SignOut
    </Button>
    </>
  )
}

export default Dashboard