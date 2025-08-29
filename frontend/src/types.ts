// Enum for dietary restrictions
export type Diet = 
  | "vegan"
  | "vegetarian"
  | "pescetarian"
  | "keto"
  | "paleo"
  | "gluten_free"
  | "dairy_free";

// Enum for recipe difficulty levels
export type Difficulty = "easy" | "medium" | "hard";

// Recipe ingredient with quantity and optional substitutes
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

// Nutritional information per serving
export interface Nutrition {
  kcal: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
}

// Complete recipe information
export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  difficulty: Difficulty;
  timeMinutes: number;
  servings: number;
  dietTags: Diet[];
  ingredients: Ingredient[];
  steps: string[];
  nutritionPerServing: Nutrition;
  keywords: string[];
}

// Response from ingredient recognition
export interface RecognizeResponse {
  ingredients: string[];
  error?: string;
}

// Request for recipe matching
export interface MatchRequest {
  ingredients: string[];
  limit?: number;
}

// Recipe with matching score
export interface ScoredRecipe {
  recipe: Recipe;
  score: number;
}