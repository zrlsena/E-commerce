import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './a.css';

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
    <div style={{ padding: "20px", paddingLeft:"180px", paddingRight:"180px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px", marginTop:"40px", fontWeight:"bolder", }}>
        Artists
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // Three images per row
          gap: "30px",
          justifyItems: "center",
          marginTop:"0px",
        }}
      >
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="artist-card"
            style={{
              position: "relative", // To position the name over the image
              width: "100%",
              height: "0",
              paddingBottom: "100%",
              overflow: "hidden",
              borderRadius: "0px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.5s ease", // Smooth transition on hover
            }}
          >
            <Link to={`/${employee.name}`} style={{ textDecoration: "none" }}>
              <img
                src={employee.image}
                alt={employee.name}
                style={{
                  position: "absolute", // Make the image fill the parent div
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  filter: "brightness(0.7)",
                  objectFit: "cover", // Ensures the image covers the whole container
                  transition: "transform 0.5s ease", // Smooth transition for image growth
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)", // For better visibility on the image
                  
                }}
              >
                {employee.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
