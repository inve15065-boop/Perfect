import React, { useState } from "react";
import { generateProjectAPI } from "../../api/project";

const CodePreview = ({ skill }) => {
  const [topic, setTopic] = useState("");
  const [code, setCode] = useState("");

  const handleGenerate = async () => {
    if (!topic) return;
    const generatedCode = await generateProjectAPI(skill, topic);
    setCode(generatedCode);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Generate Project for {skill}</h3>
      <input
        placeholder="Project Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate</button>

      {code && (
        <pre style={{ background: "#f0f0f0", padding: "10px", marginTop: "10px" }}>
          {code}
        </pre>
      )}
    </div>
  );
};

export default CodePreview;
