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
  Clock, 
  Calendar,
  Music,
  MessageCircle,
  FileText,
  Play,
  Star,
  DollarSign,
  Filter,
  Eye,
  Share2,
  Download
} from "lucide-react";
import { useState } from "react";

export default function MyCollaborations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const collaborations = [
    {
      id: 1,
      title: "Summer Vibes EP",
      type: "EP Production",
      client: {
        name: "Maya Johnson",
        avatar: "MJ",
        role: "Artist"
      },
      collaborators: [
        { name: "Sarah Chen", avatar: "SC", role: "Mixing Engineer" },
        { name: "Mike Torres", avatar: "MT", role: "Songwriter" }
      ],
      status: "In Progress",
      progress: 75,
      deadline: "2024-07-15",
      budget: 2500,
      paid: 1875,
      description: "Creating a 5-track summer EP with tropical house influences. Currently in mixing phase.",
      tracks: [
        { name: "Sunset Dreams", status: "Mixed", duration: "3:24" },
        { name: "Ocean Breeze", status: "Mixed", duration: "3:47" },
        { name: "Summer Nights", status: "Recording", duration: "3:12" },
        { name: "Tropical Love", status: "Demo", duration: "3:35" },
        { name: "Golden Hour", status: "Demo", duration: "4:02" }
      ],
      lastActivity: "2024-06-20",
      messages: 12
    },
    {
      id: 2,
      title: "Hip-Hop Album Mix",
      type: "Mixing & Mastering",
      client: {
        name: "Street Records",
        avatar: "SR",
        role: "Record Label"
      },
      collaborators: [
        { name: "DJ Phantom", avatar: "DP", role: "Producer" }
      ],
      status: "In Progress",
      progress: 45,
      deadline: "2024-08-01",
      budget: 3200,
      paid: 1600,
      description: "Mixing and mastering a 12-track hip-hop album for Street Records' new artist.",
      tracks: [
        { name: "Intro", status: "Mastered", duration: "1:45" },
        { name: "Rising Up", status: "Mixed", duration: "3:28" },
        { name: "Street Life", status: "Mixed", duration: "4:12" },
        { name: "Dreams", status: "Recording", duration: "3:55" },
        { name: "Victory", status: "Demo", duration: "3:33" }
      ],
      lastActivity: "2024-06-18",
      messages: 8
    },
    {
      id: 3,
      title: "Pop Single Production",
      type: "Single Production",
      client: {
        name: "Sarah Lee",
        avatar: "SL",
        role: "Independent Artist"
      },
      collaborators: [
        { name: "Luna Martinez", avatar: "LM", role: "Vocalist" }
      ],
      status: "Completed",
      progress: 100,
      deadline: "2024-06-01",
      budget: 1200,
      paid: 1200,
      description: "Produced a pop single with modern production techniques and catchy melodies.",
      tracks: [
        { name: "Breakaway", status: "Mastered", duration: "3:18" }
      ],
      lastActivity: "2024-06-01",
      messages: 15,
      rating: 4.8
    },
    {
      id: 4,
      title: "R&B Collaboration",
      type: "Co-Production",
      client: {
        name: "Divine Sounds",
        avatar: "DS",
        role: "Music Collective"
      },
      collaborators: [
        { name: "Marcus Johnson", avatar: "MJ", role: "Guitarist" },
        { name: "Nina Rodriguez", avatar: "NR", role: "Vocalist" }
      ],
      status: "Review",
      progress: 90,
      deadline: "2024-07-10",
      budget: 1800,
      paid: 1620,
      description: "Collaborative R&B project featuring live instruments and soulful vocals.",
      tracks: [
        { name: "Soul Connection", status: "Mixed", duration: "4:15" },
        { name: "Midnight Groove", status: "Mixed", duration: "3:52" },
        { name: "Heart & Soul", status: "Recording", duration: "4:28" }
      ],
      lastActivity: "2024-06-19",
      messages: 22
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-red-600/20 text-netflix-red';
      case 'In Progress': return 'bg-red-600/20 text-netflix-red';
      case 'Review': return 'bg-netflix-red/20 text-netflix-red';
      case 'Planning': return 'bg-red-600/20 text-purple-400';
      default: return 'bg-netflix-dark/20 text-white';
    }
  };

  const getTrackStatusColor = (status: string) => {
    switch (status) {
      case 'Mastered': return 'bg-red-600/20 text-netflix-red';
      case 'Mixed': return 'bg-red-600/20 text-netflix-red';
      case 'Recording': return 'bg-netflix-red/20 text-netflix-red';
      case 'Demo': return 'bg-red-600/20 text-purple-400';
      default: return 'bg-netflix-dark/20 text-white';
    }
  };

  const filteredCollaborations = collaborations.filter(collab => {
    const matchesSearch = collab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collab.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collab.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || collab.status.toLowerCase().replace(" ", "_") === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalProjects: collaborations.length,
    activeProjects: collaborations.filter(c => c.status === "In Progress").length,
    completedProjects: collaborations.filter(c => c.status === "Completed").length,
    totalEarnings: collaborations.reduce((sum, c) => sum + c.paid, 0),
    pendingPayments: collaborations.reduce((sum, c) => sum + (c.budget - c.paid), 0)
  };

  return (
    <div className="text-white min-h-screen bg-netflix-black">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-white flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold text-white mb-2">My Collaborations</h1>
            <p className="text-white text-white">Manage your active projects and collaborations</p>
          </div>
          <Button className="text-white netflix-button-primary">
            <Plus className="text-white h-4 w-4 mr-2" />
            New Collaboration
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="text-white grid lg:grid-cols-5 gap-4 mb-8">
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Music className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.totalProjects}</p>
                  <p className="text-white text-white text-sm">Total Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-netflix-red/20 rounded-lg">
                  <Clock className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.activeProjects}</p>
                  <p className="text-white text-white text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Star className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.completedProjects}</p>
                  <p className="text-white text-white text-sm">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-netflix-red/20 rounded-lg">
                  <DollarSign className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">${stats.totalEarnings}</p>
                  <p className="text-white text-white text-sm">Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Clock className="text-white h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">${stats.pendingPayments}</p>
                  <p className="text-white text-white text-sm">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="text-white flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="text-white relative flex-1">
            <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
            <Input
              placeholder="Search collaborations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white pl-10 bg-netflix-dark border-gray-700 text-white"
            />
          </div>
          <div className="text-white flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'in_progress', label: 'Active' },
              { key: 'completed', label: 'Completed' },
              { key: 'review', label: 'Review' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={filterStatus === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(filter.key)}
                className={filterStatus === filter.key ? "netflix-button-primary" : "border-gray-700 text-white"}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Collaborations List */}
        <div className="text-white space-y-6">
          {filteredCollaborations.map((collab) => (
            <Card key={collab.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="text-white p-6">
                <div className="text-white grid lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="text-white lg:col-span-2">
                    <div className="text-white flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white text-xl font-bold text-white mb-1">{collab.title}</h3>
                        <p className="text-white text-white">{collab.type}</p>
                      </div>
                      <Badge className={getStatusColor(collab.status)}>
                        {collab.status}
                      </Badge>
                    </div>

                    <p className="text-white text-white mb-4">{collab.description}</p>

                    {/* Progress */}
                    <div className="text-white mb-4">
                      <div className="text-white flex justify-between items-center mb-2">
                        <span className="text-white text-white text-sm">Progress</span>
                        <span className="text-white text-white font-semibold">{collab.progress}%</span>
                      </div>
                      <Progress value={collab.progress} className="text-white h-2" />
                    </div>

                    {/* Client & Collaborators */}
                    <div className="text-white mb-4">
                      <h4 className="text-white text-white font-medium mb-2">Team</h4>
                      <div className="text-white flex items-center space-x-4">
                        <div className="text-white flex items-center space-x-2">
                          <Avatar className="text-white w-8 h-8">
                            <AvatarFallback className="text-white bg-netflix-red text-white text-xs">
                              {collab.client.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white text-white text-sm font-medium">{collab.client.name}</p>
                            <p className="text-white text-white text-xs">{collab.client.role}</p>
                          </div>
                        </div>
                        {collab.collaborators.map((collaborator, index) => (
                          <div key={index} className="text-white flex items-center space-x-2">
                            <Avatar className="text-white w-8 h-8">
                              <AvatarFallback className="text-white bg-red-600 text-white text-xs">
                                {collaborator.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white text-white text-sm font-medium">{collaborator.name}</p>
                              <p className="text-white text-white text-xs">{collaborator.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tracks */}
                    <div className="text-white mb-4">
                      <h4 className="text-white text-white font-medium mb-2">Tracks</h4>
                      <div className="text-white space-y-2">
                        {collab.tracks.slice(0, 3).map((track, index) => (
                          <div key={index} className="text-white flex items-center justify-between bg-netflix-dark/50 rounded-lg p-3">
                            <div className="text-white flex items-center space-x-3">
                              <Play className="text-white h-4 w-4 text-white" />
                              <div>
                                <p className="text-white text-white text-sm font-medium">{track.name}</p>
                                <p className="text-white text-white text-xs">{track.duration}</p>
                              </div>
                            </div>
                            <Badge className={getTrackStatusColor(track.status)} variant="secondary">
                              {track.status}
                            </Badge>
                          </div>
                        ))}
                        {collab.tracks.length > 3 && (
                          <p className="text-white text-white text-sm">+{collab.tracks.length - 3} more tracks</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="text-white space-y-4">
                    {/* Budget & Payment */}
                    <div className="text-white bg-netflix-dark/50 rounded-lg p-4">
                      <h4 className="text-white text-white font-medium mb-3">Budget & Payment</h4>
                      <div className="text-white space-y-2">
                        <div className="text-white flex justify-between">
                          <span className="text-white text-white text-sm">Total Budget</span>
                          <span className="text-white text-white font-semibold">${collab.budget}</span>
                        </div>
                        <div className="text-white flex justify-between">
                          <span className="text-white text-white text-sm">Paid</span>
                          <span className="text-white text-netflix-red font-semibold">${collab.paid}</span>
                        </div>
                        <div className="text-white flex justify-between">
                          <span className="text-white text-white text-sm">Remaining</span>
                          <span className="text-white text-netflix-red font-semibold">${collab.budget - collab.paid}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="text-white bg-netflix-dark/50 rounded-lg p-4">
                      <h4 className="text-white text-white font-medium mb-3">Timeline</h4>
                      <div className="text-white space-y-2">
                        <div className="text-white flex items-center space-x-2 text-sm">
                          <Calendar className="text-white h-4 w-4 text-white" />
                          <span className="text-white text-white">Deadline:</span>
                          <span className="text-white text-white">{new Date(collab.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="text-white flex items-center space-x-2 text-sm">
                          <Clock className="text-white h-4 w-4 text-white" />
                          <span className="text-white text-white">Last Activity:</span>
                          <span className="text-white text-white">{new Date(collab.lastActivity).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Communication */}
                    <div className="text-white bg-netflix-dark/50 rounded-lg p-4">
                      <div className="text-white flex items-center justify-between mb-2">
                        <h4 className="text-white text-white font-medium">Messages</h4>
                        <Badge variant="secondary" className="text-white bg-red-600/20 text-netflix-red">
                          {collab.messages}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="text-white w-full border-gray-700 text-white">
                        <MessageCircle className="text-white h-3 w-3 mr-2" />
                        Open Chat
                      </Button>
                    </div>

                    {/* Rating */}
                    {collab.rating && (
                      <div className="text-white bg-netflix-dark/50 rounded-lg p-4">
                        <h4 className="text-white text-white font-medium mb-2">Client Rating</h4>
                        <div className="text-white flex items-center space-x-2">
                          <Star className="text-white h-5 w-5 text-netflix-red fill-current" />
                          <span className="text-white text-white font-semibold">{collab.rating}</span>
                          <span className="text-white text-white text-sm">/5.0</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="text-white space-y-2">
                      <Button size="sm" className="text-white w-full netflix-button-primary">
                        <Eye className="text-white h-3 w-3 mr-2" />
                        View Details
                      </Button>
                      <div className="text-white flex space-x-2">
                        <Button size="sm" variant="outline" className="text-white flex-1 border-gray-700 text-white">
                          <Share2 className="text-white h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline" className="text-white flex-1 border-gray-700 text-white">
                          <Download className="text-white h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCollaborations.length === 0 && (
          <div className="text-white text-center py-12">
            <Music className="text-white h-16 w-16 text-white mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold text-white mb-2">No collaborations found</h3>
            <p className="text-white text-white mb-6">Start your first collaboration project</p>
            <Button className="text-white netflix-button-primary">
              <Plus className="text-white h-4 w-4 mr-2" />
              Start New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}