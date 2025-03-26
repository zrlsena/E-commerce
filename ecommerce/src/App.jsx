import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminPage from './pages/Admin';
import Products from './pages/Products';
import Artists from './pages/Artists';
import NavBar from './components/Navbar';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeePage from './pages/Employee';
import PrivateRoute from './PrivateRoute';
import './a.css';
import Details from './pages/Details';



function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <div style={{paddingInline:'180px',marginTop:"90px",}}>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/artists' element={<Artists />} />
        <Route path="/product/:id" element={<Details />} />
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
    </BrowserRouter>

  );
}

export default App;
