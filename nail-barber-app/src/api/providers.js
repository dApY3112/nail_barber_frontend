import api from '../utils/api';

export async function listProviders({
  search,
  type,
  price_range,
  city,
  country,
  page = 1,
  size = 50,
}) {
  const params = { page, size };
  if (search)                              params.search      = search;
  if (type && type !== 'all')              params.type        = type;
  if (price_range && price_range !== 'all') params.price_range = price_range;
  if (city)                                params.city        = city;
  if (country)                             params.country     = country;

  const res = await api.get('/providers/', { params });
  return res.data;
}
export async function createProvider(data) {
  const res = await api.post('/providers/', data);
  return res.data;
}
export async function getMyProvider() {
  const res = await api.get('/providers/me');
  return res.data;
}
export async function getProviderDetail(id) {
  const res = await api.get(`/providers/${id}`);
  return res.data;
}
export async function updateProvider(data) {
  const res = await api.patch('/providers/me', data);
  return res.data; // ProviderResponse
}
export async function fetchProvider(providerId) {
  const res = await api.get(`/providers/${providerId}`);
  return res.data;
}
export async function fetchProviderAvailability(providerId) {
  const res = await api.get(`/availability/provider/${providerId}`);
  return res.data; // [{ id, day_of_week, start_time, end_time, ... }]
}