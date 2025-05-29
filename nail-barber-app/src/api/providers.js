import api from '../utils/api';

export async function listProviders(params = {}) {
  // params: { page, size, lat, lon, radius, category, min_rating, sort_by }
  const res = await api.get('/providers', { params });
  return res.data;
}

export async function getProviderDetail(id) {
  const res = await api.get(`/providers/${id}`);
  return res.data;
}