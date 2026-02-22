import React from "react";
import { useAuth } from "../../context/AuthContext";
import CommunityRoom from "./CommunityRoom";

const CommunityPage = () => {
  const { user } = useAuth();
  const skill = user?.selectedSkill?.title || "general";

  return (
    <div className="section-card" style={{ margin: 24 }}>
      <div className="section-header">
        <h2>Community</h2>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Skill: {skill}</span>
      </div>
      <CommunityRoom skill={skill} />
    </div>
  );
};

export default CommunityPage;
