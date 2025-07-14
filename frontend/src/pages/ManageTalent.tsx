import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  Plus,
  Edit,
  Eye,
  MoreVertical,
  Star,
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  Music,
  Award,
  FileText,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  BarChart3,
  Target,
  Briefcase,
  MapPin
} from "lucide-react";

export default function ManageTalent() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Mock data for managed artists
  const managedArtists = [
    {
      id: 1,
      name: "Luna Martinez",
      stageName: "Luna M",
      genre: "Pop",
      status: "active",
      contractStatus: "signed",
      joinDate: "2023-01-15",
      avatar: "LM",
      
      stats: {
        monthlyStreams: 245000,
        followers: 89000,
        revenue: 15400,
        shows: 12
      },
      
      recentActivity: [
        { type: "release", description: "New single 'Midnight Dreams' released", date: "2 days ago" },
        { type: "performance", description: "Performed at Summer Music Festival", date: "1 week ago" },
        { type: "milestone", description: "Reached 80K followers on Instagram", date: "2 weeks ago" }
      ],
      
      upcomingEvents: [
        { event: "Studio Recording Session", date: "March 15, 2024", type: "recording" },
        { event: "Radio Interview - KPOP FM", date: "March 18, 2024", type: "promotion" },
        { event: "Concert - The Venue", date: "March 25, 2024", type: "performance" }
      ],
      
      contracts: [
        { type: "Recording Contract", status: "active", expires: "2025-01-15", value: 150000 },
        { type: "Publishing Deal", status: "active", expires: "2026-01-15", value: 75000 }
      ],
      
      socialMedia: {
        instagram: 45000,
        tiktok: 32000,
        spotify: 89000,
        youtube: 21000
      },
      
      achievements: ["Billboard Hot 100 Entry", "1M+ Streams on Debut Single", "Opening Act for Major Tour"],
      priority: "high"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      stageName: "MC Dynamic",
      genre: "Hip-Hop",
      status: "active",
      contractStatus: "negotiating",
      joinDate: "2023-06-20",
      avatar: "MD",
      
      stats: {
        monthlyStreams: 180000,
        followers: 67000,
        revenue: 12200,
        shows: 8
      },
      
      recentActivity: [
        { type: "collaboration", description: "Collaboration with Luna M confirmed", date: "3 days ago" },
        { type: "content", description: "New music video in production", date: "5 days ago" },
        { type: "business", description: "Brand partnership with UrbanWear Co.", date: "1 week ago" }
      ],
      
      upcomingEvents: [
        { event: "Contract Renewal Meeting", date: "March 12, 2024", type: "business" },
        { event: "Music Video Shoot", date: "March 20, 2024", type: "content" },
        { event: "Album Release Party", date: "April 5, 2024", type: "event" }
      ],
      
      contracts: [
        { type: "Recording Contract", status: "negotiating", expires: "2024-06-20", value: 120000 },
        { type: "Management Agreement", status: "active", expires: "2025-06-20", value: 50000 }
      ],
      
      socialMedia: {
        instagram: 34000,
        tiktok: 28000,
        spotify: 67000,
        youtube: 19000
      },
      
      achievements: ["Local Music Award Winner", "500K+ Total Streams", "Featured in Music Blog"],
      priority: "medium"
    },
    {
      id: 3,
      name: "Sarah Chen",
      stageName: "Echo",
      genre: "Electronic",
      status: "developing",
      contractStatus: "signed",
      joinDate: "2023-09-10",
      avatar: "EC",
      
      stats: {
        monthlyStreams: 89000,
        followers: 23000,
        revenue: 5600,
        shows: 4
      },
      
      recentActivity: [
        { type: "development", description: "Completed 3-month artist development program", date: "1 day ago" },
        { type: "collaboration", description: "Remix collaboration with DJ Luna", date: "4 days ago" },
        { type: "content", description: "Behind-the-scenes content created", date: "1 week ago" }
      ],
      
      upcomingEvents: [
        { event: "EP Recording Sessions", date: "March 14, 2024", type: "recording" },
        { event: "Artist Development Workshop", date: "March 22, 2024", type: "development" },
        { event: "Local Club Performance", date: "March 30, 2024", type: "performance" }
      ],
      
      contracts: [
        { type: "Development Deal", status: "active", expires: "2024-09-10", value: 25000 },
        { type: "Publishing Option", status: "pending", expires: "2024-12-10", value: 30000 }
      ],
      
      socialMedia: {
        instagram: 12000,
        tiktok: 18000,
        spotify: 23000,
        youtube: 8000
      },
      
      achievements: ["Emerging Artist Showcase Winner", "100K+ Streams on Debut", "Music Producer Collaboration"],
      priority: "high"
    },
    {
      id: 4,
      name: "The Velvet Sound",
      stageName: "The Velvet Sound",
      genre: "Indie Rock",
      status: "hiatus",
      contractStatus: "signed",
      joinDate: "2022-11-05",
      avatar: "VS",
      
      stats: {
        monthlyStreams: 45000,
        followers: 31000,
        revenue: 3200,
        shows: 2
      },
      
      recentActivity: [
        { type: "status", description: "Band announced temporary hiatus", date: "2 months ago" },
        { type: "release", description: "Last single 'Fade Away' released", date: "3 months ago" },
        { type: "performance", description: "Final tour show completed", date: "4 months ago" }
      ],
      
      upcomingEvents: [
        { event: "Contract Review Meeting", date: "April 1, 2024", type: "business" },
        { event: "Potential Reunion Discussion", date: "June 1, 2024", type: "planning" }
      ],
      
      contracts: [
        { type: "Band Agreement", status: "active", expires: "2025-11-05", value: 80000 },
        { type: "Publishing Deal", status: "active", expires: "2025-11-05", value: 40000 }
      ],
      
      socialMedia: {
        instagram: 28000,
        tiktok: 15000,
        spotify: 31000,
        youtube: 25000
      },
      
      achievements: ["Regional Tour Success", "Music Festival Headliner", "2M+ Total Streams"],
      priority: "low"
    }
  ];

  const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "active", name: "Active" },
    { id: "developing", name: "Developing" },
    { id: "hiatus", name: "On Hiatus" },
    { id: "negotiating", name: "Negotiating" }
  ];

  const genreOptions = [
    { id: "all", name: "All Genres" },
    { id: "Pop", name: "Pop" },
    { id: "Hip-Hop", name: "Hip-Hop" },
    { id: "Electronic", name: "Electronic" },
    { id: "Indie Rock", name: "Indie Rock" },
    { id: "R&B", name: "R&B" }
  ];

  // Filter artists based on search and filters
  const filteredArtists = managedArtists.filter(artist => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || artist.status === selectedStatus;
    const matchesGenre = selectedGenre === "all" || artist.genre === selectedGenre;

    return matchesSearch && matchesStatus && matchesGenre;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'developing': return 'text-blue-400 bg-blue-400/10';
      case 'hiatus': return 'text-yellow-400 bg-yellow-400/10';
      case 'negotiating': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
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

  const totalRevenue = managedArtists.reduce((sum, artist) => sum + artist.stats.revenue, 0);
  const totalStreams = managedArtists.reduce((sum, artist) => sum + artist.stats.monthlyStreams, 0);
  const activeArtists = managedArtists.filter(artist => artist.status === 'active').length;

  return (
    <div className="min-h-screen bg-netflix-black pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Manage
              <span className="bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent ml-3">
                Talent
              </span>
            </h1>
            <p className="text-gray-300">
              Oversee your artist roster, track performance, and manage contracts
            </p>
          </div>
          <Button className="netflix-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Artist
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-netflix-red/20 rounded-lg">
                  <Users className="h-6 w-6 text-netflix-red" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Artists</p>
                  <p className="text-2xl font-bold text-white">{activeArtists}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-600/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-600/20 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Monthly Streams</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(totalStreams)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-600/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Growth Rate</p>
                  <p className="text-2xl font-bold text-white">+12.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-netflix-red"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
            >
              {statusOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
            >
              {genreOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Artists List */}
        <div className="space-y-6 mb-12">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Artist Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {artist.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{artist.stageName}</h3>
                        <p className="text-gray-400">{artist.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                            {artist.genre}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(artist.status)}`}>
                            {artist.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div>Joined: {new Date(artist.joinDate).toLocaleDateString()}</div>
                      <div>Contract: {artist.contractStatus}</div>
                      <Badge className={`text-xs ${getPriorityColor(artist.priority)}`}>
                        {artist.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="lg:col-span-1">
                    <h4 className="text-white font-medium mb-3">Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Streams</span>
                        <span className="text-white font-medium">{formatNumber(artist.stats.monthlyStreams)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Followers</span>
                        <span className="text-white font-medium">{formatNumber(artist.stats.followers)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Revenue</span>
                        <span className="text-green-400 font-medium">${artist.stats.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shows (YTD)</span>
                        <span className="text-white font-medium">{artist.stats.shows}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="lg:col-span-1">
                    <h4 className="text-white font-medium mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      {artist.recentActivity.slice(0, 3).map((activity, index) => (
                        <div key={index} className="text-sm">
                          <p className="text-gray-300">{activity.description}</p>
                          <p className="text-gray-400 text-xs">{activity.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1">
                    <h4 className="text-white font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 text-sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 text-sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 text-sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Contracts
                      </Button>
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 text-sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">
            Grow Your Artist Roster
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Discover new talent and expand your management portfolio. Use our scouting tools 
            to find the next big artists in the music industry.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="netflix-button-primary text-lg px-8 py-3">
              Scout New Artists
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}