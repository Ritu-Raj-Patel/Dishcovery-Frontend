import requests
import json

# Test the recipe search endpoint
url = "http://localhost:8000/recipes/search"
headers = {"Content-Type": "application/json"}
data = {
    "ingredients": ["chicken"],
    "limit": 3
}

try:
    response = requests.post(url, headers=headers, json=data, timeout=30)
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")