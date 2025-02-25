import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../backend/uploadImage";
import { supabase } from "../../backend/supabase";
import "../styles/Upload.css";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }

    console.log("Uploading image...");
    const imageUrl = await uploadImage(image);

    if (!imageUrl) {
      alert("Image upload failed.");
      console.error("Upload failed: No URL returned");
      return;
    }

    console.log("Uploaded Image URL:", imageUrl);

    const { error } = await supabase.from("uploads").insert([
      { title, description, image_url: imageUrl }
    ]);

    if (error) {
      console.error("Database error:", error.message);
      alert("Failed to store item in database.");
      return;
    }

    alert("Item uploaded successfully!");
    navigate("/listItems");
  };

  return (
    <div className="upload-container">
      <h1>Upload Recyclable Item</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="image-upload" onClick={handleImageClick}>
          {preview ? (
            <img src={preview} alt="Preview" className="upload-preview" />
          ) : (
            <span>Click to Add Image</span>
          )}
        </div>
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;

