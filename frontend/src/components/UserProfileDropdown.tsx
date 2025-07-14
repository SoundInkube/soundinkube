import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut,
  Users,
  BarChart2,
  CreditCard,
  Clock,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Get navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { icon: User, label: 'Profile Settings', path: '/profile' },
      { icon: Settings, label: 'Account Settings', path: '/settings' },
    ];

    if (user?.role === 'music_professional') {
      return [
        ...baseLinks,
        { icon: BarChart2, label: 'Analytics', path: '/analytics' },
        { icon: Calendar, label: 'Bookings', path: '/my-bookings' },
      ];
    } 
    
    if (user?.role === 'client') {
      return [
        ...baseLinks,
        { icon: Calendar, label: 'My Bookings', path: '/my-bookings' },
        { icon: Clock, label: 'Booking History', path: '/booking-history' },
      ];
    }
    
    if (user?.role === 'artist_manager' || user?.role === 'record_label') {
      return [
        ...baseLinks,
        { icon: Users, label: 'Manage Artists', path: '/manage-artists' },
        { icon: CreditCard, label: 'Contracts', path: '/contracts' },
        { icon: BarChart2, label: 'Revenue Analytics', path: '/revenue-analytics' },
        { icon: Calendar, label: 'Business Dashboard', path: '/business' },
      ];
    }

    return baseLinks;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div className="h-8 w-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
        <span className="text-sm font-medium text-white hidden sm:inline">
          {user?.username || 'Account'}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 profile-dropdown fade-in z-50">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="text-sm text-white font-medium truncate">
                {user?.username || 'Guest'}
              </p>
              <p className="text-xs text-gray-400 truncate mt-1">
                {user?.email || ''}
              </p>
              {user?.role && (
                <div className="mt-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-900 text-red-200">
                    {user?.role === 'music_professional' ? 'Professional' : 
                     user?.role === 'client' ? 'Client' : 
                     user?.role === 'artist_manager' ? 'Artist Manager' :
                     user?.role === 'record_label' ? 'Record Label' : 'User'}
                  </span>
                </div>
              )}
            </div>

            <div className="py-1">
              {getNavLinks().map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(link.path);
                      setIsOpen(false);
                    }}
                    className="profile-dropdown-item flex items-center w-full"
                  >
                    <IconComponent size={16} className="mr-3" />
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="py-1 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="profile-dropdown-item flex items-center text-red-400 hover:text-red-300 w-full"
              >
                <LogOut size={16} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
