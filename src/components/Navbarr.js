import {React,useContext} from 'react'
import { Link } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from '../context/AuthContext';



function Navbarr() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className="px-7">Attendo</Navbar.Brand>
          <div className="w-25">
            <Nav className="me-auto no-link-style">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              {currentUser ? (
                <Nav.Link>
                  <Link to="/dashboard">Dashboard</Link>
                </Nav.Link>
              ) : null}

              <Nav.Link>
                <Link to="/about">About</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signUp">SignUp</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr