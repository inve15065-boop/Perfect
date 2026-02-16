import React, { useEffect, useState } from "react";
import API from "../../api/api";

const CommunityChat = ({ skill }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [skill]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/community/${skill}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages");
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    try {
      await API.post(`/community/${skill}`, { text: input });
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
          <div key={i}>
            <strong>{msg.user}:</strong> {msg.text}
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
