import React, { useState, useEffect } from "react";
import { createPlan } from "../../api/plans";
import { getSkills } from "../../api/skills";
import { FiPlus } from "react-icons/fi";

const PlanCreate = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        setSkills([]);
      }
    };
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const plan = await createPlan({ title, description, skill, startDate, endDate });
      onAdd(plan);
      setTitle("");
      setDescription("");
      setSkill("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input placeholder="Plan Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select value={skill} onChange={(e) => setSkill(e.target.value)} required>
        <option value="">Select Skill</option>
        {skills.map((s) => (
          <option key={s._id} value={s._id}>{s.title}</option>
        ))}
      </select>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">
        <FiPlus size={18} /> Create Plan
      </button>
    </form>
  );
};

export default PlanCreate;
