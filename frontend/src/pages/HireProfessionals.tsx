import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Music, 
  Mic, 
  Guitar, 
  Piano, 
  Headphones,
  User,
  Calendar,
  MessageCircle,
  Filter,
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HireProfessionals() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Mock data for music professionals
  const professionals = [
    {
      id: 1,
      name: "Alex Rodriguez",
      title: "Music Producer & Sound Engineer",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85,
      category: "producer",
      specialties: ["Hip-Hop", "R&B", "Pop"],
      avatar: "AR",
      verified: true,
      responseTime: "1 hour",
      completedProjects: 245,
      description: "Grammy-nominated producer with 10+ years experience. Specialized in modern hip-hop and R&B production.",
      equipment: ["Pro Tools", "Logic Pro X", "Neumann U87", "SSL Console"],
      portfolio: [
        { title: "Summer Vibes", artist: "Maya Johnson", plays: "2.1M" },
        { title: "Night Drive", artist: "The Collective", plays: "1.8M" },
      ]
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "Session Vocalist & Songwriter",
      location: "Nashville, TN",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 60,
      category: "vocalist",
      specialties: ["Country", "Pop", "Folk"],
      avatar: "SC",
      verified: true,
      responseTime: "2 hours",
      completedProjects: 156,
      description: "Professional session vocalist with credits on major label releases. Available for lead vocals, harmonies, and songwriting.",
      equipment: ["Neumann TLM 103", "Avalon VT-737sp", "Home Studio"],
      portfolio: [
        { title: "Hometown Hero", artist: "Jake Miller", plays: "3.2M" },
        { title: "Golden Hour", artist: "Various Artists", plays: "892K" },
      ]
    },
    {
      id: 3,
      name: "Marcus Thompson",
      title: "Multi-Instrumentalist & Composer",
      location: "New York, NY",
      rating: 4.9,
      reviews: 203,
      hourlyRate: 95,
      category: "musician",
      specialties: ["Jazz", "Classical", "Film Scoring"],
      avatar: "MT",
      verified: true,
      responseTime: "30 minutes",
      completedProjects: 312,
      description: "Berklee graduate specializing in jazz piano, orchestral arrangements, and film scoring. Available for recording and live performances.",
      equipment: ["Steinway Grand Piano", "Native Instruments", "Cubase"],
      portfolio: [
        { title: "Midnight in Manhattan", artist: "MT Trio", plays: "654K" },
        { title: "Documentary Score", artist: "Film Project", plays: "1.1M" },
      ]
    },
    {
      id: 4,
      name: "DJ Luna",
      title: "Electronic Music Producer & DJ",
      location: "Miami, FL",
      rating: 4.7,
      reviews: 142,
      hourlyRate: 75,
      category: "producer",
      specialties: ["EDM", "House", "Techno"],
      avatar: "DL",
      verified: true,
      responseTime: "1.5 hours",
      completedProjects: 198,
      description: "International DJ and producer with releases on major EDM labels. Specializing in festival-ready electronic music.",
      equipment: ["Ableton Live", "Pioneer CDJ-3000", "Moog Synthesizers"],
      portfolio: [
        { title: "Electric Dreams", artist: "DJ Luna", plays: "4.7M" },
        { title: "Sunset Beach", artist: "DJ Luna", plays: "2.3M" },
      ]
    },
    {
      id: 5,
      name: "Emma Wilson",
      title: "Mixing & Mastering Engineer",
      location: "London, UK",
      rating: 4.9,
      reviews: 167,
      hourlyRate: 80,
      category: "engineer",
      specialties: ["Rock", "Alternative", "Indie"],
      avatar: "EW",
      verified: true,
      responseTime: "45 minutes",
      completedProjects: 287,
      description: "Award-winning mixing engineer with credits on platinum albums. Specialized in rock and alternative music production.",
      equipment: ["SSL G-Series", "Pro Tools HDX", "Vintage Outboard Gear"],
      portfolio: [
        { title: "Breaking Point", artist: "The Rebels", plays: "5.1M" },
        { title: "Echoes", artist: "Silent Storm", plays: "1.9M" },
      ]
    },
    {
      id: 6,
      name: "Carlos Mendez",
      title: "Classical Guitarist & Composer",
      location: "Barcelona, Spain",
      rating: 4.8,
      reviews: 94,
      hourlyRate: 70,
      category: "musician",
      specialties: ["Classical", "Flamenco", "World Music"],
      avatar: "CM",
      verified: true,
      responseTime: "2 hours",
      completedProjects: 143,
      description: "Conservatory-trained classical guitarist with international performance experience. Available for recording and composition.",
      equipment: ["Custom Classical Guitars", "High-end Microphones", "Recording Setup"],
      portfolio: [
        { title: "Andalusian Nights", artist: "Carlos Mendez", plays: "876K" },
        { title: "Guitar Concerto", artist: "Barcelona Symphony", plays: "432K" },
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", icon: <Music className="h-4 w-4" /> },
    { id: "producer", name: "Producers", icon: <Headphones className="h-4 w-4" /> },
    { id: "vocalist", name: "Vocalists", icon: <Mic className="h-4 w-4" /> },
    { id: "musician", name: "Musicians", icon: <Guitar className="h-4 w-4" /> },
    { id: "engineer", name: "Engineers", icon: <SlidersHorizontal className="h-4 w-4" /> },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "us", name: "United States" },
    { id: "uk", name: "United Kingdom" },
    { id: "europe", name: "Europe" },
    { id: "remote", name: "Remote Only" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "budget", name: "$25-50/hr" },
    { id: "mid", name: "$50-100/hr" },
    { id: "premium", name: "$100+/hr" },
  ];

  // Filter professionals based on search and filters
  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === "all" || professional.category === selectedCategory;
    
    const matchesLocation = selectedLocation === "all" || 
      (selectedLocation === "us" && professional.location.includes("CA") || professional.location.includes("NY") || professional.location.includes("TN") || professional.location.includes("FL")) ||
      (selectedLocation === "uk" && professional.location.includes("UK")) ||
      (selectedLocation === "europe" && (professional.location.includes("Spain") || professional.location.includes("UK")));

    const matchesPrice = priceRange === "all" ||
      (priceRange === "budget" && professional.hourlyRate <= 50) ||
      (priceRange === "mid" && professional.hourlyRate > 50 && professional.hourlyRate <= 100) ||
      (priceRange === "premium" && professional.hourlyRate > 100);

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const handleContactProfessional = (professionalId: number) => {
    if (!isAuthenticated) {
      // Redirect to login with intent to contact
      window.location.href = `/login?intent=contact&professional=${professionalId}`;
    } else {
      // Handle contact logic
      console.log(`Contacting professional ${professionalId}`);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Hire Music
            <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
              Professionals
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with talented producers, vocalists, musicians, and engineers to bring your musical vision to life. 
            Browse verified professionals from around the world.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search professionals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-netflix-red"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <span className="text-lg font-medium">
              {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''} found
            </span>
          </div>
          {!isAuthenticated && (
            <div className="text-sm text-gray-400">
              <Link to="/login" className="text-netflix-red hover:text-red-400 transition-colors">
                Sign in
              </Link> to contact professionals
            </div>
          )}
        </div>

        {/* Professionals Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {professional.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-white text-xl">
                          <Link 
                            to={`/professional/${professional.id}`}
                            className="hover:text-netflix-red transition-colors"
                          >
                            {professional.name}
                          </Link>
                        </CardTitle>
                        {professional.verified && (
                          <Badge className="bg-green-600 text-white text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm font-medium">
                        {professional.title}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{professional.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Responds in {professional.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-white font-medium">{professional.rating}</span>
                      <span className="text-gray-400 text-sm">({professional.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-netflix-red font-bold">
                      <DollarSign className="h-4 w-4" />
                      <span>{professional.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {professional.description}
                </p>

                {/* Specialties */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {professional.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{professional.completedProjects} projects</span>
                  </div>
                </div>

                {/* Portfolio Preview */}
                <div>
                  <h4 className="text-white font-medium mb-2">Recent Work</h4>
                  <div className="space-y-2">
                    {professional.portfolio.slice(0, 2).map((work, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="text-gray-300">"{work.title}"</span>
                          <span className="text-gray-500 ml-2">by {work.artist}</span>
                        </div>
                        <span className="text-gray-400">{work.plays} plays</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    asChild
                    className="flex-1 netflix-button-primary"
                  >
                    <Link to={`/professional/${professional.id}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleContactProfessional(professional.id)}
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-Action for Professionals */}
        <div className="bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">
            Are you a music professional?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our platform to connect with clients worldwide. Showcase your skills, 
            build your portfolio, and grow your music business.
          </p>
          <Button asChild className="netflix-button-primary text-lg px-8 py-3">
            <Link to="/signup?role=professional">
              Join as Professional
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}