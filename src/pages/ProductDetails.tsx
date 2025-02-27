// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../backend/supabase";
// import "../styles/ProductDetails.css";
// import "../styles/ChatPage.css";

// interface Message {
//   id: string;
//   sender: "user" | "seller";
//   text: string;
//   timestamp: Date;
// }

// interface Item {
//   id: string;
//   title: string;
//   description: string;
//   image_url: string;
// }

// const ProductDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [item, setItem] = useState<Item | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showChat, setShowChat] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const { data, error } = await supabase.from("uploads").select("*").eq("id", id).single();
//         if (error) {
//           console.error("Error fetching item:", error.message);
//           const savedItem = localStorage.getItem(`item_${id}`);
//           if (savedItem) setItem(JSON.parse(savedItem));
//           else setItem(null);
//         } else {
//           setItem(data);
//           localStorage.setItem(`item_${id}`, JSON.stringify(data));
//           sessionStorage.setItem("currentItem", JSON.stringify(data));
//         }
//       } catch (error) {
//         console.error("Failed to fetch item", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchItem();
//   }, [id]);

//   useEffect(() => {
//     const savedMessages = localStorage.getItem(`chat_${id}`);
//     if (savedMessages) {
//       const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
//         ...msg,
//         timestamp: new Date(msg.timestamp),
//       }));
//       setMessages(parsedMessages);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (messages.length > 0 && id) {
//       localStorage.setItem(`chat_${id}`, JSON.stringify(messages));
//     }
//   }, [messages, id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleChatNow = () => {
//     setShowChat(true);
//   };

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newMessage.trim() === "") return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       sender: "user",
//       text: newMessage,
//       timestamp: new Date(),
//     };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setNewMessage("");

//     setTimeout(() => {
//       const sellerMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         sender: "seller",
//         text: "Thank you for your message! How can I assist you?",
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, sellerMessage]);
//     }, 1000);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!item) return <p>Item not found.</p>;

//   return (
//     <div className="product-container">
//       {!showChat ? (
//         <>
//           <img src={item.image_url} alt={item.title} className="product-image" />
//           <div className="product-details">
//             <h1>{item.title}</h1>
//             <p>{item.description}</p>
//             <button className="chat-button" onClick={handleChatNow}>Chat Now</button>
//           </div>
//         </>
//       ) : (
//         <div className="chat-container">
//           <div className="chat-header">
//             <button onClick={() => setShowChat(false)} className="back-button">← Back</button>
//             <h2>Chat about {item.title}</h2>
//           </div>
//           <div className="messages-container">
//             {messages.map((message) => (
//               <div key={message.id} className={`message ${message.sender === "user" ? "right-message" : "left-message"}`}>
//                 <div className="message-content">
//                   <div className="sender-label">{message.sender === "user" ? "You" : "Seller"}</div>
//                   <p>{message.text}</p>
//                   <span className="timestamp">{message.timestamp.toLocaleTimeString()}</span>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//           <form className="message-form" onSubmit={handleSendMessage}>
//             <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="message-input" />
//             <button type="submit" className="send-button">Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;



import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../backend/supabase";
import "../styles/ProductDetails.css";
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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data, error } = await supabase.from("uploads").select("*").eq("id", id).single();
        if (error) {
          console.error("Error fetching item:", error.message);
          const savedItem = localStorage.getItem(`item_${id}`);
          if (savedItem) setItem(JSON.parse(savedItem));
          else setItem(null);
        } else {
          setItem(data);
          localStorage.setItem(`item_${id}`, JSON.stringify(data));
          sessionStorage.setItem("currentItem", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch item", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_messages");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "seller",
          text: "Welcome! How can I assist you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatNow = () => {
    setShowChat(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const sellerMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "seller",
        text: getAutoResponse(newMessage),
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, sellerMessage]);
    }, 1000);
  };

  const getAutoResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("price") || lowerMsg.includes("cost")) return "The item costs $5.";
    if (lowerMsg.includes("condition") || lowerMsg.includes("quality")) return "The item is in excellent condition.";
    if (lowerMsg.includes("available") || lowerMsg.includes("stock")) return "Yes, the item is still available!";
    return "Thank you for your interest. Let me know if you have any specific questions.";
  };

  const handleEndConversation = () => {
    localStorage.removeItem("chat_messages");
    setMessages([
      {
        id: Date.now().toString(),
        sender: "seller",
        text: "Thank you for your interest.What more do you need to know about the product",
        timestamp: new Date(),
      },
    ]);
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="product-container">
      {!showChat ? (
        <>
          <img src={item.image_url} alt={item.title} className="product-image" />
          <div className="product-details">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button className="chat-button" onClick={handleChatNow}>Chat Now</button>
          </div>
        </>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h1>Recycled Item</h1>
            <button onClick={() => setShowChat(false)} className="back-button">← Back</button>
            <button onClick={handleEndConversation} className="end-chat-button">End Chat</button>
          </div>
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender === "user" ? "right-message" : "left-message"}`}>
                <div className="message-content">
                  <div className="sender-label">{message.sender === "user" ? "You" : "Seller"}</div>
                  <p>{message.text}</p>
                  <span className="timestamp">{message.timestamp.toLocaleTimeString()}</span>
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
      )}
    </div>
  );
};

export default ProductDetails;