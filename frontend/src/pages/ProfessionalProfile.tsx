import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  Play,
  Pause,
  ExternalLink,
  Award,
  Users,
  Music,
  CheckCircle,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfessionalProfile() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("about");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Mock professional data (in real app, fetch based on ID)
  const professional = {
    id: "1",
    name: "Alex Rodriguez",
    title: "Grammy-Nominated Music Producer & Sound Engineer",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviewCount: 127,
    responseTime: "< 1 hour",
    completedProjects: 245,
    verified: true,
    featured: true,
    joinedDate: "January 2022",
    lastSeen: "2 hours ago",
    avatar: "AR",
    coverImage: "cover-bg.jpg",
    
    // Contact & Social Media
    email: "alex@alexriveraproduction.com",
    phone: "+1 (555) 123-4567",
    website: "https://alexriveraproduction.com",
    socialMedia: {
      instagram: "https://instagram.com/alexriveraprod",
      twitter: "https://twitter.com/alexriveraprod", 
      youtube: "https://youtube.com/alexriveraproduction",
      soundcloud: "https://soundcloud.com/alexriveraprod",
      spotify: "https://open.spotify.com/artist/alexrivera",
      tiktok: "https://tiktok.com/@alexriveraprod"
    },

    // Professional Info
    bio: `Grammy-nominated producer and sound engineer with over 10 years of experience in the music industry. I've worked with major label artists including chart-topping hip-hop and R&B acts. My passion lies in creating innovative sounds that push the boundaries of modern music production.

I specialize in bringing artists' visions to life through meticulous attention to detail and cutting-edge production techniques. From initial concept to final master, I provide comprehensive production services that have resulted in multiple platinum certifications and industry recognition.`,

    specialties: ["Hip-Hop Production", "R&B", "Pop", "Mixing", "Mastering", "Vocal Production", "Beat Making"],
    genres: ["Hip-Hop", "R&B", "Pop", "Trap", "Contemporary R&B", "Neo-Soul"],
    
    services: [
      {
        name: "Full Song Production",
        description: "Complete song production from concept to final mix",
        price: 500,
        duration: "3-5 days",
        includes: ["Beat production", "Recording", "Mixing", "2 revisions"]
      },
      {
        name: "Beat Production",
        description: "Custom instrumental beats in your preferred style",
        price: 150,
        duration: "1-2 days", 
        includes: ["Custom beat", "Stems", "MP3 & WAV files", "1 revision"]
      },
      {
        name: "Mixing & Mastering",
        description: "Professional mixing and mastering services",
        price: 200,
        duration: "2-3 days",
        includes: ["Professional mix", "Radio-ready master", "2 revisions"]
      },
      {
        name: "1-Hour Consultation",
        description: "One-on-one consultation for your music project",
        price: 85,
        duration: "1 hour",
        includes: ["Video call", "Project feedback", "Career advice", "Resource recommendations"]
      }
    ],

    equipment: [
      "Pro Tools HDX System",
      "SSL G-Series Console", 
      "Neumann U87 Microphone",
      "Universal Audio Apollo",
      "Yamaha NS-10M Monitors",
      "Vintage Outboard Gear Collection"
    ],

    portfolio: [
      {
        id: 1,
        title: "Summer Nights",
        artist: "Maya Johnson",
        genre: "R&B",
        year: "2023",
        plays: "2.1M",
        achievements: ["#3 on Billboard R&B Chart", "Platinum Certified"],
        audioUrl: "sample1.mp3",
        coverArt: "cover1.jpg"
      },
      {
        id: 2,
        title: "City Dreams", 
        artist: "The Collective",
        genre: "Hip-Hop",
        year: "2023",
        plays: "1.8M",
        achievements: ["Grammy Nominated", "Gold Certified"],
        audioUrl: "sample2.mp3",
        coverArt: "cover2.jpg"
      },
      {
        id: 3,
        title: "Midnight Drive",
        artist: "Various Artists",
        genre: "Pop",
        year: "2022", 
        plays: "3.2M",
        achievements: ["#1 on Apple Music", "2x Platinum"],
        audioUrl: "sample3.mp3",
        coverArt: "cover3.jpg"
      }
    ],

    reviews: [
      {
        id: 1,
        client: "Maya Johnson",
        rating: 5,
        date: "2 weeks ago",
        project: "Summer Nights - Full Production",
        review: "Alex is absolutely incredible! He transformed my rough ideas into a polished, radio-ready hit. His attention to detail and creative input took the song to another level. The whole process was smooth and professional.",
        verified: true
      },
      {
        id: 2,
        client: "DJ Marcus",
        rating: 5,
        date: "1 month ago", 
        project: "Beat Pack - 10 Custom Beats",
        review: "Working with Alex was a game changer for my sound. The beats he created were exactly what I was looking for - modern, punchy, and unique. Fast delivery and excellent communication throughout.",
        verified: true
      },
      {
        id: 3,
        client: "Sarah Chen",
        rating: 4,
        date: "2 months ago",
        project: "Mixing & Mastering - EP",
        review: "Professional quality mixing and mastering. Alex brought out elements in my recordings I didn't even know were there. The final masters sound amazing across all platforms.",
        verified: true
      }
    ],

    achievements: [
      "Grammy Nomination - Best Engineered Album (2023)",
      "3x Platinum Certified Productions", 
      "Billboard #1 Hit Producer",
      "Mix Engineer of the Year - Urban Music Awards (2022)",
      "50+ Million Streams Across Platforms"
    ],

    availability: {
      status: "Available",
      nextAvailable: "Today",
      workingHours: "9 AM - 6 PM PST",
      timezone: "Pacific Standard Time"
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=book&professional=${professional.id}`;
    } else {
      // Handle booking logic
      console.log(`Booking professional ${professional.id}`);
    }
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=contact&professional=${professional.id}`;
    } else {
      // Handle contact logic  
      console.log(`Contacting professional ${professional.id}`);
    }
  };

  const toggleAudioPlay = (trackId: string) => {
    if (isPlaying === trackId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(trackId);
    }
  };

  const socialMediaLinks = [
    { name: "Instagram", url: professional.socialMedia.instagram, icon: <Instagram className="text-white h-5 w-5" />, color: "hover:text-red-600" },
    { name: "Twitter", url: professional.socialMedia.twitter, icon: <Twitter className="text-white h-5 w-5" />, color: "hover:text-netflix-red" },
    { name: "YouTube", url: professional.socialMedia.youtube, icon: <Youtube className="text-white h-5 w-5" />, color: "hover:text-red-500" },
    { name: "Website", url: professional.website, icon: <Globe className="text-white h-5 w-5" />, color: "hover:text-netflix-red" }
  ];

  return (
    <div className="text-white min-h-screen bg-netflix-black">
      {/* Header Section */}
      <div className="text-white relative">
        {/* Cover Image */}
        <div className="text-white h-64 bg-gradient-to-r from-netflix-red/20 via-gray-900 to-netflix-red/20 relative">
          <div className="text-white absolute inset-0 bg-black/40"></div>
          <div className="text-white absolute bottom-6 left-6 right-6">
            <div className="text-white flex items-end space-x-6">
              {/* Profile Avatar */}
              <div className="text-white relative">
                <div className="text-white w-32 h-32 bg-netflix-red rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-gray-900">
                  {professional.avatar}
                </div>
                {professional.verified && (
                  <div className="text-white absolute -bottom-2 -right-2 bg-red-600 rounded-full p-2">
                    <CheckCircle className="text-white h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              
              {/* Basic Info */}
              <div className="text-white flex-1 text-white">
                <div className="text-white flex items-center space-x-3 mb-2">
                  <h1 className="text-white text-3xl font-bold">{professional.name}</h1>
                  {professional.featured && (
                    <Badge className="text-white bg-netflix-red text-netflix-red">Featured</Badge>
                  )}
                </div>
                <p className="text-white text-xl text-white mb-2">{professional.title}</p>
                <div className="text-white flex items-center space-x-6 text-sm text-white">
                  <div className="text-white flex items-center space-x-1">
                    <MapPin className="text-white h-4 w-4" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="text-white flex items-center space-x-1">
                    <Star className="text-white h-4 w-4 fill-current text-netflix-red" />
                    <span className="text-white text-white">{professional.rating}</span>
                    <span>({professional.reviewCount} reviews)</span>
                  </div>
                  <div className="text-white flex items-center space-x-1">
                    <Clock className="text-white h-4 w-4" />
                    <span>Responds in {professional.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-white flex flex-col space-y-3">
                <Button onClick={handleBookNow} className="text-white netflix-button-primary px-8">
                  <Calendar className="text-white h-4 w-4 mr-2" />
                  Book Now
                </Button>
                <Button onClick={handleContact} variant="outline" className="text-white border-gray-600 text-white hover:bg-netflix-dark px-8">
                  <MessageCircle className="text-white h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="text-white lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="text-white flex space-x-1 bg-netflix-dark/50 backdrop-blur-sm rounded-lg p-1">
              {["about", "portfolio", "reviews", "services"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-netflix-red text-white"
                      : "text-white hover:text-white hover:bg-netflix-dark"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "about" && (
              <div className="text-white space-y-6">
                {/* Bio */}
                <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-white">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white text-white leading-relaxed whitespace-pre-line">
                      {professional.bio}
                    </p>
                  </CardContent>
                </Card>

                {/* Specialties & Genres */}
                <div className="text-white grid md:grid-cols-2 gap-6">
                  <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white text-white">Specialties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-white flex flex-wrap gap-2">
                        {professional.specialties.map((specialty, index) => (
                          <Badge key={index} className="text-white bg-netflix-red/20 text-netflix-red border-netflix-red/30">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white text-white">Genres</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-white flex flex-wrap gap-2">
                        {professional.genres.map((genre, index) => (
                          <Badge key={index} variant="secondary" className="text-white bg-netflix-dark text-white">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Equipment */}
                <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-white">Studio Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-white grid md:grid-cols-2 gap-2">
                      {professional.equipment.map((item, index) => (
                        <div key={index} className="text-white flex items-center space-x-2 text-white">
                          <CheckCircle className="text-white h-4 w-4 text-netflix-red" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-white flex items-center space-x-2">
                      <Award className="text-white h-5 w-5 text-netflix-red" />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-white space-y-2">
                      {professional.achievements.map((achievement, index) => (
                        <div key={index} className="text-white flex items-center space-x-2 text-white">
                          <Star className="text-white h-4 w-4 text-netflix-red" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="text-white space-y-6">
                <h3 className="text-white text-2xl font-bold text-white">Recent Work</h3>
                <div className="text-white space-y-6">
                  {professional.portfolio.map((track) => (
                    <Card key={track.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                      <CardContent className="text-white p-6">
                        <div className="text-white flex items-center space-x-4">
                          {/* Play Button */}
                          <button
                            onClick={() => toggleAudioPlay(track.id.toString())}
                            className="text-white w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            {isPlaying === track.id.toString() ? (
                              <Pause className="text-white h-6 w-6 text-white" />
                            ) : (
                              <Play className="text-white h-6 w-6 text-white ml-1" />
                            )}
                          </button>

                          {/* Track Info */}
                          <div className="text-white flex-1">
                            <h4 className="text-white text-lg font-semibold text-white">"{track.title}"</h4>
                            <p className="text-white text-white">by {track.artist} • {track.genre} • {track.year}</p>
                            <div className="text-white flex items-center space-x-4 mt-2 text-sm text-white">
                              <span>{track.plays} plays</span>
                              <div className="text-white flex flex-wrap gap-2">
                                {track.achievements.map((achievement, index) => (
                                  <Badge key={index} className="text-white bg-netflix-red/20 text-netflix-red text-xs">
                                    {achievement}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-white space-y-6">
                <div className="text-white flex items-center justify-between">
                  <h3 className="text-white text-2xl font-bold text-white">Client Reviews</h3>
                  <div className="text-white text-right">
                    <div className="text-white flex items-center space-x-2">
                      <Star className="text-white h-5 w-5 fill-current text-netflix-red" />
                      <span className="text-white text-xl font-bold text-white">{professional.rating}</span>
                      <span className="text-white text-white">({professional.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-white space-y-4">
                  {professional.reviews.map((review) => (
                    <Card key={review.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                      <CardContent className="text-white p-6">
                        <div className="text-white flex items-start space-x-4">
                          <div className="text-white w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold">
                            {review.client.charAt(0)}
                          </div>
                          <div className="text-white flex-1">
                            <div className="text-white flex items-center space-x-2 mb-2">
                              <h4 className="text-white font-semibold text-white">{review.client}</h4>
                              {review.verified && (
                                <Badge className="text-white bg-red-600/20 text-netflix-red text-xs">Verified</Badge>
                              )}
                            </div>
                            <div className="text-white flex items-center space-x-2 mb-2">
                              <div className="text-white flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-current text-netflix-red" : "text-white"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-white text-sm text-white">{review.date}</span>
                            </div>
                            <p className="text-white text-sm text-white mb-2">{review.project}</p>
                            <p className="text-white text-white leading-relaxed">{review.review}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="text-white space-y-6">
                <h3 className="text-white text-2xl font-bold text-white">Services & Pricing</h3>
                <div className="text-white grid gap-6">
                  {professional.services.map((service, index) => (
                    <Card key={index} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
                      <CardContent className="text-white p-6">
                        <div className="text-white flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-white text-lg font-semibold text-white mb-2">{service.name}</h4>
                            <p className="text-white text-white mb-2">{service.description}</p>
                            <div className="text-white flex items-center space-x-4 text-sm text-white">
                              <div className="text-white flex items-center space-x-1">
                                <Clock className="text-white h-4 w-4" />
                                <span>{service.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-white text-right">
                            <div className="text-white text-2xl font-bold text-netflix-red">
                              ${service.price}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-white mb-4">
                          <h5 className="text-white text-sm font-medium text-white mb-2">Includes:</h5>
                          <div className="text-white grid grid-cols-2 gap-1">
                            {service.includes.map((item, i) => (
                              <div key={i} className="text-white flex items-center space-x-2 text-sm text-white">
                                <CheckCircle className="text-white h-3 w-3 text-netflix-red" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button onClick={handleBookNow} className="text-white w-full netflix-button-primary">
                          Book This Service
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="text-white space-y-6">
            {/* Contact & Social Media */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Contact & Social</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                {/* Contact Info */}
                <div className="text-white space-y-3">
                  <div className="text-white flex items-center space-x-3 text-white">
                    <Mail className="text-white h-4 w-4" />
                    <a href={`mailto:${professional.email}`} className="text-white hover:text-white transition-colors">
                      {professional.email}
                    </a>
                  </div>
                  <div className="text-white flex items-center space-x-3 text-white">
                    <Phone className="text-white h-4 w-4" />
                    <a href={`tel:${professional.phone}`} className="text-white hover:text-white transition-colors">
                      {professional.phone}
                    </a>
                  </div>
                </div>

                <div className="text-white border-t border-gray-700 pt-4">
                  <h4 className="text-white text-white font-medium mb-3">Social Media</h4>
                  <div className="text-white grid grid-cols-2 gap-3">
                    {socialMediaLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 p-2 rounded-lg border border-gray-700 text-white ${social.color} hover:border-gray-600 transition-colors`}
                      >
                        {social.icon}
                        <span className="text-white text-sm">{social.name}</span>
                        <ExternalLink className="text-white h-3 w-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Availability</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="text-white flex items-center space-x-2">
                  <div className="text-white w-3 h-3 bg-netflix-red rounded-full"></div>
                  <span className="text-white text-netflix-red font-medium">{professional.availability.status}</span>
                </div>
                <div className="text-white text-sm text-white space-y-1">
                  <div>Next available: {professional.availability.nextAvailable}</div>
                  <div>Working hours: {professional.availability.workingHours}</div>
                  <div>Timezone: {professional.availability.timezone}</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="text-white flex items-center justify-between">
                  <span className="text-white text-white">Completed Projects</span>
                  <span className="text-white text-white font-medium">{professional.completedProjects}</span>
                </div>
                <div className="text-white flex items-center justify-between">
                  <span className="text-white text-white">Response Time</span>
                  <span className="text-white text-white font-medium">{professional.responseTime}</span>
                </div>
                <div className="text-white flex items-center justify-between">
                  <span className="text-white text-white">Member Since</span>
                  <span className="text-white text-white font-medium">{professional.joinedDate}</span>
                </div>
                <div className="text-white flex items-center justify-between">
                  <span className="text-white text-white">Last Seen</span>
                  <span className="text-white text-white font-medium">{professional.lastSeen}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}