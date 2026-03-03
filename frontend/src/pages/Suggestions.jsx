import React, { useState } from "react";
import { TrendingUp, MapPin, DollarSign, Briefcase, Star, ExternalLink } from 'lucide-react';

export default function Suggestions() {
  const [selectedRole, setSelectedRole] = useState(null);

  const jobSuggestions = [
    {
      role: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$300K - $400K",
      match: 95,
      type: "Full-time",
      description: "Looking for experienced engineers to build scalable systems.",
      skills: ["Python", "System Design", "Cloud Infrastructure"]
    },
    {
      role: "AI/ML Engineer",
      company: "OpenAI",
      location: "San Francisco, CA",
      salary: "$250K - $350K",
      match: 92,
      type: "Full-time",
      description: "Help build the next generation of AI models.",
      skills: ["Machine Learning", "Deep Learning", "PyTorch"]
    },
    {
      role: "Full Stack Developer",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$200K - $300K",
      match: 88,
      type: "Full-time",
      description: "Build products used by billions of people.",
      skills: ["React", "Node.js", "Database Design"]
    },
    {
      role: "Data Scientist",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$180K - $280K",
      match: 85,
      type: "Full-time",
      description: "Transform data into actionable insights.",
      skills: ["Statistics", "Python", "SQL"]
    },
    {
      role: "DevOps Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$190K - $290K",
      match: 84,
      type: "Full-time",
      description: "Ensure reliability and scalability of our infrastructure.",
      skills: ["AWS", "Docker", "Kubernetes"]
    },
    {
      role: "Product Manager",
      company: "Apple",
      location: "Cupertino, CA",
      salary: "$220K - $320K",
      match: 82,
      type: "Full-time",
      description: "Lead the vision for innovative products.",
      skills: ["Product Strategy", "Data Analysis", "Leadership"]
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Recommended Job Opportunities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered job suggestions based on your resume and career profile
          </p>
        </div>

        {/* Filter Options */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {['All', 'High Match (90%+)', 'Tech Lead', 'Startup', 'FAANG'].map((filter, idx) => (
            <button key={idx} className="px-4 py-2 border border-gray-300 rounded-full hover:border-blue-600 hover:bg-blue-50 transition font-medium text-gray-700">
              {filter}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobSuggestions.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition cursor-pointer"
              onClick={() => setSelectedRole(selectedRole === idx ? null : idx)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
                    <p className="text-blue-600 font-semibold">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{job.match}%</div>
                    <p className="text-sm text-gray-600">Match Score</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <MapPin size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">Growth Role</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{job.description}</p>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, sidx) => (
                      <span key={sidx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedRole === idx && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Why This Job Matches You</h4>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start space-x-2">
                        <Star className="text-yellow-500 flex-shrink-0 mt-1" size={16} />
                        <span className="text-sm text-gray-700">Your resume matches 95% of the job requirements</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Star className="text-yellow-500 flex-shrink-0 mt-1" size={16} />
                        <span className="text-sm text-gray-700">You have 4/5 of the key technical skills needed</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Star className="text-yellow-500 flex-shrink-0 mt-1" size={16} />
                        <span className="text-sm text-gray-700">Your experience level matches the role perfectly</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <a
                  href="#"
                  className="w-full block text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold transition"
                >
                  View Job Details
                  <ExternalLink className="inline ml-2" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Active Job Matches", value: "248" },
            { label: "Average Salary Match", value: "$265K" },
            { label: "Avg Time to Hire", value: "18 Days" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}