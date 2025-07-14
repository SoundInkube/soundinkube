import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Menu, X, User, LogOut, Settings, Users, BarChart2, ChevronDown } from 'lucide-react';

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

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#E50914]">SoundInkube</h1>
          </Link>

          {/* Desktop Navigation - ALL ORIGINAL LINKS */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Home</Link>
            <Link to="/gigs" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Gigs</Link>
            <Link to="/marketplace" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Marketplace</Link>
            <Link to="/jam-pads" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">JamPads</Link>
            <Link to="/music-schools" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Music Schools</Link>
            <Link to="/hire-professionals" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Hire Pros</Link>
            <Link to="/collaboration" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Collaborate</Link>
            
            {/* Role-specific navigation */}
            {user?.role === 'record_label' && (
              <Link to="/business" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Label Dashboard</Link>
            )}
            {user?.role === 'artist_manager' && (
              <Link to="/artist-manager/dashboard" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Manager Dashboard</Link>
            )}
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
                          {user.role === 'record_label' ? 'Record Label' : user.role === 'artist_manager' ? 'Artist Manager' : 'Music Professional'}
                        </span>
                      )}
                    </div>
                    <div className="py-1">
                      <button onClick={() => navigate('/profile')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                        <User size={16} className="mr-3" />Profile
                      </button>
                      <button onClick={() => navigate('/dashboard')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                        <BarChart2 size={16} className="mr-3" />Dashboard
                      </button>
                      
                      {/* Role-specific menu items */}
                      {user.role === 'record_label' && (
                        <>
                          <button onClick={() => navigate('/manage-artists')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                            <Users size={16} className="mr-3" />Manage Artists
                          </button>
                          <button onClick={() => navigate('/revenue-analytics')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                            <BarChart2 size={16} className="mr-3" />Revenue Analytics
                          </button>
                        </>
                      )}
                      
                      {user.role === 'artist_manager' && (
                        <>
                          <button onClick={() => navigate('/artist-manager/roster')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                            <Users size={16} className="mr-3" />Artist Roster
                          </button>
                          <button onClick={() => navigate('/artist-manager/revenue')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                            <BarChart2 size={16} className="mr-3" />Revenue Tracker
                          </button>
                        </>
                      )}
                      
                      <button onClick={() => navigate('/my-bookings')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                        <Settings size={16} className="mr-3" />My Bookings
                      </button>
                      <button onClick={() => navigate('/profile/settings')} className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors">
                        <Settings size={16} className="mr-3" />Settings
                      </button>
                    </div>
                    <div className="py-1 border-t border-gray-800">
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors">
                        <LogOut size={16} className="mr-3" />Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-[#E50914] transition-colors px-3 py-2">Log in</Link>
                <Link to="/signup" className="netflix-btn-primary">Sign up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-400 hover:text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 border-t border-gray-800 fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Home</Link>
            <Link to="/gigs" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Gigs</Link>
            <Link to="/marketplace" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Marketplace</Link>
            <Link to="/jam-pads" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">JamPads</Link>
            <Link to="/music-schools" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Music Schools</Link>
            <Link to="/hire-professionals" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Hire Professionals</Link>
            <Link to="/collaboration" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Collaborate</Link>
            {user && (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Dashboard</Link>
                <Link to="/profile" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">Profile</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
