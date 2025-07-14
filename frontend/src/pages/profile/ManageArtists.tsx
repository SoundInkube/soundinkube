import React from 'react';
import { Calendar, Users, Music, BarChart2, ChevronRight } from 'lucide-react';

const ManageArtists = () => {
  const artists = [
    {
      id: 1,
      name: 'Sarah Johnson',
      genre: 'Pop, R&B',
      contractStatus: 'Active',
      upcomingEvents: 3,
      revenue: '$125,000',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'
    },
    {
      id: 2,
      name: 'Marcus Allen',
      genre: 'Hip Hop, Trap',
      contractStatus: 'Active',
      upcomingEvents: 5,
      revenue: '$210,000',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
    },
    {
      id: 3,
      name: 'The Velvet Sound',
      genre: 'Indie Rock',
      contractStatus: 'Active',
      upcomingEvents: 4,
      revenue: '$95,000',
      image: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141414] to-black pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Manage Artists</h1>
          <p className="text-gray-400 mt-2">View and manage all artists under your label</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="netflix-card">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800">
                <Users size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Total Artists</h3>
                <p className="text-3xl font-bold text-white mt-1">{artists.length}</p>
              </div>
            </div>
          </div>
          
          <div className="netflix-card">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800">
                <Music size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Releases This Year</h3>
                <p className="text-3xl font-bold text-white mt-1">12</p>
              </div>
            </div>
          </div>
          
          <div className="netflix-card">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800">
                <Calendar size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Upcoming Events</h3>
                <p className="text-3xl font-bold text-white mt-1">12</p>
              </div>
            </div>
          </div>
          
          <div className="netflix-card">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800">
                <BarChart2 size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Total Revenue</h3>
                <p className="text-3xl font-bold text-white mt-1">$430k</p>
              </div>
            </div>
          </div>
        </div>

        {/* Artists List */}
        <div className="netflix-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-2xl font-semibold text-white">Your Artists</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {artists.map(artist => (
              <div key={artist.id} className="p-6 hover:bg-gray-900 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-lg overflow-hidden">
                      <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="md:ml-6 flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                        <p className="text-gray-400 mt-1">{artist.genre}</p>
                      </div>
                      <div className="flex flex-wrap mt-3 md:mt-0 gap-2">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-900 text-red-200">
                          {artist.contractStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Upcoming Events</p>
                        <p className="text-lg font-semibold text-white">{artist.upcomingEvents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Annual Revenue</p>
                        <p className="text-lg font-semibold text-white">{artist.revenue}</p>
                      </div>
                      <div className="flex items-center justify-start md:justify-end mt-4 md:mt-0">
                        <button className="flex items-center text-red-500 hover:text-red-400 transition-colors">
                          <span className="mr-1">View Details</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageArtists;
