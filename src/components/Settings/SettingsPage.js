import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/skills/api";

const SettingsPage = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/skills/predefined").then((res) => setSkills(res.data));
    if (user?.selectedSkill?._id) setSelectedId(user.selectedSkill._id);
  }, [user?.selectedSkill?._id]);

  const handleChangeSkill = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    setLoading(true);
    setMessage("");
    try {
      await API.post("/auth/select-skill", { skillId: selectedId });
      setMessage("Skill updated successfully. Refreshing...");
      window.dispatchEvent(new CustomEvent("auth:skill-selected"));
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Settings</h2>
      </div>

      <form onSubmit={handleChangeSkill} style={{ maxWidth: 400 }}>
        <label style={{ display: "block", marginBottom: 8 }}>Change Primary Skill</label>
        <select
          value={selectedId || ""}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--bg)",
            marginBottom: 12,
          }}
        >
          {skills.map((s) => (
            <option key={s._id} value={s._id}>
              {s.icon} {s.title}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Skill"}
        </button>
        {message && <p style={{ marginTop: 8, color: "var(--primary)" }}>{message}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;
