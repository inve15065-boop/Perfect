import React, { useState, useRef, useEffect } from "react";
import API from "../../api/skills/api.js";
import { FiSend } from "react-icons/fi";

const ChatBox = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const askAI = async () => {
    if (!question.trim()) return;
    setError("");
    setLoading(true);

    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    try {
      const res = await API.post("/ai/ask", { question });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
      setQuestion("");
    } catch (err) {
      setError("AI failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.sender === "ai" ? <pre style={{ margin: 0 }}><code>{msg.text}</code></pre> : msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble ai loading">Typing...</div>}
        <div ref={chatEndRef} />
      </div>

      {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}

      <div className="chat-input">
        <input
          type="text"
          value={question}
          placeholder="Ask anything about React, Node, MongoDB..."
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
        />
        <button onClick={askAI} disabled={loading} className="btn btn-primary">
          <FiSend size={18} /> {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
