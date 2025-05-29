import api from '../utils/api';

export async function createReview(data) {
  const res = await api.post('/reviews', data);
  return res.data;
}

export async function listReviewsForProvider(providerId, params = { page:1, size:20 }) {
  const res = await api.get(`/reviews/provider/${providerId}`, { params });
  return res.data;
}

export async function listReviewsByClient() {
  const res = await api.get('/reviews/client/me');
  return res.data;
}
