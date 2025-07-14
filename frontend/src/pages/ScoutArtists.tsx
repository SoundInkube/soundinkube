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
  Eye,
  Heart,
  Play,
  Pause,
  TrendingUp,
  Users,
  Music,
  Award,
  MessageCircle,
  UserPlus,
  BarChart3,
  Calendar,
  Clock,
  Instagram,
  Youtube,
  Twitter,
  ExternalLink,
  Filter,
  SortAsc,
  Target,
  Zap,
  Activity
} from "lucide-react";

export default function ScoutArtists() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("trending");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Mock data for emerging artists to scout
  const emergingArtists = [
    {
      id: 1,
      name: "Riley Nova",
      stageName: "NOVA",
      age: 22,
      location: "Atlanta, GA",
      genre: "R&B/Pop",
      avatar: "RN",
      verified: false,
      trending: true,
      
      stats: {
        monthlyListeners: 45000,
        followers: 28000,
        growthRate: 85.2,
        engagement: 12.5,
        totalStreams: 890000
      },
      
      socialMedia: {
        instagram: 15000,
        tiktok: 32000,
        youtube: 8500,
        twitter: 6200,
        spotify: 28000
      },
      
      recentTracks: [
        { title: "Midnight Calls", streams: 120000, releaseDate: "2 weeks ago" },
        { title: "Golden Hour", streams: 95000, releaseDate: "1 month ago" },
        { title: "Dreams & Nightmares", streams: 180000, releaseDate: "2 months ago" }
      ],
      
      achievements: [
        "Viral TikTok Sound (500K+ uses)",
        "Featured on Spotify New Music Friday",
        "Local Radio Playlist Addition"
      ],
      
      bio: "22-year-old R&B singer-songwriter from Atlanta with a unique blend of contemporary R&B and pop sensibilities. Known for emotionally driven lyrics and smooth vocal delivery.",
      
      highlights: [
        "85% growth in monthly listeners",
        "Strong social media presence",
        "Consistent release schedule",
        "High engagement rates"
      ],
      
      potentialScore: 8.7,
      riskLevel: "low",
      contactInfo: {
        email: "booking@rilynova.com",
        management: "Independent"
      }
    },
    {
      id: 2,
      name: "Jake Morrison",
      stageName: "J-Mori",
      age: 19,
      location: "Los Angeles, CA",
      genre: "Hip-Hop",
      avatar: "JM",
      verified: false,
      trending: true,
      
      stats: {
        monthlyListeners: 67000,
        followers: 42000,
        growthRate: 120.5,
        engagement: 18.7,
        totalStreams: 1200000
      },
      
      socialMedia: {
        instagram: 25000,
        tiktok: 89000,
        youtube: 12000,
        twitter: 8500,
        spotify: 42000
      },
      
      recentTracks: [
        { title: "Level Up", streams: 240000, releaseDate: "1 week ago" },
        { title: "City Lights", streams: 180000, releaseDate: "3 weeks ago" },
        { title: "On My Way", streams: 320000, releaseDate: "1 month ago" }
      ],
      
      achievements: [
        "Over 1M total streams",
        "Collaborated with established artists",
        "Featured in hip-hop blogs",
        "Growing YouTube presence"
      ],
      
      bio: "19-year-old rapper and producer from LA with a modern trap sound mixed with conscious lyrics. Self-produces most of his music and has a growing fanbase.",
      
      highlights: [
        "120% monthly listener growth",
        "Strong TikTok presence",
        "Self-produced content",
        "Young demographic appeal"
      ],
      
      potentialScore: 9.1,
      riskLevel: "medium",
      contactInfo: {
        email: "contact@jmorimusic.com",
        management: "Self-managed"
      }
    },
    {
      id: 3,
      name: "Luna & The Stars",
      stageName: "Luna & The Stars",
      age: 25,
      location: "Nashville, TN",
      genre: "Indie Folk",
      avatar: "LS",
      verified: false,
      trending: false,
      
      stats: {
        monthlyListeners: 18000,
        followers: 12000,
        growthRate: 35.8,
        engagement: 22.3,
        totalStreams: 340000
      },
      
      socialMedia: {
        instagram: 8000,
        tiktok: 4500,
        youtube: 6200,
        twitter: 3100,
        spotify: 12000
      },
      
      recentTracks: [
        { title: "Whispered Secrets", streams: 45000, releaseDate: "2 weeks ago" },
        { title: "Mountain Song", streams: 38000, releaseDate: "1 month ago" },
        { title: "River's Edge", streams: 62000, releaseDate: "3 months ago" }
      ],
      
      achievements: [
        "Nashville Scene Magazine Feature",
        "Local music festival performances",
        "High engagement rate",
        "Critical acclaim"
      ],
      
      bio: "Indie folk band led by Luna Martinez, known for haunting melodies and poetic lyrics. Strong live performance reputation in the Nashville scene.",
      
      highlights: [
        "High engagement despite smaller following",
        "Strong Nashville music scene presence",
        "Critical acclaim and reviews",
        "Unique sound and artistic vision"
      ],
      
      potentialScore: 7.2,
      riskLevel: "low",
      contactInfo: {
        email: "info@lunaandthestars.com",
        management: "Nashville Music Collective"
      }
    },
    {
      id: 4,
      name: "Electric Maya",
      stageName: "Electric Maya",
      age: 24,
      location: "Brooklyn, NY",
      genre: "Electronic/Pop",
      avatar: "EM",
      verified: false,
      trending: true,
      
      stats: {
        monthlyListeners: 82000,
        followers: 56000,
        growthRate: 95.7,
        engagement: 15.2,
        totalStreams: 1800000
      },
      
      socialMedia: {
        instagram: 34000,
        tiktok: 78000,
        youtube: 19000,
        twitter: 12000,
        spotify: 56000
      },
      
      recentTracks: [
        { title: "Neon Dreams", streams: 380000, releaseDate: "3 days ago" },
        { title: "Digital Love", streams: 290000, releaseDate: "2 weeks ago" },
        { title: "Synthetic Hearts", streams: 420000, releaseDate: "1 month ago" }
      ],
      
      achievements: [
        "1.8M+ total streams",
        "Electronic music blog features",
        "DJ set at major festivals",
        "Remix by established producers"
      ],
      
      bio: "Electronic music producer and vocalist from Brooklyn, creating danceable pop with electronic elements. Known for energetic live performances and visual aesthetics.",
      
      highlights: [
        "Strong streaming numbers",
        "Festival performance experience",
        "Visual brand development",
        "Producer collaborations"
      ],
      
      potentialScore: 8.9,
      riskLevel: "low",
      contactInfo: {
        email: "booking@electricmaya.com",
        management: "Brooklyn Beats Management"
      }
    },
    {
      id: 5,
      name: "The Midnight Collective",
      stageName: "The Midnight Collective",
      age: 27,
      location: "Seattle, WA",
      genre: "Alternative Rock",
      avatar: "MC",
      verified: false,
      trending: false,
      
      stats: {
        monthlyListeners: 23000,
        followers: 16000,
        growthRate: 42.1,
        engagement: 19.8,
        totalStreams: 520000
      },
      
      socialMedia: {
        instagram: 11000,
        tiktok: 5600,
        youtube: 8900,
        twitter: 4200,
        spotify: 16000
      },
      
      recentTracks: [
        { title: "Broken Glass", streams: 68000, releaseDate: "1 week ago" },
        { title: "City Rain", streams: 54000, releaseDate: "3 weeks ago" },
        { title: "Lost in Transit", streams: 89000, releaseDate: "2 months ago" }
      ],
      
      achievements: [
        "Seattle music scene recognition",
        "Radio play on alternative stations",
        "Music venue residencies",
        "Strong local fanbase"
      ],
      
      bio: "Alternative rock band with grunge influences from Seattle. Known for powerful live performances and authentic songwriting that resonates with alternative music fans.",
      
      highlights: [
        "Strong local Seattle presence",
        "Authentic alternative rock sound",
        "Growing radio support",
        "Loyal fanbase development"
      ],
      
      potentialScore: 6.8,
      riskLevel: "medium",
      contactInfo: {
        email: "band@midnightcollective.com",
        management: "Pacific Northwest Music Group"
      }
    }
  ];

  const genres = [
    { id: "all", name: "All Genres" },
    { id: "Hip-Hop", name: "Hip-Hop" },
    { id: "R&B/Pop", name: "R&B/Pop" },
    { id: "Electronic/Pop", name: "Electronic/Pop" },
    { id: "Indie Folk", name: "Indie Folk" },
    { id: "Alternative Rock", name: "Alternative Rock" }
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "Los Angeles", name: "Los Angeles" },
    { id: "New York", name: "New York" },
    { id: "Atlanta", name: "Atlanta" },
    { id: "Nashville", name: "Nashville" },
    { id: "Seattle", name: "Seattle" }
  ];

  const sortOptions = [
    { id: "trending", name: "Trending" },
    { id: "potential", name: "Highest Potential" },
    { id: "growth", name: "Fastest Growing" },
    { id: "engagement", name: "Best Engagement" },
    { id: "streams", name: "Most Streams" }
  ];

  // Filter and sort artists
  const filteredArtists = emergingArtists
    .filter(artist => {
      const matchesSearch = 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === "all" || artist.genre.includes(selectedGenre);
      const matchesLocation = selectedLocation === "all" || artist.location.includes(selectedLocation);

      return matchesSearch && matchesGenre && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "potential":
          return b.potentialScore - a.potentialScore;
        case "growth":
          return b.stats.growthRate - a.stats.growthRate;
        case "engagement":
          return b.stats.engagement - a.stats.engagement;
        case "streams":
          return b.stats.totalStreams - a.stats.totalStreams;
        default:
          return b.trending === a.trending ? 0 : b.trending ? 1 : -1;
      }
    });

  const getPotentialColor = (score: number) => {
    if (score >= 8.5) return 'text-netflix-red bg-netflix-red/10';
    if (score >= 7.0) return 'text-netflix-red bg-netflix-red/10';
    return 'text-orange-400 bg-orange-400/10';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-netflix-red bg-netflix-red/10';
      case 'medium': return 'text-netflix-red bg-netflix-red/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      default: return 'text-white bg-netflix-dark/10';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleContactArtist = (artistId: number) => {
    console.log(`Contacting artist ${artistId}`);
  };

  const handleAddToWatchlist = (artistId: number) => {
    console.log(`Adding artist ${artistId} to watchlist`);
  };

  const toggleAudioPlay = (trackId: string) => {
    if (isPlaying === trackId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(trackId);
    }
  };

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-8">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-white text-center mb-12">
          <h1 className="text-white text-4xl lg:text-6xl font-bold text-white mb-6">
            Scout
            <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
              Artists
            </span>
          </h1>
          <p className="text-white text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Discover emerging talent before they break into the mainstream. Use advanced analytics 
            and trend data to identify the next generation of music stars.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="text-white bg-netflix-dark/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
          <div className="text-white grid lg:grid-cols-4 gap-4">
            <div className="text-white relative">
              <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
              <Input
                type="text"
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-white pl-10 bg-netflix-dark border-gray-700 text-white placeholder-gray-400 focus:border-netflix-red"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="text-white px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
            >
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-white px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-white px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="text-white flex justify-between items-center mb-6">
          <div className="text-white text-white">
            <span className="text-white text-lg font-medium">
              {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} found
            </span>
          </div>
          <div className="text-white flex items-center space-x-2 text-sm text-white">
            <SortAsc className="text-white h-4 w-4" />
            <span>Sorted by {sortOptions.find(opt => opt.id === sortBy)?.name}</span>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="text-white grid lg:grid-cols-1 gap-6 mb-12">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="text-white p-6">
                <div className="text-white grid lg:grid-cols-4 gap-6">
                  {/* Artist Info */}
                  <div className="text-white lg:col-span-1">
                    <div className="text-white flex items-center space-x-4 mb-4">
                      <div className="text-white w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {artist.avatar}
                      </div>
                      <div>
                        <div className="text-white flex items-center space-x-2">
                          <h3 className="text-white text-xl font-bold text-white">{artist.stageName}</h3>
                          {artist.trending && (
                            <Badge className="text-white bg-netflix-red/20 text-netflix-red text-xs">
                              <TrendingUp className="text-white h-3 w-3 mr-1" />
                              TRENDING
                            </Badge>
                          )}
                        </div>
                        <p className="text-white text-white">{artist.name}</p>
                        <div className="text-white flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-white bg-netflix-dark text-white text-xs">
                            {artist.genre}
                          </Badge>
                          <div className="text-white flex items-center space-x-1 text-xs text-white">
                            <MapPin className="text-white h-3 w-3" />
                            <span>{artist.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-white space-y-2">
                      <div className="text-white flex items-center justify-between text-sm">
                        <span className="text-white text-white">Potential Score</span>
                        <Badge className={`text-xs ${getPotentialColor(artist.potentialScore)}`}>
                          {artist.potentialScore}/10
                        </Badge>
                      </div>
                      <div className="text-white flex items-center justify-between text-sm">
                        <span className="text-white text-white">Risk Level</span>
                        <Badge className={`text-xs ${getRiskColor(artist.riskLevel)}`}>
                          {artist.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-white lg:col-span-1">
                    <h4 className="text-white text-white font-medium mb-3">Performance Metrics</h4>
                    <div className="text-white space-y-3">
                      <div className="text-white flex justify-between">
                        <span className="text-white text-white">Monthly Listeners</span>
                        <span className="text-white text-white font-medium">{formatNumber(artist.stats.monthlyListeners)}</span>
                      </div>
                      <div className="text-white flex justify-between">
                        <span className="text-white text-white">Growth Rate</span>
                        <span className="text-white text-netflix-red font-medium">+{artist.stats.growthRate}%</span>
                      </div>
                      <div className="text-white flex justify-between">
                        <span className="text-white text-white">Engagement</span>
                        <span className="text-white text-white font-medium">{artist.stats.engagement}%</span>
                      </div>
                      <div className="text-white flex justify-between">
                        <span className="text-white text-white">Total Streams</span>
                        <span className="text-white text-white font-medium">{formatNumber(artist.stats.totalStreams)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Tracks */}
                  <div className="text-white lg:col-span-1">
                    <h4 className="text-white text-white font-medium mb-3">Recent Tracks</h4>
                    <div className="text-white space-y-2">
                      {artist.recentTracks.slice(0, 3).map((track, index) => (
                        <div key={index} className="text-white flex items-center justify-between">
                          <div className="text-white flex items-center space-x-2">
                            <button
                              onClick={() => toggleAudioPlay(`${artist.id}-${index}`)}
                              className="text-white w-6 h-6 bg-netflix-red rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              {isPlaying === `${artist.id}-${index}` ? (
                                <Pause className="text-white h-3 w-3 text-white" />
                              ) : (
                                <Play className="text-white h-3 w-3 text-white ml-0.5" />
                              )}
                            </button>
                            <div>
                              <p className="text-white text-white text-sm font-medium">{track.title}</p>
                              <p className="text-white text-white text-xs">{track.releaseDate}</p>
                            </div>
                          </div>
                          <span className="text-white text-white text-xs">{formatNumber(track.streams)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-white lg:col-span-1">
                    <h4 className="text-white text-white font-medium mb-3">Scout Actions</h4>
                    <div className="text-white space-y-2">
                      <Button
                        onClick={() => handleContactArtist(artist.id)}
                        className="text-white w-full netflix-button-primary text-sm"
                      >
                        <MessageCircle className="text-white h-4 w-4 mr-2" />
                        Contact Artist
                      </Button>
                      <Button
                        onClick={() => handleAddToWatchlist(artist.id)}
                        variant="outline"
                        className="text-white w-full border-gray-700 text-white hover:bg-netflix-dark text-sm"
                      >
                        <Heart className="text-white h-4 w-4 mr-2" />
                        Add to Watchlist
                      </Button>
                      <Button
                        variant="outline"
                        className="text-white w-full border-gray-700 text-white hover:bg-netflix-dark text-sm"
                      >
                        <BarChart3 className="text-white h-4 w-4 mr-2" />
                        Full Analytics
                      </Button>
                      <Button
                        variant="outline"
                        className="text-white w-full border-gray-700 text-white hover:bg-netflix-dark text-sm"
                      >
                        <Eye className="text-white h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                    
                    {/* Social Media Quick View */}
                    <div className="text-white mt-4 pt-4 border-t border-gray-700">
                      <h5 className="text-white text-white text-sm font-medium mb-2">Social Following</h5>
                      <div className="text-white grid grid-cols-2 gap-2 text-xs">
                        <div className="text-white flex items-center space-x-1 text-white">
                          <Instagram className="text-white h-3 w-3" />
                          <span>{formatNumber(artist.socialMedia.instagram)}</span>
                        </div>
                        <div className="text-white flex items-center space-x-1 text-white">
                          <Youtube className="text-white h-3 w-3" />
                          <span>{formatNumber(artist.socialMedia.youtube)}</span>
                        </div>
                        <div className="text-white flex items-center space-x-1 text-white">
                          <Music className="text-white h-3 w-3" />
                          <span>{formatNumber(artist.socialMedia.tiktok)}</span>
                        </div>
                        <div className="text-white flex items-center space-x-1 text-white">
                          <Twitter className="text-white h-3 w-3" />
                          <span>{formatNumber(artist.socialMedia.twitter)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artist Bio & Highlights */}
                <div className="text-white mt-6 pt-6 border-t border-gray-700">
                  <div className="text-white grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white text-white font-medium mb-2">About</h4>
                      <p className="text-white text-white text-sm leading-relaxed">{artist.bio}</p>
                    </div>
                    <div>
                      <h4 className="text-white text-white font-medium mb-2">Key Highlights</h4>
                      <ul className="text-white space-y-1">
                        {artist.highlights.map((highlight, index) => (
                          <li key={index} className="text-white flex items-center space-x-2 text-sm text-white">
                            <Zap className="text-white h-3 w-3 text-netflix-red" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-white bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-white text-2xl font-bold text-white mb-4">
            Advanced Artist Discovery Tools
          </h3>
          <p className="text-white text-white mb-6 max-w-2xl mx-auto">
            Get deeper insights with our premium scouting tools. Track emerging trends, 
            analyze market potential, and discover artists before your competition.
          </p>
          <div className="text-white flex justify-center space-x-4">
            <Button className="text-white netflix-button-primary text-lg px-8 py-3">
              Upgrade to Pro Scouting
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-gray-700 text-white hover:bg-netflix-dark text-lg px-8 py-3"
            >
              View Trending Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}