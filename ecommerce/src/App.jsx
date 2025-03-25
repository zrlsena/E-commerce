import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminPage from './pages/Admin';
import EmployeeDashboard from './pages/Employee';
import Products from './pages/Products';
import Artists from './pages/Artists';
import NavBar from './components/Navbar';
import EmployeeProfile from './pages/EmployeeProfile';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/employee' element={<EmployeeDashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/artists' element={<Artists />} />
        <Route path='/employee-profile' element={<EmployeeProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
