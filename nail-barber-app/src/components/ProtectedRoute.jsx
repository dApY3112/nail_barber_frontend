// File: src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) {
    // Nếu chưa login thì chuyển về trang signin
    return <Navigate to="/signin" replace />;
  }
  return children;
}
