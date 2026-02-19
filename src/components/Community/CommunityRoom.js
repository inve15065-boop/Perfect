import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ChatHistory from "../AI/ChatHistory.js";
import { FiSend } from "react-icons/fi";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://pteach-backend.onrender.com";

const CommunityRoom = ({ skill }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const token = localStorage.getItem("pteachToken");

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

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
          sender: msg.sender?.name,
          text: msg.message,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch community messages", err);
    }
  }, [skill, token]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !skill) return;

    setLoading(true);
    try {
      await axios.post(
        `${API_BASE}/api/community/send`,
        { skill, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="chat-container">
        <div className="chat-messages" style={{ flex: 1 }}>
          <ChatHistory skill={skill} />
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="btn btn-primary"
          >
            <FiSend size={18} /> {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityRoom;
