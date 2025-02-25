
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import ChoicePage from "./pages/choice";
import ListItems from './pages/ListItems';
import Upload from './pages/upload';
import Homepage from './pages/HomePage';
import ProductDetails from "./pages/ProductDetails";
import ChatPage from "./pages/ChatPage";
import "./App.css";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current route
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
    console.log("Toggled to:", !isSignup ? "Signup" : "Login");
    navigate(!isSignup ? "/signup" : "/login");
  };

  return (
    <div className="app-container">
      <div className="gradient-overlay" />
      <div className="content-container">
        <div className="auth-container">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/listItems" element={<ListItems />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/chat/:itemId" element={<ChatPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>

          {/* 👇 Show toggle only on login & signup pages */}
          {(location.pathname === "/login" || location.pathname === "/signup") && (
            <div className="toggle-container">
              <p>
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <span
                  onClick={toggleForm}
                  className="toggle-button"
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggleForm();
                    }
                  }}
                >
                  {isSignup ? "Login" : "Sign Up"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ListItems from './pages/ListItems';
// import ProductDetails from './pages/ProductDetails';
// import ChatPage from './pages/ChatPage';
// import Upload from './pages/UploadPage';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/list" element={<ListItems />} />
//       <Route path="/product/:id" element={<ProductDetails />} />
//       <Route path="/chat/:id" element={<ChatPage />} />
//       <Route path="/upload" element={<Upload />} />
//     </Routes>
//   );
// }

// export default App;