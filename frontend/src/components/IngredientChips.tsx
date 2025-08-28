import { useState, KeyboardEvent } from "react";

interface IngredientChipsProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
}

export default function IngredientChips({ ingredients, onAdd, onRemove }: IngredientChipsProps) {
  const [inputValue, setInputValue] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = inputValue.trim().toLowerCase();
      if (value) {
        onAdd(value);
        setInputValue("");
      }
    }
  };
  
  const handleAddClick = () => {
    const value = inputValue.trim().toLowerCase();
    if (value) {
      onAdd(value);
      setInputValue("");
    }
  };
  
  return (
    <div className="border border-gray-300 rounded-lg p-3">
      <div className="flex flex-wrap gap-2 mb-3">
        {ingredients.map((ingredient) => (
          <div 
            key={ingredient} 
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
          >
            <span className="mr-2">{ingredient}</span>
            <button 
              onClick={() => onRemove(ingredient)}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add ingredient (type and press Enter or comma)"
          className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition duration-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}