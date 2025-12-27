import re

STOPWORDS = {
    "a", "an", "the", "and", "or", "with", "for", "to", "of", "in", "on"
}

SKILL_SET = {
    "python", "java", "sql", "react", "fastapi",
    "machine learning", "deep learning", "nlp",
    "data science", "tensorflow", "pytorch",
    "git", "github"
}

REQUIRED_SECTIONS = ["skills", "experience", "education", "projects"]

def clean_words(text):
    words = re.findall(r"\b[a-z]+\b", text.lower())
    return set(w for w in words if w not in STOPWORDS)

def calculate_ats_score(resume_text, job_description):
    score = 0

    resume_text_lower = resume_text.lower()
    jd_lower = job_description.lower()

    # 1️⃣ Section score (40)
    section_score = sum(10 for s in REQUIRED_SECTIONS if s in resume_text_lower)
    score += section_score

    # 2️⃣ Skill matching (60)
    matched_skills = []

    for skill in SKILL_SET:
        if skill in resume_text_lower and skill in jd_lower:
            matched_skills.append(skill)
            score += 60 / len(SKILL_SET)

    return round(min(score, 100), 2), matched_skills
