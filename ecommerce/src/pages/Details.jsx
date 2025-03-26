import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5 p-5">
      <div className="row g-5">
        {/* Sol Taraf - Ürün Resmi */}
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxWidth: "100%", borderRadius: "0px" }}
          />
        </div>

        {/* Sağ Taraf - Bilgiler */}
        <div className="col-md-6">
          <p className="text-uppercase text-muted mt-5" style={{fontSize:"16px", fontWeight:"bolder"}}>
            {product.employeeId?.name || "Unknown"}
          </p>
          <h4 className="fw-bold mt-2">{product.name}</h4>
          <p className="text-muted mt-3" style={{fontSize:"16px", fontWeight:"bolder"}}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(product.price)}
          </p>
          <p style={{fontSize:"10px", }}>Tax included. Shipping calculated at checkout</p>

          {/* Butonu tam ortalamak için flex container ekledim */}
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn"
              style={{
                width: "100%",  
                backgroundColor: "#B22222", 
                color: "white",
                borderRadius: 0,
                fontSize: "12px",
                fontWeight: "bolder",
                padding: "12px",
                textTransform: "uppercase",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Açıklama Kısmı */}
      <div className="mt-5">
        <h4>Description</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default Details;
