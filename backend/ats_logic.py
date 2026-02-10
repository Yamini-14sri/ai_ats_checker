from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

# ----------------------------
# Load model once
# ----------------------------
_model = None

def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


# ----------------------------
# Text cleaning
# ----------------------------
def clean(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z ]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# ----------------------------
# Semantic similarity
# ----------------------------
def semantic_similarity(a: str, b: str) -> float:
    model = get_model()
    emb = model.encode([a, b])
    score = cosine_similarity([emb[0]], [emb[1]])[0][0]
    return round(score * 100, 2)


# ----------------------------
# Keyword extraction (STRICT)
# ----------------------------
def extract_keywords(text: str) -> set:
    stopwords = {
        "with","care","valid","education","computer","using","work","team",
        "experience","skills","knowledge","ability","good","strong",
        "role","responsibilities","candidate","required","preferred",
        "health","basic","and","the","for","from","this","that"
    }
    return {
        w for w in text.split()
        if len(w) > 3 and w not in stopwords
    }


# ----------------------------
# Resume-based role suggestion
# ----------------------------
def suggest_roles(resume_words: set) -> list:
    roles_map = {
        "AI Engineer": {"ai","ml","deep","learning","nlp","transformer"},
        "Data Scientist": {"python","statistics","analysis","model"},
        "Software Engineer": {"java","python","c","c++","backend","frontend"},
        "Web Developer": {"html","css","javascript","react","node"},
        "Embedded Engineer": {"embedded","microcontroller","arduino","arm"},
        "Electronics Engineer": {"electronics","circuits","signal","vlsi"},
        "IoT Engineer": {"iot","sensor","embedded","raspberry","arduino"},
        "Data Analyst": {"sql","excel","dashboard","visualization"},
        "Healthcare AI Engineer": {"healthcare","medical","diagnosis","ai","ml"}
    }

    suggestions = []
    for role, skills in roles_map.items():
        if len(resume_words & skills) >= 2:
            suggestions.append(role)

    return suggestions


# ----------------------------
# MAIN ANALYSIS
# ----------------------------
def analyze_resume(resume: str, jd: str) -> dict:

    resume_clean = clean(resume)
    resume_words = extract_keywords(resume_clean)

    # ❌ Resume empty
    if not resume_words:
        return {
            "ATS_Score": 0,
            "Semantic_Match": 0,
            "Final_Score": 0,
            "Matched_Skills": [],
            "Missing_Skills": [],
            "Message": "Resume text could not be extracted properly.",
            "Suggested_Roles": [],
            "Verdict": "Invalid Resume"
        }

    # ❌ JD missing
    if not jd.strip():
        return {
            "ATS_Score": 0,
            "Semantic_Match": 0,
            "Final_Score": 0,
            "Matched_Skills": [],
            "Missing_Skills": [],
            "Message": "Job Description not provided. Resume analyzed independently.",
            "Suggested_Roles": suggest_roles(resume_words),
            "Verdict": "Resume Only"
        }

    jd_clean = clean(jd)
    jd_words = extract_keywords(jd_clean)

    matched = sorted(resume_words & jd_words)
    missing = sorted(jd_words - resume_words)

    semantic = semantic_similarity(resume_clean, jd_clean)

    # 🔴 STRONG MISMATCH
    if semantic < 35 or len(matched) <= 1:
        return {
            "ATS_Score": round(semantic * 0.4, 2),
            "Semantic_Match": semantic,
            "Final_Score": round(semantic * 0.4, 2),
            "Matched_Skills": matched,
            "Missing_Skills": missing[:15],
            "Message": (
                "⚠️ Resume and Job Description belong to different domains. "
                "Only minimal relevance was detected."
            ),
            "Suggested_Roles": suggest_roles(resume_words),
            "Verdict": "Mismatch"
        }

    # 🟡 PARTIAL MATCH
    if semantic < 60:
        return {
            "ATS_Score": round(semantic * 0.7, 2),
            "Semantic_Match": semantic,
            "Final_Score": round(semantic * 0.7, 2),
            "Matched_Skills": matched[:15],
            "Missing_Skills": missing[:15],
            "Message": (
                "⚠️ Resume partially matches the Job Description. "
                "Skill gap exists."
            ),
            "Suggested_Roles": suggest_roles(resume_words),
            "Verdict": "Partial Match"
        }

    # ✅ GOOD MATCH
    return {
        "ATS_Score": semantic,
        "Semantic_Match": semantic,
        "Final_Score": semantic,
        "Matched_Skills": matched[:15],
        "Missing_Skills": missing[:15],
        "Message": "✅ Resume strongly matches the Job Description.",
        "Suggested_Roles": suggest_roles(resume_words),
        "Verdict": "Good Match"
    }
