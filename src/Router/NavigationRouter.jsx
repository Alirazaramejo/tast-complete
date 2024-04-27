import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/registration/Login";
import Signup from "../Pages/registration/Signup";
import { ProtectedRoute } from "./protectRoute/ProtectedRoute";


import SinglePage from "../Pages/SinglePage/SinglePage";
import AddProduct from "../Pages/Dashborad/AddProduct";

function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <SinglePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addProduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    
      </Routes>
    </Router>
  );
}

export default NavigationRouter;
