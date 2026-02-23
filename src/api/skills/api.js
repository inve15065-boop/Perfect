import axios from "axios";
import API_BASE_URL from "../config.js";

// Dynamic API prefix detection: supports deployments with or without "/api"
let apiPrefix = (typeof window !== "undefined" && localStorage.getItem("pteachApiPrefix")) || null; // "/api" | "" | null
let resolvingPrefix = null;

const detectPrefix = async () => {
  if (apiPrefix !== null) return apiPrefix;
  if (resolvingPrefix) {
    try {
      return await resolvingPrefix;
    } catch {
      // fall through
    }
  }
  resolvingPrefix = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`, { method: "GET", mode: "cors" });
      if (res.ok) {
        apiPrefix = "/api";
        localStorage.setItem("pteachApiPrefix", apiPrefix);
        return apiPrefix;
      }
    } catch {}
    try {
      const res2 = await fetch(`${API_BASE_URL}/health`, { method: "GET", mode: "cors" });
      if (res2.ok) {
        apiPrefix = "";
        localStorage.setItem("pteachApiPrefix", apiPrefix);
        return apiPrefix;
      }
    } catch {}
    apiPrefix = "/api";
    localStorage.setItem("pteachApiPrefix", apiPrefix);
    return apiPrefix;
  })();
  return resolvingPrefix;
};

const API = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 60000,
});

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function to retry failed requests
const retryRequest = async (error, retryCount = 0) => {
  const config = error.config;
  
  // Don't retry if already retried max times or if it's not a retryable error
  if (retryCount >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  // Only retry on network errors or 5xx server errors
  const shouldRetry = 
    error.code === "ERR_NETWORK" ||
    error.code === "ECONNABORTED" ||
    (error.response && error.response.status >= 500 && error.response.status < 600);

  if (!shouldRetry) {
    return Promise.reject(error);
  }

  // Wait before retrying (exponential backoff)
  const delay = RETRY_DELAY * Math.pow(2, retryCount);
  await new Promise((resolve) => setTimeout(resolve, delay));

  console.log(`[API Retry] Attempt ${retryCount + 1}/${MAX_RETRIES} for ${config.method?.toUpperCase()} ${config.url}`);

  // Retry the request
  return API(config);
};

// Request interceptor - logging and token attachment
API.interceptors.request.use(
  async (config) => {
    try {
      const prefix = await detectPrefix();
      if (!config.__prefixed) {
        if (typeof config.url === "string" && !config.url.startsWith(prefix)) {
          config.url = `${prefix}${config.url}`;
        }
        config.__prefixed = true;
      }
    } catch {
      // If detection fails, default to "/api"
      if (!config.__prefixed) {
        config.url = `/api${config.url}`;
        config.__prefixed = true;
      }
    }
    const token = localStorage.getItem("pteachToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor - error handling, logging, and retry logic
API.interceptors.response.use(
  (res) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Response] ${res.config.method?.toUpperCase()} ${res.config.url}`, {
        status: res.status,
        data: res.data,
      });
    }
    return res;
  },
  async (err) => {
    // Enhanced error logging
    const errorDetails = {
      message: err.message,
      url: err.config?.url,
      method: err.config?.method,
      baseURL: err.config?.baseURL,
      fullURL: err.config ? `${err.config.baseURL}${err.config.url}` : "unknown",
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      code: err.code,
    };

    // Log error details
    console.error("[API Error]", errorDetails);

    // Handle 401 Unauthorized (don't retry)
    if (err.response?.status === 401) {
      localStorage.removeItem("pteachToken");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      return Promise.reject(err);
    }

    // Handle 404 Not Found - attempt fallback without /api prefix once
    if (err.response?.status === 404) {
      try {
        if (!err.config.__triedNoApiBase) {
          err.config.__triedNoApiBase = true;
          // Remove "/api" prefix if present and retry once
          let cleanPath = err.config.url || "";
          cleanPath = cleanPath.replace(/^\/api(\/|$)/, "/");
          const fallbackUrl = `${API_BASE_URL}${cleanPath}`;
          console.warn(`[API 404] Retrying without /api prefix → ${fallbackUrl}`);
          const response = await axios({
            method: err.config.method,
            url: fallbackUrl,
            headers: err.config.headers,
            data: err.config.data,
            timeout: err.config.timeout,
          });
          return response;
        }
      } catch (retryNoApiErr) {
        console.error(
          `[API 404] Fallback without /api failed for ${errorDetails.url}:`,
          retryNoApiErr.response?.status || retryNoApiErr.message
        );
      }
      console.error(
        `[API 404] Endpoint not found: ${errorDetails.fullURL}\n` +
        `This usually means:\n` +
        `1. The backend server is not running\n` +
        `2. The route doesn't exist on the backend\n` +
        `3. The API base URL is incorrect\n` +
        `Current base URL: ${API_BASE_URL}`
      );
      return Promise.reject(err);
    }

    // Handle network errors with retry
    if (err.code === "ERR_NETWORK" || !err.response) {
      console.error(
        `[API Network Error] Cannot reach server at ${errorDetails.fullURL}\n` +
        `Check if:\n` +
        `1. Backend server is running\n` +
        `2. CORS is configured correctly\n` +
        `3. Network connection is active`
      );
      
      // Try to retry the request
      const retryCount = err.config.__retryCount || 0;
      err.config.__retryCount = retryCount;
      
      try {
        return await retryRequest(err, retryCount);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    // Handle 5xx server errors with retry
    if (err.response && err.response.status >= 500 && err.response.status < 600) {
      const retryCount = err.config.__retryCount || 0;
      err.config.__retryCount = retryCount;
      
      try {
        return await retryRequest(err, retryCount);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(err);
  }
);

export default API;
