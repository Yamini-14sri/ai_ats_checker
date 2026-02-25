import React from "react";

export default function Dashboard() {
  return (
    <div className="py-16">

      <h2 className="text-3xl font-bold mb-8">
        Your Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">Past Analyses</h3>
          <p className="text-gray-500">View your history</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">Saved Resumes</h3>
          <p className="text-gray-500">Manage your files</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">Suggested Jobs</h3>
          <p className="text-gray-500">Based on your profile</p>
        </div>

      </div>
    </div>
  );
}