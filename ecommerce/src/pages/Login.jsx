import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""); // Boş string olarak başlat
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Response:", res.data); // Yanıtı kontrol et

      if (res.data.role) {
        // Kullanıcı bilgilerini kaydet
        localStorage.setItem(
          "user",
          JSON.stringify({ email, role: res.data.role })
        );

        if (res.data.role === "employee" && res.data.employeeId) {
          localStorage.setItem("employeeId", res.data.employeeId);
          console.log("Çalışan ID'si kaydedildi:", res.data.employeeId);
        }

        // Kullanıcıyı ilgili sayfaya yönlendir
        navigate(
          res.data.role === "admin"
            ? "/admin"
            : res.data.role === "employee"
            ? "/employee"
            : "/home"
        );
      } else {
        console.error("Rol bulunamadı:", res.data);
        alert("Giriş başarısız! Geçerli bir rol bulunamadı.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
