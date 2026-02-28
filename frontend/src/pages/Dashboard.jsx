import React, { useState, useEffect } from "react";
import { History, FileText, Briefcase, Settings, LogOut, Plus, Loader } from 'lucide-react';
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8000";

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('analyses');
  const [analyses, setAnalyses] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    analysesDone: 0,
    averageScore: 0,
    bestScore: 0,
    proDaysLeft: 14
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');

        // Fetch user analyses history
        try {
          const analysesRes = await fetch(`${API_URL}/user-analyses`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (analysesRes.ok) {
            const analysesData = await analysesRes.json();
            setAnalyses(analysesData || []);
            if (analysesData && analysesData.length > 0) {
              const scores = analysesData.map(a => a.score || 0);
              setStats(prev => ({
                ...prev,
                analysesDone: analysesData.length,
                averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
                bestScore: Math.max(...scores)
              }));
            }
          }
        } catch (err) {
          console.log('Analyses endpoint not available, using mock data');
          // Use mock data if endpoint doesn't exist
          setAnalyses([
            { id: 1, title: "Resume_v3.pdf", score: 85, date: "2 days ago", role: "Senior Developer" },
            { id: 2, title: "Resume_v2.pdf", score: 78, date: "1 week ago", role: "Product Manager" },
            { id: 3, title: "Resume_v1.pdf", score: 72, date: "2 weeks ago", role: "Full Stack Developer" },
          ]);
          setStats(prev => ({ ...prev, analysesDone: 3, averageScore: 78, bestScore: 85 }));
        }

        // Fetch saved resumes
        try {
          const resumesRes = await fetch(`${API_URL}/user-resumes`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (resumesRes.ok) {
            const resumesData = await resumesRes.json();
            setResumes(resumesData || []);
          }
        } catch (err) {
          console.log('Resumes endpoint not available, using mock data');
          setResumes([
            { id: 1, name: "Resume_v3.pdf", updated: "2 days ago", size: "245 KB" },
            { id: 2, name: "Resume_v2.pdf", updated: "1 week ago", size: "238 KB" },
            { id: 3, name: "Cover_Letter.pdf", updated: "3 weeks ago", size: "156 KB" },
          ]);
        }

        // Fetch job suggestions
        try {
          const suggestionsRes = await fetch(`${API_URL}/job-suggestions`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (suggestionsRes.ok) {
            const suggestionsData = await suggestionsRes.json();
            setSuggestions(suggestionsData || []);
          }
        } catch (err) {
          console.log('Suggestions endpoint not available, using mock data');
          setSuggestions([
            { role: "Senior Software Engineer", match: 92, company: "Google" },
            { role: "Product Manager", match: 88, company: "Microsoft" },
            { role: "ML Engineer", match: 85, company: "OpenAI" },
          ]);
        }

        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto mb-4 animate-spin" size={48} />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-blue-100">Manage your resumes and track your progress</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Analyses Done", value: stats.analysesDone, icon: "📊" },
            { label: "Average Score", value: stats.averageScore, icon: "⭐" },
            { label: "Best Score", value: stats.bestScore, icon: "🏆" },
            { label: "Pro Days Left", value: stats.proDaysLeft, icon: "✨" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('analyses')}
              className={`pb-4 font-semibold border-b-2 transition ${
                activeTab === 'analyses'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="inline mr-2" size={20} />
              Past Analyses
            </button>
            <button
              onClick={() => setActiveTab('resumes')}
              className={`pb-4 font-semibold border-b-2 transition ${
                activeTab === 'resumes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="inline mr-2" size={20} />
              Saved Resumes
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`pb-4 font-semibold border-b-2 transition ${
                activeTab === 'suggestions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="inline mr-2" size={20} />
              Job Suggestions
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Analyses Tab */}
        {activeTab === 'analyses' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Recent Analyses</h2>
            {analyses.length > 0 ? (
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <div key={analysis.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{analysis.title}</h3>
                        <p className="text-sm text-gray-600">For: {analysis.role || 'N/A'} • {analysis.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{analysis.score}</div>
                        <p className="text-sm text-gray-600">ATS Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-4">No analyses yet. Start by uploading your resume!</p>
                <Link
                  to="/ats"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={20} className="mr-2" />
                  Analyze Resume
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Resumes Tab */}
        {activeTab === 'resumes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Resumes</h2>
              <Link
                to="/ats"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={20} className="mr-2" />
                Upload New
              </Link>
            </div>
            {resumes.length > 0 ? (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div key={resume.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <FileText className="text-blue-600" size={32} />
                        <div>
                          <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                          <p className="text-sm text-gray-600">{resume.size} • Updated {resume.updated}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-4">No resumes uploaded yet</p>
                <Link
                  to="/ats"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={20} className="mr-2" />
                  Upload Resume
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Positions for You</h2>
            {suggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions.map((job, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.role}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-600">{job.match}%</p>
                        <p className="text-sm text-gray-600">Match</p>
                      </div>
                    </div>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                      View Job →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-4">Complete an analysis to get job recommendations</p>
                <Link
                  to="/ats"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={20} className="mr-2" />
                  Analyze Resume
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}