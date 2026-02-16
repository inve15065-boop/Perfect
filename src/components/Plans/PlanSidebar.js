import React, { useEffect, useState } from "react";
import API from "../../api/skills/api";

const PlanSidebar = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get("/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to load plans");
    }
  };

  // FULL reminder system
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      plans.forEach((plan) => {
        const reminderTime = new Date(plan.reminderTime);

        if (
          now.getHours() === reminderTime.getHours() &&
          now.getMinutes() === reminderTime.getMinutes()
        ) {
          new Notification(`⏰ Time to study: ${plan.title}`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [plans]);

  return (
    <div className="sidebar">
      <h3>Your Learning Plan</h3>
      {plans.map((plan) => (
        <div key={plan._id} className="plan-card">
          <strong>{plan.title}</strong>
          <p>Status: {plan.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanSidebar;
