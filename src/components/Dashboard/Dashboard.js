import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import SkillList from "../Skills/SkillList";
import PlanList from "../Plans/PlanList";
import { FiCpu, FiTarget, FiCalendar, FiGlobe, FiTool } from "react-icons/fi";

const Dashboard = () => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const { user } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{t("welcome")}</h1>
          <p style={subtitleStyle}>
            {user?.selectedSkill ? (
              <>Learning: {user.selectedSkill.icon} {user.selectedSkill.title}</>
            ) : (
              "Manage your skills, plans, and learn with AI"
            )}
          </p>
        </div>
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
      </header>

      <div style={quickLinksStyle}>
        <Link to="/dashboard/ai" style={quickLinkStyle}>
          <FiCpu size={24} />
          <span>AI Tutor</span>
        </Link>
        <Link to="/dashboard/plans" style={quickLinkStyle}>
          <FiCalendar size={24} />
          <span>Plans</span>
        </Link>
        <Link to="/dashboard/community" style={quickLinkStyle}>
          <FiTarget size={24} />
          <span>{t("community")}</span>
        </Link>
        <Link to="/dashboard/tools" style={quickLinkStyle}>
          <FiTool size={24} />
          <span>Tools</span>
        </Link>
      </div>

      <div className="section-card" style={{ marginTop: 24 }}>
        <div className="section-header">
          <div className="section-icon"><FiTarget size={20} /></div>
          <h2>Your Skills</h2>
        </div>
        <SkillList />
      </div>

      <div className="section-card" style={{ marginTop: 24 }}>
        <div className="section-header">
          <div className="section-icon"><FiCalendar size={20} /></div>
          <h2>Your Learning Plans</h2>
        </div>
        <PlanList />
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

const titleStyle = { margin: 0, fontSize: "1.75rem", fontWeight: 700 };
const subtitleStyle = { margin: "4px 0 0", color: "var(--text-muted)", fontSize: 14 };
const selectStyle = {
  padding: "8px 12px",
  borderRadius: "var(--radius)",
  border: "1px solid var(--border)",
  background: "var(--bg-elevated)",
  color: "var(--text-main)",
  cursor: "pointer",
};

const quickLinksStyle = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
};

const quickLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "16px 20px",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  color: "var(--text-main)",
  textDecoration: "none",
};

export default Dashboard;
