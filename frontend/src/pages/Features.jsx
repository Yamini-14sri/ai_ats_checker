import React from "react";

export default function Features() {
  const features = [
    "AI-Powered ATS Scoring",
    "Resume vs Job Description Analysis",
    "Matched & Missing Skills Detection",
    "Domain Mismatch Warning",
    "Suggested Job Roles",
    "Resume Improvement Tips"
  ];

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{f}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}