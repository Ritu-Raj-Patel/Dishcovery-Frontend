import { useState } from "react";
import { Diet, Difficulty } from "@/types";

interface FiltersPanelProps {
  filters: {
    diet: Diet[];
    difficulty: Difficulty | null;
    maxTime: number | undefined;
  };
  onChange: (filters: any) => void;
  servings: number;
  onServingsChange: (servings: number) => void;
}

export default function FiltersPanel({ 
  filters, 
  onChange, 
  servings, 
  onServingsChange 
}: FiltersPanelProps) {
  // Diet options
  const dietOptions: Diet[] = [
    "vegan",
    "vegetarian",
    "pescetarian",
    "keto",
    "paleo",
    "gluten_free",
    "dairy_free"
  ];
  
  // Difficulty options
  const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];
  
  // Handle diet change
  const handleDietChange = (diet: Diet) => {
    const newDiets = filters.diet.includes(diet)
      ? filters.diet.filter(d => d !== diet)
      : [...filters.diet, diet];
    
    onChange({ ...filters, diet: newDiets });
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (difficulty: Difficulty | "any") => {
    onChange({ 
      ...filters, 
      difficulty: difficulty === "any" ? null : difficulty 
    });
  };
  
  // Handle time change
  const handleTimeChange = (time: number | "any") => {
    onChange({ 
      ...filters, 
      maxTime: time === "any" ? undefined : time 
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Diet Filters */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {dietOptions.map((diet) => (
            <button
              key={diet}
              onClick={() => handleDietChange(diet)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filters.diet.includes(diet)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {diet.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      
      {/* Difficulty Filter */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDifficultyChange("any")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filters.difficulty === null
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Any
          </button>
          {difficultyOptions.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => handleDifficultyChange(difficulty)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filters.difficulty === difficulty
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Filter */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Max Time (minutes)</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTimeChange("any")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filters.maxTime === undefined
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Any
          </button>
          {[15, 30, 45, 60, 90].map((time) => (
            <button
              key={time}
              onClick={() => handleTimeChange(time)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filters.maxTime === time
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {time} min
            </button>
          ))}
        </div>
      </div>
      
      {/* Servings */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Servings</h3>
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
    </div>
  );
}