import React, { useState } from "react";
import { Mic, Volume2, Clock, Target, TrendingUp } from 'lucide-react';

export default function Interview() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      category: "Behavioral",
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
      type: "Open Ended"
    },
    {
      category: "Technical",
      question: "Explain the difference between REST and GraphQL APIs.",
      type: "Technical"
    },
    {
      category: "Situational",
      question: "How would you approach a project with unclear requirements?",
      type: "Problem Solving"
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!started ? (
          <>
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">AI Interview Preparation</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Practice with realistic interview questions and get instant feedback from our AI coach
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Mic, title: "Real-time Feedback", desc: "Get instant analysis of your responses" },
                { icon: TrendingUp, title: "Track Progress", desc: "Monitor improvement over time" },
                { icon: Clock, title: "Practice Anytime", desc: "Interview prep on your schedule" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <feature.icon className="text-blue-600 mb-4" size={32} />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Sample Questions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Questions</h2>
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {q.category}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {q.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-800 font-medium">{q.question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg transition"
              >
                Start Practice Interview
              </button>
              <p className="text-gray-600 mt-4">Pro members get unlimited practice sessions</p>
            </div>
          </>
        ) : (
          <>
            {/* Interview Session */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">Question {currentQuestion + 1} of {questions.length}</h2>
                  <button
                    onClick={() => setStarted(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    Exit
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-8">
                <div className="flex space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {questions[currentQuestion].category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {questions[currentQuestion].type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{questions[currentQuestion].question}</h3>

                {/* Recording Area */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-dashed border-blue-300 text-center">
                  <Mic className="mx-auto text-blue-600 mb-4" size={48} />
                  <p className="text-lg font-semibold text-gray-900 mb-2">Click to Record Your Answer</p>
                  <p className="text-gray-600 mb-4">Recommended: 2-3 minutes</p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                    Start Recording
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentQuestion < questions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else {
                      setStarted(false);
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                >
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}