import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Employee = () => {
  const { employeeName } = useParams();
  const [employee, setEmployee] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/employee/name/${employeeName}`);
        setEmployee(res.data);
        const productsRes = await axios.get(`http://localhost:5000/products?employeeId=${res.data._id}`);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeName]);

  if (!employee)
    return (
      <div className="text-center mt-5 ">
        <Spinner animation="border" variant="primary" />
        <h4>Yükleniyor...</h4>
      </div>
    );

  return (
    <Container className="mt-5 p-5 container" style={{ maxWidth: "1200px" }}>
      {/* Çalışan Profili */}
      <Row className="align-items-center mb-5"  >
        <Col md={6} className="text-center ">
          <img
            src={employee.image}
            alt={employee.name}
            className="img-fluid shadow-none px-5"
          />
        </Col>
        <Col md={6}  className=" px-2 ">
        <p style={{ fontSize: "11px",  }} className="fw-bolder text-uppercase text-center">artist</p>
          <h3 className=" text-uppercase text-center">{employee.name}</h3>
          <p style={{ fontSize: "12px",  }} className="text-dark p-4 mb-5">{employee.description}</p>
        </Col>
      </Row>

      {/* Ürünler */}
      <h3 className="text-dark text-center mt-5 py-5">Selected Works</h3>
      <Row className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-2">
        {products.map((product) => (
          <Col key={product._id} className="d-flex justify-content-center">
            
            <div className="card border-0 shadow-none mb-4 text-center" style={{ width: "18rem" }}>
            <Link to={`/product/${product._id}`} className="text-decoration-none text-dark"> 
              {product.image && (
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "cover", borderRadius:"0" }}
                />
              )}
              </Link>
              <div className="card-body">
                <h6 className="fw-bold text-uppercase" style={{ fontSize: "13px" }}>{employee.name}</h6>
                <p className="text-muted text-uppercase" style={{ fontSize: "11px" }}>{product.name}</p>
                <p className="text-muted" style={{ fontSize: "11px" }}>
                  {product.price
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)
                    : "N/A"}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Employee;
