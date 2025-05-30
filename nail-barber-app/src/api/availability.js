// src/api/availability.js
import api from '../utils/api';

export async function listAvailability(providerId) {
  const res = await api.get(`/availability/provider/${providerId}`);
  return res.data; // Array<AvailabilityResponse>
}

export async function listMyAvailability() {
  const res = await api.get('/availability/me');
  return res.data; // Array<AvailabilityResponse>
}


export async function createAvailability(data) {
  const res = await api.post('/availability/me', data);
  return res.data; // AvailabilityResponse
}

/** Provider-only: xóa availability */
export async function deleteAvailability(id) {
  const res = await api.delete(`/availability/me/${id}`);
  return res.status === 204;
}
