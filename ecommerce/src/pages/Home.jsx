import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Products";

function Home() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/slides");
      setSlides(response.data);
    } catch (err) {
      console.error("Error fetching slides:", err);
    }
  };

  return (
    <div>
      <section id="carousel-section">
        <Carousel controls={false} interval={4000} pause={false}>
          {slides.map((slide, index) => (
            <Carousel.Item key={index} className="position-relative">
              <img
                className="d-block w-100"
                src={slide.imageUrl}
                alt={slide.title}
                style={{
                  minHeight: "300px",
                  maxHeight: "600px",
                  objectFit: "cover",
                  filter: "brightness(0.6)", // **Resmi biraz kararttık ki yazı belli olsun**
                }}
              />

              {/* 📌 Yazılar ve Buton (Ortalanmış) */}
              <div
                className="position-absolute top-50 start-50 translate-middle text-center text-white"
                style={{ width: "80%", maxWidth: "600px" }}
              >
                <p style={{ fontSize: "10px", letterSpacing: "1.8px" }}>
                  {slide.description}
                </p>
                <h2 className="mt-2" style={{ fontSize: "46px" }}>
                  {slide.title}
                </h2>

                {/* 🎯 Buton sadece varsa gözüksün */}
                {slide.buttonText && slide.buttonLink && (
                  <a
                    href={slide.buttonLink}
                    className="btn btn-light mt-3 px-4 py-3 text-uppercase fw-bolder"
                    style={{
                      borderRadius: "0",
                      fontSize: "9px",
                      letterSpacing: "1.8px",
                    }}
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <Products/>
    </div>
  );
}

export default Home;
