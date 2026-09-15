import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5.0, showNumber = true, size = 16 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={`transition-colors ${
              i < fullStars
                ? 'fill-amber-400 text-amber-400'
                : i === fullStars && hasHalf
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
