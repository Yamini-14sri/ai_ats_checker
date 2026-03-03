import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ATSChecker from "./pages/ATSChecker";
import Interview from "./pages/Interview";
import Suggestions from "./pages/Suggestions";
import Profile from "./pages/Profile";

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        {/* 🔹 Top Navigation */}
        <Navbar user={user} onLogout={handleLogout} />

        {/* 🔹 Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={authToken ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={authToken ? <Navigate to="/dashboard" /> : <Signup onSignup={handleLogin} />} />
            <Route path="/dashboard" element={authToken ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={authToken ? <Profile user={user} /> : <Navigate to="/login" />} />
            <Route path="/ats" element={authToken ? <ATSChecker user={user} /> : <Navigate to="/login" />} />
            <Route path="/interview" element={authToken ? <Interview /> : <Navigate to="/login" />} />
            <Route path="/suggestions" element={authToken ? <Suggestions /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* 🔹 Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}