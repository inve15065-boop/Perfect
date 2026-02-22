import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Register from "./components/Auth/Register";
import Landing from "./components/Landing/Landing";
import Login from "./components/Auth/Login";
import SkillSelection from "./components/Skills/SkillSelection";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import AITutorPage from "./components/AI/AITutorPage";
import PlansPage from "./components/Plans/PlansPage";
import PlanDetail from "./components/Plans/PlanDetail";
import CommunityPage from "./components/Community/CommunityPage";
import ToolsPage from "./components/Tools/ToolsPage";
import HistoryPage from "./components/History/HistoryPage";
import SettingsPageWrapper from "./components/Settings/SettingsPageWrapper";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("pteachToken");
  return token ? children : <Navigate to="/login" replace />;
};

const RequireSkillRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  if (authLoading) return <div style={{ padding: 48, textAlign: "center" }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.selectedSkill) return <Navigate to="/skill-selection" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/skill-selection"
          element={
            <ProtectedRoute>
              <SkillSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RequireSkillRoute>
                <DashboardLayout />
              </RequireSkillRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="ai" element={<AITutorPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="plans/:id" element={<PlanDetail />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="settings" element={<SettingsPageWrapper />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
