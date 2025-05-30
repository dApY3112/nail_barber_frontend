// src/pages/EditProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, Save, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import * as usersApi from '../api/users';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();

  // form state
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // load current profile
  useEffect(() => {
    if (user) {
      // lấy từ context hoặc fetch lại
      setForm({
        first_name: user.first_name || '',
        last_name:  user.last_name || '',
        email:      user.email || '',
        phone:      user.phone || '',
      });
    } else {
      navigate('/signin', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await usersApi.updateProfile(form);
      await refreshUser();
      // sau khi cập nhật, quay về profile view
      navigate('/profile', { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={() => navigate('/profile')}>
            <X size={24} />
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={form.first_name}
              onChange={e => handleChange('first_name', e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
              placeholder="First name"
            />
            <input
              type="text"
              required
              value={form.last_name}
              onChange={e => handleChange('last_name', e.target.value)}
              className="border px-4 py-2 rounded-lg w-full"
              placeholder="Last name"
            />
          </div>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              placeholder="Email"
            />
          </div>
          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
            <input
              type="tel"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              placeholder="Phone number"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              <Save size={18} /> {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
