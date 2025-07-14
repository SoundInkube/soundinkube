import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Music, 
  Mic, 
  Guitar, 
  Piano, 
  Headphones, 
  Star, 
  Play,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Check
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const musicCategories = [
    {
      title: 'Music Production',
      description: 'Beat making, mixing, mastering',
      icon: Headphones,
      gradient: 'from-purple-500 to-pink-500',
      count: '2.5k+ services'
    },
    {
      title: 'Vocals & Singing',
      description: 'Lead vocals, backing vocals, voice-over',
      icon: Mic,
      gradient: 'from-blue-500 to-cyan-500',
      count: '1.8k+ services'
    },
    {
      title: 'Songwriting',
      description: 'Lyrics, melodies, song arrangement',
      icon: Music,
      gradient: 'from-green-500 to-emerald-500',
      count: '1.2k+ services'
    },
    {
      title: 'Instrumentals',
      description: 'Guitar, piano, drums, bass',
      icon: Guitar,
      gradient: 'from-orange-500 to-red-500',
      count: '3.1k+ services'
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'I will produce a professional hip-hop beat for your song',
      artist: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 4.9,
      reviews: 127,
      price: 150,
      image: '/api/placeholder/400/250',
      tags: ['Hip-Hop', 'Trap', 'R&B'],
      level: 'Pro',
      deliveryTime: '3 days'
    },
    {
      id: 2,
      title: 'I will mix and master your song to industry standards',
      artist: 'Mike Davis',
      avatar: 'MD',
      rating: 5.0,
      reviews: 89,
      price: 200,
      image: '/api/placeholder/400/250',
      tags: ['Mixing', 'Mastering', 'Audio Engineering'],
      level: 'Top Rated',
      deliveryTime: '5 days'
    },
    {
      id: 3,
      title: 'I will write catchy lyrics for your pop or rock song',
      artist: 'Emily Chen',
      avatar: 'EC',
      rating: 4.8,
      reviews: 203,
      price: 85,
      image: '/api/placeholder/400/250',
      tags: ['Songwriting', 'Pop', 'Rock'],
      level: 'Pro',
      deliveryTime: '2 days'
    },
    {
      id: 4,
      title: 'I will record professional guitar tracks for your music',
      artist: 'Alex Rodriguez',
      avatar: 'AR',
      rating: 4.9,
      reviews: 156,
      price: 120,
      image: '/api/placeholder/400/250',
      tags: ['Guitar', 'Recording', 'Session Musician'],
      level: 'Pro',
      deliveryTime: '4 days'
    }
  ];

  const testimonials = [
    {
      name: 'David Wilson',
      role: 'Independent Artist',
      content: 'SoundInkube helped me find the perfect producer for my debut album. The quality exceeded my expectations!',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Record Label A&R',
      content: 'We use SoundInkube regularly to find talented musicians and producers. The platform is fantastic.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Songwriter',
      content: 'As a freelance songwriter, SoundInkube has been incredible for connecting with artists worldwide.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="marketplace-navbar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Music className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">SoundInkube</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/browse" className="text-gray-700 hover:text-green-600 font-medium">
                  Browse Services
                </Link>
                <Link to="/how-it-works" className="text-gray-700 hover:text-green-600 font-medium">
                  How It Works
                </Link>
                <Link to="/become-seller" className="text-gray-700 hover:text-green-600 font-medium">
                  Become a Seller
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">
                Sign In
              </Link>
              <Link to="/signup">
                <Button className="marketplace-button-primary">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find the Perfect
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}Music Professional
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Connect with talented musicians, producers, and audio engineers from around the world. 
              Get your music project done professionally, on time, and on budget.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="search-bar">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for music services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 marketplace-button-primary h-10">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500">Popular:</span>
              {['Beat Making', 'Vocal Recording', 'Mixing & Mastering', 'Songwriting'].map((term) => (
                <button
                  key={term}
                  className="text-sm text-green-600 hover:text-green-700 font-medium underline-offset-4 hover:underline"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Explore Music Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find the perfect professional for your music project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {musicCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.title} className={`category-card bg-gradient-to-br ${category.gradient}`}>
                  <div className="relative z-10">
                    <IconComponent className="h-8 w-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-sm font-medium">{category.count}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Hand-picked services from our top-rated professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="service-card">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-400" />
                  </div>
                  <Badge className={`absolute top-3 left-3 ${
                    service.level === 'Top Rated' ? 'top-rated-badge' : 'pro-badge'
                  }`}>
                    {service.level}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-green-100 text-green-800">
                        {service.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">{service.artist}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{service.rating}</span>
                    <span className="text-sm text-gray-500">({service.reviews})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-gray-900">From ${service.price}</span>
                      <p className="text-xs text-gray-500">{service.deliveryTime} delivery</p>
                    </div>
                    <Button size="sm" className="marketplace-button-primary text-xs">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="feature-icon mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Music Professionals</div>
            </div>
            <div>
              <div className="feature-icon mx-auto mb-4">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="feature-icon mx-auto mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to Start Your Music Project?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Join thousands of artists who trust SoundInkube for their music needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">SoundInkube</span>
              </div>
              <p className="text-gray-400">
                The world's largest marketplace for music services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Music Production</Link></li>
                <li><Link to="#" className="hover:text-white">Vocals & Singing</Link></li>
                <li><Link to="#" className="hover:text-white">Songwriting</Link></li>
                <li><Link to="#" className="hover:text-white">Instrumentals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white">Safety Center</Link></li>
                <li><Link to="#" className="hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">About Us</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Press & News</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SoundInkube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}