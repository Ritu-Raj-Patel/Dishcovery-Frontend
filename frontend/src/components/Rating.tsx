import { useState } from "react";

interface RatingProps {
  initialRating?: number;
  onRate?: (rating: number) => void;
}

export default function Rating({ initialRating = 0, onRate }: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleMouseEnter = (star: number) => {
    setHoverRating(star);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  
  const handleClick = (star: number) => {
    setRating(star);
    if (onRate) {
      onRate(star);
    }
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${
            star <= (hoverRating || rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}