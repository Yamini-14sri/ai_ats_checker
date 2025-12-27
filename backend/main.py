from fastapi import FastAPI, UploadFile, File, Form
from resume_parser import extract_text_from_pdf, extract_text_from_docx
from ats_logic import calculate_ats_score
from ml_model import semantic_match

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend is running successfully"}

@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if file.filename.endswith(".pdf"):
        resume_text = extract_text_from_pdf(file.file)
    elif file.filename.endswith(".docx"):
        resume_text = extract_text_from_docx(file.file)
    else:
        return {"error": "Unsupported file format"}

    ats_score, matched_skills = calculate_ats_score(resume_text, job_description)
    semantic_score = semantic_match(resume_text, job_description)

    final_score = round((ats_score * 0.6 + semantic_score * 0.4), 2)

    return {
        "ATS_Score": ats_score,
        "Semantic_Match": semantic_score,
        "Final_Score": final_score,
        "Matched_Skills": matched_skills
    }
