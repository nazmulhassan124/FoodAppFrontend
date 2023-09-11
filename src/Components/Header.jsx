import React from 'react'
// import Button from 'react-bootstrap/Button';
import { Button } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {

  return (
    <div>
<Navbar expand="lg"  bg="primary" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="/">FOOD APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addfood">Add Food</Nav.Link>
            <Nav.Link href="/">Food List</Nav.Link>
            <Nav.Link href="/order">Food Order </Nav.Link>
            <Nav.Link href="/orderlist">Order List</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </div>
  )
}

export default Header