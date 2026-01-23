from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

model = SentenceTransformer("all-MiniLM-L6-v2")

def clean(text):
    return re.sub(r"[^a-zA-Z ]", " ", text.lower())

def semantic_similarity(a, b):
    emb = model.encode([a, b])
    score = cosine_similarity([emb[0]], [emb[1]])[0][0]
    return float(round(score * 100, 2))   # 🔴 force Python float

def detect_domain(jd):
    tech_words = ["python", "java", "react", "ml", "ai", "sql"]
    return "TECH" if any(w in jd.lower() for w in tech_words) else "NON_TECH"

def extract_keywords(text):
    return set(word for word in text.split() if len(word) > 4)

def resume_only_analysis(resume):
    resume = clean(resume)

    sections = {
        "skills": "skill" in resume,
        "experience": "experience" in resume,
        "education": "education" in resume,
        "projects": "project" in resume
    }

    section_score = sum(sections.values()) * 20
    length_score = min(len(resume.split()) / 600, 1) * 40
    final = float(round(section_score + length_score, 2))  # 🔴

    return {
        "Mode": "Resume Only",
        "Resume_Quality_Score": final,
        "Sections": sections,
        "Verdict": "Strong" if final >= 70 else "Average" if final >= 40 else "Weak"
    }

def resume_vs_jd_analysis(resume, jd):
    resume_clean = clean(resume)
    jd_clean = clean(jd)

    semantic = semantic_similarity(resume_clean, jd_clean)

    if detect_domain(jd) == "NON_TECH":
        return {
            "Mode": "Resume vs JD",
            "Semantic_Match": semantic,
            "ATS_Score": float(round(semantic * 0.6, 2)),  # 🔴 still give score
            "Verdict": "Non-IT JD evaluated using semantic relevance"
        }

    resume_words = extract_keywords(resume_clean)
    jd_words = extract_keywords(jd_clean)

    matched = sorted(resume_words & jd_words)
    missing = sorted(jd_words - resume_words)

    ats = float(round((semantic * 0.7) + (len(matched) * 2), 2))  # 🔴

    return {
        "Mode": "Resume vs JD",
        "ATS_Score": ats,
        "Semantic_Match": semantic,
        "Matched_Skills": matched[:15],
        "Missing_Skills": missing[:15],
        "Verdict": "Good Fit" if ats >= 70 else "Partial" if ats >= 40 else "Poor"
    }

def analyze_resume(resume, jd):
    if not jd.strip():
        return resume_only_analysis(resume)
    return resume_vs_jd_analysis(resume, jd)
