import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../backend/supabase";
import "../styles/ProductDetails.css";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // First try to get from Supabase
        const { data, error } = await supabase
          .from("uploads")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching item:", error.message);
          // Fallback to localStorage if Supabase fails
          const savedItem = localStorage.getItem(`item_${id}`);
          if (savedItem) {
            setItem(JSON.parse(savedItem));
          } else {
            setItem(null);
          }
        } else {
          setItem(data);
          // Save to localStorage and sessionStorage for the chat page
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

  const handleChatNow = () => {
    // Save the current item to session storage before navigating
    if (item) {
      sessionStorage.setItem("currentItem", JSON.stringify(item));
      localStorage.setItem(`item_${id}`, JSON.stringify(item));
    }
    navigate(`/chat/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="product-container">
      <img src={item.image_url} alt={item.title} className="product-image" />
      <div className="product-details">
        <h1>{item.title}</h1>
        <p>{item.description}</p>

        {/* Chat now button */}
        <button className="chat-button" onClick={handleChatNow}>
          Chat Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;