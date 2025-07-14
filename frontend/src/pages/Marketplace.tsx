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
  Clock, 
  DollarSign, 
  Guitar, 
  Piano, 
  Headphones,
  User,
  Calendar,
  MessageCircle,
  Filter,
  Heart,
  Share2,
  Truck,
  Shield,
  Music,
  Drum,
  Mic,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Marketplace() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [condition, setCondition] = useState("all");

  // Mock data for equipment listings
  const equipmentListings = [
    {
      id: 1,
      title: "Fender Player Stratocaster",
      category: "guitars",
      price: 750,
      originalPrice: 900,
      condition: "excellent",
      location: "Los Angeles, CA",
      seller: {
        name: "Alex Rivera",
        rating: 4.9,
        reviews: 127,
        verified: true,
        responseTime: "< 2 hours"
      },
      images: ["guitar1.jpg"],
      description: "Beautiful Fender Player Stratocaster in excellent condition. Only used for studio recordings. Comes with original hard case and all accessories.",
      specifications: {
        brand: "Fender",
        model: "Player Stratocaster",
        year: "2022",
        color: "Sunburst",
        condition: "9/10"
      },
      features: ["Original Hard Case", "New Strings", "Professional Setup"],
      postedDate: "2 days ago",
      views: 234,
      likes: 18,
      shipping: "Free shipping"
    },
    {
      id: 2,
      title: "Roland TD-17KVX V-Drums Kit",
      category: "drums",
      price: 1200,
      originalPrice: 1500,
      condition: "like-new",
      location: "Nashville, TN",
      seller: {
        name: "Sarah Chen",
        rating: 4.8,
        reviews: 89,
        verified: true,
        responseTime: "< 1 hour"
      },
      images: ["drums1.jpg"],
      description: "Roland TD-17KVX electronic drum kit in like-new condition. Perfect for home practice and studio recording. All pads and cymbals included.",
      specifications: {
        brand: "Roland",
        model: "TD-17KVX",
        year: "2023",
        pads: "Mesh heads",
        condition: "9.5/10"
      },
      features: ["Mesh Head Pads", "Bluetooth Connectivity", "USB Recording"],
      postedDate: "1 day ago",
      views: 156,
      likes: 24,
      shipping: "Local pickup preferred"
    },
    {
      id: 3,
      title: "Shure SM7B Dynamic Microphone",
      category: "microphones",
      price: 320,
      originalPrice: 400,
      condition: "excellent",
      location: "New York, NY",
      seller: {
        name: "Marcus Johnson",
        rating: 4.9,
        reviews: 203,
        verified: true,
        responseTime: "< 30 minutes"
      },
      images: ["mic1.jpg"],
      description: "Professional Shure SM7B microphone in excellent condition. Perfect for vocals, podcasting, and broadcasting. Includes original box and accessories.",
      specifications: {
        brand: "Shure",
        model: "SM7B",
        type: "Dynamic",
        pattern: "Cardioid",
        condition: "9/10"
      },
      features: ["Original Box", "Windscreen", "Switch Cover Plate"],
      postedDate: "3 days ago",
      views: 412,
      likes: 67,
      shipping: "Free shipping"
    },
    {
      id: 4,
      title: "Yamaha P-125 Digital Piano",
      category: "keyboards",
      price: 450,
      originalPrice: 650,
      condition: "good",
      location: "Miami, FL",
      seller: {
        name: "Elena Vasquez",
        rating: 4.7,
        reviews: 145,
        verified: true,
        responseTime: "< 3 hours"
      },
      images: ["piano1.jpg"],
      description: "Yamaha P-125 digital piano in good condition. Great for beginners and intermediate players. Includes sustain pedal and music stand.",
      specifications: {
        brand: "Yamaha",
        model: "P-125",
        keys: "88 weighted",
        voices: "24",
        condition: "8/10"
      },
      features: ["88 Weighted Keys", "Sustain Pedal", "Music Stand"],
      postedDate: "5 days ago",
      views: 89,
      likes: 12,
      shipping: "$50 shipping"
    },
    {
      id: 5,
      title: "Audio-Technica ATH-M50x Headphones",
      category: "audio-gear",
      price: 120,
      originalPrice: 150,
      condition: "like-new",
      location: "Atlanta, GA",
      seller: {
        name: "David Kim",
        rating: 4.8,
        reviews: 167,
        verified: true,
        responseTime: "< 2 hours"
      },
      images: ["headphones1.jpg"],
      description: "Audio-Technica ATH-M50x professional studio headphones. Barely used, in like-new condition. Perfect for mixing and monitoring.",
      specifications: {
        brand: "Audio-Technica",
        model: "ATH-M50x",
        type: "Closed-back",
        impedance: "38 ohms",
        condition: "9.5/10"
      },
      features: ["Detachable Cables", "Swiveling Earcups", "Original Case"],
      postedDate: "1 week ago",
      views: 178,
      likes: 29,
      shipping: "Free shipping"
    },
    {
      id: 6,
      title: "Focusrite Scarlett 2i2 Audio Interface",
      category: "audio-gear",
      price: 140,
      originalPrice: 170,
      condition: "excellent",
      location: "Chicago, IL",
      seller: {
        name: "Luna Martinez",
        rating: 4.9,
        reviews: 76,
        verified: true,
        responseTime: "< 1 hour"
      },
      images: ["interface1.jpg"],
      description: "Focusrite Scarlett 2i2 3rd Gen audio interface in excellent condition. Perfect for home recording setup. Includes USB cable and software.",
      specifications: {
        brand: "Focusrite",
        model: "Scarlett 2i2 3rd Gen",
        inputs: "2 XLR/Jack",
        outputs: "2 Monitor",
        condition: "9/10"
      },
      features: ["USB-C Connectivity", "48V Phantom Power", "Pro Tools First"],
      postedDate: "4 days ago",
      views: 267,
      likes: 35,
      shipping: "Free shipping"
    }
  ];

  const categories = [
    { id: "all", name: "All Equipment", icon: <Music className="h-4 w-4" /> },
    { id: "guitars", name: "Guitars & Bass", icon: <Guitar className="h-4 w-4" /> },
    { id: "keyboards", name: "Keyboards & Piano", icon: <Piano className="h-4 w-4" /> },
    { id: "drums", name: "Drums & Percussion", icon: <Drum className="h-4 w-4" /> },
    { id: "microphones", name: "Microphones", icon: <Mic className="h-4 w-4" /> },
    { id: "audio-gear", name: "Audio Gear", icon: <Headphones className="h-4 w-4" /> },
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "local", name: "Within 50 miles" },
    { id: "us", name: "United States" },
    { id: "international", name: "International" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-100", name: "Under $100" },
    { id: "100-500", name: "$100 - $500" },
    { id: "500-1000", name: "$500 - $1,000" },
    { id: "over-1000", name: "Over $1,000" },
  ];

  const conditions = [
    { id: "all", name: "All Conditions" },
    { id: "like-new", name: "Like New" },
    { id: "excellent", name: "Excellent" },
    { id: "good", name: "Good" },
    { id: "fair", name: "Fair" },
  ];

  // Filter equipment based on search and filters
  const filteredEquipment = equipmentListings.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specifications.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    const matchesPrice = priceRange === "all" ||
      (priceRange === "under-100" && item.price < 100) ||
      (priceRange === "100-500" && item.price >= 100 && item.price <= 500) ||
      (priceRange === "500-1000" && item.price >= 500 && item.price <= 1000) ||
      (priceRange === "over-1000" && item.price > 1000);

    const matchesCondition = condition === "all" || item.condition === condition;

    return matchesSearch && matchesCategory && matchesPrice && matchesCondition;
  });

  const handleContactSeller = (listingId: number) => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=contact&listing=${listingId}`;
    } else {
      console.log(`Contacting seller for listing ${listingId}`);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'like-new': return 'text-green-400 bg-green-400/10';
      case 'excellent': return 'text-blue-400 bg-blue-400/10';
      case 'good': return 'text-yellow-400 bg-yellow-400/10';
      case 'fair': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Equipment
            <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Buy and sell quality musical equipment. From guitars and keyboards to microphones and studio gear - 
            find great deals from verified sellers.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search equipment..."
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

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {conditions.map(cond => (
                  <option key={cond.id} value={cond.id}>
                    {cond.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
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
              {filteredEquipment.length} item{filteredEquipment.length !== 1 ? 's' : ''} available
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button className="netflix-button-primary">
                <Plus className="h-4 w-4 mr-2" />
                Sell Equipment
              </Button>
            )}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">
                      {item.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={`text-xs ${getConditionColor(item.condition)}`}>
                        {item.condition.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-gray-400 text-sm">{item.postedDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-netflix-red">
                      ${item.price}
                    </div>
                    {item.originalPrice > item.price && (
                      <div className="text-sm text-gray-400 line-through">
                        ${item.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Equipment Image Placeholder */}
                <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    {categories.find(cat => cat.id === item.category)?.icon}
                    <div className="text-gray-400 text-sm mt-2">Equipment Photo</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Specifications */}
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h4 className="text-white font-medium mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold">
                      {item.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{item.seller.name}</span>
                        {item.seller.verified && (
                          <Badge className="bg-red-600 text-white text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Star className="h-3 w-3 fill-current text-yellow-400" />
                        <span>{item.seller.rating} ({item.seller.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.seller.responseTime}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>{item.views} views</span>
                    <span>{item.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4" />
                    <span>{item.shipping}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() => handleContactSeller(item.id)}
                    className="flex-1 netflix-button-primary"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-Action for Sellers */}
        <div className="bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">
            Got equipment to sell?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our marketplace to sell your musical equipment to a community of musicians. 
            Get fair prices and connect with serious buyers.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="netflix-button-primary text-lg px-8 py-3">
              Start Selling
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}