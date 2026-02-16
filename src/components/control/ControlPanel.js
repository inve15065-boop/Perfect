import React, { useEffect, useState } from "react";
import API from "../../api/skills/api";

const ControlPanel = () => {
  const [data, setData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchControl = async () => {
      const token = localStorage.getItem("pteachToken");
      const res = await API.get("/control", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data.allowedResources);
    };
    fetchControl();
  }, []);

  const nextStep = () => {
    if (currentStep + 1 < data[0].steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const step = data[0]?.steps[currentStep];

  return (
    <div style={{ border: "2px solid #333", padding: "10px", marginTop: "20px" }}>
      <h3>Learning Step</h3>
      <p><strong>Skill:</strong> {data[0]?.skill}</p>
      <p><strong>Step:</strong> {step}</p>
      <button onClick={nextStep} disabled={currentStep >= data[0]?.steps.length - 1}>
        Complete Step
      </button>
    </div>
  );
};

export default ControlPanel;
