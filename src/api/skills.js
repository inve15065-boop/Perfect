import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getSkills = async () => {
  const token = localStorage.getItem("pteachToken");
  const res = await axios.get(`${API_URL}/api/skills`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createSkill = async (skillData) => {
  const token = localStorage.getItem("pteachToken");
  const res = await axios.post(`${API_URL}/api/skills`, skillData, skillData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
