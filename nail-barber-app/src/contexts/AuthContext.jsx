// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import * as authApi from '../api/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  // Khi token thay đổi, lưu vào header và localStorage, fetch profile
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      api.get('/users/me')
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  // login – gọi API, set token
  const login = async ({ email, password }) => {
    const data = await authApi.login(email, password);
    setToken(data.access_token);
    return data;
  };
  // signup – gọi API tạo user
  const signup = async (userData) => {
    const newUser = await authApi.signup(userData);
    return newUser;
  };

  // logout – clear token & user
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
