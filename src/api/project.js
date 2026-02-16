import API from "./skills/api";

const token = localStorage.getItem("pteachToken");
const headers = { Authorization: `Bearer ${token}` };

export const generateProjectAPI = async (skill, topic) => {
  const res = await API.post("/projects/generate", { skill, topic }, { headers });
  return res.data.code;
};
