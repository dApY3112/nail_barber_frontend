import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBooking }  from '../api/bookings';
import { fetchService }  from '../api/services';
import { createTransaction } from '../api/transactions';

export default function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

useEffect(() => {
  async function loadData() {
    let b;
    try {
      // 1) Lấy booking và lưu vào biến cục bộ b
      b = await fetchBooking(bookingId);
      setBooking(b);
    } catch (err) {
      setError('Không lấy được booking: ' + (err.response?.data?.detail || err.message));
      setLoading(false);
      return;
    }

    try {
      // 2) Dùng luôn b.service_id (không dùng booking.service_id)
      const svc = await fetchService(b.service_id);
      setService(svc);
    } catch (err) {
      setError('Không lấy được service: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, [bookingId]);

  const handlePay = async () => {
    if (!booking || !service) return;
    setProcessing(true);
    setError('');
    try {
      const tx = await createTransaction({
        booking_id: booking.id,
        amount: service.price,
        currency: booking.currency || 'USD',
        payment_method: paymentMethod,
      });
      navigate(`/transactions/${tx.id}`);
    } catch (err) {
      setError('Thanh toán thất bại: ' + (err.response?.data?.detail || err.message));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Thanh toán cho Booking #{booking.id}</h1>
      <p className="mb-2">Dịch vụ: <strong>{service.name}</strong></p>
      <p className="mb-4">Tổng tiền: <strong>${service.price}</strong></p>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Phương thức thanh toán</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="card">Credit / Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>

      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {processing ? 'Processing…' : 'Pay Now'}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}