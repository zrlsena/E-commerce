import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './pages/Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
