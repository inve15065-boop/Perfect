import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanReminders = () => {
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem("pteachToken");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(res.data.plans);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    }
  };

  return (
    <div className="plan-reminders">
      <h3>Your Learning Plan</h3>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Task</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.skill}</td>
              <td>{plan.task}</td>
              <td>{new Date(plan.deadline).toLocaleDateString()}</td>
              <td>{plan.completed ? "✅ Done" : "⏳ Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanReminders;
