import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  User, 
  MessageCircle,
  CheckCircle,
  Star,
  Filter,
  Music,
  Briefcase,
  Play,
  Heart,
  Share2
} from "lucide-react";

export default function Gigs() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  // Mock data for gig requests from clients
  const gigRequests = [
    {
      id: 1,
      title: "Hip-Hop Album Production",
      client: {
        name: "Marcus Johnson",
        rating: 4.8,
        reviews: 23,
        verified: true,
        avatar: "MJ"
      },
      category: "production",
      budget: 2500,
      budgetType: "fixed",
      duration: "2-3 weeks",
      location: "Remote",
      postedDate: "2 days ago",
      deadline: "March 15, 2024",
      applicants: 12,
      description: "Looking for an experienced hip-hop producer to work on my debut album. Need someone who can create modern, trap-influenced beats with strong melodic elements. The project involves producing 10-12 tracks.",
      requirements: [
        "5+ years hip-hop production experience",
        "Portfolio with similar projects",
        "Own professional studio setup",
        "Available for video calls"
      ],
      skills: ["Hip-Hop Production", "Beat Making", "Mixing", "Logic Pro X"],
      status: "active",
      urgency: "medium"
    },
    {
      id: 2,
      title: "Session Vocalist for Pop Single",
      client: {
        name: "Sarah Chen",
        rating: 4.9,
        reviews: 45,
        verified: true,
        avatar: "SC"
      },
      category: "vocals",
      budget: 400,
      budgetType: "fixed",
      duration: "1 week",
      location: "Los Angeles, CA",
      postedDate: "1 day ago",
      deadline: "March 8, 2024",
      applicants: 8,
      description: "Need a professional female vocalist for a pop single. Looking for someone with a strong, versatile voice who can deliver both lead vocals and harmonies. Studio session will be recorded in LA.",
      requirements: [
        "Professional vocal training",
        "Pop music experience",
        "Available for LA studio session",
        "Quick turnaround capability"
      ],
      skills: ["Pop Vocals", "Harmonies", "Studio Recording", "Quick Delivery"],
      status: "active",
      urgency: "high"
    },
    {
      id: 3,
      title: "Jazz Piano for Restaurant Gigs",
      client: {
        name: "The Blue Note Cafe",
        rating: 4.7,
        reviews: 89,
        verified: true,
        avatar: "BN"
      },
      category: "live-performance",
      budget: 150,
      budgetType: "per-night",
      duration: "Ongoing",
      location: "New York, NY",
      postedDate: "3 days ago",
      deadline: "Ongoing",
      applicants: 15,
      description: "Upscale restaurant seeking a jazz pianist for weekend dinner performances. Looking for someone who can create a sophisticated atmosphere with classic jazz standards and contemporary interpretations.",
      requirements: [
        "Classical/Jazz piano training",
        "Repertoire of jazz standards",
        "Professional stage presence",
        "Available Friday-Sunday evenings"
      ],
      skills: ["Jazz Piano", "Live Performance", "Classical Training", "Entertainment"],
      status: "active",
      urgency: "low"
    },
    {
      id: 4,
      title: "Mixing & Mastering - Indie Rock EP",
      client: {
        name: "The Velvet Sound",
        rating: 4.6,
        reviews: 12,
        verified: false,
        avatar: "VS"
      },
      category: "mixing",
      budget: 800,
      budgetType: "fixed",
      duration: "1-2 weeks",
      location: "Remote",
      postedDate: "5 days ago",
      deadline: "March 20, 2024",
      applicants: 21,
      description: "Independent rock band looking for mixing and mastering services for our 6-track EP. We've recorded all instruments and vocals, need professional mixing to bring everything together.",
      requirements: [
        "Experience with rock/indie music",
        "Professional mixing software/hardware",
        "Portfolio of similar work",
        "Communication throughout process"
      ],
      skills: ["Mixing", "Mastering", "Rock Music", "Pro Tools"],
      status: "active",
      urgency: "medium"
    },
    {
      id: 5,
      title: "Wedding Reception DJ",
      client: {
        name: "Emma & David Wedding",
        rating: 5.0,
        reviews: 3,
        verified: true,
        avatar: "ED"
      },
      category: "dj",
      budget: 600,
      budgetType: "fixed",
      duration: "1 day (6 hours)",
      location: "Miami, FL",
      postedDate: "1 week ago",
      deadline: "April 12, 2024",
      applicants: 7,
      description: "Looking for a professional DJ for our wedding reception. Need someone who can read the crowd and keep the dance floor busy with a mix of current hits and classic favorites.",
      requirements: [
        "Professional DJ equipment",
        "Wedding experience preferred",
        "Diverse music library",
        "Professional presentation"
      ],
      skills: ["DJ Services", "Wedding Entertainment", "Crowd Reading", "MC Skills"],
      status: "active",
      urgency: "low"
    },
    {
      id: 6,
      title: "Guitar Recording for Country Track",
      client: {
        name: "Katie Morrison",
        rating: 4.8,
        reviews: 31,
        verified: true,
        avatar: "KM"
      },
      category: "recording",
      budget: 300,
      budgetType: "fixed",
      duration: "3-5 days",
      location: "Remote",
      postedDate: "4 days ago",
      deadline: "March 18, 2024",
      applicants: 18,
      description: "Country singer-songwriter needs electric and acoustic guitar tracks for a new single. Looking for someone who understands modern country production and can deliver professional quality recordings.",
      requirements: [
        "Country music experience",
        "High-quality recording setup",
        "Electric & acoustic guitars",
        "Understanding of country guitar styles"
      ],
      skills: ["Country Guitar", "Session Recording", "Multiple Guitar Styles", "Home Recording"],
      status: "active",
      urgency: "medium"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "production", name: "Production" },
    { id: "vocals", name: "Vocals" },
    { id: "mixing", name: "Mixing/Mastering" },
    { id: "recording", name: "Recording" },
    { id: "live-performance", name: "Live Performance" },
    { id: "dj", name: "DJ Services" }
  ];

  const budgetRanges = [
    { id: "all", name: "All Budgets" },
    { id: "under-500", name: "Under $500" },
    { id: "500-1000", name: "$500 - $1,000" },
    { id: "1000-2500", name: "$1,000 - $2,500" },
    { id: "over-2500", name: "$2,500+" }
  ];

  const durations = [
    { id: "all", name: "All Durations" },
    { id: "1-week", name: "1 Week or Less" },
    { id: "1-2-weeks", name: "1-2 Weeks" },
    { id: "2-4-weeks", name: "2-4 Weeks" },
    { id: "ongoing", name: "Ongoing" }
  ];

  // Filter gigs based on search and filters
  const filteredGigs = gigRequests.filter(gig => {
    const matchesSearch = 
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || gig.category === selectedCategory;
    
    const matchesBudget = selectedBudget === "all" ||
      (selectedBudget === "under-500" && gig.budget < 500) ||
      (selectedBudget === "500-1000" && gig.budget >= 500 && gig.budget <= 1000) ||
      (selectedBudget === "1000-2500" && gig.budget >= 1000 && gig.budget <= 2500) ||
      (selectedBudget === "over-2500" && gig.budget > 2500);

    return matchesSearch && matchesCategory && matchesBudget;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBudgetDisplay = (gig: { budget: number; budgetType: string }) => {
    if (gig.budgetType === "per-night") {
      return `$${gig.budget}/night`;
    }
    return `$${gig.budget}`;
  };

  const handleApplyToGig = (gigId: number) => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=apply&gig=${gigId}`;
    } else {
      console.log(`Applying to gig ${gigId}`);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Available
            <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
              Gigs
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover music gigs and project opportunities from clients worldwide. 
            Find your next collaboration and grow your music career.
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
                  placeholder="Search gigs..."
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

            {/* Budget Filter */}
            <div>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {budgetRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {durations.map(duration => (
                  <option key={duration.id} value={duration.id}>
                    {duration.name}
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
              {filteredGigs.length} gig{filteredGigs.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="space-y-6 mb-12">
          {filteredGigs.map((gig) => (
            <Card key={gig.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{gig.title}</h3>
                          <Badge className={`text-xs ${getUrgencyColor(gig.urgency)}`}>
                            {gig.urgency.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{gig.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {gig.deadline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{gig.applicants} applicants</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-netflix-red">
                          {getBudgetDisplay(gig)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {gig.budgetType === "fixed" ? "Fixed Price" : "Per Night"}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {gig.description}
                    </p>

                    {/* Requirements */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {gig.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {gig.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-4">
                    {/* Client Info */}
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold">
                            {gig.client.avatar}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-white font-medium">{gig.client.name}</h4>
                              {gig.client.verified && (
                                <Badge className="bg-green-600/20 text-green-400 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Star className="h-3 w-3 fill-current text-yellow-400" />
                              <span>{gig.client.rating} ({gig.client.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mb-3">
                          Posted {gig.postedDate}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleApplyToGig(gig.id)}
                        className="w-full netflix-button-primary"
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        Apply to Gig
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
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
            Not finding the right gigs?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Create a standout profile to attract more clients and get invited to exclusive projects. 
            Showcase your skills and build your reputation in the music industry.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="netflix-button-primary text-lg px-8 py-3">
              Improve Your Profile
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3"
            >
              Browse Professionals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}