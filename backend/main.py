from fastapi import FastAPI, UploadFile, File, Form
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

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form("")
):
    resume_text = extract_text(file.file, file.filename)

    if not resume_text or not resume_text.strip():
        return {"error": "Failed to extract resume text"}

    result = analyze_resume(resume_text, job_description)
    return result
