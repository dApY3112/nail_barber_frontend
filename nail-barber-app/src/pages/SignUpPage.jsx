// src/pages/SignUpPage.jsx
import { useState } from 'react';
import {
  Eye, EyeOff, Mail, Lock, User, Phone,
  ArrowRight, Sparkles, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to Terms of Service');
      return;
    }
    setLoading(true);
    try {
      await signup({
        first_name: formData.first_name,
        last_name:  formData.last_name,
        email:      formData.email,
        phone:      formData.phone,
        password:   formData.password,
        role:       'client'
      });
      navigate('/profile', { replace: true });
    } catch (err) {
    console.error('❌ signup error:', err.response || err);
      const msg = err.response?.data?.detail 
              || err.response?.data?.message 
              || err.message 
              || 'Sign up failed';
      setError(msg);    
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Join Our Community</h1>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Create your account and discover amazing beauty and grooming services
          </p>
        </div>
      </div>

      {/* Two-column grid: left = form (+ link), right = features/stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* === Left Column === */}
        <div className="space-y-8">
          {/* Sign Up Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Fill in your details to get started</p>
            </div>

            {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First/Last */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={e => handleInputChange('first_name', e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition text-gray-900"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={e => handleInputChange('last_name', e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition text-gray-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition text-gray-900"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition text-gray-900"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={e => handleInputChange('password', e.target.value)}
                      placeholder="Password"
                      className="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                </div>
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={e => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm Password"
                      className="w-full pl-12 pr-14 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(v => !v)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={e => handleInputChange('agreeToTerms', e.target.checked)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded mt-1"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <button type="button" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Account'}
                <ArrowRight size={20}/>
              </button>
            </form>
          </div>

          {/* “Already have an account?” link dưới form */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* === Right Column: Get Started Today & Stats === */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Started Today</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <User className="text-yellow-600" size={24}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Your Profile</h3>
                    <p className="text-gray-600">Set up your profile and preferences to get personalized recommendations</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <Sparkles className="text-yellow-600" size={24}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Services</h3>
                    <p className="text-gray-600">Explore hundreds of verified beauty and grooming professionals</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <Star className="text-yellow-600" size={24}/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Book & Enjoy</h3>
                    <p className="text-gray-600">Book your appointment and enjoy premium services at great prices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Join Thousands of Happy Customers</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">10,000+</div>
                <div className="text-yellow-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-yellow-100">Service Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">4.9</div>
                <div className="text-yellow-100">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-yellow-100">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
