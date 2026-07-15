from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import users_collection, interviews_collection
import os
import shutil
import traceback
import whisper

# ---------------------------------
# FFmpeg Path
# ---------------------------------

os.environ["PATH"] += os.pathsep + r"C:\ffmpeg-2026-05-21-git-0857141823-essentials_build\ffmpeg-2026-05-21-git-0857141823-essentials_build\bin"

# ---------------------------------
# FastAPI App
# ---------------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------
# Load Whisper
# ---------------------------------

print("Loading Whisper model...")
model = whisper.load_model("base")
print("Whisper model loaded successfully!")

# ---------------------------------
# Models
# ---------------------------------

class User(BaseModel):
    name: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str


class InterviewResult(BaseModel):

    email: str
    interviewType: str

    technicalScore: int
    communicationScore: int
    confidenceScore: int

    feedback: str

    answers: list = []


# ---------------------------------
# Home
# ---------------------------------

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }


# ---------------------------------
# MongoDB Test
# ---------------------------------

@app.get("/test-db")
def test_db():

    users_collection.insert_one({
        "name": "Test User"
    })

    return {
        "message": "MongoDB Connected"
    }


# ---------------------------------
# Get All Users
# ---------------------------------

@app.get("/users")
def get_users():

    users = []

    for user in users_collection.find():

        user["_id"] = str(user["_id"])

        users.append(user)

    return users


# ---------------------------------
# Signup
# ---------------------------------

@app.post("/signup")
def signup(user: User):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:

        return {
            "success": False,
            "message": "Email already exists"
        }

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": user.password
    })

    return {
        "success": True,
        "message": "Account Created Successfully"
    }


# ---------------------------------
# Login
# ---------------------------------

@app.post("/login")
def login(user: LoginUser):

    existing_user = users_collection.find_one({
        "email": user.email,
        "password": user.password
    })

    if existing_user:

        return {
            "success": True,
            "name": existing_user["name"],
            "email": existing_user["email"]
        }

    return {
        "success": False,
        "message": "Invalid Email or Password"
    }


# ---------------------------------
# Save Interview Result
# ---------------------------------

@app.post("/save-result")
def save_result(result: InterviewResult):

    interviews_collection.insert_one({

        "email": result.email,
        "interviewType": result.interviewType,

        "technicalScore": result.technicalScore,
        "communicationScore": result.communicationScore,
        "confidenceScore": result.confidenceScore,

        "feedback": result.feedback,

        "answers": result.answers

    })

    return {
        "success": True,
        "message": "Interview Saved"
    }

# ---------------------------------
# Get Interview History
# ---------------------------------

@app.get("/get-results/{email}")
def get_results(email: str):

    results = list(
        interviews_collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return results


# ---------------------------------
# Speech To Text
# ---------------------------------

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):

    try:

        print("Audio file received")

        with open("audio.wav", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print("Audio saved successfully")

        result = model.transcribe(
            "audio.wav",
            language="en"
        )

        print("Transcript:", result["text"])

        return {
            "transcript": result["text"]
        }

    except Exception as e:

        traceback.print_exc()

        return {
            "transcript": f"Error: {str(e)}"
        }