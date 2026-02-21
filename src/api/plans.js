import API from "./api.js";

export const getPlans = async () => {
  const res = await API.get("/plans");
  return res.data;
};

export const createPlan = async (planData) => {
  const res = await API.post("/plans", planData);
  return res.data;
};
