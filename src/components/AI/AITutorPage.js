import React from "react";
import { useAuth } from "../../context/AuthContext";
import ChatBox from "./ChatBox";

const AITutorPage = () => {
  const { user } = useAuth();

  return (
    <div className="section-card" style={{ margin: 24 }}>
      <div className="section-header">
        <h2>AI Tutor</h2>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Ask about {user?.selectedSkill?.title || "your skill"} from beginner to advanced
        </span>
      </div>
      <ChatBox />
    </div>
  );
};

export default AITutorPage;
