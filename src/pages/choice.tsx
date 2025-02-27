// pages/ChoicePage.tsx
import React from 'react';
import { useNavigate } from "react-router-dom";

interface ChoiceCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageType: 'recycle' | 'creative';
  onClick: () => void;
}

const ChoicePage: React.FC = () => {
  const navigate = useNavigate();

  // Handle Recyclables button click
  const handleRecyclablesClick = (): void => {
    console.log('Recyclables option clicked');
    navigate("/ListItems"); // 👈 Navigate to Listing Page
  };

  // Handle Creative Ideas button click
  const handleCreativeIdeasClick = (): void => {
    console.log('Creative ideas option clicked');
    navigate('/craft_page'); // 👈 Navigate to Listing Page
  };

  return (
    <div className="choice-page">
      <header>
        <h1>Choose Your Path</h1>
        <p className="subtitle">Discover ways to make a difference</p>
      </header>

      <div className="choice-container">
        <ChoiceCard
          title="Check-out Recyclable Items"
          description="Discover which everyday items can be recycled and learn proper recycling techniques to reduce waste and protect our environment. Find out how small changes in your habits can make a big impact."
          buttonText="Explore Recyclables"
          imageType="recycle"
          onClick={handleRecyclablesClick}
        />

        <ChoiceCard
          title="Explore Creative Ideas"
          description="Unleash your imagination with innovative ways to repurpose and upcycle materials. Get inspired by creative projects that transform ordinary items into extraordinary creations."
          buttonText="Get Inspired"
          imageType="creative"
          onClick={handleCreativeIdeasClick}
        />
      </div>

      {/* Updated Footer matching homepage.tsx */}
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

const ChoiceCard: React.FC<ChoiceCardProps> = ({ 
  title, 
  description, 
  buttonText, 
  imageType, 
  onClick 
}) => {
  return (
    <div className="choice-card">
      <div className={`card-image ${imageType}-image`}></div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button className="card-button" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};



// CSS styles
const styles = `
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
}

header {
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 2rem 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    width: 100vw;  /* Ensure full width */
  
  top: 0;
  left: 0;
  z-index: 1000;
}

h1 {
  margin: 0;
  font-size: 2.5rem;
  color: white;
}

.subtitle {
  font-style: italic;
  margin-top: 0.5rem;
}

.choice-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 3rem auto;
  gap: 2rem;
  padding: 0 1rem;
}

.choice-card {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.choice-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.card-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.recycle-image {
  background-image: url('/api/placeholder/500/200');
  position: relative;
}

.creative-image {
  background-image: url('/api/placeholder/500/200');
  position: relative;
}

.recycle-image:after {
  content: "♻️";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  color: white;
  text-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.creative-image:after {
  content: "💡";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  color: white;
  text-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  margin-top: 0;
  color: #2e7d32;
}

.card-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-button {
  display: inline-block;
  background-color: #2e7d32;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.card-button:hover {
  background-color: #1b5e20;
}

.icon-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255,255,255,0.9);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Footer styles copied from homepage.css */
.footer {
  background-color: #263238;
  color: #b0bec5;
  padding: 60px 0 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 0 20px;
}

.footer-section h3 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
}

.footer-section h3:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #2a9d8f;
}

.footer-section p {
  line-height: 1.6;
  margin-bottom: 10px;
}

.footer-section.links ul {
  list-style: none;
}

.footer-section.links li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #b0bec5;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-section a:hover {
  color: white;
  padding-left: 5px;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: #2a9d8f;
  transform: translateY(-3px);
}

.social-icon i {
  display: block;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.fb-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z'/%3E%3C/svg%3E");
}

.tw-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'/%3E%3C/svg%3E");
}

.ig-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/%3E%3C/svg%3E");
}

.li-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z'/%3E%3C/svg%3E");
}

.yt-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z'/%3E%3C/svg%3E");
}

.footer-bottom {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 20px 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #b0bec5;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.copyright {
  font-size: 0.9rem;
}

/* Responsive styles for footer */
@media (max-width: 576px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .footer-section h3:after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-section {
    text-align: center;
  }
  
  .footer-section.links a:hover {
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .choice-card {
    min-width: 100%;
  }
}
`;

const App: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <ChoicePage />
    </>
  );
};

export default App;
