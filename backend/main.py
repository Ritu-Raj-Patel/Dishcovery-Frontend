from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json

from lib.models import Recipe, RecognizeResponse, MatchRequest, ScoredRecipe
from lib.normalize import canon, dedupe, SYNONYMS
from lib.matching import score_recipe, apply_filters, paginate
from lib.gemini_ing import extract_ingredients_from_bytes

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

# Global recipes storage
recipes: List[Recipe] = []

# Load recipes on startup
@app.on_event("startup")
async def load_recipes():
    """Load recipes from data file on startup"""
    global recipes
    try:
        # Try to load from data/recipes.json
        with open("data/recipes.json", "r") as f:
            recipes_data = json.load(f)
            recipes = [Recipe(**recipe) for recipe in recipes_data]
        print(f"Loaded {len(recipes)} recipes")
    except FileNotFoundError:
        print("No recipes data file found. Starting with empty recipe list.")
        recipes = []
    except Exception as e:
        print(f"Error loading recipes: {e}")
        recipes = []

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"ok": True, "recipes": len(recipes)}

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

@app.post("/recipes/search", response_model=List[ScoredRecipe])
async def search_recipes(request: MatchRequest):
    """
    Search for recipes based on available ingredients and filters.
    """
    # Score all recipes
    scored_recipes = []
    for recipe in recipes:
        # Apply hard filters first
        if request.filters and not apply_filters(recipe, request.filters):
            continue
            
        # Score the recipe
        score = score_recipe(recipe, request.ingredients)
        scored_recipes.append(ScoredRecipe(recipe=recipe, score=score))
    
    # Sort by score (descending)
    scored_recipes.sort(key=lambda x: x.score, reverse=True)
    
    # Paginate results
    paginated = paginate(scored_recipes, request.page or 1, request.limit or 20)
    
    return paginated

@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str):
    """
    Get a single recipe by ID.
    """
    for recipe in recipes:
        if recipe.id == recipe_id:
            return recipe
    raise HTTPException(status_code=404, detail="Recipe not found")