import { ScoredRecipe } from "@/types";

interface RecipeCardProps {
  scoredRecipe: ScoredRecipe;
}

export default function RecipeCard({ scoredRecipe }: RecipeCardProps) {
  const { recipe, score } = scoredRecipe;
  
  // Check if scoredRecipe is valid
  if (!scoredRecipe || !recipe) {
    console.warn("Invalid scoredRecipe data:", scoredRecipe);
    return null;
  }
  
  // Additional checks for required recipe properties
  if (!recipe.id || !recipe.title) {
    console.warn("Recipe missing required properties:", recipe);
    return null;
  }
  
  // Ensure recipe has required arrays
  const safeDietTags = Array.isArray(recipe.dietTags) ? recipe.dietTags : [];
  const safeIngredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const safeSteps = Array.isArray(recipe.steps) ? recipe.steps : [];
  
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
    if (!recipe.nutritionPerServing) return 0;
    
    if ('kcal' in recipe.nutritionPerServing) {
      return (recipe.nutritionPerServing as any).kcal;
    }
    if ('calories' in recipe.nutritionPerServing) {
      return (recipe.nutritionPerServing as any).calories;
    }
    return 0;
  };
  
  // Generate a placeholder image based on recipe title
  const generatePlaceholderImage = (title: string) => {
    // Simple hash function to generate consistent colors
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a color based on the hash
    const hue = Math.abs(hash) % 360;
    return `https://placehold.co/400x300/${hue.toString(16).padStart(2, '0')}a0c0/ffffff?text=${encodeURIComponent(title)}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {recipe.imageUrl ? (
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // If image fails to load, generate a placeholder
            const target = e.target as HTMLImageElement;
            target.src = generatePlaceholderImage(recipe.title);
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
          <span className="text-gray-600 font-medium text-center px-4">
            {recipe.title}
          </span>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{recipe.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
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
          {safeDietTags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
            >
              {tag?.replace("_", " ")}
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