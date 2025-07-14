import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Music, Users, Calendar, Building, Briefcase, Star, TrendingUp, Play, Headphones } from 'lucide-react';
import SearchDropdown from '../components/search/SearchDropdown';

const Home = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Homepage cards based on user role
  const getHomeCards = () => {
    if (!user) {
      // Not logged in - general homepage cards
      return [
        {
          title: "Find Music Professionals",
          description: "Discover talented musicians, DJs, and audio professionals for your events",
          icon: Music,
          link: "/hire-professionals",
          color: "from-blue-600 to-blue-800"
        },
        {
          title: "Explore JamPads",
          description: "Book professional recording studios and rehearsal spaces",
          icon: Headphones,
          link: "/jam-pads",
          color: "from-purple-600 to-purple-800"
        },
        {
          title: "Music Schools",
          description: "Learn from the best with our network of music education providers",
          icon: Building,
          link: "/music-schools",
          color: "from-green-600 to-green-800"
        },
        {
          title: "Join SoundInkube",
          description: "Sign up to unlock the full potential of our music platform",
          icon: Star,
          link: "/signup",
          color: "from-red-600 to-red-800"
        }
      ];
    }

    // User-specific cards based on role
    switch (user.role) {
      case 'record_label':
        return [
          {
            title: "Artist Management",
            description: "View and manage your roster of signed artists",
            icon: Users,
            link: "/manage-artists",
            color: "from-red-600 to-red-800"
          },
          {
            title: "Revenue Analytics",
            description: "Track streaming revenue and performance metrics",
            icon: TrendingUp,
            link: "/revenue-analytics",
            color: "from-green-600 to-green-800"
          },
          {
            title: "Collaboration Hub",
            description: "Connect with other labels and industry professionals",
            icon: Building,
            link: "/collaboration",
            color: "from-blue-600 to-blue-800"
          },
          {
            title: "Marketplace",
            description: "Discover new talent and industry opportunities",
            icon: Search,
            link: "/marketplace",
            color: "from-purple-600 to-purple-800"
          }
        ];

      case 'artist_manager':
        return [
          {
            title: "Artist Roster",
            description: "Manage your artists' careers and bookings",
            icon: Users,
            link: "/artist-manager/roster",
            color: "from-orange-600 to-orange-800"
          },
          {
            title: "Booking Calendar",
            description: "Schedule and track upcoming performances",
            icon: Calendar,
            link: "/artist-manager/calendar",
            color: "from-blue-600 to-blue-800"
          },
          {
            title: "Revenue Tracker",
            description: "Monitor earnings and commission tracking",
            icon: TrendingUp,
            link: "/artist-manager/revenue",
            color: "from-green-600 to-green-800"
          },
          {
            title: "Industry Gigs",
            description: "Find new opportunities for your artists",
            icon: Music,
            link: "/gigs",
            color: "from-purple-600 to-purple-800"
          }
        ];

      case 'music_professional':
        return [
          {
            title: "My Bookings",
            description: "View and manage your upcoming gigs",
            icon: Calendar,
            link: "/my-bookings",
            color: "from-blue-600 to-blue-800"
          },
          {
            title: "Find Gigs",
            description: "Browse available opportunities in your area",
            icon: Search,
            link: "/gigs",
            color: "from-green-600 to-green-800"
          },
          {
            title: "My Students",
            description: "Manage your music students and lessons",
            icon: Users,
            link: "/my-students",
            color: "from-purple-600 to-purple-800"
          },
          {
            title: "JamPads",
            description: "Book studios for practice and recording",
            icon: Headphones,
            link: "/jam-pads",
            color: "from-red-600 to-red-800"
          }
        ];

      case 'client':
        return [
          {
            title: "Find Professionals",
            description: "Hire musicians and DJs for your events",
            icon: Search,
            link: "/hire-professionals",
            color: "from-blue-600 to-blue-800"
          },
          {
            title: "My Bookings",
            description: "Track your upcoming events and bookings",
            icon: Calendar,
            link: "/my-bookings",
            color: "from-green-600 to-green-800"
          },
          {
            title: "Saved Professionals",
            description: "Access your favorite music professionals",
            icon: Star,
            link: "/saved-professionals",
            color: "from-purple-600 to-purple-800"
          },
          {
            title: "Music Schools",
            description: "Find music lessons and educational programs",
            icon: Building,
            link: "/music-schools",
            color: "from-orange-600 to-orange-800"
          }
        ];

      default:
        return [
          {
            title: "Explore Marketplace",
            description: "Discover music opportunities and professionals",
            icon: Search,
            link: "/marketplace",
            color: "from-blue-600 to-blue-800"
          },
          {
            title: "Browse Gigs",
            description: "Find music gigs and performance opportunities",
            icon: Music,
            link: "/gigs",
            color: "from-green-600 to-green-800"
          },
          {
            title: "Collaboration",
            description: "Connect with other music industry professionals",
            icon: Users,
            link: "/collaboration",
            color: "from-purple-600 to-purple-800"
          }
        ];
    }
  };

  const homeCards = getHomeCards();

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {user ? `Welcome back, ${user.username}!` : 'Welcome to SoundInkube'}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {user 
                ? `Your ${user.role === 'record_label' ? 'Record Label' : 
                           user.role === 'artist_manager' ? 'Artist Management' :
                           user.role === 'music_professional' ? 'Music Professional' :
                           user.role === 'client' ? 'Client' : 'Music'} homepage and tools`
                : 'Your gateway to the music industry. Connect, collaborate, and create with professionals worldwide.'
              }
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={user ? "Search your dashboard..." : "Search professionals, gigs, studios..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent text-lg"
                />
              </div>
              
              {showSearchDropdown && (
                <SearchDropdown 
                  query={searchQuery} 
                  onSelect={(result) => {
                    setSearchQuery(result.title);
                    setShowSearchDropdown(false);
                  }} 
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User-Specific Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={index}
                to={card.link}
                className="group relative overflow-hidden rounded-xl netflix-card hover:scale-105 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#E50914] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Section (only for logged in users) */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="netflix-card">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E50914] mb-2">
                  {user.role === 'record_label' ? '24' : 
                   user.role === 'artist_manager' ? '12' :
                   user.role === 'music_professional' ? '8' : '5'}
                </div>
                <div className="text-gray-400">
                  {user.role === 'record_label' ? 'Artists Managed' : 
                   user.role === 'artist_manager' ? 'Artists in Roster' :
                   user.role === 'music_professional' ? 'Upcoming Gigs' : 'Active Bookings'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {user.role === 'record_label' ? '$127K' : 
                   user.role === 'artist_manager' ? '$84K' :
                   user.role === 'music_professional' ? '$6.2K' : '$2.4K'}
                </div>
                <div className="text-gray-400">
                  {user.role === 'client' ? 'Total Spent' : 'Monthly Revenue'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {user.role === 'record_label' ? '4.8' : 
                   user.role === 'artist_manager' ? '4.7' :
                   user.role === 'music_professional' ? '4.9' : '4.6'}
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action (for non-users) */}
      {!user && (
        <div className="bg-gradient-to-r from-[#E50914] to-red-700 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-red-100 mb-8">Join thousands of music professionals on SoundInkube</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-[#E50914] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign Up Free
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#E50914] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;