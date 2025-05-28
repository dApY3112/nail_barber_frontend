import { useState } from 'react';
import { Menu, X, User, Calendar, Bell, LogOut, Settings, Heart } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isSignedIn = true, user = { name: 'Sarah Johnson', avatar: null } }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'providers', label: 'Find Providers' },
    { id: 'about', label: 'About' }
  ];

  const userMenuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Sign Out', icon: LogOut }
  ];

  const handleUserMenuClick = (itemId) => {
    if (itemId === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
    } else {
      setActiveTab(itemId);
    }
    setUserMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab('home')}
              className="text-2xl font-bold text-yellow-500 focus:outline-none"
            >
              Nail&Barber
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === item.id
                    ? 'text-yellow-600 border-b-2 border-yellow-500'
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Signed In User Section */}
          {isSignedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative text-gray-600 hover:text-yellow-600 p-2">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      getUserInitials(user.name)
                    )}
                  </div>
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">sarah.johnson@email.com</p>
                    </div>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleUserMenuClick(item.id)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                            item.id === 'logout' ? 'text-red-600 hover:text-red-700' : 'text-gray-700 hover:text-gray-900'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Original Auth buttons for not signed in */
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium">
                Sign In
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-yellow-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="text-left px-3 py-2 text-gray-700 hover:text-yellow-600"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
              <hr className="my-2" />
              
              {isSignedIn ? (
                <>
                  {/* Mobile User Info */}
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {getUserInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">sarah.johnson@email.com</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile User Menu Items */}
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleUserMenuClick(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center space-x-3 ${
                          item.id === 'logout' ? 'text-red-600' : 'text-gray-700 hover:text-yellow-600'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </>
              ) : (
                <>
                  <button className="text-left px-3 py-2 text-gray-700 hover:text-yellow-600">
                    Sign In
                  </button>
                  <button className="mx-3 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  );
}