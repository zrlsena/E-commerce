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
        const sortedProducts = res.data.sort((a, b) => {
          const nameA = a.employeeId?.name?.toLowerCase() || "";
          const nameB = b.employeeId?.name?.toLowerCase() || "";
          return nameA.localeCompare(nameB);
        });
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div className=" p-5 mt-5 container " style={{ maxWidth: "1200px" }}>
      <h1 className="text-center mb-5" >
        All Artworks
      </h1>

      {/* ✅ Responsive Grid */}
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-2">
        {products.map((product) => (
          <div key={product._id} className="col">
            <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
              <div className="card border-0 shadow-none mb-5">
                {product.image && (
                  <img
                    src={product.image}
                    className="w-100"
                    alt={product.name}
                    style={{
                      objectFit: "cover",
                      borderRadius: "0",
                      marginTop: "0",
                    }}
                  />
                )}
                <div className="card-body text-center p-2">
                  <p className="fw-bolder text-uppercase mb-1" style={{ fontSize: "9px" }}>
                    {product.employeeId?.name || "Unknown"}
                  </p>
                  <p className="fw-bolder text-uppercase mb-1 " style={{ fontSize: "11px" }}>
                    {product.name}
                  </p>
                  <p className=" mb-0" style={{ fontSize: "10px" }}>
                    {product.price
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        }).format(product.price)
                      : "N/A"}
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
