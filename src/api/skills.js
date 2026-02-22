import API from "./api.js";

export const getSkills = async () => {
  const res = await API.get("/skills");
  return res.data;
};

export const getPredefinedSkills = async () => {
  const res = await API.get("/api/skills/predefined");
  return res.data;
};

export const getSkillById = async (id) => {
  const res = await API.get(`/skills/${id}`);
  return res.data;
};

export const createSkill = async (skillData) => {
  const res = await API.post("/skills", skillData);
  return res.data;
};

export const updateSkill = async (id, skillData) => {
  const res = await API.put(`/skills/${id}`, skillData);
  return res.data;
};

export const deleteSkill = async (id) => {
  const res = await API.delete(`/skills/${id}`);
  return res.data;
};
