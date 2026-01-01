import re
from sklearn.feature_extraction.text import TfidfVectorizer

SECTIONS = ["education", "experience", "projects", "skills", "certifications"]

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return text

def extract_keywords(text, top_n=30):
    vectorizer = TfidfVectorizer(stop_words='english', max_features=top_n)
    X = vectorizer.fit_transform([text])
    return set(vectorizer.get_feature_names_out())

def section_score(resume_text):
    resume_text = clean_text(resume_text)
    score = sum([1 for sec in SECTIONS if sec in resume_text])
    return score / len(SECTIONS) * 100

def ats_score(resume_text, jd_text=None):
    resume_text = clean_text(resume_text)
    resume_keywords = extract_keywords(resume_text)

    if jd_text:
        jd_text = clean_text(jd_text)
        jd_keywords = extract_keywords(jd_text)
        matched = list(resume_keywords & jd_keywords)
        score = len(matched) / max(len(jd_keywords), 1) * 100
    else:
        matched = []
        score = section_score(resume_text)  # general ATS score based on resume sections

    return {
        "ATS_Score": round(score, 2),
        "Matched_Skills": matched
    }
