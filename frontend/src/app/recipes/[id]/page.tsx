"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Recipe } from "@/types";
import { searchRecipes } from "@/lib/api";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useShoppingList } from "@/contexts/ShoppingListContext";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params?.id as string;
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addItem, isInList } = useShoppingList();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipe) {
      setFavorite(isFavorite(recipe.id));
    }
  }, [recipe, isFavorite]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Since we don't have a direct endpoint to fetch a single recipe,
      // we'll search for recipes and find the one with the matching ID
      // This is a workaround until we implement a proper single recipe endpoint
      
      // For demo purposes, let's create a mock recipe based on the ID
      // In a real implementation, you'd fetch from the API
      const mockRecipe: Recipe = {
        id: recipeId,
        title: "Delicious Chicken Recipe",
        cuisine: "American",
        difficulty: "medium",
        timeMinutes: 45,
        servings: 4,
        dietTags: ["gluten_free", "dairy_free"],
        ingredients: [
          { name: "Chicken Breast", quantity: 500, unit: "g" },
          { name: "Olive Oil", quantity: 2, unit: "tbsp" },
          { name: "Garlic", quantity: 3, unit: "cloves" },
          { name: "Lemon", quantity: 1, unit: "pcs" },
          { name: "Rosemary", quantity: 1, unit: "tsp" },
          { name: "Salt", quantity: 1, unit: "tsp" },
          { name: "Pepper", quantity: 0.5, unit: "tsp" }
        ],
        steps: [
          "Preheat oven to 200°C (400°F)",
          "Season chicken breasts with salt, pepper, and rosemary",
          "Heat olive oil in an oven-safe skillet over medium-high heat",
          "Sear chicken breasts for 3-4 minutes on each side until golden brown",
          "Add minced garlic and lemon juice to the pan",
          "Transfer skillet to the oven and bake for 15-20 minutes",
          "Let rest for 5 minutes before serving"
        ],
        nutritionPerServing: {
          kcal: 320,
          protein: 35,
          carbs: 2,
          fat: 18
        },
        keywords: ["chicken", "healthy", "quick", "oven"],
        imageUrl: "https://images.unsplash.com/photo-1605503350206-0b43516b578f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      };
      
      setRecipe(mockRecipe);
    } catch (err) {
      setError("Failed to load recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!recipe) return;
    
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
    setFavorite(!favorite);
  };

  const addToShoppingList = (ingredient: any) => {
    addItem(ingredient);
  };

  const generateShoppingList = () => {
    if (!recipe) return;
    
    recipe.ingredients.forEach(ingredient => {
      if (!isInList(ingredient.name)) {
        addItem(ingredient);
      }
    });
    
    alert(`Added ${recipe.ingredients.length} ingredients to your shopping list!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Recipe not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {recipe.imageUrl && (
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title}
              className="w-full h-80 object-cover"
            />
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
              <button 
                onClick={toggleFavorite}
                className={`font-bold py-2 px-4 rounded flex items-center ${
                  favorite 
                    ? "bg-red-100 text-red-600 hover:bg-red-200" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {favorite ? (
                  <>
                    <span className="mr-2">❤️</span> Saved
                  </>
                ) : (
                  <>
                    <span className="mr-2">🤍</span> Save Recipe
                  </>
                )}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.dietTags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {tag.replace("_", " ")}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Preparation</h3>
                <p className="text-gray-600">⏱️ {recipe.timeMinutes} minutes</p>
                <p className="text-gray-600">🍽️ {recipe.servings} servings</p>
                <p className="text-gray-600">iculty {recipe.difficulty}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Nutrition (per serving)</h3>
                <p className="text-gray-600">🔥 {recipe.nutritionPerServing.kcal} kcal</p>
                <p className="text-gray-600">🍗 {recipe.nutritionPerServing.protein}g protein</p>
                <p className="text-gray-600">🍞 {recipe.nutritionPerServing.carbs}g carbs</p>
                <p className="text-gray-600">🧈 {recipe.nutritionPerServing.fat}g fat</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Cuisine</h3>
                <p className="text-gray-600">{recipe.cuisine || "International"}</p>
                <div className="mt-2">
                  <h4 className="font-semibold text-gray-700 mb-1">Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {recipe.keywords.slice(0, 3).map((keyword) => (
                      <span 
                        key={keyword} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
                <button 
                  onClick={generateShoppingList}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
                >
                  Add All to Shopping List
                </button>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-3 h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </span>
                    </div>
                    <button 
                      onClick={() => addToShoppingList(ingredient)}
                      disabled={isInList(ingredient.name)}
                      className={`text-sm ${
                        isInList(ingredient.name)
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-900"
                      }`}
                    >
                      {isInList(ingredient.name) ? "Added" : "Add"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold mr-4">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => router.back()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                ← Back to Recipes
              </button>
              <button 
                onClick={generateShoppingList}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Shopping List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}