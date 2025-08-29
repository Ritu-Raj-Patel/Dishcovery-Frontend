"use client";

import { useState, useEffect } from "react";
import { Recipe, ScoredRecipe, Diet, Difficulty } from "@/types";
import { searchRecipes } from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";
import IngredientChips from "@/components/IngredientChips";
import ImageUpload from "@/components/ImageUpload";
import FiltersPanel from "@/components/FiltersPanel";

export default function RecipePage() {
  // State for ingredients
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  // State for filters
  const [filters, setFilters] = useState({
    diet: [] as Diet[],
    difficulty: null as Difficulty | null,
    maxTime: undefined as number | undefined,
    limit: 20,
    page: 1
  });
  
  // State for servings
  const [servings, setServings] = useState<number>(4);
  
  // State for search results
  const [results, setResults] = useState<ScoredRecipe[]>([]);
  
  // State for loading and errors
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle adding an ingredient
  const handleAddIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };
  
  // Handle removing an ingredient
  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };
  
  // Handle image recognition results
  const handleImageResults = (newIngredients: string[]) => {
    const uniqueIngredients = Array.from(new Set([...ingredients, ...newIngredients]));
    setIngredients(uniqueIngredients);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  // Handle search
  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const request = {
        ingredients,
        limit: filters.limit,
      };
      
      console.log("Making API request:", request);
      const searchResults = await searchRecipes(request);
      console.log("Received API response:", searchResults);
      setResults(searchResults);
    } catch (err) {
      setError("Failed to search recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Recipe Recommendation</h1>
          <p className="text-gray-600">Find recipes based on your available ingredients</p>
        </header>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Ingredients</h2>
            <IngredientChips 
              ingredients={ingredients}
              onAdd={handleAddIngredient}
              onRemove={handleRemoveIngredient}
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Image</h2>
            <ImageUpload onResults={handleImageResults} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
              <FiltersPanel 
                filters={filters}
                onChange={handleFilterChange}
                servings={servings}
                onServingsChange={setServings}
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Searching..." : "Find Recipes"}
              </button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Results</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((scoredRecipe, index) => {
                // Check if scoredRecipe is valid
                if (!scoredRecipe || !scoredRecipe.recipe || !scoredRecipe.recipe.id) {
                  console.warn("Invalid recipe data encountered at index:", index, scoredRecipe);
                  return null; // Skip rendering invalid recipes
                }
                
                return (
                  <RecipeCard 
                    key={scoredRecipe.recipe.id} 
                    scoredRecipe={scoredRecipe} 
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">
                {ingredients.length === 0 
                  ? "Add some ingredients to get started!" 
                  : "No recipes found. Try adding more ingredients or relaxing your filters."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}