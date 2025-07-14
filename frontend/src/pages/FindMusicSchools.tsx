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
  Users, 
  Calendar,
  MessageCircle,
  Award,
  BookOpen,
  Music,
  Piano,
  Guitar,
  Mic,
  Headphones,
  GraduationCap,
  Phone,
  Mail,
  Globe,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FindMusicSchools() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [lessonType, setLessonType] = useState("all");

  // Mock data for music schools
  const musicSchools = [
    {
      id: 1,
      name: "Harmony Music Academy",
      tagline: "Where Music Dreams Come True",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 234,
      students: 450,
      established: 2015,
      verified: true,
      featured: true,
      logo: "HMA",
      coverImage: "harmony-cover.jpg",
      
      contact: {
        phone: "(555) 123-4567",
        email: "info@harmonymusicacademy.com",
        website: "https://harmonymusicacademy.com",
        address: "123 Music Blvd, Los Angeles, CA 90210"
      },

      description: "Premier music education institution offering comprehensive programs for all ages and skill levels. Our experienced instructors provide personalized attention in state-of-the-art facilities.",

      programs: [
        {
          name: "Private Lessons",
          instruments: ["Piano", "Guitar", "Voice", "Drums", "Violin", "Bass"],
          priceRange: "$60-120/hour",
          duration: "30-60 minutes",
          ageRange: "All ages"
        },
        {
          name: "Group Classes",
          instruments: ["Band Ensemble", "Choir", "Music Theory", "Songwriting"],
          priceRange: "$40-80/session",
          duration: "60-90 minutes",
          ageRange: "8+ years"
        },
        {
          name: "Summer Camps",
          instruments: ["Rock Band", "Music Production", "Performance"],
          priceRange: "$200-400/week",
          duration: "Full week programs",
          ageRange: "10-18 years"
        }
      ],

      instructors: [
        { name: "Sarah Johnson", specialty: "Piano & Music Theory", experience: "15 years", credentials: "Masters in Music Education" },
        { name: "Mike Rodriguez", specialty: "Guitar & Bass", experience: "12 years", credentials: "Berklee Graduate" },
        { name: "Emma Chen", specialty: "Vocal Coaching", experience: "10 years", credentials: "Professional Recording Artist" }
      ],

      facilities: [
        "12 soundproof practice rooms",
        "Professional recording studio",
        "Concert hall (200 capacity)",
        "Digital piano lab",
        "Instrument rental program",
        "Student lounge"
      ],

      specialties: ["Classical Training", "Contemporary Music", "Music Production", "Performance Preparation"],
      achievements: ["2023 School of Excellence Award", "100+ Student Recitals Annually", "95% Student Satisfaction Rate"],
      
      lessonTypes: ["in-person", "online", "hybrid"],
      categories: ["comprehensive", "performance", "recording"]
    },
    {
      id: 2,
      name: "Nashville Music Institute",
      tagline: "The Heart of Country Music Education",
      location: "Nashville, TN",
      rating: 4.8,
      reviews: 189,
      students: 320,
      established: 2012,
      verified: true,
      featured: false,
      logo: "NMI",
      
      contact: {
        phone: "(615) 555-0123",
        email: "admissions@nashvillemusicinstitute.com",
        website: "https://nashvillemusicinstitute.com",
        address: "456 Music Row, Nashville, TN 37203"
      },

      description: "Specialized in country, folk, and Americana music education. Learn from Nashville's finest musicians and songwriters in the heart of Music City.",

      programs: [
        {
          name: "Songwriting Workshop",
          instruments: ["Acoustic Guitar", "Harmonica", "Vocals"],
          priceRange: "$80-150/session",
          duration: "2-3 hours",
          ageRange: "16+ years"
        },
        {
          name: "Country Guitar Mastery",
          instruments: ["Acoustic Guitar", "Electric Guitar", "Pedal Steel"],
          priceRange: "$70-130/hour",
          duration: "45-60 minutes",
          ageRange: "All ages"
        },
        {
          name: "Vocal Performance",
          instruments: ["Country Vocals", "Harmony", "Stage Presence"],
          priceRange: "$65-110/hour",
          duration: "45-60 minutes",
          ageRange: "12+ years"
        }
      ],

      instructors: [
        { name: "Johnny Williams", specialty: "Country Guitar & Songwriting", experience: "20 years", credentials: "Nashville Songwriter Hall of Fame" },
        { name: "Lisa Mae", specialty: "Country Vocals", experience: "18 years", credentials: "Grammy-nominated Artist" },
        { name: "Buck Thompson", specialty: "Pedal Steel & Dobro", experience: "25 years", credentials: "Grand Ole Opry Musician" }
      ],

      facilities: [
        "Historic recording studio",
        "Live performance venue",
        "Songwriting retreat rooms",
        "Vintage instrument collection",
        "Industry networking events"
      ],

      specialties: ["Country Music", "Songwriting", "Americana", "Folk"],
      achievements: ["50+ Alumni on Country Charts", "Annual Showcase at the Ryman", "Industry Partnership Program"],
      
      lessonTypes: ["in-person", "workshop"],
      categories: ["specialty", "songwriting", "performance"]
    },
    {
      id: 3,
      name: "Brooklyn Beat Academy",
      tagline: "Urban Music Education Revolution",
      location: "Brooklyn, NY",
      rating: 4.7,
      reviews: 156,
      students: 280,
      established: 2018,
      verified: true,
      featured: true,
      logo: "BBA",
      
      contact: {
        phone: "(718) 555-BEAT",
        email: "info@brooklynbeat.edu",
        website: "https://brooklynbeatacademy.com",
        address: "789 Beat Street, Brooklyn, NY 11201"
      },

      description: "Modern music school focusing on hip-hop, R&B, and contemporary urban music. Learn production, DJing, and performance from industry professionals.",

      programs: [
        {
          name: "Music Production Bootcamp",
          instruments: ["Ableton Live", "Logic Pro", "FL Studio"],
          priceRange: "$150-300/session",
          duration: "3-4 hours",
          ageRange: "14+ years"
        },
        {
          name: "DJ Skills Development",
          instruments: ["Turntables", "CDJs", "DJ Software"],
          priceRange: "$60-120/hour",
          duration: "60-90 minutes",
          ageRange: "12+ years"
        },
        {
          name: "Urban Vocals & Rap",
          instruments: ["Vocals", "Rap Technique", "Freestyle"],
          priceRange: "$55-100/hour",
          duration: "45-60 minutes",
          ageRange: "10+ years"
        }
      ],

      instructors: [
        { name: "DJ Supreme", specialty: "Turntables & Music Production", experience: "15 years", credentials: "Platinum Producer" },
        { name: "MC Lyricist", specialty: "Rap & Songwriting", experience: "12 years", credentials: "Battle Champion" },
        { name: "Vocal Queen", specialty: "R&B Vocals", experience: "14 years", credentials: "Major Label Artist" }
      ],

      facilities: [
        "Professional recording booth",
        "DJ practice stations",
        "Beat production lab",
        "Performance stage",
        "Collaborative workspace"
      ],

      specialties: ["Hip-Hop", "R&B", "Music Production", "DJing"],
      achievements: ["Student Mixtape Releases", "Industry Internship Program", "Annual Beat Battle Championship"],
      
      lessonTypes: ["in-person", "online"],
      categories: ["production", "urban", "contemporary"]
    },
    {
      id: 4,
      name: "Classical Conservatory of Music",
      tagline: "Excellence in Classical Music Education",
      location: "Boston, MA",
      rating: 4.9,
      reviews: 298,
      students: 180,
      established: 1995,
      verified: true,
      featured: false,
      logo: "CCM",
      
      contact: {
        phone: "(617) 555-MUSIC",
        email: "admissions@classicalconservatory.edu",
        website: "https://classicalconservatory.edu",
        address: "321 Symphony Ave, Boston, MA 02115"
      },

      description: "Prestigious classical music conservatory offering rigorous training for serious musicians. Prepare for conservatory auditions and professional careers.",

      programs: [
        {
          name: "Classical Piano",
          instruments: ["Piano", "Music Theory", "Sight Reading"],
          priceRange: "$100-200/hour",
          duration: "60-90 minutes",
          ageRange: "5+ years"
        },
        {
          name: "String Instruments",
          instruments: ["Violin", "Viola", "Cello", "Double Bass"],
          priceRange: "$90-180/hour",
          duration: "45-75 minutes",
          ageRange: "6+ years"
        },
        {
          name: "Chamber Music Ensemble",
          instruments: ["Mixed Ensembles", "String Quartets"],
          priceRange: "$50-100/session",
          duration: "90-120 minutes",
          ageRange: "Advanced students"
        }
      ],

      instructors: [
        { name: "Maestro Giovanni", specialty: "Piano & Composition", experience: "30 years", credentials: "Juilliard Graduate, Carnegie Hall Performer" },
        { name: "Dr. Katherine Bell", specialty: "Violin & Chamber Music", experience: "25 years", credentials: "Boston Symphony Orchestra" },
        { name: "Professor James Wright", specialty: "Music Theory & History", experience: "28 years", credentials: "PhD in Musicology, Harvard" }
      ],

      facilities: [
        "Concert grand pianos",
        "Professional concert hall",
        "Music library & archives",
        "Individual practice rooms",
        "Masterclass venue"
      ],

      specialties: ["Classical Performance", "Music Theory", "Composition", "Audition Preparation"],
      achievements: ["80% Conservatory Acceptance Rate", "Annual Carnegie Hall Performance", "International Competition Winners"],
      
      lessonTypes: ["in-person"],
      categories: ["classical", "professional", "audition-prep"]
    },
    {
      id: 5,
      name: "Online Music Mastery",
      tagline: "Learn Music Anywhere, Anytime",
      location: "Online Worldwide",
      rating: 4.6,
      reviews: 1247,
      students: 2100,
      established: 2019,
      verified: true,
      featured: true,
      logo: "OMM",
      
      contact: {
        phone: "1-800-MUSIC-NOW",
        email: "support@onlinemusicmastery.com",
        website: "https://onlinemusicmastery.com",
        address: "Virtual Campus - Worldwide Access"
      },

      description: "Comprehensive online music education platform with live instructors, interactive lessons, and flexible scheduling for students worldwide.",

      programs: [
        {
          name: "Interactive Piano Lessons",
          instruments: ["Digital Piano", "Keyboard"],
          priceRange: "$30-80/session",
          duration: "30-60 minutes",
          ageRange: "All ages"
        },
        {
          name: "Guitar Fundamentals",
          instruments: ["Acoustic Guitar", "Electric Guitar"],
          priceRange: "$25-70/session",
          duration: "30-45 minutes",
          ageRange: "8+ years"
        },
        {
          name: "Music Production Online",
          instruments: ["DAW Software", "Home Studio Setup"],
          priceRange: "$40-120/session",
          duration: "45-90 minutes",
          ageRange: "12+ years"
        }
      ],

      instructors: [
        { name: "Global Instructor Network", specialty: "Multi-Instrument", experience: "Varies", credentials: "Certified Online Music Educators" },
        { name: "24/7 Support Team", specialty: "Technical & Learning Support", experience: "Professional", credentials: "Music Education Specialists" }
      ],

      facilities: [
        "HD video conferencing",
        "Interactive lesson platform",
        "Digital sheet music library",
        "Practice tracking tools",
        "Student community forums",
        "Mobile app access"
      ],

      specialties: ["Online Learning", "Flexible Scheduling", "All Instruments", "Beginner Friendly"],
      achievements: ["Students in 50+ Countries", "95% Lesson Completion Rate", "24/7 Technical Support"],
      
      lessonTypes: ["online"],
      categories: ["online", "beginner", "flexible"]
    }
  ];

  const categories = [
    { id: "all", name: "All Schools" },
    { id: "comprehensive", name: "Comprehensive Programs" },
    { id: "specialty", name: "Specialty Schools" },
    { id: "classical", name: "Classical Focus" },
    { id: "contemporary", name: "Contemporary Music" },
    { id: "online", name: "Online Learning" }
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "local", name: "Near Me" },
    { id: "california", name: "California" },
    { id: "new-york", name: "New York" },
    { id: "nashville", name: "Nashville" },
    { id: "online", name: "Online Only" }
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "budget", name: "Under $50/lesson" },
    { id: "mid", name: "$50-100/lesson" },
    { id: "premium", name: "$100+/lesson" }
  ];

  const lessonTypes = [
    { id: "all", name: "All Types" },
    { id: "in-person", name: "In-Person" },
    { id: "online", name: "Online" },
    { id: "hybrid", name: "Hybrid" }
  ];

  // Filter schools based on search and filters
  const filteredSchools = musicSchools.filter(school => {
    const matchesSearch = 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === "all" || school.categories.includes(selectedCategory);
    const matchesLessonType = lessonType === "all" || school.lessonTypes.includes(lessonType);

    return matchesSearch && matchesCategory && matchesLessonType;
  });

  const handleContactSchool = (schoolId: number) => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=contact&school=${schoolId}`;
    } else {
      console.log(`Contacting school ${schoolId}`);
    }
  };

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-8">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-white text-center mb-12">
          <h1 className="text-white text-4xl lg:text-6xl font-bold text-white mb-6">
            Find Music
            <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
              Schools
            </span>
          </h1>
          <p className="text-white text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Discover the perfect music school for your learning journey. From classical conservatories 
            to modern production academies, find expert instruction that matches your goals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="text-white bg-netflix-dark/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
          <div className="text-white grid lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <div className="text-white relative">
                <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <Input
                  type="text"
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-white pl-10 bg-netflix-dark border-gray-700 text-white placeholder-gray-400 focus:border-netflix-red"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-white w-full px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-white w-full px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Lesson Type Filter */}
            <div>
              <select
                value={lessonType}
                onChange={(e) => setLessonType(e.target.value)}
                className="text-white w-full px-3 py-2 bg-netflix-dark border border-gray-700 rounded-md text-white focus:border-netflix-red focus:outline-none"
              >
                {lessonTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="text-white flex justify-between items-center mb-6">
          <div className="text-white text-white">
            <span className="text-white text-lg font-medium">
              {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="text-white grid lg:grid-cols-1 gap-8 mb-12">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
              <CardContent className="text-white p-0">
                <div className="text-white grid lg:grid-cols-3 gap-0">
                  {/* School Image/Logo */}
                  <div className="text-white bg-gradient-to-br from-netflix-red/20 to-gray-800 p-8 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-white w-24 h-24 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">
                        {school.logo}
                      </div>
                      {school.featured && (
                        <Badge className="text-white bg-netflix-red text-netflix-red mb-2">Featured</Badge>
                      )}
                      {school.verified && (
                        <Badge className="text-white bg-red-600 text-white text-xs">Verified</Badge>
                      )}
                    </div>
                  </div>

                  {/* School Info */}
                  <div className="text-white lg:col-span-2 p-6 space-y-4">
                    {/* Header */}
                    <div className="text-white flex items-start justify-between">
                      <div>
                        <h3 className="text-white text-2xl font-bold text-white mb-1">{school.name}</h3>
                        <p className="text-white text-netflix-red font-medium mb-2">{school.tagline}</p>
                        <div className="text-white flex items-center space-x-4 text-sm text-white">
                          <div className="text-white flex items-center space-x-1">
                            <MapPin className="text-white h-4 w-4" />
                            <span>{school.location}</span>
                          </div>
                          <div className="text-white flex items-center space-x-1">
                            <GraduationCap className="text-white h-4 w-4" />
                            <span>Est. {school.established}</span>
                          </div>
                          <div className="text-white flex items-center space-x-1">
                            <Users className="text-white h-4 w-4" />
                            <span>{school.students} students</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-white text-right">
                        <div className="text-white flex items-center space-x-1 text-netflix-red mb-1">
                          <Star className="text-white h-4 w-4 fill-current" />
                          <span className="text-white text-white font-medium">{school.rating}</span>
                          <span className="text-white text-white text-sm">({school.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white text-white leading-relaxed">
                      {school.description}
                    </p>

                    {/* Programs Preview */}
                    <div>
                      <h4 className="text-white text-white font-medium mb-2">Featured Programs:</h4>
                      <div className="text-white grid md:grid-cols-2 gap-3">
                        {school.programs.slice(0, 2).map((program, index) => (
                          <div key={index} className="text-white bg-netflix-dark/50 p-3 rounded-lg">
                            <h5 className="text-white text-white font-medium mb-1">{program.name}</h5>
                            <p className="text-white text-white text-sm mb-1">{program.priceRange}</p>
                            <p className="text-white text-white text-xs">{program.duration} • {program.ageRange}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <div className="text-white flex flex-wrap gap-2">
                        {school.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-white bg-netflix-dark text-white">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Actions */}
                    <div className="text-white flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="text-white flex items-center space-x-4 text-sm text-white">
                        <div className="text-white flex items-center space-x-1">
                          <Phone className="text-white h-4 w-4" />
                          <span>{school.contact.phone}</span>
                        </div>
                        <div className="text-white flex items-center space-x-1">
                          <Globe className="text-white h-4 w-4" />
                          <span>Website</span>
                        </div>
                      </div>
                      <div className="text-white flex space-x-3">
                        <Button
                          onClick={() => handleContactSchool(school.id)}
                          className="text-white netflix-button-primary"
                        >
                          <MessageCircle className="text-white h-4 w-4 mr-2" />
                          Contact School
                        </Button>
                        <Button
                          variant="outline"
                          className="text-white border-gray-700 text-white hover:bg-netflix-dark"
                        >
                          <BookOpen className="text-white h-4 w-4 mr-2" />
                          View Details
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
        <div className="text-white bg-gradient-to-r from-netflix-red/10 via-gray-900/50 to-netflix-red/10 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800">
          <h3 className="text-white text-2xl font-bold text-white mb-4">
            Start Your Musical Journey Today
          </h3>
          <p className="text-white text-white mb-6 max-w-2xl mx-auto">
            Whether you're a complete beginner or looking to refine your skills, the right music school 
            can accelerate your progress and unlock your musical potential.
          </p>
          <div className="text-white flex justify-center space-x-4">
            <Button className="text-white netflix-button-primary text-lg px-8 py-3">
              Browse All Schools
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-gray-700 text-white hover:bg-netflix-dark text-lg px-8 py-3"
            >
              Get Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}