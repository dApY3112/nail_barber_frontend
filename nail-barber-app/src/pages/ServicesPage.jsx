// src/pages/ServicesPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import {
  Search, Filter, Star, Clock, Sparkles,
  Scissors, User, Palette, Plus
} from 'lucide-react';
import { listServices } from '../api/services';
import { listServiceCategories } from '../api/serviceCategories';
import ServiceFormModal from '../components/ServiceFormModal';
import StarRating from '../components/StarRating';
import BookingModal from '../components/BookingModal';
import { createBooking } from '../api/bookings';
import { fetchProvider, fetchProviderAvailability } from '../api/providers';
export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories,       setCategories]       = useState([]);
  const [services,         setServices]         = useState([]);
  const [totalCount,       setTotalCount]       = useState(0);
  const [loading,          setLoading]          = useState(false);
  const [error,            setError]            = useState(null);
 const [bookingService, setBookingService] = useState(null); // service đang muốn book
  const [bookingProvider, setBookingProvider] = useState(null); // provider của service đó
  const [bookingAvailability, setBookingAvailability] = useState([]); // slot của provider đó
  const [bookingMsg, setBookingMsg] = useState(''); // show message khi đặt thành công/thất bại
  // modal state
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Helper: format FastAPI detail vào chuỗi
  const formatError = (detail) => {
    if (Array.isArray(detail)) {
      return detail.map(e => {
        // nếu muốn thêm location: `${e.loc.join('.')}: ${e.msg}`
        return e.msg;
      }).join('; ');
    }
    if (typeof detail === 'string') return detail;
    return null;
  };

  // 1. Fetch dynamic categories
  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await listServiceCategories();
        setCategories([{ id: 'all', name: 'All Services', icon_name: null }].concat(data));
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    }
    fetchCats();
  }, []);

  // 2. Fetch services khi search / filter
  useEffect(() => {
    const ctl = new AbortController();
    async function fetchSvcs() {
      setLoading(true);
      setError(null);
      try {
        const { total, items } = await listServices({
          search:   searchTerm,
          category: selectedCategory,
        });
        setServices(items);
        setTotalCount(total);
      } catch (err) {
        if (!ctl.signal.aborted) {
          const detail = err.response?.data?.detail;
          const msg = formatError(detail) || 'Failed to load services';
          setError(msg);
        }
      } finally {
        if (!ctl.signal.aborted) {
          setLoading(false);
        }
      }
    }
    fetchSvcs();
    return () => ctl.abort();
  }, [searchTerm, selectedCategory]);

  // Khi tạo xong service
  const handleCreated = newSvc => {
    setServices(prev => [newSvc, ...prev]);
    setTotalCount(prev => prev + 1);
  };

  // Helper map icon_name => Lucide icon
  const iconMap = {
    hair:    <Scissors size={20} />,
    nails:   <User     size={20} />,
    color:   <Palette  size={20} />,
    beard:   <Scissors size={20} />,
  };
  const handleBookNow = async (svc) => {
    // fetch provider info nếu cần, hoặc lấy trực tiếp từ svc.provider (tuỳ cách bạn lưu)
    // fetch slot rảnh (availability) của provider đó
    const provider = await fetchProvider(svc.provider_id); // tự implement API này
    const avail = await fetchProviderAvailability(svc.provider_id); // tự implement API này
    setBookingService(svc);
    setBookingProvider(provider);
    setBookingAvailability(avail);
    setBookingMsg('');
  };
    const handleBookingConfirm = async (data) => {
    try {
      const booking = await createBooking(data);
      setBookingMsg('Booking successful! Redirecting to payment…');
      setBookingService(null);
      // điều hướng tới payment page, truyền booking.id
      navigate(`/payment/${booking.id}`);
    } catch (err) {
      setBookingMsg('Booking failed: ' + (err.response?.data?.detail || err.message));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nút My Services nằm trên cùng */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-end">
        <Link
          to="/my-services"
          className="flex items-center gap-2
            bg-gradient-to-r from-yellow-400 to-yellow-500
            hover:from-yellow-500 hover:to-yellow-600
            text-white font-semibold rounded-lg px-4 py-2
            shadow-md transition-all duration-200
            hover:scale-105 focus:outline-none"
        >
          <Scissors size={18} />
          My Services
        </Link>
      </div>
      {/* Hero + Search */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Discover Amazing Services</h1>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Browse through our professional barber & nail services
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-3 flex items-center shadow-lg">
            <Search className="text-gray-400 mx-3" size={20} />
            <input
              type="text"
              placeholder="Search for services..."
              className="flex-1 outline-none text-gray-800 py-2"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter header + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-800">
            <Filter size={20}/>
            <span className="font-medium">Filter by category:</span>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={16}/> Add Service
          </button>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === cat.id
                  ? 'bg-yellow-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
              }`}
            >
              {cat.icon_name
                ? (iconMap[cat.id] ?? <Sparkles size={20}/>)
                : <Sparkles size={20}/>}
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Status / Count */}
        {loading ? (
          <div className="text-center py-16">Loading services…</div>
        ) : error ? (
          <div className="text-red-600 text-center py-16">{error}</div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {services.length} of {totalCount} service{totalCount !== 1 && 's'}
              {selectedCategory !== 'all' && (
                <> in “{categories.find(c => c.id === selectedCategory)?.name}”</>
              )}
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(svc => (
                <div
                  key={svc.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={svc.image_url}
                      alt={svc.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {svc.popular && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                      ${svc.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{svc.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <StarRating
                        serviceId={svc.id}
                        initRating={svc.rating || 0}
                        initCount={svc.reviews_count || 0}
                        onRated={({rating, count}) => {
                          // nếu cần cập nhật state tổng của list
                          setServices(prev => prev.map(s =>
                            s.id === svc.id ? { ...s, rating, reviews_count: count } : s
                          ));
                        }}
                      />
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock size={16} />
                        <span className="text-sm">{svc.duration} min</span>
                      </div>
                    </div>

                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-colors" onClick={() => handleBookNow(svc)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No results */}
            {services.length === 0 && (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal tạo service */}
      <ServiceFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onCreated={handleCreated}
      />
          {/* Booking modal */}
    {bookingService && (
      <BookingModal
        service={bookingService}
        provider={bookingProvider}
        availability={bookingAvailability}
        onClose={() => setBookingService(null)}
        onConfirm={handleBookingConfirm}
      /> )}
    {bookingMsg && (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border rounded px-6 py-2 shadow text-green-700 font-semibold">
        {bookingMsg}
      </div>
    )}
    </div>
  );
}
