import API from "./api.js";

export const getPlans = async () => {
  const res = await API.get("/plans");
  return res.data;
};

export const getPlanById = async (id) => {
  const res = await API.get(`/plans/${id}`);
  return res.data;
};

export const createPlan = async (planData) => {
  const res = await API.post("/plans", planData);
  return res.data;
};

export const updatePlan = async (id, planData) => {
  const res = await API.put(`/plans/${id}`, planData);
  return res.data;
};

export const deletePlan = async (id) => {
  const res = await API.delete(`/plans/${id}`);
  return res.data;
};

export const getPlanSteps = async (planId) => {
  const res = await API.get(`/plans/${planId}/steps`);
  return res.data;
};

export const addPlanStep = async (planId, stepData) => {
  const res = await API.post(`/plans/${planId}/steps`, stepData);
  return res.data;
};

export const togglePlanStepComplete = async (planId, stepId, completed, note) => {
  const res = await API.patch(`/plans/${planId}/steps/${stepId}/complete`, { completed, note });
  return res.data;
};
