import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/skills/api";

const SkillSelection = () => {
  const { user, logout } = useAuth();
  const [skills, setSkills] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/api/skills/predefined")
      .then((res) => setSkills(res.data))
      .catch(() => setError("Failed to load skills"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      setError("Please select one skill");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await API.post("/auth/select-skill", { skillId: selectedId });
      window.dispatchEvent(new CustomEvent("auth:skill-selected"));
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save skill");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <p>Loading skills...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Choose Your Primary Skill</h1>
        <p style={subtitleStyle}>
          Select one skill to focus on. The AI will teach you from beginner to advanced. You can change this later in Settings.
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={gridStyle}>
            {skills.map((skill) => (
              <button
                key={skill._id}
                type="button"
                onClick={() => setSelectedId(skill._id)}
                style={{
                  ...skillCardStyle,
                  ...(selectedId === skill._id ? skillCardActiveStyle : {}),
                }}
              >
                <span style={iconStyle}>{skill.icon || "🔹"}</span>
                <div style={skillTextStyle}>
                  <strong>{skill.title}</strong>
                  <span style={metaStyle}>{skill.level} • {skill.duration}</span>
                </div>
              </button>
            ))}
          </div>

          <div style={actionsStyle}>
            <button type="submit" disabled={!selectedId || submitting} className="btn btn-primary">
              {submitting ? "Saving..." : "Continue to Dashboard"}
            </button>
            <button type="button" onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "calc(100vh - 80px)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: 24,
};

const cardStyle = {
  maxWidth: 900,
  width: "100%",
  background: "var(--bg-elevated)",
  borderRadius: "var(--radius-lg)",
  padding: 32,
  boxShadow: "var(--shadow-md)",
};

const titleStyle = { margin: "0 0 8px", fontSize: "1.5rem" };
const subtitleStyle = { color: "var(--text-muted)", margin: "0 0 24px", fontSize: 14 };

const errorStyle = {
  padding: 12,
  background: "rgba(239, 68, 68, 0.15)",
  color: "var(--danger)",
  borderRadius: "var(--radius)",
  marginBottom: 16,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 12,
  marginBottom: 24,
  maxHeight: 400,
  overflowY: "auto",
};

const skillCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 14,
  background: "var(--bg)",
  border: "2px solid var(--border)",
  borderRadius: "var(--radius)",
  cursor: "pointer",
  textAlign: "left",
};

const skillCardActiveStyle = {
  borderColor: "var(--primary)",
  background: "rgba(99, 102, 241, 0.1)",
};

const iconStyle = { fontSize: 24 };
const skillTextStyle = { display: "flex", flexDirection: "column", gap: 4 };
const metaStyle = { fontSize: 12, color: "var(--text-muted)" };

const actionsStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
};

export default SkillSelection;
