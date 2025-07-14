import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Users, 
  Headphones, 
  Star, 
  Play, 
  TrendingUp,
  Award,
  Mic,
  Radio,
  Guitar,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Shield
} from "lucide-react";

export default function Index() {
  const { user, isAuthenticated } = useAuth();

  const featuredProfessionals = [
    {
      id: "1",
      name: "Alex Rodriguez",
      title: "Grammy-Nominated Producer",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 127,
      specialties: ["Hip-Hop", "R&B", "Pop"],
      price: "From $500",
      image: "AR",
      verified: true,
      responseTime: "< 1 hour"
    },
    {
      id: "2", 
      name: "Sarah Chen",
      title: "Mix & Master Engineer",
      location: "Nashville, TN",
      rating: 4.8,
      reviews: 89,
      specialties: ["Country", "Folk", "Indie"],
      price: "From $200",
      image: "SC",
      verified: true,
      responseTime: "< 2 hours"
    },
    {
      id: "3",
      name: "Marcus Williams",
      title: "Session Guitarist",
      location: "New York, NY", 
      rating: 4.9,
      reviews: 156,
      specialties: ["Rock", "Blues", "Jazz"],
      price: "From $150",
      image: "MW",
      verified: true,
      responseTime: "< 30 mins"
    }
  ];

  const musicSchools = [
    {
      id: "1",
      name: "Berklee College of Music",
      location: "Boston, MA",
      rating: 4.8,
      programs: ["Music Production", "Performance", "Composition"],
      students: "5,000+",
      image: "BM"
    },
    {
      id: "2",
      name: "Abbey Road Institute",
      location: "Multiple Locations",
      rating: 4.9,
      programs: ["Audio Engineering", "Music Production"],
      students: "2,500+", 
      image: "AR"
    },
    {
      id: "3",
      name: "Full Sail University",
      location: "Orlando, FL",
      rating: 4.6,
      programs: ["Music Business", "Recording Arts"],
      students: "3,200+",
      image: "FS"
    }
  ];

  const stats = [
    { label: "Music Professionals", value: "10,000+", icon: Users },
    { label: "Projects Completed", value: "50,000+", icon: CheckCircle },
    { label: "Hours of Music Created", value: "100,000+", icon: Music },
    { label: "Countries Served", value: "50+", icon: Globe }
  ];

  const features = [
    {
      icon: Music,
      title: "Professional Network",
      description: "Connect with Grammy-nominated producers, engineers, and session musicians"
    },
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All professionals are verified with proven track records and client reviews"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your projects completed quickly with our responsive professional network"
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Industry-standard quality backed by our satisfaction guarantee"
    }
  ];

  // Role-specific content
  const getRoleSpecificContent = () => {
    if (!isAuthenticated || !user) {
      return {
        title: "Welcome to SoundInkube",
        subtitle: "The ultimate platform connecting music professionals, clients, and educational institutions",
        ctaText: "Get Started",
        ctaLink: "/signup"
      };
    }

    switch (user.role) {
      case "CLIENT":
        return {
          title: `Welcome back, ${user.email.split('@')[0]}!`,
          subtitle: "Ready to bring your musical vision to life?",
          ctaText: "Find Music Professionals", 
          ctaLink: "/hire-professionals"
        };
      case "MUSIC_PROFESSIONAL":
        return {
          title: `Welcome back, ${user.email.split('@')[0]}!`,
          subtitle: "Showcase your talent and connect with new clients",
          ctaText: "Explore Opportunities",
          ctaLink: "/gigs"
        };
      case "ARTIST_MANAGER":
        return {
          title: `Welcome back, ${user.email.split('@')[0]}!`,
          subtitle: "Manage your artists and discover new talent",
          ctaText: "Manage Artists",
          ctaLink: "/manage-artists"
        };
      default:
        return {
          title: "Welcome to SoundInkube",
          subtitle: "The ultimate platform connecting music professionals, clients, and educational institutions",
          ctaText: "Get Started",
          ctaLink: "/signup"
        };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/10 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="netflix-button-primary text-lg px-8 py-4">
              <Link to={content.ctaLink}>
                {content.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-netflix-red/20 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-netflix-red" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose SoundInkube?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We provide the tools and connections you need to succeed in the music industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-netflix-red/20 rounded-full mb-4">
                      <IconComponent className="h-8 w-8 text-netflix-red" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Featured Professionals
              </h2>
              <p className="text-xl text-gray-400">
                Work with industry-leading music professionals
              </p>
            </div>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link to="/hire-professionals">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProfessionals.map((professional) => (
              <Card key={professional.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {professional.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-white">{professional.name}</h3>
                        {professional.verified && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{professional.title}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500 text-xs">{professional.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-white">{professional.rating}</span>
                      <span className="text-gray-400">({professional.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-500">{professional.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {professional.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-netflix-red font-semibold">{professional.price}</span>
                    <Button asChild size="sm" className="netflix-button-primary">
                      <Link to={`/professional/${professional.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Music Schools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Top Music Schools
              </h2>
              <p className="text-xl text-gray-400">
                Advance your skills at premier music institutions
              </p>
            </div>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link to="/find-music-schools">View All Schools</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicSchools.map((school) => (
              <Card key={school.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {school.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{school.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500 text-sm">{school.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-white">{school.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-500">{school.students} students</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {school.programs.map((program, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild size="sm" className="w-full netflix-button-primary">
                    <Link to={`/school/${school.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-netflix-red/20 via-transparent to-netflix-red/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Elevate Your Music?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of music professionals and clients who trust SoundInkube for their projects
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="netflix-button-primary text-lg px-8 py-4">
                <Link to="/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg" className="netflix-button-primary text-lg px-8 py-4">
              <Link to={content.ctaLink}>
                {content.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}