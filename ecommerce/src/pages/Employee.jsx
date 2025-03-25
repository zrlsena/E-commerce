import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


const EmployeePage = () => {
  const [products, setProducts] = useState([]);
  const [employee, setEmployee] = useState(null); // State to hold employee data
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeId = localStorage.getItem("employeeId");
      try {
        const res = await axios.get(`http://localhost:5000/employee/${employeeId}`);
        setEmployee(res.data); // Store employee data in state
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchEmployeeData();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const employeeId = localStorage.getItem("employeeId");

    try {
      await axios.post("http://localhost:5000/employee/add-product", {
        ...form,
        employeeId,
      });
      fetchProducts();
      setForm({ name: "", description: "", price: "", stock: "", image: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setForm(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employee/update-product/${editingProduct._id}`, form);
      fetchProducts();
      setEditingProduct(null);
      setForm({ name: "", description: "", price: "", stock: "", image: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employee/delete-product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Link
                to="/employee-profile"
                className="btn btn-default border w-100 bg-light rounded-0 tex-decoration-none"
              >
                profile
              </Link>
      {/* Employee Name Display */}
      <div className="mb-4">
        <h3>Welcome </h3>
      </div>

      <h2 className="text-center mb-4">Manage Products</h2>

      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">{editingProduct ? "Edit Product" : "Add New Product"}</h4>
        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
          <div className="mb-3">
            <input type="text" className="form-control" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" name="price" placeholder="Price ($)" value={form.price} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" name="stock" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <h3 className="text-center mt-5">Product List</h3>
      <div className="row mt-3">
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <div className="card shadow-sm p-3 mb-4">
              {product.image && (
                <img src={product.image} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted"><small>Added by: {product.employeeId?.name || "Unknown"}</small></p>

                <p className="card-text text-muted">{product.description}</p>
                <p><strong>${product.price}</strong> | Stock: {product.stock}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePage;
