import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Menu, X, User, LogOut, Settings, Users, BarChart2, ChevronDown, Calendar, Building, GraduationCap, Music } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Role-based home page navigation
  const getHomePage = () => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'record_label':
      case 'artist_manager':
      case 'music_professional':
      case 'client':
        return '/dashboard';
      default:
        return '/';
    }
  };

  // Role-based navigation items
  const getNavigationItems = () => {
    if (!user) {
      return [
        { name: 'Hire Pros', path: '/hire-professionals' },
        { name: 'JamPads', path: '/jam-pads' },
        { name: 'Music Schools', path: '/music-schools' }
      ];
    }

    switch (user.role) {
      case 'record_label':
      case 'artist_manager':
        return [
          { name: 'Collaborate', path: '/collaboration' },
          { name: 'Marketplace', path: '/marketplace' },
          { name: 'Gigs', path: '/gigs' }
        ];
      
      case 'music_professional':
        return [
          { name: 'Marketplace', path: '/marketplace' },
          { name: 'Gigs', path: '/gigs' },
          { name: 'JamPads', path: '/jam-pads' },
          { name: 'Music Schools', path: '/music-schools' },
          { name: 'Collaborate', path: '/collaboration' }
        ];
      
      case 'client':
        return [
          { name: 'Marketplace', path: '/marketplace' },
          { name: 'Music Professionals', path: '/hire-professionals' },
          { name: 'Music Schools', path: '/music-schools' }
        ];
      
      default:
        return [
          { name: 'Gigs', path: '/gigs' },
          { name: 'Marketplace', path: '/marketplace' },
          { name: 'Collaborate', path: '/collaboration' }
        ];
    }
  };

  const getDropdownItems = () => {
    if (!user) return [];

    const commonItems = [
      { name: 'Profile', path: '/profile', icon: <User size={16} /> },
      { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 size={16} /> }
    ];

    switch (user.role) {
      case 'record_label':
        return [
          ...commonItems,
          { name: 'Manage Artists', path: '/manage-artists', icon: <Users size={16} /> },
          { name: 'Revenue Analytics', path: '/revenue-analytics', icon: <BarChart2 size={16} /> },
          { name: 'Contracts', path: '/contracts', icon: <Building size={16} /> },
          { name: 'Settings', path: '/profile/settings', icon: <Settings size={16} /> }
        ];
      
      case 'artist_manager':
        return [
          ...commonItems,
          { name: 'Artist Roster', path: '/artist-manager/roster', icon: <Users size={16} /> },
          { name: 'Revenue Tracker', path: '/artist-manager/revenue', icon: <BarChart2 size={16} /> },
          { name: 'Booking Calendar', path: '/artist-manager/calendar', icon: <Calendar size={16} /> },
          { name: 'Settings', path: '/profile/settings', icon: <Settings size={16} /> }
        ];
      
      case 'music_professional':
        return [
          ...commonItems,
          { name: 'My Bookings', path: '/my-bookings', icon: <Calendar size={16} /> },
          { name: 'My Students', path: '/my-students', icon: <GraduationCap size={16} /> },
          { name: 'Equipment Listings', path: '/my-equipment-listings', icon: <Music size={16} /> },
          { name: 'Settings', path: '/profile/settings', icon: <Settings size={16} /> }
        ];
      
      case 'client':
        return [
          ...commonItems,
          { name: 'My Bookings', path: '/my-bookings', icon: <Calendar size={16} /> },
          { name: 'Saved Professionals', path: '/saved-professionals', icon: <Users size={16} /> },
          { name: 'Settings', path: '/profile/settings', icon: <Settings size={16} /> }
        ];
      
      default:
        return commonItems;
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'record_label': return 'Record Label';
      case 'artist_manager': return 'Artist Manager';
      case 'music_professional': return 'Music Professional';
      case 'client': return 'Client';
      default: return role;
    }
  };

  const navigationItems = getNavigationItems();
  const dropdownItems = getDropdownItems();

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Clicking goes to role-specific home */}
          <Link to={getHomePage()} className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="SoundInkube" 
              className="h-10 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-[#E50914] transition-colors px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Profile or Login */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{user.username}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#141414] border border-gray-800 rounded-md shadow-xl overflow-hidden fade-in">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-sm text-white font-medium">{user.username}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                      {user.role && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-red-900 text-red-200">
                          {getRoleDisplayName(user.role)}
                        </span>
                      )}
                    </div>
                    
                    <div className="py-2">
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </Link>
                      ))}
                      
                      <hr className="my-2 border-gray-800" />
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        <LogOut size={16} />
                        <span className="ml-3">Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-[#E50914] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="netflix-btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[#E50914] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-gray-800">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-white hover:text-[#E50914] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-gray-800 pt-3 mt-3">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white">{user.username}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                    {user.role && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-red-900 text-red-200">
                        {getRoleDisplayName(user.role)}
                      </span>
                    )}
                  </div>
                  
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  ))}
                  
                  <button
                    onclick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="ml-3">Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-800 pt-3 mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white hover:text-[#E50914] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 netflix-btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
