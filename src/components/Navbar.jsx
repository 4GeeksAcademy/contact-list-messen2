import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="glass-nav">
      <div className="nav-brand" onClick={() => navigate("/")}>
        <div className="nav-icon">📋</div>
        <span className="nav-title">
          Contact <span>List</span>
        </span>
      </div>
      <button className="nav-btn" onClick={() => navigate("/add")}>
        + Add contact
      </button>
    </nav>
  );
};