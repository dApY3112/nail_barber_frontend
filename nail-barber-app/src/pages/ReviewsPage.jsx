import React, { useState, useEffect } from 'react';
import { useParams,useNavigate }               from 'react-router-dom';
import { listReviewsForProvider }  from '../api/reviews';
import ReviewForm                  from '../components/ReviewForm';
import { Star }                    from 'lucide-react';

export default function ReviewsPage() {
  const { providerId } = useParams();
  const [data, setData]       = useState({ total:0, average_rating:0, items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();    
  const fetch = () => {
    setLoading(true);
   listReviewsForProvider(providerId, { page:1, size:20 })
     .then(res => setData(res))
     .catch(err => {
       const d = err.response?.data?.detail;
       if (Array.isArray(d)) {
         setError(d.map(e => e.msg).join(', '));
       } else if (typeof d === 'string') {
         setError(d);
       } else {
         setError('Load failed');
       }
     })
      .finally(() => setLoading(false));
  };
  
  useEffect(fetch, [providerId]);

  if (loading) return <p>Loading…</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Reviews</h1>

      {/* Form thêm review */}
{/* Form thêm review, onSuccess sẽ navigate về ProvidersPage */}
     <ReviewForm
       providerId={providerId}
       onSuccess={() => {
         fetch();           // reload list nếu bạn vẫn ở đây
         navigate('/providers');   // ← rồi quay về ProvidersPage
       }}
     />

      {/* Summary */}
      <p className="mt-4 mb-2">
        <Star className="inline text-yellow-400" size={16}/>
        {data.average_rating} · {data.total} review{data.total>1 && 's'}
      </p>

      {/* List */}
      {data.total === 0
        ? <p>No comments for this Provider yet</p>
        : data.items.map(r => (
            <div key={r.id} className="mb-4 border p-4 rounded">
              <div className="flex items-center mb-1">
                <Star className="text-yellow-400" size={14}/>
                <span className="ml-1">{r.rating}</span>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              {r.comment && <p>{r.comment}</p>}
            </div>
          ))
      }
    </div>
  );
}
