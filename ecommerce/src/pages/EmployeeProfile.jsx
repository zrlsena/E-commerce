import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  // Employee bilgilerini token'dan alarak yükleme
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const token = localStorage.getItem("token");
      const employeeId = localStorage.getItem("employeeId");

      if (token && employeeId) {
        try {
          const res = await axios.get(`http://localhost:5000/employee/${employeeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEmployee(res.data);
          setForm({
            name: res.data.name,
            email: res.data.email,
            password: "",
            role: res.data.role,
            phone: res.data.phone,
          });
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      } else {
        console.error("Token or Employee ID not found");
      }
    };

    fetchEmployeeData();
  }, []);

  // Formu güncelleme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Profil güncelleme
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.put(
          `http://localhost:5000/employee/${employee.id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployee(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  // Profil düzenleme moduna geçme
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Profil düzenleme modundan çıkma
  const handleCancelEdit = () => {
    setIsEditing(false);
    setForm({
      name: employee.name,
      email: employee.email,
      password: "",
      role: employee.role,
      phone: employee.phone,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Employee Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Role:</strong> {employee.role}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <button className="btn btn-warning" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
