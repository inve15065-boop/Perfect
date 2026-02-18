import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiGrid, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <Link to="/" style={logoStyle}>
        <span style={logoIcon}>P</span>
        <span>PTeach</span>
      </Link>
      <div style={navLinksStyle}>
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-secondary" style={linkBtn}>
              <FiGrid size={18} /> Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary" style={linkBtn}>
              <FiLogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary" style={linkBtn}>
              <FiLogIn size={18} /> Login
            </Link>
            <Link to="/register" className="btn btn-primary" style={linkBtn}>
              <FiUserPlus size={18} /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navbarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  background: "rgba(21, 24, 39, 0.9)",
  borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
  backdropFilter: "blur(12px)",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "var(--text-main)",
  textDecoration: "none",
};

const logoIcon = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, var(--primary), var(--accent))",
  borderRadius: 10,
  fontSize: "1.1rem",
};

const navLinksStyle = {
  display: "flex",
  gap: "12px",
};

const linkBtn = {
  textDecoration: "none",
  color: "inherit",
};

export default Navbar;
