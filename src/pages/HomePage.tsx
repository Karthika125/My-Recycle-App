import React, { useState } from 'react';
import { useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import { p } from 'framer-motion/client';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Animation for main content appearance
  const textProps = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1500 },
  });

  // Additional animations for staggered effect
  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1200 },
    delay: 300,
  });

  const buttonProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
    delay: 1800,
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
   
    <div className="page-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/api/placeholder/40/40" alt="EcoLiving Logo" />
            <span>EcoLiving</span>
          </div>
          
          <div className="mobile-menu-button" onClick={toggleMenu}>
            <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          
          <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
            <button className="nav-login-btn" onClick={() => navigate('/login')}>Sign In</button>
            <button className="nav-signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="homepage">
        <div className="overlay"></div>
        <div className="content-container">
          <div className="content">
            <h1 style={titleProps} className="main-title">
              Embrace Sustainable Living
            </h1>
            
            <div style={textProps} className="text-content">
              <p className="primary-text">
                Sustainability is not just a choice; it's a responsibility. Join us in building a 
                greener future by reducing waste and conserving resources. Our community-driven 
                initiatives and eco-friendly programs empower individuals to make impactful changes.
              </p>
              
              <p className="secondary-text">
                Discover creative ways to recycle, upcycle, and live sustainably. Whether you're 
                an environmental enthusiast or just starting your journey, we provide the resources 
                and support you need.
              </p>
            </div>
            
            <div style={buttonProps} className="button-container">
              <button 
                className="primary-button" 
                onClick={() => navigate('/signup')}
                aria-label="Sign up for an account"
              >
                Get Started
              </button>
              <button 
                className="secondary-button" 
                onClick={() => navigate('/login')}
                aria-label="Log in to your account"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section about">
            <h3>About EcoLiving</h3>
            <p>We're dedicated to promoting sustainable living practices and building eco-conscious communities worldwide.</p>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Programs</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>123 Green Street, Eco City, EC 12345</p>
            <p>Email: info@ecoliving.org</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          <div className="footer-section social">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon facebook" aria-label="Facebook">
                <i className="fb-icon"></i>
              </a>
              <a href="https://twitter.com" className="social-icon twitter" aria-label="Twitter">
                <i className="tw-icon"></i>
              </a>
              <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram">
                <i className="ig-icon"></i>
              </a>
              <a href="https://linkedin.com" className="social-icon linkedin" aria-label="LinkedIn">
                <i className="li-icon"></i>
              </a>
              <a href="https://youtube.com" className="social-icon youtube" aria-label="YouTube">
                <i className="yt-icon"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2025 EcoLiving. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;