import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const Artists = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch all employees from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/employees");
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Container className="mt-5 p-5 container" style={{ maxWidth: "1200px" }}>
      <h1 className="text-center mb-5">Artists</h1>
      <Row className="g-4" >
        {employees.map((employee) => (
          <Col key={employee._id} xs={12} sm={6} md={4} lg={4} className="text-center" >
            <Link to={`/${employee.name}`} className="text-decoration-none">
              <div className="artist-card position-relative rounded overflow-hidden shadow-sm" >
                <div className="image-container">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="img-fluid"
                  />
                </div>
                <div className="position-absolute top-50 start-50 translate-middle text-white fw-bold fs-5 text-uppercase text-shadow">
                  {employee.name}
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Artists;
