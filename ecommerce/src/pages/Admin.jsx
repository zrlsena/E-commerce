import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminPage() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();

  const [slides, setSlides] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
const [buttonLink, setButtonLink] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
    } else {
      fetchEmployees();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const addEmployee = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/add-employee",
        {
          name,
          email,
          password,
        }
      );
      setEmployees([...employees, response.data]);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };
  useEffect(() => {
    fetchSlides();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete-employee/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
      setEmployeeToDelete(null);
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const fetchSlides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/slides");
      setSlides(response.data);
    } catch (err) {
      console.error("Error fetching slides:", err);
    }
  };

  const addSlide = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/add-slide",
        {
          imageUrl,
          title,
          description,
          buttonText,
          buttonLink,
        }
      );
      setSlides([...slides, response.data]);
      setImageUrl("");
      setTitle("");
      setDescription("");
      setButtonText("");
      setButtonLink("");
    } catch (err) {
      console.error("Error adding slide:", err);
    }
  };

  const deleteSlide = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete-slide/${id}`);
      setSlides(slides.filter((slide) => slide._id !== id));
    } catch (err) {
      console.error("Error deleting slide:", err);
    }
  };

  return (
    <div className="container py-5 mt-5 p-5"style={{ maxWidth: "1200px" }}>
      <h1 className="text-uppercase fw-bold border-bottom pb-2 mb-4">
        Admin Panel
      </h1>

      {/* Çalışan Ekleme Formu */}
      <div className="mb-4 p-4 border border-dark">
        <h2 className="h5 text-uppercase mb-3">Add Employee</h2>
        <input
          type="text"
          className="form-control mb-2 border border-dark"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-2 border border-dark"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3 border border-dark"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-dark w-100 text-uppercase"
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>

      {/* Çalışan Listesi */}
      <h2 className="h5 text-uppercase mb-3">Employee List</h2>
      <table className="table table-striped table-bordered border-dark text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.password}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setEmployeeToDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container">
        <h2>Manage Slides</h2>

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Button Text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Button Link"
          value={buttonLink}
          onChange={(e) => setButtonLink(e.target.value)}
        />
        <button onClick={addSlide}>Add Slide</button>

        <ul>
          {slides.map((slide) => (
            <li key={slide._id}>
              <img src={slide.imageUrl} alt={slide.title} width="100" />
              <p>{slide.title}</p>
              <p>{slide.description}</p>
              <button onClick={() => deleteSlide(slide._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Çıkış Yap Butonu */}
      <button
        className="btn btn-secondary w-100 mt-4 text-uppercase"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Modal (Silme Onayı) */}
      {employeeToDelete && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content border-dark">
              <div className="modal-header">
                <h5 className="modal-title text-uppercase">Confirm Deletion</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this employee?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEmployeeToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employeeToDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
