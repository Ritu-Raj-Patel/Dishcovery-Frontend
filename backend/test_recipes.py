import os
import sys
from dotenv import load_dotenv

# Add the lib directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'lib'))

# Load environment variables
load_dotenv()

# Test the Gemini recipes function
from lib.gemini_recipes import search_recipes_gemini

try:
    print("Testing Gemini recipe search...")
    recipes = search_recipes_gemini(["chicken"])
    print(f"Found {len(recipes)} recipes")
    if recipes:
        print("First recipe:")
        print(recipes[0])
    else:
        print("No recipes found")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()