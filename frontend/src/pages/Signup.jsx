import React from "react";

export default function Signup() {
  return (
    <div className="max-w-md mx-auto py-20">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Account
      </h2>

      <input placeholder="Name" className="w-full border p-3 rounded mb-4" />
      <input placeholder="Email" className="w-full border p-3 rounded mb-4" />
      <input type="password" placeholder="Password" className="w-full border p-3 rounded mb-6" />

      <button className="w-full bg-blue-600 text-white p-3 rounded">
        Sign Up
      </button>

    </div>
  );
}