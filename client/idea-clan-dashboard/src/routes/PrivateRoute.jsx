import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token") || "";

  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={location.pathname} replace />;
  }
  return children;
};

export default PrivateRoute;
