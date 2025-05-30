// src/components/ReviewForm.jsx
import React, { useState } from 'react';
import { createReview } from '../api/reviews';
import { Star } from 'lucide-react';

export default function ReviewForm({ providerId, onSuccess }) {
  const [rating, setRating]     = useState(0);
  const [hoverRating, setHover] = useState(0);
  const [comment, setComment]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setErrors]       = useState(null);

 const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    // client-side guard
    if (rating === 0) {
      setErrors(['Vui lòng chọn số sao.']);
      return;
    }

    setLoading(true);
    try {
      await createReview({ provider_id: providerId, rating, comment });
      setComment('');
      setRating(0);
      onSuccess();
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        // chuyển mỗi lỗi thành "field: msg"
        const msgs = detail.map(e => {
          // loc như ["body","rating"] hoặc ["body","provider_id"]
          const field = Array.isArray(e.loc) && e.loc.length > 1
            ? e.loc[1]
            : e.loc.join('.');
          return `${field}: ${e.msg}`;
        });
        setErrors(msgs);
      } else if (typeof detail === 'string') {
        setErrors([detail]);
      } else {
        setErrors(['Gửi review thất bại']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Viết đánh giá</h3>

      <div className="flex mb-2">
        {Array.from({ length: 5 }).map((_, idx) => {
          const starValue = idx + 1;
          return (
            <Star
              key={idx}
              size={24}
              className={`cursor-pointer transition ${
                starValue <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(starValue)}
            />
          );
        })}
      </div>

      <textarea
        className="w-full border rounded p-2 mb-2"
        rows={4}
        placeholder="Viết nhận xét của bạn..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'
        } text-white`}
      >
        {loading ? 'Đang gửi…' : 'Gửi đánh giá'}
      </button>
    </form>
  );
}
