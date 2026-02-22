import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlanById, getPlanSteps, addPlanStep, togglePlanStepComplete } from "../../api/plans";
import { FiCheck, FiX, FiPlus } from "react-icons/fi";

const PlanDetail = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddStep, setShowAddStep] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newDuration, setNewDuration] = useState(30);

  const fetchPlan = async () => {
    if (!id) return;
    try {
      const data = await getPlanById(id);
      setPlan(data);
      setSteps(data.steps || []);
    } catch (err) {
      setPlan(null);
      setSteps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPlan();
  }, [id]);

  const handleAddStep = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    try {
      const step = await addPlanStep(id, {
        learningTopic: newTopic.trim(),
        durationMinutes: newDuration,
        day: Math.floor(steps.length / 7) + 1,
        week: Math.floor(steps.length / 7) + 1,
        month: Math.floor(steps.length / 28) + 1,
      });
      setSteps((prev) => [...prev, step]);
      setNewTopic("");
      setNewDuration(30);
      setShowAddStep(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add step");
    }
  };

  const handleToggle = async (stepId, completed) => {
    try {
      const updated = await togglePlanStepComplete(id, stepId, completed);
      setSteps((prev) => prev.map((s) => (s._id === stepId ? updated : s)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!plan) return <div style={{ padding: 24 }}>Plan not found.</div>;

  const completedCount = steps.filter((s) => s.completed).length;
  const rate = steps.length ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div style={{ padding: 24 }}>
      <div className="section-card">
        <div className="section-header">
          <h2>{plan.title}</h2>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Skill: {plan.skill?.title || "N/A"} • Completed {completedCount}/{steps.length} ({rate}%)
          </div>
        </div>

        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Steps</span>
          <button className="btn btn-primary" onClick={() => setShowAddStep(!showAddStep)}>
            <FiPlus size={16} /> Add Step
          </button>
        </div>

        {showAddStep && (
          <form onSubmit={handleAddStep} style={{ marginBottom: 16, padding: 16, background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <input
              placeholder="Learning topic"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              required
              style={{ marginBottom: 8, width: "100%" }}
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={newDuration}
              onChange={(e) => setNewDuration(parseInt(e.target.value) || 30)}
              min={5}
              max={120}
              style={{ marginBottom: 8, width: "100%" }}
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        )}

        {steps.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No steps yet. Add your first learning topic.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((step) => (
              <div
                key={step._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  background: "var(--bg)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  textDecoration: step.completed ? "line-through" : "none",
                  opacity: step.completed ? 0.8 : 1,
                }}
              >
                <button
                  onClick={() => handleToggle(step._id, !step.completed)}
                  style={{ padding: 6, border: "none", background: "transparent", cursor: "pointer" }}
                  title={step.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {step.completed ? <FiCheck size={24} color="var(--primary)" /> : <FiX size={24} color="var(--text-muted)" />}
                </button>
                <div style={{ flex: 1 }}>
                  <strong>{step.learningTopic}</strong>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Day {step.day} • Week {step.week} • Month {step.month} • {step.durationMinutes} min
                  </div>
                  {step.note && <div style={{ fontSize: 12, marginTop: 4 }}>{step.note}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDetail;
