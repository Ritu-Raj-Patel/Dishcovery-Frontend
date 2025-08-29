import os
import json
import re
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure the API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="Simple Recipe API", version="1.0.0")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Ingredient(BaseModel):
    name: str
    quantity: float
    unit: str

class Nutrition(BaseModel):
    kcal: int
    protein: int
    carbs: int
    fat: int

class Recipe(BaseModel):
    id: str
    title: str
    cuisine: str
    difficulty: str
    timeMinutes: int
    servings: int
    dietTags: List[str]
    ingredients: List[Ingredient]
    steps: List[str]
    nutritionPerServing: Nutrition
    keywords: List[str]

class SearchRequest(BaseModel):
    ingredients: List[str]
    limit: Optional[int] = 10

class ScoredRecipe(BaseModel):
    recipe: Recipe
    score: float

# Simple function to get recipes from Gemini
def get_recipes_from_gemini(ingredients: List[str], limit: int = 10):
    """Get recipes from Gemini API based on ingredients"""
    try:
        # Create the prompt
        prompt = f"""
        Please provide exactly {limit} recipes that use primarily the following ingredients: {', '.join(ingredients)}.
        
        Each recipe should be in this exact JSON format:
        {{
            "id": "unique_string_id",
            "title": "Recipe Title",
            "cuisine": "Cuisine Type",
            "difficulty": "easy|medium|hard",
            "timeMinutes": 30,
            "servings": 4,
            "dietTags": [],
            "ingredients": [
                {{"name": "ingredient_name", "quantity": 1.0, "unit": "unit"}}
            ],
            "steps": [
                "Step 1",
                "Step 2"
            ],
            "nutritionPerServing": {{
                "kcal": 300,
                "protein": 20,
                "carbs": 30,
                "fat": 10
            }},
            "keywords": ["keyword1", "keyword2"]
        }}
        
        Return ONLY a valid JSON array of exactly {limit} recipe objects. No extra text, no markdown, no explanations.
        Make sure all recipes use the provided ingredients as the main components.
        """
        
        # Generate response
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.7,
                max_output_tokens=8192
            )
        )
        
        # Extract JSON from response text
        response_text = response.text.strip()
        
        # Try to find JSON array in the response
        json_match = re.search(r'\[.*\]', response_text, re.DOTALL)
        if json_match:
            json_text = json_match.group(0)
        else:
            json_text = response_text
            
        # Parse the JSON response
        recipes = json.loads(json_text)
        return recipes
        
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        print(f"Response text: {response.text}")
        return []
    except Exception as e:
        print(f"Error getting recipes from Gemini: {e}")
        return []

@app.get("/health")
def health_check():
    return {"status": "ok", "using": "Gemini API"}

@app.post("/recipes/search", response_model=List[ScoredRecipe])
def search_recipes(request: SearchRequest):
    """Search for recipes based on ingredients"""
    print(f"Received search request for ingredients: {request.ingredients}")
    
    # Get recipes from Gemini
    recipes = get_recipes_from_gemini(request.ingredients, request.limit or 10)
    print(f"Found {len(recipes)} recipes from Gemini")
    
    # Format as scored recipes (giving them all a score of 90 since they match)
    scored_recipes = [
        ScoredRecipe(recipe=recipe, score=90.0) 
        for recipe in recipes
    ]
    
    return scored_recipes

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)