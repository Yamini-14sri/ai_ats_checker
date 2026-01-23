from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text
from ats_logic import analyze_resume

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

    # 🔴 FIX: convert numpy values to Python types
    clean_result = {
        "ATS Score": float(result.get("ATS Score", 0)),
        "Semantic Match": float(result.get("Semantic Match", 0)),
        "Final Score": float(result.get("Final Score", 0)),
        "Matched Skills": list(result.get("Matched Skills", []))
    }

    return clean_result
