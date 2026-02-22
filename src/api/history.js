import API from "./api.js";

export const getHistory = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const res = await API.get(`/history${qs ? `?${qs}` : ""}`);
  return res.data;
};
