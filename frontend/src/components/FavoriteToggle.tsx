import { useState } from "react";

interface FavoriteToggleProps {
  initialFavorite?: boolean;
  onToggle?: (favorite: boolean) => void;
}

export default function FavoriteToggle({ initialFavorite = false, onToggle }: FavoriteToggleProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  
  const handleClick = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    if (onToggle) {
      onToggle(newFavorite);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-2xl ${
        isFavorite ? "text-red-500" : "text-gray-300"
      }`}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}