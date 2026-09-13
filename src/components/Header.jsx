/**
 * @file Header.jsx
 * @description The main header component for the application.
 */
import { Link } from "react-router-dom";
import React from "react";
import UserIcon from "./UserIcon";

const headerStyle = {
  backgroundColor: "#026AA7",
  color: "white",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  fontFamily: "sans-serif",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "white",
  textDecoration: "none",
};

const userSectionStyle = {
  display: "flex",
  alignItems: "center",
};

const avatarStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "#DFE1E6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "#172B4D",
  cursor: "pointer",
  textDecoration: "none",
};

export default function Header() {
  return (
    <header style={headerStyle}>
      <Link to="/" style={titleStyle}>
        <h1>Kanban Project Manager</h1>
      </Link>
      <div style={userSectionStyle}>
        <Link to="/user" style={avatarStyle} title="User Settings">
          <UserIcon color="#172B4D" />
        </Link>
      </div>
    </header>
  );
}
