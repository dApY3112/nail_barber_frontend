import { useState } from 'react';
import { Menu, X, UserCircle2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();  // user null hoặc object

  const links = [
    { to: '/',        label: 'Home',      end: true },
    { to: '/services',  label: 'Services' },
    { to: '/providers', label: 'Find Providers' },
    { to: '/about',     label: 'About'   },
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-600 border-b-2 border-yellow-500'
      : 'text-gray-700 hover:text-yellow-600';

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-yellow-500">
            Nail&Barber
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Auth / Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/signin"
                  className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-1"
              >
                <UserCircle2 size={32} className="text-yellow-600" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(open => !open)}
            className="md:hidden text-gray-700 hover:text-yellow-600"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {links.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                >
                  {label}
                </NavLink>
              ))}

              <hr className="my-2" />

              {!user ? (
                <>
                  <NavLink
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="mx-3 block bg-yellow-500 text-white px-4 py-2 rounded-full text-sm text-center"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate('/profile');
                  }}
                  className="flex items-center px-3 py-2 space-x-1 text-gray-700 hover:text-yellow-600"
                >
                  <UserCircle2 size={24} />
                  <span>Profile</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}