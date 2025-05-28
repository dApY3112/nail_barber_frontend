import { User } from 'lucide-react';

function ProfilePage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Sign in to view your profile</h3>
            <p className="text-gray-500">Manage bookings and preferences</p>
          </div>
        </div>
        <button className="w-full bg-black text-white py-2 rounded-lg">Sign In</button>
      </div>
    </div>
  );
}

export default ProfilePage;