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
export async function updateTransactionStatus(id, status) {
  // giả sử backend expose PATCH /transactions/{id}/status
  const res = await api.patch(`/transactions/${id}/status`, { status });
  return res.data;
}
export async function listUserTransactions() {
  const res = await api.get('/transactions/me');
  return res.data;
}