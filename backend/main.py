# main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import docx

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Backend is running successfully"}

# Helper functions to extract text
def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    doc = docx.Document(file)
    text = "\n".join([p.text for p in doc.paragraphs])
    return text

# Sample skill list
SKILLS = ["python", "machine learning", "nlp", "fastapi", "sql", "react"]

# Skill matching
def calculate_ats_score(resume_text, jd_text):
    resume_text_lower = resume_text.lower()
    matched = [skill for skill in SKILLS if skill in resume_text_lower]
    score = round((len(matched)/len(SKILLS))*100, 2)
    return score, matched

# Semantic matching (dummy TF-IDF style)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def semantic_match(resume_text, jd_text):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, jd_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0] * 100
    return round(similarity, 2)

# API endpoint
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
    final_score = round((ats_score*0.6 + semantic_score*0.4), 2)

    return {
        "ATS_Score": ats_score,
        "Semantic_Match": semantic_score,
        "Final_Score": final_score,
        "Matched_Skills": matched_skills
    }
