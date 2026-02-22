import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiGrid,
  FiCpu,
  FiCalendar,
  FiUsers,
  FiTool,
  FiClock,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiGrid },
  { path: "/dashboard/ai", label: "AI Tutor", icon: FiCpu },
  { path: "/dashboard/plans", label: "Plans", icon: FiCalendar },
  { path: "/dashboard/community", label: "Community", icon: FiUsers },
  { path: "/dashboard/tools", label: "Tools", icon: FiTool },
  { path: "/dashboard/history", label: "History", icon: FiClock },
  { path: "/dashboard/settings", label: "Settings", icon: FiSettings },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={sidebarStyle}>
      <div style={headerStyle}>
        <Link to="/dashboard" style={logoStyle}>
          <span style={logoIcon}>P</span>
          <span>PTeach</span>
        </Link>
        {user?.selectedSkill && (
          <div style={skillBadgeStyle}>
            {user.selectedSkill.icon} {user.selectedSkill.title?.slice(0, 20)}...
          </div>
        )}
      </div>

      <nav style={navStyle}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...navItemStyle,
                ...(isActive ? navItemActiveStyle : {}),
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={footerStyle}>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

const sidebarStyle = {
  width: 240,
  minHeight: "100vh",
  background: "var(--bg-elevated)",
  borderRight: "1px solid var(--border)",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0",
};

const headerStyle = {
  padding: "0 16px 20px",
  borderBottom: "1px solid var(--border)",
  marginBottom: 16,
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "var(--text-main)",
  textDecoration: "none",
};

const logoIcon = {
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, var(--primary), var(--accent))",
  borderRadius: 8,
  fontSize: "1rem",
};

const skillBadgeStyle = {
  marginTop: 8,
  fontSize: 11,
  color: "var(--text-muted)",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const navStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 16px",
  color: "var(--text-muted)",
  textDecoration: "none",
  borderRadius: "var(--radius)",
  transition: "all 0.15s",
};

const navItemActiveStyle = {
  background: "rgba(99, 102, 241, 0.15)",
  color: "var(--primary)",
};

const footerStyle = {
  padding: "16px 16px 0",
  borderTop: "1px solid var(--border)",
};

const logoutBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  padding: "10px 16px",
  background: "transparent",
  border: "none",
  color: "var(--text-muted)",
  cursor: "pointer",
  borderRadius: "var(--radius)",
  fontSize: 14,
};

export default Sidebar;
