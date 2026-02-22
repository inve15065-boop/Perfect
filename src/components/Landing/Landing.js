import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogIn, FiUserPlus, FiCpu, FiTarget, FiUsers } from "react-icons/fi";

const Landing = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div style={{ padding: 48, textAlign: "center" }}>Loading...</div>;
  if (user?.selectedSkill) return <Navigate to="/dashboard" replace />;
  if (user && !user.selectedSkill) return <Navigate to="/skill-selection" replace />;

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={titleStyle}>PTeach</h1>
        <p style={taglineStyle}>AI-Powered Skill Development Platform</p>
        <p style={descStyle}>
          Learn from beginner to advanced with personalized AI tutoring, structured plans, and a supportive community.
        </p>

        <div style={featuresStyle}>
          <div style={featureStyle}>
            <FiCpu size={24} style={{ color: "var(--primary)" }} />
            <span>Adaptive AI Tutor</span>
          </div>
          <div style={featureStyle}>
            <FiTarget size={24} style={{ color: "var(--primary)" }} />
            <span>Structured Learning Plans</span>
          </div>
          <div style={featureStyle}>
            <FiUsers size={24} style={{ color: "var(--primary)" }} />
            <span>Skill-Based Community</span>
          </div>
        </div>

        <div style={ctaStyle}>
          <Link to="/login" className="btn btn-secondary" style={btnStyle}>
            <FiLogIn size={18} /> Login
          </Link>
          <Link to="/register" className="btn btn-primary" style={btnStyle}>
            <FiUserPlus size={18} /> Register
          </Link>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "calc(100vh - 80px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const heroStyle = {
  maxWidth: 520,
  textAlign: "center",
};

const titleStyle = {
  fontSize: "3rem",
  fontWeight: 800,
  margin: "0 0 8px",
  background: "linear-gradient(135deg, var(--primary), var(--accent))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const taglineStyle = {
  fontSize: "1.25rem",
  color: "var(--text-muted)",
  margin: "0 0 16px",
};

const descStyle = {
  color: "var(--text-muted)",
  lineHeight: 1.6,
  marginBottom: 32,
};

const featuresStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 20,
  marginBottom: 32,
};

const featureStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const ctaStyle = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  flexWrap: "wrap",
};

const btnStyle = { textDecoration: "none", color: "inherit" };

export default Landing;
