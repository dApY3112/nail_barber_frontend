// src/api/auth.js
import axios from '../utils/api';

export async function login(username, password) {
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);
  const res = await axios.post(
    '/auth/login',
    data.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return res.data;
}

export async function signup(userData) {
  const res = await axios.post('/users/', userData);
  return res.data;
}
