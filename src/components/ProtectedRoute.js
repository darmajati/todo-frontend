import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
