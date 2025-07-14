import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, DollarSign, Tag, Star, Package, Clock } from "lucide-react";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "Sale" | "Rent";
  rentalPeriod?: string;
  condition: string;
  category: string;
  subcategory: string;
  location: string;
  city: string;
  imageUrl: string;
  createdAt: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerReviewCount: number;
  featured: boolean;
}

export default function MarketplaceList() {
  const { token } = useAuth();
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);

  // Mock data for development
  const mockMarketplaceItems: MarketplaceItem[] = [
    {
      id: "1",
      title: "Fender Stratocaster Electric Guitar",
      description: "Barely used Fender Stratocaster in excellent condition. American made, sunburst finish, includes hard case.",
      price: 1200,
      type: "Sale",
      condition: "Like New",
      category: "Instruments",
      subcategory: "Guitars",
      location: "Downtown Music District",
      city: "New York",
      imageUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f",
      createdAt: "2023-10-15",
      sellerId: "u1",
      sellerName: "James Wilson",
      sellerRating: 4.8,
      sellerReviewCount: 12,
      featured: true
    },
    {
      id: "2",
      title: "Roland V-Drums Electronic Drum Kit",
      description: "Professional electronic drum kit with mesh heads, great for practice or recording. Minimal use.",
      price: 800,
      type: "Sale",
      condition: "Good",
      category: "Instruments",
      subcategory: "Drums & Percussion",
      location: "North Side",
      city: "Chicago",
      imageUrl: "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b",
      createdAt: "2023-10-10",
      sellerId: "u2",
      sellerName: "Mike Thompson",
      sellerRating: 4.6,
      sellerReviewCount: 8,
      featured: false
    },
    {
      id: "3",
      title: "Yamaha Grand Piano",
      description: "Beautiful Yamaha grand piano available for rent. Perfect for recitals, recordings, or special events.",
      price: 200,
      type: "Rent",
      rentalPeriod: "per day",
      condition: "Excellent",
      category: "Instruments",
      subcategory: "Pianos & Keyboards",
      location: "Music Hall Area",
      city: "Boston",
      imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0",
      createdAt: "2023-10-05",
      sellerId: "u3",
      sellerName: "Sarah Johnson",
      sellerRating: 5.0,
      sellerReviewCount: 15,
      featured: true
    },
    {
      id: "4",
      title: "Shure SM58 Microphone",
      description: "Industry standard vocal microphone, slightly used but works perfectly. Includes XLR cable.",
      price: 80,
      type: "Sale",
      condition: "Good",
      category: "Recording Equipment",
      subcategory: "Microphones",
      location: "Studio District",
      city: "Los Angeles",
      imageUrl: "https://images.unsplash.com/photo-1520170350707-b2da59970118",
      createdAt: "2023-09-28",
      sellerId: "u4",
      sellerName: "Alex Rodriguez",
      sellerRating: 4.7,
      sellerReviewCount: 21,
      featured: false
    },
    {
      id: "5",
      title: "Focusrite Scarlett 2i2 Audio Interface",
      description: "USB audio interface, perfect for home recording. Includes original box and cables.",
      price: 120,
      type: "Sale",
      condition: "Like New",
      category: "Recording Equipment",
      subcategory: "Audio Interfaces",
      location: "East Side",
      city: "Austin",
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      createdAt: "2023-09-25",
      sellerId: "u5",
      sellerName: "Taylor Swift",
      sellerRating: 4.9,
      sellerReviewCount: 18,
      featured: false
    },
    {
      id: "6",
      title: "Professional Recording Studio Space",
      description: "Fully equipped recording studio available for rent by the hour. Includes engineer assistance if needed.",
      price: 50,
      type: "Rent",
      rentalPeriod: "per hour",
      condition: "Excellent",
      category: "Spaces",
      subcategory: "Recording Studios",
      location: "Music Row",
      city: "Nashville",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      createdAt: "2023-09-20",
      sellerId: "u6",
      sellerName: "Recording Pros LLC",
      sellerRating: 4.8,
      sellerReviewCount: 32,
      featured: true
    },
    {
      id: "7",
      title: "Vintage Marshall Amp Stack",
      description: "Classic Marshall full stack from the 80s. Great tone, recently serviced. Pickup only.",
      price: 1500,
      type: "Sale",
      condition: "Fair",
      category: "Instruments",
      subcategory: "Amplifiers",
      location: "West End",
      city: "Nashville",
      imageUrl: "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e",
      createdAt: "2023-09-15",
      sellerId: "u7",
      sellerName: "Guitar Center",
      sellerRating: 4.5,
      sellerReviewCount: 42,
      featured: false
    },
    {
      id: "8",
      title: "DJ Equipment Package",
      description: "Complete DJ setup for rent. Includes CDJs, mixer, speakers, and lights. Perfect for events.",
      price: 150,
      type: "Rent",
      rentalPeriod: "per day",
      condition: "Good",
      category: "DJ Equipment",
      subcategory: "Complete Setups",
      location: "Downtown",
      city: "Miami",
      imageUrl: "https://images.unsplash.com/photo-1571136825271-b96698e97645",
      createdAt: "2023-09-10",
      sellerId: "u8",
      sellerName: "DJ Rentals Inc",
      sellerRating: 4.6,
      sellerReviewCount: 28,
      featured: false
    }
  ];

  useEffect(() => {
    const fetchMarketplaceItems = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/marketplace`, {
        //   headers: token ? { Authorization: `Bearer ${token}` } : {},
        // });
        // const data = await response.json();
        // setMarketplaceItems(data);
        
        // Using mock data for now
        setTimeout(() => {
          setMarketplaceItems(mockMarketplaceItems);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching marketplace items:", error);
        setError("Failed to load marketplace items. Please try again later.");
        setLoading(false);
      }
    };

    fetchMarketplaceItems();
  }, [token]);

  // Extract unique values for filters
  const categories = [...new Set(mockMarketplaceItems.map(item => item.category))];
  const cities = [...new Set(mockMarketplaceItems.map(item => item.city))];
  const conditions = [...new Set(mockMarketplaceItems.map(item => item.condition))];

  // Condition toggle handler
  const handleConditionToggle = (condition: string) => {
    setSelectedCondition(current =>
      current.includes(condition)
        ? current.filter(c => c !== condition)
        : [...current, condition]
    );
  };

  // Filter functions
  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesCity = selectedCity ? item.city === selectedCity : true;
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesType = selectedType === "all" ? true : item.type.toLowerCase() === selectedType.toLowerCase();
    const matchesCondition = selectedCondition.length === 0 || selectedCondition.includes(item.condition);
    
    return matchesSearch && matchesPrice && matchesCity && matchesCategory && matchesType && matchesCondition;
  });

  // Sort items to show featured first
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // If featured status is the same, sort by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Marketplace</h1>
            <p className="mt-2 text-gray-300">Buy, sell, or rent music equipment and spaces</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button asChild variant="outline">
              <Link to="/marketplace/map">View on Map</Link>
            </Button>
            <Button asChild>
              <Link to="/marketplace/create">List an Item</Link>
            </Button>
          </div>
        </div>

        {/* Type Tabs */}
        <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="rent">For Rent</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="bg-zinc-900 p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-white mb-1">
                Search
              </label>
              <Input
                id="search"
                placeholder="Search marketplace"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white mb-1">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                Location
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                min={0}
                max={2000}
                step={50}
                onValueChange={(value) => setPriceRange(value as number[])}
                className="mt-2"
              />
            </div>
          </div>

          {/* Condition Filters */}
          <div className="mt-4 pt-4 border-t">
            <label className="block text-sm font-medium text-white mb-2">
              Condition
            </label>
            <div className="flex flex-wrap gap-4">
              {conditions.map(condition => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`condition-${condition}`}
                    checked={selectedCondition.includes(condition)}
                    onCheckedChange={() => handleConditionToggle(condition)}
                  />
                  <Label 
                    htmlFor={`condition-${condition}`}
                    className="text-sm cursor-pointer"
                  >
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
            </p>
            
            {/* Featured Items */}
            {sortedItems.some(item => item.featured) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Featured Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sortedItems
                    .filter(item => item.featured)
                    .map((item) => (
                      <MarketplaceCard key={item.id} item={item} />
                    ))}
                </div>
              </div>
            )}

            {/* All Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedItems
                .filter(item => !item.featured || !sortedItems.some(i => i.featured))
                .map((item) => (
                  <MarketplaceCard key={item.id} item={item} />
                ))}
            </div>
            
            {sortedItems.length === 0 && (
              <div className="bg-black p-8 rounded-lg border text-center">
                <p className="text-gray-300">No items found matching your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

// Marketplace Item Card component
function MarketplaceCard({ item }: { item: MarketplaceItem }) {
  return (
    <Link to={`/marketplace/${item.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-transform hover:-translate-y-1">
        <div className="h-48 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
          </div>
          <CardDescription className="flex items-center text-xs">
            <Badge variant={item.type === "Sale" ? "default" : "secondary"}>
              {item.type}
            </Badge>
            {item.type === "Rent" && (
              <span className="ml-2 text-gray-400">{item.rentalPeriod}</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-white text-sm line-clamp-2 mb-2">{item.description}</p>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-gray-400 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{item.city}</span>
            </div>
            <div className="flex items-center text-gray-400 text-xs">
              <Package className="h-3 w-3 mr-1" />
              <span>{item.condition}</span>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-gray-400 mb-2">
            <Tag className="h-3 w-3 mr-1" />
            <span>{item.category} - {item.subcategory}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>Posted: {new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex items-center justify-between border-t">
          <div className="flex items-center">
            <div className="text-xs flex items-center">
              <Star className="h-3 w-3 mr-1 text-amber-500" />
              <span>{item.sellerRating}</span>
            </div>
          </div>
          <div className="font-bold text-lg flex items-center">
            <DollarSign className="h-4 w-4" />
            <span>{item.price}</span>
            {item.type === "Rent" && (
              <span className="text-xs font-normal text-gray-400 ml-1">
                /{item.rentalPeriod?.split(' ')[1]}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}