import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeMaster</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/features" className="text-gray-600 hover:text-blue-600 font-medium transition">Features</Link>
            {user && <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">Dashboard</Link>}
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {user.name}</span>
                <Link to="/profile" className="ml-3 text-gray-600 hover:text-blue-600 transition">
                  <User size={24} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition flex items-center space-x-1"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition">
                  Sign In
                </Link>
                <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">Home</Link>
            <Link to="/features" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">Features</Link>
            {user && <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">Dashboard</Link>}
            {user && <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-lg transition">Profile</Link>}
            <div className="flex flex-col space-y-2 px-4">
              {user ? (
                <>
                  <p className="px-4 py-2 text-gray-700 font-medium">Hi, {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 w-full text-center text-red-600 hover:bg-red-50 rounded-lg font-medium border border-red-200 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg font-medium border border-blue-200 transition">
                    Sign In
                  </Link>
                  <Link to="/signup" className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
