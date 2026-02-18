import React, { useEffect, useState } from "react";
import { getPlans } from "../../api/plans";
import PlanCreate from "./PlanCreate";
import { FiCalendar, FiPlus } from "react-icons/fi";

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      const list = Array.isArray(data) ? data : (data?.plans || []);
      setPlans(list);
    } catch (err) {
      setPlans([]);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAdd = (plan) => {
    setPlans((prev) => [...prev, plan]);
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
          {plans.length} plan{plans.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          <FiPlus size={16} /> {showAdd ? "Cancel" : "Create Plan"}
        </button>
      </div>

      {showAdd && (
        <div style={{ marginBottom: 20, padding: 16, background: "var(--bg-elevated)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <PlanCreate onAdd={handleAdd} />
        </div>
      )}

      {plans.length === 0 && !showAdd ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 24 }}>
          No learning plans yet. Click "Create Plan" to add one.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {plans.map((plan) => (
            <div key={plan._id} className="list-item">
              <div style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(139, 92, 246, 0.2))",
                borderRadius: 10,
              }}>
                <FiCalendar size={18} color="var(--accent-mint)" />
              </div>
              <div style={{ flex: 1 }}>
                <strong>{plan.title}</strong>
                {plan.description && <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>{plan.description}</div>}
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>
                  Skill: {plan.skill?.title || "N/A"}
                  {(plan.startDate || plan.endDate) && (
                    <> • {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : "—"} — {plan.endDate ? new Date(plan.endDate).toLocaleDateString() : "—"}</>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanList;
