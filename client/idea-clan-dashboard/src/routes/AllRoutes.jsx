import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashBoard from "../pages/DashBoard";
import PrivateRoute from "./PrivateRoute";
import Courses from "../components/Courses";
import Profile from "../pages/Profile";
import Lectures from "../pages/Lectures";

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
      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/lectures"
        element={
          <PrivateRoute>
            <Lectures />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
