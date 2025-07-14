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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Star, Music, GraduationCap } from "lucide-react";

interface MusicSchool {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  courses: {
    id: string;
    name: string;
    type: string;
    price: number;
    duration: string;
  }[];
  featured: boolean;
}

export default function MusicSchoolsList() {
  const { token } = useAuth();
  const [musicSchools, setMusicSchools] = useState<MusicSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("rating");

  // Mock data for development
  const mockMusicSchools: MusicSchool[] = [
    {
      id: "1",
      name: "Harmony Music Academy",
      description: "A premier music school offering lessons in various instruments for students of all ages and skill levels.",
      location: "123 Mozart Street",
      city: "New York",
      imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
      rating: 4.8,
      reviewCount: 42,
      categories: ["Piano", "Guitar", "Voice", "Theory"],
      courses: [
        { id: "c1", name: "Piano Masterclass", type: "Group", price: 30, duration: "60 min" },
        { id: "c2", name: "Private Guitar Lessons", type: "Private", price: 50, duration: "45 min" },
        { id: "c3", name: "Music Theory Workshop", type: "Workshop", price: 25, duration: "90 min" }
      ],
      featured: true
    },
    {
      id: "2",
      name: "Rhythm & Beats School",
      description: "Specializing in drums, percussion and rhythm-based instruments with experienced instructors.",
      location: "45 Drummer's Lane",
      city: "Los Angeles",
      imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
      rating: 4.6,
      reviewCount: 28,
      categories: ["Drums", "Percussion", "Recording"],
      courses: [
        { id: "c4", name: "Drum Basics", type: "Group", price: 25, duration: "60 min" },
        { id: "c5", name: "Advanced Percussion", type: "Private", price: 55, duration: "45 min" }
      ],
      featured: false
    },
    {
      id: "3",
      name: "Classical Strings Academy",
      description: "A traditional music school focused on orchestral string instruments with recital opportunities.",
      location: "78 Symphony Road",
      city: "Boston",
      imageUrl: "https://images.unsplash.com/photo-1558391743-ca83be23f5a1",
      rating: 4.9,
      reviewCount: 36,
      categories: ["Violin", "Cello", "Viola", "Double Bass", "Theory"],
      courses: [
        { id: "c6", name: "Violin Lessons", type: "Private", price: 60, duration: "45 min" },
        { id: "c7", name: "Orchestral Workshop", type: "Group", price: 35, duration: "120 min" }
      ],
      featured: true
    },
    {
      id: "4",
      name: "Jazz & Blues Institute",
      description: "Learn the art of improvisation and expression through jazz and blues music.",
      location: "12 Blues Avenue",
      city: "Chicago",
      imageUrl: "https://images.unsplash.com/photo-1517333971889-e4e7cb14c09e",
      rating: 4.7,
      reviewCount: 31,
      categories: ["Saxophone", "Piano", "Bass", "Trumpet", "Voice"],
      courses: [
        { id: "c8", name: "Jazz Improvisation", type: "Group", price: 40, duration: "90 min" },
        { id: "c9", name: "Blues Guitar", type: "Private", price: 50, duration: "45 min" }
      ],
      featured: false
    },
    {
      id: "5",
      name: "Digital Music Production",
      description: "Modern music production courses teaching recording, mixing, and electronic music creation.",
      location: "301 Tech Plaza",
      city: "Miami",
      imageUrl: "https://images.unsplash.com/photo-1598626618658-dfa41a3561d8",
      rating: 4.5,
      reviewCount: 24,
      categories: ["Production", "Recording", "Electronic Music"],
      courses: [
        { id: "c10", name: "Intro to Music Production", type: "Workshop", price: 45, duration: "120 min" },
        { id: "c11", name: "DAW Masterclass", type: "Group", price: 35, duration: "90 min" }
      ],
      featured: true
    },
    {
      id: "6",
      name: "Kids' Music Corner",
      description: "Fun and engaging music lessons specifically designed for children ages 3-12.",
      location: "55 Melody Park",
      city: "Seattle",
      imageUrl: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf",
      rating: 4.8,
      reviewCount: 45,
      categories: ["Piano", "Guitar", "Voice", "Group Classes"],
      courses: [
        { id: "c12", name: "Musical Exploration (Ages 3-5)", type: "Group", price: 20, duration: "45 min" },
        { id: "c13", name: "Young Musicians (Ages 6-12)", type: "Group", price: 25, duration: "60 min" }
      ],
      featured: false
    }
  ];

  const allCategories = [...new Set(mockMusicSchools.flatMap(school => school.categories))].sort();
  const cities = [...new Set(mockMusicSchools.map(school => school.city))].sort();

  useEffect(() => {
    const fetchMusicSchools = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/music-schools`, {
        //   headers: token ? { Authorization: `Bearer ${token}` } : {},
        // });
        // const data = await response.json();
        // setMusicSchools(data);
        
        // Using mock data for now
        setTimeout(() => {
          setMusicSchools(mockMusicSchools);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching music schools:", error);
        setError("Failed to load music schools. Please try again later.");
        setLoading(false);
      }
    };

    fetchMusicSchools();
  }, [token]);

  // Category toggle handler
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(current =>
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    );
  };

  // Filter and sort functions
  const filteredAndSortedSchools = musicSchools
    .filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           school.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity ? school.city === selectedCity : true;
      const matchesCategories = selectedCategories.length === 0 || 
                              selectedCategories.some(cat => school.categories.includes(cat));
      
      return matchesSearch && matchesCity && matchesCategories;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <MainLayout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold text-white">Music Schools</h1>
            <p className="text-white mt-2 text-white">Find music lessons and courses to develop your skills</p>
          </div>
        </div>

        {/* Filters */}
        <div className="text-white bg-zinc-900 p-4 rounded-lg shadow-sm border mb-6">
          <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="text-white block text-sm font-medium text-white mb-1">
                Search
              </label>
              <Input
                id="search"
                placeholder="Search schools or courses"
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
                  <SelectItem value="">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="sort" className="text-white block text-sm font-medium text-white mb-1">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categories */}
          <div className="text-white mt-4 border-t pt-4">
            <label className="text-white block text-sm font-medium text-white mb-2">
              Filter by Instrument/Category
            </label>
            <div className="text-white flex flex-wrap gap-2">
              {allCategories.map(category => (
                <div key={category} className="text-white flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label 
                    htmlFor={`category-${category}`}
                    className="text-white text-sm cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
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
              {filteredAndSortedSchools.length} {filteredAndSortedSchools.length === 1 ? "school" : "schools"} found
            </p>
            
            {/* Featured Schools */}
            {filteredAndSortedSchools.some(school => school.featured) && (
              <div className="text-white mb-8">
                <h2 className="text-white text-xl font-semibold mb-4">Featured Schools</h2>
                <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedSchools
                    .filter(school => school.featured)
                    .map((school) => (
                      <MusicSchoolCard key={school.id} school={school} />
                    ))}
                </div>
              </div>
            )}

            {/* All Schools */}
            <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedSchools
                .filter(school => !school.featured || !filteredAndSortedSchools.some(s => s.featured))
                .map((school) => (
                  <MusicSchoolCard key={school.id} school={school} />
                ))}
            </div>
            
            {filteredAndSortedSchools.length === 0 && (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white">No music schools found matching your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

// Music School Card component
function MusicSchoolCard({ school }: { school: MusicSchool }) {
  return (
    <Link to={`/music-schools/${school.id}`}>
      <Card className="text-white h-full overflow-hidden hover:shadow-md transition-transform hover:-translate-y-1">
        <div className="text-white h-48 overflow-hidden">
          <img
            src={school.imageUrl}
            alt={school.name}
            className="text-white w-full h-full object-cover"
          />
        </div>
        <CardHeader className="text-white pb-2">
          <CardTitle className="text-white text-xl">{school.name}</CardTitle>
          <div className="text-white flex items-center text-white text-sm">
            <MapPin className="text-white h-4 w-4 mr-1" />
            <span>{school.city}</span>
            <div className="text-white ml-4 flex items-center">
              <Star className="text-white h-4 w-4 mr-1 text-amber-500" />
              <span>{school.rating} ({school.reviewCount})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-white pb-2">
          <p className="text-white text-white line-clamp-2 mb-2">{school.description}</p>
          
          <div className="text-white mt-2">
            <div className="text-white flex flex-wrap gap-1">
              {school.categories.slice(0, 4).map((category, index) => (
                <Badge key={index} variant="secondary" className="text-white text-xs">
                  <Music className="text-white h-3 w-3 mr-1" />
                  {category}
                </Badge>
              ))}
              {school.categories.length > 4 && (
                <Badge variant="secondary" className="text-white text-xs">
                  +{school.categories.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-white pt-2 border-t">
          <div className="text-white w-full">
            <h4 className="text-white text-sm font-medium mb-2 flex items-center">
              <GraduationCap className="text-white h-4 w-4 mr-1 text-white" />
              Sample Courses
            </h4>
            <ul className="text-white text-sm space-y-1">
              {school.courses.slice(0, 2).map(course => (
                <li key={course.id} className="text-white flex justify-between">
                  <span>{course.name} ({course.type})</span>
                  <span className="text-white font-medium">${course.price}</span>
                </li>
              ))}
              {school.courses.length > 2 && (
                <li className="text-white text-red-600 text-xs font-medium">
                  + {school.courses.length - 2} more courses
                </li>
              )}
            </ul>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}