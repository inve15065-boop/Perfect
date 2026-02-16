import React from "react";

function Dashboard() {
  return (
    <div className="container fade-in">
      <div className="card">
        <h2>Your Learning Progress</h2>
        <p>Web Development</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "60%" }}></div>
        </div>
      </div>

      <div className="card">
        <h2>Today's Plan</h2>
        <p>Complete React Authentication Module</p>
      </div>
    </div>
  );
}

export default Dashboard;
