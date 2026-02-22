import React, { useEffect, useState } from "react";
import { getSkills, deleteSkill } from "../../api/skills";
import SkillCreate from "./SkillCreate";
import { FiCode, FiPlus, FiTrash2 } from "react-icons/fi";

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      setSkills([]);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = (skill) => {
    setSkills((prev) => [...prev, skill]);
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill? Plans linked to it may be affected.")) return;
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete skill.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
          {skills.length} skill{skills.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          <FiPlus size={16} /> {showAdd ? "Cancel" : "Add Skill"}
        </button>
      </div>

      {showAdd && (
        <div style={{ marginBottom: 20, padding: 16, background: "var(--bg-elevated)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <SkillCreate onAdd={handleAdd} />
        </div>
      )}

      {skills.length === 0 && !showAdd ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 24 }}>
          No skills yet. Click "Add Skill" to get started.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {skills.map((skill) => (
            <div key={skill._id} className="list-item">
              <div style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(249, 115, 22, 0.2))",
                borderRadius: 10,
              }}>
                <FiCode size={18} color="var(--primary)" />
              </div>
              <div style={{ flex: 1 }}>
                <strong>{skill.title}</strong>
                {skill.framework && <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>— {skill.framework}</span>}
              </div>
              <button
                onClick={() => handleDelete(skill._id)}
                className="btn"
                style={{ padding: 6, color: "var(--danger, #ef4444)" }}
                title="Delete skill"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillList;
