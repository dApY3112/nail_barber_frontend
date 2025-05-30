// File: src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProvidersPage from './pages/ProvidersPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute'
import EditProfilePage from './pages/EditProfilePage';
import MyProviderPage from './pages/MyProviderPage';
import ScrollToTop from './components/ScrollToTop';
import MyServicesPage from './pages/MyServicesPage';
import EditProviderPage from './pages/EditProviderPage';
import ProviderServicesPage from './pages/ProviderServicesPage';
import ReviewsPage from './pages/ReviewsPage';
import PaymentPage from './pages/PaymentPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import CartPage     from './pages/CartPage';
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/my-services" element={<MyServicesPage />} />
              <Route path="/payment/:bookingId" element={<PaymentPage />} />
              <Route path="/transactions/:transactionId" element={<TransactionDetailPage />} />
              <Route path="/bookings/me" element={<CartPage />} />
              <Route path="/providers" element={<ProvidersPage />} />
              <Route
                path="/providers/me"
                element={
                  <ProtectedRoute>
                    <MyProviderPage />
                  </ProtectedRoute>
                }
              />
              <Route
              path="/providers/me/edit"
              element={
                <ProtectedRoute>
                  <EditProviderPage />
                </ProtectedRoute>
              }
              />
              <Route
              path="/providers/me/services"
              element={
                <ProtectedRoute>
                  <MyServicesPage />
                </ProtectedRoute>
              }
            />
              <Route
              path="/providers/:providerId/services"
              element={
                <ProtectedRoute>
                  <ProviderServicesPage />
                </ProtectedRoute>
              }
            />
                <Route
                  path="/providers/:providerId/reviews"
                  element={<ReviewsPage />}
                />
              <Route path="/about" element={<AboutPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              {/* nếu cần các route khác, thêm ở đây */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
