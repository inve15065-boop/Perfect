import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
