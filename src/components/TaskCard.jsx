/**
 * @file TaskCard.jsx
 * @description A reusable card component to display a single task.
 * It receives task data and an onClick handler as props.
 */
import React from "react";

// Basic styling for the card. You can move this to a separate CSS file.
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "8px 12px",
  marginBottom: "8px",
  boxShadow: "0 1px 2px rgba(9,30,66,.25)",
  cursor: "pointer",
  transition: "background-color 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "sans-serif",
  color: "#172B4D",
};

const cardHoverStyle = {
  backgroundColor: "#F4F5F7",
};

const titleStyle = {
  fontSize: "14px",
  fontWeight: "normal",
  margin: "0 0 4px 0",
};

export default function TaskCard({ title, description, onClick }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{ ...cardStyle, ...(isHovered ? cardHoverStyle : {}) }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyle}>{title}</h3>
      {description && (
        <p style={{ fontSize: "12px", color: "#5E6C84", margin: 0 }}>
          {description}
        </p>
      )}
    </div>
  );
}
