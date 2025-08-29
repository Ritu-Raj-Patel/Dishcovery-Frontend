from fastapi import FastAPI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

@app.get("/test")
def test_endpoint():
    return {"message": "Test endpoint working"}

@app.post("/recipes/search")
def search_recipes():
    print("Search endpoint called")
    return [{"test": "recipe"}]