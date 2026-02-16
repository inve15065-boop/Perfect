import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import ChatBox from "../AI/ChatBox";
import SkillList from "../Skills/SkillList";
import PlanList from "../Plans/PlanList";
import CommunityRoom from "../Community/CommunityRoom";

const Dashboard = () => {
  const { language, setLanguage, t } = useContext(LanguageContext);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{t("welcome")}</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="am">Amharic</option>
          <option value="ti">Tigrinya</option>
        </select>
      </div>

      <hr />

      <SkillList />
      <PlanList />

      <h3>AI Tutor</h3>
      <ChatBox />

      <h3>Community</h3>
      <CommunityRoom skill="web" />
    </div>
  );
};

export default Dashboard;
