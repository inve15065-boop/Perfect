import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getPlans = async () => {
  const token = localStorage.getItem("pteachToken");
  const res = await axios.get(`${API_URL}/api/plans`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createPlan = async (planData) => {
  const token = localStorage.getItem("pteachToken");
  const res = await axios.post(`${API_URL}/api/plans`, planData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
