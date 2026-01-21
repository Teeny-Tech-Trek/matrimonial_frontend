import React from "react";
import bgImage from "../Images/ChatGPT Image Jan 9, 2026, 12_13_48 PM.png";

const heroBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-50 pointer-events-none "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000", // fallback
      }}
    />
  );
};

export default heroBackground;
