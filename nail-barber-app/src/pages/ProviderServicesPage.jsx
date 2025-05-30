// src/pages/ProviderServicesPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }           from 'react-router-dom';
import { listServices }        from '../api/services';
import { listAvailability }    from '../api/availability';
import { fetchProvider }       from '../api/providers';
import { createBooking }       from '../api/bookings';
import BookingModal            from '../components/BookingModal';

export default function ProviderServicesPage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider,     setProvider]    = useState(null);
  const [services,     setServices]    = useState([]);
  const [availability, setAvailability]= useState([]);
  const [loading,      setLoading]     = useState(true);
  const [error,        setError]       = useState(null);

  const [bookingService, setBookingService] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetchProvider(providerId),                                    // lấy info provider
      listServices({ provider_id: providerId, page:1, size:100 }),  // chỉ fetch service của provider
      listAvailability(providerId),                                 // lấy availability
    ])
      .then(([prov, svcData, avail]) => {
        setProvider(prov);
        // listServices trả về { total, items }
        setServices(svcData.items ?? svcData);
        setAvailability(avail);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load provider’s services or availability.');
      })
      .finally(() => setLoading(false));
  }, [providerId]);

  const handleBookingConfirm = async ({ service_id, start_datetime, end_datetime }) => {
    try {
      // 1) tạo booking
      const booking = await createBooking({ service_id, start_datetime, end_datetime });
      // 2) điều hướng sang payment page
      navigate(`/payment/${booking.id}`);
    } catch (err) {
      console.error(err);
      // bạn có thể show toast / alert lỗi ở đây nếu muốn
    }
  };

  if (loading) return <div className="text-center py-12">Loading…</div>;
  if (error  ) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-6">
      <h2 className="text-2xl font-bold">
        Services by {provider?.company_name}
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {services.map(svc => (
          <div key={svc.id} className="bg-white rounded shadow p-4">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-semibold">{svc.name}</h3>
              <span className="font-bold text-yellow-600">${svc.price}</span>
            </div>
            <p className="text-gray-600 mb-4">{svc.description}</p>
            <button
              onClick={() => setBookingService(svc)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2 font-semibold"
            >
              Book This Service
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <BookingModal
          service={bookingService}
          provider={provider}
          availability={availability}
          onClose={() => setBookingService(null)}
          onConfirm={handleBookingConfirm}
        />
      )}

    </div>
  );
}
