import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "employee") {
      setUserRole("non-employee");
    } else {
      setUserRole("employee");
    }
  }, []);

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        style={{
          paddingInline: "180px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 0.4px 0.2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Container>
          <Row className="w-100 text-center align-items-center">
            {/* 🎨 Sol Bölüm - MUSEGALLERY */}
            <Col className="text-start">
              <Navbar.Brand
                as={Link}
                to="/"
                className="fw-bold fs-4"
                style={{ fontFamily: "MyFont" }}
              >
                MUSEGALLERY
              </Navbar.Brand>
            </Col>

            {/* 🔗 Orta Bölüm - Linkler */}
            <Col>
              <Nav
                className="justify-content-center"
                style={{ textTransform: "uppercase", fontSize: "12px" }}
              >
                <Nav.Link as={Link} to="/home" className="mx-3">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/products" className="mx-3">
                  Artworks
                </Nav.Link>
                <Nav.Link as={Link} to="/artists" className="mx-3">
                  Artists
                </Nav.Link>
              </Nav>
            </Col>

            {/* 👤 Sağ Bölüm - Profil / Sepet */}
            <Col className="text-end">
              {userRole === "employee" ? (
                <Nav.Link as={Link} to="/employee-profile">
                  👤
                </Nav.Link>
              ) : (
                <Button
                  variant="outline-light"
                  onClick={() => setShowCart(true)}
                >
                  🛒
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* 🛒 Sepet Modalı */}
      <Modal show={showCart} onHide={() => setShowCart(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your cart is empty.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
