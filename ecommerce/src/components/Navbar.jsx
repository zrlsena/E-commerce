import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
         {/*} <Navbar.Brand as={Link} to="/home">MyStore</Navbar.Brand>*/}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
            </Nav>
            <Nav>
              {/*<Nav.Link as={Link} to="/profile">Profile</Nav.Link> */}
              <Button variant="outline-light" onClick={() => setShowCart(true)}>🛒 Cart</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🛒 Sepet Modalı */}
      <Modal show={showCart} onHide={() => setShowCart(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your cart is empty.</p>
          {/* Buraya Sepet İçeriği Eklenebilir */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
