import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  image_url: string;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch the item details
  useEffect(() => {
    // Get the item from localStorage
    const savedItem = localStorage.getItem(`item_${id}`);
    
    if (savedItem) {
      setItem(JSON.parse(savedItem));
    } else {
      // If not found in localStorage, check if it might be from ProductDetails
      // This is a fallback for when coming directly from ProductDetails
      const currentItem = JSON.parse(sessionStorage.getItem("currentItem") || "null");
      if (currentItem && currentItem.id === id) {
        setItem(currentItem);
        localStorage.setItem(`item_${id}`, JSON.stringify(currentItem));
      }
    }

    // Load existing chat messages from localStorage if any
    const savedMessages = localStorage.getItem(`chat_${id}`);
    if (savedMessages) {
      // Convert timestamps back to Date objects
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    } else {
      // Add a welcome message if no previous chat exists
      setTimeout(() => {
        if (item) {
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            sender: "seller",
            text: `Welcome! I'm happy to answer any questions about this ${item.title}.`,
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      }, 500);
    }
  }, [id, item]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && id) {
      localStorage.setItem(`chat_${id}`, JSON.stringify(messages));
    }
  }, [messages, id]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage("");
    
    // Simulate seller response after a short delay
    setTimeout(() => {
      const sellerMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "seller",
        text: getAutoResponse(newMessage, item?.title || ""),
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, sellerMessage]);
    }, 1000);
  };

  // End conversation function
  const handleEndConversation = () => {
    // Remove the chat from localStorage
    if (id) {
      localStorage.removeItem(`chat_${id}`);
    }
    
    // Show confirmation message
    alert("Conversation ended. Starting a new chat.");
    
    // Navigate back to the items list
    navigate("/list");
  };

  // Simple auto-response generator
  const getAutoResponse = (message: string, itemName: string): string => {
    const lowerCaseMsg = message.toLowerCase();
    
    if (lowerCaseMsg.includes("price") || lowerCaseMsg.includes("cost") || lowerCaseMsg.includes("how much")) {
      return `The ${itemName} is available for $5. We offer discounts for bulk purchases.`;
    } else if (lowerCaseMsg.includes("condition") || lowerCaseMsg.includes("quality")) {
      return `This ${itemName} is in good condition and ready to be reused.`;
    } else if (lowerCaseMsg.includes("deliver") || lowerCaseMsg.includes("shipping")) {
      return "We offer local pickup or delivery for a small fee depending on your location.";
    } else if (lowerCaseMsg.includes("available") || lowerCaseMsg.includes("in stock")) {
      return `Yes, the ${itemName} is still available!`;
    } else {
      return `Thank you for your interest in the ${itemName}. Is there anything specific you'd like to know about it?`;
    }
  };

  // Format the timestamp
  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!item) {
    return <div className="loading">Loading item details...</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-actions">
          <Link to="/list" className="back-button">← Back to Items</Link>
        </div>
        <div className="item-info">
          <img src={item.image_url} alt={item.title} className="chat-item-image" />
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === "user" ? "right-message" : "left-message"}`}
          >
            <div className="message-content">
              <div className="sender-label">{message.sender === "user" ? "You" : "Seller"}</div>
              <p>{message.text}</p>
              <span className="timestamp">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
        <button type="button" className="end-chat-button" onClick={handleEndConversation}>
          End Conversation
        </button>
      </form>
    </div>
  );
};

export default ChatPage;