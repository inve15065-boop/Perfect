import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/skills/api";

const ToolList = () => {
  const { user } = useAuth();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillId = user?.selectedSkill?._id;
    if (!skillId) {
      setLoading(false);
      return;
    }
    API.get(`/tools/skill/${skillId}`)
      .then((res) => setTools(res.data))
      .catch(() => setTools([]))
      .finally(() => setLoading(false));
  }, [user?.selectedSkill?._id]);

  if (loading) return <div className="section-card"><p>Loading tools...</p></div>;
  if (!user?.selectedSkill) return <div className="section-card"><p>Select a skill first.</p></div>;

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Required Tools for {user.selectedSkill.title}</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
          Install these tools before starting your learning journey
        </p>
      </div>
      {tools.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>
          No specific tools required for this skill. You're good to go!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tools.map((tool) => (
            <div
              key={tool._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                background: "var(--bg)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <strong>{tool.name}</strong>
                {tool.description && (
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--text-muted)" }}>
                    {tool.description}
                  </p>
                )}
              </div>
              {tool.downloadUrl && (
                <a
                  href={tool.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolList;
