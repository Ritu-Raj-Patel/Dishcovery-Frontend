import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

genai.configure(api_key=api_key)

def get_recipes_from_gemini(ingredients):
    """Get recipes from Gemini API based on ingredients"""
    try:
        # Initialize the model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Create the prompt
        prompt = f"""
        Please provide exactly 10 recipes that use primarily the following ingredients: {', '.join(ingredients)}.
        
        Each recipe should be in this exact JSON format:
        {{
            "id": "unique_string_id",
            "title": "Recipe Title",
            "cuisine": "Cuisine Type",
            "difficulty": "easy|medium|hard",
            "timeMinutes": 30,
            "servings": 4,
            "dietTags": ["vegan", "gluten_free"],  // empty array if none
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
        
        Return ONLY a valid JSON array of exactly 10 recipe objects. No extra text, no markdown.
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
        
        # Parse the JSON response
        recipes = json.loads(response.text)
        return recipes
        
    except Exception as e:
        print(f"Error getting recipes from Gemini: {e}")
        return []

# Test function
if __name__ == "__main__":
    ingredients = ["chicken", "tomato", "onion"]
    print(f"Getting recipes for: {ingredients}")
    recipes = get_recipes_from_gemini(ingredients)
    print(f"Found {len(recipes)} recipes")
    if recipes:
        print("First recipe:")
        print(json.dumps(recipes[0], indent=2))