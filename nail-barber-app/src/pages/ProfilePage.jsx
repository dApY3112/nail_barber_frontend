import { useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut, Edit, Mail, Phone } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  const handleSignOut = () => {
    logout();
    navigate('/', { replace: true });
  };

  // Nếu chưa login
  if (!user) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Profile</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon size={32} className="text-gray-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Sign in to view your profile</h3>
              <p className="text-gray-500">Manage bookings and preferences</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/signin')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Khi đã login
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm space-y-6 max-w-md">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon size={40} className="text-gray-400" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{user.first_name} {user.last_name}</h3>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail size={20} className="text-yellow-600" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={20} className="text-yellow-600" />
            <span>{user.phone}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 border border-yellow-500 text-yellow-600 py-2 rounded-lg hover:bg-yellow-50 transition"
          >
            <Edit size={18} /> Edit Profile
          </button>
          <button
            onClick={handleSignOut}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}