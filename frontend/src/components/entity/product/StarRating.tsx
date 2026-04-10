import { useState } from 'react';

interface StarRatingProps {
  productId: number;
  rating: number;
  onRate: (productId: number, rating: number) => void;
}

export default function StarRating({ productId, rating, onRate }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const activeRating = hovered || rating;

  return (
    <div
      className="flex items-center space-x-1"
      role="group"
      aria-label={`Star rating for product ${productId}`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= activeRating;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onRate(productId, star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`
              relative text-3xl leading-none
              transition-all duration-150 ease-in-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded
              ${filled
                ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)] scale-110'
                : 'text-red-200 hover:text-red-400 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]'
              }
              active:scale-125
              cursor-pointer select-none
              p-1
            `}
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            aria-pressed={rating === star}
          >
            ★
          </button>
        );
      })}
      {rating > 0 && (
        <span
          className="ml-1 text-sm font-semibold text-red-500"
          aria-live="polite"
          aria-label={`Current rating: ${rating} out of 5 stars`}
        >
          {rating}/5
        </span>
      )}
    </div>
  );
}
