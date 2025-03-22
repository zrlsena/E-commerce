import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Admin mi kontrol et
  return isAdmin ? element : <Navigate to="/login" />; // Eğer admin değilse login'e yönlendir
};

export default PrivateRoute;
