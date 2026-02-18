/**
 * Central API configuration for production (Vercel + Render).
 * Uses REACT_APP_API_URL for backend base URL.
 */
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://pteach-backend.onrender.com";

export const getApiBaseUrl = () => API_BASE_URL;
export default API_BASE_URL;

