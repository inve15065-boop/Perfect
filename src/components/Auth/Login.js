import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      if (result.success) {
        const hasSkill = result.user?.selectedSkill;
        navigate(hasSkill ? "/dashboard" : "/skill-selection");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 56,
            height: 56,
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, var(--primary), var(--accent))",
            borderRadius: 14,
          }}>
            <FiLogIn size={28} color="white" />
          </div>
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to continue to PTeach</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FiMail style={{ marginRight: 6, verticalAlign: "middle" }} /> Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label><FiLock style={{ marginRight: 6, verticalAlign: "middle" }} /> Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
            <FiLogIn size={18} /> Sign in
          </button>
        </form>

        <p style={{ marginTop: 24, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--primary)", fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
