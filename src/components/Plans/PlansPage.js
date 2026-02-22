import React from "react";
import PlanList from "./PlanList";

const PlansPage = () => {
  return (
    <div style={{ padding: 24 }}>
      <div className="section-card">
        <div className="section-header">
          <h2>Learning Plans</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Create and manage your structured learning calendar
          </p>
        </div>
        <PlanList />
      </div>
    </div>
  );
};

export default PlansPage;
