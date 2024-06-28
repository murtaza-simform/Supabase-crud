/* eslint-disable react/prop-types */
// PrivateRoute.js

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PrivateRoute = async ({ children }) => {
  const { user } = useAuth();

  console.log(user)

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
