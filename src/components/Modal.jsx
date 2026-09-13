/**
 * @file Modal.jsx
 * @description A reusable modal component that overlays the screen.
 * It uses a React Portal to render outside the main DOM hierarchy.
 */
import React from "react";
import ReactDOM from "react-dom";

// Basic styling for the modal. It's often better to move this to a CSS file.
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px 30px",
  borderRadius: "8px",
  position: "relative",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  fontFamily: "sans-serif",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  lineHeight: 1,
  color: "#6B778C",
};

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  // Using a portal to append the modal to the body tag
  return ReactDOM.createPortal(
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
