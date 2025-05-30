// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import * as authApi from '../api/auth';
import * as usersApi from '../api/users';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser]   = useState(null);

  // khi token thay đổi, fetch profile
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      usersApi.fetchUserProfile().then(setUser).catch(() => setUser(null));
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async ({ email, password }) => {
    const data = await authApi.login(email, password);
    setToken(data.access_token);
    return data;
  };

  const signup = async (userData) => {
    const newUser = await authApi.signup(userData);
    return newUser;
  };

  const logout = () => {
    setToken(null);
  };

  // hàm gọi lại API để cập nhật context.user
  const refreshUser = async () => {
    try {
      const fresh = await usersApi.fetchUserProfile();
      setUser(fresh);
      return fresh;
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      login,
      signup,
      logout,
      refreshUser    // <--- expose hàm này
    }}>
      {children}
    </AuthContext.Provider>
  );
}
