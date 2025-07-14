import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Search, Users, Clock, Music, Play, MessageCircle, Share2, Calendar, FileAudio, Zap, Star, CheckCircle, AlertCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  genre: string;
  status: "active" | "completed" | "pending" | "review";
  members: { id: string; name: string; role: string; avatar: string }[];
  createdAt: string;
  deadline: string;
  progress: number;
  budget: number;
  files: number;
  messages: number;
}

interface CollaborationRoom {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  genre: string;
  isLive: boolean;
  host: string;
  createdAt: string;
}

export default function Collaboration() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [rooms, setRooms] = useState<CollaborationRoom[]>([]);

  // Mock projects data
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "Summer Vibes EP",
      description: "Creating a 4-track EP with chill summer vibes, featuring live instruments and electronic elements.",
      genre: "Pop/Electronic",
      status: "active",
      members: [
        { id: "1", name: "Alex Rivera", role: "Producer", avatar: "AR" },
        { id: "2", name: "Sarah Chen", role: "Vocalist", avatar: "SC" },
        { id: "3", name: "Marcus Johnson", role: "Guitarist", avatar: "MJ" }
      ],
      createdAt: "2024-01-15",
      deadline: "2024-02-28",
      progress: 65,
      budget: 2500,
      files: 24,
      messages: 89
    },
    {
      id: "2",
      title: "Hip-Hop Single Collab",
      description: "Looking for a rapper to collaborate on a modern trap beat with melodic hooks.",
      genre: "Hip-Hop",
      status: "pending",
      members: [
        { id: "4", name: "David Kim", role: "Beat Maker", avatar: "DK" },
        { id: "5", name: "Luna Martinez", role: "Mix Engineer", avatar: "LM" }
      ],
      createdAt: "2024-01-20",
      deadline: "2024-03-15",
      progress: 25,
      budget: 1800,
      files: 12,
      messages: 34
    },
    {
      id: "3",
      title: "Acoustic Cover Series",
      description: "Recording acoustic covers of popular songs with professional production quality.",
      genre: "Acoustic",
      status: "review",
      members: [
        { id: "6", name: "Elena Vasquez", role: "Engineer", avatar: "EV" },
        { id: "2", name: "Sarah Chen", role: "Vocalist", avatar: "SC" }
      ],
      createdAt: "2024-01-10",
      deadline: "2024-02-15",
      progress: 90,
      budget: 1200,
      files: 18,
      messages: 156
    },
    {
      id: "4",
      title: "Film Score Commission",
      description: "Composing original orchestral music for an independent film project.",
      genre: "Orchestral",
      status: "completed",
      members: [
        { id: "6", name: "Luna Martinez", role: "Composer", avatar: "LM" },
        { id: "3", name: "Marcus Johnson", role: "Arranger", avatar: "MJ" }
      ],
      createdAt: "2023-12-01",
      deadline: "2024-01-31",
      progress: 100,
      budget: 5000,
      files: 45,
      messages: 203
    }
  ];

  // Mock collaboration rooms data
  const mockRooms: CollaborationRoom[] = [
    {
      id: "1",
      name: "Jazz Jam Session",
      description: "Open jazz jam for intermediate to advanced musicians. Bring your instruments!",
      participants: 4,
      maxParticipants: 8,
      genre: "Jazz",
      isLive: true,
      host: "Marcus Johnson",
      createdAt: "2024-01-25T14:30:00Z"
    },
    {
      id: "2",
      name: "Beat Making Workshop",
      description: "Learn modern hip-hop production techniques and collaborate on beats.",
      participants: 6,
      maxParticipants: 10,
      genre: "Hip-Hop",
      isLive: true,
      host: "David Kim",
      createdAt: "2024-01-25T16:00:00Z"
    },
    {
      id: "3",
      name: "Songwriting Circle",
      description: "Collaborative songwriting session focusing on pop and indie genres.",
      participants: 3,
      maxParticipants: 6,
      genre: "Pop",
      isLive: false,
      host: "Sarah Chen",
      createdAt: "2024-01-25T19:00:00Z"
    },
    {
      id: "4",
      name: "Electronic Music Lab",
      description: "Experimental electronic music creation with live synthesis and effects.",
      participants: 2,
      maxParticipants: 5,
      genre: "Electronic",
      isLive: true,
      host: "Alex Rivera",
      createdAt: "2024-01-25T20:30:00Z"
    }
  ];

  useEffect(() => {
    setProjects(mockProjects);
    setRooms(mockRooms);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Zap className="text-white h-4 w-4 text-netflix-red" />;
      case "completed": return <CheckCircle className="text-white h-4 w-4 text-netflix-red" />;
      case "pending": return <Clock className="text-white h-4 w-4 text-netflix-red" />;
      case "review": return <AlertCircle className="text-white h-4 w-4 text-orange-400" />;
      default: return <Clock className="text-white h-4 w-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-red-600/20 text-netflix-red border-red-600/30";
      case "completed": return "bg-red-600/20 text-netflix-red border-blue-600/30";
      case "pending": return "bg-netflix-red/20 text-netflix-red border-yellow-600/30";
      case "review": return "bg-orange-600/20 text-orange-400 border-orange-600/30";
      default: return "bg-netflix-dark/20 text-white border-gray-600/30";
    }
  };

  const handleCreateProject = () => {
    if (!isAuthenticated) {
      window.location.href = "/login?intent=create-project";
      return;
    }
    alert("Create Project modal would open here in the full app");
  };

  const handleJoinRoom = (roomId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login?intent=join-room";
      return;
    }
    alert(`Joining collaboration room... (This would open the collaboration interface in the full app)`);
  };

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="text-white bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h1 className="text-white text-4xl lg:text-5xl font-bold text-white mb-6">
              Music
              <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Collaboration Hub
              </span>
            </h1>
            <p className="text-white text-xl text-white max-w-3xl mx-auto">
              Connect with musicians worldwide, manage collaborative projects, and create music together 
              in real-time. Your next hit song is just a collaboration away.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="text-white w-full">
          <TabsList className="text-white grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-netflix-dark">
            <TabsTrigger value="projects" className="text-white netflix-tab">
              <Music className="text-white h-4 w-4 mr-2" />
              My Projects
            </TabsTrigger>
            <TabsTrigger value="rooms" className="text-white netflix-tab">
              <Users className="text-white h-4 w-4 mr-2" />
              Live Rooms
            </TabsTrigger>
            <TabsTrigger value="discover" className="text-white netflix-tab">
              <Search className="text-white h-4 w-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-white netflix-tab">
              <Share2 className="text-white h-4 w-4 mr-2" />
              Tools
            </TabsTrigger>
          </TabsList>

          {/* My Projects Tab */}
          <TabsContent value="projects" className="text-white space-y-6">
            <div className="text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="text-white flex flex-col sm:flex-row gap-4 flex-1">
                <div className="text-white relative flex-1">
                  <Search className="text-white absolute left-3 top-3 h-5 w-5 text-white" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-white netflix-input pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="text-white netflix-input w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-netflix-dark border-gray-600">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateProject} className="text-white netflix-button-primary">
                <Plus className="text-white h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="text-white netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="text-white flex items-start justify-between">
                      <div className="text-white flex-1">
                        <CardTitle className="text-white text-white text-lg mb-2">{project.title}</CardTitle>
                        <p className="text-white text-white text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="text-white flex items-center space-x-4 text-sm text-white">
                          <span className="text-white flex items-center">
                            <Music className="text-white h-4 w-4 mr-1" />
                            {project.genre}
                          </span>
                          <span className="text-white flex items-center">
                            <Calendar className="text-white h-4 w-4 mr-1" />
                            Due {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="text-white ml-1 capitalize">{project.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Progress Bar */}
                    <div className="text-white mb-4">
                      <div className="text-white flex justify-between text-sm mb-2">
                        <span className="text-white text-white">Progress</span>
                        <span className="text-white text-white">{project.progress}%</span>
                      </div>
                      <div className="text-white w-full bg-netflix-dark rounded-full h-2">
                        <div 
                          className="text-white bg-netflix-red h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="text-white mb-4">
                      <p className="text-white text-sm text-white mb-2">Team ({project.members.length})</p>
                      <div className="text-white flex -space-x-2">
                        {project.members.map((member, index) => (
                          <div
                            key={member.id}
                            className="text-white w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center border-2 border-netflix-dark text-xs font-semibold text-white"
                            title={`${member.name} - ${member.role}`}
                          >
                            {member.avatar}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="text-white grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="text-white text-center">
                        <div className="text-white text-white font-semibold">${project.budget}</div>
                        <div className="text-white text-white">Budget</div>
                      </div>
                      <div className="text-white text-center">
                        <div className="text-white text-white font-semibold">{project.files}</div>
                        <div className="text-white text-white">Files</div>
                      </div>
                      <div className="text-white text-center">
                        <div className="text-white text-white font-semibold">{project.messages}</div>
                        <div className="text-white text-white">Messages</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="text-white flex space-x-2">
                      <Button variant="outline" className="text-white flex-1 netflix-button-secondary text-sm">
                        <Play className="text-white h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" className="text-white flex-1 netflix-button-secondary text-sm">
                        <MessageCircle className="text-white h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button className="text-white flex-1 netflix-button-primary text-sm">
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-white text-center py-12">
                <Music className="text-white h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-white text-white mb-6">Start collaborating by creating your first project</p>
                <Button onClick={handleCreateProject} className="text-white netflix-button-primary">
                  <Plus className="text-white h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Live Rooms Tab */}
          <TabsContent value="rooms" className="text-white space-y-6">
            <div className="text-white text-center mb-8">
              <h2 className="text-white text-2xl font-bold text-white mb-2">Live Collaboration Rooms</h2>
              <p className="text-white text-white">Join active music sessions and collaborate in real-time</p>
            </div>

            <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} className="text-white netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="text-white flex items-start justify-between">
                      <div className="text-white flex-1">
                        <div className="text-white flex items-center space-x-2 mb-2">
                          <CardTitle className="text-white text-white text-lg">{room.name}</CardTitle>
                          {room.isLive && (
                            <Badge className="text-white bg-red-600/20 text-red-400 border-red-600/30 animate-pulse">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <p className="text-white text-white text-sm mb-3">{room.description}</p>
                        <div className="text-white flex items-center justify-between text-sm text-white">
                          <span>Host: {room.host}</span>
                          <Badge variant="secondary" className="text-white bg-netflix-red/20 text-netflix-red">
                            {room.genre}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="text-white flex items-center justify-between mb-4">
                      <div className="text-white flex items-center space-x-2 text-sm text-white">
                        <Users className="text-white h-4 w-4" />
                        <span>{room.participants}/{room.maxParticipants} participants</span>
                      </div>
                      <div className="text-white flex -space-x-1">
                        {[...Array(Math.min(room.participants, 4))].map((_, i) => (
                          <div
                            key={i}
                            className="text-white w-6 h-6 bg-netflix-red rounded-full border-2 border-netflix-dark"
                          />
                        ))}
                        {room.participants > 4 && (
                          <div className="text-white w-6 h-6 bg-netflix-dark rounded-full border-2 border-netflix-dark flex items-center justify-center text-xs text-white">
                            +{room.participants - 4}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleJoinRoom(room.id)}
                      className="text-white w-full netflix-button-primary"
                      disabled={room.participants >= room.maxParticipants}
                    >
                      {room.participants >= room.maxParticipants ? "Room Full" : 
                       room.isLive ? "Join Live Session" : "Enter Room"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="text-white space-y-6">
            <div className="text-white text-center py-12">
              <Search className="text-white h-16 w-16 text-white mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold text-white mb-2">Discover New Collaborations</h3>
              <p className="text-white text-white mb-6">Find open projects, join collaborations, and meet new musicians</p>
              <Button className="text-white netflix-button-primary">
                Browse Open Projects
              </Button>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="text-white space-y-6">
            <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <FileAudio className="text-white h-8 w-8 text-netflix-red" />,
                  title: "Audio Workstation",
                  description: "Collaborative DAW for real-time music production"
                },
                {
                  icon: <MessageCircle className="text-white h-8 w-8 text-netflix-red" />,
                  title: "Project Chat",
                  description: "Integrated messaging for all your collaborations"
                },
                {
                  icon: <Share2 className="text-white h-8 w-8 text-netflix-red" />,
                  title: "File Sharing",
                  description: "Secure cloud storage for your project files"
                },
                {
                  icon: <Calendar className="text-white h-8 w-8 text-netflix-red" />,
                  title: "Session Scheduler",
                  description: "Coordinate recording sessions across time zones"
                },
                {
                  icon: <Star className="text-white h-8 w-8 text-netflix-red" />,
                  title: "Version Control",
                  description: "Track changes and manage project versions"
                },
                {
                  icon: <Users className="text-white h-8 w-8 text-netflix-red" />,
                  title: "Team Management",
                  description: "Organize roles and permissions for your team"
                }
              ].map((tool, index) => (
                <Card key={index} className="text-white netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                  <CardContent className="text-white p-6 text-center">
                    <div className="text-white mb-4 flex justify-center">
                      {tool.icon}
                    </div>
                    <h3 className="text-white text-lg font-semibold text-white mb-2">{tool.title}</h3>
                    <p className="text-white text-white text-sm mb-4">{tool.description}</p>
                    <Button variant="outline" className="text-white netflix-button-secondary">
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}