import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              🚀 Powered by Advanced AI Technology
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Resume 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> ATS Optimized</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Pass through applicant tracking systems and land more interviews. Get instant AI-powered analysis, 
              optimization tips, and match scores for your resume.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/ats"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition group"
              >
                Analyze Your Resume
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
              </Link>

              <Link
                to="/features"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-blue-600 hover:bg-blue-50 font-semibold transition"
              >
                Explore Features
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <p className="text-gray-600">Resumes Analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
                <p className="text-gray-600">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ResumeMaster?</h2>
            <p className="text-xl text-gray-600">Comprehensive tools to maximize your resume's potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-blue-600" size={32} />,
                title: "Instant ATS Analysis",
                description: "Get real-time feedback on how your resume performs with ATS systems used by 99% of Fortune 500 companies."
              },
              {
                icon: <Target className="text-indigo-600" size={32} />,
                title: "Job Match Analysis",
                description: "Compare your resume with job descriptions and get a match score with detailed improvement suggestions."
              },
              {
                icon: <TrendingUp className="text-purple-600" size={32} />,
                title: "Career Insights",
                description: "Get AI-powered suggestions for keywords, skills, and achievements right for your target positions."
              },
              {
                icon: <CheckCircle className="text-green-600" size={32} />,
                title: "Format Optimization",
                description: "Ensure your resume formatting is ATS-friendly and visually appealing to hiring managers."
              },
              {
                icon: <Zap className="text-orange-600" size={32} />,
                title: "Interview Prep",
                description: "Practice interviews with our AI-powered interview simulator and get personalized feedback."
              },
              {
                icon: <TrendingUp className="text-pink-600" size={32} />,
                title: "Performance Tracking",
                description: "Track improvements over time and monitor how your changes impact your ATS scores."
              },
            ].map((feature, idx) => (
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

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to optimize your resume</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "1", title: "Upload", description: "Upload your resume in PDF or DOCX format" },
              { number: "2", title: "Analyze", description: "Our AI analyzes it for ATS compatibility" },
              { number: "3", title: "Improve", description: "Get personalized optimization recommendations" },
              { number: "4", title: "Apply", description: "Apply with your enhanced, ATS-ready resume" },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
            <p className="text-xl text-gray-600">Real results from real professionals who used ResumeMaster</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Product Manager",
                achievement: "10 Interviews in 2 Weeks",
                description: "Increased ATS score from 62% to 94% with keyword optimization",
                beforeScore: 62,
                afterScore: 94,
                icon: "📈"
              },
              {
                name: "James Wilson",
                role: "Software Engineer",
                achievement: "5x More Interview Calls",
                description: "Restructured resume with tech-specific keywords and formatting",
                beforeScore: 71,
                afterScore: 96,
                icon: "💻"
              },
              {
                name: "Maria Rodriguez",
                role: "Marketing Manager",
                achievement: "3 Job Offers in 1 Month",
                description: "Tailored resume for each application using our job match feature",
                beforeScore: 68,
                afterScore: 92,
                icon: "🎯"
              },
            ].map((story, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{story.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{story.role}</p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-lg font-bold text-blue-600 mb-2">{story.achievement}</p>
                  <p className="text-sm text-gray-700">{story.description}</p>
                </div>

                {/* Score Improvement */}
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-2">Before</p>
                    <div className="bg-gray-300 rounded-full h-3 mb-1" style={{width: `${story.beforeScore}%`}}></div>
                    <p className="font-bold text-gray-900">{story.beforeScore}%</p>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-2">After</p>
                    <div className="bg-green-400 rounded-full h-3 mb-1" style={{width: `${story.afterScore}%`}}></div>
                    <p className="font-bold text-green-600">{story.afterScore}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Optimize Your Resume?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have improved their chances of getting interviews.
          </p>
          <Link
            to="/ats"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition hover:shadow-xl"
          >
            Get Started Free
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}