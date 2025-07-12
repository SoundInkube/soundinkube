import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Play, 
  Users, 
  Music, 
  Award, 
  Star, 
  ArrowRight,
  Headphones,
  Mic,
  Guitar,
  Piano,
  Drum,
  Radio,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Heart,
  Search,
  Calendar,
  MessageCircle,
  BarChart3,
  Target,
  UserPlus,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const { user, isAuthenticated } = useAuth();

  // Role-specific content for authenticated users
  const getRoleSpecificContent = () => {
    if (!isAuthenticated || !user) {
      return null;
    }

    if (user.role === "CLIENT") {
      return (
        <div className="space-y-12">
          {/* Client Hero Section */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Welcome Back,
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Music Client
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Find the perfect music professionals and schools to bring your projects to life.
            </p>
          </div>

          {/* Client Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Link to="/hire-professionals">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-netflix-red/20 rounded-lg group-hover:bg-netflix-red/30 transition-colors">
                      <Users className="h-8 w-8 text-netflix-red" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Hire Music Professionals</h3>
                      <p className="text-gray-400">Connect with talented producers, musicians, and engineers</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-300">• Find producers for your next album</div>
                    <div className="text-gray-300">• Book session musicians</div>
                    <div className="text-gray-300">• Connect with mixing engineers</div>
                    <div className="text-gray-300">• Hire vocalists and songwriters</div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Badge className="bg-green-600/20 text-green-400">150+ Professionals</Badge>
                    <ArrowRight className="h-5 w-5 text-netflix-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/find-music-schools">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                      <GraduationCap className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Find Music Schools</h3>
                      <p className="text-gray-400">Discover the best music education for your journey</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-300">• Classical conservatories</div>
                    <div className="text-gray-300">• Modern music academies</div>
                    <div className="text-gray-300">• Online learning platforms</div>
                    <div className="text-gray-300">• Specialized workshops</div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Badge className="bg-blue-600/20 text-blue-400">50+ Schools</Badge>
                    <ArrowRight className="h-5 w-5 text-netflix-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      );
    }

    if (user.role === "MUSIC_PROFESSIONAL") {
      return (
        <div className="space-y-12">
          {/* Music Professional Hero Section */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Welcome Back,
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Music Professional
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Collaborate, create, and grow your music career with our comprehensive platform.
            </p>
          </div>

          {/* Music Professional Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Link to="/collaboration">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Collaboration</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Work on projects with other musicians</p>
                  <ArrowRight className="h-4 w-4 text-netflix-red group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/marketplace">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                      <Guitar className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Marketplace</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Buy and sell music equipment</p>
                  <ArrowRight className="h-4 w-4 text-netflix-red group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/jampads">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-yellow-600/20 rounded-lg group-hover:bg-yellow-600/30 transition-colors">
                      <Music className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Jampads</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Book studio spaces and jam rooms</p>
                  <ArrowRight className="h-4 w-4 text-netflix-red group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/gigs">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-netflix-red/20 rounded-lg group-hover:bg-netflix-red/30 transition-colors">
                      <Briefcase className="h-6 w-6 text-netflix-red" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Gigs</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Find work and project opportunities</p>
                  <Badge className="bg-netflix-red/20 text-netflix-red text-xs">New Opportunities</Badge>
                </CardContent>
              </Card>
            </Link>

            <Link to="/music-schools">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                      <GraduationCap className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Music Schools</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Learn new skills and teach others</p>
                  <ArrowRight className="h-4 w-4 text-netflix-red group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      );
    }

    if (user.role === "ARTIST_MANAGER") {
      return (
        <div className="space-y-12">
          {/* Artist Manager Hero Section */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Welcome Back,
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Artist Manager
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Manage your roster, scout new talent, and oversee your music business operations.
            </p>
          </div>

          {/* Artist Manager Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Link to="/manage-talent">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-netflix-red/20 rounded-lg group-hover:bg-netflix-red/30 transition-colors">
                      <Users className="h-8 w-8 text-netflix-red" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Manage Talent</h3>
                      <p className="text-gray-400">Oversee your artist roster</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-300">• Track artist performance</div>
                    <div className="text-gray-300">• Manage contracts</div>
                    <div className="text-gray-300">• Monitor revenue streams</div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Badge className="bg-netflix-red/20 text-netflix-red">Active Artists</Badge>
                    <ArrowRight className="h-5 w-5 text-netflix-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/scout-artists">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                      <Search className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Scout Artists</h3>
                      <p className="text-gray-400">Discover emerging talent</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-300">• Advanced discovery tools</div>
                    <div className="text-gray-300">• Trend analysis</div>
                    <div className="text-gray-300">• Talent recommendations</div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Badge className="bg-blue-600/20 text-blue-400">New Discoveries</Badge>
                    <ArrowRight className="h-5 w-5 text-netflix-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-yellow-600/20 rounded-lg group-hover:bg-yellow-600/30 transition-colors">
                      <BarChart3 className="h-8 w-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Dashboard</h3>
                      <p className="text-gray-400">Business operations overview</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-300">• Revenue analytics</div>
                    <div className="text-gray-300">• Performance metrics</div>
                    <div className="text-gray-300">• Business insights</div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Badge className="bg-yellow-600/20 text-yellow-400">Live Data</Badge>
                    <ArrowRight className="h-5 w-5 text-netflix-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Authenticated User Content */}
        {isAuthenticated && user ? (
          getRoleSpecificContent()
        ) : (
          /* Non-authenticated User Content */
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Where Music
                <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                  Connects
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                The ultimate platform for music professionals, clients, and managers to collaborate, 
                create, and build successful music careers together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button asChild size="lg" className="netflix-button-primary text-lg px-8 py-4">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4">
                  <Link to="/about">
                    Learn More
                    <Play className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                <CardHeader>
                  <div className="p-3 bg-netflix-red/20 rounded-lg w-fit">
                    <Users className="h-8 w-8 text-netflix-red" />
                  </div>
                  <CardTitle className="text-white text-xl">For Music Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Connect with clients, collaborate on projects, and grow your music career with our comprehensive platform.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Find gigs and projects</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Collaborate with artists</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Sell equipment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                <CardHeader>
                  <div className="p-3 bg-blue-600/20 rounded-lg w-fit">
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-xl">For Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Find the perfect music professionals and schools to bring your musical projects and dreams to life.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Hire music professionals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Find music schools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Book sessions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                <CardHeader>
                  <div className="p-3 bg-yellow-600/20 rounded-lg w-fit">
                    <BarChart3 className="h-8 w-8 text-yellow-400" />
                  </div>
                  <CardTitle className="text-white text-xl">For Artist Managers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Manage your roster, scout new talent, and oversee music business operations with powerful tools.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Manage artist roster</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Scout emerging talent</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Business analytics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-netflix-red mb-2">10K+</div>
                <div className="text-gray-300">Music Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-netflix-red mb-2">50K+</div>
                <div className="text-gray-300">Successful Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-netflix-red mb-2">200+</div>
                <div className="text-gray-300">Music Schools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-netflix-red mb-2">95%</div>
                <div className="text-gray-300">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-800">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Music Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of music professionals, clients, and managers who are building 
                successful careers on SoundInkube.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button asChild size="lg" className="netflix-button-primary text-lg px-8 py-4">
                  <Link to="/signup">
                    Start Your Journey
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4">
                  <Link to="/contact">
                    Get in Touch
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// CheckCircle component for non-authenticated content
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}