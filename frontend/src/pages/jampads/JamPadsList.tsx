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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Music, Users } from "lucide-react";

interface JamPad {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  hourlyRate: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  equipment: string[];
  capacity: number;
  availableNow: boolean;
}

export default function JamPadsList() {
  const { token } = useAuth();
  const [jamPads, setJamPads] = useState<JamPad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableOnly, setAvailableOnly] = useState(false);

  // Mock data for development
  const mockJamPads: JamPad[] = [
    {
      id: "1",
      name: "Sonic Studio",
      description: "A professional recording studio with top-notch equipment for bands and solo artists.",
      address: "123 Music Ave",
      city: "New York",
      hourlyRate: 45,
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      rating: 4.8,
      reviewCount: 24,
      equipment: ["Drum Kit", "Guitar Amps", "PA System", "Microphones"],
      capacity: 6,
      availableNow: true
    },
    {
      id: "2",
      name: "Rhythm Room",
      description: "A cozy rehearsal space perfect for small bands and practice sessions.",
      address: "456 Beat Street",
      city: "Los Angeles",
      hourlyRate: 35,
      imageUrl: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3",
      rating: 4.5,
      reviewCount: 18,
      equipment: ["Drum Kit", "Bass Amp", "Guitar Amp", "Keyboard"],
      capacity: 4,
      availableNow: false
    },
    {
      id: "3",
      name: "Harmony House",
      description: "A spacious jam pad with excellent acoustics and a variety of instruments.",
      address: "789 Melody Lane",
      city: "Chicago",
      hourlyRate: 50,
      imageUrl: "https://images.unsplash.com/photo-1568484901937-74e0ad55a1a5",
      rating: 4.9,
      reviewCount: 32,
      equipment: ["Grand Piano", "Drum Kit", "Guitar Amps", "Bass Amps", "Synths"],
      capacity: 8,
      availableNow: true
    },
    {
      id: "4",
      name: "Groove Garage",
      description: "An industrial-style rehearsal space with powerful sound systems and stage lights.",
      address: "101 Chord Court",
      city: "Nashville",
      hourlyRate: 40,
      imageUrl: "https://images.unsplash.com/photo-1525018923-1ebe8261a6a6",
      rating: 4.6,
      reviewCount: 15,
      equipment: ["Drum Kit", "Guitar Amps", "Bass Amp", "Microphones", "Mixing Console"],
      capacity: 5,
      availableNow: true
    },
    {
      id: "5",
      name: "Beat Box Studio",
      description: "A modern studio space designed for electronic music producers and DJs.",
      address: "202 Synth Street",
      city: "Miami",
      hourlyRate: 55,
      imageUrl: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6",
      rating: 4.7,
      reviewCount: 21,
      equipment: ["DJ Equipment", "Synthesizers", "MIDI Controllers", "Studio Monitors"],
      capacity: 3,
      availableNow: false
    },
    {
      id: "6",
      name: "Acoustic Haven",
      description: "A warm, wood-paneled space perfect for acoustic sessions and intimate recordings.",
      address: "303 Harmony Road",
      city: "Austin",
      hourlyRate: 30,
      imageUrl: "https://images.unsplash.com/photo-1603074255852-11a95bc7395d",
      rating: 4.4,
      reviewCount: 12,
      equipment: ["Acoustic Guitar", "Piano", "Microphones", "Basic PA System"],
      capacity: 4,
      availableNow: true
    }
  ];

  useEffect(() => {
    const fetchJamPads = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/jampads`, {
        //   headers: token ? { Authorization: `Bearer ${token}` } : {},
        // });
        // const data = await response.json();
        // setJamPads(data);
        
        // Using mock data for now
        setTimeout(() => {
          setJamPads(mockJamPads);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching jam pads:", error);
        setError("Failed to load jam pads. Please try again later.");
        setLoading(false);
      }
    };

    fetchJamPads();
  }, [token]);

  // Filter functions
  const filteredJamPads = jamPads.filter((jamPad) => {
    const matchesSearch = jamPad.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          jamPad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = jamPad.hourlyRate >= priceRange[0] && jamPad.hourlyRate <= priceRange[1];
    const matchesCity = selectedCity ? jamPad.city === selectedCity : true;
    const matchesAvailability = availableOnly ? jamPad.availableNow : true;
    
    return matchesSearch && matchesPrice && matchesCity && matchesAvailability;
  });

  const cities = [...new Set(jamPads.map(jamPad => jamPad.city))];

  return (
    <MainLayout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold text-white">Jam Pads</h1>
            <p className="text-white mt-2 text-white">Find and book the perfect rehearsal space for your music</p>
          </div>
          <div className="text-white mt-4 md:mt-0">
            <Button asChild>
              <Link to="/jampads/map">View on Map</Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="text-white bg-zinc-900 p-4 rounded-lg shadow-sm border mb-6">
          <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="text-white block text-sm font-medium text-white mb-1">
                Search
              </label>
              <Input
                id="search"
                placeholder="Search by name or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="city" className="text-white block text-sm font-medium text-white mb-1">
                City
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-white block text-sm font-medium text-white mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                min={0}
                max={200}
                step={5}
                onValueChange={(value) => setPriceRange(value as number[])}
                className="text-white mt-2"
              />
            </div>
            
            <div className="text-white flex items-end">
              <Button
                variant={availableOnly ? "default" : "outline"}
                onClick={() => setAvailableOnly(!availableOnly)}
                className="text-white w-full"
              >
                {availableOnly ? "Available Now ✓" : "Show All"}
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-white flex justify-center items-center h-64">
            <div className="text-white animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-white bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-white text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <p className="text-white text-sm text-white mb-4">
              {filteredJamPads.length} {filteredJamPads.length === 1 ? "jam pad" : "jam pads"} found
            </p>
            
            <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJamPads.map((jamPad) => (
                <Link 
                  to={`/jampads/${jamPad.id}`} 
                  key={jamPad.id}
                  className="text-white transition-transform hover:-translate-y-1"
                >
                  <Card className="text-white h-full overflow-hidden hover:shadow-md">
                    <div className="text-white h-48 overflow-hidden">
                      <img
                        src={jamPad.imageUrl}
                        alt={jamPad.name}
                        className="text-white w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="text-white pb-2">
                      <div className="text-white flex justify-between">
                        <CardTitle className="text-white text-xl">{jamPad.name}</CardTitle>
                        <Badge variant={jamPad.availableNow ? "default" : "outline"}>
                          {jamPad.availableNow ? "Available Now" : "Book Ahead"}
                        </Badge>
                      </div>
                      <div className="text-white flex items-center text-white text-sm">
                        <MapPin className="text-white h-4 w-4 mr-1" />
                        <span>{jamPad.city}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-white pb-2">
                      <p className="text-white text-white line-clamp-2">{jamPad.description}</p>
                      
                      <div className="text-white flex items-center mt-2 space-x-4">
                        <div className="text-white flex items-center">
                          <Users className="text-white h-4 w-4 mr-1 text-white" />
                          <span className="text-white text-sm">{jamPad.capacity}</span>
                        </div>
                        <div className="text-white flex items-center">
                          <Star className="text-white h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-white text-sm">{jamPad.rating} ({jamPad.reviewCount})</span>
                        </div>
                      </div>
                      
                      <div className="text-white mt-3">
                        <div className="text-white flex flex-wrap gap-1">
                          {jamPad.equipment.slice(0, 3).map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-white text-xs">
                              <Music className="text-white h-3 w-3 mr-1" />
                              {item}
                            </Badge>
                          ))}
                          {jamPad.equipment.length > 3 && (
                            <Badge variant="secondary" className="text-white text-xs">
                              +{jamPad.equipment.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="text-white pt-2 flex justify-between">
                      <div className="text-white flex items-center">
                        <Calendar className="text-white h-4 w-4 mr-1 text-white" />
                        <span className="text-white text-sm">Book now</span>
                      </div>
                      <div className="text-white font-semibold text-lg">
                        ${jamPad.hourlyRate}<span className="text-white text-sm font-normal text-white">/hour</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredJamPads.length === 0 && (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white">No jam pads found matching your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}