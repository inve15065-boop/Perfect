import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "https://pteach-backend.onrender.com";

const ChatHistory = ({ skill }) => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("pteachToken");

  useEffect(() => {
    if (!skill) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/community/messages/${skill}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [skill, token]);

  return (
    <div className="chat-messages" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {messages.map((msg) => (
        <div key={msg._id} className="chat-bubble ai">
          <strong>{msg.sender?.name || "Unknown"}:</strong> {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
