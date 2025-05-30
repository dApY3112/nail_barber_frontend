import api from '../utils/api';

export async function createBooking(data) {
  const res = await api.post('/bookings', data);
  return res.data;
}

export async function listClientBookings() {
  const res = await api.get('/bookings/me');
  return res.data;
}

export async function listProviderBookings() {
  const res = await api.get('/bookings/provider/me');
  return res.data;
}

export async function cancelBooking(id) {
  const res = await api.patch(`/bookings/cancel/${id}`);
  return res.data;
}
export async function fetchBooking(id) {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
}