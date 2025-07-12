import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Music, Users, Calendar, GraduationCap, Star, Play, ArrowRight, CheckCircle } from "lucide-react";

export default function Index() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHireProfessionals = () => {
    if (isAuthenticated && user?.role === "CLIENT") {
      navigate("/marketplace");
    } else {
      navigate("/login?intent=hire");
    }
  };

  const handleJoinProfessionals = () => {
    navigate("/signup?role=professional");
  };

  const features = [
    {
      icon: <Music className="h-8 w-8 text-netflix-red" />,
      title: "Professional Services",
      description: "Connect with experienced musicians, producers, and sound engineers for your projects.",
      gradient: "from-red-600/20 to-orange-600/20"
    },
    {
      icon: <Users className="h-8 w-8 text-netflix-red" />,
      title: "Collaboration Hub",
      description: "Work together on projects with real-time collaboration tools and shared workspaces.",
      gradient: "from-purple-600/20 to-pink-600/20"
    },
    {
      icon: <Calendar className="h-8 w-8 text-netflix-red" />,
      title: "Jam Pads",
      description: "Book virtual and physical jam spaces for practice, recording, and live sessions.",
      gradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-netflix-red" />,
      title: "Music Schools",
      description: "Learn from industry professionals with structured courses and one-on-one mentoring.",
      gradient: "from-green-600/20 to-emerald-600/20"
    }
  ];

  const stats = [
    { number: "10K+", label: "Music Professionals" },
    { number: "50K+", label: "Projects Completed" },
    { number: "200+", label: "Cities Worldwide" },
    { number: "95%", label: "Client Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Independent Artist",
      image: "SC",
      content: "SoundInkube connected me with amazing producers who helped bring my vision to life. The collaboration tools made remote work seamless.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Music Producer",
      image: "MR",
      content: "As a professional, this platform has been game-changing. I've expanded my client base globally and the booking system is incredibly efficient.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Label Manager",
      image: "LT",
      content: "Managing our roster of artists became so much easier with SoundInkube's talent management tools. Highly recommended for industry professionals.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-red/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 netflix-fade-in">
              Your Music.
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Your Network.
              </span>
              <span className="block">Your Success.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed netflix-fade-in-delay">
              Connect with music professionals, collaborate on projects, book jam spaces, and grow your musical journey. 
              Join the world's largest community of music creators and industry experts.
            </p>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 netflix-fade-in-delay-2">
              <Button
                onClick={handleHireProfessionals}
                className="netflix-button-primary netflix-hover-glow text-lg px-8 py-4 h-auto font-semibold"
              >
                <Users className="h-5 w-5 mr-2" />
                Hire Music Professionals
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                onClick={handleJoinProfessionals}
                variant="outline"
                className="netflix-button-secondary netflix-hover-scale text-lg px-8 py-4 h-auto font-semibold"
              >
                <Music className="h-5 w-5 mr-2" />
                Join the Music Professional Community
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center netflix-hover-scale">
                  <div className="text-3xl lg:text-4xl font-bold text-netflix-red mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-netflix-dark to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Create Music
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From finding the right professionals to collaborative tools and learning resources, 
              SoundInkube provides a complete ecosystem for music creation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`netflix-card netflix-hover-glow bg-gradient-to-br ${feature.gradient} backdrop-blur-sm`}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-netflix-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How SoundInkube Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get started in minutes and connect with the music community worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center netflix-fade-in">
              <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Create Your Profile</h3>
              <p className="text-gray-400 leading-relaxed">
                Sign up as a Client, Music Professional, or Artist Manager. Showcase your skills, 
                experience, and what you're looking for in the music industry.
              </p>
            </div>

            <div className="text-center netflix-fade-in-delay">
              <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Connect & Collaborate</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse professionals, post projects, book jam sessions, or join collaborative 
                workspaces. Our tools make it easy to work together remotely or in person.
              </p>
            </div>

            <div className="text-center netflix-fade-in-delay-2">
              <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Create Amazing Music</h3>
              <p className="text-gray-400 leading-relaxed">
                Use our platform's tools to manage projects, track progress, handle payments, 
                and deliver exceptional musical experiences to your audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-b from-netflix-dark to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by Music Creators
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See what our community members say about their SoundInkube experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">{testimonial.image}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
              Music Career?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of music professionals and creators who are already using SoundInkube 
            to grow their careers and create amazing music together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={handleHireProfessionals}
              className="netflix-button-primary netflix-hover-glow text-lg px-8 py-4 h-auto font-semibold"
            >
              <Play className="h-5 w-5 mr-2" />
              Get Started as Client
            </Button>
            
            <Button
              onClick={handleJoinProfessionals}
              variant="outline"
              className="netflix-button-secondary netflix-hover-scale text-lg px-8 py-4 h-auto font-semibold"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Join as Professional
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}