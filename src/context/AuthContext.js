import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/skills/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("pteachToken") || "");
  const [authLoading, setAuthLoading] = useState(!!localStorage.getItem("pteachToken"));

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("pteachToken");
  };

  useEffect(() => {
    if (token) {
      setAuthLoading(true);
      API.get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setToken("");
      localStorage.removeItem("pteachToken");
    };
    const handleSkillSelected = () => {
      if (token) API.get("/auth/me").then((res) => setUser(res.data.user)).catch(() => {});
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    window.addEventListener("auth:skill-selected", handleSkillSelected);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
      window.removeEventListener("auth:skill-selected", handleSkillSelected);
    };
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("pteachToken", res.data.token);
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      if (err.code === "ERR_NETWORK" || !err.response) {
        return { success: false, message: "Cannot reach server. Is the backend running?" };
      }
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password, role = "student") => {
    try {
      const res = await API.post("/auth/register", { name, email, password, role });
      setToken(res.data.token);
      localStorage.setItem("pteachToken", res.data.token);
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed";
      if (err.code === "ERR_NETWORK" || !err.response) {
        return { success: false, message: "Cannot reach server. Is the backend running?" };
      }
      return { success: false, message: msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
