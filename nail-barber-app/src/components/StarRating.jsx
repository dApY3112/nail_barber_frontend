// src/components/StarRating.jsx
import { useState } from 'react';
import { Star } from 'lucide-react';
import { rateService } from '../api/services';
export default function StarRating({ serviceId, initRating, initCount, onRated }) {
  const [rating, setRating] = useState(initRating);
  const [count, setCount]     = useState(initCount);
  const [hover, setHover]     = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClick = async (score) => {
    if (loading) return;
    setLoading(true);
    try {
      const { rating: newAvg, reviews_count } = await rateService(serviceId, score);
      setRating(newAvg);
      setCount(reviews_count);
      onRated?.({ rating: newAvg, count: reviews_count });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      { [1,2,3,4,5].map(i => (
          <Star
            key={i}
            size={16}
            className={`cursor-pointer transition-colors ${
              (hover >= i || rating >= i) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(i)}
          />
      )) }
      <span className="ml-1 text-sm text-gray-600">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}
