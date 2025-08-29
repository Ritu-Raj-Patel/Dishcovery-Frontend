import os
import sys
from dotenv import load_dotenv
from typing import List, Optional

# Add the lib directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'lib'))

# Load environment variables
load_dotenv()

# Import our functions
from lib.gemini_recipes import search_recipes_gemini, format_recipe_for_frontend
from lib.models import MatchFilters, MatchRequest
from lib.matching import paginate

def test_search_endpoint():
    """Test the search endpoint logic"""
    try:
        # Create a MatchRequest object similar to what FastAPI would create
        request = MatchRequest(
            ingredients=["chicken"],
            filters=None,
            limit=3,
            page=1
        )
        
        print(f"Received search request: {request}")
        
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
        
        # Print first recipe if available
        if paginated:
            print("First recipe:")
            print(paginated[0])
        else:
            print("No recipes found")
            
        return paginated
        
    except Exception as e:
        print(f"Error in search_recipes: {e}")
        import traceback
        traceback.print_exc()
        return []

if __name__ == "__main__":
    test_search_endpoint()