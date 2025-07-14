import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Music, Users, Calendar, MapPin, Star, Play, HeartHandshake, Headphones, Mic, Guitar, Piano } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredServices = [
    {
      icon: <Music className="h-8 w-8 text-[#E50914]" />,
      title: "Find Gigs",
      description: "Discover music opportunities and events near you",
      link: "/gigs",
      gradient: "from-red-600 to-red-800"
    },
    {
      icon: <Users className="h-8 w-8 text-[#E50914]" />,
      title: "Hire Professionals",
      description: "Connect with skilled musicians and audio experts",
      link: "/hire-professionals",
      gradient: "from-red-700 to-red-900"
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-[#E50914]" />,
      title: "Collaborate",
      description: "Find artists and producers for your next project",
      link: "/collaboration",
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: <MapPin className="h-8 w-8 text-[#E50914]" />,
      title: "JamPads",
      description: "Book rehearsal spaces and recording studios",
      link: "/jam-pads",
      gradient: "from-red-600 to-red-800"
    }
  ];

  const musicCategories = [
    { name: 'Rock', count: '2.5k+ gigs', color: 'bg-gradient-to-r from-red-600 to-red-800' },
    { name: 'Pop', count: '3.2k+ gigs', color: 'bg-gradient-to-r from-red-700 to-red-900' },
    { name: 'Jazz', count: '1.8k+ gigs', color: 'bg-gradient-to-r from-red-500 to-red-700' },
    { name: 'Electronic', count: '2.1k+ gigs', color: 'bg-gradient-to-r from-red-600 to-red-800' },
    { name: 'Hip Hop', count: '2.8k+ gigs', color: 'bg-gradient-to-r from-red-700 to-red-900' },
    { name: 'Classical', count: '1.5k+ gigs', color: 'bg-gradient-to-r from-red-500 to-red-700' }
  ];

  const featuredProfessionals = [
    {
      name: "Sarah Johnson",
      role: "Vocalist & Songwriter",
      rating: 4.9,
      reviews: 127,
      hourlyRate: "$75/hr",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      specialties: ["Pop", "R&B", "Soul"]
    },
    {
      name: "Mike Chen",
      role: "Producer & Mix Engineer",
      rating: 4.8,
      reviews: 203,
      hourlyRate: "$90/hr",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      specialties: ["Hip Hop", "Electronic", "Pop"]
    },
    {
      name: "Emma Rodriguez",
      role: "Guitarist & Composer",
      rating: 4.9,
      reviews: 156,
      hourlyRate: "$60/hr",
      image: "https://images.unsplash.com/photo-1494790108755-2616c4ca27b4?w=300",
      specialties: ["Rock", "Blues", "Jazz"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-black"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Music Universe
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect, Create, and Collaborate with musicians, producers, and industry professionals worldwide
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Search for musicians, gigs, studios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#141414] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E50914] transition-colors text-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 netflix-btn-primary">
                Search
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/gigs" className="netflix-btn-primary flex items-center">
              <Music className="mr-2 h-5 w-5" />
              Find Gigs
            </Link>
            <Link to="/hire-professionals" className="netflix-btn-secondary flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Hire Talent
            </Link>
            <Link to="/jam-pads" className="netflix-btn-secondary flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Book Studios
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <Link key={index} to={service.link} className="netflix-card group hover:scale-105 transition-transform duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#E50914] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Music Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Music Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {musicCategories.map((category, index) => (
              <div key={index} className="netflix-card text-center group cursor-pointer">
                <div className={`h-20 w-20 mx-auto rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Top-Rated Professionals</h2>
            <Link to="/hire-professionals" className="netflix-btn-secondary">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProfessionals.map((pro, index) => (
              <div key={index} className="netflix-card">
                <div className="flex items-start space-x-4">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{pro.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{pro.role}</p>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-white">{pro.rating}</span>
                      <span className="ml-2 text-sm text-gray-400">({pro.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pro.specialties.map((specialty, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-red-900 text-red-200 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <p className="text-[#E50914] font-semibold">{pro.hourlyRate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E50914] to-[#b8070f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Musical Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of musicians, producers, and industry professionals who trust SoundInkube
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              Get Started Free
            </Link>
            <Link to="/about" className="bg-white bg-opacity-20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-30 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
