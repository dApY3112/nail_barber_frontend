import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'providers', label: 'Find Providers' },
    { id: 'about', label: 'About' }
  ];

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

          {/* Auth buttons */}
<div className="hidden md:flex items-center space-x-4">
  <button
    onClick={() => setActiveTab('signin')}
    className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium"
  >
    Sign In
  </button>
  <button
    onClick={() => setActiveTab('signup')}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
  >
    Sign Up
  </button>
</div>

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
      <button
        onClick={() => {
          setActiveTab('signin');
          setMobileMenuOpen(false);
        }}
        className="text-left px-3 py-2 text-gray-700 hover:text-yellow-600"
      >
        Sign In
      </button>
      <button
        onClick={() => {
          setActiveTab('signup');
          setMobileMenuOpen(false);
        }}
        className="mx-3 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm"
      >
        Sign Up
      </button>
    </div>
  </div>
)}
      </div>
    </header>
  );
}