import { Navbar, Nav,Container } from "react-bootstrap/";
import "./MyNavbar.css";
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";


function MyNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
   
    <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand id='navbar-brand' className="title">
          <div>
            <Nav.Link href="/"><i class="bi bi-heart-pulse-fill"></i> SensHealth</Nav.Link></div>
          </Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/" className="wh font">Call list</Nav.Link>
          <Nav.Link href="/sensors"className="wh font" >Sensors</Nav.Link>
          </Nav>
          <div className='login'>
            <h5 id='nav-username' className='mx-4 my-0' color="white">
              <i class="bi bi-person-circle"></i>
                <span>  Hi,Mario!</span>
            </h5>
          </div>
        </Container>
      </Navbar> <tag>
    
</tag>
    <Outlet />
  </>
};

export { MyNavbar };