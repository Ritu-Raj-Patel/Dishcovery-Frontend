import { useEffect, useRef } from "react";
import { Recipe } from "@/types";
import { scaleQty } from "@/utils/scale";

interface RecipeDetailModalProps {
  recipe: Recipe;
  servings: number;
  onClose: () => void;
  onServingsChange: (servings: number) => void;
}

export default function RecipeDetailModal({ 
  recipe, 
  servings, 
  onClose, 
  onServingsChange 
}: RecipeDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  
  // Format time
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours > 1 ? "s" : ""} ${mins > 0 ? `${mins} minutes` : ""}`.trim();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Cuisine and difficulty */}
          <p className="text-gray-600 mb-4">
            {recipe.cuisine} • {recipe.difficulty} • {formatTime(recipe.timeMinutes)}
          </p>
          
          {/* Diet tags */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ingredients */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
              
              {/* Servings control */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Servings
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => onServingsChange(Math.max(1, servings - 1))}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-lg hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <div className="bg-gray-100 px-4 py-1 text-center w-16">
                    {servings}
                  </div>
                  <button
                    onClick={() => onServingsChange(servings + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-lg hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const scaledQuantity = scaleQty(
                    ingredient.quantity,
                    recipe.servings,
                    servings
                  );
                  
                  return (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        {scaledQuantity !== undefined && (
                          <span className="font-medium">{scaledQuantity}</span>
                        )}
                        {ingredient.unit && (
                          <span className="ml-1">{ingredient.unit}</span>
                        )}
                        <span className="ml-1">{ingredient.name}</span>
                        {ingredient.optional && (
                          <span className="text-gray-500 ml-1">(optional)</span>
                        )}
                        {ingredient.substitutes && ingredient.substitutes.length > 0 && (
                          <span className="text-gray-500 ml-1">
                            (substitutes: {ingredient.substitutes.join(", ")})
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Nutrition and details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nutrition</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="font-semibold">{Math.round(recipe.nutritionPerServing.kcal)} kcal</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Protein</p>
                    <p className="font-semibold">{recipe.nutritionPerServing.protein}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carbs</p>
                    <p className="font-semibold">{recipe.nutritionPerServing.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fat</p>
                    <p className="font-semibold">{recipe.nutritionPerServing.fat}g</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
                <p><span className="font-medium">Time:</span> {formatTime(recipe.timeMinutes)}</p>
                <p><span className="font-medium">Difficulty:</span> {recipe.difficulty}</p>
              </div>
            </div>
          </div>
          
          {/* Steps */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Steps</h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-3">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}