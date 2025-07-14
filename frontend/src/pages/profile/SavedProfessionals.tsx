import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Search, 
  Filter, 
  Star, 
  MapPin,
  DollarSign,
  Music,
  MessageCircle,
  Eye,
  Phone,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  HeartOff,
  Share2,
  Clock
} from "lucide-react";
import { useState } from "react";

export default function SavedProfessionals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("all");

  const savedProfessionals = [
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "AR",
      specialty: "Music Producer",
      location: "Los Angeles, CA",
      rating: 4.9,
      totalReviews: 89,
      totalProjects: 150,
      hourlyRate: 85,
      availability: "Available",
      responseTime: "2h avg",
      savedDate: "2024-06-15",
      lastActive: "2024-06-22",
      genres: ["Hip-Hop", "R&B", "Pop"],
      description: "Award-winning music producer with 8+ years of experience. Specializing in modern urban sounds with classic influences.",
      portfolio: {
        recentWork: ["Album: Urban Dreams", "Single: Summer Nights", "EP: City Lights"],
        equipment: ["Pro Tools Studio", "Neumann U87", "SSL Console"]
      },
      pricing: {
        hourly: 85,
        projectBased: "Starting at $500",
        fullProduction: "$2000-5000"
      },
      socialProof: {
        platformRating: 4.9,
        repeatClients: 78,
        onTimeDelivery: 96
      }
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "SC",
      specialty: "Mixing Engineer",
      location: "Nashville, TN",
      rating: 4.8,
      totalReviews: 156,
      totalProjects: 89,
      hourlyRate: 75,
      availability: "Busy",
      responseTime: "4h avg",
      savedDate: "2024-06-10",
      lastActive: "2024-06-21",
      genres: ["Electronic", "Pop", "Indie"],
      description: "Professional mixing engineer with expertise in electronic and pop music. Known for crisp, modern mixes.",
      portfolio: {
        recentWork: ["EP: Digital Dreams", "Single: Neon Lights", "Album: Future Pop"],
        equipment: ["Logic Pro X", "Focal Monitors", "Universal Audio Interface"]
      },
      pricing: {
        hourly: 75,
        projectBased: "Starting at $400",
        fullProduction: "$1500-3000"
      },
      socialProof: {
        platformRating: 4.8,
        repeatClients: 65,
        onTimeDelivery: 94
      }
    },
    {
      id: 3,
      name: "Marcus Johnson",
      avatar: "MJ",
      specialty: "Session Guitarist",
      location: "New York, NY",
      rating: 4.9,
      totalReviews: 203,
      totalProjects: 200,
      hourlyRate: 65,
      availability: "Available",
      responseTime: "1h avg",
      savedDate: "2024-06-08",
      lastActive: "2024-06-23",
      genres: ["Rock", "Blues", "Jazz"],
      description: "Versatile session guitarist with 15+ years experience. From jazz standards to rock anthems, delivering premium guitar tracks.",
      portfolio: {
        recentWork: ["Album: Blues Revival", "Single: Electric Soul", "EP: Jazz Fusion"],
        equipment: ["Fender Stratocaster", "Gibson Les Paul", "Marshall Amplifiers"]
      },
      pricing: {
        hourly: 65,
        projectBased: "Starting at $200",
        fullProduction: "$800-2000"
      },
      socialProof: {
        platformRating: 4.9,
        repeatClients: 92,
        onTimeDelivery: 98
      }
    },
    {
      id: 4,
      name: "Luna Martinez",
      avatar: "LM",
      specialty: "Vocalist & Songwriter",
      location: "Miami, FL",
      rating: 5.0,
      totalReviews: 75,
      totalProjects: 75,
      hourlyRate: 95,
      availability: "Available",
      responseTime: "30min avg",
      savedDate: "2024-06-05",
      lastActive: "2024-06-22",
      genres: ["Pop", "R&B", "Soul"],
      description: "Soulful vocalist and talented songwriter. Perfect for pop, R&B, and soul projects. Delivers emotional depth in every performance.",
      portfolio: {
        recentWork: ["Single: Heart & Soul", "EP: Midnight Sessions", "Album: Soulful Journey"],
        equipment: ["Neumann TLM 103", "Avalon Pre-amp", "Home Studio"]
      },
      pricing: {
        hourly: 95,
        projectBased: "Starting at $600",
        fullProduction: "$2500-4000"
      },
      socialProof: {
        platformRating: 5.0,
        repeatClients: 87,
        onTimeDelivery: 100
      }
    },
    {
      id: 5,
      name: "DJ Voltage",
      avatar: "DV",
      specialty: "Electronic Music Producer",
      location: "Berlin, Germany",
      rating: 4.7,
      totalReviews: 124,
      totalProjects: 89,
      hourlyRate: 70,
      availability: "Available",
      responseTime: "3h avg",
      savedDate: "2024-06-12",
      lastActive: "2024-06-20",
      genres: ["House", "Techno", "EDM"],
      description: "Berlin-based electronic music producer specializing in house and techno. Creating dancefloor anthems since 2015.",
      portfolio: {
        recentWork: ["EP: Berlin Nights", "Single: Rave Culture", "Album: Electronic Dreams"],
        equipment: ["Ableton Live", "Moog Synthesizers", "Pioneer DJ Setup"]
      },
      pricing: {
        hourly: 70,
        projectBased: "Starting at $350",
        fullProduction: "$1200-2800"
      },
      socialProof: {
        platformRating: 4.7,
        repeatClients: 71,
        onTimeDelivery: 89
      }
    },
    {
      id: 6,
      name: "Tony Rodriguez",
      avatar: "TR",
      specialty: "Drummer",
      location: "Austin, TX",
      rating: 4.8,
      totalReviews: 167,
      totalProjects: 134,
      hourlyRate: 60,
      availability: "Busy",
      responseTime: "5h avg",
      savedDate: "2024-06-14",
      lastActive: "2024-06-19",
      genres: ["Rock", "Funk", "Latin"],
      description: "Professional drummer with groove that makes people move. Specializing in rock, funk, and Latin rhythms.",
      portfolio: {
        recentWork: ["Album: Rhythm & Soul", "Single: Groove Machine", "EP: Latin Fusion"],
        equipment: ["DW Drums", "Zildjian Cymbals", "Pearl Hardware"]
      },
      pricing: {
        hourly: 60,
        projectBased: "Starting at $180",
        fullProduction: "$600-1500"
      },
      socialProof: {
        platformRating: 4.8,
        repeatClients: 81,
        onTimeDelivery: 92
      }
    },
    {
      id: 7,
      name: "Emma Thompson",
      avatar: "ET",
      specialty: "Cellist",
      location: "London, UK",
      rating: 4.9,
      totalReviews: 98,
      totalProjects: 67,
      hourlyRate: 80,
      availability: "Available",
      responseTime: "2h avg",
      savedDate: "2024-06-07",
      lastActive: "2024-06-21",
      genres: ["Classical", "Film Score", "Ambient"],
      description: "Classically trained cellist bringing elegance to modern productions. Perfect for film scores, ambient music, and orchestral arrangements.",
      portfolio: {
        recentWork: ["Film: The Last Symphony", "Album: Strings & Dreams", "EP: Classical Crossover"],
        equipment: ["Professional Cello", "Studio Microphones", "Recording Setup"]
      },
      pricing: {
        hourly: 80,
        projectBased: "Starting at $300",
        fullProduction: "$1000-2500"
      },
      socialProof: {
        platformRating: 4.9,
        repeatClients: 74,
        onTimeDelivery: 97
      }
    },
    {
      id: 8,
      name: "James Wilson",
      avatar: "JW",
      specialty: "Sound Engineer",
      location: "Seattle, WA",
      rating: 4.6,
      totalReviews: 143,
      totalProjects: 112,
      hourlyRate: 68,
      availability: "Available",
      responseTime: "3h avg",
      savedDate: "2024-06-11",
      lastActive: "2024-06-18",
      genres: ["Rock", "Alternative", "Grunge"],
      description: "Seattle-based sound engineer with deep roots in the alternative rock scene. Delivering powerful, authentic sound.",
      portfolio: {
        recentWork: ["Album: Grunge Revival", "Single: Seattle Sound", "EP: Alternative Vibes"],
        equipment: ["Pro Tools HD", "API Console", "Vintage Microphones"]
      },
      pricing: {
        hourly: 68,
        projectBased: "Starting at $280",
        fullProduction: "$1100-2200"
      },
      socialProof: {
        platformRating: 4.6,
        repeatClients: 63,
        onTimeDelivery: 87
      }
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-red-600/20 text-green-400';
      case 'Busy': return 'bg-yellow-600/20 text-yellow-400';
      case 'Unavailable': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const filteredProfessionals = savedProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = filterSpecialty === "all" || professional.specialty.toLowerCase().includes(filterSpecialty.toLowerCase());
    
    return matchesSearch && matchesSpecialty;
  });

  const stats = {
    totalSaved: savedProfessionals.length,
    availableNow: savedProfessionals.filter(p => p.availability === "Available").length,
    averageRating: savedProfessionals.reduce((sum, p) => sum + p.rating, 0) / savedProfessionals.length,
    averageHourlyRate: Math.round(savedProfessionals.reduce((sum, p) => sum + p.hourlyRate, 0) / savedProfessionals.length)
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Saved Professionals</h1>
            <p className="text-gray-400">Your favorite music professionals for quick access</p>
          </div>
          <Button className="netflix-button-primary">
            <Search className="h-4 w-4 mr-2" />
            Discover More
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-netflix-red/20 rounded-lg">
                  <Heart className="h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.totalSaved}</p>
                  <p className="text-gray-400 text-sm">Saved Professionals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Users className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.availableNow}</p>
                  <p className="text-gray-400 text-sm">Available Now</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.averageRating.toFixed(1)}</p>
                  <p className="text-gray-400 text-sm">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">${stats.averageHourlyRate}</p>
                  <p className="text-gray-400 text-sm">Avg Hourly Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search saved professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'producer', label: 'Producers' },
              { key: 'mixing', label: 'Engineers' },
              { key: 'vocalist', label: 'Vocalists' },
              { key: 'guitarist', label: 'Guitarists' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={filterSpecialty === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSpecialty(filter.key)}
                className={filterSpecialty === filter.key ? "netflix-button-primary" : "border-gray-700 text-gray-300"}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="bg-netflix-red text-white text-lg">
                        {professional.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-bold text-lg">{professional.name}</h3>
                      <p className="text-gray-400">{professional.specialty}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">{professional.rating}</span>
                        <span className="text-gray-400 text-xs">({professional.totalReviews})</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-netflix-red hover:text-red-400">
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{professional.description}</p>

                {/* Location & Availability */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{professional.location}</span>
                  </div>
                  <Badge className={getAvailabilityColor(professional.availability)}>
                    {professional.availability}
                  </Badge>
                </div>

                {/* Genres */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {professional.genres.slice(0, 3).map((genre) => (
                      <Badge key={genre} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-400">Projects</p>
                    <p className="text-white font-semibold">{professional.totalProjects}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Response Time</p>
                    <p className="text-white font-semibold">{professional.responseTime}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Starting at</p>
                      <p className="text-white font-bold text-lg">${professional.hourlyRate}/hr</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Projects from</p>
                      <p className="text-green-400 font-semibold">{professional.pricing.projectBased}</p>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{professional.socialProof.repeatClients}% repeat clients</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{professional.socialProof.onTimeDelivery}% on time</span>
                    </div>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="mb-4 text-xs text-gray-400">
                  <p>Saved on {new Date(professional.savedDate).toLocaleDateString()}</p>
                  <p>Last active: {new Date(professional.lastActive).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full netflix-button-primary">
                    <Eye className="h-3 w-3 mr-2" />
                    View Profile
                  </Button>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                      <Calendar className="h-3 w-3 mr-1" />
                      Book Now
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                      <HeartOff className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No saved professionals found</h3>
            <p className="text-gray-400 mb-6">Start saving your favorite music professionals</p>
            <Button className="netflix-button-primary">
              <Search className="h-4 w-4 mr-2" />
              Discover Professionals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}