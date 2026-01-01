import React, { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jd);

    const res = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>AI Resume ATS Checker</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br /><br />

        <textarea
          placeholder="Paste Job Description (optional)"
          rows="6"
          cols="60"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
        <br /><br />

        <button type="submit">Analyze Resume</button>
      </form>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>Results</h3>
          <p><b>ATS Score:</b> {result.ATS_Score}</p>
          <p><b>Semantic Match:</b> {result.Semantic_Match}</p>
          <p><b>Final Score:</b> {result.Final_Score}</p>
          <p><b>Matched Skills:</b> {result.Matched_Skills?.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
