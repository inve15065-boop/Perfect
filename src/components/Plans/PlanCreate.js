import React, { useState, useEffect } from "react";
import { createPlan } from "../../api/plans";
import { getSkills } from "../../api/skills";

const PlanCreate = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await getSkills();
      setSkills(data);
    };
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plan = await createPlan({ title, description, skill, startDate, endDate });
    onAdd(plan);
    setTitle("");
    setDescription("");
    setSkill("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <h3>Create Learning Plan</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Plan Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={skill} onChange={(e) => setSkill(e.target.value)} required>
          <option value="">Select Skill</option>
          {skills.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
};

export default PlanCreate;
