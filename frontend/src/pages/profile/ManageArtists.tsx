import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  Plus, 
  Star, 
  TrendingUp,
  Music,
  MessageCircle,
  Eye,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Filter,
  Award,
  Play,
  Download,
  Share2,
  Edit,
  MoreHorizontal,
  Mic,
  Radio,
  Activity,
  Target
} from "lucide-react";
import { useState } from "react";

export default function ManageArtists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const artists = [
    {
      id: 1,
      name: "Maya Johnson",
      stageName: "Maya J",
      avatar: "MJ",
      genre: "R&B/Soul",
      status: "Active",
      contractType: "Recording Contract",
      signedDate: "2023-08-15",
      contractExpiry: "2026-08-15",
      socialMedia: {
        instagram: "maya_j_official",
        spotify: "Maya J",
        youtube: "MayaJOfficial",
        followers: {
          instagram: 125000,
          spotify: 85000,
          youtube: 45000
        }
      },
      currentProjects: [
        { name: "Debut Album", status: "Recording", progress: 65, deadline: "2024-09-15" },
        { name: "Summer Single", status: "Mixed", progress: 90, deadline: "2024-07-01" }
      ],
      performance: {
        monthlyStreams: 450000,
        revenue: 12500,
        growthRate: 18.5,
        topTracks: ["Midnight Dreams", "Summer Glow", "Heart & Soul"]
      },
      upcomingEvents: [
        { name: "Summer Music Festival", date: "2024-07-20", location: "Los Angeles, CA", type: "Festival" },
        { name: "Album Release Party", date: "2024-09-20", location: "Nashville, TN", type: "Private Event" }
      ],
      contact: {
        phone: "+1 (555) 123-4567",
        email: "maya.johnson@email.com",
        manager: "David Smith"
      },
      financials: {
        totalEarnings: 156000,
        pendingPayments: 8500,
        lastPayment: "2024-06-15",
        royaltyRate: 15
      }
    },
    {
      id: 2,
      name: "Marcus Thompson",
      stageName: "M-Tech",
      avatar: "MT",
      genre: "Hip-Hop",
      status: "Active",
      contractType: "360 Deal",
      signedDate: "2024-01-10",
      contractExpiry: "2029-01-10",
      socialMedia: {
        instagram: "mtech_official",
        spotify: "M-Tech",
        youtube: "MTechHipHop",
        followers: {
          instagram: 89000,
          spotify: 156000,
          youtube: 78000
        }
      },
      currentProjects: [
        { name: "Mixtape Vol. 3", status: "Production", progress: 40, deadline: "2024-08-30" },
        { name: "Collaboration EP", status: "Planning", progress: 15, deadline: "2024-10-15" }
      ],
      performance: {
        monthlyStreams: 680000,
        revenue: 18200,
        growthRate: 25.8,
        topTracks: ["Street Dreams", "Rise Up", "City Lights"]
      },
      upcomingEvents: [
        { name: "Hip-Hop Showcase", date: "2024-07-15", location: "Atlanta, GA", type: "Concert" },
        { name: "Radio Interview", date: "2024-06-28", location: "NYC, NY", type: "Media" }
      ],
      contact: {
        phone: "+1 (555) 234-5678",
        email: "marcus.thompson@email.com",
        manager: "Sarah Lee"
      },
      financials: {
        totalEarnings: 98000,
        pendingPayments: 12000,
        lastPayment: "2024-06-20",
        royaltyRate: 20
      }
    },
    {
      id: 3,
      name: "Luna Rodriguez",
      stageName: "Luna",
      avatar: "LR",
      genre: "Pop",
      status: "Active",
      contractType: "Distribution Deal",
      signedDate: "2023-12-05",
      contractExpiry: "2025-12-05",
      socialMedia: {
        instagram: "luna_pop_star",
        spotify: "Luna",
        youtube: "LunaOfficialMusic",
        followers: {
          instagram: 234000,
          spotify: 198000,
          youtube: 112000
        }
      },
      currentProjects: [
        { name: "Pop Anthem Single", status: "Mastering", progress: 95, deadline: "2024-07-05" },
        { name: "Music Video", status: "Post-Production", progress: 70, deadline: "2024-07-20" }
      ],
      performance: {
        monthlyStreams: 890000,
        revenue: 24500,
        growthRate: 32.1,
        topTracks: ["Neon Nights", "Dancing Free", "Electric Love"]
      },
      upcomingEvents: [
        { name: "Pop Music Awards", date: "2024-08-12", location: "Los Angeles, CA", type: "Awards Show" },
        { name: "European Tour", date: "2024-09-01", location: "London, UK", type: "Tour" }
      ],
      contact: {
        phone: "+1 (555) 345-6789",
        email: "luna.rodriguez@email.com",
        manager: "Mike Wilson"
      },
      financials: {
        totalEarnings: 187000,
        pendingPayments: 15500,
        lastPayment: "2024-06-18",
        royaltyRate: 12
      }
    },
    {
      id: 4,
      name: "Alex Chen",
      stageName: "A.C.",
      avatar: "AC",
      genre: "Electronic",
      status: "Development",
      contractType: "Development Deal",
      signedDate: "2024-03-20",
      contractExpiry: "2025-03-20",
      socialMedia: {
        instagram: "ac_electronic",
        spotify: "A.C.",
        youtube: "ACElectronicMusic",
        followers: {
          instagram: 45000,
          spotify: 67000,
          youtube: 38000
        }
      },
      currentProjects: [
        { name: "Debut EP", status: "Pre-Production", progress: 25, deadline: "2024-11-01" },
        { name: "Remix Package", status: "Planning", progress: 10, deadline: "2024-09-15" }
      ],
      performance: {
        monthlyStreams: 245000,
        revenue: 6800,
        growthRate: 45.2,
        topTracks: ["Synthesized", "Digital Dreams", "Cyber Pulse"]
      },
      upcomingEvents: [
        { name: "Electronic Music Conference", date: "2024-07-25", location: "Miami, FL", type: "Conference" },
        { name: "DJ Set Performance", date: "2024-08-05", location: "Ibiza, Spain", type: "Performance" }
      ],
      contact: {
        phone: "+1 (555) 456-7890",
        email: "alex.chen@email.com",
        manager: "Jennifer Park"
      },
      financials: {
        totalEarnings: 34000,
        pendingPayments: 4200,
        lastPayment: "2024-06-10",
        royaltyRate: 18
      }
    },
    {
      id: 5,
      name: "Sophie Williams",
      stageName: "Sophie W",
      avatar: "SW",
      genre: "Indie Folk",
      status: "On Hold",
      contractType: "Recording Contract",
      signedDate: "2023-05-18",
      contractExpiry: "2025-05-18",
      socialMedia: {
        instagram: "sophie_w_music",
        spotify: "Sophie W",
        youtube: "SophieWMusic",
        followers: {
          instagram: 67000,
          spotify: 78000,
          youtube: 29000
        }
      },
      currentProjects: [
        { name: "Acoustic Album", status: "On Hold", progress: 55, deadline: "2024-12-01" }
      ],
      performance: {
        monthlyStreams: 123000,
        revenue: 3200,
        growthRate: -8.5,
        topTracks: ["Whispered Words", "Mountain Breeze", "Quiet Moments"]
      },
      upcomingEvents: [],
      contact: {
        phone: "+1 (555) 567-8901",
        email: "sophie.williams@email.com",
        manager: "Tom Anderson"
      },
      financials: {
        totalEarnings: 45000,
        pendingPayments: 2100,
        lastPayment: "2024-05-15",
        royaltyRate: 14
      }
    },
    {
      id: 6,
      name: "Jordan Blake",
      stageName: "J.Blake",
      avatar: "JB",
      genre: "Alternative Rock",
      status: "Active",
      contractType: "Recording Contract",
      signedDate: "2023-11-22",
      contractExpiry: "2027-11-22",
      socialMedia: {
        instagram: "j_blake_rock",
        spotify: "J.Blake",
        youtube: "JBlakeOfficial",
        followers: {
          instagram: 156000,
          spotify: 201000,
          youtube: 89000
        }
      },
      currentProjects: [
        { name: "Rock Album", status: "Recording", progress: 78, deadline: "2024-08-20" },
        { name: "Acoustic Sessions", status: "Completed", progress: 100, deadline: "2024-06-15" }
      ],
      performance: {
        monthlyStreams: 567000,
        revenue: 16800,
        growthRate: 22.4,
        topTracks: ["Thunder Road", "Electric Storm", "Rebel Heart"]
      },
      upcomingEvents: [
        { name: "Rock Festival Main Stage", date: "2024-08-10", location: "Austin, TX", type: "Festival" },
        { name: "Album Launch Concert", date: "2024-09-05", location: "Nashville, TN", type: "Concert" }
      ],
      contact: {
        phone: "+1 (555) 678-9012",
        email: "jordan.blake@email.com",
        manager: "Lisa Martinez"
      },
      financials: {
        totalEarnings: 124000,
        pendingPayments: 9800,
        lastPayment: "2024-06-12",
        royaltyRate: 16
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-600/20 text-green-400';
      case 'Development': return 'bg-red-600/20 text-blue-400';
      case 'On Hold': return 'bg-yellow-600/20 text-yellow-400';
      case 'Inactive': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-red-600/20 text-green-400';
      case 'Recording': return 'bg-red-600/20 text-blue-400';
      case 'Mixed': return 'bg-red-600/20 text-purple-400';
      case 'Mastering': return 'bg-orange-600/20 text-orange-400';
      case 'Production': return 'bg-yellow-600/20 text-yellow-400';
      case 'Planning': return 'bg-gray-600/20 text-gray-400';
      case 'On Hold': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || artist.status.toLowerCase().replace(" ", "_") === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalArtists: artists.length,
    activeArtists: artists.filter(a => a.status === "Active").length,
    totalMonthlyStreams: artists.reduce((sum, a) => sum + a.performance.monthlyStreams, 0),
    totalMonthlyRevenue: artists.reduce((sum, a) => sum + a.performance.revenue, 0),
    averageGrowthRate: artists.reduce((sum, a) => sum + a.performance.growthRate, 0) / artists.length
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Artists</h1>
            <p className="text-gray-400">Oversee your artist roster and track their performance</p>
          </div>
          <Button className="netflix-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Artist
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-5 gap-4 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.totalArtists}</p>
                  <p className="text-gray-400 text-sm">Total Artists</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.activeArtists}</p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Play className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{(stats.totalMonthlyStreams / 1000000).toFixed(1)}M</p>
                  <p className="text-gray-400 text-sm">Monthly Streams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-netflix-red/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white font-semibold">${(stats.totalMonthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.averageGrowthRate.toFixed(1)}%</p>
                  <p className="text-gray-400 text-sm">Avg Growth</p>
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
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'development', label: 'Development' },
              { key: 'on_hold', label: 'On Hold' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={filterStatus === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(filter.key)}
                className={filterStatus === filter.key ? "netflix-button-primary" : "border-gray-700 text-gray-300"}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid xl:grid-cols-2 gap-8">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="p-6">
                {/* Artist Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-netflix-red text-white text-xl">
                        {artist.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">{artist.stageName}</h3>
                      <p className="text-gray-400">{artist.name}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                          {artist.genre}
                        </Badge>
                        <Badge className={getStatusColor(artist.status)}>
                          {artist.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-400">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Monthly Streams</span>
                      <Play className="h-4 w-4 text-purple-400" />
                    </div>
                    <p className="text-white font-bold text-lg">{(artist.performance.monthlyStreams / 1000).toFixed(0)}K</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className={`h-3 w-3 ${artist.performance.growthRate > 0 ? 'text-green-400' : 'text-red-400'}`} />
                      <span className={`text-xs ${artist.performance.growthRate > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {artist.performance.growthRate > 0 ? '+' : ''}{artist.performance.growthRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Monthly Revenue</span>
                      <DollarSign className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-white font-bold text-lg">${(artist.performance.revenue / 1000).toFixed(1)}K</p>
                    <p className="text-gray-400 text-xs mt-1">{artist.financials.royaltyRate}% royalty rate</p>
                  </div>
                </div>

                {/* Social Media Stats */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Social Media Following</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <p className="text-white font-semibold">{(artist.socialMedia.followers.instagram / 1000).toFixed(0)}K</p>
                      <p className="text-gray-400 text-xs">Instagram</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold">{(artist.socialMedia.followers.spotify / 1000).toFixed(0)}K</p>
                      <p className="text-gray-400 text-xs">Spotify</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold">{(artist.socialMedia.followers.youtube / 1000).toFixed(0)}K</p>
                      <p className="text-gray-400 text-xs">YouTube</p>
                    </div>
                  </div>
                </div>

                {/* Current Projects */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Current Projects</h4>
                  <div className="space-y-3">
                    {artist.currentProjects.map((project, index) => (
                      <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-medium">{project.name}</h5>
                          <Badge className={getProjectStatusColor(project.status)} variant="secondary">
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Progress</span>
                          <span className="text-white text-sm font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5 mb-2" />
                        <p className="text-gray-400 text-xs">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Tracks */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Top Tracks</h4>
                  <div className="space-y-2">
                    {artist.performance.topTracks.slice(0, 3).map((track, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-netflix-red rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{track}</p>
                        </div>
                        <Play className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                {artist.upcomingEvents.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Upcoming Events</h4>
                    <div className="space-y-2">
                      {artist.upcomingEvents.slice(0, 2).map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                          <div>
                            <p className="text-white text-sm font-medium">{event.name}</p>
                            <p className="text-gray-400 text-xs">{event.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-sm">{new Date(event.date).toLocaleDateString()}</p>
                            <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contract Info */}
                <div className="mb-6 p-3 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Contract Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{artist.contractType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Signed:</span>
                      <span className="text-white">{new Date(artist.signedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expires:</span>
                      <span className="text-white">{new Date(artist.contractExpiry).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 netflix-button-primary">
                    <Eye className="h-3 w-3 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                    <MessageCircle className="h-3 w-3 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No artists found</h3>
            <p className="text-gray-400 mb-6">Start building your artist roster</p>
            <Button className="netflix-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Artist
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}