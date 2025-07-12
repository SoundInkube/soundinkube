import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Star, MapPin, Clock, DollarSign, Filter, Music, Headphones, Mic, Piano, Guitar, Drums } from "lucide-react";

interface Professional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  avatar: string;
  verified: boolean;
  responseTime: string;
  completedProjects: number;
  bio: string;
}

export default function Marketplace() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  // Mock data for professionals
  const mockProfessionals: Professional[] = [
    {
      id: "1",
      name: "Alex Rivera",
      title: "Music Producer & Sound Engineer",
      specialties: ["Hip Hop", "R&B", "Pop", "Mixing", "Mastering"],
      location: "Los Angeles, CA",
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 85,
      avatar: "AR",
      verified: true,
      responseTime: "< 2 hours",
      completedProjects: 340,
      bio: "Grammy-nominated producer with 10+ years experience working with major label artists. Specializing in modern hip-hop and R&B production."
    },
    {
      id: "2",
      name: "Sarah Chen",
      title: "Session Vocalist & Songwriter",
      specialties: ["Pop", "Jazz", "Soul", "Songwriting", "Vocal Arrangement"],
      location: "Nashville, TN",
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 65,
      avatar: "SC",
      verified: true,
      responseTime: "< 4 hours",
      completedProjects: 156,
      bio: "Professional session singer with credits on Billboard charting albums. Available for lead vocals, harmonies, and songwriting collaborations."
    },
    {
      id: "3",
      name: "Marcus Johnson",
      title: "Multi-Instrumentalist & Composer",
      specialties: ["Guitar", "Bass", "Keys", "Composition", "Film Scoring"],
      location: "New York, NY",
      rating: 4.9,
      reviewCount: 203,
      hourlyRate: 75,
      avatar: "MJ",
      verified: true,
      responseTime: "< 1 hour",
      completedProjects: 287,
      bio: "Berklee graduate with extensive experience in session work and film scoring. Proficient in multiple genres from rock to orchestral arrangements."
    },
    {
      id: "4",
      name: "Elena Vasquez",
      title: "Mixing & Mastering Engineer",
      specialties: ["Mixing", "Mastering", "Post-Production", "Podcast Audio"],
      location: "Miami, FL",
      rating: 4.7,
      reviewCount: 145,
      hourlyRate: 90,
      avatar: "EV",
      verified: true,
      responseTime: "< 3 hours",
      completedProjects: 423,
      bio: "Award-winning engineer specializing in Latin music, pop, and electronic genres. State-of-the-art studio with analog and digital capabilities."
    },
    {
      id: "5",
      name: "David Kim",
      title: "Beat Maker & Hip-Hop Producer",
      specialties: ["Hip Hop", "Trap", "Drill", "Beat Making", "Sampling"],
      location: "Atlanta, GA",
      rating: 4.8,
      reviewCount: 167,
      hourlyRate: 55,
      avatar: "DK",
      verified: true,
      responseTime: "< 2 hours",
      completedProjects: 678,
      bio: "Trap and hip-hop specialist with placements on major streaming platforms. Known for hard-hitting beats and creative sampling techniques."
    },
    {
      id: "6",
      name: "Luna Martinez",
      title: "Classical Composer & Arranger",
      specialties: ["Classical", "Orchestral", "String Arrangements", "Film Music"],
      location: "Chicago, IL",
      rating: 4.9,
      reviewCount: 76,
      hourlyRate: 95,
      avatar: "LM",
      verified: true,
      responseTime: "< 6 hours",
      completedProjects: 134,
      bio: "Classically trained composer with a modern approach. Specializing in orchestral arrangements for contemporary artists and film projects."
    }
  ];

  useEffect(() => {
    setProfessionals(mockProfessionals);
  }, []);

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           prof.specialties.some(spec => spec.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesLocation = selectedLocation === "all" || 
                           prof.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "budget" && prof.hourlyRate <= 50) ||
                        (priceRange === "mid" && prof.hourlyRate > 50 && prof.hourlyRate <= 80) ||
                        (priceRange === "premium" && prof.hourlyRate > 80);
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const handleContact = (professionalId: string) => {
    if (!isAuthenticated) {
      // Redirect to login with intent to contact this professional
      window.location.href = `/login?intent=contact&professional=${professionalId}`;
      return;
    }
    // In a real app, this would open a messaging interface
    alert(`Contacting professional... (This would open a messaging interface in the full app)`);
  };

  const handleHire = (professionalId: string) => {
    if (!isAuthenticated) {
      // Redirect to login with intent to hire this professional
      window.location.href = `/login?intent=hire&professional=${professionalId}`;
      return;
    }
    // In a real app, this would open a booking/project creation interface
    alert(`Booking professional... (This would open a project creation interface in the full app)`);
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Music Professional
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover and hire talented music professionals for your projects. From producers and engineers 
              to session musicians and composers - find the perfect collaborator for your musical vision.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-netflix-dark rounded-xl p-6 mb-8 netflix-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="netflix-input pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="netflix-input">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-netflix-dark border-gray-600">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="producer">Producers</SelectItem>
                <SelectItem value="engineer">Engineers</SelectItem>
                <SelectItem value="musician">Musicians</SelectItem>
                <SelectItem value="vocalist">Vocalists</SelectItem>
                <SelectItem value="composer">Composers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="netflix-input">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-netflix-dark border-gray-600">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="los angeles">Los Angeles</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="nashville">Nashville</SelectItem>
                <SelectItem value="atlanta">Atlanta</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="netflix-input">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-netflix-dark border-gray-600">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">$0 - $50/hr</SelectItem>
                <SelectItem value="mid">$51 - $80/hr</SelectItem>
                <SelectItem value="premium">$80+/hr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Showing {filteredProfessionals.length} professionals
          </p>
          <Button variant="outline" className="netflix-button-secondary">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{professional.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{professional.name}</h3>
                        {professional.verified && (
                          <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{professional.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 mb-1">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">({professional.reviewCount})</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{professional.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {professional.specialties.slice(0, 3).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="bg-netflix-red/20 text-netflix-red border-netflix-red/30">
                      {specialty}
                    </Badge>
                  ))}
                  {professional.specialties.length > 3 && (
                    <Badge variant="secondary" className="bg-gray-600/20 text-gray-400">
                      +{professional.specialties.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {professional.location}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {professional.responseTime}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="h-4 w-4 mr-2" />
                    ${professional.hourlyRate}/hour
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Music className="h-4 w-4 mr-2" />
                    {professional.completedProjects} projects
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 netflix-button-secondary"
                    onClick={() => handleContact(professional.id)}
                  >
                    Contact
                  </Button>
                  <Button
                    className="flex-1 netflix-button-primary"
                    onClick={() => handleHire(professional.id)}
                  >
                    Hire Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No professionals found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or browse all categories</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLocation("all");
                setPriceRange("all");
              }}
              className="netflix-button-primary"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Call to Action for Professionals */}
      <div className="bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Are You a Music Professional?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our marketplace and connect with clients looking for your skills. 
            Set your rates, showcase your work, and grow your music business.
          </p>
          <Button
            onClick={() => window.location.href = "/signup?role=professional"}
            className="netflix-button-primary netflix-hover-glow text-lg px-8 py-3"
          >
            Join as Professional
          </Button>
        </div>
      </div>
    </div>
  );
}