import axios from "axios";
import API_BASE_URL from "../config.js";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 60000,
});

// Attach JWT token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("pteachToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear token and notify auth context to logout
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("pteachToken");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(err);
  }
);

export default API;
