import React from "react";
import { BarChart3, Zap, Target, AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <BarChart3 className="text-blue-600" size={32} />,
      title: "AI-Powered ATS Scoring",
      description: "Get real-time ATS compatibility score based on formatting, keywords, and content analysis."
    },
    {
      icon: <Target className="text-indigo-600" size={32} />,
      title: "Resume vs Job Analysis",
      description: "Compare your resume with job descriptions to identify gaps and opportunities."
    },
    {
      icon: <CheckCircle className="text-green-600" size={32} />,
      title: "Skill Detection",
      description: "Automatically detect matched and missing skills with detailed recommendations."
    },
    {
      icon: <AlertCircle className="text-orange-600" size={32} />,
      title: "Mismatch Warning",
      description: "Identify domain mismatches and get suggestions for better alignment."
    },
    {
      icon: <Lightbulb className="text-yellow-600" size={32} />,
      title: "Smart Suggestions",
      description: "Get personalized recommendations for resume improvements based on your profile."
    },
    {
      icon: <Zap className="text-purple-600" size={32} />,
      title: "Instant Feedback",
      description: "Receive actionable insights in seconds, not hours."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to optimize your resume and land interviews
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50 transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why ResumeMaster Works</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced AI Technology</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Machine learning trained on 10,000+ successful resumes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Real-time ATS parser simulation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Natural language understanding</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 size={64} className="text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold">AI-Powered Analytics</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Lightbulb size={64} className="text-purple-600 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold">Smart Recommendations</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Keyword optimization based on your industry</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">ATS-friendly formatting suggestions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Career path recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}