import React from "react";

export default function Suggestions() {
  return (
    <div className="py-16">

      <h2 className="text-3xl font-bold mb-6">
        Recommended Job Roles
      </h2>

      <ul className="space-y-4">
        <li className="p-4 bg-white rounded shadow">AI Engineer</li>
        <li className="p-4 bg-white rounded shadow">Data Scientist</li>
        <li className="p-4 bg-white rounded shadow">Software Developer</li>
      </ul>

    </div>
  );
}