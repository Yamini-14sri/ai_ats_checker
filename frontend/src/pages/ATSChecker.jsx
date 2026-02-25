import React, { useState } from "react";

export default function ATSChecker() {
  const [result, setResult] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-16">

      <h2 className="text-3xl font-bold mb-8 text-center">
        ATS Resume Checker
      </h2>

      {/* Upload Resume */}
      <input
        type="file"
        className="mb-6 block w-full border rounded-lg p-3"
      />

      {/* Job Description */}
      <textarea
        placeholder="Paste Job Description (Optional)"
        className="w-full border rounded-lg p-3 mb-6"
        rows={6}
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
        Analyze Resume
      </button>

      {/* Result Box */}
      {result && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <p>ATS Score: {result.ATS_Score}</p>
          <p>Semantic Match: {result.Semantic_Match}</p>
          <p>Final Score: {result.Final_Score}</p>
        </div>
      )}
    </div>
  );
}