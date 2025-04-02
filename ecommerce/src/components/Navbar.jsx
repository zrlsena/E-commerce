import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ useLocation eklendi
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Offcanvas,
  Row,
  Col,
} from "react-bootstrap";

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false); // 🔥 Başlangıçta solid

  const location = useLocation(); // 📍 Mevcut sayfanın URL'sini alıyoruz

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.role === "employee" ? "employee" : "non-employee");

    // 🔥 Yalnızca Home Page'de ve yalnızca slide bölümündeyken transparan yap
    const handleScroll = () => {
      const slideHeight = document.getElementById("carousel-section")?.offsetHeight || 500; // Varsayılan değer
      if (window.scrollY < slideHeight && location.pathname === "/") {
        setIsTransparent(true); // Slide bölgesindeyse transparan yap
      } else {
        setIsTransparent(false); // Aşağı kaydırınca veya başka sayfadaysa solid yap
      }
    };

    // Sayfa değiştiğinde baştan kontrol et
    if (location.pathname === "/") {
      setIsTransparent(true);
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsTransparent(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // 📍 Sayfa değiştiğinde tekrar kontrol et

  return (
    <>
      <Navbar
        expand="lg"
        className={`fixed-top ${isTransparent ? "navbar-transparent" : "navbar-solid"}`}
      >
        <Container>
          <Row className="align-items-center w-100 px-4">
            <Col xs={3} className="d-lg-none">
              <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowOffcanvas(true)} />
            </Col>

            <Col xs={6} lg={3} className="text-lg-start text-center">
              <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
                MUSEGALLERY
              </Navbar.Brand>
            </Col>

            <Col lg={6} className="d-none d-lg-flex justify-content-center">
              <Nav className="text-uppercase " style={{  fontSize: "10px", letterSpacing: "1.8px" }}>
                <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
                <Nav.Link as={Link} to="/products" className="mx-3">Artworks</Nav.Link>
                <Nav.Link as={Link} to="/artists" className="mx-3">Artists</Nav.Link>
              </Nav>
            </Col>

            <Col xs={3} lg={3} className="text-end">
              {userRole === "employee" ? (
                <Nav.Link as={Link} to="/employee-profile">👤</Nav.Link>
              ) : (
                <Button variant="outline-light" onClick={() => setShowCart(true)}>🛒</Button>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column text-uppercase">
            <Nav.Link as={Link} to="/" onClick={() => setShowOffcanvas(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={() => setShowOffcanvas(false)}>Artworks</Nav.Link>
            <Nav.Link as={Link} to="/artists" onClick={() => setShowOffcanvas(false)}>Artists</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

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
