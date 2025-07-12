import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Star,
  ChevronLeft,
  Calendar,
  Tag,
  Package,
  Clock,
  User,
  DollarSign,
  MessageCircle,
  Flag,
  Share2,
  Heart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Seller {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  memberSince: string;
  responseRate: number;
  verified: boolean;
}

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
  images: string[];
  createdAt: string;
  viewCount: number;
  specifications: {
    brand?: string;
    model?: string;
    year?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  seller: Seller;
  similarItems: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: "Sale" | "Rent";
  }[];
}

export default function MarketplaceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Mock data for development
  const mockItem: MarketplaceItem = {
    id: "1",
    title: "Fender Stratocaster Electric Guitar",
    description: "Barely used Fender Stratocaster in excellent condition. American made, sunburst finish. Comes with a hard case, extra strings, and a strap. Perfect for intermediate to professional players. This guitar has incredible tone and playability. The neck is comfortable and the action is set up perfectly. I'm only selling because I've upgraded to a custom shop model.",
    price: 1200,
    type: "Sale",
    condition: "Like New",
    category: "Instruments",
    subcategory: "Guitars",
    location: "Downtown Music District",
    city: "New York",
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f",
      "https://images.unsplash.com/photo-1550985616-10810253b84d",
      "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02",
      "https://images.unsplash.com/photo-1556449895-a33c9dba33dd"
    ],
    createdAt: "2023-10-15",
    viewCount: 128,
    specifications: {
      brand: "Fender",
      model: "American Professional Stratocaster",
      year: "2020",
      color: "Sunburst",
      "Body Material": "Alder",
      "Neck Material": "Maple",
      "Fretboard Material": "Rosewood",
      "Number of Frets": "22"
    },
    seller: {
      id: "u1",
      name: "James Wilson",
      imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
      rating: 4.8,
      reviewCount: 12,
      memberSince: "2021",
      responseRate: 98,
      verified: true
    },
    similarItems: [
      {
        id: "s1",
        title: "Gibson Les Paul Standard",
        price: 1800,
        imageUrl: "https://images.unsplash.com/photo-1550985616-10810253b84d",
        type: "Sale"
      },
      {
        id: "s2",
        title: "PRS Custom 24",
        price: 1500,
        imageUrl: "https://images.unsplash.com/photo-1556449895-a33c9dba33dd",
        type: "Sale"
      },
      {
        id: "s3",
        title: "Premium Guitar Rental",
        price: 50,
        imageUrl: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0",
        type: "Rent"
      }
    ]
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/marketplace/${id}`);
        // const data = await response.json();
        // setItem(data);
        
        // Using mock data for now
        setTimeout(() => {
          setItem(mockItem);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setError("Failed to load item details. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/marketplace/${id}` } });
      return;
    }
    
    if (!message.trim()) {
      return;
    }
    
    // In a real app, we would make an API call to send the message
    console.log("Message to seller:", {
      itemId: id,
      sellerId: item?.seller.id,
      message
    });
    
    // Reset message field and close dialog
    setMessage("");
  };

  const handleToggleSave = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/marketplace/${id}` } });
      return;
    }
    
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !item) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-red-600">{error || "Item not found"}</p>
            <Button onClick={() => navigate("/marketplace")} className="mt-4">
              Back to Marketplace
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/marketplace")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <Badge variant={item.type === "Sale" ? "default" : "secondary"} className="text-sm">
                {item.type}
                {item.type === "Rent" && item.rentalPeriod && ` (${item.rentalPeriod})`}
              </Badge>
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{item.city}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Tag className="h-4 w-4 mr-1" />
                <span>{item.category} / {item.subcategory}</span>
              </div>
            </div>
            
            {/* Image carousel */}
            <Carousel className="w-full mb-8">
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-96 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${item.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="font-medium">Condition</span>
                    <span>{item.condition}</span>
                  </div>
                  
                  {Object.entries(item.specifications).map(([key, value], index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
                      <span className="font-medium">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Similar Items */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {item.similarItems.map((similar) => (
                    <div key={similar.id} className="rounded-lg overflow-hidden border hover:shadow-md transition-all">
                      <div className="h-32 overflow-hidden">
                        <img
                          src={similar.imageUrl}
                          alt={similar.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{similar.title}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <Badge variant="outline" className="text-xs">
                            {similar.type}
                          </Badge>
                          <span className="font-bold">${similar.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Price card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <DollarSign className="h-6 w-6 mr-1" />
                  {item.price}
                  {item.type === "Rent" && item.rentalPeriod && (
                    <span className="text-base font-normal text-gray-500 ml-1">
                      /{item.rentalPeriod.split(' ')[1]}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-1 text-gray-500" />
                    <span>Condition: {item.condition}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Contact Seller</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Contact Seller</DialogTitle>
                      <DialogDescription>
                        Send a message to {item.seller.name} about this item
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="mb-4">
                        <p className="font-medium mb-1">Item</p>
                        <p className="text-sm text-gray-600">{item.title}</p>
                      </div>
                      <Textarea
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-32"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleContactSeller} disabled={!message.trim() || !isAuthenticated}>
                        {isAuthenticated ? "Send Message" : "Sign in to Contact"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={handleToggleSave}>
                    <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full text-gray-500">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Item
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  <span>{item.viewCount} people have viewed this item</span>
                </div>
              </CardContent>
            </Card>

            {/* Seller card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={item.seller.imageUrl} alt={item.seller.name} />
                    <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium flex items-center">
                      {item.seller.name}
                      {item.seller.verified && (
                        <Badge variant="secondary" className="ml-2 text-xs">Verified</Badge>
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-3 w-3 mr-1 text-amber-500" />
                      <span>{item.seller.rating} ({item.seller.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member since</span>
                    <span>{item.seller.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Response rate</span>
                    <span>{item.seller.responseRate}%</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}