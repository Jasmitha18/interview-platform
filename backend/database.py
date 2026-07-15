from pymongo import MongoClient

client = MongoClient(
    "mongodb://localhost:27017"
)

db = client["ai_interview_db"]

users_collection = db["users"]

interviews_collection = db["interviews"]