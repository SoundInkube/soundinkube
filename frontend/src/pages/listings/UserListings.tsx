import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Eye, DollarSign, MapPin, Star, Music, MoreHorizontal, Plus } from "lucide-react";

// Types
interface MarketplaceListing {
  id: string;
  title: string;
  price: number;
  type: "Sale" | "Rent";
  category: string;
  condition: string;
  imageUrl: string;
  createdAt: string;
  status: "active" | "sold" | "draft" | "expired";
  views: number;
  saves: number;
  inquiries: number;
}

interface JampadListing {
  id: string;
  name: string;
  hourlyRate: number;
  city: string;
  imageUrl: string;
  createdAt: string;
  status: "active" | "draft" | "unavailable";
  views: number;
  bookings: number;
  rating: number | null;
  reviewCount: number;
}

export default function UserListings() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>([]);
  const [jampadListings, setJampadListings] = useState<JampadListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for development
  const mockMarketplaceListings: MarketplaceListing[] = [
    {
      id: "ml1",
      title: "Fender Stratocaster Electric Guitar",
      price: 1200,
      type: "Sale",
      category: "Guitars",
      condition: "Like New",
      imageUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f",
      createdAt: "2023-10-15",
      status: "active",
      views: 128,
      saves: 24,
      inquiries: 5
    },
    {
      id: "ml2",
      title: "Audio Interface - Focusrite Scarlett",
      price: 150,
      type: "Sale",
      category: "Audio Equipment",
      condition: "Good",
      imageUrl: "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2",
      createdAt: "2023-11-02",
      status: "active",
      views: 76,
      saves: 12,
      inquiries: 2
    },
    {
      id: "ml3",
      title: "Vintage Drum Kit - Pearl Export Series",
      price: 600,
      type: "Sale",
      category: "Drums",
      condition: "Used",
      imageUrl: "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b",
      createdAt: "2023-10-28",
      status: "sold",
      views: 203,
      saves: 18,
      inquiries: 8
    }
  ];
  
  const mockJampadListings: JampadListing[] = [
    {
      id: "jp1",
      name: "Downtown Music Studio",
      hourlyRate: 45,
      city: "New York",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      createdAt: "2023-09-20",
      status: "active",
      views: 342,
      bookings: 12,
      rating: 4.8,
      reviewCount: 8
    },
    {
      id: "jp2",
      name: "Harmony House",
      hourlyRate: 35,
      city: "Chicago",
      imageUrl: "https://images.unsplash.com/photo-1568484901937-74e0ad55a1a5",
      createdAt: "2023-10-05",
      status: "active",
      views: 210,
      bookings: 7,
      rating: 4.6,
      reviewCount: 5
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/listings" } });
      return;
    }

    const fetchListings = async () => {
      setLoading(true);
      try {
        // Using mock data for development
        setTimeout(() => {
          setMarketplaceListings(mockMarketplaceListings);
          setJampadListings(mockJampadListings);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load your listings. Please try again later.");
        setLoading(false);
      }
    };

    fetchListings();
  }, [isAuthenticated, navigate]);

  const handleCreateNew = (type: string) => {
    if (type === "marketplace") {
      navigate("/marketplace/create");
    } else {
      navigate("/jampads/create");
    }
  };

  const handleViewListing = (type: string, id: string) => {
    if (type === "marketplace") {
      navigate(`/marketplace/${id}`);
    } else {
      navigate(`/jampads/${id}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-netflix-red text-netflix-red";
      case "sold":
        return "bg-netflix-red text-netflix-red";
      case "draft":
        return "bg-zinc-900 text-white";
      default:
        return "bg-zinc-900 text-white";
    }
  };

  // Count listings by status
  const activeMarketplace = marketplaceListings.filter(l => l.status === "active").length;
  const soldMarketplace = marketplaceListings.filter(l => l.status === "sold").length;
  const draftMarketplace = marketplaceListings.filter(l => l.status === "draft").length;
  
  const activeJampads = jampadListings.filter(l => l.status === "active").length;

  if (loading) {
    return (
      <MainLayout>
        <div className="text-white flex justify-center items-center h-64">
          <div className="text-white animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-white text-red-600">{error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold text-white">My Listings</h1>
            <p className="text-white mt-2 text-white">Manage your marketplace items and jam pads</p>
          </div>
          <Button onClick={() => handleCreateNew("marketplace")}>
            <Plus className="text-white h-4 w-4 mr-2" />
            Create New Listing
          </Button>
        </div>

        <Tabs defaultValue="marketplace" className="text-white w-full">
          <TabsList className="text-white mb-6">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="jampads">Jam Pads</TabsTrigger>
          </TabsList>
          
          {/* Marketplace Tab */}
          <TabsContent value="marketplace">
            {marketplaceListings.length === 0 ? (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white mb-4">You don't have any marketplace listings yet.</p>
                <Button onClick={() => handleCreateNew("marketplace")}>
                  <Plus className="text-white h-4 w-4 mr-2" />
                  Create Marketplace Listing
                </Button>
              </div>
            ) : (
              <>
                <div className="text-white grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <Card className="text-white bg-green-50 border-green-100">
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold text-red-600">{activeMarketplace}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-white bg-blue-50 border-blue-100">
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Sold</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold text-netflix-red">{soldMarketplace}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-white bg-black border-gray-100">
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Drafts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold text-white">{draftMarketplace}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold">{marketplaceListings.length}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-white space-y-4">
                  {marketplaceListings.map((listing) => (
                    <div key={listing.id} className="text-white bg-zinc-900 p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-white h-20 w-20 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="text-white h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="text-white flex-grow">
                        <h3 className="text-white font-medium text-lg">{listing.title}</h3>
                        <div className="text-white flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className="text-white text-xs">
                            {listing.category}
                          </Badge>
                          <Badge variant="outline" className="text-white text-xs">
                            {listing.condition}
                          </Badge>
                          <Badge variant={listing.type === "Sale" ? "default" : "secondary"} className="text-white text-xs">
                            {listing.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-white flex flex-col items-end gap-2">
                        <div className="text-white flex items-center text-lg font-semibold">
                          <DollarSign className="text-white h-4 w-4 text-white" />
                          {listing.price}
                        </div>
                        
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)} capitalize`}>
                          {listing.status}
                        </span>
                        
                        <div className="text-white text-sm text-white flex items-center gap-2">
                          <span className="text-white flex items-center">
                            <Eye className="text-white h-3 w-3 mr-1" />
                            {listing.views}
                          </span>
                          <span className="text-white flex items-center">
                            <CalendarIcon className="text-white h-3 w-3 mr-1" />
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <Button variant="ghost" size="sm" onClick={() => handleViewListing("marketplace", listing.id)}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Jam Pads Tab */}
          <TabsContent value="jampads">
            {jampadListings.length === 0 ? (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white mb-4">You don't have any jam pads listed yet.</p>
                <Button onClick={() => handleCreateNew("jampad")}>
                  <Plus className="text-white h-4 w-4 mr-2" />
                  List a Jam Pad
                </Button>
              </div>
            ) : (
              <>
                <div className="text-white grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <Card className="text-white bg-green-50 border-green-100">
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Active Venues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold text-red-600">{activeJampads}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-white bg-blue-50 border-blue-100">
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Total Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold text-netflix-red">{jampadListings.reduce((sum, jp) => sum + jp.bookings, 0)}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-white pb-2">
                      <CardTitle className="text-white text-lg">Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-3xl font-bold">{jampadListings.length}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-white space-y-4">
                  {jampadListings.map((listing) => (
                    <div key={listing.id} className="text-white bg-zinc-900 p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-white h-20 w-20 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={listing.imageUrl}
                          alt={listing.name}
                          className="text-white h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="text-white flex-grow">
                        <h3 className="text-white font-medium text-lg">{listing.name}</h3>
                        <div className="text-white flex items-center text-sm text-white mt-1">
                          <MapPin className="text-white h-4 w-4 mr-1" />
                          {listing.city}
                        </div>
                      </div>
                      
                      <div className="text-white flex flex-col items-end gap-2">
                        <div className="text-white flex items-center text-lg font-semibold">
                          <DollarSign className="text-white h-4 w-4 text-white" />
                          {listing.hourlyRate}
                          <span className="text-white text-sm text-white ml-1">/hour</span>
                        </div>
                        
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)} capitalize`}>
                          {listing.status}
                        </span>
                        
                        <div className="text-white text-sm text-white flex items-center gap-2">
                          <span className="text-white flex items-center">
                            <Music className="text-white h-3 w-3 mr-1" />
                            {listing.bookings} bookings
                          </span>
                          {listing.rating && (
                            <span className="text-white flex items-center">
                              <Star className="text-white h-3 w-3 mr-1 text-amber-500" />
                              {listing.rating} ({listing.reviewCount})
                            </span>
                          )}
                        </div>
                        
                        <Button variant="ghost" size="sm" onClick={() => handleViewListing("jampad", listing.id)}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}