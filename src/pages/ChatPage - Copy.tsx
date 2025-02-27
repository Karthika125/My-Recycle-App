import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/ChatPage.css";

interface Message {
  id: string;
  sender: "user" | "seller";
  text: string;
  timestamp: Date;
}

interface Item {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get item ID from URL
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dummy product info based on item ID
  const items: Item[] = [
    { id: "1", title: "Plastic Bottle", description: "A great upcycled product for reuse.", imageUrl: "https://via.placeholder.com/100" },
    { id: "2", title: "Cardboard Box", description: "Eco-friendly packaging material.", imageUrl: "https://via.placeholder.com/100" },
  ];

  const item = items.find((item) => item.id === id) || items[0]; // Fallback to first item if not found

  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_messages_${id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "seller",
          text: `Welcome! I'm happy to answer any questions about this ${item.title}.`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [id]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_messages_${id}`, JSON.stringify(messages));
    }
  }, [messages, id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const sellerMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "seller",
        text: getAutoResponse(newMessage, item.title),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, sellerMessage]);
    }, 1000);
  };

  const getAutoResponse = (message: string, itemName: string): string => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("price") || lowerMsg.includes("cost")) return `The ${itemName} costs $5.`;
    if (lowerMsg.includes("condition") || lowerMsg.includes("quality")) return `The ${itemName} is in excellent condition.`;
    if (lowerMsg.includes("available") || lowerMsg.includes("stock")) return `Yes, the ${itemName} is still available!`;
    return `Thank you for your interest in the ${itemName}. Let me know if you have any specific questions.`;
  };

  const handleEndConversation = () => {
    localStorage.removeItem(`chat_messages_${id}`);
    setMessages([
      {
        id: Date.now().toString(),
        sender: "seller",
        text: `Welcome! I'm happy to answer any questions about this ${item.title}.`,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Link to="/list" className="back-button">← Back to Items</Link>
        <button className="end-chat-button" onClick={handleEndConversation}>End Chat</button>
      </div>

      <div className="item-info">
        <img src={item.imageUrl} alt={item.title} className="chat-item-image" />
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === "user" ? "right-message" : "left-message"}`}>
            <div className="message-content">
              <div className="sender-label">{msg.sender === "user" ? "You" : "Seller"}</div>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-form" onSubmit={handleSendMessage}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="message-input" />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;