import React, { useState, useEffect } from "react";
import { getHistory } from "../../api/history";

const TYPE_LABELS = { ai_chat: "AI Chat", community_chat: "Community", plan_completion: "Plan", skill_change: "Skill", login: "Login" };

const HistoryList = () => {
  const [data, setData] = useState({ items: [], total: 0 });
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHistory({ type: type || undefined, page, limit: 20 })
      .then(setData)
      .catch(() => setData({ items: [], total: 0 }))
      .finally(() => setLoading(false));
  }, [type, page]);

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Activity History</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
          AI chats, plan completions, skill changes, and login sessions
        </p>
      </div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} style={{ padding: 8, borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
          <option value="">All types</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      {loading ? <p>Loading...</p> : (
        <>
          {data.items?.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No history yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.items?.map((h) => (
                <div key={h._id} style={{ padding: 12, background: "var(--bg)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, color: "var(--primary)" }}>{TYPE_LABELS[h.type] || h.type}</span>
                  <div style={{ marginTop: 4 }}>{h.description || "-"}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                    {new Date(h.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
          {data.total > 20 && (
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button disabled={page <= 1} className="btn btn-secondary" onClick={() => setPage((p) => p - 1)}>Previous</button>
              <span style={{ alignSelf: "center" }}>Page {page}</span>
              <button disabled={page * 20 >= data.total} className="btn btn-secondary" onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryList;
