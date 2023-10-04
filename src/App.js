import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbarr from "./components/Navbarr";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";



function App() {
  return (
    <>
      <AuthProvider>
        <Navbarr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
      
    </>
  );
}

export default App;
