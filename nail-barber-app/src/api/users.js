import api from '../utils/api';

export async function fetchUserProfile() {
  const res = await api.get('/users/me');
  return res.data;
}

export async function updateProfile(data) {
  const res = await api.patch('/users/me', data);
  return res.data;
}