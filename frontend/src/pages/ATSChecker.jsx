import React, { useState } from "react";
import { Upload, FileText, Zap, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const API_URL = "http://localhost:8000";

export default function ATSChecker({ user }) {
  const [result, setResult] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError('Please upload a resume file');
      return;
    }

    setAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', resumeFile);
      formData.append('job_description', jobDescription);

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setResult({
        ATS_Score: Math.round(data.ATS_Score || 0),
        Semantic_Match: Math.round(data.Semantic_Match || 0),
        Final_Score: Math.round(data.Final_Score || 0),
        keywords: data.Matched_Skills || [],
        missingKeywords: data.Missing_Skills || [],
        suggestions: [
          data.Message || 'Resume analyzed successfully',
          'Add more quantifiable achievements',
          'Include industry-specific keywords'
        ],
        suggestedRoles: data.Suggested_Roles || [],
        verdict: data.Verdict || ''
      });
    } catch (err) {
      setError(err.message || 'Error analyzing resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">ATS Resume Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant feedback on your resume's ATS compatibility and optimize it for success
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Resume</h2>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Resume File</label>
                <div className="relative border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 transition bg-blue-50 cursor-pointer group">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      setResumeFile(e.target.files?.[0]);
                      setError('');
                    }}
                    accept=".pdf,.doc,.docx"
                  />
                  <Upload className="mx-auto text-blue-600 mb-3 group-hover:scale-110 transition" size={48} />
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    {resumeFile ? resumeFile.name : "Drop your resume here"}
                  </p>
                  <p className="text-sm text-gray-600">or click to browse (PDF, DOC, DOCX)</p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Job Description (Optional)
                </label>
                <textarea
                  placeholder="Paste the job description to get better matching insights..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!resumeFile || analyzing}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap size={20} />
                <span>{analyzing ? "Analyzing..." : "Analyze Resume"}</span>
              </button>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-700">
                  <strong>Pro Tip:</strong> Adding a job description helps us provide more targeted suggestions for keyword optimization.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Analysis Features</span>
              </h3>
              <ul className="space-y-3">
                {[
                  'ATS Compatibility Score',
                  'Keyword Matching',
                  'Formatting Analysis',
                  'Content Suggestions',
                  'Skill Gap Analysis'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-gray-700 text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Analysis Results</h2>

              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">ATS Score</p>
                  <p className="text-5xl font-bold text-blue-600">{result.ATS_Score}%</p>
                  <p className="text-sm text-gray-600 mt-2">Overall compatibility with ATS systems</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">Semantic Match</p>
                  <p className="text-5xl font-bold text-green-600">{result.Semantic_Match}%</p>
                  <p className="text-sm text-gray-600 mt-2">Content relevance to job description</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">Final Score</p>
                  <p className="text-5xl font-bold text-purple-600">{result.Final_Score}%</p>
                  <p className="text-sm text-gray-600 mt-2">Combined performance rating</p>
                </div>
              </div>

              {/* Verdict */}
              {result.verdict && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-green-900">Assessment</p>
                    <p className="text-sm text-green-700 mt-1">{result.verdict}</p>
                  </div>
                </div>
              )}

              {/* Keywords Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Matched Keywords ({result.keywords.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.length > 0 ? (
                      result.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          ✓ {keyword}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-600 text-sm">No matched keywords found</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Missing Keywords ({result.missingKeywords.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.length > 0 ? (
                      result.missingKeywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                        >
                          + {keyword}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-600 text-sm">Great! No missing keywords detected</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold transition">
                Download Detailed Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}