import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/register" style={{ marginRight: "10px" }}>
        Register
      </Link>
      <Link to="/login" style={{ marginRight: "10px" }}>
        Login
      </Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default NavBar;
