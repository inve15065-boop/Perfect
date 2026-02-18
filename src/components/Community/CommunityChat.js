import React, { useEffect, useState } from "react";
import API from "../../api/api.js";

const CommunityChat = ({ skill }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("pteachToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    if (skill) fetchMessages();
    const interval = setInterval(() => skill && fetchMessages(), 2000);
    return () => clearInterval(interval);
  }, [skill]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/community/messages/${skill}`, {
        headers: getAuthHeaders(),
      });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Failed to fetch messages");
    }
  };

  const sendMessage = async () => {
    if (!input || !skill) return;

    try {
      await API.post(
        "/community/send",
        { skill, message: input },
        { headers: getAuthHeaders() }
      );
      setInput("");
      fetchMessages();
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="community-box">
      <h3>Community - {skill}</h3>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={msg._id || i}>
            <strong>{msg.sender?.name || "Unknown"}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default CommunityChat;
