import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatHistory from "../AI/ChatHistory";

const CommunityRoom = ({ skill }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("pteachToken");

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    // Poll every 5 seconds for new messages
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/community/${skill}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(
        res.data.messages.map((msg) => ({
          sender: msg.sender.name,
          text: msg.message,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch community messages", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/community",
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
    <div className="community-room">
      <h3>Community Chat for {skill}</h3>
      <div className="chat-container">
        <ChatHistory messages={messages} />
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default CommunityRoom;
