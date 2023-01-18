import { Navbar, Nav } from "react-bootstrap/";
import { PersonCircle, List } from "react-bootstrap-icons";
import "./MyNavbar.css";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Outlet } from "react-router-dom";


function MyNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <>
    <Navbar id='navbar' bg='primary' variant='light' className='px-3 d-flex flex-row justify-content-between'>
      <Navbar.Toggle aria-controls='left-sidebar' />
      <Nav className="justify-content-end" activeKey="/home" variant="pills">
        <Nav.Item>
          <Nav.Link href="/">Call list</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Sensor</Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Brand id='navbar-brand' className="title"><div><i class="bi bi-heart-pulse-fill"></i> SensHealth</div></Navbar.Brand>
      <Nav className='ml-auto'>
        <Nav.Item>

          <div className='login'>
            <h5 id='nav-username' className='mx-4 my-0' color="white">
              <i class="bi bi-person-circle"></i>
                <span>  Hi,Mario!</span>
            </h5>
          </div>
        </Nav.Item>
      </Nav>
    </Navbar>
    <tag>
    
</tag>
    <Outlet />
  </>
};

export { MyNavbar };