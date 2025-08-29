import os
import sys
from dotenv import load_dotenv

# Add the lib directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'lib'))

# Load environment variables
load_dotenv()

# Test the MatchRequest model
from lib.models import MatchRequest

def test_match_request():
    """Test the MatchRequest model"""
    try:
        # Create a MatchRequest object
        request = MatchRequest(
            ingredients=["chicken"],
            filters=None,
            limit=3,
            page=1
        )
        
        print(f"Created MatchRequest: {request}")
        print(f"Ingredients: {request.ingredients}")
        print(f"Filters: {request.filters}")
        print(f"Limit: {request.limit}")
        print(f"Page: {request.page}")
        
    except Exception as e:
        print(f"Error creating MatchRequest: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_match_request()