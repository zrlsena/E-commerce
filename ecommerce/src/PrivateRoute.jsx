import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "employee") {
      // Eğer kullanıcı "employee" değilse login sayfasına yönlendir
      navigate("/login");
    }
  }, [navigate]);

  return children;  // Eğer kullanıcı "employee" ise, children (sayfa) render edilir
};

export default PrivateRoute;
