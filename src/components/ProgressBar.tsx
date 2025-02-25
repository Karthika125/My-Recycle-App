import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // The progress percentage from 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setShowBadge(true);
    }
  }, [progress]);

  return (
    <div style={{ width: "100%", height: "30px", position: "relative" }}>
      <motion.div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(to top, #4caf50, #81c784)",
          borderRadius: "15px",
          position: "absolute",
          top: 0,
          left: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        animate={{ scaleX: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      />
      
      {showBadge && (
        <motion.div
          style={{
            position: "absolute",
            top: "-40px",
            right: "50%",
            transform: "translateX(50%)",
            backgroundColor: "#f39c12",
            color: "#fff",
            padding: "10px",
            borderRadius: "50%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          🎉 Badge Earned!
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;
