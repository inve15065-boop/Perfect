import React, { useState } from "react";

const SkillProjectPreview = ({ code }) => {
  const [iframeKey, setIframeKey] = useState(0);

  const refreshPreview = () => setIframeKey((prev) => prev + 1);

  return (
    <div className="project-preview-container">
      <div className="project-actions">
        <button onClick={refreshPreview}>Run / Refresh</button>
      </div>
      <iframe
        key={iframeKey}
        title="Project Preview"
        srcDoc={code}
        sandbox="allow-scripts"
        style={{ width: "100%", height: "400px", borderRadius: "10px" }}
      />
    </div>
  );
};

export default SkillProjectPreview;
