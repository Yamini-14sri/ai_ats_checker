import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ATSChecker from "./pages/ATSChecker";
import Interview from "./pages/Interview";
import Suggestions from "./pages/Suggestions";

export default function App() {
  return (
    <BrowserRouter>
      
      {/* 🔹 Global Background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800">

        {/* 🔹 Top Navigation */}
        <Navbar />

        {/* 🔹 Main Content */}
        <main className="pt-20 px-4 md:px-10 lg:px-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ats" element={<ATSChecker />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/suggestions" element={<Suggestions />} />
          </Routes>
        </main>

        {/* 🔹 Footer */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}