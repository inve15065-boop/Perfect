import API from "./api.js";

export const getSkills = async () => {
  const res = await API.get("/skills");
  return res.data;
};

export const createSkill = async (skillData) => {
  const res = await API.post("/skills", skillData);
  return res.data;
};
