import React, { useState } from "react";
import { createSkill } from "../../api/skills";

const SkillCreate = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [framework, setFramework] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skill = await createSkill({ title, description, framework });
    onAdd(skill);
    setTitle("");
    setDescription("");
    setFramework("");
  };

  return (
    <div>
      <h3>Add New Skill</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Framework (React, Bootstrap...)"
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};

export default SkillCreate;
