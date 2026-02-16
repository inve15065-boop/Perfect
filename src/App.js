import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";import NavBar from "./components/Layout/Navbar";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("pteachToken");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
