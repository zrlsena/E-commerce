import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Admin yetkisini kaldır
    navigate("/login"); // Login sayfasına yönlendir
  };

  // Ürünleri listele
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/products")
      .then((response) => setProducts(response.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  // Ürün ekleme
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { name, description, price, image, category };
    axios
      .post("http://localhost:5000/admin/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("");
        window.location.reload();
      })
      .catch((err) => console.error("Failed to add product", err));
  };

  // Ürün silme
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/admin/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
        window.location.reload();
      })
      .catch((err) => console.error("Failed to delete product", err));
  };

   // Ürün güncelleme
   const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = { name, description, price, image, category };
    axios
      .put(`http://localhost:5000/admin/products/${editingProduct._id}`, updatedProduct)
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product._id === editingProduct._id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null); // Güncelleme işleminden sonra formu sıfırla
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("");
        window.location.reload();
      })
      .catch((err) => console.error("Failed to update product", err));
  };

  // Ürünü düzenleme
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
  };

  return (
    <div className="container mt-4">
    <h2 className="text-center mb-4">Admin Panel</h2>

    {/* Ürün Ekleme / Güncelleme Formu */}
    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>

    {/* Ürün Listeleme */}
    <h3>Product List</h3>
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product._id}>
          <div className="card">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              <p className="card-text"><strong>Category:</strong> {product.category}</p>
              <button
                onClick={() => handleEditProduct(product)}
                className="btn btn-warning me-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button onClick={handleLogout} className="btn btn-secondary w-100 mt-4">
      Logout
    </button>
  </div>
  );
}

export default Admin;
