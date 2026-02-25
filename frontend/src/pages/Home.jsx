import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-24">

      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Optimize Your Resume with  
        <span className="text-blue-600"> AI-Powered ATS Analysis</span>
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Upload your resume, compare with job descriptions, and get
        instant insights to improve your chances of landing interviews.
      </p>

      <div className="space-x-4">
        <Link
          to="/ats"
          className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          Check Resume
        </Link>

        <Link
          to="/features"
          className="px-8 py-3 border rounded-xl hover:bg-gray-100"
        >
          Explore Features
        </Link>
      </div>

    </div>
  );
}