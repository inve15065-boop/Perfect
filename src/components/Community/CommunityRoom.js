import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const CommunityRoom = ({ skill }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  // ✅ FIX: wrap in useCallback so ESLint is satisfied
  const fetchMessages = useCallback(async () => {
    if (!skill) return;

    try {
      const res = await axios.get(
        `${API_BASE}/api/community/messages/${skill}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages(
        (res.data.messages || []).map((msg) => ({
          sender: msg.sender?.name || "Unknown",
          text: msg.message,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch community messages", err);
    }
  }, [skill, token]);

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        `${API_BASE}/api/community/send`,
        { skill, message: newMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <h2>Community Room - {skill}</h2>

      <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ padding: "8px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunityRoom;
