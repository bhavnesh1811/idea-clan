import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashBoard from "../pages/DashBoard";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
