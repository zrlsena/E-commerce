import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const [userRole, setUserRole] = useState(null); // Kullanıcı rolünü tutacak state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Kullanıcı rolü yoksa veya rol employee değilse yönlendir
    if (!storedUser || storedUser.role !== "employee") {
      setUserRole("non-employee"); // "employee" değilse 'non-employee' olarak ayarla
    } else {
      setUserRole("employee"); // Eğer employee rolündeyse rolü ayarla
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
            </Nav>
            
            <Nav className="ms-auto">
              {userRole === "employee" ? (
                // Eğer kullanıcı 'employee' rolündeyse, profil butonunu göster
                <Nav.Link as={Link} to="/employee-profile" className="text-white">
                  👤 Profile
                </Nav.Link>
              ) : (
                // Eğer kullanıcı 'employee' değilse, sepet butonunu göster
                <Button variant="outline-light" onClick={() => setShowCart(true)}>
                  🛒 Cart
                </Button>
              )}
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
