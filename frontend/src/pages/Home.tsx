import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Users, Calendar, MapPin, Star, Play, HeartHandshake, Headphones, Mic, Guitar, Piano } from 'lucide-react';
import SearchDropdown from '../components/search/SearchDropdown';

const Home = () => {
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearchSelect = (result: any) => {
    setSearchResults(result);
    console.log('Selected:', result);
  };

  const featuredServices = [
    {
      icon: <Music className="h-8 w-8 text-white" />,
      title: "Find Gigs",
      description: "Discover music opportunities and events near you",
      link: "/gigs",
      gradient: "from-red-600 to-red-800"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Hire Professionals", 
      description: "Connect with skilled musicians and audio experts",
      link: "/hire-professionals",
      gradient: "from-red-700 to-red-900"
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-white" />,
      title: "Collaborate",
      description: "Find artists and producers for your next project", 
      link: "/collaboration",
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: "JamPads",
      description: "Book rehearsal spaces and recording studios",
      link: "/jam-pads", 
      gradient: "from-red-600 to-red-800"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-black"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Music Universe
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect, Create, and Collaborate with musicians, producers, and industry professionals worldwide
          </p>
          
          {/* Functional Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchDropdown onResultSelect={handleSearchSelect} />
            {searchResults && (
              <div className="mt-4 p-4 bg-[#141414] border border-gray-700 rounded-lg">
                <p className="text-green-400 text-sm">Selected: {searchResults.title}</p>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
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
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Explore Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <Link key={index} to={service.link} className="netflix-card group hover:scale-105 transition-transform duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 service-icon`}>
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
    </div>
  );
};

export default Home;
