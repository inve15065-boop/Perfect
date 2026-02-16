import API from "./api";

const token = localStorage.getItem("pteachToken");

const headers = {
  Authorization: `Bearer ${token}`,
};

// Pass the skill along with the message
export const sendMessage = async (message, skill) => {
  const res = await API.post("/ai", { message, skill }, { headers });
  return res.data.response;
};
