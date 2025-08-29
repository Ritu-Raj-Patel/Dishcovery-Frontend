import { Recipe, RecognizeResponse, MatchRequest, ScoredRecipe } from "@/types";

// Get base URL from environment variable or default to localhost
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * Recognize ingredients from an image file
 * @param file - Image file to analyze
 * @returns Promise with recognized ingredients
 */
export async function recognizeImage(file: File): Promise<RecognizeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/recognize`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error recognizing image:", error);
    return { ingredients: [], error: "Failed to recognize ingredients" };
  }
}

/**
 * Search for recipes based on ingredients and filters
 * @param request - Search request with ingredients and filters
 * @returns Promise with matching recipes
 */
export async function searchRecipes(request: MatchRequest): Promise<ScoredRecipe[]> {
  try {
    console.log("Sending request to backend:", request);
    const response = await fetch(`${BASE_URL}/recipes/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    console.log("Received response from backend:", response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Parsed response data:", data);
    return data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
}

/**
 * Get a single recipe by ID
 * @param id - Recipe ID
 * @returns Promise with recipe details
 */
export async function getRecipe(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

/**
 * Check if the backend is healthy
 * @returns Promise with health status
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}