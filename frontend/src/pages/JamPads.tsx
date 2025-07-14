import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Search, Users, Clock, Music, Play, Mic, Headphones, Calendar, MapPin, DollarSign, Star, Zap, Lock, Globe, Volume2 } from "lucide-react";

interface JamPad {
  id: string;
  name: string;
  description: string;
  type: "virtual" | "physical";
  genre: string;
  capacity: number;
  currentUsers: number;
  isActive: boolean;
  host: string;
  hostAvatar: string;
  hourlyRate?: number;
  location?: string;
  equipment?: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  isPrivate: boolean;
  createdAt: string;
  nextAvailable?: string;
}

interface Booking {
  id: string;
  jamPadId: string;
  jamPadName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  participants: { id: string; name: string; avatar: string }[];
  totalCost: number;
}

export default function JamPads() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterGenre, setFilterGenre] = useState("all");
  const [jamPads, setJamPads] = useState<JamPad[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Mock jam pads data
  const mockJamPads: JamPad[] = [
    {
      id: "1",
      name: "Studio A - Pro Recording",
      description: "Professional recording studio with vintage analog equipment and world-class acoustics. Perfect for serious recording sessions.",
      type: "physical",
      genre: "All Genres",
      capacity: 8,
      currentUsers: 0,
      isActive: false,
      host: "Alex Rivera",
      hostAvatar: "AR",
      hourlyRate: 120,
      location: "Los Angeles, CA",
      equipment: ["SSL Console", "Pro Tools HDX", "Neumann U87", "Vintage Compressors"],
      tags: ["Professional", "Analog", "Recording", "Mixing"],
      rating: 4.9,
      reviewCount: 156,
      isPrivate: false,
      createdAt: "2024-01-15",
      nextAvailable: "2024-01-26T14:00:00Z"
    },
    {
      id: "2",
      name: "Virtual Hip-Hop Lab",
      description: "High-energy virtual space for hip-hop production and collaboration. Real-time beat making and vocal recording.",
      type: "virtual",
      genre: "Hip-Hop",
      capacity: 6,
      currentUsers: 3,
      isActive: true,
      host: "David Kim",
      hostAvatar: "DK",
      equipment: ["Virtual Instruments", "Real-time Collaboration", "Cloud Storage"],
      tags: ["Hip-Hop", "Beats", "Virtual", "Live"],
      rating: 4.7,
      reviewCount: 89,
      isPrivate: false,
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Jazz Corner Rehearsal",
      description: "Intimate physical space designed for jazz rehearsals and small ensemble practice. Acoustic treatment optimized for jazz.",
      type: "physical",
      genre: "Jazz",
      capacity: 5,
      currentUsers: 0,
      isActive: false,
      host: "Marcus Johnson",
      hostAvatar: "MJ",
      hourlyRate: 45,
      location: "New York, NY",
      equipment: ["Acoustic Piano", "Drum Kit", "Upright Bass", "Horn Mics"],
      tags: ["Jazz", "Acoustic", "Rehearsal", "Intimate"],
      rating: 4.8,
      reviewCount: 67,
      isPrivate: false,
      createdAt: "2024-01-18",
      nextAvailable: "2024-01-26T19:00:00Z"
    },
    {
      id: "4",
      name: "Electronic Playground",
      description: "Cutting-edge virtual environment for electronic music creation with advanced synthesis and effects processing.",
      type: "virtual",
      genre: "Electronic",
      capacity: 4,
      currentUsers: 1,
      isActive: true,
      host: "Luna Martinez",
      hostAvatar: "LM",
      equipment: ["Ableton Live", "Hardware Synths", "Effects Processors", "MIDI Controllers"],
      tags: ["Electronic", "Synthesis", "Effects", "Modern"],
      rating: 4.6,
      reviewCount: 43,
      isPrivate: false,
      createdAt: "2024-01-22"
    },
    {
      id: "5",
      name: "Vocal Booth Pro",
      description: "Professional vocal recording booth with pristine acoustics and top-tier microphones for serious vocal work.",
      type: "physical",
      genre: "Vocal",
      capacity: 3,
      currentUsers: 0,
      isActive: false,
      host: "Sarah Chen",
      hostAvatar: "SC",
      hourlyRate: 80,
      location: "Nashville, TN",
      equipment: ["Neumann U67", "Neve Preamps", "Vocal Booth", "Headphone System"],
      tags: ["Vocal", "Recording", "Professional", "Booth"],
      rating: 4.9,
      reviewCount: 134,
      isPrivate: false,
      createdAt: "2024-01-12",
      nextAvailable: "2024-01-27T10:00:00Z"
    },
    {
      id: "6",
      name: "Songwriting Sanctuary",
      description: "Cozy virtual space designed for songwriting collaborations. Perfect for lyric writing and melody development.",
      type: "virtual",
      genre: "Songwriting",
      capacity: 4,
      currentUsers: 2,
      isActive: true,
      host: "Elena Vasquez",
      hostAvatar: "EV",
      equipment: ["Piano VST", "Guitar Sims", "Notation Software", "Voice Memo"],
      tags: ["Songwriting", "Collaboration", "Creative", "Intimate"],
      rating: 4.8,
      reviewCount: 91,
      isPrivate: false,
      createdAt: "2024-01-19"
    }
  ];

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: "1",
      jamPadId: "1",
      jamPadName: "Studio A - Pro Recording",
      date: "2024-01-26",
      startTime: "14:00",
      endTime: "18:00",
      status: "upcoming",
      participants: [
        { id: "1", name: "You", avatar: "YU" },
        { id: "2", name: "Sarah Chen", avatar: "SC" },
        { id: "3", name: "Marcus Johnson", avatar: "MJ" }
      ],
      totalCost: 480
    },
    {
      id: "2",
      jamPadId: "3",
      jamPadName: "Jazz Corner Rehearsal",
      date: "2024-01-25",
      startTime: "19:00",
      endTime: "22:00",
      status: "completed",
      participants: [
        { id: "1", name: "You", avatar: "YU" },
        { id: "4", name: "David Kim", avatar: "DK" }
      ],
      totalCost: 135
    }
  ];

  useEffect(() => {
    setJamPads(mockJamPads);
    setBookings(mockBookings);
  }, []);

  const filteredJamPads = jamPads.filter(pad => {
    const matchesSearch = pad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pad.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || pad.type === filterType;
    const matchesGenre = filterGenre === "all" || pad.genre.toLowerCase().includes(filterGenre.toLowerCase());
    
    return matchesSearch && matchesType && matchesGenre;
  });

  const handleBookJamPad = (jamPadId: string) => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=book-jampad&jampad=${jamPadId}`;
      return;
    }
    alert(`Booking jam pad... (This would open a booking interface in the full app)`);
  };

  const handleJoinLive = (jamPadId: string) => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=join-jampad&jampad=${jamPadId}`;
      return;
    }
    alert(`Joining live session... (This would open the jam pad interface in the full app)`);
  };

  const handleCreateJamPad = () => {
    if (!isAuthenticated) {
      window.location.href = "/login?intent=create-jampad";
      return;
    }
    if (user?.role !== "MUSIC_PROFESSIONAL") {
      alert("Only Music Professionals can create jam pads. Please upgrade your account.");
      return;
    }
    alert("Create Jam Pad modal would open here in the full app");
  };

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="text-white bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h1 className="text-white text-4xl lg:text-5xl font-bold text-white mb-6">
              Jam Pads
              <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                & Studio Spaces
              </span>
            </h1>
            <p className="text-white text-xl text-white max-w-3xl mx-auto">
              Book professional recording studios, join virtual jam sessions, and collaborate with musicians 
              in real-time. Whether you need a physical space or virtual collaboration, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="text-white w-full">
          <TabsList className="text-white grid w-full grid-cols-3 mb-8 bg-netflix-dark">
            <TabsTrigger value="browse" className="text-white netflix-tab">
              <Search className="text-white h-4 w-4 mr-2" />
              Browse Pads
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-white netflix-tab">
              <Calendar className="text-white h-4 w-4 mr-2" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="live" className="text-white netflix-tab">
              <Zap className="text-white h-4 w-4 mr-2" />
              Live Sessions
            </TabsTrigger>
          </TabsList>

          {/* Browse Pads Tab */}
          <TabsContent value="browse" className="text-white space-y-6">
            <div className="text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="text-white flex flex-col sm:flex-row gap-4 flex-1">
                <div className="text-white relative flex-1">
                  <Search className="text-white absolute left-3 top-3 h-5 w-5 text-white" />
                  <Input
                    placeholder="Search jam pads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-white netflix-input pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="text-white netflix-input w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-netflix-dark border-gray-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="physical">Physical</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterGenre} onValueChange={setFilterGenre}>
                  <SelectTrigger className="text-white netflix-input w-full sm:w-40">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-netflix-dark border-gray-600">
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {user?.role === "MUSIC_PROFESSIONAL" && (
                <Button onClick={handleCreateJamPad} className="text-white netflix-button-primary">
                  <Plus className="text-white h-4 w-4 mr-2" />
                  Create Jam Pad
                </Button>
              )}
            </div>

            <div className="text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJamPads.map((pad) => (
                <Card key={pad.id} className="text-white netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="text-white flex items-start justify-between">
                      <div className="text-white flex-1">
                        <div className="text-white flex items-center space-x-2 mb-2">
                          <CardTitle className="text-white text-white text-lg">{pad.name}</CardTitle>
                          {pad.isActive && pad.type === "virtual" && (
                            <Badge className="text-white bg-red-600/20 text-netflix-red border-red-600/30 animate-pulse">
                              LIVE
                            </Badge>
                          )}
                          {pad.isPrivate && (
                            <Lock className="text-white h-4 w-4 text-white" />
                          )}
                        </div>
                        <p className="text-white text-white text-sm mb-3 line-clamp-2">{pad.description}</p>
                        <div className="text-white flex items-center space-x-4 text-sm text-white">
                          <Badge variant="secondary" className={
                            pad.type === "virtual" 
                              ? "bg-red-600/20 text-netflix-red border-blue-600/30"
                              : "bg-red-600/20 text-netflix-red border-red-600/30"
                          }>
                            {pad.type === "virtual" ? <Globe className="text-white h-3 w-3 mr-1" /> : <MapPin className="text-white h-3 w-3 mr-1" />}
                            {pad.type === "virtual" ? "Virtual" : "Physical"}
                          </Badge>
                          <Badge variant="secondary" className="text-white bg-netflix-red/20 text-netflix-red border-netflix-red/30">
                            {pad.genre}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-white text-right">
                        <div className="text-white flex items-center text-netflix-red mb-1">
                          <Star className="text-white h-4 w-4 fill-current mr-1" />
                          <span className="text-white text-sm font-medium">{pad.rating}</span>
                        </div>
                        <p className="text-white text-xs text-white">({pad.reviewCount})</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Host Info */}
                    <div className="text-white flex items-center space-x-2 mb-4">
                      <div className="text-white w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center">
                        <span className="text-white text-white text-xs font-semibold">{pad.hostAvatar}</span>
                      </div>
                      <div>
                        <p className="text-white text-sm text-white">Hosted by {pad.host}</p>
                        {pad.location && (
                          <p className="text-white text-xs text-white flex items-center">
                            <MapPin className="text-white h-3 w-3 mr-1" />
                            {pad.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Capacity and Users */}
                    <div className="text-white flex items-center justify-between mb-4">
                      <div className="text-white flex items-center space-x-2 text-sm text-white">
                        <Users className="text-white h-4 w-4" />
                        <span>{pad.currentUsers}/{pad.capacity} users</span>
                      </div>
                      {pad.hourlyRate && (
                        <div className="text-white flex items-center text-netflix-red font-semibold">
                          <DollarSign className="text-white h-4 w-4 mr-1" />
                          ${pad.hourlyRate}/hr
                        </div>
                      )}
                    </div>

                    {/* Equipment/Features */}
                    {pad.equipment && pad.equipment.length > 0 && (
                      <div className="text-white mb-4">
                        <p className="text-white text-sm text-white mb-2">Equipment & Features:</p>
                        <div className="text-white flex flex-wrap gap-1">
                          {pad.equipment.slice(0, 2).map((item, index) => (
                            <Badge key={index} variant="outline" className="text-white text-xs border-gray-600 text-white">
                              {item}
                            </Badge>
                          ))}
                          {pad.equipment.length > 2 && (
                            <Badge variant="outline" className="text-white text-xs border-gray-600 text-white">
                              +{pad.equipment.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="text-white flex space-x-2">
                      {pad.isActive && pad.type === "virtual" ? (
                        <Button
                          onClick={() => handleJoinLive(pad.id)}
                          className="text-white flex-1 netflix-button-primary"
                          disabled={pad.currentUsers >= pad.capacity}
                        >
                          <Volume2 className="text-white h-4 w-4 mr-1" />
                          {pad.currentUsers >= pad.capacity ? "Full" : "Join Live"}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBookJamPad(pad.id)}
                          className="text-white flex-1 netflix-button-primary"
                        >
                          <Calendar className="text-white h-4 w-4 mr-1" />
                          Book Now
                        </Button>
                      )}
                      <Button variant="outline" className="text-white netflix-button-secondary">
                        <Play className="text-white h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>

                    {/* Next Available */}
                    {pad.nextAvailable && !pad.isActive && (
                      <p className="text-white text-xs text-white mt-2 flex items-center">
                        <Clock className="text-white h-3 w-3 mr-1" />
                        Next available: {new Date(pad.nextAvailable).toLocaleDateString()} at {new Date(pad.nextAvailable).toLocaleTimeString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJamPads.length === 0 && (
              <div className="text-white text-center py-12">
                <Music className="text-white h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold text-white mb-2">No jam pads found</h3>
                <p className="text-white text-white mb-6">Try adjusting your search criteria or explore different genres</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterGenre("all");
                  }}
                  className="text-white netflix-button-primary"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="text-white space-y-6">
            {!isAuthenticated ? (
              <div className="text-white text-center py-12">
                <Calendar className="text-white h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold text-white mb-2">Sign in to view bookings</h3>
                <p className="text-white text-white mb-6">Track your jam pad reservations and upcoming sessions</p>
                <Button
                  onClick={() => window.location.href = "/login"}
                  className="text-white netflix-button-primary"
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="text-white space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                    <CardContent className="text-white p-6">
                      <div className="text-white flex items-start justify-between">
                        <div className="text-white flex-1">
                          <h3 className="text-white text-lg font-semibold text-white mb-2">{booking.jamPadName}</h3>
                          <div className="text-white grid grid-cols-2 gap-4 text-sm text-white mb-4">
                            <div className="text-white flex items-center">
                              <Calendar className="text-white h-4 w-4 mr-2" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="text-white flex items-center">
                              <Clock className="text-white h-4 w-4 mr-2" />
                              {booking.startTime} - {booking.endTime}
                            </div>
                            <div className="text-white flex items-center">
                              <Users className="text-white h-4 w-4 mr-2" />
                              {booking.participants.length} participants
                            </div>
                            <div className="text-white flex items-center">
                              <DollarSign className="text-white h-4 w-4 mr-2" />
                              ${booking.totalCost}
                            </div>
                          </div>
                        </div>
                        <Badge className={
                          booking.status === "upcoming" ? "bg-red-600/20 text-netflix-red border-red-600/30" :
                          booking.status === "active" ? "bg-red-600/20 text-netflix-red border-blue-600/30" :
                          booking.status === "completed" ? "bg-netflix-dark/20 text-white border-gray-600/30" :
                          "bg-red-600/20 text-red-400 border-red-600/30"
                        }>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-white flex items-center justify-between">
                        <div className="text-white flex -space-x-2">
                          {booking.participants.map((participant, index) => (
                            <div
                              key={participant.id}
                              className="text-white w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center border-2 border-netflix-dark text-xs font-semibold text-white"
                              title={participant.name}
                            >
                              {participant.avatar}
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-white flex space-x-2">
                          {booking.status === "upcoming" && (
                            <>
                              <Button variant="outline" className="text-white netflix-button-secondary text-sm">
                                Modify
                              </Button>
                              <Button className="text-white netflix-button-primary text-sm">
                                Join Session
                              </Button>
                            </>
                          )}
                          {booking.status === "completed" && (
                            <Button variant="outline" className="text-white netflix-button-secondary text-sm">
                              Leave Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {bookings.length === 0 && (
                  <div className="text-white text-center py-12">
                    <Calendar className="text-white h-16 w-16 text-white mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold text-white mb-2">No bookings yet</h3>
                    <p className="text-white text-white mb-6">Book your first jam pad to start making music</p>
                    <Button
                      onClick={() => setActiveTab("browse")}
                      className="text-white netflix-button-primary"
                    >
                      Browse Jam Pads
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Live Sessions Tab */}
          <TabsContent value="live" className="text-white space-y-6">
            <div className="text-white text-center mb-8">
              <h2 className="text-white text-2xl font-bold text-white mb-2">Live Jam Sessions</h2>
              <p className="text-white text-white">Join active sessions happening right now</p>
            </div>

            <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-6">
              {jamPads.filter(pad => pad.isActive && pad.type === "virtual").map((pad) => (
                <Card key={pad.id} className="text-white netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-netflix-red/30">
                  <CardHeader>
                    <div className="text-white flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-white text-lg flex items-center">
                          {pad.name}
                          <Badge className="text-white ml-2 bg-red-600/20 text-red-400 border-red-600/30 animate-pulse">
                            LIVE
                          </Badge>
                        </CardTitle>
                        <p className="text-white text-white text-sm mt-1">{pad.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-white flex items-center justify-between mb-4">
                      <div className="text-white flex items-center space-x-4">
                        <div className="text-white flex items-center space-x-2 text-sm text-white">
                          <Users className="text-white h-4 w-4" />
                          <span>{pad.currentUsers}/{pad.capacity}</span>
                        </div>
                        <Badge variant="secondary" className="text-white bg-netflix-red/20 text-netflix-red">
                          {pad.genre}
                        </Badge>
                      </div>
                      <div className="text-white text-right">
                        <p className="text-white text-sm text-white">Host:</p>
                        <p className="text-white text-white font-medium">{pad.host}</p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleJoinLive(pad.id)}
                      className="text-white w-full netflix-button-primary"
                      disabled={pad.currentUsers >= pad.capacity}
                    >
                      <Zap className="text-white h-4 w-4 mr-2" />
                      {pad.currentUsers >= pad.capacity ? "Session Full" : "Join Live Session"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {jamPads.filter(pad => pad.isActive && pad.type === "virtual").length === 0 && (
              <div className="text-white text-center py-12">
                <Zap className="text-white h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold text-white mb-2">No live sessions active</h3>
                <p className="text-white text-white mb-6">Check back later or browse available jam pads to book a session</p>
                <Button
                  onClick={() => setActiveTab("browse")}
                  className="text-white netflix-button-primary"
                >
                  Browse Jam Pads
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}