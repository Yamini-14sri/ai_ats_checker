from fastapi import FastAPI, UploadFile, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from resume_parser import extract_text
from ats_logic import analyze_resume   # ✅ OK
import jwt
import json
from datetime import datetime, timedelta
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret key for JWT - in production, use environment variable
SECRET_KEY = "your-secret-key-change-in-production"

# In-memory user storage - in production, use a database
USERS_DB = {}
USER_ANALYSES = {}  # Store user analyses
SAVED_RESUMES = {}  # Store user resumes

# Pydantic Models
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class SigninRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    token: str
    user: dict

# Helper function to create JWT token
def create_token(email: str, name: str) -> str:
    payload = {
        "email": email,
        "name": name,
        "exp": datetime.utcnow() + timedelta(days=30)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

# Helper function to verify token
def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/signup")
async def signup(request: SignupRequest):
    """Register a new user"""
    # Check if user already exists
    if request.email in USERS_DB:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Store user (in production, hash password with bcrypt)
    USERS_DB[request.email] = {
        "name": request.name,
        "email": request.email,
        "password": request.password,  # Never store plain text in production!
        "created_at": datetime.now().isoformat()
    }
    
    # Initialize user data
    USER_ANALYSES[request.email] = []
    SAVED_RESUMES[request.email] = []
    
    # Create token
    token = create_token(request.email, request.name)
    
    return UserResponse(
        token=token,
        user={
            "name": request.name,
            "email": request.email
        }
    )

@app.post("/signin")
async def signin(request: SigninRequest):
    """Authenticate user and return token"""
    # Check if user exists
    if request.email not in USERS_DB:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = USERS_DB[request.email]
    
    # Verify password (in production, use bcrypt to compare hashed passwords)
    if user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token
    token = create_token(request.email, user["name"])
    
    return UserResponse(
        token=token,
        user={
            "name": user["name"],
            "email": user["email"]
        }
    )

@app.get("/user-analyses")
async def get_user_analyses(authorization: Optional[str] = None):
    """Get user's analysis history"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    
    token = authorization.split(" ")[1]
    payload = verify_token(token)
    email = payload.get("email")
    
    return USER_ANALYSES.get(email, [])

@app.get("/user-resumes")
async def get_user_resumes(authorization: Optional[str] = None):
    """Get user's saved resumes"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    
    token = authorization.split(" ")[1]
    payload = verify_token(token)
    email = payload.get("email")
    
    return SAVED_RESUMES.get(email, [])


# ---------- profile endpoints ----------
@app.get('/profile')
async def get_profile(authorization: Optional[str] = None):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Missing token')
    token = authorization.split(' ')[1]
    payload = verify_token(token)
    email = payload.get('email')
    user = USERS_DB.get(email)
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return {
        'name': user.get('name'),
        'email': user.get('email'),
        'created_at': user.get('created_at')
    }

class ProfileUpdate(BaseModel):
    name: Optional[str] = None

@app.put('/profile')
async def update_profile(update: ProfileUpdate, authorization: Optional[str] = None):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Missing token')
    token = authorization.split(' ')[1]
    payload = verify_token(token)
    email = payload.get('email')
    user = USERS_DB.get(email)
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    if update.name:
        user['name'] = update.name
    # create a new token in case name changed
    token = create_token(email, user['name'])
    return {'name': user['name'], 'email': user['email'], 'created_at': user.get('created_at'), 'token': token}

@app.get("/job-suggestions")
async def get_job_suggestions(authorization: Optional[str] = None):
    """Get personalized job suggestions based on recent analyses."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    
    token = authorization.split(" ")[1]
    payload = verify_token(token)
    email = payload.get("email")
    
    analyses = USER_ANALYSES.get(email, [])
    if not analyses:
        return []
    
    # build suggestions from analyses history
    suggestions = []
    seen = set()
    for a in analyses:
        role = a.get("role") or "Unknown"
        if role in seen:
            continue
        seen.add(role)
        match = a.get("score", 0)
        # clamp to 100
        match = min(100, int(match))
        suggestions.append({"role": role, "match": match, "company": "Based on past analysis"})
        if len(suggestions) >= 5:
            break
    return suggestions


@app.post("/upload")
async def upload_resume(
    file: UploadFile,
    job_description: str = Form(""),
    authorization: Optional[str] = None
):
    """Analyze resume and save to user history"""
    # Verify token if provided
    email = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = verify_token(token)
        email = payload.get("email")
    
    resume_text = extract_text(file.file, file.filename)
    result = analyze_resume(resume_text, job_description)
    
    # Save analysis to user history if authenticated
    if email and email in USER_ANALYSES:
        analysis_record = {
            "id": len(USER_ANALYSES[email]) + 1,
            "title": file.filename,
            "score": float(result.get("ATS_Score", 0)),
            "date": datetime.now().isoformat(),
            "role": ", ".join(result.get("Suggested_Roles", ["General Position"])[:1]),
            "ats_score": float(result.get("ATS_Score", 0)),
            "semantic_match": float(result.get("Semantic_Match", 0)),
            "final_score": float(result.get("Final_Score", 0))
        }
        USER_ANALYSES[email].insert(0, analysis_record)  # Add to beginning of list
        
        # Save resume to user's resumes
        # try to determine file size
        size_bytes = None
        try:
            file.file.seek(0, 2)
            size_bytes = file.file.tell()
            file.file.seek(0)
        except Exception:
            size_bytes = None
        display_size = f"{size_bytes} bytes" if size_bytes is not None else "Unknown"
        resume_record = {
            "id": len(SAVED_RESUMES[email]) + 1,
            "name": file.filename,
            "updated": datetime.now().isoformat(),
            "size": display_size
        }
        SAVED_RESUMES[email].insert(0, resume_record)

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

