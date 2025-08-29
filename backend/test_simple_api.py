import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the current directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Test the simple API
from simple_api import get_recipes_from_gemini

def test_api():
    """Test the simple API"""
    print("Testing simple API...")
    ingredients = ["chicken"]
    recipes = get_recipes_from_gemini(ingredients, 5)
    print(f"Found {len(recipes)} recipes")
    if recipes:
        print("First recipe:")
        print(recipes[0])
    else:
        print("No recipes found")

if __name__ == "__main__":
    test_api()