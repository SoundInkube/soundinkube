import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Search, 
  Bell, 
  Settings,
  LogOut,
  BarChart3,
  Music,
  Users,
  Calendar,
  CreditCard,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  isScrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  const isActivePath = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getProfileLinks = () => {
    const baseLinks = [
      { icon: User, label: 'Profile Settings', path: '/profile' },
      { icon: Settings, label: 'Account Settings', path: '/settings' },
    ];

    if (user?.role === 'music_professional') {
      return [
        ...baseLinks,
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Music, label: 'My Listings', path: '/my-listings' },
        { icon: Users, label: 'Collaborations', path: '/my-collaborations' },
        { icon: Calendar, label: 'My Students', path: '/my-students' },
      ];
    }

    if (user?.role === 'client') {
      return [
        ...baseLinks,
        { icon: Calendar, label: 'My Bookings', path: '/my-bookings' },
        { icon: Users, label: 'Saved Professionals', path: '/saved-professionals' },
        { icon: CreditCard, label: 'Payment History', path: '/payment-history' },
      ];
    }

    if (user?.role === 'artist_manager' || user?.role === 'record_label') {
      return [
        ...baseLinks,
        { icon: Users, label: 'Manage Artists', path: '/manage-artists' },
        { icon: CreditCard, label: 'Contracts', path: '/contracts' },
        { icon: BarChart3, label: 'Revenue Analytics', path: '/revenue-analytics' },
      ];
    }

    return baseLinks;
  };

  return (
    <nav className={`netflix-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <span className="netflix-h3 text-red-600 group-hover:text-red-500 transition-colors">
                SoundInkube
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`netflix-nav-link ${isActivePath('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/hire-professionals"
              className={`netflix-nav-link ${isActivePath('/hire-professionals') ? 'active' : ''}`}
            >
              Find Talent
            </Link>
            <Link
              to="/marketplace"
              className={`netflix-nav-link ${isActivePath('/marketplace') ? 'active' : ''}`}
            >
              Marketplace
            </Link>
            <Link
              to="/collaboration"
              className={`netflix-nav-link ${isActivePath('/collaboration') ? 'active' : ''}`}
            >
              Collaborate
            </Link>
            {(user?.role === 'artist_manager' || user?.role === 'record_label') && (
              <Link
                to="/dashboard"
                className={`netflix-nav-link ${isActivePath('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="netflix-input pl-10 pr-4 py-2.5 rounded-full border-2 focus:ring-0"
                placeholder="Search for music services, artists..."
              />
            </form>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800">
              <Bell className="h-5 w-5" />
            </button>
            
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white group-hover:text-gray-300">
                    {user.username}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 profile-dropdown fade-in">
                    <div className="py-1">
                      {getProfileLinks().map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="profile-dropdown-item flex items-center space-x-3"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                      <hr className="my-2 border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="profile-dropdown-item flex items-center space-x-3 w-full text-left text-red-400 hover:text-red-300"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="netflix-btn-secondary px-4 py-2 text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="netflix-btn-primary px-4 py-2 text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black bg-opacity-95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="netflix-input pl-10 pr-4 py-2.5 rounded-full text-sm"
                  placeholder="Search..."
                />
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActivePath('/') ? 'text-white bg-red-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/hire-professionals"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActivePath('/hire-professionals') ? 'text-white bg-red-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Talent
            </Link>
            <Link
              to="/marketplace"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActivePath('/marketplace') ? 'text-white bg-red-600' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>

            {/* Mobile User Menu */}
            {user ? (
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center px-3 py-2">
                  <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.username}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </div>
                {getProfileLinks().map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-800 space-y-2 px-3">
                <Link
                  to="/login"
                  className="block w-full text-center netflix-btn-secondary py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center netflix-btn-primary py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
