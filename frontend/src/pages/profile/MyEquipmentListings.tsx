import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  DollarSign,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Package,
  Heart,
  MessageCircle,
  Share
} from "lucide-react";
import { useState } from "react";

export default function MyEquipmentListings() {
  const [searchTerm, setSearchTerm] = useState("");

  const equipmentListings = [
    {
      id: 1,
      title: "Neumann U87 Studio Microphone",
      category: "Microphones",
      price: 2800,
      originalPrice: 3200,
      condition: "Excellent",
      location: "Los Angeles, CA",
      datePosted: "2024-06-15",
      views: 245,
      saves: 18,
      messages: 7,
      status: "Active",
      description: "Professional studio condenser microphone in excellent condition. Used in smoke-free home studio. Includes original shock mount and windscreen."
    },
    {
      id: 2,
      title: "Yamaha HS8 Studio Monitors (Pair)",
      category: "Speakers",
      price: 650,
      originalPrice: 800,
      condition: "Very Good",
      location: "Los Angeles, CA",
      datePosted: "2024-06-12",
      views: 189,
      saves: 12,
      messages: 4,
      status: "Active",
      description: "Amazing studio monitors with crystal clear sound. Perfect for mixing and mastering. Minimal wear, all original packaging included."
    },
    {
      id: 3,
      title: "Fender Player Stratocaster Electric Guitar",
      category: "Guitars",
      price: 580,
      originalPrice: 750,
      condition: "Good",
      location: "Los Angeles, CA",
      datePosted: "2024-06-08",
      views: 324,
      saves: 25,
      messages: 12,
      status: "Sold",
      description: "Beautiful Fender Stratocaster in Polar White. Great for studio recording and live performances. Some minor wear but plays beautifully."
    },
    {
      id: 4,
      title: "Audio-Technica ATH-M50x Headphones",
      category: "Headphones",
      price: 120,
      originalPrice: 150,
      condition: "Like New",
      location: "Los Angeles, CA",
      datePosted: "2024-06-05",
      views: 156,
      saves: 9,
      messages: 3,
      status: "Active",
      description: "Professional monitoring headphones in like-new condition. Barely used, perfect for studio work and mixing."
    },
    {
      id: 5,
      title: "Roland TR-808 Drum Machine",
      category: "Drum Machines",
      price: 3500,
      originalPrice: 4000,
      condition: "Very Good",
      location: "Los Angeles, CA",
      datePosted: "2024-05-28",
      views: 412,
      saves: 34,
      messages: 18,
      status: "Pending",
      description: "Classic drum machine in excellent working condition. All sounds working perfectly. A must-have for any producer or beat maker."
    },
    {
      id: 6,
      title: "Shure SM57 Dynamic Microphone",
      category: "Microphones",
      price: 85,
      originalPrice: 100,
      condition: "Good",
      location: "Los Angeles, CA",
      datePosted: "2024-05-25",
      views: 98,
      saves: 6,
      messages: 2,
      status: "Active",
      description: "Industry standard dynamic microphone. Perfect for recording vocals, instruments, and live performances. Reliable and durable."
    }
  ];

  const stats = {
    totalListings: 6,
    activeListings: 4,
    soldItems: 1,
    totalEarnings: 580,
    totalViews: 1424,
    averagePrice: 1289
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-600/20 text-netflix-red';
      case 'Sold': return 'bg-red-600/20 text-netflix-red';
      case 'Pending': return 'bg-netflix-red/20 text-netflix-red';
      default: return 'bg-netflix-dark/20 text-white';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-red-600/20 text-netflix-red';
      case 'Very Good': return 'bg-red-600/20 text-netflix-red';
      case 'Good': return 'bg-netflix-red/20 text-netflix-red';
      case 'Like New': return 'bg-red-600/20 text-purple-400';
      default: return 'bg-netflix-dark/20 text-white';
    }
  };

  const filteredListings = equipmentListings.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white min-h-screen bg-netflix-black">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-white flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold text-white mb-2">My Equipment Listings</h1>
            <p className="text-white text-white">Manage your equipment sales and track performance</p>
          </div>
          <Button className="text-white netflix-button-primary">
            <Plus className="text-white h-4 w-4 mr-2" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="text-white grid lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Package className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.totalListings}</p>
                  <p className="text-white text-white text-sm">Total Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <TrendingUp className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.activeListings}</p>
                  <p className="text-white text-white text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Star className="text-white h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.soldItems}</p>
                  <p className="text-white text-white text-sm">Sold</p>
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
                <div className="text-white p-2 bg-netflix-red/20 rounded-lg">
                  <Eye className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.totalViews}</p>
                  <p className="text-white text-white text-sm">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-netflix-dark/20 rounded-lg">
                  <TrendingUp className="text-white h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">${stats.averagePrice}</p>
                  <p className="text-white text-white text-sm">Avg Price</p>
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
              placeholder="Search your listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white pl-10 bg-netflix-dark border-gray-700 text-white"
            />
          </div>
          <Button variant="outline" className="text-white border-gray-700 text-white">
            <Filter className="text-white h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Equipment Listings */}
        <div className="text-white grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <Card key={item.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <div className="text-white relative">
                <div className="text-white h-48 bg-netflix-dark rounded-t-lg flex items-center justify-center">
                  <Package className="text-white h-16 w-16 text-white" />
                </div>
                <Badge 
                  className={`absolute top-3 left-3 ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </Badge>
                <Badge 
                  className={`absolute top-3 right-3 ${getConditionColor(item.condition)}`}
                >
                  {item.condition}
                </Badge>
              </div>

              <CardContent className="text-white p-6">
                <div className="text-white mb-4">
                  <h3 className="text-white text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white text-white text-sm mb-3">{item.description}</p>
                  
                  <div className="text-white flex items-center justify-between mb-3">
                    <div className="text-white flex items-center space-x-2">
                      <span className="text-white text-2xl font-bold text-white">${item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-white text-white line-through">${item.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-white bg-netflix-dark text-white">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="text-white flex items-center space-x-1 text-white text-sm mb-4">
                    <MapPin className="text-white h-3 w-3" />
                    <span>{item.location}</span>
                    <span>•</span>
                    <Calendar className="text-white h-3 w-3" />
                    <span>Posted {new Date(item.datePosted).toLocaleDateString()}</span>
                  </div>

                  <div className="text-white flex items-center justify-between text-sm text-white mb-4">
                    <div className="text-white flex items-center space-x-4">
                      <div className="text-white flex items-center space-x-1">
                        <Eye className="text-white h-3 w-3" />
                        <span>{item.views}</span>
                      </div>
                      <div className="text-white flex items-center space-x-1">
                        <Heart className="text-white h-3 w-3" />
                        <span>{item.saves}</span>
                      </div>
                      <div className="text-white flex items-center space-x-1">
                        <MessageCircle className="text-white h-3 w-3" />
                        <span>{item.messages}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-white flex space-x-2">
                    <Button size="sm" variant="outline" className="text-white flex-1 border-gray-700 text-white">
                      <Edit className="text-white h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-gray-700 text-white">
                      <Share className="text-white h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-red-700 text-red-400 hover:bg-red-900/20">
                      <Trash2 className="text-white h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-white text-center py-12">
            <Package className="text-white h-16 w-16 text-white mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold text-white mb-2">No listings found</h3>
            <p className="text-white text-white mb-6">Try adjusting your search terms or add a new listing</p>
            <Button className="text-white netflix-button-primary">
              <Plus className="text-white h-4 w-4 mr-2" />
              Add Your First Listing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}