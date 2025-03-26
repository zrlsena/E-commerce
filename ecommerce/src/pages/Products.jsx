import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 ">
      <h1 className="text-center mb-5" style={{ fontSize: "2.3rem" }}>All artworks</h1>
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-1">
        {products.map((product) => (
          <div key={product._id} className="col d-flex justify-content-center">
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="p-1 mb-4 text-center" style={{ width: "100%" }}>
                {product.image && (
                  <img
                    src={product.image}
                    className="img-fluid"
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "0px",
                    }}
                  />
                )}
                <div className="mt-2 p-2">
                  <h5 style={{ fontWeight: "bolder", textTransform: "uppercase", fontSize: "13px", margin: "0" }}>
                    <small>{product.employeeId?.name || "Unknown"}</small>
                  </h5>
                  <p style={{ textTransform: "uppercase", fontSize: "11px", margin: "0" }}>
                    {product.name}
                  </p>
                  <p className="text-muted" style={{ fontSize: "11px", margin: "0" }}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }).format(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
