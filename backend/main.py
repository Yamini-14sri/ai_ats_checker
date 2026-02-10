from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text
from ats_logic import analyze_resume   # ✅ OK

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_resume(
    file: UploadFile,
    job_description: str = Form("")
):
    resume_text = extract_text(file.file, file.filename)

    result = analyze_resume(resume_text, job_description)

    return {
        "ATS_Score": float(result.get("ATS_Score", 0)),
        "Semantic_Match": float(result.get("Semantic_Match", 0)),
        "Final_Score": float(result.get("Final_Score", 0)),
        "Matched_Skills": result.get("Matched_Skills", []),
        "Missing_Skills": result.get("Missing_Skills", []),
        "Message": result.get("Message", ""),
        "Suggested_Roles": result.get("Suggested_Roles", []),
        "Verdict": result.get("Verdict", "")
    }
