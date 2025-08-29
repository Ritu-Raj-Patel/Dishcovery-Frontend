from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

from lib.models import Recipe, RecognizeResponse, MatchRequest, ScoredRecipe
from lib.normalize import canon, dedupe, SYNONYMS
from lib.gemini_ing import extract_ingredients_from_bytes
from lib.gemini_recipes import search_recipes_gemini, format_recipe_for_frontend

app = FastAPI(title="Recipe Recommendation API", version="1.0.0")

# CORS configuration - allow all origins in development
# In production, restrict to specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
def test_endpoint():
    return {"message": "Main server working"}

# Global recipes storage (no longer used since we're using Gemini API)
recipes: List[Recipe] = []

# Load recipes on startup (no longer needed)
@app.on_event("startup")
async def load_recipes():
    """Load recipes from data file on startup"""
    global recipes
    print("Note: Not loading local recipes since we're using Gemini API")
    recipes = []

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "using": "Gemini API"}

@app.post("/recognize", response_model=RecognizeResponse)
async def recognize_ingredients(
    file: Optional[UploadFile] = File(None),
    imageBase64: Optional[str] = None
):
    """
    Recognize ingredients from an uploaded image or base64 encoded image.
    """
    try:
        if file:
            # Process uploaded file
            contents = await file.read()
            ingredient_names = extract_ingredients_from_bytes(contents)
        elif imageBase64:
            # Process base64 encoded image
            import base64
            image_data = base64.b64decode(imageBase64)
            ingredient_names = extract_ingredients_from_bytes(image_data)
        else:
            return RecognizeResponse(ingredients=[], error="No image provided")
        
        # Canonicalize and deduplicate ingredient names
        canonical_ingredients = [canon(name) for name in ingredient_names]
        canonical_ingredients = dedupe(canonical_ingredients)
        
        # Apply synonym mapping
        final_ingredients = []
        for ingredient in canonical_ingredients:
            final_ingredients.append(SYNONYMS.get(ingredient, ingredient))
        
        return RecognizeResponse(ingredients=final_ingredients)
        
    except Exception as e:
        return RecognizeResponse(ingredients=[], error=str(e))

@app.post("/recipes/search")
async def search_recipes(request: MatchRequest):
    """
    Search for recipes based on available ingredients and filters using Gemini API.
    """
    print("SEARCH ENDPOINT CALLED")
    print(f"Received search request: {request}")
    try:
        # Search for recipes using Gemini
        filters_dict = None
        if request.filters:
            # Convert Pydantic model to dict
            filters_dict = request.filters.dict(exclude_unset=True)
        
        print(f"Searching for recipes with ingredients: {request.ingredients} and filters: {filters_dict}")
        recipes = search_recipes_gemini(request.ingredients, filters_dict)
        print(f"Found {len(recipes)} recipes from Gemini")
        
        # Format recipes for frontend
        scored_recipes = [format_recipe_for_frontend(recipe) for recipe in recipes]
        print(f"Formatted {len(scored_recipes)} scored recipes")
        
        # Paginate results
        paginated = paginate(scored_recipes, request.page or 1, request.limit or 20)
        print(f"Returning {len(paginated)} paginated recipes")
        
        # Return direct array
        return paginated
    except Exception as e:
        print(f"Error in search_recipes: {e}")
        import traceback
        traceback.print_exc()
        # Return empty array in case of error
        return []

@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str):
    """
    Get a single recipe by ID.
    Note: This endpoint is not implemented for Gemini API version.
    """
    raise HTTPException(status_code=404, detail="Recipe not found")