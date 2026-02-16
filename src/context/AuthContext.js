import React, { createContext, useState, useEffect } from "react";
import API from "../api/skills/api";

// 1️⃣ Create the context
export const AuthContext = createContext();

// 2️⃣ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("pteachToken") || "");

  // Load user info on startup if token exists
  useEffect(() => {
    if (token) {
      API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data.user))
        .catch((err) => {
          console.error(err);
          logout();
        });
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("pteachToken", res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // Register function
  const register = async (name, email, password, role = "student") => {
    try {
      const res = await API.post("/auth/register", { name, email, password, role });
      setToken(res.data.token);
      localStorage.setItem("pteachToken", res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("pteachToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
