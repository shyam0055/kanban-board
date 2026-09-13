/**
 * @file Button.jsx
 * @description A reusable button component for the application.
 */
import React from "react";

const buttonStyle = {
  backgroundColor: "#0079BF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  textAlign: "center",
  transition: "background-color 0.2s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#0067A3",
};

export default function Button({ onClick, children, style }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      style={{
        ...buttonStyle,
        ...(isHovered ? buttonHoverStyle : {}),
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
