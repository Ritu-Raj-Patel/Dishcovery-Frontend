"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import RecipeCard from "@/components/RecipeCard";
import { ScoredRecipe } from "@/types";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [scoredFavorites, setScoredFavorites] = useState<ScoredRecipe[]>([]);

  useEffect(() => {
    // Convert favorites to ScoredRecipe format for RecipeCard component
    const scored = favorites.map(recipe => ({
      recipe,
      score: 95.0 // High score for favorites
    }));
    setScoredFavorites(scored);
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Favorite Recipes</h1>
            <p className="text-gray-600">Recipes you've saved will appear here</p>
          </header>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-4">
              Start exploring recipes and save your favorites by clicking the heart icon
            </p>
            <a 
              href="/recipes" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Discover Recipes
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Favorite Recipes</h1>
          <p className="text-gray-600">
            You have {favorites.length} favorite {favorites.length === 1 ? 'recipe' : 'recipes'}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoredFavorites.map((scoredRecipe) => (
            <RecipeCard 
              key={scoredRecipe.recipe.id} 
              scoredRecipe={scoredRecipe} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}