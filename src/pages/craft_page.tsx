import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import "../styles/craft_page.css";
import { useSpring, animated } from "@react-spring/web";
import React from "react";

interface Material {
  name: string;
  quantity: string;
  category: string;
  file: File | null;
  imagePreview?: string;
}

interface Artwork {
  title: string;
  description: string;
  file: File | null;
  imagePreview?: string;
}

// Import images properly
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";

export default function CraftInventory() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState<Material>({
    name: "",
    quantity: "",
    category: "",
    file: null,
    imagePreview: "",
  });
  const [newArtwork, setNewArtwork] = useState<Artwork>({
    title: "",
    description: "",
    file: null,
    imagePreview: "",
  });
  const [error, setError] = useState("");
  const [isSlideShowPaused, setIsSlideShowPaused] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();

  // Images array
  const images = [image1, image2, image3, image4, image5];

  // Animation for sliding effect
  const slideProps = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-66.67%)' },
    reset: false,
    loop: { reverse: false },
    immediate: false,
    pause: isSlideShowPaused,
    config: { 
      mass: 1,
      tension: 1,
      friction: 1,
      duration: 35000
    },
  });

  // Categories with icons
  const categories = [
    { value: "Paper", label: "Paper", icon: "📄" },
    { value: "Plastic", label: "Plastic", icon: "🥤" },
    { value: "Glass", label: "Glass", icon: "🥛" },
    { value: "Metal", label: "Metal", icon: "🔧" },
    { value: "Fabric", label: "Fabric", icon: "🧵" },
    { value: "Wood", label: "Wood", icon: "🪵" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMaterial((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file is an image
      if (!file.type.match('image.*')) {
        setError("Please upload an image file (JPEG, PNG, etc.)");
        return;
      }

      // Create image preview
      const imagePreview = URL.createObjectURL(file);
      
      setNewMaterial((prev) => ({ 
        ...prev, 
        file: file,
        imagePreview: imagePreview
      }));
      
      setError("");
      setUploadSuccess(true); // Show success alert
      setTimeout(() => setUploadSuccess(false), 3000); // Hide alert after 3 seconds
    }
  };

  const handleArtworkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file is an image
      if (!file.type.match('image.*')) {
        setError("Please upload an image file (JPEG, PNG, etc.)");
        return;
      }

      // Create image preview
      const imagePreview = URL.createObjectURL(file);
      
      setNewArtwork((prev) => ({ 
        ...prev, 
        file: file,
        imagePreview: imagePreview
      }));
      
      setError("");
      setUploadSuccess(true); // Show success alert
      setTimeout(() => setUploadSuccess(false), 3000); // Hide alert after 3 seconds
    }
  };

  const validateForm = () => {
    if (!newMaterial.name) {
      setError("Please enter a name for your material.");
      return false;
    }
    if (!newMaterial.quantity) {
      setError("Please specify a quantity.");
      return false;
    }
    if (!newMaterial.category) {
      setError("Please select a category.");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setFormStep(2);
    }
  };

  const handlePrevStep = () => {
    setFormStep(1);
  };

  const addMaterial = () => {
    if (!validateForm()) {
      return;
    }

    setMaterials((prev) => [...prev, newMaterial]);
    // Navigate to craft ideas page with material details
    navigate("/craft-ideas", { state: { material: newMaterial } });
  };

  const handleArtworkSubmit = () => {
    if (!newArtwork.title || !newArtwork.description || !newArtwork.file) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    // Handle artwork submission (e.g., save to state or send to backend)
    console.log("Artwork submitted:", newArtwork);
    setError("");
    setUploadSuccess(true); // Show success alert
    setTimeout(() => setUploadSuccess(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <div className="craft-container">
      <header className="craft-header">
        <h1>Recycled Crafts: Creativity with a Purpose</h1>
        <p className="craft-tagline">
          Transform everyday waste into beautiful, functional art
        </p>
      </header>

      <div className="craft-content">
        <div className="craft-intro">
          <p>
            Recycled crafts transform waste into creative and functional items, reducing landfill 
            waste while promoting sustainability. From turning glass jars into lanterns to making 
            tote bags from old t-shirts, these crafts blend art with eco-consciousness, inspiring 
            a greener future.
          </p>
        </div>

        <div className="photo-slider-container">
          <h2>Inspiration Gallery</h2>
          <div className="photo-slider-controls">
            <button 
              className="slider-control-button" 
              onClick={() => setIsSlideShowPaused(!isSlideShowPaused)}
            >
              {isSlideShowPaused ? "▶ Play" : "⏸️ Pause"}
            </button>
          </div>
          <div className="photo-slider">
            <animated.div 
              style={{ 
                display: 'flex', 
                transform: slideProps.transform, 
                width: 'fit-content', 
                gap: '20px'
              }}
            >
              {[...images, ...images, ...images].map((image, index) => (
                <div key={index} className="slider-image-container">
                  <img 
                    src={image} 
                    alt={`Craft Inspiration ${index + 1}`} 
                    className="slider-image"
                  />
                </div>
              ))}
            </animated.div>
          </div>
        </div>

        {/* Forms Side by Side */}
        <div className="forms-container">
          {/* Material Upload Form */}
          <div className="craft-form-container">
            <h2>Share Your Materials</h2>

            {formStep === 1 ? (
              <div className="craft-form step-1">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={newMaterial.name} 
                    onChange={handleChange} 
                    placeholder="What material do you have?" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity Available</label>
                  <input 
                    type="text" 
                    id="quantity" 
                    name="quantity" 
                    value={newMaterial.quantity} 
                    onChange={handleChange} 
                    placeholder="How much do you have?" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Material Category</label>
                  <select 
                    id="category" 
                    name="category" 
                    value={newMaterial.category} 
                    onChange={handleChange}
                    className="category-select"
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-actions">
                  <button 
                    className="button next-button" 
                    type="button" 
                    onClick={handleNextStep}
                  >
                    Next: Upload Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="craft-form step-2">
                <div className="form-group upload-group">
                  <label htmlFor="file-upload" className="upload-label">
                    {newMaterial.imagePreview ? (
                      <div className="image-preview-container">
                        <img 
                          src={newMaterial.imagePreview} 
                          alt="Material preview" 
                          className="image-preview" 
                        />
                        <div className="image-preview-overlay">
                          Click to change image
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">📷</span>
                        <span>Upload an image of your material</span>
                      </div>
                    )}
                  </label>
                  <input 
                    type="file" 
                    id="file-upload" 
                    onChange={handleFileChange} 
                    className="file-input" 
                    accept="image/*"
                  />
                </div>

                <div className="material-summary">
                  <h3>Material Summary</h3>
                  <p><strong>Name:</strong> {newMaterial.name}</p>
                  <p><strong>Quantity:</strong> {newMaterial.quantity}</p>
                  <p><strong>Category:</strong> {newMaterial.category}</p>
                </div>

                <div className="form-actions">
                  <button 
                    className="button back-button" 
                    type="button" 
                    onClick={handlePrevStep}
                  >
                    Back
                  </button>
                  <button 
                    className="button submit-button" 
                    type="button" 
                    onClick={addMaterial}
                  >
                    Find Craft Ideas
                  </button>
                </div>
              </div>
            )}

            {error && <p className="error-message">{error}</p>}
          </div>

          {/* Artwork Upload Form */}
          <div className="craft-form-container">
            <h2>Upload Your Artwork</h2>
            <div className="craft-form">
              <div className="form-group">
                <label htmlFor="artwork-title">Artwork Title</label>
                <input 
                  type="text" 
                  id="artwork-title" 
                  name="title" 
                  value={newArtwork.title} 
                  onChange={(e) => setNewArtwork((prev) => ({ ...prev, title: e.target.value }))} 
                  placeholder="Enter a title for your artwork" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="artwork-description">Artwork Description</label>
                <textarea 
                  id="artwork-description" 
                  name="description" 
                  value={newArtwork.description} 
                  onChange={(e) => setNewArtwork((prev) => ({ ...prev, description: e.target.value }))} 
                  placeholder="Describe your artwork" 
                />
              </div>

              <div className="form-group upload-group">
                <label htmlFor="artwork-upload" className="upload-label">
                  {newArtwork.imagePreview ? (
                    <div className="image-preview-container">
                      <img 
                        src={newArtwork.imagePreview} 
                        alt="Artwork preview" 
                        className="image-preview" 
                      />
                      <div className="image-preview-overlay">
                        Click to change image
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <span className="upload-icon">📷</span>
                      <span>Upload an image of your artwork</span>
                    </div>
                  )}
                </label>
                <input 
                  type="file" 
                  id="artwork-upload" 
                  onChange={handleArtworkFileChange} 
                  className="file-input" 
                  accept="image/*"
                />
              </div>

              <div className="form-actions">
                <button 
                  className="button submit-button" 
                  type="button" 
                  onClick={handleArtworkSubmit}
                >
                  Submit Artwork
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {uploadSuccess && (
          <div className="success-alert">
            <p>Image uploaded successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}