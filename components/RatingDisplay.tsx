
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

const RatingDisplay: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 12,
  showLabel = true,
  className = ''
}) => {
  const getStarFill = (starIndex: number): string => {
    if (starIndex < rating) {
      return '#fbbf24'; // Yellow for filled stars
    }
    return '#d1d5db'; // Gray for empty stars
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          size={size}
          fill={getStarFill(index)}
          color={getStarFill(index)}
        />
      ))}
      {/* {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          {rating}/{maxRating}
        </span>
      )} */}
    </div>
  );
};
  
export default RatingDisplay;
    
