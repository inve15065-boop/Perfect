import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUserPlus, FiUser, FiMail, FiLock } from "react-icons/fi";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await register(form.name, form.email, form.password, form.role);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("Registration failed");
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
            <FiUserPlus size={28} color="white" />
          </div>
          <h1>Create account</h1>
          <p className="subtitle">Join PTeach to start your learning journey</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FiUser style={{ marginRight: 6, verticalAlign: "middle" }} /> Name</label>
            <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FiMail style={{ marginRight: 6, verticalAlign: "middle" }} /> Email</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FiLock style={{ marginRight: 6, verticalAlign: "middle" }} /> Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
            <FiUserPlus size={18} /> Create account
          </button>
        </form>

        <p style={{ marginTop: 24, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
