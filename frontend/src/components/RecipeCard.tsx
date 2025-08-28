import { ScoredRecipe } from "@/types";

interface RecipeCardProps {
  scoredRecipe: ScoredRecipe;
}

export default function RecipeCard({ scoredRecipe }: RecipeCardProps) {
  const { recipe, score } = scoredRecipe;
  
  // Format time
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };
  
  // Get nutrition info (handle both old and new formats)
  const getCalories = () => {
    if ('kcal' in recipe.nutritionPerServing) {
      return (recipe.nutritionPerServing as any).kcal;
    }
    if ('calories' in recipe.nutritionPerServing) {
      return (recipe.nutritionPerServing as any).calories;
    }
    return 0;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {score.toFixed(1)}%
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{recipe.cuisine} • {recipe.difficulty}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>⏱️ {formatTime(recipe.timeMinutes)}</span>
          <span>🍽️ {recipe.servings} servings</span>
          <span>🔥 {Math.round(getCalories())} kcal</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.dietTags.map((tag) => (
            <span 
              key={tag} 
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
            >
              {tag.replace("_", " ")}
            </span>
          ))}
        </div>
        
        <button className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition duration-200">
          View Recipe
        </button>
      </div>
    </div>
  );
}