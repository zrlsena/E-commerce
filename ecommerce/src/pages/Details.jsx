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
<div className="mt-5 p-5 container" style={{ maxWidth: "1200px" }}>
      <div className="row g-4 align-items-center ">
        {/* Sol Taraf - Ürün Resmi */}
        <div className="col-sm-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{
              maxWidth: "100%",
              minheight: "300px",
              maxHeight: "500px",
              borderRadius: "0",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Sağ Taraf - Bilgiler */}
        <div className="col-sm-6 p-5">
          <p className="text-uppercase text-muted mb-1" >
            {product.employeeId?.name || "Unknown"}
          </p>
          <h4 className="fw-bold">{product.name}</h4>
          <p className="text-muted mt-3">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(product.price)}
          </p>
          <p className="text-muted" style={{fontSize:"10px"}}>Tax included. Shipping calculated at checkout.</p>

          {/* Add to Cart Butonu */}
          <button
            className="btn w-100 p-2 mt-3 "
            style={{
              backgroundColor: "#B22222",
              color: "white",
              borderRadius: 0,
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize:"10px",
              letterSpacing:"1.5px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Açıklama Bölümü */}
      <div className="mt-5 px-4">
        <p className="fw-bold mt-5 pt-5" style={{fontSize:"12px",letterSpacing:"1.5px",}}>Description</p>
        <p  style={{ fontSize: "11px",letterSpacing:"1.5px", }}>{product.description}</p>
      </div>
    </div>
  );
};

export default Details;
