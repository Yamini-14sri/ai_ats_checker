import { Link } from "react-router-dom";
import "../App.css";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>AI Resume Pro</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
