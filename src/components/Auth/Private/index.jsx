/* eslint-disable react/prop-types */
// PrivateRoute.js

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  
  const sessionData = sessionStorage.getItem('token');
  let isUser = false;
  if(sessionData){
    isUser = true;
  }

  return isUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
