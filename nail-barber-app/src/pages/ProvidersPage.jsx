import { useState, useEffect, useCallback } from 'react';
import { listAvailability } from '../api/availability';
import { listReviewsForProvider } from '../api/reviews';
import {
  Search, MapPin, Star, Clock, Filter,
  Calendar, Award
} from 'lucide-react';
import { listProviders, getMyProvider } from '../api/providers';
import RegisterProvider from '../components/RegisterProvider';
import { useNavigate } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
function ReviewsList({ providerId, onClose, onReviewSubmitted }) {
  const [reviewsData, setReviewsData] = useState({
    total: 0,
    average_rating: 0,
    items: []
  });
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const navigate = useNavigate();
  // 1. Tách hàm fetch để dùng chung
  const fetchReviews = () => {
    setLoading(true);
    setError(null);
    listReviewsForProvider(providerId, { page: 1, size: 5 })
      .then(data => setReviewsData(data))
      .catch(err => {
        const d = err.response?.data?.detail;
        if (Array.isArray(d)) setError(d.map(e => e.msg).join(', '));
        else if (typeof d === 'string') setError(d);
        else setError('Failed to load reviews');
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchReviews, [providerId]);

  // 2. Khi submit review thành công
  const handleReviewSuccess = () => {
    fetchReviews();           // reload list với average rating mới
    if (onReviewSubmitted) {
      onReviewSubmitted();    // cho parent (ProvidersPage) biết để fetchProviders
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >×</button>

        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        {/* 3. ReviewForm nằm trong modal */}
        <div className="mb-6">
          <ReviewForm
            providerId={providerId}
            onSuccess={handleReviewSuccess}
          />
        </div>

        {loading && <p>Loading…</p>}
        {error   && <p className="text-red-500">{error}</p>}

        {reviewsData && (
          <>
          <p className="mb-2 text-sm text-gray-600">
            {reviewsData.average_rating.toFixed(1)}{' '}
            <Star className="inline text-yellow-400" size={14} />
            &nbsp;·&nbsp;
            {reviewsData.total} review{reviewsData.total > 1 && 's'}
          </p>
            <div className="space-y-4 overflow-y-auto max-h-96">
              {reviewsData.items.map(r => (
                <div key={r.id} className="border-b pb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="text-yellow-400" size={16}/>
                    <span className="font-medium">{r.rating}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {r.comment && <p className="text-gray-700 text-sm">{r.comment}</p>}
                </div>
              ))}
            </div>
            {reviewsData.total > reviewsData.items.length && (
              <button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => navigate(`/providers/${providerId}/reviews`)}
              >
                See all {reviewsData.total} review{reviewsData.total > 1 && 's'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default function ProvidersPage() {
  const [openReviewsFor, setOpenReviewsFor] = useState(null);
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  // Kiểm tra user đã là provider chưa
  const [isProvider, setIsProvider] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  // State chính cho phần providers list
  const [providers, setProviders] = useState([]);
  const [loadingList, setLoadingList]     = useState(false);
  const [errorList, setErrorList]         = useState(null);
    const [searchTerm, setSearchTerm]       = useState('');
  const [selectedType, setSelectedType]   = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedCity, setSelectedCity]   = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortBy, setSortBy]               = useState('rating');
// availability cache: { [providerId]: [AvailabilityResponse] }
const [availabilityMap, setAvailabilityMap] = useState({});
const DayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const fetchProviders = useCallback(async () => {
    setLoadingList(true);
    setErrorList(null);
    try {
      const data = await listProviders({ page:1, size:50 /* + filters */ });
      setProviders(data.items ?? data);
    } catch (err) {
      setErrorList(err.response?.data?.detail || 'Failed to load providers');
    } finally {
      setLoadingList(false);
    }
  }, [searchTerm, selectedType, selectedPrice, selectedCity, selectedCountry /*, sortBy nếu cần */]);
useEffect(() => {
  if (!loadingProfile) fetchProviders();
}, [loadingProfile, fetchProviders]);
  // Filters & sort
  const categories = [
  ];
   useEffect(() => {
     async function fetchProfile() {
       try {
         await getMyProvider();
         setIsProvider(true);
       } catch (err) {
         if (err.response?.status === 404) {
           setIsProvider(false);
         } else {
           console.error(err);
         }
       } finally {
         setLoadingProfile(false);
       }
     }
     fetchProfile();
   }, []);
  // Fetch real providers từ backend
    // 2) nếu đã là provider, mới fetch list
  useEffect(() => {
    if (loadingProfile) return;    // chờ profile xong mới fetch
    async function fetchData() {
      setLoadingList(true);
      setErrorList(null);
      try {
        const data = await listProviders({
          search:      searchTerm,
          type:        selectedType,
          price_range: selectedPrice,
          city:        selectedCity,
          country:     selectedCountry,
          page:        1,
          size:        50,
        });
        setProviders(data.items ?? data);
      } catch (err) {
        setErrorList(err.response?.data?.detail || 'Failed to load providers');
      } finally {
        setLoadingList(false);
      }
    }
    fetchData();
  }, [loadingProfile, searchTerm, selectedType, selectedPrice, selectedCity, selectedCountry, sortBy]);
 // Khi providers thay đổi, fetch availability cho mỗi provider
  useEffect(() => {
    providers.forEach(p => {
      if (!availabilityMap[p.id]) {
        listAvailability(p.id)
          .then(av => setAvailabilityMap(m => ({ ...m, [p.id]: av })))
          .catch(() => {});
      }
    });
  }, [providers]);
   // Hiển thị form đăng ký nếu profile chưa có
  const actionButton = () => {
    if (loadingProfile) return null;
    if (isProvider) {
      return (
        <button
          onClick={() => navigate('/providers/me')}
          className="mb-6 inline-block px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Your Provider Dashboard
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setShowRegister(true)}
          className="mb-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Đăng ký làm Provider
        </button>
      );
    }
  };

  // Phần render danh sách providers (giống code cũ, chỉ đổi tên vài biến)
const filtered = providers
  .filter(p => {
    const term = searchTerm.toLowerCase();

    // fallback về chuỗi rỗng hoặc mảng rỗng nếu undefined
    const name        = p.company_name  ?? '';
    const desc        = p.description   ?? '';
    const servicesArr = p.services      ?? [];

    return (
      (!searchTerm) ||
      name.toLowerCase().includes(term) ||
      desc.toLowerCase().includes(term) ||
      servicesArr.some(s => s.toLowerCase().includes(term))
    )
    && (selectedType === 'all' || p.type === selectedType)
    && (selectedPrice === 'all' || p.priceRange === selectedPrice)
    && (!selectedCity   || p.city === selectedCity)
    && (!selectedCountry|| p.country === selectedCountry);
  })
  .sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price')  return a.priceRange.length - b.priceRange.length;
    return 0;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero + Search */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Find Your Perfect Provider</h1>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Discover top-rated nail salons and barbershops in your area
          </p>
          <div className="max-w-2xl mx-auto flex items-center bg-white rounded-lg p-3 shadow-lg">
            <Search className="text-gray-400 mx-3" size={20}/>
            <input
              type="text"
              placeholder="Search providers or services..."
              className="flex-1 outline-none py-2 text-gray-800"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {actionButton()}
        {/* Form đăng ký popup */}
       {showRegister && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
           <div className="bg-white p-6 rounded-lg max-w-md w-full">
             <button
               className="text-gray-500 float-right"
               onClick={() => setShowRegister(false)}
             >×</button>
             <RegisterProvider onSuccess={() => {
               setShowRegister(false);
               setIsProvider(true);
             }}/>
           </div>
         </div>
       )}
        {/* Filters */}
        <div className="mb-8">
            {/* City & Country Filters */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              className="px-4 py-2 border rounded-lg focus:ring-yellow-500 bg-white flex-1"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              className="px-4 py-2 border rounded-lg focus:ring-yellow-500 bg-white flex-1"
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600"/>
              <span className="font-medium text-gray-900">Filter by type:</span>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border rounded-lg focus:ring-yellow-500 bg-white"
                value={selectedPrice}
                onChange={e => setSelectedPrice(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="$">$ - Budget</option>
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Premium</option>
              </select>
              <select
                className="px-4 py-2 border rounded-lg focus:ring-yellow-500 bg-white"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  selectedType === cat.id
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        {loadingList ? (
          <div className="text-center py-16">Loading providers…</div>
        ) : errorList ? (
          <div className="text-red-600 text-center py-16">{errorList}</div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filtered.length} provider{filtered.length !== 1 && 's'}
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(provider => {
              // Lấy availability đã load cho provider này
              const avail = availabilityMap[provider.id] || [];
              const first = avail[0];
                const idx = typeof first?.day_of_week === 'number'
                ? first.day_of_week
                : parseInt(first?.day_of_week, 10);
              // Hiển thị khung giờ đầu tiên (ví dụ): thứ trong tuần + giờ
              const hoursText = avail.length
                ? `${DayNames[avail[0].day_of_week]} ${avail[0].start_time.slice(0,5)}–${avail[0].end_time.slice(0,5)}`
                : 'No availability';

              return (
                <div
                  key={provider.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={provider.image_url || provider.image}
                      alt={provider.company_name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition"
                    />
                    {provider.popular && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                        <Award size={14}/> Popular
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-gray-900">
                      {provider.price_range || provider.priceRange}
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Rating summary */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="text-yellow-400" size={16}/>
                      <span className="text-sm font-semibold">
                        {provider.rating != null ? provider.rating.toFixed(1) : '0.0'}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({provider.review_count ?? 0})
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-600 transition">
                      {provider.company_name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {provider.description}
                    </p>
                    {/* Availability */}
                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                      <Clock size={16} className="text-gray-400"/>
                      <span className="text-sm">{hoursText}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1">
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin size={16}/>
                        <span className="text-sm">
                          {provider.city}{provider.city && provider.country && ','}&nbsp;{provider.country}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(provider.services || []).slice(0,3).map(s => (
                        <span key={s} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                          {s}
                        </span>
                      ))}
                      {(provider.services || []).length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                          +{provider.services.length-3} more
                        </span>
                      )}
                    </div>
                    {/* Book Now mở modal */}
                    <button
                      onClick={() => navigate(`/providers/${provider.id}/services`)}
                      className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white py-3 rounded-lg transition"
                    >
                      <Calendar size={16}/> Book Now
                    </button>
                    <button
                onClick={() => navigate(`/providers/${provider.id}/reviews`)}
                className="mt-4 text-blue-600 hover:underline text-sm"
              >
                View Reviews
              </button>
                  </div>
                </div>
              );
            })}
            </div>
          </>
        )}
      </div>
      {openReviewsFor && (
        <ReviewsList
          providerId={openReviewsFor}
          onClose={() => setOpenReviewsFor(null)}
         onReviewSubmitted={() => {
           setOpenReviewsFor(null);
           fetchProviders();   // ← reload lại để cập nhật average rating ngay
         }}
        />

      )}
    </div>
  );
}
