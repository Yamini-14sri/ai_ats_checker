import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const submitData = async () => {
    if (!file || !jd) {
      alert("Please select a file and enter job description!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // must match FastAPI param name
    formData.append("job_description", jd);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>AI Resume ATS Checker</h2>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <br /><br />

      <textarea
        placeholder="Paste Job Description"
        rows="6"
        cols="50"
        onChange={e => setJd(e.target.value)}
      />
      <br /><br />

      <button onClick={submitData}>Analyze</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
