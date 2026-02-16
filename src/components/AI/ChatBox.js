import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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
      const token = localStorage.getItem("pteachToken");
      const res = await axios.post(
        "http://localhost:5000/api/ai/ask",
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, { sender: "ai", text: res.data.answer }]);
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
            {msg.sender === "ai" ? <pre><code>{msg.text}</code></pre> : msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble ai loading">Typing...</div>}
        <div ref={chatEndRef}></div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="chat-input">
        <input
          type="text"
          value={question}
          placeholder="Ask anything..."
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
        />
        <button onClick={askAI} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
