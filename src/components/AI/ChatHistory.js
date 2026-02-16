import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatHistory = ({ skill }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("pteachToken");
        const res = await axios.get(`http://localhost:5000/api/community/${skill}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [skill]);

  return (
    <div className="chat-history">
      <h3>Community Messages for: {skill}</h3>
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg._id} className="chat-bubble">
            <strong>{msg.sender.name || "Unknown"}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
