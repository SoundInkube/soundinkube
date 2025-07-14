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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Star,
  Music,
  Users,
  DollarSign,
  Clock,
  ChevronLeft,
  CalendarCheck,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface JamPad {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  hourlyRate: number;
  images: string[];
  rating: number;
  reviewCount: number;
  equipment: string[];
  amenities: string[];
  capacity: number;
  availableNow: boolean;
  host: {
    name: string;
    rating: number;
    responseRate: number;
    image: string;
  };
  reviews: {
    id: string;
    user: string;
    userImage: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function JamPadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [jamPad, setJamPad] = useState<JamPad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [duration, setDuration] = useState(2);

  // Mock data for development
  const mockJamPad: JamPad = {
    id: "1",
    name: "Sonic Studio",
    description: "A professional recording studio with top-notch equipment for bands and solo artists. The space features excellent acoustics, sound isolation, and a comfortable lounge area for breaks. Perfect for recording sessions, rehearsals, and small performances.",
    address: "123 Music Ave, Downtown",
    city: "New York",
    hourlyRate: 45,
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      "https://images.unsplash.com/photo-1559732277-7453b141e3a1",
      "https://images.unsplash.com/photo-1560067174-e553b3647603",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae"
    ],
    rating: 4.8,
    reviewCount: 24,
    equipment: [
      "Professional Drum Kit",
      "2x Guitar Amps (Marshall, Fender)",
      "1x Bass Amp (Ampeg)",
      "PA System with Mixer",
      "4x Dynamic Microphones",
      "2x Condenser Microphones",
      "Keyboard/Synthesizer",
      "Monitor Speakers"
    ],
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Lounge Area",
      "Restroom",
      "Water Dispenser",
      "Street Parking"
    ],
    capacity: 6,
    availableNow: true,
    host: {
      name: "David Wilson",
      rating: 4.9,
      responseRate: 95,
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
    },
    reviews: [
      {
        id: "r1",
        user: "Michael B.",
        userImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
        rating: 5,
        comment: "Amazing space with great equipment. The acoustics are perfect for our band rehearsals. Will definitely book again!",
        date: "2023-10-15"
      },
      {
        id: "r2",
        user: "Sarah J.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        rating: 4,
        comment: "Lovely studio with a great vibe. The host was very helpful and accommodating. Only giving 4 stars because one of the mics wasn't working properly.",
        date: "2023-09-28"
      },
      {
        id: "r3",
        user: "Alex T.",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        rating: 5,
        comment: "Fantastic place! Used it for a recording session and the sound quality was excellent. Everything was clean and well-maintained.",
        date: "2023-08-12"
      }
    ]
  };

  useEffect(() => {
    const fetchJamPadDetails = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/jampads/${id}`, {
        //   headers: token ? { Authorization: `Bearer ${token}` } : {},
        // });
        // const data = await response.json();
        // setJamPad(data);
        
        // Using mock data for now
        setTimeout(() => {
          setJamPad(mockJamPad);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching jam pad details:", error);
        setError("Failed to load jam pad details. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
      fetchJamPadDetails();
    }
  }, [id, token]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/jampads/${id}` } });
      return;
    }

    if (!selectedDate || !startTime) {
      return;
    }

    // Calculate total cost
    const totalCost = jamPad ? jamPad.hourlyRate * duration : 0;

    // In a real app, we would make an API call to create a booking
    console.log("Booking details:", {
      jamPadId: id,
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime,
      duration,
      totalCost
    });
  };

  // Format booking time for display
  const formatBookingTime = (time: string, durationHours: number) => {
    const [hours, minutes] = time.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + durationHours);
    
    return {
      start: format(startDate, "h:mm a"),
      end: format(endDate, "h:mm a")
    };
  };

  const { start, end } = startTime ? formatBookingTime(startTime, duration) : { start: "", end: "" };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !jamPad) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-red-600">{error || "Jam pad not found"}</p>
            <Button onClick={() => navigate("/jampads")} className="mt-4">
              Back to Jam Pads
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
          onClick={() => navigate("/jampads")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Jam Pads
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white mb-2">{jamPad.name}</h1>
            <div className="flex items-center text-gray-400 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{jamPad.address}, {jamPad.city}</span>
              <div className="ml-4 flex items-center">
                <Star className="h-4 w-4 mr-1 text-amber-500" />
                <span>{jamPad.rating} ({jamPad.reviewCount} reviews)</span>
              </div>
            </div>
            
            {/* Image carousel */}
            <Carousel className="w-full mb-8">
              <CarouselContent>
                {jamPad.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-96 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${jamPad.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            <Tabs defaultValue="details" className="mb-8">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About this space</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white mb-6">{jamPad.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Capacity & Size</h3>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-gray-400" />
                          <span>Up to {jamPad.capacity} people</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Rate</h3>
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                          <span>${jamPad.hourlyRate}/hour</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                      {jamPad.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <span className="text-red-600">✓</span>
                          </div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="equipment" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Equipment</CardTitle>
                    <CardDescription>
                      All equipment included in the hourly rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {jamPad.equipment.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Music className="h-5 w-5 mr-2 text-gray-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                    <CardDescription>
                      {jamPad.reviewCount} reviews • {jamPad.rating} average rating
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {jamPad.reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-zinc-800 last:border-b-0 last:pb-0">
                          <div className="flex items-center mb-2">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={review.userImage}
                                alt={review.user}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <p className="text-sm text-gray-400">{review.date}</p>
                            </div>
                            <div className="ml-auto flex items-center">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span className="ml-1">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-white">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled={!isAuthenticated}>
                      {isAuthenticated ? "Write a Review" : "Login to Write a Review"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking card */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>${jamPad.hourlyRate} <span className="text-base font-normal text-gray-400">/hour</span></CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span>{jamPad.rating} • {jamPad.reviewCount} reviews</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="booking-date">Date</Label>
                    <div className="mt-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Select Date</DialogTitle>
                            <DialogDescription>
                              Choose a date for your jam session
                            </DialogDescription>
                          </DialogHeader>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="mx-auto"
                            disabled={(date) => date < new Date()}
                          />
                          <DialogFooter>
                            <Button onClick={() => setSelectedDate(new Date())}>Today</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <select
                      id="start-time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5 hours</option>
                      <option value="6">6 hours</option>
                    </select>
                  </div>

                  {start && end && (
                    <div className="mt-2 py-2 px-3 bg-blue-50 rounded-md">
                      <div className="flex items-center text-blue-700">
                        <CalendarCheck className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          {format(selectedDate!, "MMM d")} · {start} - {end}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2 border-t border-zinc-800">
                    <div className="flex justify-between">
                      <span>${jamPad.hourlyRate} × {duration} hours</span>
                      <span>${jamPad.hourlyRate * duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${Math.round(jamPad.hourlyRate * duration * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2">
                      <span>Total</span>
                      <span>${jamPad.hourlyRate * duration + Math.round(jamPad.hourlyRate * duration * 0.1)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleBooking} className="w-full">
                  {isAuthenticated ? "Book Now" : "Sign in to Book"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">About the host</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={jamPad.host.image}
                      alt={jamPad.host.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{jamPad.host.name}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="h-3 w-3 mr-1 text-amber-500" />
                      <span>{jamPad.host.rating} • {jamPad.host.responseRate}% response rate</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Contact Host
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}