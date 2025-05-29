import api from '../utils/api';

export async function createTransaction(data) {
  const res = await api.post('/transactions', data);
  return res.data;
}

export async function getTransaction(id) {
  const res = await api.get(`/transactions/${id}`);
  return res.data;
}

export async function listTransactionsByBooking(bookingId) {
  const res = await api.get(`/transactions/booking/${bookingId}`);
  return res.data;
}