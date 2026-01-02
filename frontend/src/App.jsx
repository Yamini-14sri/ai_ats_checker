import React, { useState } from "react";

import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jd);

    const res = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Resume ATS Checker</h1>

      <div className="upload-card">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <textarea
            placeholder="Paste Job Description (optional)"
            rows="6"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />

          <button type="submit">
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
      </div>

      {result && (
        <div className="result-card">
          <h2>Analysis Result</h2>
          <p><b>ATS Score:</b> {result.ATS_Score}</p>
          <p><b>Semantic Match:</b> {result.Semantic_Match}</p>
          <p><b>Final Score:</b> {result.Final_Score}</p>
          <p><b>Matched Skills:</b> {result.Matched_Skills?.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
