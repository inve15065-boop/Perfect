import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import ChatBox from "../AI/ChatBox";
import SkillList from "../Skills/SkillList";
import PlanList from "../Plans/PlanList";
import CommunityRoom from "../Community/CommunityRoom";
import { FiCpu, FiTarget, FiUsers, FiGlobe } from "react-icons/fi";

const Dashboard = () => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: FiTarget },
    { id: "ai", label: "AI Tutor", icon: FiCpu },
    { id: "community", label: "Community", icon: FiUsers },
  ];

  return (
    <div className="app-shell">
      <div className="main-content">
        <header style={headerStyle}>
          <div>
            <h1 style={titleStyle}>{t("welcome")}</h1>
            <p style={subtitleStyle}>Manage your skills, plans, and learn with AI</p>
          </div>
          <div style={headerRightStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FiGlobe size={18} style={{ color: "var(--text-muted)" }} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={selectStyle}
              >
                <option value="en">English</option>
                <option value="am">Amharic</option>
                <option value="ti">Tigrinya</option>
              </select>
            </div>
          </div>
        </header>

        <div style={tabBarStyle}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn"
              style={{
                ...tabBtnStyle,
                ...(activeTab === tab.id ? tabBtnActiveStyle : {}),
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            <div className="section-card">
              <div className="section-header">
                <div className="section-icon">
                  <FiTarget size={20} />
                </div>
                <h2>Your Skills</h2>
              </div>
              <SkillList />
            </div>

            <div className="section-card">
              <div className="section-header">
                <div className="section-icon">
                  <FiTarget size={20} />
                </div>
                <h2>Your Learning Plans</h2>
              </div>
              <PlanList />
            </div>
          </>
        )}

        {activeTab === "ai" && (
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon">
                <FiCpu size={20} />
              </div>
              <h2>AI Tutor</h2>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>Ask anything about React, Node, MongoDB</span>
            </div>
            <ChatBox />
          </div>
        )}

        {activeTab === "community" && (
          <div className="section-card">
            <div className="section-header">
              <div className="section-icon">
                <FiUsers size={20} />
              </div>
              <h2>{t("community")}</h2>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>Skill: web</span>
            </div>
            <CommunityRoom skill="web" />
          </div>
        )}
      </div>
    </div>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
  flexWrap: "wrap",
  gap: 16,
};

const titleStyle = {
  margin: 0,
  fontSize: "1.75rem",
  fontWeight: 700,
};

const subtitleStyle = {
  margin: "4px 0 0",
  color: "var(--text-muted)",
  fontSize: 14,
};

const headerRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const selectStyle = {
  padding: "8px 12px",
  borderRadius: "var(--radius)",
  border: "1px solid var(--border)",
  background: "var(--bg-elevated)",
  color: "var(--text-main)",
  cursor: "pointer",
};

const tabBarStyle = {
  display: "flex",
  gap: 8,
  marginBottom: 24,
};

const tabBtnStyle = {
  padding: "10px 18px",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  color: "var(--text-muted)",
};

const tabBtnActiveStyle = {
  background: "var(--primary)",
  borderColor: "var(--primary)",
  color: "white",
};

export default Dashboard;
