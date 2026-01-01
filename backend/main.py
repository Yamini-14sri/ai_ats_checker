from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text
from ats_logic import ats_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Backend is running successfully"}

@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(None)  # JD is optional
):
    file_bytes = await file.read()
    resume_text = extract_text(file_bytes, file.filename)

    result = ats_score(resume_text, job_description)

    return result
