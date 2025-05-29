import api from '../utils/api';

export async function listServicesByProvider(params = { page:1, size:20 }) {
  const res = await api.get('/services/me', { params });
  return res.data;
}

export async function createService(data) {
  const res = await api.post('/services', data);
  return res.data;
}

export async function updateService(id, data) {
  const res = await api.patch(`/services/me/${id}`, data);
  return res.data;
}

export async function deleteService(id) {
  const res = await api.delete(`/services/me/${id}`);
  return res.status === 204;
}