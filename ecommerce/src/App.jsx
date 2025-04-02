import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import Products from "./pages/Products";
import Artists from "./pages/Artists";
import NavBar from "./components/Navbar";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeePage from "./pages/Employee";
import PrivateRoute from "./PrivateRoute";
import "./a.css";
import Details from "./pages/Details";
import Employee from "./pages/EmployeePage";

function App() {
  return (
    <BrowserRouter>

      {/* Tüm sayfa için sağdan ve soldan boşluk */}
      <div >
      <NavBar />
        <div className="row justify-content-center">
          <div
           // className="col-xl-9 col-lg-11 col-md-12 col-sm-12 px-3 py-5 mt-5"
            
          >
            <Routes>
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/product/:id" element={<Details />} />
              <Route path="/:employeeName" element={<Employee />} />

              <Route
                path="/employee"
                element={
                  <PrivateRoute>
                    <EmployeePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employee-profile"
                element={
                  <PrivateRoute>
                    <EmployeeProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
