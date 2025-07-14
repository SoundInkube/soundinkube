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
      gradient: 'from-red-500 to-red-500',
      count: '2.5k+ services'
    },
    {
      title: 'Vocals & Singing',
      description: 'Lead vocals, backing vocals, voice-over',
      icon: Mic,
      gradient: 'from-red-500 to-cyan-500',
      count: '1.8k+ services'
    },
    {
      title: 'Songwriting',
      description: 'Lyrics, melodies, song arrangement',
      icon: Music,
      gradient: 'from-red-500 to-emerald-500',
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
    <div className="text-white min-h-screen bg-zinc-900">
      {/* Navigation */}
      <nav className="text-white marketplace-navbar">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white flex h-16 items-center justify-between">
            <div className="text-white flex items-center space-x-8">
              <Link to="/" className="text-white flex items-center space-x-2">
                <Music className="text-white h-8 w-8 text-red-600" />
                <span className="text-white text-xl font-bold text-white">SoundInkube</span>
              </Link>
              <div className="text-white hidden md:flex items-center space-x-6">
                <Link to="/browse" className="text-white text-white hover:text-red-600 font-medium">
                  Browse Services
                </Link>
                <Link to="/how-it-works" className="text-white text-white hover:text-red-600 font-medium">
                  How It Works
                </Link>
                <Link to="/become-seller" className="text-white text-white hover:text-red-600 font-medium">
                  Become a Seller
                </Link>
              </div>
            </div>
            <div className="text-white flex items-center space-x-4">
              <Link to="/login" className="text-white text-white hover:text-red-600 font-medium">
                Sign In
              </Link>
              <Link to="/signup">
                <Button className="text-white marketplace-button-primary">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-white hero-section">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h1 className="text-white text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Find the Perfect
              <span className="text-white bg-gradient-to-r from-red-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}Music Professional
              </span>
            </h1>
            <p className="text-white mt-6 text-lg leading-8 text-white max-w-3xl mx-auto">
              Connect with talented musicians, producers, and audio engineers from around the world. 
              Get your music project done professionally, on time, and on budget.
            </p>
            
            {/* Search Bar */}
            <div className="text-white mt-10 max-w-2xl mx-auto">
              <div className="text-white search-bar">
                <div className="text-white relative">
                  <Search className="text-white absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                  <Input
                    type="text"
                    placeholder="Search for music services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-white search-input"
                  />
                  <Button className="text-white absolute right-2 top-1/2 transform -translate-y-1/2 marketplace-button-primary h-10">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="text-white mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-white text-sm text-white">Popular:</span>
              {['Beat Making', 'Vocal Recording', 'Mixing & Mastering', 'Songwriting'].map((term) => (
                <button
                  key={term}
                  className="text-white text-sm text-red-600 hover:text-red-600 font-medium underline-offset-4 hover:underline"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music Categories */}
      <section className="text-white py-16 bg-black">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-12">
            <h2 className="text-white text-3xl font-bold text-white sm:text-4xl">
              Explore Music Services
            </h2>
            <p className="text-white mt-4 text-lg text-white">
              Find the perfect professional for your music project
            </p>
          </div>
          
          <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {musicCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.title} className={`category-card bg-gradient-to-br ${category.gradient}`}>
                  <div className="text-white relative z-10">
                    <IconComponent className="text-white h-8 w-8 mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-white text-white/80 text-sm mb-4">{category.description}</p>
                    <div className="text-white flex items-center justify-between">
                      <span className="text-white text-white/90 text-sm font-medium">{category.count}</span>
                      <ArrowRight className="text-white h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="text-white py-16 bg-zinc-900">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-12">
            <h2 className="text-white text-3xl font-bold text-white sm:text-4xl">
              Featured Services
            </h2>
            <p className="text-white mt-4 text-lg text-white">
              Hand-picked services from our top-rated professionals
            </p>
          </div>
          
          <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="text-white service-card">
                <div className="text-white relative">
                  <div className="text-white h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <Play className="text-white h-12 w-12 text-white" />
                  </div>
                  <Badge className={`absolute top-3 left-3 ${
                    service.level === 'Top Rated' ? 'top-rated-badge' : 'pro-badge'
                  }`}>
                    {service.level}
                  </Badge>
                </div>
                
                <CardContent className="text-white p-4">
                  <div className="text-white flex items-center space-x-2 mb-2">
                    <Avatar className="text-white h-6 w-6">
                      <AvatarFallback className="text-white text-xs bg-netflix-red text-netflix-red">
                        {service.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white text-sm font-medium text-white">{service.artist}</span>
                  </div>
                  
                  <h3 className="text-white font-semibold text-white mb-2 line-clamp-2">
                    {service.title}
                  </h3>
                  
                  <div className="text-white flex items-center space-x-1 mb-3">
                    <Star className="text-white h-4 w-4 text-netflix-red fill-current" />
                    <span className="text-white text-sm font-medium text-white">{service.rating}</span>
                    <span className="text-white text-sm text-white">({service.reviews})</span>
                  </div>
                  
                  <div className="text-white flex flex-wrap gap-1 mb-3">
                    {service.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-white flex items-center justify-between">
                    <div>
                      <span className="text-white text-sm font-bold text-white">From ${service.price}</span>
                      <p className="text-white text-xs text-white">{service.deliveryTime} delivery</p>
                    </div>
                    <Button size="sm" className="text-white marketplace-button-primary text-xs">
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
      <section className="text-white py-16 bg-green-50">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-white feature-icon mx-auto mb-4">
                <Users className="text-white h-6 w-6" />
              </div>
              <div className="text-white text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white text-white">Music Professionals</div>
            </div>
            <div>
              <div className="text-white feature-icon mx-auto mb-4">
                <Award className="text-white h-6 w-6" />
              </div>
              <div className="text-white text-3xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white text-white">Projects Completed</div>
            </div>
            <div>
              <div className="text-white feature-icon mx-auto mb-4">
                <TrendingUp className="text-white h-6 w-6" />
              </div>
              <div className="text-white text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-white text-white">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-white py-16 bg-zinc-900">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-12">
            <h2 className="text-white text-3xl font-bold text-white sm:text-4xl">
              What Our Users Say
            </h2>
          </div>
          
          <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-white testimonial-card">
                <div className="text-white flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-white h-5 w-5 text-netflix-red fill-current" />
                  ))}
                </div>
                <p className="text-white text-white mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="text-white font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white text-sm text-white">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white py-16 bg-gradient-to-r from-red-600 to-emerald-600">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to Start Your Music Project?
          </h2>
          <p className="text-white text-lg text-netflix-red mb-8">
            Join thousands of artists who trust SoundInkube for their music needs
          </p>
          <div className="text-white flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="text-white bg-zinc-900 text-red-600 hover:bg-zinc-900 px-8 py-3 text-lg font-semibold">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" className="text-white border-white text-white hover:bg-zinc-900 hover:text-red-600 px-8 py-3 text-lg font-semibold">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white bg-netflix-dark text-white py-12">
        <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-white flex items-center space-x-2 mb-4">
                <Music className="text-white h-6 w-6 text-red-600" />
                <span className="text-white text-xl font-bold">SoundInkube</span>
              </div>
              <p className="text-white text-white">
                The world's largest marketplace for music services.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="text-white space-y-2 text-white">
                <li><Link to="#" className="text-white hover:text-white">Music Production</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Vocals & Singing</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Songwriting</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Instrumentals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="text-white space-y-2 text-white">
                <li><Link to="#" className="text-white hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Safety Center</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="text-white space-y-2 text-white">
                <li><Link to="#" className="text-white hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Careers</Link></li>
                <li><Link to="#" className="text-white hover:text-white">Press & News</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-white border-t border-gray-800 mt-8 pt-8 text-center text-white">
            <p>&copy; 2024 SoundInkube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}