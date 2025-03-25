import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", description: "", image: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeId = localStorage.getItem("employeeId");
      try {
        const res = await axios.get(`http://localhost:5000/employee/${employeeId}`);
        setEmployee(res.data);
        setForm(res.data); // Formu mevcut çalışan bilgileriyle doldur
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    const employeeId = localStorage.getItem("employeeId");
    try {
      await axios.put(`http://localhost:5000/employee/update-profile/${employeeId}`, form);
      setEmployee(form);
      setEditing(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async () => {
    const employeeId = localStorage.getItem("employeeId");
    try {
      await axios.delete(`http://localhost:5000/employee/delete/${employeeId}`);
      localStorage.removeItem("employeeId");
      window.location.href = "/"; // Silindikten sonra anasayfaya yönlendir
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/employee" className="btn btn-light border w-100 mb-3">
        Back to Employee Dashboard
      </Link>

      <h2 className="text-center mb-4">Employee Profile</h2>

      {employee ? (
        <div >
          {editing ? (
            <form onSubmit={handleUpdateEmployee}>
              <div className="mb-3">
                <input type="text" className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-dark w-100">Update Profile</button>
            </form>
          ) : (
            <div className="text-center">
              <div className="absolute left-0 top-0 w-2/5 h-full bg-red-600"></div>
              {employee.image && (
                <img src={employee.image} alt="Profile" className="rounded-circle mb-3" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
              )}
              <h4>{employee.name}</h4>
              <p>Email: {employee.email}</p>
              {employee.phone && <p>Phone: {employee.phone}</p>}
              {employee.description && <p>Description: {employee.description}</p>}
              
              <button className="btn btn-outline-primary me-2" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn btn-outline-danger" onClick={handleDeleteEmployee}>Delete Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading employee data...</p>
      )}
    </div>
  );
};

export default EmployeeProfile;