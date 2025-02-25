import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import { supabase } from "../../backend/supabase"; // Ensure correct path to your Supabase instance
import "../styles/ListItems.css";

interface Item {
  id: string;
  title: string;
  description: string;
  image_url: string | null; // Image might be null
}

const ListItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const fallbackImage = "/images/placeholder.png"; // Change to actual placeholder image
  const navigate = useNavigate(); // 👈 Initialize useNavigate

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("uploads").select("*").limit(10);

      if (error) {
        console.error("Error fetching items:", error.message);
      } else {
        console.log("Fetched items:", data);
        setItems(data);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Handle "Upload More" button click
  const handleUploadMoreClick = () => {
    navigate("/upload"); // 👈 Navigate to the Upload page
  };

  return (
    <div className="container1">
      <h1>Recyclable Items</h1>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <img 
                src={item.image_url || fallbackImage} 
                alt={item.title} 
                className="item-image" 
                onError={(e) => (e.currentTarget.src = fallbackImage)} 
              />
              <h2>{item.title}</h2>
              <p>{item.description}</p><br></br>
              <Link to={`/product/${item.id}`} className="buy-button">
                Buy
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* "Upload More" button with programmatic navigation */}
      <button onClick={handleUploadMoreClick} className="upload-link">
        Upload More
      </button>
    </div>
  );
};

export default ListItems;
