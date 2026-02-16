import React, { useEffect, useState } from "react";
import { getPlans } from "../../api/plans";

const PlanList = ({ refresh }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      setPlans(data);
    };
    fetchPlans();
  }, [refresh]);

  return (
    <div>
      <h2>Your Learning Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            <strong>{plan.title}</strong> - Skill: {plan.skill?.title || "N/A"} <br />
            {plan.description} <br />
            {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : ""} 
            {" - "} 
            {plan.endDate ? new Date(plan.endDate).toLocaleDateString() : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;
