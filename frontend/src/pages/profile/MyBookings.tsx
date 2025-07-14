import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  Search, 
  Plus, 
  Clock, 
  MapPin,
  Music,
  MessageCircle,
  Star,
  DollarSign,
  Filter,
  Eye,
  Download,
  Phone,
  Mail,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { useState } from "react";

export default function MyBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const bookings = [
    {
      id: 1,
      professional: {
        name: "Alex Rivera",
        avatar: "AR",
        specialty: "Music Producer",
        rating: 4.9,
        totalReviews: 89
      },
      project: {
        title: "Hip-Hop Album Production",
        description: "Full album production including beats, mixing, and mastering for 12 tracks",
        category: "Album Production"
      },
      booking: {
        startDate: "2024-06-15",
        endDate: "2024-08-15",
        duration: "8 weeks",
        status: "In Progress",
        totalCost: 4800,
        paidAmount: 2400,
        remainingAmount: 2400,
        location: "Remote + Studio Sessions"
      },
      milestones: [
        { name: "Project Planning", status: "Completed", date: "2024-06-20" },
        { name: "Beat Production", status: "Completed", date: "2024-07-05" },
        { name: "Recording Sessions", status: "In Progress", date: "2024-07-20" },
        { name: "Mixing & Mastering", status: "Pending", date: "2024-08-10" },
        { name: "Final Delivery", status: "Pending", date: "2024-08-15" }
      ],
      communication: {
        lastMessage: "2024-06-22",
        totalMessages: 24,
        responseTime: "2h avg"
      },
      deliverables: ["12 Produced Tracks", "Mixed & Mastered Album", "Instrumental Versions", "Project Files"]
    },
    {
      id: 2,
      professional: {
        name: "Sarah Chen",
        avatar: "SC",
        specialty: "Mixing Engineer",
        rating: 4.8,
        totalReviews: 156
      },
      project: {
        title: "EP Mixing & Mastering",
        description: "Professional mixing and mastering for 5-track EP with modern production techniques",
        category: "Mixing & Mastering"
      },
      booking: {
        startDate: "2024-05-20",
        endDate: "2024-06-20",
        duration: "4 weeks",
        status: "Completed",
        totalCost: 1200,
        paidAmount: 1200,
        remainingAmount: 0,
        location: "Remote"
      },
      milestones: [
        { name: "Audio Review", status: "Completed", date: "2024-05-22" },
        { name: "Mixing", status: "Completed", date: "2024-06-05" },
        { name: "Mastering", status: "Completed", date: "2024-06-15" },
        { name: "Final Delivery", status: "Completed", date: "2024-06-20" }
      ],
      communication: {
        lastMessage: "2024-06-20",
        totalMessages: 18,
        responseTime: "1.5h avg"
      },
      deliverables: ["5 Mixed Tracks", "5 Mastered Tracks", "High-Quality WAV Files", "MP3 Versions"],
      rating: 5.0,
      review: "Absolutely incredible work! Sarah exceeded all expectations with the mix quality."
    },
    {
      id: 3,
      professional: {
        name: "Marcus Johnson",
        avatar: "MJ",
        specialty: "Session Guitarist",
        rating: 4.9,
        totalReviews: 203
      },
      project: {
        title: "Guitar Recording Sessions",
        description: "Lead and rhythm guitar recordings for 8 songs across different genres",
        category: "Session Recording"
      },
      booking: {
        startDate: "2024-07-01",
        endDate: "2024-07-15",
        duration: "2 weeks",
        status: "Confirmed",
        totalCost: 1600,
        paidAmount: 800,
        remainingAmount: 800,
        location: "Sunset Sound Studios, LA"
      },
      milestones: [
        { name: "Pre-Production Meeting", status: "Scheduled", date: "2024-06-28" },
        { name: "Recording Sessions", status: "Pending", date: "2024-07-05" },
        { name: "Overdubs & Edits", status: "Pending", date: "2024-07-12" },
        { name: "Final Delivery", status: "Pending", date: "2024-07-15" }
      ],
      communication: {
        lastMessage: "2024-06-21",
        totalMessages: 12,
        responseTime: "3h avg"
      },
      deliverables: ["Lead Guitar Tracks", "Rhythm Guitar Parts", "Raw Audio Files", "Edited Performances"]
    },
    {
      id: 4,
      professional: {
        name: "Luna Martinez",
        avatar: "LM",
        specialty: "Vocalist & Songwriter",
        rating: 5.0,
        totalReviews: 75
      },
      project: {
        title: "Vocal Recording & Songwriting",
        description: "Lead vocals, harmonies, and co-writing for 3 original songs",
        category: "Vocals & Songwriting"
      },
      booking: {
        startDate: "2024-04-10",
        endDate: "2024-05-10",
        duration: "4 weeks",
        status: "Completed",
        totalCost: 2200,
        paidAmount: 2200,
        remainingAmount: 0,
        location: "Abbey Road Studios, London"
      },
      milestones: [
        { name: "Songwriting Sessions", status: "Completed", date: "2024-04-15" },
        { name: "Lead Vocal Recording", status: "Completed", date: "2024-04-25" },
        { name: "Harmony Vocals", status: "Completed", date: "2024-05-05" },
        { name: "Final Delivery", status: "Completed", date: "2024-05-10" }
      ],
      communication: {
        lastMessage: "2024-05-12",
        totalMessages: 31,
        responseTime: "1h avg"
      },
      deliverables: ["3 Co-Written Songs", "Lead Vocal Tracks", "Harmony Arrangements", "Lyric Sheets"],
      rating: 5.0,
      review: "Luna is a phenomenal artist and collaborator. Her voice brought our songs to life!"
    },
    {
      id: 5,
      professional: {
        name: "DJ Voltage",
        avatar: "DV",
        specialty: "Electronic Music Producer",
        rating: 4.7,
        totalReviews: 124
      },
      project: {
        title: "Electronic Dance Track Production",
        description: "Full production of 3 EDM tracks for club release",
        category: "Electronic Production"
      },
      booking: {
        startDate: "2024-06-01",
        endDate: "2024-06-30",
        duration: "4 weeks",
        status: "Cancelled",
        totalCost: 1800,
        paidAmount: 0,
        remainingAmount: 0,
        location: "Remote"
      },
      milestones: [
        { name: "Initial Concepts", status: "Cancelled", date: "2024-06-05" },
        { name: "Full Production", status: "Cancelled", date: "2024-06-20" },
        { name: "Final Mixing", status: "Cancelled", date: "2024-06-28" }
      ],
      communication: {
        lastMessage: "2024-05-28",
        totalMessages: 8,
        responseTime: "4h avg"
      },
      deliverables: ["3 EDM Tracks", "Radio Edits", "Extended Mixes"],
      cancellationReason: "Creative differences on project direction"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-600/20 text-green-400';
      case 'In Progress': return 'bg-blue-600/20 text-blue-400';
      case 'Confirmed': return 'bg-purple-600/20 text-purple-400';
      case 'Cancelled': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400';
      case 'In Progress': return 'text-blue-400';
      case 'Scheduled': return 'text-purple-400';
      case 'Pending': return 'text-gray-400';
      case 'Cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'Scheduled': return Calendar;
      case 'Cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.professional.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || booking.booking.status.toLowerCase().replace(" ", "_") === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalBookings: bookings.length,
    activeBookings: bookings.filter(b => b.booking.status === "In Progress" || b.booking.status === "Confirmed").length,
    completedBookings: bookings.filter(b => b.booking.status === "Completed").length,
    totalSpent: bookings.reduce((sum, b) => sum + b.booking.paidAmount, 0),
    averageRating: bookings.filter(b => b.rating).reduce((sum, b, _, arr) => sum + (b.rating || 0), 0) / bookings.filter(b => b.rating).length || 0
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
            <p className="text-gray-400">Track your hired professionals and project progress</p>
          </div>
          <Button className="netflix-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-5 gap-4 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.totalBookings}</p>
                  <p className="text-gray-400 text-sm">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.activeBookings}</p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.completedBookings}</p>
                  <p className="text-gray-400 text-sm">Completed</p>
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
                  <p className="text-white font-semibold">${stats.totalSpent}</p>
                  <p className="text-gray-400 text-sm">Total Spent</p>
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
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'in_progress', label: 'Active' },
              { key: 'completed', label: 'Completed' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'cancelled', label: 'Cancelled' }
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

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-netflix-red text-white text-lg">
                            {booking.professional.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-white">{booking.professional.name}</h3>
                          <p className="text-gray-400">{booking.professional.specialty}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white font-medium">{booking.professional.rating}</span>
                              <span className="text-gray-400 text-sm">({booking.professional.totalReviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.booking.status)}>
                        {booking.booking.status}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-semibold text-lg mb-2">{booking.project.title}</h4>
                      <p className="text-gray-300 mb-2">{booking.project.description}</p>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        {booking.project.category}
                      </Badge>
                    </div>

                    {/* Milestones */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-3">Project Milestones</h4>
                      <div className="space-y-2">
                        {booking.milestones.map((milestone, index) => {
                          const IconComponent = getMilestoneIcon(milestone.status);
                          return (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800/30 rounded-lg">
                              <IconComponent className={`h-4 w-4 ${getMilestoneStatusColor(milestone.status)}`} />
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium">{milestone.name}</p>
                                <p className="text-gray-400 text-xs">{new Date(milestone.date).toLocaleDateString()}</p>
                              </div>
                              <Badge variant="secondary" className={`text-xs ${getMilestoneStatusColor(milestone.status)} bg-transparent border-0`}>
                                {milestone.status}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Expected Deliverables</h4>
                      <div className="flex flex-wrap gap-2">
                        {booking.deliverables.map((deliverable, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Review & Rating */}
                    {booking.rating && booking.review && (
                      <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-white font-medium">Your Rating: {booking.rating}/5</span>
                        </div>
                        <p className="text-gray-300 italic">"{booking.review}"</p>
                      </div>
                    )}

                    {/* Cancellation Reason */}
                    {booking.booking.status === "Cancelled" && booking.cancellationReason && (
                      <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                        <p className="text-red-400 text-sm">
                          <strong>Cancellation Reason:</strong> {booking.cancellationReason}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-4">
                    {/* Project Details */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-white">{booking.booking.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400">Location:</span>
                          <span className="text-white">{booking.booking.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Start Date:</span>
                          <span className="text-white">{new Date(booking.booking.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">End Date:</span>
                          <span className="text-white">{new Date(booking.booking.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Payment</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Cost:</span>
                          <span className="text-white font-semibold">${booking.booking.totalCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Paid:</span>
                          <span className="text-green-400 font-semibold">${booking.booking.paidAmount}</span>
                        </div>
                        {booking.booking.remainingAmount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Remaining:</span>
                            <span className="text-yellow-400 font-semibold">${booking.booking.remainingAmount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Communication */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">Communication</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Messages:</span>
                          <span className="text-white">{booking.communication.totalMessages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response Time:</span>
                          <span className="text-white">{booking.communication.responseTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Contact:</span>
                          <span className="text-white">{new Date(booking.communication.lastMessage).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3 border-gray-700 text-gray-300">
                        <MessageCircle className="h-3 w-3 mr-2" />
                        Open Chat
                      </Button>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button size="sm" className="w-full netflix-button-primary">
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                      </div>
                      {booking.booking.status === "Completed" && !booking.rating && (
                        <Button size="sm" variant="outline" className="w-full border-yellow-700 text-yellow-400">
                          <Star className="h-3 w-3 mr-2" />
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
            <p className="text-gray-400 mb-6">Start hiring music professionals for your projects</p>
            <Button className="netflix-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              Find Professionals
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}