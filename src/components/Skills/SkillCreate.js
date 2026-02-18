import React, { useState } from "react";
import { createSkill } from "../../api/skills";
import { FiPlus } from "react-icons/fi";

const SkillCreate = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [framework, setFramework] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skill = await createSkill({ title, description, framework });
      onAdd(skill);
      setTitle("");
      setDescription("");
      setFramework("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
      <button type="submit" className="btn btn-primary">
        <FiPlus size={18} /> Add Skill
      </button>
    </form>
  );
};

export default SkillCreate;
